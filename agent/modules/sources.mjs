/**
 * Módulo · Fuentes (Sources / Grounding)
 * ─────────────────────────────────────────────────────────────────────────
 * Carga documentos locales (.md, .txt, .html, .json) y URLs externas
 * para usarlos como "fuente de verdad" en la generación.
 *
 * El objetivo es ANCLAR al modelo: solo puede usar datos, cifras, fechas,
 * referencias legales o citas que aparezcan literalmente en este corpus.
 *
 * Nota sobre PDFs:
 *   No instalamos dependencias nuevas. Si quieres alimentar un PDF, conviértelo
 *   antes a .txt o .md y guárdalo en agent/sources/.
 *   Tip rápido: en macOS basta con `pdftotext input.pdf output.txt` (poppler).
 */
import { readFileSync, existsSync, statSync } from "fs";
import { extname, basename, resolve } from "path";
import { log } from "../utils/logger.mjs";
import { fetchPage, extractText, extractTitle } from "../utils/scraper.mjs";

const SUPPORTED_EXT = new Set([".md", ".txt", ".html", ".htm", ".json"]);

/** Limpia un bloque de texto extraído de Markdown o HTML */
function normalize(text = "") {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Trunca por número de palabras manteniendo el sentido */
function clampWords(text, maxWords) {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + " …";
}

/** Carga un único archivo local */
function loadFile(path, maxWords) {
  const abs = resolve(path);
  if (!existsSync(abs)) {
    log.warn(`Fuente no encontrada: ${path}`);
    return null;
  }
  const stat = statSync(abs);
  if (!stat.isFile()) {
    log.warn(`No es un archivo: ${path}`);
    return null;
  }
  const ext = extname(abs).toLowerCase();
  if (!SUPPORTED_EXT.has(ext)) {
    log.warn(
      `Extensión no soportada (${ext}). Convierte a .md/.txt/.html: ${path}`,
    );
    return null;
  }

  let raw;
  try {
    raw = readFileSync(abs, "utf-8");
  } catch (e) {
    log.warn(`No se pudo leer ${path}: ${e.message}`);
    return null;
  }

  let text = raw;
  if (ext === ".html" || ext === ".htm") text = extractText(raw);
  if (ext === ".json") {
    try {
      text = JSON.stringify(JSON.parse(raw), null, 2);
    } catch {
      // dejarlo en bruto si no es JSON válido
    }
  }

  text = normalize(text);
  text = clampWords(text, maxWords);

  return {
    kind: "file",
    label: basename(abs),
    origin: abs,
    text,
    wordCount: text.split(/\s+/).filter(Boolean).length,
  };
}

/** Descarga y limpia una URL externa */
async function loadUrl(url, maxWords, timeoutMs = 15000) {
  const html = await fetchPage(url, timeoutMs);
  if (!html) {
    log.warn(`No se pudo descargar: ${url}`);
    return null;
  }
  const title = extractTitle(html) || url;
  const text = clampWords(normalize(extractText(html)), maxWords);
  return {
    kind: "url",
    label: title,
    origin: url,
    text,
    wordCount: text.split(/\s+/).filter(Boolean).length,
  };
}

/**
 * Cargar todas las fuentes (archivos + URLs).
 * @param {object} opts
 * @param {string[]} [opts.files]   - rutas relativas o absolutas
 * @param {string[]} [opts.urls]    - URLs https://...
 * @param {number}   [opts.maxWordsPerSource=2000]
 * @returns {Promise<Array<{kind, label, origin, text, wordCount}>>}
 */
export async function loadSources({
  files = [],
  urls = [],
  maxWordsPerSource = 2000,
} = {}) {
  if (files.length === 0 && urls.length === 0) return [];

  log.step(
    "MÓDULO · FUENTES",
    `Cargando ${files.length} archivo(s) y ${urls.length} URL(s)`,
  );

  const out = [];

  for (const f of files) {
    const doc = loadFile(f, maxWordsPerSource);
    if (doc) {
      out.push(doc);
      log.success(`Archivo OK · ${doc.label} (${doc.wordCount} palabras)`);
    }
  }

  for (const u of urls) {
    const doc = await loadUrl(u, maxWordsPerSource);
    if (doc) {
      out.push(doc);
      log.success(`URL OK · ${doc.label} (${doc.wordCount} palabras)`);
    }
  }

  if (out.length === 0) {
    log.warn(
      "No se cargó ninguna fuente válida. La generación NO estará anclada a documentos.",
    );
  } else {
    const total = out.reduce((a, b) => a + b.wordCount, 0);
    log.info(`Corpus de fuentes: ${out.length} documentos · ${total} palabras`);
  }

  return out;
}

/**
 * Formatear las fuentes para inyectarlas en el prompt del modelo.
 * Genera bloques claramente delimitados con [FUENTE n] como referencia.
 */
export function formatSourcesForPrompt(sources = []) {
  if (!sources.length) return "";

  const blocks = sources
    .map((s, i) => {
      const head =
        s.kind === "url"
          ? `[FUENTE ${i + 1} · URL]  ${s.label}\n${s.origin}`
          : `[FUENTE ${i + 1} · DOC]  ${s.label}`;
      return `${head}\n--------------------------------------------------\n${s.text}\n--------------------------------------------------`;
    })
    .join("\n\n");

  return blocks;
}
