import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import clerk from "@clerk/astro";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "astro-auto-import";
import icon from "astro-icon";
import { defineConfig, passthroughImageService } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import config from "./src/config/config.json";
import fs from "fs";
import path from "path";

let highlighter;
async function getHighlighter() {
  if (!highlighter) {
    const { getHighlighter } = await import("shiki");
    highlighter = await getHighlighter({ theme: "one-dark-pro" });
  }
  return highlighter;
}

// Función para obtener las rutas de blog
function getBlogUrls() {
  const blogDir = path.join(process.cwd(), "src/content/blog");
  const baseUrl = config.site.base_url || "http://examplesite.com";

  try {
    const files = fs.readdirSync(blogDir);
    const blogUrls = files
      .filter((file) => file.endsWith(".md") && file !== "-index.md")
      .map((file) => {
        const slug = file.replace(".md", "");
        return `${baseUrl}/blog/${slug}`;
      });

    return blogUrls;
  } catch (error) {
    console.warn("No se pudo leer el directorio de blog:", error);
    return [];
  }
}
function getBlogUrlsLocal() {
  const blogDir = path.join(process.cwd(), "src/content/local");
  const baseUrl = config.site.base_url || "http://examplesite.com";

  try {
    const files = fs.readdirSync(blogDir);
    const blogUrls = files
      .filter((file) => file.endsWith(".md") && file !== "-index.md")
      .map((file) => {
        const slug = file.replace(".md", "");
        return `${baseUrl}/local/${slug}`;
      });

    return blogUrls;
  } catch (error) {
    console.warn("No se pudo leer el directorio de blog local:", error);
    return [];
  }
}

// https://astro.build/config
export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "http://examplesite.com",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  vite: { plugins: [tailwindcss()] },
  integrations: [
    clerk(),
    react(),
    sitemap({
      // Incluir rutas dinámicas de blog
      customPages: getBlogUrls(),
    }),
    sitemap({
      // Incluir rutas dinámicas de blog local
      customPages: getBlogUrlsLocal(),
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
