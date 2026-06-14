# Auditoría Drenpos — SEO / GEO / AEO + UX/UI

**Proyecto:** landing-drp (Astro 5 + Tailwind 4, SSR en Cloudflare Workers)
**Dominio:** https://www.drenpos.com
**Fecha:** 14 de junio de 2026
**Alcance:** análisis del sistema actual + roadmap de páginas a crear y mejorar

---

## 1. Resumen ejecutivo

El sitio parte de una base **muy sólida**: arquitectura de contenido amplia (14 artículos de blog, 25 páginas locales, 8 casos de éxito), un `llms.txt` excelente, `robots.txt` que abre la puerta a los crawlers de IA y un grafo de datos estructurados global bien planteado. El proyecto está claramente pensado con SEO en mente.

Los puntos débiles no están en la estrategia, sino en la **ejecución técnica**: tres problemas estructurales limitan el techo de posicionamiento y conversión.

1. **Todo el sitio se renderiza en servidor (SSR), sin prerender.** Una landing de marketing mayoritariamente estática no necesita SSR. Penaliza TTFB, Core Web Vitals y cacheabilidad — factores directos de ranking y de conversión.
2. **No hay datos estructurados por página.** El schema es global e idéntico en todas las URLs. Faltan `Article`, `FAQPage`, `Product/Offer` con precios reales, `BreadcrumbList` y `LocalBusiness`/`Service` — justo el contenido que Google convierte en *rich results* y que las IAs (Perplexity, ChatGPT, Gemini) citan.
3. **Sin `canonical` por defecto y navegación incompleta.** El menú principal solo expone 4 destinos; módulos, integraciones, casos, contacto, FAQ y las 25 páginas locales quedan huérfanas de enlazado, lo que reparte mal la autoridad y entierra páginas valiosas.

A nivel de producto, falta cobertura: solo *Control Horario* tiene landing dedicada. Facturación/Verifactu, TPV, Inventario y el vertical Supermercados (que ya tiene páginas locales) carecen de página pilar que capture su demanda de búsqueda.

**Prioridad:** resolver los tres problemas estructurales primero (impacto alto, esfuerzo medio), luego construir las landings de producto que faltan.

---

## 2. SEO técnico y on-page

### Lo que está bien
- `Base.astro` genera correctamente title, meta description, Open Graph y Twitter Card con *fallbacks* a `config.json`.
- Grafo JSON-LD global con `Organization`, `SoftwareApplication` y `WebSite` correctamente enlazados por `@id`.
- `sitemap` automático que incluye rutas dinámicas de blog y local vía `customPages`.
- Consent Mode v2 + GTM bien implementado (analítica respetando consentimiento).
- `lang="es"` correcto; el zoom no está bloqueado (`maximum-scale=5`, accesible).
- Fuentes locales con `display: swap` (evita texto invisible).

### Problemas y oportunidades

**ALTA — SSR en todo el sitio.** `astro.config.mjs` usa `output: "server"` y no hay un solo `export const prerender = true`. Páginas estáticas (home, funcionalidades, módulos, pricing, blog, locales, legales) deberían prerenderizarse. Solo necesitan SSR las que dependen de petición en vivo (formulario de contacto a n8n, áreas con Clerk). Recomendación: `output: "static"` + `export const prerender = false` puntual donde haga falta, o `output: "server"` + `prerender = true` en todas las páginas de contenido. Impacto directo en LCP/TTFB y en coste de Workers.

**ALTA — Sin canonical por defecto.** En `Base.astro` el `<link rel="canonical">` solo se emite si se pasa la prop `canonical`, y casi ninguna página la pasa. En SSR, con o sin `trailing slash`, esto invita a contenido duplicado. Debería autogenerarse siempre a partir de `config.site.base_url + Astro.url.pathname`.

**MEDIA — Bug en `og:url`.** Se construye con `pathname.replace("/", "")` (solo reemplaza la primera barra). Funciona por casualidad en rutas de primer nivel, pero es frágil. Conviene usar `new URL(Astro.url.pathname, base).href`.

**MEDIA — Imágenes sin optimizar en partials.** Hay ~12 `<img>` crudos en los partials sin `loading="lazy"`/`width`/`height` ni `webp` (p. ej. `grainy.svg` y heros). Genera CLS y peso innecesario. Migrar a `<ImageMod>` / `astro:assets` con dimensiones explícitas.

**BAJA — Preload de la fuente primaria.** `Aptos` (texto del body) tiene `preload: false`. Precargar la variante 400 mejoraría el LCP del texto.

**BAJA — `maximum-scale=5`.** Aceptable, pero lo ideal para accesibilidad total es no limitar el zoom.

---

## 3. GEO / AEO (buscadores con IA y *answer engines*)

### Lo que está bien — y es destacable
- **`llms.txt` excelente.** Completo, estructurado, con propuesta de valor, planes con precios, módulos, FAQ y contacto. Es de lo mejor que se puede entregar a un LLM. Mantener su generación dinámica.
- `robots.txt` permite explícitamente GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended, etc. Decisión correcta para visibilidad en IA.
- Existe también `llms-full.txt`. Bien.

### Oportunidades (alto retorno, las IAs premian el dato estructurado)

**ALTA — `FAQPage` schema en `/faq`.** La página FAQ no emite `FAQPage`. Es la victoria más rápida de AEO: habilita *rich results* de preguntas en Google y es el formato que más citan ChatGPT/Perplexity. El contenido ya existe en `Faq.astro`; solo falta el JSON-LD.

**ALTA — `Article`/`BlogPosting` en los 14 posts y 25 locales.** `PostSingle.astro` no emite schema de artículo (autor, fecha, imagen, *headline*). Sin esto, los artículos pierden elegibilidad para *rich results* y contexto para las IAs. El frontmatter ya tiene `author`, `date`, `image`, `description` — solo hay que volcarlo a JSON-LD.

**MEDIA — `Product` + `Offer` con precios reales en `/pricing` y `/modulos`.** Hoy el único `Offer` (en el grafo global) no lleva precio. Los planes (19/29/39 €) y módulos están en texto pero no en datos estructurados. Añadir `Product`/`Offer` con `price`, `priceCurrency`, `priceValidUntil` hace que las IAs respondan "¿cuánto cuesta Drenpos?" con tu dato exacto.

**MEDIA — `LocalBusiness`/`Service` + `BreadcrumbList` en páginas locales.** Las 25 páginas por ciudad son una mina para búsquedas "software control horario [ciudad]", pero sin `Service`/`areaServed` ni breadcrumbs pierden señal local y contexto jerárquico.

**MEDIA — Contenido "citable".** Reforzar respuestas directas: cada landing de producto debería abrir con una definición de 40-60 palabras (formato que las IAs extraen literalmente) y bloques de pregunta-respuesta. El blog ya lo hace bien; las landings de producto, no.

---

## 4. UX / UI y sistema de diseño

### Lo que está bien
- Sistema de design tokens limpio (`theme.json`): paleta burdeos `#791b46` + dorado `#d3a776`, escala tipográfica con ratio 1.23, dos familias (Aptos / Clash Grotesk).
- Componentización madura: ~45 partials reutilizables (hero, problemas, comparativas, pricing, testimonios, CTA).
- Home con narrativa de conversión correcta: problema → solución → ecosistema → antes/después → prueba social → precio → testimonio → CTA.
- AOS para animaciones de entrada; cookie consent accesible.

### Problemas y oportunidades

**ALTA — Navegación principal incompleta (UX + SEO).** El menú solo tiene Inicio, Funcionalidades (Varios/Control Horario), Precios y Blog. Quedan fuera del *header*: Módulos, Precios-detalle, Integraciones, Casos de éxito, Contacto, FAQ, Sobre nosotros y las 25 locales. Esto:
- obliga al usuario a adivinar dónde está la información (fricción de conversión);
- entierra páginas a 3+ clics, repartiendo mal el *link equity*.
Recomendación: menú con megamenú de "Producto/Módulos" (Facturación, TPV, Inventario, Control Horario, Supermercados), "Recursos" (Blog, Casos, FAQ) y un CTA persistente "Empieza gratis".

**MEDIA — Contraste del color `light` `#d17b87`.** Ese rosa sobre blanco ronda ~2.4:1 de contraste: insuficiente para texto (WCAG AA pide 4.5:1). Si se usa solo para fondos/acentos, vale; si toca texto, falla accesibilidad. Revisar usos.

**MEDIA — Falta de página pilar de producto.** Solo *Control Horario* tiene landing. El recorrido "qué hace exactamente cada módulo" se resuelve hoy en `/funcionalidades` y `/modulos` de forma genérica, sin una página por intención de búsqueda. Es a la vez un hueco de UX (el visitante interesado en facturación no encuentra una página que le hable a él) y de SEO.

**BAJA — Heros con `<img>` crudos.** Además del coste SEO, sin dimensiones explícitas provocan saltos de layout (CLS) que se perciben como "página que baila al cargar".

**BAJA — `about.astro` reusa un post de blog.** Funciona, pero "Sobre nosotros" merece una página propia con `Organization`/`AboutPage` schema y señales E-E-A-T (equipo, sede en Extremadura, trayectoria) — relevante para confianza y para que las IAs describan bien la empresa.

---

## 5. Roadmap propuesto

### Fase 1 — Cimientos técnicos (impacto alto, sin contenido nuevo)
1. Activar **prerender** en páginas estáticas (config + props).
2. **Canonical automático** en `Base.astro`.
3. **FAQPage** schema en `/faq`.
4. **Article** schema en `PostSingle` (cubre blog + locales de golpe).
5. Corregir `og:url` y precargar fuente primaria.

### Fase 2 — Páginas de producto nuevas (captura de demanda)
Landings pilares, una por intención de búsqueda, con definición citable + schema `Product/Offer` + FAQ:
- **Facturación electrónica / Verifactu** — alta demanda normativa 2026.
- **TPV / Punto de venta.**
- **Control de stock / Inventario.**
- **Software para supermercados** (página pilar que enlace las 25 locales).

### Fase 3 — Mejora de páginas existentes
- **Home:** jerarquía del hero, CTA persistente, prueba social más arriba.
- **Pricing:** `Product/Offer` schema, comparativa más clara, FAQ de precios.
- **Funcionalidades / Módulos:** reorientar a páginas de producto enlazadas.
- **Navegación:** megamenú + breadcrumbs en todo el sitio.
- **Sobre nosotros:** página propia con E-E-A-T.

### Fase 4 — Local SEO y enlazado
- `Service`/`LocalBusiness` + `BreadcrumbList` en las 25 locales.
- Enlazado interno desde landings pilar hacia locales y blog (clústeres temáticos).

---

## 6. Tabla de priorización

| # | Acción | Tipo | Impacto | Esfuerzo |
|---|--------|------|---------|----------|
| 1 | Prerender páginas estáticas | SEO técnico | Alto | Medio |
| 2 | Canonical automático | SEO técnico | Alto | Bajo |
| 3 | FAQPage schema | AEO | Alto | Bajo |
| 4 | Article schema (blog+local) | GEO/AEO | Alto | Bajo |
| 5 | Megamenú + nav completa | UX + SEO | Alto | Medio |
| 6 | Landing Facturación/Verifactu | SEO + conversión | Alto | Medio |
| 7 | Landing TPV | SEO + conversión | Medio | Medio |
| 8 | Landing Inventario | SEO + conversión | Medio | Medio |
| 9 | Landing Supermercados (pilar) | SEO local | Medio | Medio |
| 10 | Product/Offer schema en pricing | AEO | Medio | Bajo |
| 11 | Service/LocalBusiness en locales | SEO local | Medio | Medio |
| 12 | Optimizar imágenes de hero | Rendimiento | Medio | Bajo |
| 13 | Revisar contraste color `light` | Accesibilidad | Bajo | Bajo |
| 14 | Página "Sobre nosotros" propia | E-E-A-T | Bajo | Bajo |

---

*Siguiente paso sugerido: empezar por la Fase 1 (cimientos técnicos) porque multiplica el efecto de todo lo demás, y en paralelo construir la landing de Facturación/Verifactu, que es la de mayor demanda en 2026.*
