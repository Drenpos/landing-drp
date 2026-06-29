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
import config from "./src/config/config.json";

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

// Map a URL back to its source file for git-based lastmod lookup.
const urlToFile = new Map(allPosts.map((p) => [p.url, p.filePath]));

function lastmodForUrl(url) {
  const file = urlToFile.get(url);
  if (!file) return null;
  const fromGit = gitLastmod(file, { excludeCommits: BULK_COMMITS });
  if (fromGit) return fromGit;
  try {
    const fm = matter(fs.readFileSync(file, "utf-8"));
    if (fm.data?.date) return new Date(fm.data.date);
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
  vite: { plugins: [tailwindcss()] },
  integrations: [
    clerk(),
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
      llmsTxt: {
        title: "Drenpos — ERP SaaS modular para pymes en España",
        siteUrl: SITE_URL,
        summary:
          "Drenpos es un ERP SaaS modular para pymes y autónomos en España. Inventario, TPV, facturación electrónica Verifactu, control horario, módulo médico.",
      },
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
