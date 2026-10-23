#!/usr/bin/env node
// Comprueba las reglas de mantenimiento de CLAUDE.md sobre el código fuente
// (no sobre dist): muletillas de IA, casos inventados, datos de empresa
// escritos a mano y metadatos del blog. Falla el build si hay errores; los
// avisos solo se imprimen.
//
// Uso: node scripts/check-contenido.mjs [--avisos]
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const VER_AVISOS = process.argv.includes("--avisos");

// Muletillas que delatan texto generado. Minúsculas; se buscan sin distinguir
// mayúsculas. Añade aquí las que vayas viendo.
const MULETILLAS = [
  "en el mundo actual",
  "en la era digital",
  "sin duda",
  "cabe destacar",
  "es importante destacar",
  "es importante señalar",
  "juega un papel",
  "en definitiva",
  "en conclusión",
  "sumérgete",
  "siguiente nivel",
  "solución integral",
  "aliado perfecto",
  "aliado ideal",
  "sin fisuras",
  "dolor de cabeza",
  "di adiós",
  "rompen el molde",
  "rompe el molde",
  "revoluciona",
  "¿te imaginas",
];

// Empresas de ejemplo que se colaron como si fueran clientes reales.
const CASOS_INVENTADOS = ["Distribuciones López", "Ferretería Martínez", "Transportes Vega"];

// Datos de empresa que solo pueden vivir en src/config/empresa.json.
const DATOS_EMPRESA = [/640\s?315\s?259/, /administracion@drenpos\.com/];

// La colección local queda fuera hasta que se decida qué hacer con ella.
const DIRS_TEXTO = ["src/content/blog", "src/content/sections", "src/content/homepage", "src/pages", "src/layouts"];
const DIRS_CODIGO = ["src/pages", "src/layouts", "src/lib"];
// Ficheros que pueden contener los datos (la fuente o páginas legales).
const PERMITIDOS_EMPRESA = new Set(["src/config/empresa.json"]);
// testimonial.md son reseñas reales copiadas literalmente: no se corrigen.
const PERMITIDOS_TEXTO = new Set(["src/content/sections/testimonial.md"]);

const errores = [];
const avisos = [];

function* ficheros(dir, ext) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) yield* ficheros(f, ext);
    else if (ext.test(e.name)) yield f;
  }
}

function esBorrador(f, texto) {
  if (!f.endsWith(".md") && !f.endsWith(".mdx")) return false;
  try {
    return matter(texto).data.draft === true;
  } catch {
    return false;
  }
}

function lineaDe(texto, idx) {
  return texto.slice(0, idx).split("\n").length;
}

// 1. Muletillas y casos inventados en todo el texto público.
for (const dir of DIRS_TEXTO) {
  for (const f of ficheros(dir, /\.(md|mdx|astro|ts)$/)) {
    if (PERMITIDOS_TEXTO.has(f)) continue;
    const texto = fs.readFileSync(f, "utf8");
    if (esBorrador(f, texto)) continue;
    const bajo = texto.toLowerCase();
    for (const m of MULETILLAS) {
      const i = bajo.indexOf(m);
      if (i >= 0) errores.push(`${f}:${lineaDe(texto, i)}: muletilla "${m}"`);
    }
    for (const c of CASOS_INVENTADOS) {
      const i = texto.indexOf(c);
      if (i >= 0) errores.push(`${f}:${lineaDe(texto, i)}: caso inventado "${c}"`);
    }
  }
}

// 2. Datos de empresa y URL del sitio escritos a mano en código.
for (const dir of DIRS_CODIGO) {
  for (const f of ficheros(dir, /\.(astro|ts|tsx|js|mjs)$/)) {
    if (PERMITIDOS_EMPRESA.has(f) || f.includes(`${path.sep}legal${path.sep}`)) continue;
    const texto = fs.readFileSync(f, "utf8");
    for (const re of DATOS_EMPRESA) {
      const m = texto.match(re);
      if (m) errores.push(`${f}:${lineaDe(texto, m.index)}: "${m[0]}" va en src/config/empresa.json`);
    }
    const url = texto.indexOf("https://www.drenpos.com");
    if (url >= 0) avisos.push(`${f}:${lineaDe(texto, url)}: URL del sitio a mano, usa abs() de @/lib/site`);
  }
}

// 3. Metadatos del blog.
for (const f of ficheros("src/content/blog", /\.mdx?$/)) {
  if (path.basename(f).startsWith("-")) continue;
  const { data, content } = matter(fs.readFileSync(f, "utf8"));
  if (data.draft === true) continue;
  const titulo = data.meta_title ?? data.title ?? "";
  if (titulo.length > 60) avisos.push(`${f}: meta_title de ${titulo.length} caracteres (máx. 60)`);
  const d = data.description ?? "";
  if (d.length < 110 || d.length > 160) avisos.push(`${f}: description de ${d.length} caracteres (110-160)`);
  if (!data.updated) avisos.push(`${f}: falta "updated"`);
  if (!data.faq?.length) avisos.push(`${f}: sin faq`);
  const internos = content.match(/\]\(\/[^)]+\)/g) ?? [];
  if (internos.length < 2) avisos.push(`${f}: ${internos.length} enlaces internos (mín. 2)`);
  for (const alt of content.matchAll(/!\[([^\]]*)\]\(/g)) {
    if (!alt[1] || /\b(the|with|and|of|using|woman|man|people|team)\b/i.test(alt[1]))
      avisos.push(`${f}: alt vacío o en inglés: "${alt[1].slice(0, 50)}"`);
  }
}

if (VER_AVISOS || errores.length) {
  for (const a of avisos) console.warn(`  aviso  ${a}`);
}
if (errores.length) {
  console.error(`check-contenido: ${errores.length} errores`);
  for (const e of errores) console.error(`  error  ${e}`);
  process.exit(1);
}
console.log(`check-contenido: sin errores (${avisos.length} avisos; --avisos para verlos).`);
