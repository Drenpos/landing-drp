// ════════════════════════════════════════════════════════════════════════
//  Entrada propia del worker de Cloudflare (workerEntryPoint en
//  astro.config.mjs, @astrojs/cloudflare 12).
//
//  Es la misma que trae el adaptador (App + handle) con una capa delante:
//  conAgentReadiness (src/lib/agent-readiness.ts), que sirve el Markdown a
//  los agentes que lo piden con Accept: text/markdown y añade las cabeceras
//  Link y Vary a las páginas HTML.
//
//  El middleware de Astro (wwwRedirect + Clerk) sigue igual: corre dentro
//  de handle() para las rutas SSR, como antes.
//
//  OJO al actualizar a @astrojs/cloudflare 13: workerEntryPoint y
//  createExports desaparecen; allí se exporta directamente un objeto
//  { fetch } que llama a handle(request, env, ctx).
// ════════════════════════════════════════════════════════════════════════
import type { SSRManifest } from "astro";
import { App } from "astro/app";
import { handle } from "@astrojs/cloudflare/handler";
import { conAgentReadiness, type EnvConAssets } from "./lib/agent-readiness";

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
        return conAgentReadiness(request, env, astro);
      },
    },
  };
}
