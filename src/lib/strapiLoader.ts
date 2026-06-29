import { glob } from "astro/loaders";
import type { Loader, LoaderContext } from "astro/loaders";
import { fetchStrapiPosts, mapStrapiPost } from "@/lib/strapi";

interface StrapiLoaderOptions {
  /** Carpeta local de .md a seguir cargando (coexisten con Strapi) */
  base: string;
  /** pluralApiId del content-type en Strapi (ej. "blog-posts") */
  contentType: string;
}

/**
 * Loader compuesto: carga los .md locales vía glob() y, además, inyecta los
 * posts de Strapi en el MISMO store. Mantiene render(), sitemap y getCollection
 * funcionando para ambas fuentes (mejor SEO: HTML prerenderizado en build).
 *
 * Si Strapi no responde, el build NO falla: usa solo los .md locales.
 */
export function strapiBlogLoader({
  base,
  contentType,
}: StrapiLoaderOptions): Loader {
  const fileLoader = glob({ pattern: "**/*.{md,mdx}", base });

  return {
    name: "strapi-blog-loader",
    load: async (context: LoaderContext) => {
      // 1) Posts locales (.md/.mdx) — pipeline Astro nativo
      await fileLoader.load(context);

      // 2) Posts de Strapi → mismo store
      const { store, parseData, generateDigest, logger, renderMarkdown } =
        context;

      let raw;
      try {
        raw = await fetchStrapiPosts(contentType);
      } catch (err) {
        logger.warn(
          `[strapi] No se pudo cargar "${contentType}" (${(err as Error).message}). Solo .md locales.`
        );
        return;
      }

      for (const item of raw) {
        const { slug, body, data } = mapStrapiPost(item);

        // Valida contra el Zod schema de la collection (lanza si datos inválidos)
        const parsed = await parseData({
          id: slug,
          data: data as unknown as Record<string, unknown>,
        });

        const rendered = body ? await renderMarkdown(body) : undefined;

        store.set({
          id: slug,
          data: parsed,
          body,
          rendered,
          digest: generateDigest(parsed),
        });
      }

      logger.info(`[strapi] ${raw.length} posts cargados de "${contentType}".`);
    },
  };
}
