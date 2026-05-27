/**
 * Módulo 5 — Generación de Contenido (Ads-aligned)
 * Genera el artículo con estructura orientada a conversión:
 *   Hook → Identificación → Intensificación → Cambio de paradigma → Solución → CTA
 *
 * El contenido es 100% original, SEO optimizado y reutilizable en Meta Ads.
 */
import { existsSync, readFileSync } from "fs";
import { chat, activeProvider } from "../utils/llm.mjs";
import { log } from "../utils/logger.mjs";
import { config } from "../config.mjs";
import { formatSourcesForPrompt } from "./sources.mjs";
// config.llm.genTimeout se usa para esta llamada (puede tardar varios minutos con modelos grandes)

const SYSTEM = `Eres el redactor jefe de Drenpos (ERP + TPV + facturación para pymes españolas). Escribes artículos de blog que cumplen dos funciones simultáneas: posicionar en Google Y alimentar campañas de Meta Ads.

Tu contenido:
- Empieza SIEMPRE con un hook que describe un problema real del lector
- Genera identificación inmediata (el lector piensa "esto me está pasando a mí")
- Intensifica el dolor antes de ofrecer solución
- Introduce la solución de forma suave, sin vender directamente
- Cierra con un CTA reflexivo, no agresivo
- Es 100% original, sin relleno, sin clichés de blog genérico
- Nunca suena a "contenido de marca" — suena a consejero de confianza`;

/** Convierte texto a slug URL-safe */
export function slugify(text = "") {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-{2,}/g, "-")
    .substring(0, 80);
}

/**
 * Escapa control chars (newlines, tabs, etc.) y comillas tipográficas
 * que estén DENTRO de cadenas JSON. Camina el string carácter a carácter
 * llevando cuenta de cuándo estamos dentro de un string.
 */
function escapeControlCharsInJsonStrings(s) {
  let out = "";
  let inString = false;
  let escape = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (escape) {
      out += c;
      escape = false;
      continue;
    }
    if (c === "\\") {
      out += c;
      escape = true;
      continue;
    }
    if (c === '"') {
      out += c;
      inString = !inString;
      continue;
    }
    if (inString) {
      if (c === "\n") {
        out += "\\n";
        continue;
      }
      if (c === "\r") {
        out += "\\r";
        continue;
      }
      if (c === "\t") {
        out += "\\t";
        continue;
      }
      const code = c.charCodeAt(0);
      if (code < 0x20) {
        out += "\\u" + code.toString(16).padStart(4, "0");
        continue;
      }
    }
    out += c;
  }
  return out;
}

/**
 * Parseo robusto del JSON que devuelve el modelo.
 * Maneja: bloques ```json…```, control chars dentro de strings,
 * trailing commas, comentarios, comillas tipográficas, etc.
 */
function parseModelJson(raw) {
  if (!raw) throw new Error("Respuesta vacía del modelo");

  // 1) Si viene envuelto en ```json ... ``` lo extraemos
  let text = raw.trim();
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenceMatch) text = fenceMatch[1];

  // 2) Cortamos desde la primera { hasta la última } para descartar prólogos/epílogos
  const first = text.indexOf("{");
  const last = text.lastIndexOf("}");
  if (first === -1 || last === -1 || last < first) {
    throw new Error("No JSON en la respuesta del modelo");
  }
  let jsonString = text.slice(first, last + 1);

  // 3) Saneados básicos previos
  // Comentarios // y /* */
  jsonString = jsonString.replace(/\/\/[^\n]*$/gm, "");
  jsonString = jsonString.replace(/\/\*[\s\S]*?\*\//g, "");
  // Trailing commas
  jsonString = jsonString.replace(/,(\s*[}\]])/g, "$1");

  // 4) Comillas tipográficas → comillas ASCII solo cuando se usan como
  //    delimitador (heurística simple: las normalizamos siempre, los
  //    contenidos en español rara vez usan " " que no sean delimitadoras).
  jsonString = jsonString.replace(/[“”]/g, '"');

  // 5) Escapar control chars dentro de strings (la causa frecuente del fallo)
  jsonString = escapeControlCharsInJsonStrings(jsonString);

  // 6) Parseo. Si falla, una segunda pasada intentando reparar
  //    comas faltantes entre pares clave-valor sobre líneas distintas.
  try {
    return JSON.parse(jsonString);
  } catch (firstErr) {
    // Intento de reparación: añadir coma cuando una línea termina en " o ] o }
    // y la siguiente empieza con "clave":
    const repaired = jsonString.replace(
      /([}\]"0-9truefalsnl])(\s*\n\s*)("[^"\n]+"\s*:)/g,
      '$1,$2$3',
    );
    try {
      return JSON.parse(repaired);
    } catch (secondErr) {
      const errPos = secondErr.message.match(/position (\d+)/)?.[1];
      if (errPos) {
        const pos = parseInt(errPos, 10);
        const start = Math.max(0, pos - 200);
        const end = Math.min(jsonString.length, pos + 200);
        log.error(`JSON inválido en posición ${pos}:`);
        log.error(
          `...${jsonString.substring(start, end).replace(/\n/g, "↵")}...`,
        );
      } else {
        log.error("JSON inválido (primeros 500 chars):");
        log.error(jsonString.substring(0, 500));
      }
      log.error(`Error de parseo: ${secondErr.message}`);
      throw secondErr;
    }
  }
}

/**
 * Generar el artículo completo con estructura Ads-aligned.
 * @param {object} strategy  - Resultado de synthesize
 * @param {string} idea
 * @param {string[]} keywords
 * @param {string} context
 * @param {object} icp       - { type, role, maturity, pains }
 * @returns {Promise<object>} Artículo completo
 */
export async function generateContent(
  strategy,
  idea,
  keywords,
  context,
  icp = {},
  groundingOpts = {},
) {
  const { sources = [], strict = false } = groundingOpts;
  const sourcesBlock = formatSourcesForPrompt(sources);
  const hasSources = sources.length > 0;

  log.step(
    "MÓDULO 5 · GENERACIÓN",
    "Generando artículo original con estructura Ads-aligned...",
  );

  // Leer guía de estilo
  let styleGuide =
    "Directo, claro, sin humo. Párrafos cortos. H2 descriptivos. Sin relleno.";
  if (existsSync(config.blog.styleFile)) {
    styleGuide = readFileSync(config.blog.styleFile, "utf-8");
  }

  // Construir descripción de estructura esperada
  const structureText = (strategy.recommendedStructure || [])
    .map(
      (s, i) =>
        `  ${i + 1}. [${s.section}] H2: "${s.suggestedH2}"\n     → ${s.purpose}`,
    )
    .join("\n");

  // ICP summary
  const icpSummary = [
    icp.type ? `Empresa: ${icp.type}` : "",
    icp.role ? `Lector: ${icp.role}` : "",
    icp.maturity ? `Madurez digital: ${icp.maturity}` : "",
    icp.pains?.length ? `Dolores: ${icp.pains.join(", ")}` : "",
    strategy.icpInsights?.coreDesire
      ? `Deseo real: ${strategy.icpInsights.coreDesire}`
      : "",
    strategy.icpInsights?.mainFear
      ? `Miedo principal: ${strategy.icpInsights.mainFear}`
      : "",
    strategy.icpInsights?.currentSolution
      ? `Cómo lo resuelve hoy: ${strategy.icpInsights.currentSolution}`
      : "",
  ]
    .filter(Boolean)
    .join("\n");

  const prompt = `Escribe un artículo de blog COMPLETO para Drenpos sobre: "${idea}"

━━ ICP — A QUIÉN LE ESCRIBES ━━
${icpSummary || "Gerente o responsable de operaciones de una pyme española"}

━━ ESTRATEGIA EDITORIAL ━━
Ángulo: ${strategy.articleAngle}
Valor diferencial: ${strategy.differentialValue}
Posicionamiento vs competencia: ${strategy.contentPositioning}
Tono: ${strategy.toneGuidance}
Palabras objetivo: ~${strategy.estimatedWordCount || 1300}

━━ SEO ━━
Keyword principal: ${strategy.seoStrategy?.primaryKeyword || keywords[0]}
Keywords secundarias: ${(strategy.seoStrategy?.secondaryKeywords || keywords.slice(1)).join(", ")}
Uso de keywords: ${strategy.seoStrategy?.keywordDensityGuidance || "Natural, sin saturar"}

━━ HOOK DE APERTURA ━━
Tipo de hook: ${strategy.hookStrategy?.angle || "problema real"}
Ejemplo propuesto: "${strategy.hookStrategy?.example || "¿Sigues teniendo este problema?"}"
REGLA CRÍTICA: El artículo DEBE empezar con este hook o una variante superior.
NO empezar con "En este artículo...", "Hoy vamos a ver...", ni ninguna introducción genérica.

━━ ESTRUCTURA OBLIGATORIA (6 bloques) ━━
${structureText}

━━ HUECOS QUE LLENAR VS. COMPETENCIA ━━
${(strategy.competitionGapsToFill || []).map((g) => `- ${g}`).join("\n")}

━━ ALINEACIÓN ADS ━━
Ángulos scroll-stop a integrar: ${(strategy.adsAlignment?.scrollStopAngles || []).join(" | ")}
Triggers emocionales: ${(strategy.adsAlignment?.emotionalTriggers || []).join(", ")}

━━ GUÍA DE ESTILO DRENPOS ━━
${styleGuide}

━━ CONTEXTO ADICIONAL ━━
${context || "No especificado"}

${
  hasSources
    ? `━━ FUENTES DE VERDAD (GROUNDING) ━━
Los siguientes documentos son la ÚNICA fuente válida para cifras, fechas,
artículos legales, nombres propios, sanciones, requisitos, plazos y citas.

REGLAS DE USO DE FUENTES:
${
  strict
    ? `- MODO STRICT: NO puedes incluir ningún dato, cifra, ley, organismo o cita que
  no aparezca literalmente en las fuentes. Si un dato no está, NO lo inventes:
  o lo omites, o escribes una frase genérica sin números.
- Prohibido inventar nombres de empresas, expertos, estudios o estadísticas.
- Si necesitas un ejemplo y no hay en las fuentes, usa nombres ficticios
  claramente identificables (ej: "Distribuciones Ejemplo SL").`
    : `- Usa las fuentes como referencia principal. Los datos sensibles (multas,
  artículos, fechas, sanciones) deben coincidir con lo que dicen las fuentes.
- Si un dato no está en las fuentes, prefiere omitirlo a inventarlo.`
}
- No copies frases literales largas. Reescribe con tus palabras.
- Cuando uses un dato concreto de una fuente, puedes referenciarla en el
  cuerpo del artículo de forma natural (ej: "según la normativa vigente…",
  "el Real Decreto X/2025 establece que…") sin enlaces ni notas al pie.

${sourcesBlock}
`
    : ""
}
━━ REGLAS DE CONTENIDO ━━
1. Contenido 100% ORIGINAL. Sin copiar competencia.
2. Hook al inicio: directo, sobre un problema real del ICP. Ni una frase de introducción antes.
3. Estructura de 6 bloques: Hook → Identificación → Intensificación → Cambio de paradigma → Solución soft → CTA.
4. Párrafos máximo 3-4 líneas. Frases cortas. Sin bloques de texto de 6+ líneas seguidas.
5. Keywords integradas de forma completamente natural.
6. Incluir 1-2 ejemplos con nombres ficticios de pymes (ej: "Ferretería Martínez", "Distribuciones López SL").
7. Drenpos mencionado máximo 2-3 veces, de forma natural, nunca como publicidad directa.
8. CTA final: invitar a reflexionar o a dar un primer paso pequeño. NO "Compra ahora". NO "¡No esperes más!".
9. El texto debe poder dividirse en párrafos reutilizables como copies de Meta Ads.
10. Sin emojis en el cuerpo del artículo.
${
  hasSources
    ? `11. ${strict ? "OBLIGATORIO" : "PRIORITARIO"}: cualquier afirmación con números, fechas, cifras
   de multas, artículos legales, organismos o porcentajes debe estar respaldada
   por las FUENTES DE VERDAD entregadas más arriba. Si no está, no lo escribas.`
    : ""
}

━━ REGLAS DE FORMATO MARKDOWN (OBLIGATORIAS) ━━
Estas reglas NO son opcionales. El artículo DEBE incluir todos estos elementos:

• H2 (##) para cada sección principal — mínimo 5 H2 en todo el artículo
• H3 (###) donde haya subsecciones o ejemplos — mínimo 2 H3
• Listas con guión (-) para cualquier enumeración de 3+ elementos — mínimo 2 listas
• **Negrita** en cada párrafo para el concepto o frase más importante — mínimo 1 por párrafo
• > Blockquote para frases de impacto o datos clave — mínimo 2 blockquotes
• Una tabla comparativa o resumen cuando sea útil (al menos 1 tabla)
• Separación visual clara entre secciones

EJEMPLO de cómo debe verse un bloque bien formateado:

## Por qué el Excel falla cuando escalas

Muchas pymes empiezan con Excel porque funciona. Pero llega un punto en que **el archivo se convierte en el problema**.

- Cada persona tiene su versión
- Los datos se desactualizan en horas
- No hay trazabilidad de quién cambió qué

> "Tener datos desactualizados es peor que no tenerlos: te dan una falsa sensación de control."

### El caso de Ferretería Martínez

Cuando Martínez tenía 2 empleados, el Excel era suficiente. Con 8 personas y 3 almacenes, **perdían una hora diaria** reconciliando versiones distintas del mismo archivo.

IMPORTANTE: El artículo que generes DEBE tener esta riqueza visual y estructural en TODAS las secciones, no solo en alguna.

━━ FORMATO DE RESPUESTA (CRÍTICO) ━━
Devuelve ÚNICAMENTE un JSON válido (sin markdown, sin \`\`\`json, sin texto antes ni después):
{
  "title": "Título SEO (keyword principal, máx 65 chars, no clickbait)",
  "metaTitle": "Meta título (máx 60 chars)",
  "description": "Meta descripción (120-160 chars, menciona el beneficio real)",
  "slug": "slug-en-minusculas",
  "categories": ["Categoría 1", "Categoría 2"],
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "heroTitle": "Título del hero (puede = title o variante más directa)",
  "heroDescription": "Descripción del hero — 1 frase que atrapa",
  "content": "ARTÍCULO COMPLETO EN MARKDOWN (sin frontmatter, empieza directo con el hook)",
  "featured": true
}

REGLAS DE JSON (NO LAS ROMPAS):
- TODOS los saltos de línea dentro del string "content" deben ir escapados como \\n
- TODAS las comillas dobles dentro de "content" deben ir escapadas como \\"
- NO uses comillas tipográficas (" ") dentro del JSON, solo " ASCII
- NO añadas comentarios // ni /* */
- NO uses trailing commas
- Verifica que cada par "clave": valor termine en coma excepto el último
- El "content" debe tener el artículo completo con todos los H2, H3, párrafos y CTA final.`;

  try {
    const useJsonMode =
      activeProvider() === "openai" && config.openai.jsonMode;

    const raw = await chat(prompt, SYSTEM, {
      // Si vamos en STRICT bajamos temperatura para reducir invenciones
      temperature: strict ? 0.45 : 0.72,
      // Ampliamos contexto cuando hay fuentes para que caben sin truncarse
      numCtx: hasSources ? 24576 : 12288,
      timeout: config.llm.genTimeout,
      // Forzar JSON válido en proveedores OpenAI-compatibles que lo soporten
      ...(useJsonMode && { responseFormat: { type: "json_object" } }),
    });

    // Extraer y sanear el JSON de la respuesta
    const article = parseModelJson(raw);

    // Normalize slug
    article.slug = slugify(article.slug || article.title || idea);

    // Ensure arrays
    if (!Array.isArray(article.categories)) article.categories = ["Blog"];
    if (!Array.isArray(article.tags)) article.tags = keywords.slice(0, 5);

    const wc = (article.content || "").split(/\s+/).filter(Boolean).length;
    log.success(`Artículo generado: "${article.title}"`);
    log.info(`~${wc} palabras | slug: ${article.slug}`);

    return article;
  } catch (e) {
    log.error(`Error en generación: ${e.message}`);
    throw e;
  }
}
