# Auditoría SEO / AEO y ronda de contenido: 6 de noviembre de 2026

Base: `docs/seguimiento-2026-10-17.md`, `docs/plan-contenidos-2026-10-17.md` y el contexto comercial actualizado hoy (`DRP/context/products_modules.md`). Sin datos nuevos de Search Console ni GA4 (los últimos son del 14/10). Brief de los agentes: `docs/brief-redaccion-agentes.md`.

## 1. Puntuación técnica (skill astro-seo)

| Área | Nota | Lectura |
| --- | --- | --- |
| Cabecera y metadatos (`<Seo>`, canónicas, robots) | 9/10 | Un solo componente, `site` correcto, fallback de títulos. `/about` declara canónica `/blog/about` con la URL escrita a mano |
| JSON-LD | 9/10 | Grafo con `@id` (Organization, WebSite, SoftwareApplication), Breadcrumb + SoftwareApplication + FAQPage por landing. Ahora también FAQPage en la home |
| Colecciones y esquema | 8/10 | Zod en todo; `check-contenido` valida longitudes y muletillas |
| Imágenes OG | 7/10 | Hay ruta OG; las dos landings nuevas usan la OG por defecto (faltan capturas reales del SAT y de variantes) |
| Sitemap e indexación | 9/10 | Sitemap con lastmod de git, IndexNow solo en producción, RSS |
| Descubrimiento por agentes | 10/10 | llms.txt y llms-full escritos a mano, Markdown por negociación, api-catalog, ai-catalog, cabecera Link |
| Rendimiento | 8/10 | Prerender en landings; sin `_headers` por decisión del 07/10 |
| Redirecciones y 404 | 8/10 | 301 en el worker; sin FuzzyRedirect en la 404 |
| Validación en build | 9/10 | seoGraph con H1, unicidad, alt, longitudes y enlaces internos: 225 páginas, enlaces y alt correctos |
| **Total** | **77/90** | El cuello de botella no es técnico: es cobertura de contenido y presencia fuera de la web |

Comprobado: la referencia BOE-A-2018-16036 del RDL 19/2018 que citan los posts de SEPA es correcta. Arreglado hoy: doble H1 en las 4 páginas legales. Quedan avisos menores sin tocar: título de la 404 (20 caracteres), descripción de privacidad (54) y el par `/about` y `/blog/about` (duplicado intencionado con canónica).

## 2. Hueco principal: producto nuevo sin páginas

Desde el 20/10 el producto ganó módulos y funciones que la web no contaba. Mapa de intención → URL de esta ronda:

| Intención (consultas) | Tipo | URL | Competencia en la SERP (06/11) | Hueco que cubrimos |
| --- | --- | --- | --- | --- |
| software partes de trabajo, app partes de trabajo, software SAT, programa empresa de limpieza | Comercial | `/software-partes-trabajo-sat` (nueva) | Apps de partes (AppSat, CreaPartes, TecniJob), rankings de limpieza (Connecteam, ZenMaid), ERP de servicios (STEL Order, Sage 50 Servicios) | Qué pasa después del parte: albarán, factura, remesa y por qué un recibo no entra; fichaje y parte en la misma app; lo que no hace |
| app partes de trabajo limpieza | Informativa | `/blog/app-partes-de-trabajo-empresa-limpieza` | Idem | Qué debe registrar un parte, papel frente a app, ejemplo con 8 operarias |
| parte de trabajo a factura, remesa SEPA | Informativa | `/blog/parte-de-trabajo-a-factura-remesa-sepa` | Sin pieza práctica | Del parte al cobro domiciliado paso a paso |
| programa tienda de ropa, TPV tallas y colores | Comercial | `/software-tienda-ropa` (nueva) | Comparadores (SoftDoit, Capterra), TPV de nicho, guía de Odoo para moda | Lo que no hace, migración desde fichas por talla, reposición por talla con números |
| stock por talla y color | Informativa | `/blog/tallas-colores-stock-tienda-ropa` | Idem | Modelo frente a fichas sueltas, matriz y mínimos por talla |
| exportar facturas a A3, SUENLACE | Informativa / gestorías | `/blog/exportar-facturas-a3-suenlace` | CopilotGestoria, ayuda de Holded | Formato 4 frente a 5 y qué se queda fuera |
| actualizar precios cuando sube el coste | Informativa | `/blog/tarifas-sobre-coste-actualizar-precios` | Calculadoras y blogs (Stelorder, Omni) | Margen mínimo, redondeo, umbral y aprobación juntos |
| remesas SEPA pyme | Informativa | `/blog/remesas-sepa-cobros-domiciliados-pyme` | SEPAesp, Sage, GoCardless | Por qué una factura no se puede cobrar |
| bolsa de horas control horario | Informativa | `/blog/bolsa-de-horas-bono-control-horario` | Factorial, PayFit (bolsa laboral) | Bono comercial de horas y qué ve el trabajador |
| coste o factura de un almacén externo 3PL | Informativa | `/blog/controlar-factura-almacen-externo-3pl` | Extensiv, Logiwa (en inglés, lado del operador) | Cotejo desde el lado de la marca, en español |
| traslados entre almacenes, stock en tránsito | Informativa | `/blog/traslados-entre-almacenes-transito` | Documentación de SAP, Odoo, Infor | Explicación para pyme con reposición por mín/máx |

Sin canibalización: cada intención tiene una URL. Las landings existentes ganan secciones con ancla propia en vez de páginas nuevas (`#picking-pda`, `#pedidos-en-espera`, `#minimos-por-almacen`, `#entrada-rapida`, `#temperatura-llegada`, `#cuadro-mandos`, `#novedades-almacen`, `#albaran-rapido-movil`, `#bono-de-horas`, `#informe-mensual-equipo`).

## 3. Estructura y distribución del contenido

| Página | Problema | Cambio |
| --- | --- | --- |
| Home | H1 sin palabra clave («El software de gestión que da libertad a tu pyme»); sin entrada por sector; sin FAQ; 2 componentes importados sin usar | H1 «Software de gestión para pymes: almacén, TPV, facturación y control horario», bloque «¿Qué parte de tu empresa quieres ordenar primero?» generado desde `landings.json` (partial `SolucionesPorTipo`), 6 FAQ con JSON-LD (partial reutilizable `FaqLista`), borrados `Solution.astro` y `StandoutSection.astro` |
| Funcionalidades | Meta description desfasada (hablaba de «envío de documentos por QR»); sin almacén, producción, SAT ni ropa; el mismo bloque repetido 4 veces | Bloques guiados por datos: almacén y logística, tiendas, servicios y producción, control horario, cumplimiento (con A3), hostelería. Anclas antiguas conservadas |
| Módulos | Descripción con «Descubre…» | Descripción con precio y alcance; tabla con SAT (precio a consultar), A3, tarifas sobre coste, PDA, variantes, bonos de horas |
| Mega menú | Grupo «Ventas y producción» | «Ventas, servicios y producción», con las dos landings nuevas |
| Contenido existente que contradecía el producto | `drenpos-vs-stel-order`, `comparativa-software-gestion-pymes-almacen-2026` y `drenpos-vs-sage-50` decían «no tenemos partes de trabajo/SAT» | Corregidos con enlace a la landing nueva |

## 4. AEO

Todas las piezas nuevas siguen la regla de la casa: H2 en pregunta, respuesta de 40-60 palabras sin enlaces debajo, tablas, FAQ visible igual a la del JSON-LD y un apartado de lo que no hace. Los asistentes nos citan cuando hay producto concreto, precio y límites (seguimiento del 17/10): las páginas nuevas llevan las tres cosas, salvo el precio del SAT, que no está decidido.

`llms.txt` y `llms-full.txt` tienen un bloque «Novedades (6 de noviembre de 2026)» con cada página, guía y ancla nueva.

## 5. Decisiones del 06/11 (aplicadas)

Manda la web en precios (agencias sin coste; corregido el contexto). La app del SAT necesita conexión y aún no recoge firma (añadido a «qué no hace»). El TPV de Tienda y Hostelería marca el stock por talla. Cada variante tiene su mínimo y máximo. Partir del precio medio en tarifas sobre coste necesita Inventario. Quitado «Módulo sector médico» del JSON-LD. Las capturas las hace Alonso.

## 6. Pendiente

| Quién | Qué |
| --- | --- |
| Alonso | Revisar y publicar (push a `main` y purgar caché de Cloudflare) |
| Alonso | Capturas reales del SAT (app «Mis trabajos») y de la rejilla de variantes para las dos landings nuevas y su OG |
| Alonso | Fichas en Capterra, Softwaredoit y Appvizer (sigue siendo lo que más pesa para los asistentes) |
| Claude | En 2-3 semanas: Search Console de las URLs nuevas y prueba en ChatGPT de «software partes de trabajo», «programa tienda de ropa tallas y colores» y «exportar facturas a A3» |
