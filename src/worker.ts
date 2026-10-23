// ════════════════════════════════════════════════════════════════════════
//  Entrada propia del worker de Cloudflare (workerEntryPoint en
//  astro.config.mjs, @astrojs/cloudflare 12).
//
//  Es la misma que trae el adaptador (App + handle) con una capa delante:
//  conAgentReadiness (src/lib/agent-readiness.ts), que sirve el Markdown a
//  los agentes que lo piden con Accept: text/markdown y añade las cabeceras
//  Link y Vary a las páginas HTML.
//
//  Antes de todo, respuestaRedireccion (src/lib/redirecciones.ts) devuelve
//  un 301 real para las URLs retiradas (posts fusionados). Tiene que ir
//  aquí: las páginas del blog son prerenderizadas y el middleware de Astro
//  no las ve.
//
//  El middleware de Astro (wwwRedirect + Clerk) sigue igual: corre dentro
//  de handle() para las rutas SSR, como antes.
//
//  Al final, conImagenDeTema (src/lib/temas.ts) pone la og:image del tema
//  de temporada activo en las páginas HTML.
//
//  OJO al actualizar a @astrojs/cloudflare 13: workerEntryPoint y
//  createExports desaparecen; allí se exporta directamente un objeto
//  { fetch } que llama a handle(request, env, ctx).
// ════════════════════════════════════════════════════════════════════════
import type { SSRManifest } from "astro";
import { App } from "astro/app";
import { handle } from "@astrojs/cloudflare/handler";
import { conAgentReadiness, type EnvConAssets } from "./lib/agent-readiness";
import { respuestaRedireccion } from "./lib/redirecciones";
import { conImagenDeTema } from "./lib/temas";

interface ContextoEjecucion {
  waitUntil(promesa: Promise<unknown>): void;
  passThroughOnException(): void;
}

export function createExports(manifest: SSRManifest) {
  const app = new App(manifest);

  return {
    default: {
      async fetch(
        request: Request,
        env: EnvConAssets,
        ctx: ContextoEjecucion,
      ): Promise<Response> {
        // URLs retiradas: 301 antes de servir nada.
        const redireccion = respuestaRedireccion(request);
        if (redireccion) return redireccion;

        // Los tipos de Request/Env/ExecutionContext del adaptador son los de
        // @cloudflare/workers-types; en tiempo de ejecución son los mismos
        // objetos, de ahí los "as never".
        const astro = () =>
          handle(
            manifest,
            app,
            request as never,
            env as never,
            ctx as never,
          ) as unknown as Promise<Response>;
        const res = await conAgentReadiness(request, env, astro);
        // Tema de temporada: og:image del tema en la vista previa al compartir.
        const esHtml = (res.headers.get("Content-Type") || "").startsWith(
          "text/html",
        );
        return res.status === 200 && esHtml ? conImagenDeTema(res) : res;
      },
    },
  };
}
