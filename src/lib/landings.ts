// Registro de páginas públicas (src/config/landings.json).
// De aquí salen el mega menú de Funcionalidades y la lista "Páginas
// principales" de llms.txt. scripts/check-landings.mjs comprueba en el build
// que cada página .astro está registrada, que run_worker_first la cubre y que
// llms-full.txt la menciona.
import datos from "@/config/landings.json";

export interface Pagina {
  ruta: string;
  titulo: string;
  /** Nombre en el menú si no coincide con el título */
  menu?: string;
  /** Grupo del mega menú de Funcionalidades; sin grupo no sale en el menú */
  grupo?: string;
  /** Descripción para llms.txt (admite tokens de precio [[p:clave]]) */
  llms: string;
}

export interface GrupoMenu {
  title: string;
  hub: { name: string; url: string };
  children: { name: string; url: string }[];
}

export const PAGINAS: readonly Pagina[] = datos.paginas;

/** Grupos del mega menú con sus enlaces, en el orden del registro */
export const GRUPOS_MENU: GrupoMenu[] = datos.grupos.map((g) => ({
  title: g.titulo,
  hub: { name: g.hub.nombre, url: g.hub.ruta },
  children: PAGINAS.filter((p) => p.grupo === g.id).map((p) => ({
    name: p.menu ?? p.titulo,
    url: p.ruta,
  })),
}));
