#!/usr/bin/env node
// Paso posterior al build: falla si en dist queda algún [[p:...]] o [[n:...]]
// sin resolver (ver src/lib/precios.ts). Un token sin resolver significa que
// la página no pasó por el middleware y mostraría el código en vez del precio.
import fs from "node:fs";
import path from "node:path";

const dist = process.argv[2] ?? "dist";
const TOKEN = /\[\[(p|n):[^\]\s]{0,60}\]?\]?/;
const EXT = new Set([".html", ".md", ".txt", ".json", ".xml"]);
const fallos = [];

function recorrer(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "_worker.js" || e.name === "_astro") continue;
      recorrer(f);
    } else if (EXT.has(path.extname(e.name))) {
      const m = fs.readFileSync(f, "utf8").match(TOKEN);
      if (m) fallos.push(`${path.relative(dist, f)}: ${m[0]}`);
    }
  }
}

recorrer(dist);
if (fallos.length) {
  console.error(`check-precios: ${fallos.length} archivos con precios sin resolver:`);
  for (const f of fallos.slice(0, 50)) console.error("  " + f);
  process.exit(1);
}
console.log("check-precios: todos los precios resueltos.");
