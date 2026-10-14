import type { APIRoute } from "astro";

// ════════════════════════════════════════════════════════════════════════
//  /.well-known/mcp/server-card.json · tarjeta del servidor MCP
//
//  Devuelve 404 mientras no exista la variable MCP_PUBLIC_URL (URL pública
//  del servidor MCP de Drenpos, la que el cliente pega en ChatGPT o
//  Claude). En cuanto se defina, la ruta aparece sola:
//   - En Cloudflare (Workers > landing-drp > Settings > Variables): se lee
//     en tiempo de ejecución, sin volver a desplegar.
//   - En Jenkins (variable de entorno del build): queda fijada en el build
//     y además añade la entrada correspondiente en ai-catalog.json.
//
//  TODO (Alonso): confirmar el tipo de transporte y la autenticación del
//  servidor MCP (OAuth 2.1 con descubrimiento, token, etc.) y completar
//  "authentication". Con eso se pueden publicar también el descubrimiento
//  OAuth (/.well-known/oauth-protected-resource) y los registros DNS-AID.
//
//  SSR (no prerender) para poder leer la variable en tiempo de ejecución.
// ════════════════════════════════════════════════════════════════════════

export const prerender = false;

const DOCUMENTACION = "https://www.drenpos.com/conector-mcp-ia";

function leerMcpUrl(locals: unknown): string {
  const runtimeEnv = (locals as { runtime?: { env?: Record<string, unknown> } } | undefined)?.runtime
    ?.env;
  const desdeRuntime = runtimeEnv?.MCP_PUBLIC_URL;
  if (typeof desdeRuntime === "string" && desdeRuntime.trim()) return desdeRuntime.trim();
  const desdeBuild = import.meta.env.MCP_PUBLIC_URL as string | undefined;
  if (typeof desdeBuild === "string" && desdeBuild.trim()) return desdeBuild.trim();
  return "";
}

export const GET: APIRoute = ({ locals }) => {
  const mcpUrl = leerMcpUrl(locals);

  if (!mcpUrl) {
    return new Response("Not found", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const tarjeta = {
    name: "Drenpos MCP",
    title: "Conector MCP de Drenpos",
    version: "1.0.0",
    description:
      "Servidor MCP de Drenpos, ERP modular para pymes en España. Permite a cada usuario con cuenta de Drenpos consultar en lenguaje natural ventas, compras, clientes, proveedores, productos y stock desde ChatGPT, Claude u otro cliente compatible, con sus mismos permisos y en solo lectura. Uso reservado a clientes con credenciales.",
    documentation: DOCUMENTACION,
    documentationUrl: DOCUMENTACION,
    provider: {
      name: "Drenpos Tech SL",
      url: "https://www.drenpos.com",
    },
    transport: {
      // TODO (Alonso): confirmar "streamable-http" o "sse".
      type: "streamable-http",
      url: mcpUrl,
    },
    authentication: {
      required: true,
      // TODO (Alonso): tipo de autenticación (p. ej. "oauth2") y, si es
      // OAuth, la URL del servidor de autorización.
    },
    capabilities: {
      tools: { listChanged: false },
    },
  };

  return new Response(JSON.stringify(tarjeta, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
