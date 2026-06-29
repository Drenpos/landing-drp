#!/usr/bin/env node
/**
 * Migra los posts .md/.mdx del proyecto a Strapi.
 *
 *   src/content/blog/*  -> content-type "blog-posts"
 *   src/content/local/* -> content-type "local-posts"
 *
 * Idempotente: si ya existe un post con el mismo slug, lo ACTUALIZA (no duplica).
 * Mantiene el slug = nombre de archivo, así las URLs del site no cambian.
 *
 * Uso:
 *   STRAPI_URL=http://14.0.0.6:1337 \
 *   STRAPI_API_TOKEN=xxxxx \
 *   node scripts/migrate-md-to-strapi.mjs [--dry-run] [--only=blog|local]
 *
 * El token se crea en: Strapi Admin -> Settings -> API Tokens
 *   (tipo Full access, o Custom con create/update/find en ambos content-types).
 */

import { readdir, readFile, stat } from "node:fs/promises";
import { join, basename, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// Node no carga .env solo (a diferencia de Astro/Vite). Lo cargamos aquí.
try {
  process.loadEnvFile(join(ROOT, ".env"));
} catch {
  // sin .env o Node viejo: se usan las env ya presentes en el shell
}

const STRAPI_URL = (process.env.STRAPI_URL || "http://14.0.0.6:1337").replace(
  /\/$/,
  "",
);
const TOKEN = process.env.STRAPI_API_TOKEN || "";
const DRY = process.argv.includes("--dry-run");
const ONLY = (process.argv.find((a) => a.startsWith("--only=")) || "").split(
  "=",
)[1];

if (!STRAPI_URL) fail("Falta STRAPI_URL");
if (!TOKEN && !DRY) fail("Falta STRAPI_API_TOKEN (o usa --dry-run)");

const SOURCES = [
  { dir: "src/content/blog", type: "post-blogs" },
  { dir: "src/content/local", type: "post-locals" },
].filter((s) => !ONLY || s.dir.endsWith(ONLY));

function fail(msg) {
  console.error(`✖ ${msg}`);
  process.exit(1);
}

function toIso(d) {
  if (!d) return undefined;
  const date = d instanceof Date ? d : new Date(d);
  return isNaN(+date) ? undefined : date.toISOString();
}

/** Frontmatter .md -> payload Strapi (campos del schema que definimos) */
function toPayload(slug, fm, body, { imageId, avatarUrl }) {
  return {
    slug,
    title: fm.title ?? slug,
    meta_title: fm.meta_title ?? null,
    description: fm.description ?? null,
    date: fm.date ? toIso(fm.date)?.slice(0, 10) : null, // campo date (YYYY-MM-DD)
    image: imageId ?? null, // Media: id del archivo subido
    author: fm.author
      ? {
          name: fm.author.name ?? "Admin",
          designation: fm.author.designation ?? "",
          avatar: avatarUrl ?? "", // Text: URL absoluta en Strapi
        }
      : null,
    hero: fm.hero?.title
      ? { title: fm.hero.title, description: fm.hero.description ?? null }
      : null,
    categories: Array.isArray(fm.categories) ? fm.categories : [],
    tags: Array.isArray(fm.tags) ? fm.tags : [],
    featured: !!fm.featured,
    body,
    // publica de inmediato (sirve para v4; en v5 ver nota al final del script)
    publishedAt: toIso(new Date()),
  };
}

async function api(path, opts = {}) {
  const res = await fetch(`${STRAPI_URL}/api/${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
      ...(opts.headers || {}),
    },
  });
  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = { raw: text };
  }
  if (!res.ok) {
    throw new Error(
      `${res.status} ${res.statusText} — ${JSON.stringify(json?.error ?? json)}`,
    );
  }
  return json;
}

// ── Media (subida de imágenes a Strapi) ───────────────────────────────────

const MIME = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
};

const mediaCache = new Map(); // ruta del site (/images/..) -> { id, url }

/** Ruta del site (/images/x) -> archivo real en public/ */
function publicPath(sitePath) {
  return join(ROOT, "public", sitePath.replace(/^\//, ""));
}

/** Nombre único y ASCII para encontrar/identificar el media (deriva de la ruta) */
function mediaName(sitePath) {
  return sitePath
    .replace(/^\//, "")
    .replace(/\.[^.]+$/, "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .toLowerCase();
}

/** Busca un media ya subido por su name (evita duplicar en re-runs) */
async function findMedia(name) {
  const q = new URLSearchParams({
    "filters[name][$containsi]": name,
    "pagination[pageSize]": "1",
  });
  const json = await api(`upload/files?${q}`);
  const hit = Array.isArray(json) ? json[0] : json?.data?.[0];
  if (!hit) return null;
  const url = hit.url?.startsWith("http") ? hit.url : `${STRAPI_URL}${hit.url}`;
  return { id: hit.id, url };
}

/**
 * Sube una imagen del proyecto a Strapi Media (idempotente vía caché + name).
 * Devuelve { id, url } o null si el archivo no existe.
 */
async function uploadMedia(sitePath) {
  if (!sitePath || typeof sitePath !== "string") return null;
  if (mediaCache.has(sitePath)) return mediaCache.get(sitePath);

  const file = publicPath(sitePath);
  try {
    await stat(file);
  } catch {
    console.warn(`    ⚠ imagen no encontrada: ${sitePath}`);
    mediaCache.set(sitePath, null);
    return null;
  }

  const name = mediaName(sitePath);

  // ¿ya está subido?
  const existing = await findMedia(name);
  if (existing) {
    mediaCache.set(sitePath, existing);
    return existing;
  }

  const buf = await readFile(file);
  const ext = extname(file).toLowerCase();
  const fileName = `${name}${ext}`;
  const form = new FormData();
  form.append(
    "files",
    new Blob([buf], { type: MIME[ext] || "application/octet-stream" }),
    fileName
  );
  form.append("fileInfo", JSON.stringify({ name }));

  const res = await fetch(`${STRAPI_URL}/api/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}` }, // sin Content-Type: lo pone FormData
    body: form,
  });
  if (!res.ok) {
    throw new Error(`upload ${sitePath}: ${res.status} ${await res.text()}`);
  }
  const out = await res.json();
  const f = out?.[0];
  const url = f.url?.startsWith("http") ? f.url : `${STRAPI_URL}${f.url}`;
  const media = { id: f.id, url };
  mediaCache.set(sitePath, media);
  return media;
}

/** documentId (v5) o id (v4) del post existente con ese slug, o null */
async function findBySlug(type, slug) {
  const q = new URLSearchParams({
    "filters[slug][$eq]": slug,
    "pagination[pageSize]": "1",
  });
  const json = await api(`${type}?${q}`);
  const hit = json?.data?.[0];
  if (!hit) return null;
  return hit.documentId ?? hit.id ?? null;
}

async function migrateDir({ dir, type }) {
  const abs = join(ROOT, dir);
  let files;
  try {
    files = await readdir(abs);
  } catch {
    console.log(`· (sin carpeta ${dir})`);
    return { ok: 0, skip: 0, err: 0 };
  }
  const posts = files.filter(
    (f) => /\.(md|mdx)$/.test(f) && !basename(f, extname(f)).startsWith("-"), // ignora -index
  );

  let ok = 0,
    err = 0;
  console.log(`\n▸ ${dir} → ${type}  (${posts.length} posts)`);

  for (const file of posts) {
    const slug = basename(file, extname(file));
    const raw = await readFile(join(abs, file), "utf8");
    const { data: fm, content } = matter(raw);

    if (DRY) {
      console.log(`  · [dry] ${slug}  (${fm.title})`);
      ok++;
      continue;
    }

    try {
      // Sube imagen de portada y avatar a Strapi Media
      const img = await uploadMedia(fm.image);
      const ava = fm.author?.avatar
        ? await uploadMedia(fm.author.avatar)
        : null;
      const payload = toPayload(slug, fm, content.trim(), {
        imageId: img?.id,
        avatarUrl: ava?.url,
      });

      const id = await findBySlug(type, slug);
      if (id) {
        await api(`${type}/${id}`, {
          method: "PUT",
          body: JSON.stringify({ data: payload }),
        });
        console.log(`  ↻ actualizado ${slug}`);
      } else {
        await api(type, {
          method: "POST",
          body: JSON.stringify({ data: payload }),
        });
        console.log(`  ✚ creado ${slug}`);
      }
      ok++;
    } catch (e) {
      console.error(`  ✖ ${slug}: ${e.message}`);
      err++;
    }
  }
  return { ok, err };
}

let totalOk = 0,
  totalErr = 0;
for (const src of SOURCES) {
  const r = await migrateDir(src);
  totalOk += r.ok;
  totalErr += r.err;
}

console.log(
  `\n${DRY ? "[DRY-RUN] " : ""}Listo. OK=${totalOk} Errores=${totalErr}`,
);
if (totalErr) process.exit(1);
