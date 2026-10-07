import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import clerk from "@clerk/astro";
import { gitLastmod } from "@jdevalk/astro-seo-graph";
import seoGraph from "@jdevalk/astro-seo-graph/integration";
import { defineConfig, passthroughImageService } from "astro/config";
import AutoImport from "astro-auto-import";
import icon from "astro-icon";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import tailwindcss from "@tailwindcss/vite";
import { loadEnv } from "vite";
import { execFileSync } from "child_process";
import config from "./src/config/config.json";

// Carga .env + process.env (Jenkins) para tenerlos disponibles en config-time.
const env = loadEnv(process.env.NODE_ENV ?? "production", process.cwd(), "");

let highlighter;
async function getHighlighter() {
  if (!highlighter) {
    const { getHighlighter } = await import("shiki");
    highlighter = await getHighlighter({ theme: "one-dark-pro" });
  }
  return highlighter;
}

const SITE_URL = config.site.base_url || "https://www.drenpos.com";

// Bulk commits that don't represent content updates — exclude from lastmod.
const BULK_COMMITS = [];

// Enumerate posts in a content collection, returning URL + source-file
// path so the sitemap can derive an accurate lastmod.
function enumerateCollection(dirName, urlPrefix) {
  const dir = path.join(process.cwd(), "src/content", dirName);
  try {
    const files = fs.readdirSync(dir);
    return files
      .filter((file) => /\.(md|mdx)$/.test(file) && file !== "-index.md")
      .map((file) => {
        const slug = file.replace(/\.(md|mdx)$/, "");
        return {
          url: `${SITE_URL}${urlPrefix}/${slug}`,
          filePath: path.join(dir, file),
        };
      });
  } catch (error) {
    console.warn(`No se pudo leer ${dirName}:`, error.message);
    return [];
  }
}

const blogPosts = enumerateCollection("blog", "/blog");
const localPosts = enumerateCollection("local", "/local");
const allPosts = [...blogPosts, ...localPosts];

// Páginas estáticas de src/pages (.astro), para que también tengan lastmod
// real en el sitemap. Se excluyen las rutas dinámicas ([slug], [...rest]),
// las de error (404, 500) y las que no son .astro (robots.txt.ts, llms.txt.ts,
// rss.xml.js: generan texto y no van al sitemap). index.astro de una carpeta
// se publica como la carpeta (/blog), el de la raíz como "/".
function enumerateStaticPages() {
  const pagesDir = path.join(process.cwd(), "src/pages");
  const out = [];
  const walk = (dir) => {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (error) {
      console.warn(`No se pudo leer ${dir}:`, error.message);
      return;
    }
    for (const entry of entries) {
      if (entry.name.includes("[")) continue; // ruta dinámica
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(abs);
        continue;
      }
      if (!entry.name.endsWith(".astro")) continue;
      const rel = path
        .relative(pagesDir, abs)
        .split(path.sep)
        .join("/")
        .replace(/\.astro$/, "");
      const name = rel.split("/").pop();
      if (name === "404" || name === "500") continue;
      const route = rel === "index" ? "" : rel.replace(/\/index$/, "");
      out.push({ url: `${SITE_URL}/${route}`, filePath: abs });
    }
  };
  walk(pagesDir);
  return out;
}

const staticPages = enumerateStaticPages();

// Clave de búsqueda: sin barra final salvo la raíz, para que "/foo" y "/foo/"
// (o "https://www.drenpos.com" y ".../") encuentren el mismo fichero.
function urlKey(url) {
  const u = url.replace(/\/+$/, "");
  return u === SITE_URL.replace(/\/+$/, "") ? `${u}/` : u;
}

// Map a URL back to its source file for git-based lastmod lookup.
// Los posts van al final para que, si coincidiera una URL, gane el .md.
const urlToFile = new Map(
  [...staticPages, ...allPosts].map((p) => [urlKey(p.url), p.filePath]),
);

// En un clon superficial (git clone --depth 1, habitual en CI) "git log -- fichero"
// devuelve el único commit disponible para TODOS los ficheros, y todas las URLs
// saldrían con el mismo lastmod. En ese caso no se usa git: los posts caen a la
// fecha del frontmatter y las páginas se quedan sin lastmod (mejor que uno falso).
function isShallowRepo() {
  try {
    return (
      execFileSync("git", ["rev-parse", "--is-shallow-repository"], {
        encoding: "utf-8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim() === "true"
    );
  } catch {
    return false; // sin git: gitLastmod devolverá null de todos modos
  }
}
const SHALLOW_REPO = isShallowRepo();
if (SHALLOW_REPO) {
  console.warn(
    "[sitemap] Repositorio git superficial (shallow): lastmod de git desactivado. " +
      "Haz el build con historial completo (git fetch --unshallow) para tener fechas reales.",
  );
}

function lastmodForUrl(url) {
  const file = urlToFile.get(urlKey(url));
  if (!file) return null;
  if (!SHALLOW_REPO) {
    const fromGit = gitLastmod(file, { excludeCommits: BULK_COMMITS });
    if (fromGit) return fromGit;
  }
  if (!/\.(md|mdx)$/.test(file)) return null;
  try {
    const fm = matter(fs.readFileSync(file, "utf-8"));
    const fmDate = fm.data?.updated || fm.data?.date;
    if (fmDate) return new Date(fmDate);
  } catch {
    /* swallow */
  }
  return null;
}

// IndexNow gating: only submit on production Jenkins build of main branch.
const isProductionBuild =
  process.env.SITE === SITE_URL &&
  process.env.BRANCH_NAME === "main" &&
  !!process.env.INDEXNOW_KEY;

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  // build.format "file" emite foo.html en lugar de foo/index.html.
  // Sin esto, trailingSlash:"never" + format:"directory" causa que cada
  // /foo redirija a /foo/ (round-trip extra, mal para SEO).
  build: {
    format: "file",
  },
  vite: { plugins: [tailwindcss()] },
  integrations: [
    // publishableKey explícita: en páginas prerenderizadas el middleware no
    // corre y la sustitución de import.meta.env no llega al bundle cliente,
    // así clerk-js siempre recibe la clave (es pública, seguro embeberla).
    clerk({
      publishableKey:
        env.PUBLIC_CLERK_PUBLISHABLE_KEY ||
        process.env.PUBLIC_CLERK_PUBLISHABLE_KEY,
    }),
    react(),
    sitemap({
      customPages: allPosts.map((p) => p.url),
      serialize(item) {
        const last = lastmodForUrl(item.url);
        if (last) item.lastmod = last.toISOString();
        return item;
      },
    }),
    seoGraph({
      validateH1: true,
      validateUniqueMetadata: true,
      validateImageAlt: true,
      validateMetadataLength: true,
      validateInternalLinks: {
        skip: (href) =>
          href.startsWith("/api/") ||
          href.startsWith("/schema/") ||
          href.startsWith("https://"),
      },
      // llmsTxt desactivado a propósito: el plugin escribía su propio
      // dist/llms.txt (lista automática de páginas, con la 404 incluida) y
      // pisaba el documento redactado a mano de src/pages/llms.txt.ts, que es
      // el que deben leer los asistentes de IA.
      markdownAlternate: true,
      ...(isProductionBuild && {
        indexNow: {
          key: process.env.INDEXNOW_KEY,
          host: "www.drenpos.com",
          siteUrl: SITE_URL,
        },
      }),
    }),
    AutoImport({
      imports: [
        "@/shortcodes/Button",
        "@/shortcodes/Accordion",
        "@/shortcodes/Notice",
        "@/shortcodes/Video",
        "@/shortcodes/Youtube",
        "@/shortcodes/Tab",
        "@/shortcodes/Tabs",
      ],
    }),
    mdx(),
    icon(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
    highlighter: getHighlighter,
  },
  output: "server",
  adapter: cloudflare({
    imageService: "cloudflare",
  }),
});
