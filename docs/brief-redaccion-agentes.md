# Brief común para los agentes de contenido (6 de noviembre de 2026)

Sustituye al del 17/10/2026. Plan de esta ronda: `docs/auditoria-seo-2026-11-06.md` (lo escribe el coordinador). Planes anteriores: `docs/plan-contenidos-2026-10-17.md`, `docs/keywords-intenciones-2026-09.md` (sección 6, competencia).

## Dónde trabajas
- Repo: `/Users/abp/Documents/Proyectos/DRP/landing-drp`. Sin commits ni push.
- La verdad del producto está en `/Users/abp/Documents/Proyectos/DRP/context/`: `products_modules.md` (actualizado el 06/11), `pricing.md`, `differentiators.md`, `objections.md`. **No inventes funcionalidades.** Respeta los apartados «Ser honesto». Si dudas, no lo afirmes y anótalo en el informe.
- **No ejecutes `npm run build`, `npm run check` ni `astro build`**: hay otros agentes trabajando y poca RAM. Valida a mano; el coordinador hace el build al final.
- **Ficheros compartidos, no los edites:** `src/config/landings.json`, `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts`, `src/layouts/Base.astro`, `wrangler.json`, `src/config/menu.json`, `src/content/sections/*`, `src/config/intereses.ts`, `src/pages/funcionalidades.astro`, `src/pages/index.astro`, `src/pages/modulos.astro`. Si hacen falta cambios ahí, escríbelos EXACTOS en el informe final.

## Decisiones de producto y precio (06/11/2026)
- Precios nuestros solo con tokens `[[p:clave]]` / `[[n:clave]]` (claves en `src/lib/precios.ts`, valores en `src/config/precios.json`). Nunca a mano.
- SAT / órdenes de servicio: precio sin definir. No des cifra: «consúltanos».
- Exportación a A3: incluida en el Financiero (todos los planes).
- IA con dictado por voz: en demo. **No la anuncies en la web.**
- Cuadro de mandos de almacén y albarán exprés de escritorio: sin precio publicado.
- Terminal de fichaje: ficha con llavero RFID, tarjeta o QR; no usa huella ni cara (sin datos biométricos). No lo cuentes como carencia.
- Ningún nombre de cliente real. Ejemplos genéricos: «Pongamos una empresa de limpieza con 8 operarias…».

## Antes de escribir
- `CLAUDE.md`: «Reglas de mantenimiento» (Un dato, un sitio; Redacción) y «Precios». Son obligatorias.
- Plantilla de landing: `src/pages/software-tienda-recambios.astro` (`LandingMeta`, `published_date`/`modified_date`/`author` en `<Base>`, `JsonLd` con `breadcrumb()`, `softwareApp()`, `faqPage()` de `src/lib/schema.ts`, `DemoForm` con `interes` de `src/config/intereses.ts`, array de artículos relacionados). Datos del sitio con `@/lib/site`.
- Plantilla de post: `src/content/blog/stock-tienda-recambios-sin-tecdoc.md`. Copia su frontmatter (title, meta_title, description, date, updated, image, author, categories, tags, featured, draft, hero, faq) y el bloque `author` tal cual. Esquema: `src/content.config.ts`.

## Estilo (obligatorio)
- Español de España, alguien que lleva años con ERP y almacenes hablando claro al dueño de una pyme. Frases cortas, vocabulario del sector, ejemplos con números.
- **Prohibidas la raya larga (—) y la media (–) como puntuación.** Comprueba con grep al terminar.
- Sin muletillas de IA (lista en `scripts/check-contenido.mjs`).
- AEO: H2 en forma de pregunta real; justo debajo, un párrafo de 40 a 60 palabras que responde solo y **sin enlaces**; luego el detalle. Párrafos de 3 frases como máximo. Al menos una tabla. FAQ en el frontmatter igual que la visible.
- Un solo H1. `meta_title` ≤ 60 caracteres y `description` entre 110 y 160, únicos en todo el sitio (compruébalo con grep).
- Posts nuevos: `date: 2026-11-06` y `updated: 2026-11-06`. Posts que actualizas: solo `updated: 2026-11-06`. Landings que cambias de fondo: su `PAGE_UPDATED`.
- Enlaces internos: 3 a 6 por post, a la landing del producto y al post pilar del clúster. Solo a rutas que existan (`src/pages`, `src/content/blog`) o a los slugs nuevos que te dé tu encargo. Sin barra final ni `.html`.
- Imágenes: reutiliza las de `public/images/` (comprueba que existen); no descargues nuevas. `alt` en español y descriptivo.
- Competencia: mira la SERP con WebSearch (mode standard) para tus intenciones principales y cubre lo que los primeros no responden. Dato de competidor = texto fijo con fecha de consulta y fuente enlazada; si no se puede verificar, no va.
- Honestidad: di lo que Drenpos no hace. Es lo que hace que los asistentes nos citen (ver `docs/seguimiento-2026-10-17.md`).

## Al terminar
- `grep -n '—\|–'` sobre tus ficheros: cero resultados.
- Informe final breve: ficheros creados o cambiados (1 línea cada uno), intención y competidores de cada pieza, cambios EXACTOS para ficheros compartidos, dudas de producto.
