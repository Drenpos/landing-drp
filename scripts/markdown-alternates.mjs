#!/usr/bin/env node
// ════════════════════════════════════════════════════════════════════════
//  markdown-alternates.mjs · paso posterior a `astro build`
//
//  Genera junto a cada página pública prerenderizada `dist/foo.html` un
//  `dist/foo.md` con el contenido en Markdown. El worker (src/worker.ts)
//  lo sirve cuando un agente pide la página con `Accept: text/markdown`.
//
//  - Sin dependencias: conversor HTML a Markdown propio, pensado para el
//    HTML que emite Astro en este proyecto (bien formado).
//  - Idempotente: solo sobrescribe .md que lleven la marca `source: html`
//    (los que genera este script). Un .md que ya exista sin esa marca (por
//    ejemplo los del blog, que salen de src/pages/blog/[...slug].md.ts con
//    el Markdown original) no se toca.
//  - Las exclusiones (404, legal, categories, paginaciones, posts del blog)
//    están duplicadas en src/lib/agent-readiness.ts: si cambias una, cambia
//    la otra.
//
//  Uso:
//    node scripts/markdown-alternates.mjs              (procesa ./dist)
//    node scripts/markdown-alternates.mjs --dist otra  (otra carpeta)
//    node scripts/markdown-alternates.mjs --check dist/pricing.html
//        imprime el Markdown por stdout sin escribir nada
// ════════════════════════════════════════════════════════════════════════

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITE_URL = "https://www.drenpos.com";
const MARCA = "source: html";

// ── Exclusiones ─────────────────────────────────────────────────────────
// Rutas relativas a dist, con "/" como separador.
const EXCLUIR = [
  /^404\.html$/,
  /^500\.html$/,
  /^legal\//,
  /^categories(\/|\.html$)/,
  /^blog\/page\//,
  /^local\/page\//,
  // Los posts del blog ya tienen su .md original (blog/[...slug].md.ts).
  // El índice /blog (blog.html) sí se convierte.
  /^blog\/[^/]+\.html$/,
];

// Carpetas de dist que nunca contienen páginas.
const CARPETAS_IGNORADAS = new Set([
  "_worker.js",
  "_astro",
  "images",
  "fonts",
  "og",
  "schema",
  ".well-known",
  "node_modules",
]);

// ── Entidades HTML ──────────────────────────────────────────────────────
const ENTIDADES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  aacute: "á", eacute: "é", iacute: "í", oacute: "ó", uacute: "ú",
  Aacute: "Á", Eacute: "É", Iacute: "Í", Oacute: "Ó", Uacute: "Ú",
  ntilde: "ñ", Ntilde: "Ñ", uuml: "ü", Uuml: "Ü", ccedil: "ç", Ccedil: "Ç",
  agrave: "à", egrave: "è", ograve: "ò",
  iexcl: "¡", iquest: "¿", laquo: "«", raquo: "»",
  ldquo: "\u201C", rdquo: "\u201D", lsquo: "\u2018", rsquo: "\u2019",
  sbquo: "\u201A", bdquo: "\u201E",
  hellip: "\u2026", ndash: "\u2013", mdash: "\u2014", minus: "\u2212",
  euro: "€", copy: "©", reg: "®", trade: "™", middot: "·", bull: "•",
  times: "×", divide: "÷", deg: "°", ordm: "º", ordf: "ª", sect: "§",
  para: "¶", plusmn: "±", frac12: "½", frac14: "¼", frac34: "¾",
  rarr: "→", larr: "←", uarr: "↑", darr: "↓", check: "✓",
  shy: "", zwj: "", zwnj: "", thinsp: " ", ensp: " ", emsp: " ",
};

function decodificar(texto) {
  if (!texto || texto.indexOf("&") === -1) return texto;
  return texto.replace(/&(#x[0-9a-fA-F]+|#[0-9]+|[a-zA-Z][a-zA-Z0-9]*);/g, (m, c) => {
    if (c[0] === "#") {
      const n = c[1] === "x" || c[1] === "X" ? parseInt(c.slice(2), 16) : parseInt(c.slice(1), 10);
      if (!Number.isFinite(n) || n <= 0 || n > 0x10ffff) return m;
      if (n === 160) return " ";
      try {
        return String.fromCodePoint(n);
      } catch {
        return m;
      }
    }
    return Object.prototype.hasOwnProperty.call(ENTIDADES, c) ? ENTIDADES[c] : m;
  });
}

// ── Parser HTML mínimo ──────────────────────────────────────────────────
const VACIOS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input", "link",
  "meta", "param", "source", "track", "wbr",
]);

// Elementos cuyo contenido se descarta entero antes de parsear.
const DESCARTAR_CRUDO = ["script", "style", "svg", "noscript", "template", "iframe", "math", "canvas", "video", "audio", "object"];

// Elementos que se eliminan del árbol (con todo su contenido).
const ELIMINAR = new Set([
  "header", "nav", "footer", "form", "button", "select", "input",
  "textarea", "option", "label", "dialog", "head", "title", "meta", "link",
]);

// Un <p> se cierra solo al abrir uno de estos.
const CIERRAN_P = new Set([
  "p", "div", "section", "article", "aside", "ul", "ol", "table", "h1", "h2",
  "h3", "h4", "h5", "h6", "blockquote", "pre", "hr", "figure", "details",
  "dl", "header", "footer", "nav", "form", "main",
]);

function parseAtributos(cadena) {
  const attrs = {};
  if (!cadena) return attrs;
  const re = /([^\s"'>\/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let m;
  while ((m = re.exec(cadena))) {
    const nombre = m[1].toLowerCase();
    const valor = m[2] ?? m[3] ?? m[4] ?? "";
    attrs[nombre] = decodificar(valor);
  }
  return attrs;
}

function parsear(html) {
  const raiz = { tag: "#root", attrs: {}, children: [], parent: null };
  const pila = [raiz];
  const actual = () => pila[pila.length - 1];
  const re = /<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<!(?:[^>]*)>|<\/([a-zA-Z][a-zA-Z0-9:-]*)\s*>|<([a-zA-Z][a-zA-Z0-9:-]*)((?:\s+[^\s"'>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?)*)\s*(\/?)>|[^<]+|</g;
  let m;
  while ((m = re.exec(html))) {
    const [token, cierre, apertura, attrsCrudos, autocierre] = m;
    if (token.startsWith("<!")) continue; // comentario, doctype, CDATA
    if (cierre) {
      const tag = cierre.toLowerCase();
      // Cierra hasta el elemento abierto con ese nombre; si no está, ignora.
      for (let i = pila.length - 1; i > 0; i--) {
        if (pila[i].tag === tag) {
          pila.length = i;
          break;
        }
      }
      continue;
    }
    if (apertura) {
      const tag = apertura.toLowerCase();
      const padre = actual();
      if (padre.tag === "p" && CIERRAN_P.has(tag)) pila.pop();
      if (tag === "li" && actual().tag === "li") pila.pop();
      if ((tag === "td" || tag === "th") && (actual().tag === "td" || actual().tag === "th")) pila.pop();
      if (tag === "tr") {
        while (actual().tag === "td" || actual().tag === "th") pila.pop();
        if (actual().tag === "tr") pila.pop();
      }
      if ((tag === "dt" || tag === "dd") && (actual().tag === "dt" || actual().tag === "dd")) pila.pop();
      const nodo = { tag, attrs: parseAtributos(attrsCrudos), children: [], parent: actual() };
      actual().children.push(nodo);
      if (!VACIOS.has(tag) && !autocierre) pila.push(nodo);
      continue;
    }
    // Texto (o un "<" suelto)
    actual().children.push({ tag: "#text", text: decodificar(token), parent: actual() });
  }
  return raiz;
}

function buscar(nodo, tag) {
  if (nodo.tag === tag) return nodo;
  for (const hijo of nodo.children || []) {
    const r = buscar(hijo, tag);
    if (r) return r;
  }
  return null;
}

// ── Filtro de elementos ocultos o de interfaz ───────────────────────────
const VISIBLE_RESPONSIVE = /^(sm|md|lg|xl|2xl):(block|flex|grid|inline|inline-block|inline-flex|table|contents)$/;

function esOculto(nodo) {
  const a = nodo.attrs || {};
  if (a["aria-hidden"] === "true") return true;
  if ("hidden" in a) return true;
  if (a.role === "dialog" || a.role === "alert" || a.role === "status") return true;
  if (a.style && /display\s*:\s*none/i.test(a.style)) return true;
  if (a.class) {
    const clases = a.class.split(/\s+/);
    if (clases.indexOf("hidden") !== -1 && !clases.some((c) => VISIBLE_RESPONSIVE.test(c))) return true;
  }
  return false;
}

function podar(nodo) {
  if (!nodo.children) return;
  nodo.children = nodo.children.filter((h) => {
    if (h.tag === "#text") return true;
    if (ELIMINAR.has(h.tag)) return false;
    if (esOculto(h)) return false;
    podar(h);
    return true;
  });
}

// ── Render a Markdown ───────────────────────────────────────────────────
const BLOQUES = new Set([
  "p", "div", "section", "article", "main", "aside", "body", "h1", "h2", "h3",
  "h4", "h5", "h6", "ul", "ol", "li", "table", "thead", "tbody", "tfoot", "tr",
  "blockquote", "pre", "hr", "figure", "figcaption", "dl", "dt", "dd",
  "details", "summary", "address", "picture", "center", "#root",
]);

function esBloque(nodo) {
  if (nodo.tag === "#text") return false;
  if (BLOQUES.has(nodo.tag)) return true;
  // Un inline que contiene bloques (p. ej. <a> que envuelve una tarjeta)
  // se trata como bloque para no aplastar su contenido en una línea.
  return (nodo.children || []).some(esBloque);
}

function escaparTexto(t) {
  return t.replace(/([\\`*_[\]])/g, "\\$1");
}

function urlAbsoluta(valor, base) {
  if (!valor) return "";
  const v = valor.trim();
  if (/^(mailto:|tel:)/i.test(v)) return v;
  if (/^(javascript:|data:)/i.test(v)) return "";
  try {
    return new URL(v, base).href;
  } catch {
    return v;
  }
}

function envolver(interior, marca) {
  const recortado = interior.trim();
  if (!recortado) return interior;
  const izq = /^\s/.test(interior) ? " " : "";
  const der = /\s$/.test(interior) ? " " : "";
  return `${izq}${marca}${recortado}${marca}${der}`;
}

function textoPlano(nodo) {
  if (nodo.tag === "#text") return nodo.text;
  return (nodo.children || []).map(textoPlano).join("");
}

function renderInline(nodo, ctx) {
  if (nodo.tag === "#text") return escaparTexto(nodo.text.replace(/\s+/g, " "));
  const hijos = () => (nodo.children || []).map((h) => renderInline(h, ctx)).join("");
  switch (nodo.tag) {
    case "br":
      return "\n";
    case "wbr":
      return "";
    case "strong":
    case "b":
      return envolver(hijos(), "**");
    case "em":
    case "i":
      return envolver(hijos(), "*");
    case "s":
    case "del":
      return envolver(hijos(), "~~");
    case "code": {
      const t = textoPlano(nodo).replace(/\s+/g, " ");
      return t ? `\`${t.replace(/`/g, "'")}\`` : "";
    }
    case "img": {
      const alt = (nodo.attrs.alt || "").replace(/\s+/g, " ").trim();
      const src = urlAbsoluta(nodo.attrs.src || "", ctx.base);
      if (!alt || !src) return ""; // decorativa
      return `![${alt.replace(/([[\]])/g, "\\$1")}](${src})`;
    }
    case "a": {
      const texto = hijos().replace(/\s+/g, " ").trim();
      const href = urlAbsoluta(nodo.attrs.href || "", ctx.base);
      if (!texto) return "";
      if (!href) return texto;
      return `[${texto}](${href})`;
    }
    default:
      return hijos();
  }
}

function limpiarLinea(t) {
  return t
    .split("\n")
    .map((l) => l.replace(/[ \t]+/g, " ").trim())
    .filter((l, i, arr) => l || (i > 0 && i < arr.length - 1))
    .join("\n")
    .trim();
}

function indentar(texto, sangria) {
  return texto
    .split("\n")
    .map((l, i) => (i === 0 || !l ? l : sangria + l))
    .join("\n");
}

function renderTabla(nodo, ctx) {
  const filas = [];
  const recorrer = (n) => {
    for (const h of n.children || []) {
      if (h.tag === "tr") {
        const celdas = (h.children || [])
          .filter((c) => c.tag === "td" || c.tag === "th")
          .map((c) => limpiarLinea(renderInline(c, ctx)).replace(/\n+/g, " ").replace(/\|/g, "\\|"));
        if (celdas.length) filas.push(celdas);
      } else if (h.tag === "thead" || h.tag === "tbody" || h.tag === "tfoot") {
        recorrer(h);
      }
    }
  };
  recorrer(nodo);
  if (!filas.length) return "";
  const columnas = Math.max(...filas.map((f) => f.length));
  const completar = (f) => [...f, ...Array(columnas - f.length).fill("")];
  const linea = (f) => `| ${completar(f).join(" | ")} |`;
  // Si la tabla no trae cabecera, la primera fila hace de cabecera.
  const [cab, ...resto] = filas;
  const salida = [linea(cab), `| ${Array(columnas).fill("---").join(" | ")} |`, ...resto.map(linea)];
  return salida.join("\n");
}

function renderLista(nodo, ctx) {
  const ordenada = nodo.tag === "ol";
  let n = Number.parseInt(nodo.attrs.start || "1", 10) || 1;
  const items = [];
  for (const h of nodo.children || []) {
    if (h.tag === "#text") {
      if (h.text.trim()) items.push(`- ${limpiarLinea(escaparTexto(h.text))}`);
      continue;
    }
    if (h.tag !== "li") {
      const dentro = renderBloques(h.children ? [h] : [], ctx);
      if (dentro) items.push(dentro);
      continue;
    }
    const marca = ordenada ? `${n++}. ` : "- ";
    // Sublista pegada al texto del elemento (lista compacta).
    const contenido = renderBloques(h.children || [], ctx).replace(/\n\n(?=(- |\d+\. ))/g, "\n");
    if (!contenido) continue;
    items.push(marca + indentar(contenido, " ".repeat(marca.length)));
  }
  return items.join("\n");
}

function renderBloque(nodo, ctx) {
  const tag = nodo.tag;
  if (/^h[1-6]$/.test(tag)) {
    const t = limpiarLinea(renderInline(nodo, ctx)).replace(/\n+/g, " ");
    if (!t) return "";
    if (tag === "h1") ctx.hayH1 = true;
    return `${"#".repeat(Number(tag[1]))} ${t}`;
  }
  switch (tag) {
    case "p":
      return limpiarLinea(renderInline(nodo, ctx));
    case "ul":
    case "ol":
      return renderLista(nodo, ctx);
    case "table":
      return renderTabla(nodo, ctx);
    case "hr":
      return "---";
    case "pre": {
      const t = textoPlano(nodo).replace(/^\n+|\s+$/g, "");
      return t ? "```\n" + t + "\n```" : "";
    }
    case "blockquote": {
      const t = renderBloques(nodo.children || [], ctx);
      return t ? t.split("\n").map((l) => (l ? `> ${l}` : ">")).join("\n") : "";
    }
    case "dt": {
      const t = limpiarLinea(renderInline(nodo, ctx));
      return t ? `**${t}**` : "";
    }
    case "summary": {
      // Si el summary lleva un encabezado (FAQ), se respeta; si no, negrita.
      if ((nodo.children || []).some(esBloque)) return renderBloques(nodo.children, ctx);
      const t = limpiarLinea(renderInline(nodo, ctx));
      return t ? `**${t}**` : "";
    }
    case "figcaption": {
      const t = limpiarLinea(renderInline(nodo, ctx));
      return t ? `*${t}*` : "";
    }
    default:
      return renderBloques(nodo.children || [], ctx);
  }
}

function renderBloques(hijos, ctx) {
  const bloques = [];
  let buffer = "";
  const volcar = () => {
    const t = limpiarLinea(buffer);
    if (t) bloques.push(t);
    buffer = "";
  };
  for (const h of hijos) {
    if (esBloque(h)) {
      volcar();
      const b = h.tag === "a" ? renderEnlaceBloque(h, ctx) : renderBloque(h, ctx);
      if (b && b.trim()) bloques.push(b);
    } else {
      buffer += renderInline(h, ctx);
    }
  }
  volcar();
  return bloques.join("\n\n");
}

// <a> que envuelve bloques (tarjetas enlazadas): se pinta el contenido y
// al final un enlace con el texto del primer encabezado o "Ver página".
function renderEnlaceBloque(nodo, ctx) {
  const contenido = renderBloques(nodo.children || [], ctx);
  const href = urlAbsoluta(nodo.attrs.href || "", ctx.base);
  if (!href) return contenido;
  const encabezado = buscarEncabezado(nodo);
  const texto = encabezado ? limpiarLinea(renderInline(encabezado, ctx)).replace(/\n+/g, " ") : "Ver página";
  return [contenido, `[${texto}](${href})`].filter(Boolean).join("\n\n");
}

function buscarEncabezado(nodo) {
  for (const h of nodo.children || []) {
    if (/^h[1-6]$/.test(h.tag)) return h;
    const r = h.children ? buscarEncabezado(h) : null;
    if (r) return r;
  }
  return null;
}

// ── Conversión de una página ────────────────────────────────────────────
function metaDe(html, nombre, atributo = "name") {
  const re = new RegExp(`<meta\\s[^>]*${atributo}\\s*=\\s*["']${nombre}["'][^>]*>`, "i");
  const etiqueta = html.match(re);
  if (!etiqueta) return "";
  const c = etiqueta[0].match(/content\s*=\s*("([^"]*)"|'([^']*)')/i);
  return c ? decodificar(c[2] ?? c[3] ?? "").trim() : "";
}

function canonicalDe(html) {
  const etiqueta = html.match(/<link\s[^>]*rel\s*=\s*["']canonical["'][^>]*>/i);
  if (!etiqueta) return "";
  const h = etiqueta[0].match(/href\s*=\s*("([^"]*)"|'([^']*)')/i);
  return h ? decodificar(h[2] ?? h[3] ?? "").trim() : "";
}

function urlDesdeRuta(rel) {
  const limpia = rel.replace(/\\/g, "/").replace(/(^|\/)index\.html$/, "$1").replace(/\.html$/, "");
  return new URL("/" + limpia, SITE_URL).href;
}

export function esNoIndex(html) {
  const robots = metaDe(html, "robots");
  return /noindex/i.test(robots);
}

export function htmlAMarkdown(html, { rutaRelativa = "index.html" } = {}) {
  const tituloCrudo = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const titulo = tituloCrudo ? decodificar(tituloCrudo[1]).replace(/\s+/g, " ").trim() : "";
  const descripcion = metaDe(html, "description");
  const canonical = canonicalDe(html) || urlDesdeRuta(rutaRelativa);

  // JSON-LD: se guarda para añadirlo al final como bloque de código.
  const jsonLd = [];
  html.replace(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi, (_, cuerpo) => {
    const crudo = cuerpo.trim();
    if (!crudo) return "";
    try {
      jsonLd.push(JSON.stringify(JSON.parse(crudo), null, 2));
    } catch {
      jsonLd.push(crudo);
    }
    return "";
  });

  // Fuera todo lo que no es contenido antes de parsear.
  let limpio = html;
  for (const tag of DESCARTAR_CRUDO) {
    limpio = limpio.replace(new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?<\\/${tag}\\s*>`, "gi"), " ");
    limpio = limpio.replace(new RegExp(`<${tag}\\b[^>]*\\/>`, "gi"), " ");
  }

  const arbol = parsear(limpio);
  const contenedor = buscar(arbol, "main") || buscar(arbol, "body") || arbol;
  podar(contenedor);

  const ctx = { base: canonical, hayH1: false };
  let cuerpo = renderBloques(contenedor.children || [], ctx);
  if (!ctx.hayH1 && titulo) cuerpo = `# ${escaparTexto(titulo)}\n\n${cuerpo}`;

  const frontmatter = [
    "---",
    `title: ${JSON.stringify(titulo)}`,
    `description: ${JSON.stringify(descripcion)}`,
    `canonical: ${canonical}`,
    MARCA,
    "---",
  ].join("\n");

  const partes = [frontmatter, cuerpo];
  for (const bloque of jsonLd) partes.push("```json\n" + bloque + "\n```");

  return (
    partes
      .join("\n\n")
      .replace(/[ \t]+$/gm, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim() + "\n"
  );
}

// ── Recorrido de dist ───────────────────────────────────────────────────
function listarHtml(dir, base = dir, salida = []) {
  for (const entrada of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entrada.name);
    if (entrada.isDirectory()) {
      if (dir === base && CARPETAS_IGNORADAS.has(entrada.name)) continue;
      listarHtml(abs, base, salida);
    } else if (entrada.isFile() && entrada.name.endsWith(".html")) {
      salida.push(abs);
    }
  }
  return salida;
}

export function debeConvertirse(rel) {
  const r = rel.split(path.sep).join("/");
  return !EXCLUIR.some((re) => re.test(r));
}

function procesarDist(distDir) {
  const inicio = Date.now();
  let escritos = 0;
  let omitidos = 0;
  for (const abs of listarHtml(distDir)) {
    const rel = path.relative(distDir, abs).split(path.sep).join("/");
    if (!debeConvertirse(rel)) continue;
    const html = fs.readFileSync(abs, "utf-8");
    if (esNoIndex(html)) continue;
    const destino = abs.replace(/\.html$/, ".md");
    if (fs.existsSync(destino)) {
      const previo = fs.readFileSync(destino, "utf-8");
      // Un .md que no es nuestro (blog, otro plugin) se respeta.
      if (!/^---[\s\S]*?\nsource: html\n[\s\S]*?---/.test(previo)) {
        omitidos++;
        continue;
      }
    }
    fs.writeFileSync(destino, htmlAMarkdown(html, { rutaRelativa: rel }), "utf-8");
    escritos++;
  }
  console.log(
    `[markdown-alternates] ${escritos} .md generados, ${omitidos} respetados (ya existían) en ${Date.now() - inicio} ms`,
  );
}

// ── CLI ─────────────────────────────────────────────────────────────────
function main(argv) {
  const iCheck = argv.indexOf("--check");
  if (iCheck !== -1) {
    const fichero = argv[iCheck + 1];
    if (!fichero) {
      console.error("Uso: node scripts/markdown-alternates.mjs --check dist/pagina.html");
      process.exit(1);
    }
    const html = fs.readFileSync(fichero, "utf-8");
    const distGuess = fichero.split(path.sep).join("/").replace(/^.*?\bdist\//, "");
    process.stdout.write(htmlAMarkdown(html, { rutaRelativa: distGuess }));
    return;
  }
  const iDist = argv.indexOf("--dist");
  const distDir = path.resolve(process.cwd(), iDist !== -1 ? argv[iDist + 1] : "dist");
  if (!fs.existsSync(distDir)) {
    console.error(`[markdown-alternates] No existe ${distDir}. Ejecuta antes astro build.`);
    process.exit(1);
  }
  procesarDist(distDir);
}

function rutaReal(p) {
  try {
    return fs.realpathSync(p);
  } catch {
    return path.resolve(p);
  }
}
const esPrincipal = !!process.argv[1] && rutaReal(process.argv[1]) === rutaReal(fileURLToPath(import.meta.url));
if (esPrincipal) main(process.argv.slice(2));
