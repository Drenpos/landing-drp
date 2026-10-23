#!/usr/bin/env node
// Comprueba que el registro de páginas (src/config/landings.json) está al día:
//  - cada página .astro de primer nivel está registrada, y cada ruta registrada existe;
//  - assets.run_worker_first de wrangler.json cubre cada ruta (si no, no hay
//    Markdown por negociación ni cabecera Link);
//  - llms-full.txt menciona cada landing del mega menú;
//  - grupos y hubs apuntan a algo que existe.
import fs from "node:fs";
import path from "node:path";

const raiz = process.cwd();
const leer = (f) => fs.readFileSync(path.join(raiz, f), "utf8");
const { grupos, paginas } = JSON.parse(leer("src/config/landings.json"));
const workerFirst = JSON.parse(leer("wrangler.json")).assets?.run_worker_first ?? [];
const llmsFull = leer("src/pages/llms-full.txt.ts");
const fallos = [];

// Páginas .astro de primer nivel que no son landings públicas
const FUERA = new Set(["404"]);
const rutas = new Set(paginas.map((p) => p.ruta));

for (const f of fs.readdirSync(path.join(raiz, "src/pages"))) {
  if (!f.endsWith(".astro")) continue;
  const nombre = f.replace(/\.astro$/, "");
  if (FUERA.has(nombre)) continue;
  const ruta = nombre === "index" ? "/" : `/${nombre}`;
  if (!rutas.has(ruta)) fallos.push(`${ruta}: existe src/pages/${f} pero no está en landings.json`);
}

const existe = (ruta) =>
  ruta === "/" ||
  fs.existsSync(path.join(raiz, `src/pages${ruta}.astro`)) ||
  fs.existsSync(path.join(raiz, `src/pages${ruta}/index.astro`));

// "/software-*" → /^\/software-.*$/
const cubre = (patron, ruta) =>
  new RegExp(`^${patron.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*")}$`).test(ruta);

const idsGrupo = new Set(grupos.map((g) => g.id));
const vistas = new Set();
for (const p of paginas) {
  if (vistas.has(p.ruta)) fallos.push(`${p.ruta}: repetida en landings.json`);
  vistas.add(p.ruta);
  if (!existe(p.ruta)) fallos.push(`${p.ruta}: está en landings.json pero no hay página`);
  if (!workerFirst.some((pat) => cubre(pat, p.ruta)))
    fallos.push(`${p.ruta}: falta en assets.run_worker_first de wrangler.json`);
  if (p.grupo && !idsGrupo.has(p.grupo)) fallos.push(`${p.ruta}: grupo "${p.grupo}" no existe`);
  if (p.grupo && !llmsFull.includes(`\${BASE}${p.ruta}`))
    fallos.push(`${p.ruta}: no aparece en src/pages/llms-full.txt.ts`);
  if (!p.llms?.trim()) fallos.push(`${p.ruta}: sin descripción "llms"`);
}
for (const g of grupos) {
  if (!rutas.has(g.hub.ruta)) fallos.push(`grupo ${g.id}: el hub ${g.hub.ruta} no está registrado`);
  if (!paginas.some((p) => p.grupo === g.id)) fallos.push(`grupo ${g.id}: sin páginas`);
}

if (fallos.length) {
  console.error(`check-landings: ${fallos.length} problemas:`);
  for (const f of fallos) console.error("  " + f);
  process.exit(1);
}
console.log(`check-landings: ${paginas.length} páginas registradas y cubiertas.`);
