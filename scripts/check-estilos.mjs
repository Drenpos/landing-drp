#!/usr/bin/env node
// Falla si un .astro o .css de src/ escribe a mano un color que existe en
// src/config/theme.json. Esos colores tienen que ir por clase del tema
// (text-dark/70, bg-primary/10) o por variable (var(--color-primary)), o un
// tema de temporada (src/config/temas.json) no podría cambiarlos.
import fs from "node:fs";
import path from "node:path";

const raiz = process.cwd();
const theme = JSON.parse(fs.readFileSync(path.join(raiz, "src/config/theme.json"), "utf8"));
const colores = Object.entries(theme.colors.default.theme_color).filter(([, hex]) => /^#[0-9a-f]{6}$/i.test(hex));

// #791b46 y también rgba(121,27,70,…)
const patrones = colores.map(([nombre, hex]) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return { nombre, re: new RegExp(`${hex}\\b|rgba?\\(\\s*${r}\\s*,\\s*${g}\\s*,\\s*${b}\\s*[,)]`, "i") };
});

const fallos = [];
function recorrer(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) recorrer(f);
    else if (/\.(astro|css)$/.test(e.name)) {
      fs.readFileSync(f, "utf8").split("\n").forEach((linea, i) => {
        for (const { nombre, re } of patrones) {
          const m = linea.match(re);
          if (m) fallos.push(`${path.relative(raiz, f)}:${i + 1}: ${m[0]} → usa "${nombre}" del tema`);
        }
      });
    }
  }
}
recorrer(path.join(raiz, "src"));

if (fallos.length) {
  console.error(`check-estilos: ${fallos.length} colores del tema escritos a mano:`);
  for (const f of fallos.slice(0, 50)) console.error("  " + f);
  process.exit(1);
}
console.log("check-estilos: ningún color del tema escrito a mano.");
