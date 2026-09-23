# Landing Drenpos, 23/09/2026: control horario ampliado, control de stock, hostelería y capa para IA

Estado: cambios hechos en el repo, `npx astro build` pasa (EXIT 0, seoGraph sin enlaces rotos en 152 páginas, 226 bloques JSON-LD válidos, 46 FAQPage, H1 único en todas las páginas de contenido). Revisión de contenido por un agente independiente: 8/10. Sin commit.

## 1. El fallo más importante que se ha encontrado

El `llms.txt` que estaba en producción NO era el que se redactó a mano en `src/pages/llms.txt.ts`. El plugin `astro-seo-graph` tenía activada la opción `llmsTxt` en `astro.config.mjs` y escribía su propio `dist/llms.txt` al final de cada build: una lista automática de todas las páginas, con la 404 incluida y con la frase "módulo médico" en el resumen. Ese fichero pisaba al tuyo. Todo el trabajo de los llms.txt de las tandas anteriores nunca llegó a publicarse.

Corregido: la opción `llmsTxt` se ha quitado de `astro.config.mjs` (queda un comentario explicando por qué). Ahora `dist/llms.txt` es el documento redactado (433 líneas) y `dist/llms-full.txt` el completo. En cuanto despliegues, comprueba `https://www.drenpos.com/llms.txt`: debe empezar por "# Drenpos" y una línea de entidad con la razón social, no por "## Pages".

## 2. Qué se ha cambiado

### Control horario (`/control-horario` y `/dispositivo-fichaje`)

- Tres secciones nuevas con H2 en pregunta y cápsula citable: `#vacaciones` (tipos, cupos con política, consolidación, aprobación con contrapropuesta, calendario de equipo, art. 38 ET enlazado), `#entrada-salida` (opción apagada por defecto, siete tipos de incidencia, tolerancias, revisión diaria y semanal, justificar o descartar con nota, el terminal sin conexión nunca genera "tarde") y `#calendarios` (calendarios con vigencias, festivos por comunidad y por persona, asignación en bloque, horas extra día a día, art. 35 ET, Extremadura 2027 ya en el DOE y calendario nacional 2027 pendiente en el BOE).
- Bloque de widgets del panel de inicio, dos casos nuevos, hero reescrito ("Software de control horario: fichajes, vacaciones y retrasos sin Excel"), 7 FAQ nuevas (19 en total, todas en el FAQPage), `featureList` y `description` del JSON-LD, precio del `Offer` corregido de 1,09 a 1 € con `valueAddedTaxIncluded: false`.
- Estado del real decreto con fecha (23/09/2026) en el banner legal, en la sección de cumplimiento y en la FAQ 1.
- `/dispositivo-fichaje`: llaveros desconocidos en cuarentena, trazabilidad de lo que sube cada terminal y de su reloj, dos filas en la ficha técnica, una FAQ nueva y dos `additionalProperty` en el schema Product.

### Almacén y logística

- Landing nueva `/software-control-stock` (control de stock e inventario: mínimos y máximos con alertas, propuesta de compra, lotes y caducidad, pistola o móvil, formatos, inventarios físicos, valoración). Misma estructura que sus hermanas, 8 FAQ, JSON-LD completo, en el menú y en los arrays `hermanas` de las siete landings del clúster.
- `/software-gestion-almacen`: secciones `#sga-o-erp` (responde al ángulo de la competencia "el ERP no llega, necesitas un SGA aparte"), `#errores-picking` (cifras de Intermec con fuente) y `#pistola-pda`; `description` recortada de 196 a 150 caracteres.
- `/software-almacen-frigorifico`: sección `#mercado-frio` con datos DBK y bloque de tarifas de depósito y simulador. `/software-preparacion-pedidos-picking`: `description` recortada y enlace a la landing nueva.
- Rayas antiguas eliminadas de las dos landings de almacén.

### Hostelería

- `/software-bares-restaurantes`: definición citable tras el hero, sección `#cuanto-cuesta` con tabla de precios de mercado verificados el 23/09/2026 (Last.app, Square, SumUp, Holded, Numier) frente al plan Full, `#verifactu-hosteleria` (fechas de 2027), `#fichaje-hosteleria` (turnos partidos, terminal en barra, calendarios por turno), cifras del sector con fuente (Anuario de la Hostelería, Square), 4 FAQ nuevas incluida una que dice con claridad lo que Drenpos no hace (delivery, reservas, datáfono propio, escandallos).

### Posts nuevos (7, fecha 23/09/2026, con FAQ en frontmatter y cápsula inicial)

| Slug | Clúster | Portada que usa hoy (prestada) |
| --- | --- | --- |
| `gestion-vacaciones-permisos-pymes-sin-excel` | Control horario | `comparativa-mejores-software-control-horario-pymes-2026/cover.jpg` |
| `control-entrada-salida-retrasos-empleados` | Control horario | `registro-horario-2026-nuevos-requisitos-adaptacion/cover.jpg` |
| `calendario-laboral-2027-festivos-horas-extra` | Control horario | `control-horario-teletrabajo-cumplir-ley-2026/cover.jpg` |
| `sga-o-erp-con-almacen-que-necesita-una-pyme` | Almacén | `cuanto-cuesta-sga-wms-pyme-2026/cover.jpg` |
| `software-distribuidor-bebidas-cajas-palets-formatos` | Almacén | `preparacion-de-pedidos-picking-almacen/cover.jpg` |
| `cuanto-cuesta-tpv-bar-restaurante-2026` | Hostelería | `tpv-bares-restaurantes-como-elegir-2026/cover.jpg` |
| `control-horario-hosteleria-turnos-partidos` | Hostelería | `gestion-mesas-restaurante-mapa-sala/cover.jpg` |


### Posts refrescados (con `updated: 2026-09-23`)

`mejores-programas-control-horario`, `registro-horario-digital`, `por-que-excel-ya-no-sirve-control-horario-2026`, `fichar-desde-el-movil-legal-2026`, `tpv-bares-restaurantes-como-elegir-2026`, `wms-sga-erp-diferencias`, `control-de-stock-sin-roturas`. En varios se han corregido afirmaciones antiguas: nóminas, "Excel es ilegal", multa por trabajador como vigente, casos de clientes inventados (pasan a ejemplo hipotético), sincronización con marketplaces.

### Capa para IA y entidad

- `llms.txt.ts` y `llms-full.txt.ts`: entidad (Drenpos Tech SL, Solana de los Barros, fundador con LinkedIn), novedades fechadas, intenciones nuevas, datos citables con URL, lo que Drenpos no hace, FAQ nuevas, conector Holded.
- `Base.astro`: `Organization` con `legalName`, `founder`, `address` (sin calle), `areaServed`; `featureList` ampliado; `BlogPosting` con `publisher` explícito y autor `Person` con `sameAs`.
- `blog/[single].astro` y `local/[single].astro`: autor con `jobTitle`, `url` y `sameAs`.
- `modules.md` (features nuevas y módulo "Conector Holded" a consultar; `ModulesTableCollapsible.astro` ya no añade "/mes" a un precio de texto), `faq.md` (5 FAQ nuevas), `menu.json` ("Control de Stock"), `funcionalidades.astro` (bloque de control horario con tres tarjetas), `CLAUDE.md`.
- `docs/keywords-intenciones-2026-09.md`: mapa de keywords e intenciones, datos citables, competencia, backlog y calendario de vigilancia. Copia en el proyecto de Claude.

## 3. Capturas (opcionales)

Decisión del 23/09: las capturas de incidencias, calendarios y control de stock no son necesarias. Sus bloques llevan guard `hasImg`/`existsSync`, así que las páginas se ven completas sin ellas y, si algún día existe el fichero en la ruta indicada, aparecen solas. Pexels no sirve para estas tres: son pantallas del producto y una foto de stock engañaría.

| Ruta dentro de `public/` | Tamaño | Estado |
| --- | --- | --- |
| `images/funcionalidades/control-horario/10-vacaciones-calendario.png` | 1280×800 | Opcional, la más útil de las cuatro (sección `#vacaciones`) |
| `images/funcionalidades/control-horario/11-incidencias-entrada-salida.png` | 1280×800 | Descartada |
| `images/funcionalidades/control-horario/12-calendarios-laborales.png` | 1280×800 | Descartada |
| `images/funcionalidades/almacen-tienda/07-control-stock-alertas.png` | 1200×800 | Descartada |

Portadas de los 7 posts nuevos: hoy usan portadas prestadas de posts del mismo clúster y eso ya funciona. Si quieres portada propia, Pexels es la vía (ni el contenedor ni el puente al Mac llegan a `api.pexels.com`; hay que lanzarlo desde una terminal local): añade los slugs al plan de `agent/img-almacen-2026.mjs` (los dos de almacén) y `agent/img-hosteleria-2026.mjs` (los dos de hostelería y, si amplías el plan, los tres de control horario) y ejecuta `node agent/img-almacen-2026.mjs --only <slug>`.

## 4. Confirmar antes de publicar

1. Fichaje a 1 €/usuario/mes: ¿se puede contratar sin plan base? Se ha quitado "sin mínimo" por prudencia.
2. Inventarios parciales por zona escaneando: lo dice `software-control-stock`, `faq.md` y los llms (y ya lo decía la landing de almacén). No está en `products_modules.md`.
3. Página de bares: remisión a la AEAT de cada ticket del TPV; "desayunos en dos toques, menús con pasos"; pedidos y pago desde la mesa "en desarrollo" y alérgenos "en las próximas semanas" (coincide con posts anteriores, no con el contexto).
4. Turno partido: se describe como dos entradas y dos salidas el mismo día, con la tarde como pausa en el calendario. Turnos que pasan de medianoche no se mencionan.
5. PDA con lector integrado tratada como pistola; recuentos "por zonas o ubicaciones"; "sin permanencia" en la landing nueva (como en sus hermanas).
6. Perfiles de empresa añadidos al `sameAs`: `linkedin.com/company/drenpos` y `x.com/Drenpos`. Si no son vuestros, quitarlos de `Base.astro`. YouTube no se ha añadido (hay dos canales).
7. JSON-LD: razón social escrita "Drenpos Tech SL" sin NIF ni calle. El aviso legal publica "Drenpos Tech, S.L.", B22872501 y C/ Badajoz 4, 06209 Solana de los Barros. Si quieres coherencia total, añadir `taxID`, `streetAddress` y `postalCode`.
8. Conector Holded aparece ya en `/modulos`, en la tabla de precios, en la FAQ y en los llms como "precio a consultar".
9. "Hora reconstruida" y "qué le ha pasado a su reloj" en `/dispositivo-fichaje`: casi literal del contexto; si hay nombre de pantalla, se afina.
10. Cifras antiguas sin fuente que siguen en textos de antes de hoy: "10 a 30 €/mes" para facturación con inventario (landings de almacén), "sanciones de más de 600.000 €" y "hasta 10×" en llms.txt, tabla "orientativa" de precios en `mejores-programas` (Sesame sale a 5,50 y a 3,75 en el mismo post).
11. `context/obligaciones_legales.md` del CRM-Seller (se inyecta a tu agente de ventas) está desactualizado: da la multa por trabajador como vigente, Verifactu en 2025/2026 y habla de "homologado". Hay que corregirlo para que el agente de ventas no lo repita.

## 5. Avisos del build (todos anteriores a hoy)

- H1 doble en las cuatro páginas de `legal/`.
- `funcionalidades` título de 70 caracteres y description de 187; `pricing` título 67 y description 224; `404` título corto; `about` y `blog/about` comparten título y description.
- Vite avisa de `node:fs` y `node:path` en los dos llms; con `nodejs_compat` en Cloudflare funciona (ya pasaba).

## 6. Siguiente paso fuera del repo

Lo que más mueve las citas ahora que la web está bien: alta en Capterra ES, GetApp y Softwaredoit; Bing Webmaster Tools (ChatGPT tira del índice de Bing) y comprobar que `INDEXNOW_KEY` está en Jenkins; unificar la entidad (misma sede en todas partes, Google Business Profile, Wikidata); nota de prensa propia con enlace a la web para los medios extremeños que ya os citaron sin enlace. El detalle, con URLs y orden, está en `docs/keywords-intenciones-2026-09.md`, secciones 8 y 9, junto con las 10 consultas de prueba para lanzar cada dos semanas en ChatGPT, Perplexity, Claude y Gemini.

## Fuentes principales

- Estatuto de los Trabajadores (arts. 34.9, 35, 37, 38): https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430
- RD-ley 8/2019: https://www.boe.es/buscar/act.php?id=BOE-A-2019-3481
- LISOS: https://www.boe.es/buscar/act.php?id=BOE-A-2000-15060
- Calendario laboral 2026 (BOE 28/10/2025): https://www.boe.es/diario_boe/txt.php?id=BOE-A-2025-21667
- RDL 15/2025 (Verifactu 2027): https://www.boe.es/diario_boe/txt.php?id=BOE-A-2025-24446
- Reglamento CE 178/2002: https://www.boe.es/buscar/doc.php?id=DOUE-L-2002-80201
- De Koster, Le-Duc y Roodbergen (2007): https://www.sciencedirect.com/science/article/abs/pii/S0377221706006473
- El resto de fuentes (Intermec, Corsten y Gruen, DBK, Anuario de la Hostelería, precios de competidores) están enlazadas en cada página y recogidas en `docs/keywords-intenciones-2026-09.md`.
