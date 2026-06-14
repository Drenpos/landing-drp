# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing/landing site for **Drenpos** (ERP SaaS modular para pymes en España). Spanish-language site at `https://www.drenpos.com`. Astro 5 SSR on **Cloudflare Workers** (not Pages directly — see Deploy).

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Local dev at `localhost:4321` |
| `npm run build` | Build SSR bundle to `./dist/` (also runs as part of `preview` and `check`) |
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

**Plans comparison schema** (`plans-comparison.md`) uses three plan columns: `essential`, `pro`, `full`. Cell values are `boolean | number | string` — preserves "Hasta 2026" / "Próximamente" style overrides.

### Page routes worth knowing
- `[regular].astro` — catch-all for `pages` collection
- `blog/[single].astro` + `blog/page/` — paginated blog
- `local/[single].astro` + `local/page/` — paginated local-SEO blog (separate from `blog`)
- `llms.txt.ts`, `llms-full.txt.ts`, `robots.txt.ts`, `rss.xml.js` — generated text routes
- `legal/` — static legal pages (aviso-legal, cookies, privacidad, terminos)

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
`Base.astro` emits JSON-LD for `Organization`, `SoftwareApplication`, `WebSite`. Update product features there when adding modules.

### Two key components
`MODULES_TABLE_README.md` documents `ModulesTableCollapsible.astro` + `PlansComparison.astro` (collapsible module catalog + plan comparison matrix). The collapsible variant supersedes the legacy `ModulesTable.astro`.

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

## Deploy

- **Production**: Jenkins (`Jenkinsfile`) — `npm i --force && npm run build && wrangler pages deploy dist --project-name=landing-drp --branch=$BRANCH_NAME`. Cloudflare token + Clerk + reCAPTCHA + `SITE` come from Jenkins credentials.
- Direct CLI: `npm run deploy` runs `wrangler deploy` (Workers; reads `wrangler.json`).
- `Dockerfile` builds the static `dist/` and serves it via nginx — **alternate** path; prod uses Cloudflare Workers, so Dockerfile/`config/nginx/nginx.conf` is rarely the right target.

## Env vars (`.env.example`)
- `SITE` — base URL (overrides `src/config/config.json` `site.base_url`)
- `PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY`
- `PUBLIC_RECAPTCHA_SITE_KEY` / `RECAPTCHA_SECRET_KEY`

`PUBLIC_*` vars are exposed to the client by Astro — keep secrets server-only.

## Gotchas

- `trailingSlash: "never"` — never add trailing slashes to internal links.
- `output: "server"` — every page is SSR by default; mark explicit prerender if you want static.
- Contact form posts to `n8n.drenpos.org` webhook (see `config.json` → `params.contact_form_action`), not an internal API route.
- Clerk middleware wraps **all** requests — adding public routes requires updating `src/middleware.ts`.
- `blog` and `local` are **separate** collections + routes. A post added to `src/content/blog/` will NOT appear at `/local/...`. Pick the right folder.
- After editing `wrangler.json` bindings, run `npm run cf-typegen` to refresh `worker-configuration.d.ts`.
