import { clerkMiddleware } from "@clerk/astro/server";
import { defineMiddleware, sequence } from "astro:middleware";
import { resolverPrecios, tieneTokens } from "@/lib/precios";

/**
 * Canonicalización de dominio: todo lo que llegue al worker con el host
 * apex `drenpos.com` se redirige con un 301 a `https://www.drenpos.com`
 * conservando ruta y query.
 *
 * OJO: esto solo cubre las peticiones que ya llegan al worker. La parte
 * de DNS y la Redirect Rule del apex hay que configurarlas en Cloudflare
 * (registro del apex apuntando al proyecto y regla de redirección
 * drenpos.com/* -> https://www.drenpos.com/$1 con código 301). Si el apex
 * no resuelve y devuelve un 522, la petición nunca llega hasta aquí y
 * este middleware no puede hacer nada.
 */
const wwwRedirect = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);

  if (url.hostname === "drenpos.com") {
    return Response.redirect(
      `https://www.drenpos.com${url.pathname}${url.search}`,
      301,
    );
  }

  return next();
});

/*
 * Negociación de Markdown y cabeceras Link para agentes: NO van aquí sino en
 * src/worker.ts + src/lib/agent-readiness.ts. Las páginas públicas son
 * prerenderizadas y el handler de @astrojs/cloudflare las sirve desde ASSETS
 * sin ejecutar este middleware, así que aquí no se verían.
 */
/**
 * Precios: sustituye los [[p:clave]] y [[n:clave]] por los valores de
 * src/config/precios.json en cualquier respuesta de texto (HTML, Markdown,
 * llms.txt, JSON, XML). Corre al prerenderizar en el build y en dev, así que
 * lo que llega a dist ya lleva los precios. Ver src/lib/precios.ts.
 */
const precios = defineMiddleware(async (_context, next) => {
  const response = await next();
  const tipo = response.headers.get("content-type") ?? "";
  const esTexto =
    tipo === "" ||
    tipo.startsWith("text/") ||
    tipo.includes("json") ||
    tipo.includes("xml") ||
    tipo.includes("markdown");
  if (!esTexto || !response.body) return response;
  const cuerpo = await response.text();
  if (!tieneTokens(cuerpo)) {
    return new Response(cuerpo, response);
  }
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(resolverPrecios(cuerpo), {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});

export const onRequest = sequence(wwwRedirect, precios, clerkMiddleware());
