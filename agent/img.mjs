#!/usr/bin/env node
/**
 * Descarga las imágenes del post "Cómo organizar el almacén de una pyme"
 * desde Pexels y las guarda en public/images/blog/como-organizar-almacen-pyme/
 * (sobrescribe los placeholders actuales).
 *
 * Sin dependencias: usa fetch nativo (Node 18+) y lee el .env a mano.
 *
 * Uso (desde la raíz del proyecto, landing-drp/):
 *   node agent/img.mjs
 */
import { readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// ---------- Config ----------
// Ajusta si tu carpeta pública es 'static/' en vez de 'public/'
const OUTPUT_DIR = "public/images/blog/como-organizar-almacen-pyme";

// [nombre_archivo, query en Pexels, orientación]
const IMAGES = [
  ["cover.jpg", "organized warehouse shelves boxes racking", "landscape"],
  ["section-1.jpg", "warehouse worker organizing shelves boxes", "landscape"],
  ["section-2.jpg", "warehouse worker barcode scanner inventory", "landscape"],
];

// ---------- Cargar PEXELS_API_KEY (env o .env) ----------
function loadApiKey() {
  if (process.env.PEXELS_API_KEY) return process.env.PEXELS_API_KEY;
  for (const envPath of [".env", ".env.local", "agent/.env"]) {
    if (!existsSync(envPath)) continue;
    const line = readFileSync(envPath, "utf8")
      .split("\n")
      .find((l) => l.trim().startsWith("PEXELS_API_KEY"));
    if (line) {
      return line.split("=").slice(1).join("=").trim().replace(/^["']|["']$/g, "");
    }
  }
  return null;
}

const API_KEY = loadApiKey();
if (!API_KEY) {
  console.error("ERROR: define PEXELS_API_KEY en tu .env o como variable de entorno.");
  process.exit(1);
}

// ---------- Pexels ----------
async function searchPhoto(query, orientation) {
  const url = new URL("https://api.pexels.com/v1/search");
  url.searchParams.set("query", query);
  url.searchParams.set("orientation", orientation);
  url.searchParams.set("per_page", "5");
  url.searchParams.set("size", "large");

  const res = await fetch(url, { headers: { Authorization: API_KEY } });
  if (!res.ok) throw new Error(`Pexels ${res.status}: ${await res.text()}`);

  const { photos = [] } = await res.json();
  if (photos.length === 0) return null;
  // 'large2x' (~1880px) es buen equilibrio calidad/peso para un blog
  return photos[0].src.large2x || photos[0].src.large;
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Descarga fallida ${res.status}: ${url}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  writeFileSync(dest, buffer);
}

// ---------- Main ----------
async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const [filename, query, orientation] of IMAGES) {
    console.log(`Buscando: '${query}' ...`);
    try {
      const url = await searchPhoto(query, orientation);
      if (!url) {
        console.warn(`  !! Sin resultados para '${query}'. Prueba otra query.`);
        continue;
      }
      const dest = join(OUTPUT_DIR, filename);
      await download(url, dest);
      console.log(`  OK -> ${dest}`);
    } catch (err) {
      console.error(`  ERROR con '${query}': ${err.message}`);
    }
  }

  console.log("\nListo. La licencia de Pexels permite uso comercial sin atribución,");
  console.log("pero revisa cada foto antes de publicar por si alguna no encaja.");
}

main();
