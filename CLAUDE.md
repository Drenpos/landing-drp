# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing/landing site for **Drenpos** (ERP SaaS modular para pymes en España). Spanish-language site at `https://www.drenpos.com`. Astro 5 SSR on **Cloudflare Workers** (not Pages directly — see Deploy).

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Local dev at `localhost:4321` |
| `npm run build` | Build SSR bundle to `./dist/` + genera los `.md` alternativos (`scripts/markdown-alternates.mjs`). También corre en `preview`, `check` y `deploy:manual` |
| `npm run markdown:check -- dist/pricing.html` | Imprime por stdout el Markdown que se generaría para esa página (tras un build) |
| `npm run preview` | Build + run Wrangler dev server (uses Cloudflare runtime) |
| `npm run check` | `astro build && tsc && wrangler deploy --dry-run` — full CI check |
| `npm run deploy` | `wrangler deploy` (production) |
| `npm run cf-typegen` | Regenerate `worker-configuration.d.ts` from `wrangler.json` |
| `npm run astro -- --help` | Astro CLI |

No test suite. Validation is `tsc` + `astro check` (run via `npm run check`).

## Architecture

### Stack
- **Astro 5** SSR (`output: "server"`) + **React 19** islands + **Tailwind v4** (Vite plugin, no `tailwind.config.js` — config inline)
- **Cloudflare adapter** (`@astrojs/cloudflare`) — `nodejs_compat` enabled in `wrangler.json`
- **Clerk** auth via `@clerk/astro` — gate is `src/middleware.ts` (`clerkMiddleware()`)
- **MDX**, `astro-icon`, `astro-font`, `astro-auto-import`, AOS scroll animations, Swiper, Lottie

### Path aliases (`tsconfig.json`)
```
@/components/*  →  src/layouts/components/*
@/shortcodes/*  →  src/layouts/shortcodes/*
@/helpers/*     →  src/layouts/helpers/*
@/partials/*    →  src/layouts/partials/*
@/*             →  src/*
```

### Content model
All data-driven sections live as **Astro Content Collections** defined in `src/content.config.ts` with Zod schemas. Editing copy/data = edit Markdown frontmatter in `src/content/<collection>/`, not `.astro` templates.

Key collections:
- `homepage`, `about`, `pricing`, `contact`, `integrations`, `changelog`, `case-studies`, `pages`, `careers`, `features` — page-level content
- `blog` (general) + `local` (Extremadura local-SEO articles) — parallel blog collections, each with own routes (`src/pages/blog/`, `src/pages/local/`)
- `sections/*` — reusable page sections: `modules.md`, `plans-comparison.md`, `pricing.md`, `faq.md`, `team.md`, `testimonial.md`, `clients.md`, `call-to-action.md`, `feature*.md`

**Plans comparison schema** (`plans-comparison.md`) declares its columns in `plans[].id` (hoy: `essential`, `pro`, `full`, `produccion`). El schema Zod usa `.catchall()` sobre cada fila, así que **añadir un plan nuevo solo requiere tocar el `.md`**: una clave por cada `plan.id` en cada `item`. Cell values are `boolean | number | string` — preserves "Hasta 2026" / "Próximamente" style overrides. `PlansComparison.astro` resuelve la celda con `item[plan.id]`, no hay nombres de plan hardcodeados.

### Page routes worth knowing
- `[regular].astro` — catch-all for `pages` collection
- `blog/[single].astro` + `blog/page/` — paginated blog
- `local/[single].astro` + `local/page/` — paginated local-SEO blog (separate from `blog`)
- `llms.txt.ts`, `llms-full.txt.ts`, `robots.txt.ts`, `rss.xml.js` — generated text routes
- `legal/` — static legal pages (aviso-legal, cookies, privacidad, terminos)

**Clúster de landings de almacén** (todas `prerender = true`, mismo sistema de diseño, JSON-LD Breadcrumb + SoftwareApplication + FAQPage, enlazadas entre sí):
- `software-gestion-almacen.astro` — SGA/WMS general (pilar del clúster)
- `software-preparacion-pedidos-picking.astro` — picking, oleadas y expedición
- `software-almacen-frigorifico.astro` — frío, congelados y cadena de frío
- `software-alquiler-huecos-palet.astro` — depósito de terceros / 3PL
- `software-almacen-tienda.astro` — almacén + TPV para retail
- `software-produccion-fabricacion.astro` — producción y fabricación (órdenes de trabajo, fases, tiempos, coste real)
- `software-control-stock.astro`: control de stock e inventario (mínimos y máximos con alertas, propuesta de compra, lotes y caducidad, inventarios físicos, valoración)

**Landings de cumplimiento legal** (`prerender = true`, mismo patrón de JSON-LD Breadcrumb + SoftwareApplication + FAQPage, enlazadas en el submenú Funcionalidades y en el bloque "Facturación y cumplimiento" de `funcionalidades.astro`):
- `software-verifactu.astro`: facturación en modalidad Verifactu (sección `#otras-obligaciones` con enlaces a las demás obligaciones)
- `documento-control-transporte-deca.astro`: documento de control del transporte (DeCA) desde el albarán, obligatorio desde el 5/10/2026. Usa `<DemoForm interes="deca" />`: `DemoForm` admite `interes="deca"` (valor añadido al tipo y a las opciones del select en `src/layouts/partials/DemoForm.astro`)

Al tocar una, revisa: `src/config/menu.json` (submenú Funcionalidades), `src/pages/llms.txt.ts` y `src/pages/llms-full.txt.ts` (bloque "Páginas de solución"), y los enlaces cruzados del array `hermanas` en `software-gestion-almacen.astro`. `seoGraph` valida en build enlaces internos, unicidad de metadatos y H1 único: un enlace roto o un `meta_title` duplicado rompe el build.

**Fecha y autor visibles en landings**: `src/layouts/partials/LandingMeta.astro` (`<LandingMeta updated="AAAA-MM-DD" published="AAAA-MM-DD" />`, bajo el lead del hero). Cada landing pasa además `published_date`, `modified_date` y `author` a `<Base>`, que los vuelca en `dateModified`/`datePublished`/`author` del `WebPage`. Al cambiar de fondo una landing, actualiza su `PAGE_UPDATED`.

**Clúster de gestión de equipo** (hub `control-horario.astro`, con anclas `#vacaciones`, `#entrada-salida`, `#turnos-rotativos`, `#planificacion-anual`, `#calendarios`, `#conceptos`, `#geolocalizacion` que no deben cambiar porque llms.txt y posts enlazan a ellas): `software-vacaciones-ausencias.astro`, `control-entrada-salida-empleados.astro`, `software-turnos-rotativos.astro`, `dispositivo-fichaje.astro` (sección `#gestion-equipo`). Capturas pendientes con guarda `existsSync`: `control-horario/11-incidencias-entrada-salida.png`, `12-calendarios-laborales.png`, `13-planificacion-anual-equipo.png`, `14-calendario-rotativo-preview.png`, `15-app-vacaciones-saldo.png`.

**Caché**: no hay `public/_headers` (decisión del 07/10/2026: malas experiencias previas con cabeceras en Cloudflare). Tras cada despliegue que cambie páginas existentes, purgar la caché a mano en el panel de Cloudflare (Caching, Purge Everything) o con `npm run purge:cf`. El despliegue se hace con `git push` a `main`.

**Menú Funcionalidades (mega menú, 14/10/2026)**: en `src/config/menu.json` la entrada "Funcionalidades" lleva `groups` (array de `{ title, hub?: {name,url}, children: [{name,url}] }`) en vez de `children`. `Header.astro` pinta 4 columnas si hay `groups` y el desplegable plano si hay `children`; todo se renderiza en servidor. Al crear una landing nueva, añádela al grupo que toque (Almacén y stock, Equipo y fichaje, Ventas y producción, Cumplimiento e integraciones). El conector Holded no aparece en la tabla de módulos ni en precios (decisión 14/10/2026).

### Auto-imported shortcodes
Available in all `.md`/`.mdx` without import (`astro.config.mjs`): `Button`, `Accordion`, `Notice`, `Video`, `Youtube`, `Tab`, `Tabs`. Sources in `src/layouts/shortcodes/`.

### Sitemap
`@astrojs/sitemap` is fed `customPages` from `astro.config.mjs` — it scans `src/content/blog/` and `src/content/local/` at build time and injects each `.md` as a URL. New blog/local posts auto-appear.

### Styling
- Tailwind v4 + `@tailwindcss/forms` + `@tailwindcss/typography` (peer deps)
- Global CSS: `src/styles/main.css`
- Custom Tailwind plugins: `src/tailwind-plugin/`
- Theme tokens: `src/config/theme.json`
- Site/menu/social config: `src/config/{config,menu,social,theme}.json`

### Cookies / Consent Mode v2
`Base.astro` boots Google Consent Mode v2 (**denied by default**) + GTM (`GTM-PDNNFZ98`) inline before any tracker. `CookieConsent` (vanilla-cookieconsent) controls grants. Don't move/duplicate the inline consent script.

### SEO / structured data
`Base.astro` emits JSON-LD for `Organization`, `SoftwareApplication`, `WebSite`. Update product features there when adding modules (el `SoftwareApplication` global lleva un `AggregateOffer` con `lowPrice`/`highPrice`/`offerCount` — actualízalo si cambian los planes).

`pricing.astro` emite además su propio `BreadcrumbList` + `SoftwareApplication` con `AggregateOffer` (un `Offer` por plan, `valueAddedTaxIncluded: false`) + `FAQPage`. Los precios viven duplicados en el array `planes` de `pricing.astro` porque el JSON-LD necesita valores numéricos limpios: **si cambias `src/content/sections/pricing.md`, cambia también ese array**.

### Two key components
`MODULES_TABLE_README.md` documents `ModulesTableCollapsible.astro` + `PlansComparison.astro` (collapsible module catalog + plan comparison matrix).

## Agent readiness (isitagentready.com, 14/10/2026)

Lo que tiene el sitio para que los agentes de IA lo descubran y lo lean:

| Pieza | Dónde | Notas |
|---|---|---|
| Markdown por negociación | `src/worker.ts` + `src/lib/agent-readiness.ts` | GET/HEAD de una página con `Accept` que prefiere `text/markdown` devuelve el `.md` con `Content-Type: text/markdown; charset=utf-8`, `Vary: Accept`, `X-Markdown-Source: static` y `Link: <canonical>; rel="canonical"`. Si no hay `.md`, HTML normal. |
| Ficheros `.md` | `scripts/markdown-alternates.mjs` (postbuild) | Genera `dist/foo.md` junto a cada `dist/foo.html` público. Excluye 404, `legal/`, `categories/`, paginaciones y noindex. Los posts del blog usan su `.md` original (`src/pages/blog/[...slug].md.ts`) y el script no los pisa (solo sobrescribe los que llevan `source: html`). Las exclusiones están duplicadas en `agent-readiness.ts` (`SIN_MARKDOWN`). |
| Cabecera `Link` (RFC 8288) y `Vary: Accept` | worker, en toda página HTML 200 | `api-catalog`, `ai-catalog`, `llms.txt` y la alternativa `.md`. |
| `/.well-known/api-catalog` | `src/pages/.well-known/api-catalog.ts` | Linkset RFC 9727/9264 escrito a mano (ya no usa `createApiCatalog`). Prerenderizado: el `Content-Type: application/linkset+json` lo pone el worker. |
| `/.well-known/ai-catalog.json` (ARD) | `src/pages/.well-known/ai-catalog.json.ts` | El CORS lo pone el worker. Anunciado en `robots.txt` (`Agentmap:`), en `Base.astro` (`<link rel="ai-catalog">`) y en la cabecera `Link`. |
| `/.well-known/mcp/server-card.json` | `src/pages/.well-known/mcp/server-card.json.ts` (SSR) | 404 mientras no exista `MCP_PUBLIC_URL` (variable del worker en Cloudflare o del build en Jenkins). Faltan transporte y autenticación del MCP: ver los TODO. |
| WebMCP declarativo | `DemoForm.astro`, `contact.astro` | `toolname`, `tooldescription`, `toolparamdescription`. Atributos inertes en navegadores sin WebMCP. |

**Por qué en el worker y no en `src/middleware.ts`**: las páginas públicas son prerenderizadas. El handler de `@astrojs/cloudflare` (v12) las devuelve desde `ASSETS` sin ejecutar el middleware de Astro, así que un middleware nunca vería esas peticiones. La entrada propia se declara en `astro.config.mjs` (`adapter: cloudflare({ workerEntryPoint: { path: "src/worker.ts" } })`). Al subir a `@astrojs/cloudflare` 13 hay que migrarla (allí desaparece `createExports`).

**`run_worker_first` en `wrangler.json`**: con Workers Static Assets un fichero estático se sirve sin pasar por el worker. Para que las páginas pasen por él, `assets.run_worker_first` lista SOLO rutas de página (más los dos catálogos de `/.well-known`). Imágenes, `/_astro/*`, fuentes y ficheros de texto no pasan. **Al crear una landing nueva que no empiece por `/software-`, añádela a esa lista** (máximo 100 entradas) o no tendrá Markdown ni cabecera `Link`. Esto solo aplica a `wrangler deploy` (Workers); un `wrangler pages deploy` ignora `run_worker_first` y usa `_routes.json`.

Cómo probarlo (tras desplegar):

```bash
curl -s -H "Accept: text/markdown" https://www.drenpos.com/ | head -20      # Markdown
curl -sI -H "Accept: text/markdown" https://www.drenpos.com/pricing | grep -i "content-type\|vary"
curl -sI https://www.drenpos.com/ | grep -i "link\|vary\|content-type"     # HTML + Link
curl -sI https://www.drenpos.com/.well-known/api-catalog | grep -i "content-type"
curl -sI https://www.drenpos.com/.well-known/ai-catalog.json | grep -i "content-type\|access-control"
curl -s https://www.drenpos.com/robots.txt | grep -i agentmap
curl -s -o /dev/null -w "%{http_code}\n" https://www.drenpos.com/.well-known/mcp/server-card.json   # 404 sin MCP_PUBLIC_URL
```

En local: `npm run preview` (build + `wrangler dev`) y las mismas peticiones contra `http://localhost:8787`.

## Redirecciones 301 (posts fusionados o retirados, 17/10/2026)

Las redirecciones van en el worker, no en `redirects` de `astro.config.mjs` ni en `src/middleware.ts`:

- `src/lib/redirecciones.ts`: mapa `REDIRECCIONES_301` (origen → destino, rutas sin barra final ni `.html`) y `respuestaRedireccion(request)`. Cubre `/x`, `/x/`, `/x.html` (Search Console las muestra) y `/x.md` (va a `destino.md`), conserva la query y manda el apex directo a `https://www.drenpos.com` en un solo salto.
- `src/worker.ts` la llama **antes de todo** (antes de la negociación de Markdown y de Astro).
- Por qué ahí: los posts son prerenderizados y el middleware de Astro no los ve; `redirects` de Astro acaba en un HTML con meta refresh (200) o en un `_redirects` que no se consulta para rutas que van por `run_worker_first`. El worker sí ve todo lo que lista `assets.run_worker_first` en `wrangler.json` (incluye `/blog/*` y `/local/*`).

Para retirar un post:
1. `draft: true` en su frontmatter. Así sale de las rutas (`[single].astro`), del `.md` alternativo, del RSS, de `schema/post.json`, del listado del blog y del sitemap (`enumerateCollection` en `astro.config.mjs` salta los borradores). No se borra el fichero.
2. Añadir la pareja a `REDIRECCIONES_301`.
3. Cambiar los enlaces internos al origen (en posts, landings y el array `articulos` de `control-horario.astro`): seoGraph rompe el build con un enlace interno a una página que ya no existe.
4. Si el origen no empieza por una ruta de `run_worker_first`, añadirla allí.

Retiradas hasta hoy: `/blog/comparativa-mejores-software-control-horario-pymes-2026` → `/blog/mejores-programas-control-horario` y `/blog/registro-horario-2026-nuevos-requisitos-adaptacion` → `/blog/registro-horario-digital`.

Comprobar tras desplegar: `curl -sI https://www.drenpos.com/blog/comparativa-mejores-software-control-horario-pymes-2026.html | grep -i "^HTTP\|^location"` (debe dar 301 y el destino).

## SEO blog generator (`agent/`)

Standalone Node 18+ ESM pipeline that researches → analyzes → synthesizes → generates → commits a blog post (with Meta Ads companion + Pexels images). Independent `package.json`; **not** part of the Astro build.

```bash
node agent/index.mjs --idea "..." --keywords "k1,k2" \
  --icp-type "..." --icp-role "..." --icp-pains "..." \
  --source-docs path1.md,path2.md --strict-sources
```

- LLM provider via `LLM_PROVIDER` env: `ollama` (default, `http://localhost:11434`) or `openai`-compatible (`OPENAI_API_BASE_URL`, `OPENAI_API_KEY`)
- Default model: `qwen2.5:14b`
- Writes to `src/content/local/` by default (see `agent/config.mjs` → `blog.postsDir`)
- `GIT_AUTO_PUSH=true` commits + pushes; disable for dry runs
- `--strict-sources` forbids the model from inventing facts outside provided files/URLs (used heavily in `blogs-registro-horario.sh`)
- Shell wrappers: `blogs.sh` (city-fanout), `blogs-registro-horario.sh` (registro horario 2026 campaign with bundled sources in `agent/sources/`)

**`agent/img-almacen-2026.mjs`** — descargador de imágenes de Pexels para el clúster de almacén (7 posts × cover + 2 secciones). Recorta con `sharp` (1200×675 la portada, 1200×630 las de sección), escribe `credits.json`, cambia el `image:` del frontmatter de `.webp` a `.jpg` e inserta los `![alt](...)` en el cuerpo tras la cápsula del H2 elegido. Idempotente (`--force` para rehacer), `--dry` para simular, `--only <slug>` para uno solo. Lee `PEXELS_API_KEY` de `agent/.env`. **Necesita red**: no funciona desde el bridge de Cowork, hay que lanzarlo desde una terminal local.

## Precios (fuente única, 23/10/2026)

Todos los precios de Drenpos salen de `src/config/precios.json`. No se escribe un precio nuestro a mano en ningún sitio.

- En `.astro`/`.ts`: `import { valor, eur, decimal, P } from "@/lib/precios"`. `decimal(valor("almacen"))` para JSON-LD ("59.00"), `eur(valor("usuario"))` para texto ("7 €").
- En Markdown, frontmatter y strings: `[[p:almacen]]` → "59 €", `[[n:almacen]]` → "59". Admite cuentas con `+ - × /` y paréntesis: `[[p:almacen_tpv+2×usuario]]`. Multiplica con `×`, nunca con `*` (Markdown lo convierte en cursiva).
- Claves: `facturacion`, `tienda`, `almacen`, `produccion`, `almacen_tpv`, `<plan>_usuarios`, `<plan>_fichajes`, `<plan>_anual` (al mes pagando el año), `<plan>_ano`, `usuario`, `fichaje`, `caja`, `tpv`, `comerciales`, `mcp`, `soporte`, `equipo10/25/50`, `equipo_persona_extra`, `terminal`, `desde`, `hasta`, `meses_pagados`. Lista completa en `src/lib/precios.ts`.
- Los resuelve `src/middleware.ts` en cada respuesta de texto (también al prerenderizar). `scripts/check-precios.mjs` corre tras el build y falla si queda alguno sin resolver; una clave que no existe rompe el build.
- Si un texto recorta contenido antes de llegar al HTML (`.slice()`, imagen OG), pasa antes por `resolverPrecios()` para no cortar un token.
- Los precios de la competencia, multas y subvenciones se quedan como texto fijo.
- El contexto del CRM (`context/pricing.md`) no lee este archivo: si cambia un precio, actualízalo a mano.

## Deploy

- **Production**: Jenkins (`Jenkinsfile`) — `npm i --force && npm run build && wrangler pages deploy dist --project-name=landing-drp --branch=$BRANCH_NAME`. Cloudflare token + Clerk + reCAPTCHA + `SITE` come from Jenkins credentials.
- Direct CLI: `npm run deploy` runs `wrangler deploy` (Workers; reads `wrangler.json`).
- `Dockerfile` builds the static `dist/` and serves it via nginx — **alternate** path; prod uses Cloudflare Workers, so Dockerfile/`config/nginx/nginx.conf` is rarely the right target.

## Env vars (`.env.example`)
- `SITE` — base URL (overrides `src/config/config.json` `site.base_url`)
- `PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY`
- `PUBLIC_RECAPTCHA_SITE_KEY` / `RECAPTCHA_SECRET_KEY`

- `MCP_PUBLIC_URL`: opcional. URL pública del servidor MCP de Drenpos. Mientras no exista, `/.well-known/mcp/server-card.json` devuelve 404. En Cloudflare se lee en tiempo de ejecución; en Jenkins queda fijada en el build y además añade la entrada en `ai-catalog.json`.
- `CF_ZONE_ID` / `CF_API_TOKEN` — opcionales, solo para la purga manual de caché de Cloudflare con `npm run purge:cf` (`scripts/purge-cloudflare.mjs`). El deploy no purga automáticamente: la purga se hace a mano en el panel o con ese script. Token limitado a "Zone > Cache Purge > Purge".

`PUBLIC_*` vars are exposed to the client by Astro — keep secrets server-only.

## Gotchas

- `trailingSlash: "never"` — never add trailing slashes to internal links.
- `output: "server"` — every page is SSR by default; mark explicit prerender if you want static.
- Contact form posts to `n8n.drenpos.org` webhook (see `config.json` → `params.contact_form_action`), not an internal API route.
- Clerk middleware wraps **all** requests — adding public routes requires updating `src/middleware.ts`.
- `blog` and `local` are **separate** collections + routes. A post added to `src/content/blog/` will NOT appear at `/local/...`. Pick the right folder.
- After editing `wrangler.json` bindings, run `npm run cf-typegen` to refresh `worker-configuration.d.ts`.
