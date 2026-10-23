/**
 * Datos del sitio y de la empresa: una sola fuente.
 *
 * - URL base: src/config/config.json (site.base_url).
 * - Empresa, contacto y fundador: src/config/empresa.json.
 *
 * En páginas y endpoints usa `abs("/ruta")` en vez de escribir
 * "https://www.drenpos.com/ruta", y `EMPRESA` en vez del nombre, el
 * teléfono o el correo.
 */
import config from "@/config/config.json";
import empresa from "@/config/empresa.json";

export const SITE_URL: string = config.site.base_url.replace(/\/$/, "");
export const EMPRESA = empresa;

/** "/pricing" -> "https://www.drenpos.com/pricing"; "/" -> "https://www.drenpos.com/" */
export function abs(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

// @id de las entidades del grafo JSON-LD que emite Base.astro. Cualquier
// JSON-LD de una página debe referenciarlas en vez de repetir sus datos.
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const FOUNDER_ID = `${SITE_URL}/#founder`;

/** Autor por defecto de landings y posts (prop `author` de <Base>). */
export const AUTOR = {
  name: empresa.fundador.nombre,
  url: empresa.fundador.url,
  jobTitle: empresa.fundador.cargo,
} as const;

/** Enlace de WhatsApp al teléfono comercial con texto opcional. */
export function waUrl(texto: string = empresa.whatsapp_texto): string {
  const numero = empresa.telefono.e164.replace(/\D/g, "");
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
}
