import { clerkMiddleware } from "@clerk/astro/server";
import { defineMiddleware, sequence } from "astro:middleware";

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

export const onRequest = sequence(wwwRedirect, clerkMiddleware());
