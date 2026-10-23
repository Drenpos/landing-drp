import config from "@/config/config.json";
import temasConfig from "@/config/temas.json";
// ════════════════════════════════════════════════════════════════════════
//  Temas de temporada en el servidor · vista previa al compartir
//
//  Los colores y adornos del tema se deciden en el navegador (script del
//  <head> de Base.astro). La vista previa de WhatsApp, LinkedIn o Facebook
//  no: sus bots no ejecutan JavaScript y leen og:image del HTML tal cual.
//  Por eso, mientras dura un tema con `og_image` en temas.json, el worker
//  (src/worker.ts) cambia en el HTML la imagen por defecto
//  (config.metadata.meta_image) por la del tema. Las páginas con imagen
//  propia (posts del blog) no se tocan.
//
//  La fecha se toma en hora de Madrid, con la misma regla MM-DD que el
//  script del navegador (si `desde` > `hasta`, el rango cruza el año).
//  Solo llega a las rutas de assets.run_worker_first (wrangler.json).
// ════════════════════════════════════════════════════════════════════════

type Tema = (typeof temasConfig.temas)[number] & { og_image?: string };

const IMAGEN_POR_DEFECTO = config.metadata.meta_image;
const META_IMAGEN =
  'meta[property="og:image"], meta[property="og:image:secure_url"], meta[name="twitter:image"]';

const mmdd = (s: string) => Number(s.replace("-", ""));

/** Tema activo en la fecha dada (hora de Madrid), o null. */
export function temaDeHoy(fecha: Date = new Date()): Tema | null {
  const [mes, dia] = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Madrid",
    month: "numeric",
    day: "numeric",
  })
    .format(fecha)
    .split("/")
    .map(Number);
  const hoy = mes * 100 + dia;
  const tema = (temasConfig.temas as Tema[]).find((t) => {
    const a = mmdd(t.desde);
    const b = mmdd(t.hasta);
    return t.activo && (a <= b ? hoy >= a && hoy <= b : hoy >= a || hoy <= b);
  });
  return tema ?? null;
}

/** Cambia la imagen por defecto de og:image/twitter:image por la del tema
 *  activo. Sin tema con og_image, devuelve la respuesta tal cual. */
export function conImagenDeTema(res: Response): Response {
  const imagen = temaDeHoy()?.og_image;
  if (!imagen || typeof HTMLRewriter === "undefined") return res;
  return new HTMLRewriter()
    .on(META_IMAGEN, {
      element(el) {
        const actual = el.getAttribute("content");
        if (actual?.endsWith(IMAGEN_POR_DEFECTO)) {
          el.setAttribute(
            "content",
            actual.slice(0, -IMAGEN_POR_DEFECTO.length) + imagen,
          );
        }
      },
    })
    .transform(res);
}
