#!/usr/bin/env node
/**
 * img-hosteleria-2026.mjs
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
 *   node agent/img-hosteleria-2026.mjs              # todos los artículos
 *   node agent/img-hosteleria-2026.mjs --dry        # solo enseña qué haría
 *   node agent/img-hosteleria-2026.mjs --force      # vuelve a descargar todo
 *   node agent/img-hosteleria-2026.mjs --only etiqueta-sscc-gs1-palets
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

// ── Plan por artículo (hostelería + almacén, septiembre 2026) ───────────────
// afterH2: índice (0-based) del H2 tras cuya cápsula se inserta la foto.
// removeBorrowed: quita las imágenes prestadas de otros posts antes de insertar.
const PLAN = [
  {
    slug: "carta-digital-qr-restaurante-guia",
    cover: { queries: ["restaurant table qr code menu", "qr code menu restaurant", "restaurant menu smartphone table"], alt: "Mesa de restaurante con un código QR para abrir la carta digital desde el móvil" },
    sections: [
      { queries: ["restaurant menu allergens", "restaurant menu board chalk", "waiter showing menu to customer"], alt: "Camarero mostrando la carta a unos clientes en un restaurante", afterH2: 1 },
      { queries: ["customer scanning qr code restaurant phone", "person smartphone restaurant table", "scanning qr code cafe"], alt: "Cliente escaneando el QR de la mesa con el móvil para ver la carta", afterH2: 4 },
    ],
  },
  {
    slug: "pantalla-cocina-kds-bares-comandas-perdidas",
    cover: { queries: ["restaurant kitchen chefs working", "busy restaurant kitchen", "chef kitchen orders"], alt: "Cocina de un restaurante en pleno servicio con varios cocineros" },
    sections: [
      { queries: ["kitchen order tickets", "chef reading order ticket kitchen", "restaurant kitchen pass"], alt: "Pase de cocina con comandas a la espera de salir", afterH2: 0 },
      { queries: ["bartender making cocktails bar", "bar counter bartender", "cocktail bar service"], alt: "Camarero de barra preparando bebidas durante el servicio", afterH2: 3 },
    ],
  },
  {
    slug: "gestion-mesas-restaurante-mapa-sala",
    cover: { queries: ["restaurant dining room tables", "restaurant interior tables chairs", "empty restaurant tables set"], alt: "Sala de un restaurante con las mesas preparadas para el servicio" },
    sections: [
      { queries: ["restaurant terrace tables outdoor", "outdoor cafe terrace tables", "sidewalk cafe tables"], alt: "Terraza de un bar con mesas que cambian de sitio según el día", afterH2: 2 },
      { queries: ["waiter card payment restaurant", "paying with card at restaurant", "restaurant bill payment terminal"], alt: "Cobro con tarjeta en la mesa al cerrar la cuenta", afterH2: 6 },
    ],
  },
  {
    slug: "tpv-bares-restaurantes-como-elegir-2026",
    cover: { queries: ["bar pos terminal cafe", "cafe counter point of sale tablet", "restaurant pos system tablet"], alt: "TPV en la barra de un bar con la pantalla de venta abierta" },
    sections: [
      { queries: ["waiter taking order tablet", "waitress tablet order restaurant", "waiter handheld order"], alt: "Camarero tomando la comanda en una tablet junto a la mesa", afterH2: 0 },
      { queries: ["cafe counter cash register", "coffee shop counter barista", "small restaurant owner counter"], alt: "Mostrador de una cafetería con la caja y el terminal de cobro", afterH2: 5 },
    ],
  },
  {
    slug: "pedidos-pago-desde-la-mesa-qr-restaurante",
    cover: { queries: ["person smartphone restaurant table ordering", "ordering food phone restaurant", "smartphone qr code table cafe"], alt: "Cliente pidiendo desde el móvil sentado en la mesa de un restaurante" },
    sections: [
      { queries: ["waiter serving table restaurant", "waiter bringing food to table", "restaurant service waiter"], alt: "Camarero sirviendo los platos en la mesa", afterH2: 2 },
      { queries: ["busy restaurant terrace summer", "crowded outdoor restaurant", "restaurant terrace evening people"], alt: "Terraza llena en verano, el escenario donde pedir desde la mesa más ayuda", afterH2: 4 },
    ],
  },
  {
    slug: "gestion-palets-almacen-frigorifico-fefo-sscc",
    removeBorrowed: "/images/blog/software-almacen-frigorifico-congelados/",
    cover: { queries: ["cold storage warehouse pallets", "frozen warehouse pallet racks", "refrigerated warehouse forklift"], alt: "Palets almacenados en las estanterías de una cámara frigorífica" },
    sections: [
      { queries: ["forklift cold storage warehouse", "forklift lifting pallet warehouse", "pallet jack warehouse worker"], alt: "Carretilla moviendo un palet completo dentro del almacén", afterH2: 1 },
      { queries: ["frozen food boxes warehouse", "frozen food storage boxes", "food warehouse boxes stacked"], alt: "Cajas de producto congelado paletizadas y listas para expedir", afterH2: 3 },
    ],
  },
  {
    slug: "cuanto-cuesta-sga-wms-pyme-2026",
    removeBorrowed: "/images/blog/wms-sga-erp-diferencias/",
    cover: { queries: ["small warehouse shelves boxes", "warehouse owner inventory boxes", "small business warehouse"], alt: "Pequeño almacén de una pyme con estanterías y cajas etiquetadas" },
    sections: [
      { queries: ["business owner laptop warehouse", "warehouse manager laptop", "entrepreneur calculating costs laptop"], alt: "Responsable de una pyme comparando presupuestos de software de almacén", afterH2: 1 },
      { queries: ["warehouse inventory counting clipboard", "warehouse worker counting stock", "inventory check warehouse"], alt: "Recuento manual de stock, el coste oculto de no tener sistema", afterH2: 5 },
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
    s = s.replace(/^image: "[^"]*"/m, `image: "/images/blog/${slug}/cover.jpg"`);
  }
  const plan = PLAN.find((p) => p.slug === slug);
  if (plan && plan.removeBorrowed) {
    s = s
      .split("\n")
      .filter((l) => !(l.startsWith("![") && l.includes(plan.removeBorrowed)))
      .join("\n")
      .replace(/\n{3,}/g, "\n\n");
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
console.log(`\nPexels · hostelería y almacén 2026${DRY ? "  [DRY RUN]" : ""}${FORCE ? "  [FORCE]" : ""}\n`);

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
