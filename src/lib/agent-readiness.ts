// ════════════════════════════════════════════════════════════════════════
//  Agent readiness · negociación de Markdown y cabeceras Link
//
//  Lo usa src/worker.ts (entrada propia del worker, ver astro.config.mjs).
//  Va en el worker y no en src/middleware.ts porque casi todas las páginas
//  son prerenderizadas: el handler de @astrojs/cloudflare las devuelve
//  desde ASSETS sin pasar por el middleware de Astro, así que un middleware
//  nunca las vería.
//
//  Qué hace, solo para GET/HEAD de rutas de página (sin extensión):
//   1. Si el Accept prefiere text/markdown sobre text/html, busca en ASSETS
//      el .md que genera scripts/markdown-alternates.mjs (o el del blog,
//      que sale de src/pages/blog/[...slug].md.ts) y lo devuelve con
//      Content-Type text/markdown. Si no existe, sigue como siempre.
//   2. Si la respuesta es HTML 200, le añade cabeceras Link (RFC 8288) y
//      Vary: Accept.
//  Además corrige el Content-Type de /.well-known/api-catalog (fichero sin
//  extensión) y añade CORS a /.well-known/ai-catalog.json.
//
//  No toca Cache-Control ni ninguna otra cabecera de caché: las respuestas
//  conservan las que pone ASSETS o Astro.
//  Ante cualquier error se devuelve la respuesta normal, sin decorar.
// ════════════════════════════════════════════════════════════════════════

export interface AssetsFetcher {
  fetch(input: Request | URL | string, init?: RequestInit): Promise<Response>;
}

export interface EnvConAssets {
  ASSETS: AssetsFetcher;
  [clave: string]: unknown;
}

const API_CATALOG = "/.well-known/api-catalog";
const AI_CATALOG = "/.well-known/ai-catalog.json";

// Rutas de página sin versión Markdown. Mantener en sincronía con EXCLUIR
// de scripts/markdown-alternates.mjs (allí van en formato de fichero).
const SIN_MARKDOWN: RegExp[] = [
  /^\/404$/,
  /^\/500$/,
  /^\/legal(\/|$)/,
  /^\/categories(\/|$)/,
  /^\/blog\/page(\/|$)/,
  /^\/local\/page(\/|$)/,
];

/** true si el Accept prefiere text/markdown a text/html. Empate: Markdown
 *  (un navegador nunca envía text/markdown, así que quien lo pone es un
 *  agente que lo quiere). Los comodines no cuentan. */
export function prefiereMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  let qMarkdown = -1;
  let qHtml = -1;
  for (const parte of accept.split(",")) {
    const trozos = parte.split(";");
    const tipo = (trozos[0] || "").trim().toLowerCase();
    let q = 1;
    for (let i = 1; i < trozos.length; i++) {
      const [clave, valor] = trozos[i].split("=");
      if ((clave || "").trim().toLowerCase() === "q") {
        const n = parseFloat((valor || "").trim());
        if (!isNaN(n)) q = n;
      }
    }
    if (tipo === "text/markdown" || tipo === "text/x-markdown") {
      qMarkdown = Math.max(qMarkdown, q);
    } else if (tipo === "text/html" || tipo === "application/xhtml+xml") {
      qHtml = Math.max(qHtml, q);
    }
  }
  return qMarkdown > 0 && qMarkdown >= qHtml;
}

/** Ruta de página: sin extensión en el último tramo y fuera de las rutas
 *  internas (/_astro, /_image, /api, /.well-known, /cdn-cgi). */
export function esRutaDePagina(pathname: string): boolean {
  if (
    pathname.indexOf("/_") === 0 ||
    pathname.indexOf("/api/") === 0 ||
    pathname.indexOf("/.well-known/") === 0 ||
    pathname.indexOf("/cdn-cgi/") === 0
  ) {
    return false;
  }
  const ultimo = pathname.slice(pathname.lastIndexOf("/") + 1);
  return ultimo.indexOf(".") === -1;
}

/** "/" -> "/index.md", "/pricing" -> "/pricing.md", "/blog/x/" -> "/blog/x.md".
 *  null si la ruta no tiene versión Markdown. */
export function rutaMarkdown(pathname: string): string | null {
  const p = pathname.replace(/\/+$/, "");
  if (p === "") return "/index.md";
  if (!esRutaDePagina(p)) return null;
  if (SIN_MARKDOWN.some((re) => re.test(p))) return null;
  return `${p}.md`;
}

function anadirVary(headers: Headers, valor: string): void {
  const actual = headers.get("Vary");
  if (!actual) {
    headers.set("Vary", valor);
    return;
  }
  const yaEsta = actual
    .split(",")
    .some((v) => v.trim() === "*" || v.trim().toLowerCase() === valor.toLowerCase());
  if (!yaEsta) headers.set("Vary", `${actual}, ${valor}`);
}

/** Valor de la cabecera Link para una página HTML. */
export function cabeceraLink(pathname: string): string {
  const enlaces = [
    `<${API_CATALOG}>; rel="api-catalog"`,
    `<${AI_CATALOG}>; rel="ai-catalog"`,
    `</llms.txt>; rel="alternate"; type="text/plain"`,
  ];
  const md = rutaMarkdown(pathname);
  if (md) enlaces.push(`<${md}>; rel="alternate"; type="text/markdown"`);
  return enlaces.join(", ");
}

function esHtml(res: Response): boolean {
  return (res.headers.get("Content-Type") || "").toLowerCase().indexOf("text/html") === 0;
}

/** Copia la respuesta (las de ASSETS tienen cabeceras inmutables) y aplica
 *  cambios de cabecera. */
function conCabeceras(res: Response, cambiar: (h: Headers) => void): Response {
  const copia = new Response(res.body, res);
  cambiar(copia.headers);
  return copia;
}

/**
 * Envuelve el handler de Astro. `siguiente` es la respuesta normal del sitio.
 */
export async function conAgentReadiness(
  request: Request,
  env: EnvConAssets,
  siguiente: () => Promise<Response>,
): Promise<Response> {
  let url: URL;
  try {
    url = new URL(request.url);
  } catch {
    return siguiente();
  }

  const metodo = request.method.toUpperCase();
  // El apex lo redirige el middleware (wwwRedirect): no se toca.
  if ((metodo !== "GET" && metodo !== "HEAD") || url.hostname === "drenpos.com") {
    return siguiente();
  }

  const pathname = url.pathname;

  // ── Catálogos en /.well-known ──────────────────────────────────────────
  if (pathname === API_CATALOG || pathname === AI_CATALOG) {
    const res = await siguiente();
    if (res.status !== 200) return res;
    try {
      return conCabeceras(res, (h) => {
        h.set(
          "Content-Type",
          pathname === API_CATALOG ? "application/linkset+json" : "application/json; charset=utf-8",
        );
        h.set("Access-Control-Allow-Origin", "*");
      });
    } catch {
      return res;
    }
  }

  if (!esRutaDePagina(pathname)) return siguiente();

  // ── Negociación: Markdown si el agente lo prefiere ─────────────────────
  if (prefiereMarkdown(request.headers.get("Accept"))) {
    try {
      const md = rutaMarkdown(pathname);
      if (md && env.ASSETS) {
        const respuestaMd = await env.ASSETS.fetch(new URL(md, url.origin));
        if (respuestaMd.status === 200) {
          const canonical = new URL(pathname.replace(/\/+$/, "") || "/", "https://www.drenpos.com").href;
          const salida = new Response(metodo === "HEAD" ? null : respuestaMd.body, respuestaMd);
          salida.headers.set("Content-Type", "text/markdown; charset=utf-8");
          salida.headers.set("X-Markdown-Source", "static");
          salida.headers.set("Link", `<${canonical}>; rel="canonical"`);
          anadirVary(salida.headers, "Accept");
          return salida;
        }
      }
    } catch {
      // Sin Markdown: se sirve el HTML normal.
    }
  }

  // ── HTML normal con cabeceras Link y Vary ──────────────────────────────
  const res = await siguiente();
  if (res.status !== 200 || !esHtml(res)) return res;
  try {
    return conCabeceras(res, (h) => {
      h.append("Link", cabeceraLink(pathname));
      anadirVary(h, "Accept");
    });
  } catch {
    return res;
  }
}
