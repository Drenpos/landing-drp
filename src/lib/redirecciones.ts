import { SITE_URL } from "@/lib/site";
// ════════════════════════════════════════════════════════════════════════
//  Redirecciones 301 de URLs retiradas (posts fusionados, slugs cambiados)
//
//  Lo usa src/worker.ts ANTES que todo lo demás. Va en el worker y no en
//  `redirects` de astro.config.mjs ni en src/middleware.ts porque:
//   - Los posts del blog son prerenderizados: el middleware de Astro no
//     corre para ellos (el handler de @astrojs/cloudflare los sirve desde
//     ASSETS).
//   - Con `redirects` de Astro el resultado depende del adaptador: o un
//     HTML prerenderizado con <meta http-equiv="refresh"> (se sirve con
//     200) o un fichero _redirects que no se consulta para rutas que pasan
//     antes por el worker (run_worker_first). Aquí el 301 es explícito.
//  El worker sí ve todas las rutas de `assets.run_worker_first` en
//  wrangler.json (incluye /blog/* y /local/*), así que aquí el 301 es real.
//
//  Cómo retirar una URL:
//   1. Marca el post absorbido con `draft: true` (sale de las rutas, del
//      RSS, del .md alternativo, del schema y del sitemap).
//   2. Añade aquí la pareja origen → destino, sin barra final ni .html.
//   3. Cambia los enlaces internos que apunten al origen (seoGraph rompe
//      el build si un enlace interno no existe).
//  Si el origen no empieza por una ruta de run_worker_first, añádelo allí.
//
//  Variantes que cubre cada entrada: /x, /x/, /x.html (Search Console las
//  muestra) y /x.md (va a destino.md). Conserva la query string.
// ════════════════════════════════════════════════════════════════════════

export const REDIRECCIONES_301: Readonly<Record<string, string>> = {
  // Fusión del 17/10/2026: la comparativa se integra en la guía principal.
  "/blog/comparativa-mejores-software-control-horario-pymes-2026":
    "/blog/mejores-programas-control-horario",
  // Fusión del 17/10/2026: requisitos 2026 dentro de la guía de registro.
  "/blog/registro-horario-2026-nuevos-requisitos-adaptacion":
    "/blog/registro-horario-digital",
};

const CANONICO = SITE_URL;

/** Ruta de destino para un pathname, o null si no hay redirección. */
export function destinoRedireccion(pathname: string): string | null {
  let p = pathname.replace(/\/+$/, "");
  let sufijo = "";
  const md = /\.md$/i.test(p);
  if (md) {
    p = p.slice(0, -3);
    sufijo = ".md";
  } else if (/\.html$/i.test(p)) {
    p = p.slice(0, -5);
  }
  const destino = REDIRECCIONES_301[p];
  return destino ? `${destino}${sufijo}` : null;
}

/** Respuesta 301 si la petición apunta a una URL retirada; si no, null. */
export function respuestaRedireccion(request: Request): Response | null {
  let url: URL;
  try {
    url = new URL(request.url);
  } catch {
    return null;
  }
  const destino = destinoRedireccion(url.pathname);
  if (!destino) return null;
  // El apex va directo a www para no encadenar dos saltos.
  const origen = url.hostname === "drenpos.com" ? CANONICO : url.origin;
  return new Response(null, {
    status: 301,
    headers: {
      Location: `${origen}${destino}${url.search}`,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
