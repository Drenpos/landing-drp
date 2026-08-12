#!/usr/bin/env node
/**
 * img-almacen-2026.mjs
 * ---------------------------------------------------------------------------
 * Descarga imágenes reales de sector desde Pexels para los 7 artículos nuevos
 * del clúster de almacén, las recorta al formato del blog y deja los archivos
 * en public/images/blog/<slug>/{cover,section-1,section-2}.jpg.
 *
 * Además, y solo para las imágenes que realmente se han descargado:
 *   · cambia en el frontmatter  image: ".../cover.webp"  ->  ".../cover.jpg"
 *   · inserta los ![alt](/images/blog/<slug>/section-N.jpg) en el cuerpo
 *   · escribe credits.json con autor y URL de cada foto
 *
 * Los H2 elegidos evitan los que ya llevan una figura editorial
 * (figura-1.png / figura-2.png), para que foto y diagrama no se peguen.
 *
 * Es idempotente: si un archivo ya existe, no lo vuelve a descargar (usa
 * --force para rehacerlo). Nunca borra nada.
 *
 * Uso:
 *   node agent/img-almacen-2026.mjs              # todos los artículos
 *   node agent/img-almacen-2026.mjs --dry        # solo enseña qué haría
 *   node agent/img-almacen-2026.mjs --force      # vuelve a descargar todo
 *   node agent/img-almacen-2026.mjs --only etiqueta-sscc-gs1-palets
 *
 * Requiere PEXELS_API_KEY en agent/.env (ya está) y sharp (ya está en el repo).
 * Licencia Pexels: uso comercial permitido, atribución no obligatoria. Aun así
 * dejamos credits.json por buena práctica.
 * ---------------------------------------------------------------------------
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const IMG_DIR = path.join(ROOT, "public/images/blog");
const POSTS_DIR = path.join(ROOT, "src/content/blog");

const argv = process.argv.slice(2);
const DRY = argv.includes("--dry");
const FORCE = argv.includes("--force");
const ONLY = (() => {
  const i = argv.indexOf("--only");
  return i >= 0 ? argv[i + 1] : null;
})();

// ── Clave ───────────────────────────────────────────────────────────────────
function loadKey() {
  if (process.env.PEXELS_API_KEY) return process.env.PEXELS_API_KEY.trim();
  for (const f of [path.join(__dirname, ".env"), path.join(ROOT, ".env")]) {
    if (!fs.existsSync(f)) continue;
    const line = fs
      .readFileSync(f, "utf-8")
      .split("\n")
      .find((l) => l.trim().startsWith("PEXELS_API_KEY="));
    if (line) {
      const v = line.split("=").slice(1).join("=").trim().replace(/^["']|["']$/g, "");
      if (v) return v;
    }
  }
  return "";
}
const KEY = loadKey();
if (!KEY) {
  console.error("ERROR: falta PEXELS_API_KEY en agent/.env o en el entorno.");
  process.exit(1);
}

// ── Plan por artículo ───────────────────────────────────────────────────────
// queries: se prueban en orden hasta encontrar una foto no usada todavía.
// alt: texto en español, descriptivo, para accesibilidad y SEO de imágenes.
// afterH2: índice (0-based) del H2 tras cuyo bloque se inserta la imagen.
const PLAN = [
  {
    slug: "software-almacen-frigorifico-congelados",
    cover: {
      queries: ["cold storage warehouse", "frozen food warehouse", "refrigerated warehouse pallets", "cold room food storage"],
      alt: "Interior de una cámara frigorífica con palets almacenados en estanterías",
    },
    sections: [
      {
        queries: ["frozen food logistics", "refrigerated truck loading dock", "cold chain transport"],
        alt: "Carga de mercancía congelada en un camión frigorífico en el muelle",
        afterH2: 5,
      },
      {
        queries: ["warehouse worker cold storage", "worker winter jacket warehouse", "food warehouse inspection"],
        alt: "Operario revisando mercancía con un dispositivo móvil dentro de una cámara de frío",
        afterH2: 7,
      },
    ],
  },
  {
    slug: "alquiler-huecos-palet-tarifas",
    cover: {
      queries: ["pallet racking warehouse", "warehouse storage racks pallets", "large warehouse aisle pallets", "logistics warehouse storage"],
      alt: "Estanterías de un almacén logístico llenas de huecos de palet ocupados",
    },
    sections: [
      {
        queries: ["forklift warehouse pallet", "forklift moving pallet", "warehouse forklift operator"],
        alt: "Carretilla elevadora colocando un palet en su hueco de estantería",
        afterH2: 4,
      },
      {
        queries: ["logistics manager clipboard warehouse", "warehouse inventory paperwork", "warehouse office desk logistics"],
        alt: "Responsable de almacén revisando la posición de un cliente en depósito",
        afterH2: 6,
      },
    ],
  },
  {
    slug: "preparacion-de-pedidos-picking-almacen",
    cover: {
      queries: ["warehouse worker picking order", "order fulfillment warehouse", "warehouse picking boxes", "worker packing orders warehouse"],
      alt: "Operaria preparando un pedido en el almacén con una caja de picking",
    },
    sections: [
      {
        queries: ["barcode scanner warehouse worker", "handheld scanner inventory", "warehouse scanning package"],
        alt: "Operario escaneando la ubicación de un producto con pistola lectora",
        afterH2: 1,
      },
      {
        queries: ["packing station boxes shipping", "warehouse packing table", "shipping boxes ready dispatch"],
        alt: "Zona de preparados con pedidos listos para expedir en el muelle de carga",
        afterH2: 7,
      },
    ],
  },
  {
    slug: "etiqueta-sscc-gs1-palets",
    cover: {
      queries: ["barcode label package", "shipping label box warehouse", "wrapped pallet warehouse", "label printer warehouse"],
      alt: "Etiqueta con código de barras pegada en un palet retractilado",
    },
    sections: [
      {
        queries: ["barcode scanning package logistics", "scanner reading barcode box", "warehouse label scanning"],
        alt: "Lectura del código de barras de una unidad logística con escáner",
        afterH2: 6,
      },
      {
        queries: ["stretch wrapped pallets warehouse", "pallets stacked warehouse", "goods on pallets logistics"],
        alt: "Palets preparados y retractilados esperando su expedición",
        afterH2: 8,
      },
    ],
  },
  {
    slug: "wms-sga-erp-diferencias",
    cover: {
      queries: ["warehouse manager tablet", "logistics manager computer warehouse", "warehouse management software screen", "supervisor warehouse laptop"],
      alt: "Responsable de logística consultando el sistema de gestión desde una tablet en el almacén",
    },
    sections: [
      {
        queries: ["business team meeting office software", "office team analyzing data", "colleagues discussing software office"],
        alt: "Equipo de una pyme evaluando qué sistema de gestión de almacén necesita",
        afterH2: 1,
      },
      {
        queries: ["modern warehouse interior wide", "distribution center interior", "warehouse logistics center"],
        alt: "Vista general de un centro de distribución con estanterías y zonas diferenciadas",
        afterH2: 5,
      },
    ],
  },
  {
    slug: "trazabilidad-alimentaria-lotes-recall",
    cover: {
      queries: ["food factory quality control", "food safety inspection factory", "food processing plant worker", "food production line hygiene"],
      alt: "Control de calidad en una planta de producción de alimentos",
    },
    sections: [
      {
        queries: ["food packaging production line", "packaged food conveyor", "food labels production"],
        alt: "Línea de envasado donde cada lote recibe su etiqueta y su fecha de caducidad",
        afterH2: 3,
      },
      {
        queries: ["supermarket warehouse food boxes", "grocery distribution warehouse", "food distribution center"],
        alt: "Almacén de distribución alimentaria con producto agrupado por lotes",
        afterH2: 7,
      },
    ],
  },
  {
    slug: "despiece-merma-trazabilidad-carnica",
    cover: {
      queries: ["butcher cutting meat professional", "meat processing plant worker", "butcher shop preparing meat", "meat industry factory"],
      alt: "Profesional despiezando carne en una sala de despiece",
    },
    sections: [
      {
        queries: ["meat processing factory line", "meat industry production", "meat packing plant"],
        alt: "Sala de despiece industrial con producto en proceso de transformación",
        afterH2: 5,
      },
      {
        queries: ["butcher weighing meat scale", "meat portions packaging", "vacuum packed meat"],
        alt: "Pesaje y envasado de las piezas resultantes del despiece, cada una con su lote",
        afterH2: 6,
      },
    ],
  },
];

// ── Pexels ──────────────────────────────────────────────────────────────────
const used = new Set();

async function search(query, page = 1) {
  const url = new URL("https://api.pexels.com/v1/search");
  url.searchParams.set("query", query);
  url.searchParams.set("orientation", "landscape");
  url.searchParams.set("per_page", "20");
  url.searchParams.set("page", String(page));
  const res = await fetch(url, { headers: { Authorization: KEY } });
  if (res.status === 429) {
    console.warn("   ! Pexels 429 (límite de peticiones) — espera 60 s y reintenta");
    return [];
  }
  if (!res.ok) {
    console.warn(`   ! Pexels ${res.status} para "${query}"`);
    return [];
  }
  const data = await res.json();
  return data.photos || [];
}

async function pick(queries) {
  for (const q of queries) {
    for (const page of [1, 2]) {
      const photos = await search(q, page);
      const cand = photos.find((p) => !used.has(p.id) && p.width >= 1600);
      if (cand) {
        used.add(cand.id);
        return { photo: cand, query: q };
      }
    }
  }
  return null;
}

async function download(photo, dest, w, h) {
  const src = photo.src.original || photo.src.large2x || photo.src.large;
  const res = await fetch(src);
  if (!res.ok) throw new Error(`descarga ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await sharp(buf)
    .resize(w, h, { fit: "cover", position: "attention" })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(dest);
  return fs.statSync(dest).size;
}

// ── Parcheo del artículo ────────────────────────────────────────────────────
function patchPost(slug, gotCover, gotSections) {
  const file = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) {
    console.warn(`   ! no existe ${file}`);
    return;
  }
  let s = fs.readFileSync(file, "utf-8");
  const before = s;

  if (gotCover) {
    s = s.replace(
      new RegExp(`image: "/images/blog/${slug}/cover\\.webp"`),
      `image: "/images/blog/${slug}/cover.jpg"`,
    );
  }

  // Separar frontmatter del cuerpo para no tocar el YAML al insertar imágenes.
  const fmEnd = s.indexOf("\n---", 3);
  const head = s.slice(0, fmEnd + 4);
  let body = s.slice(fmEnd + 4);

  for (const sec of gotSections) {
    const md = `![${sec.alt}](/images/blog/${slug}/${sec.name}.jpg)`;
    if (body.includes(`/${slug}/${sec.name}.jpg`)) continue; // ya insertada

    const lines = body.split("\n");
    const h2s = lines
      .map((l, i) => (/^## /.test(l) ? i : -1))
      .filter((i) => i >= 0);
    const target = h2s[sec.afterH2];
    if (target === undefined) {
      console.warn(`   ! ${slug}: no hay H2 #${sec.afterH2}, imagen no insertada`);
      continue;
    }
    // Insertar tras la cápsula de respuesta: primer párrafo no vacío después del H2.
    let i = target + 1;
    while (i < lines.length && lines[i].trim() === "") i++;
    while (i < lines.length && lines[i].trim() !== "") i++;
    lines.splice(i, 0, "", md);
    body = lines.join("\n");
  }

  s = head + body;
  if (s !== before && !DRY) fs.writeFileSync(file, s, "utf-8");
  if (s !== before) console.log(`   ↳ artículo actualizado: src/content/blog/${slug}.md`);
}

// ── Main ────────────────────────────────────────────────────────────────────
console.log(`\nPexels · clúster de almacén${DRY ? "  [DRY RUN]" : ""}${FORCE ? "  [FORCE]" : ""}\n`);

let totalOk = 0;
let totalSkip = 0;
let totalFail = 0;

for (const post of PLAN) {
  if (ONLY && post.slug !== ONLY) continue;
  console.log(`▸ ${post.slug}`);
  const dir = path.join(IMG_DIR, post.slug);
  if (!DRY) fs.mkdirSync(dir, { recursive: true });

  const credits = [];
  const jobs = [
    { name: "cover", w: 1200, h: 675, ...post.cover },
    ...post.sections.map((s, i) => ({ name: `section-${i + 1}`, w: 1200, h: 630, ...s })),
  ];
  const gotSections = [];
  let gotCover = false;

  for (const job of jobs) {
    const dest = path.join(dir, `${job.name}.jpg`);
    if (fs.existsSync(dest) && !FORCE) {
      console.log(`   = ${job.name}.jpg ya existe (usa --force para rehacerla)`);
      totalSkip++;
      if (job.name === "cover") gotCover = true;
      else gotSections.push({ name: job.name, alt: job.alt, afterH2: job.afterH2 });
      continue;
    }
    try {
      const hit = await pick(job.queries);
      if (!hit) {
        console.warn(`   ✗ ${job.name}: ninguna query dio resultado`);
        totalFail++;
        continue;
      }
      if (DRY) {
        console.log(`   · ${job.name}.jpg <- "${hit.query}" · ${hit.photo.photographer} · ${hit.photo.url}`);
        totalOk++;
      } else {
        const bytes = await download(hit.photo, dest, job.w, job.h);
        console.log(`   ✓ ${job.name}.jpg (${Math.round(bytes / 1024)} KB) <- "${hit.query}" · ${hit.photo.photographer}`);
        totalOk++;
      }
      credits.push({
        file: `${job.name}.jpg`,
        query: hit.query,
        photographer: hit.photo.photographer,
        photographer_url: hit.photo.photographer_url,
        pexels_url: hit.photo.url,
        alt: job.alt,
      });
      if (job.name === "cover") gotCover = true;
      else gotSections.push({ name: job.name, alt: job.alt, afterH2: job.afterH2 });
    } catch (e) {
      console.error(`   ✗ ${job.name}: ${e.message}`);
      totalFail++;
    }
    await new Promise((r) => setTimeout(r, 350)); // cortesía con la API
  }

  if (credits.length && !DRY) {
    const cf = path.join(dir, "credits.json");
    const prev = fs.existsSync(cf) ? JSON.parse(fs.readFileSync(cf, "utf-8")) : [];
    const merged = [...prev.filter((p) => !credits.some((c) => c.file === p.file)), ...credits];
    fs.writeFileSync(cf, JSON.stringify(merged, null, 2), "utf-8");
  }

  patchPost(post.slug, gotCover, gotSections);
  console.log("");
}

console.log(`Resumen: ${totalOk} descargadas · ${totalSkip} ya existían · ${totalFail} fallidas`);
console.log("Licencia Pexels: uso comercial permitido sin atribución obligatoria.");
console.log("Se ha dejado credits.json en cada carpeta por trazabilidad.\n");
if (!DRY) console.log("Siguiente paso: npm run build\n");
