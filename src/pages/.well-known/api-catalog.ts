import type { APIRoute } from "astro";
import config from "@/config/config.json";

// ════════════════════════════════════════════════════════════════════════
//  /.well-known/api-catalog · catálogo de recursos para agentes
//  RFC 9727 (api-catalog) en formato linkset de RFC 9264.
//
//  Escrito a mano (antes salía de createApiCatalog de
//  @jdevalk/astro-seo-graph, que generaba el campo "type" mal formado).
//
//  Se prerenderiza, así que en producción es un fichero sin extensión en
//  dist/.well-known/api-catalog y la cabecera Content-Type de aquí no
//  llega al navegador: la pone el worker (src/lib/agent-readiness.ts,
//  ruta incluida en assets.run_worker_first de wrangler.json).
// ════════════════════════════════════════════════════════════════════════

export const prerender = true;

const SITE = (config.site.base_url || "https://www.drenpos.com").replace(/\/+$/, "");
const url = (ruta: string) => `${SITE}${ruta}`;

interface Enlace {
  href: string;
  type: string;
  title?: string;
}

const linkset: {
  linkset: Array<{ anchor: string } & Record<string, Enlace[] | string>>;
} = {
  linkset: [
    {
      anchor: `${SITE}/`,
      // Documentación pensada para personas y asistentes.
      "service-doc": [
        {
          href: url("/conector-mcp-ia"),
          type: "text/html",
          title: "Conector MCP de Drenpos",
        },
        {
          href: url("/llms.txt"),
          type: "text/plain",
          title: "Resumen de Drenpos para asistentes de IA (llms.txt)",
        },
        {
          href: url("/llms-full.txt"),
          type: "text/plain",
          title: "Documentación completa de Drenpos para asistentes de IA",
        },
      ],
      // Descripciones legibles por máquina de los datos publicados.
      "service-desc": [
        {
          href: url("/schemamap.xml"),
          type: "application/xml",
          title: "Mapa de endpoints de datos estructurados (schema.org)",
        },
        {
          href: url("/schema/post.json"),
          type: "application/ld+json",
          title: "Artículos del blog en JSON-LD (BlogPosting)",
        },
      ],
      describedby: [
        {
          href: url("/sitemap-index.xml"),
          type: "application/xml",
          title: "Mapa del sitio",
        },
      ],
      alternate: [
        {
          href: url("/rss.xml"),
          type: "application/rss+xml",
          title: "Blog de Drenpos (RSS)",
        },
      ],
    },
  ],
};

export const GET: APIRoute = () =>
  new Response(JSON.stringify(linkset, null, 2), {
    headers: {
      "Content-Type": "application/linkset+json",
      "Access-Control-Allow-Origin": "*",
    },
  });
