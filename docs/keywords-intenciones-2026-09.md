# Mapa de palabras clave e intenciones de búsqueda de Drenpos (septiembre de 2026)

Fecha: 23/09/2026. Para: Alonso. Base: las cuatro notas de investigación de `research_notes/Keywords Drenpos septiembre 2026/` (control horario ampliado, almacén y logística, hostelería, estado GEO de Drenpos), el contexto de producto de `context/` y lo que hay hoy en el repo.

Cómo usarlo: la sección 3 te dice qué URL tiene que ganar cada búsqueda; la 5 te da los números que puedes poner en una página con su enlace; la 7 es la lista de trabajo; la 9 es lo que tienes que mirar cada semana o cada mes. Todo lo que lleva cifra lleva fuente. Lo que no se pudo comprobar está en la sección 5.2 para que no se cuele.

---

## 1. Dónde está Drenpos hoy (10 líneas)

1. Control horario es el único clúster con tracción: ChatGPT ya cita a Drenpos en ese tema y la búsqueda "Drenpos fichaje" saca `/control-horario` en segunda posición, justo detrás del LinkedIn del fundador.
2. En almacén ("software gestión almacén pymes", "SGA para pymes", "software almacén frigorífico") y en hostelería ("TPV bares restaurantes software") drenpos.com no está en el top 10 de ninguna consulta de categoría (búsqueda del 23/09/2026).
3. Esas consultas las ganan listicles de fabricantes con blog fuerte (STEL Order, Holded, Cleverals), comparadores (Softwaredoit, Capterra, GetApp) y fabricantes especializados (Camarero10, LK Bitronic, Ubiar, Physis).
4. La huella de terceros es fina: una sola nota de prensa (Extremadura Open Future, noviembre y diciembre de 2025) republicada en unos siete medios regionales, y ninguno enlaza a drenpos.com.
5. Drenpos no aparece en Capterra, GetApp, Softwaredoit, Appvizer, ComparaSoftware, G2, Crunchbase, Product Hunt ni Wikidata.
6. La entidad está difusa: Mérida, Badajoz, Solana de los Barros o "Extremadura" según la fuente, y "Drenpos", "Drenpos Tech SL" o "Bermejo Bytes" según el perfil. El JSON-LD `Organization` de `Base.astro` no lleva razón social, dirección ni fundador, y su `sameAs` apunta a Facebook, al Instagram y al LinkedIn del fundador, no al LinkedIn, X o YouTube de la empresa.
7. La base técnica está bien: robots.txt abre la puerta a 14 bots de IA, llms.txt y llms-full.txt están fechados el 21/09 y las landings tienen definición al principio y FAQ de 8 a 11 preguntas.
8. Lo que falta en la web: cifras con fuente enlazada, fecha visible y autor en las landings, clientes con nombre o casos con números, definición en el primer párrafo de `/software-bares-restaurantes`, y razón social, CIF y dirección en `/about`, en el pie y en llms-full.txt.
9. Ojo al despliegue: la lectura de producción del 23/09 aún veía "desde 19,90 €/mes" en almacén y `/control-horario` sin precio, dos cosas que la tanda del 14/09 ya corrigió en el repo. Comprueba que las tandas del 14 y del 21/09 están publicadas.
10. La palanca que falta no es técnica: son fuentes de terceros (comparadores, reseñas, prensa con enlace) y páginas que respondan a precio, obligación legal y comparativa con cifras enlazadas.

---

## 2. Cómo sacan sus respuestas los motores en 2026

Resumen de la documentación oficial consultada el 23/09/2026. Donde la doc no lo dice, se indica.

| Motor | Rastreador o índice | Lo que dice su documentación | URL oficial | Qué implica para Drenpos |
|---|---|---|---|---|
| ChatGPT (search) | OAI-SearchBot. GPTBot es para entrenamiento y ChatGPT-User "is not used to determine whether content may appear in Search". | "Sites that are opted out of OAI-SearchBot will not be shown in ChatGPT search answers". La ayuda dice que "ChatGPT search sometimes partners with other search providers", menciona las políticas de privacidad de Microsoft y Shopify, pide permitir OAI-SearchBot y sus IP publicadas, y avisa: "Placement is not guaranteed". | [OpenAI bots](https://developers.openai.com/api/docs/bots), [Ayuda ChatGPT search](https://help.openai.com/en/articles/9237897-chatgpt-search) | Ya permitido en robots.txt. Que use el índice de Bing está muy repetido pero no aparece literal en la ayuda actual: date de alta en Bing igualmente, cuesta poco. |
| Perplexity | PerplexityBot (propio). Perplexity-User hace fetch a petición del usuario y "generally ignores robots.txt rules". | "PerplexityBot is designed to surface and link websites in search results on Perplexity"; no entrena modelos; hay que permitirlo en robots.txt y permitir sus rangos IP. No menciona sitemaps ni IndexNow. | [Perplexity bots](https://docs.perplexity.ai/guides/bots) | Ya permitido. Revisa que Cloudflare no bloquee sus IP (reglas de bots o WAF). |
| Claude | ClaudeBot (entrenamiento), Claude-User (fetch a petición), Claude-SearchBot (calidad de resultados de búsqueda). | La doc no dice qué índice usa la búsqueda web de Claude. TechCrunch (21/03/2025) recogió que Anthropic añadió Brave Search a sus subencargados; Anthropic no lo confirmó. | [Anthropic, rastreo web](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler), [TechCrunch](https://techcrunch.com/2025/03/21/anthropic-appears-to-be-using-brave-to-power-web-searches-for-its-claude-chatbot/) | robots.txt no nombra Claude-SearchBot ni Claude-User (quedan cubiertos por `*`). Añadirlos es cosmético pero quita dudas. La vía de alta en Brave no se pudo confirmar (su página de envío dio 404). |
| Gemini y AI Overviews / AI Mode | Índice normal de Google. | "To be eligible to be shown as a supporting link in AI Overviews or AI Mode, a page must be indexed and eligible to be shown in Google Search with a snippet"; "You don't need to create new machine readable files, AI text files, or markup"; "There's also no special schema.org structured data that you need to add". Google-Extended limita el entrenamiento y el grounding "in some of Google's other systems". | [Google Search Central, AI features](https://developers.google.com/search/docs/appearance/ai-features) | Para Google no hay atajo: indexar y posicionar. Sin autoridad externa no habrá AI Overview. |
| IndexNow (Bing, Yandex y otros) | Protocolo de aviso. | Se notifica una URL "added, updated, or deleted" por GET o por POST de hasta 10.000 URLs, con fichero de clave en la raíz; las URLs "will be automatically shared with all other participating search engines". | [IndexNow](https://www.indexnow.org/documentation) | Ya está en `astro.config.mjs`, pero solo se envía si el build es de producción en `main` y existe `INDEXNOW_KEY`. Comprueba en Jenkins que la variable está puesta y que el fichero de clave se sirve. |

### Qué significa para un sitio pequeño como el tuyo

- **El rastreo no es el cuello de botella.** OAI-SearchBot, PerplexityBot, ClaudeBot y Google-Extended ya tienen `Allow: /`. Lo que frena es la autoridad externa y la indexación efectiva en Bing y Brave, que no se ha podido verificar.
- **Bing Webmaster Tools.** Alta del dominio importando la propiedad desde Search Console, envío del sitemap (`/sitemap-index.xml`) y revisión de errores. Es la acción de menor esfuerzo con efecto posible en ChatGPT, Copilot y DuckDuckGo.
- **IndexNow.** Configurado en el repo con condición; verifica que se dispara de verdad en cada despliegue a producción. Que Cloudflare lo emita por su cuenta (Crawler Hints) no está verificado.
- **Entidad.** Una sola razón social, una sola ciudad y los mismos perfiles en `/about`, pie, llms-full.txt, LinkedIn, Google Business Profile y Wikidata. En el JSON-LD `Organization`: `legalName`, `address`, `founder` y `sameAs` a los perfiles de empresa (LinkedIn de empresa, X, YouTube, Crunchbase cuando exista).
- **llms.txt.** Ninguna documentación oficial consultada dice que ChatGPT, Perplexity o Claude lo lean, y Google dice expresamente que no hace falta. Mantenerlo al día es barato y evita que alguien copie un dato viejo (pasó con las fechas de Verifactu), pero no es la palanca.
- **robots.txt.** La línea `Schemamap:` no es una directiva que reconozca ninguno de los motores consultados. No hace daño, pero tampoco hace nada.

---

## 3. Mapa keyword → URL por clúster

**Aviso:** no hubo acceso a herramientas de volumen (Keyword Planner, Semrush, Ahrefs). Las keywords salen del fraseo real que usan los títulos, H1 y FAQ de las páginas que Google posiciona hoy. La prioridad es cualitativa: pesa cuánto compite la SERP, cuánto encaja con lo que Drenpos hace de verdad y si hay fecha límite (normativa, estacionalidad). Antes de gastar dinero en anuncios con estas keywords, pásalas por Keyword Planner.

Estados: **existe** (publicada o en el repo), **hoy** (la están creando hoy, 23/09/2026), **pendiente** (no existe; la URL es una propuesta).

### 3.1 Control horario ampliado

Nota de fraseo: "control de puntualidad" y "control de asistencia" son fraseo de Chile, México y Costa Rica ("reloj checador"). En España se busca "control de entrada y salida", "retrasos", "llegar tarde". Usa "puntualidad" solo como secundaria.

| Keyword primaria | Secundarias | Intención | URL objetivo | Estado | Prioridad |
|---|---|---|---|---|---|
| software de control horario | registro de jornada, app para fichar, control de presencia, fichaje digital, software control horario pymes | Comercial | `/control-horario` | existe | Alta (mantener) |
| terminal de fichaje | dispositivo de fichaje sin huella, fichar sin internet, fichaje con llavero RFID, terminal fichaje con logo | Comercial | `/dispositivo-fichaje` | existe | Alta |
| software de gestión de vacaciones y ausencias | gestor de vacaciones, app de vacaciones para empleados, software vacaciones pyme, programa para gestionar vacaciones de empleados, software de vacaciones y permisos | Transaccional | `/blog/gestion-vacaciones-permisos-pymes-sin-excel` y, después, landing propia `/software-vacaciones-ausencias` | hoy (post) / pendiente (landing) | Alta |
| control de entrada y salida de empleados | retrasos empleados, llegar tarde al trabajo, incidencias de fichaje, tolerancia de minutos al fichar, exceso de horas | Comercial e informacional | `/blog/control-entrada-salida-retrasos-empleados` y, después, landing `/control-entrada-salida-empleados` | hoy (post) / pendiente (landing) | Alta |
| calendario laboral 2027 | festivos 2027, festivos 2027 Extremadura, calendario laboral 2027 BOE, festivos que caen en fin de semana 2027 | Informacional estacional (de septiembre a noviembre) | `/blog/calendario-laboral-2027-festivos-horas-extra` | hoy | Alta |
| control horario hostelería | registro de jornada camareros, fichar turnos partidos, horas extra camareros, app fichaje bares | Comercial y legal | `/blog/control-horario-hosteleria-turnos-partidos` | hoy | Alta |
| registro horario digital obligatorio 2026 | real decreto registro horario, cuándo entra en vigor el fichaje digital, fichaje digital obligatorio BOE | Legal | `/blog/registro-horario-digital` (página viva, con fecha de revisión) | existe | Alta |
| cómo se calculan las horas extra | límite de 80 horas extra al año, compensar horas extra con descanso, registro de horas extra día a día | Informacional | sección en `/blog/calendario-laboral-2027-festivos-horas-extra`; guía propia `/blog/horas-extra-como-se-calculan` | hoy (parcial) / pendiente | Media |
| precios apps control horario | software control horario precio por empleado, app de fichaje barata, control horario con vacaciones incluido | Comparativa | `/blog/mejores-programas-control-horario` | existe (revisar canibalización con `/blog/comparativa-mejores-software-control-horario-pymes-2026`) | Media-Alta |
| sanciones registro de jornada | multa por no fichar, multa registro horario, LISOS registro de jornada | Legal | `/blog/multas-registro-horario-2026-costo-incumplimiento` | existe | Media |
| es legal fichar con geolocalización | geolocalización empleados AEPD, art. 90 LOPDGDD, fichar con el móvil personal | Legal | `/control-horario#geolocalizacion` y `/blog/fichar-desde-el-movil-legal-2026`; post propio `/blog/fichar-con-geolocalizacion-legal` | existe (parcial) / pendiente | Media |
| permisos retribuidos 2026 | permiso por fallecimiento días, permiso por hospitalización, asuntos propios cuántos días, tipos de ausencias laborales | Informacional y legal | `/blog/permisos-retribuidos-2026-tabla` | pendiente | Media |
| cómo calcular las vacaciones de un trabajador | días de vacaciones por mes trabajado, 30 días naturales o 22 laborables, prorrateo de vacaciones, caducan las vacaciones | Informacional | `/blog/como-calcular-vacaciones-empleados` (o sección ampliada del post de vacaciones de hoy) | pendiente | Media |
| control horario teletrabajo | registro de jornada teletrabajo | Legal | `/blog/control-horario-teletrabajo-cumplir-ley-2026` | existe | Baja |
| software control horario + ciudad | control horario Badajoz, Mérida, Cáceres, Plasencia... | Local | `/local/software-control-horario-<ciudad>` | existe | Baja (mantener) |
| plantilla excel control vacaciones empleados | plantilla vacaciones 2027 excel gratis, cuadrante de vacaciones | Informacional (sustitución) | `/blog/plantilla-excel-vacaciones-2027` | pendiente | Baja |
| turnos de mañana y tarde en almacén | control horario almacén, fichaje con llavero en nave | Comercial de nicho | `/blog/turnos-almacen-calendarios-fichaje` | pendiente | Baja |

### 3.2 Almacén y logística

Vocabulario real de la pyme: "programa de gestión de almacén", "SGA", "control de stock", "programa de inventario", con "para pymes", "gratis", "barato", "sencillo", "en la nube". "WMS" se usa mucho menos.

| Keyword primaria | Secundarias | Intención | URL objetivo | Estado | Prioridad |
|---|---|---|---|---|---|
| software de gestión de almacén | programa de gestión de almacén, SGA, SGA para pymes, software almacén pymes, SGA en la nube, sistema de gestión de almacenes | Comercial | `/software-gestion-almacen` | existe | Alta |
| software control de stock | programa de control de stock, programa de inventario, software de inventario para pymes, control de stock con código de barras, app control de stock, programa de almacén sencillo | Comercial (embudo alto) | `/software-control-stock` | hoy | Alta |
| diferencia entre ERP y SGA | SGA vs ERP, SGA o ERP para pyme, ERP con módulo de almacén, ERP con SGA integrado, necesito un SGA | Decisión | `/blog/sga-o-erp-con-almacen-que-necesita-una-pyme` | hoy (vigilar canibalización con `/blog/wms-sga-erp-diferencias`) | Alta |
| software para distribuidores de bebidas | programa de gestión distribución de bebidas, ERP bebidas, venta en cajas y unidades, formatos caja y palé | Transaccional | `/blog/software-distribuidor-bebidas-cajas-palets-formatos` y, después, landing `/software-distribuidores-bebidas` | hoy (post) / pendiente (landing) | Alta |
| software almacén frigorífico | gestión almacén frigorífico, software frigorífico industrial, alquiler cámara frigorífica software, tarifa palet día | Comercial | `/software-almacen-frigorifico` (+ `/blog/software-almacen-frigorifico-congelados`, `/blog/gestion-palets-almacen-frigorifico-fefo-sscc`) | existe (ampliar) | Alta (SERP sin SaaS español) |
| software trazabilidad lotes | software trazabilidad alimentaria, control de lotes y caducidades, FEFO, alertas de caducidad, informe de recall, Reglamento 178/2002 | Comercial y cumplimiento | `/software-trazabilidad-lotes` (+ `/blog/trazabilidad-alimentaria-lotes-recall`) | pendiente (landing) / existe (post) | Alta |
| software de picking | preparación de pedidos software, picking por oleadas, app picking móvil, picking con PDA, errores de picking | Comercial | `/software-preparacion-pedidos-picking` (+ `/blog/preparacion-de-pedidos-picking-almacen`) | existe (ampliar) | Media |
| software almacén de terceros | software 3PL pymes, software operador logístico pequeño, depósito de mercancías, facturación por palet y día | Comercial | `/software-alquiler-huecos-palet` (+ `/blog/alquiler-huecos-palet-tarifas`) | existe (ampliar) | Media |
| etiqueta SSCC | código SSCC qué es, generar SSCC, etiqueta GS1-128, EAN-128 palet, etiqueta logística | Informacional y comercial | `/software-gestion-palets` (+ `/blog/etiqueta-sscc-gs1-palets`) | existe (ampliar GS1-128) | Media |
| cuánto cuesta un SGA | SGA precio, programa de almacén gratis, programa de almacén barato | Comercial | `/blog/cuanto-cuesta-sga-wms-pyme-2026` y bloque "gratis o barato" en la pilar | existe (ampliar pilar) | Media |
| mejores software de gestión de almacén 2026 | comparativa SGA, mejor SGA para pymes | Comparativa | `/blog/mejores-software-gestion-almacen-pymes-2026` | pendiente | Media |
| software para cárnicas | software sala de despiece, trazabilidad cárnica, despiece y merma software | Transaccional | `/software-carnicas-sala-despiece` (+ `/blog/despiece-merma-trazabilidad-carnica`) | pendiente (landing) / existe (post) | Media |
| software para almacén de materiales de construcción | programa para ferreterías, ERP ferretería, software suministros industriales, unidades de medida múltiples | Transaccional | `/software-materiales-construccion-ferreteria` | pendiente | Media |
| rotura de stock | cómo calcular el stock mínimo, stock de seguridad pyme | Informacional | `/blog/control-de-stock-sin-roturas` (enlazar a `/software-control-stock`) | existe | Media |
| almacén y TPV para tienda | programa para tienda de recambios, programa parafarmacia, software herbolario | Comercial | `/software-almacen-tienda` (añadir secciones de recambios y parafarmacia) | existe (ampliar) | Baja-Media |
| cómo organizar un almacén pequeño | organizar almacén pyme | Informacional | `/blog/como-organizar-almacen-pyme` | existe | Baja |
| software de producción y fabricación | órdenes de trabajo, coste real | Comercial | `/software-produccion-fabricacion` | existe | Sin investigar en estas notas |

### 3.3 Hostelería

El eje de intención que más se repite es el precio ("cuánto cuesta", "más barato", "sin cuotas o por meses"), luego la elección ("mejor TPV 2026") y después el cumplimiento (Verifactu, registro horario).

| Keyword primaria | Secundarias | Intención | URL objetivo | Estado | Prioridad |
|---|---|---|---|---|---|
| software para bares y restaurantes | TPV hostelería, TPV para bar, TPV restaurante, software TPV hostelería, programa para bares | Comercial | `/software-bares-restaurantes` | existe (poner la definición en el primer párrafo) | Alta |
| cuánto cuesta un TPV para restaurante | TPV bar precio, TPV sin cuotas o suscripción, comisiones TPV, coste a 3 años | Comercial e informacional | `/blog/cuanto-cuesta-tpv-bar-restaurante-2026` | hoy | Alta |
| control horario hostelería | registro de jornada camareros, turnos partidos fichaje, software TPV y fichaje | Cumplimiento e integración | `/blog/control-horario-hosteleria-turnos-partidos` | hoy | Alta |
| verifactu hostelería | TPV Verifactu, Verifactu bar, Verifactu 2027 autónomos, Verifactu tickets | Cumplimiento (fecha fija) | `/blog/verifactu-bares-restaurantes-2027` (+ `/software-verifactu`, `/blog/verifactu-pymes-guia-2026`) | pendiente (post) / existe (landing y guía) | Alta |
| comparativa software TPV hostelería 2026 | mejor TPV hostelería 2026, Glop vs Last.app vs Revo, TPV sin comisiones | Comparativa | `/blog/comparativa-tpv-hosteleria-2026` | pendiente | Alta |
| mejor TPV para bar pequeño | cómo elegir TPV, TPV bar pequeño, mejor TPV restaurante 2026 | Comercial | `/blog/tpv-bares-restaurantes-como-elegir-2026` | existe | Media |
| pantalla de cocina restaurante | KDS restaurante, monitor de cocina TPV, pantalla o impresora de comandas | Comercial | `/blog/pantalla-cocina-kds-bares-comandas-perdidas` | existe | Media |
| carta digital QR restaurante | carta QR, carta digital para bares, carta digital con alérgenos, pedir desde la mesa | Comercial e informacional | `/blog/carta-digital-qr-restaurante-guia` (+ `/blog/pedidos-pago-desde-la-mesa-qr-restaurante`) | existe | Media |
| gestión de mesas restaurante | mapa de sala TPV, plano de mesas, dividir la cuenta, comandero | Comercial | `/blog/gestion-mesas-restaurante-mapa-sala` | existe | Media |
| cierre de caja restaurante | arqueo de caja bar, descuadre de caja, informe de cierre | Informacional y operativa | `/blog/cierre-de-caja-bar-arqueo` | pendiente | Media |
| ley desperdicio alimentario restaurantes | ley del tupper, envase para sobras gratis, control de mermas bar | Cumplimiento | `/blog/ley-desperdicio-alimentario-bares-2026` | pendiente | Media |
| ERP hostelería | software gestión restaurante completo, programa de gestión hostelería, TPV con contabilidad integrada | Informacional | `/blog/erp-hosteleria-tpv-stock-facturacion-fichaje` | pendiente | Media |
| enviar factura por WhatsApp restaurante | factura simplificada a factura completa | Operativa | `/blog/enviar-facturas-por-whatsapp-automaticamente` | existe | Baja |
| TPV cafetería | TPV panadería cafetería, TPV mostrador rápido | Comercial | `/tpv-cafeteria` | pendiente | Baja-Media |
| TPV pizzería | TPV pedidos para llevar, extras e ingredientes | Comercial | `/tpv-pizzeria` | pendiente | Baja |
| TPV food truck | TPV chiringuito, TPV sin internet, TPV de temporada | Comercial | en espera: confirmar antes si el TPV funciona sin conexión | en espera | Baja |
| escandallo restaurante | food cost, escandallo de cócteles | Informacional | no atacar: Drenpos hoy no hace escandallos por receta | descartado | No |

### 3.4 Transversal: ERP, Verifactu y conector MCP

Las notas no investigaron este clúster por separado: las keywords salen de la nota de hostelería (Verifactu), de la de almacén (MCP, como hipótesis sin volumen), de la de estado GEO (búsquedas de marca) y de lo que ya hay en el sitio.

| Keyword primaria | Secundarias | Intención | URL objetivo | Estado | Prioridad |
|---|---|---|---|---|---|
| software de gestión para pymes | ERP para pymes, ERP modular, ERP en la nube pymes | Comercial | `/` (home), `/modulos`, `/pricing` | existe | Alta |
| Drenpos (marca) | Drenpos opiniones, Drenpos precio, Drenpos ERP, qué es Drenpos | Navegacional | `/about`, `/pricing` y fichas en comparadores con reseñas | existe (la marca tiene ruido: "Drenpos opiniones" devuelve otras marcas) | Alta |
| software Verifactu | Verifactu 2027, Verifactu autónomos julio 2027, programa de facturación Verifactu, ley antifraude | Cumplimiento (fecha fija) | `/software-verifactu`, `/blog/verifactu-pymes-guia-2026` | existe | Alta |
| ERP con IA | conectar ERP con ChatGPT, consultar ventas desde ChatGPT, consultar stock desde Claude, MCP ERP | Comercial de nicho | `/conector-mcp-ia`; post `/blog/consultar-ventas-stock-chatgpt-claude-mcp` | existe (landing) / pendiente (post) | Media (hipótesis sin dato de demanda) |
| ERP para pymes vs Excel | cuándo dejar Excel, pasar de Excel a un ERP | Informacional | `/blog/erp-para-pymes-vs-excel` | existe | Baja |
| facturación ERP + ciudad | sistema de facturación Badajoz, Mérida, Cáceres... | Local | `/local/sistema-facturacion-erp-<ciudad>` | existe | Baja |
| ayudas digitalización Extremadura | ayuda innovación abierta Extremadura 2026 | Informacional | `/blog/ayuda-innovacion-abierta-extremadura-2026` | existe | Baja |

---

## 4. Preguntas que la gente hace a los asistentes

Salen de los H2, FAQ y títulos en forma de pregunta de las páginas que posicionan hoy en España. No es el bloque "Otras preguntas de los usuarios" literal de Google (la herramienta no lo devuelve). Úsalas como H2 con cápsula de 50 a 80 palabras debajo o como entradas de FAQ.

### 4.1 Control horario ampliado

**Vacaciones**
- ¿Cuántos días de vacaciones me corresponden al año?
- ¿Las vacaciones son 30 días naturales o 22 laborables?
- ¿Cómo se calculan las vacaciones si entré a mitad de año?
- ¿Cuántos días de vacaciones genero por mes trabajado?
- ¿Caducan las vacaciones que no he disfrutado?
- ¿Se pueden pasar días de vacaciones al año siguiente?
- ¿Puede la empresa obligarme a coger las vacaciones cuando ella quiera?
- ¿Puede la empresa negarme las vacaciones?
- ¿Con cuánta antelación tengo que saber mis vacaciones?
- ¿Se pueden cobrar las vacaciones en vez de disfrutarlas?
- ¿Qué pasa con las vacaciones si estoy de baja?
- ¿Existe algún programa de vacaciones gratis para empleados?
- ¿Los empleados pueden pedir las vacaciones desde el móvil?
- ¿Cómo evito que se solapen las vacaciones de dos personas del mismo equipo?

**Permisos y ausencias**
- ¿Cuántos días de permiso hay por fallecimiento de un familiar?
- ¿Cuántos días dan por hospitalización de un familiar?
- ¿Cuántos días de permiso hay por boda o por mudanza?
- ¿Qué son los días de asuntos propios y cuántos son?
- ¿Qué tipos de ausencias laborales hay?

**Retrasos y entrada y salida**
- ¿Cuántos minutos se puede llegar tarde al trabajo?
- ¿Me pueden sancionar por llegar tarde?
- ¿La empresa puede descontarme dinero por llegar tarde?
- ¿Pueden despedirme por retrasos reiterados?
- ¿Cómo se documenta un retraso?

**Horas extra**
- ¿Cuántas horas extra puedo hacer al año?
- ¿Cómo se calculan y cuánto se pagan las horas extra?
- ¿Se pueden compensar las horas extra con descanso?
- ¿Hay que registrar las horas extra?

**Registro horario y legal**
- ¿Es obligatorio ya el registro horario digital?
- ¿Cuándo entra en vigor el real decreto de registro horario?
- ¿Qué multa hay por no llevar el registro de jornada?
- ¿Sigue valiendo fichar en papel o en Excel?
- ¿Es legal fichar con geolocalización?
- ¿Me pueden obligar a fichar con mi móvil personal?

**Calendario laboral**
- ¿Cuáles son los festivos de 2027?
- ¿Qué festivos de 2027 caen en fin de semana y se pierden?
- ¿Cuándo publica el BOE el calendario laboral de 2027?
- ¿Cuáles son los festivos de 2027 en Extremadura?

### 4.2 Almacén y logística

- ¿Qué es un SGA y para qué sirve?
- ¿Qué diferencia hay entre un SGA y un WMS?
- ¿Necesito un SGA o me vale con el módulo de almacén del ERP?
- ¿Cuánto cuesta un programa de gestión de almacén para una pyme?
- ¿Hay algún programa de almacén gratis que sirva de verdad?
- ¿Cuál es el mejor software de gestión de almacén para pymes en 2026?
- ¿Cómo elijo un SGA para mi empresa?
- ¿Cómo funciona la trazabilidad por lotes? ¿Es obligatoria?
- ¿Qué me pide Sanidad si hay que retirar un lote?
- ¿Qué es el SSCC y cómo se genera la etiqueta de un palet?
- ¿Qué es el picking por oleadas?
- ¿Cuánto cuesta un error de picking?
- ¿FIFO, LIFO o FEFO: cuál uso en mi almacén?
- ¿Cómo calculo el stock mínimo para no quedarme sin género?
- ¿Cuánto cobrar por guardar un palet al mes?
- ¿Puedo hacer inventario sin cerrar el almacén?
- ¿Puedo usar una pistola lectora o una PDA con el programa de almacén?
- ¿Qué programa usa un distribuidor de bebidas para vender por cajas y palés?
- ¿Puedo consultar el stock desde ChatGPT o Claude? (hipótesis, sin dato de demanda)

### 4.3 Hostelería

- ¿Qué TPV me compro para un bar pequeño?
- ¿Cuánto cuesta un TPV para un bar o un restaurante al mes?
- ¿Es mejor un TPV sin cuotas o uno por suscripción?
- ¿Qué TPV usan los restaurantes en España?
- ¿Es obligatorio que el TPV de mi bar cumpla Verifactu?
- ¿Cuándo entra Verifactu para autónomos?
- ¿Mi TPV actual vale para Verifactu?
- ¿Qué pasa si mi TPV no cumple Verifactu?
- ¿Cómo registro la jornada de un camarero con turno partido?
- ¿Es obligatorio el fichaje digital en hostelería en 2026?
- ¿Qué multa hay por no fichar en un bar?
- ¿Hay algún software que junte TPV y fichaje?
- ¿Qué es un KDS o pantalla de cocina?
- ¿Pantalla de cocina o impresora de comandas?
- ¿Cómo evito que se pierdan comandas en cocina?
- ¿Es obligatorio poner los alérgenos en la carta QR?
- ¿Cómo sé cuántas veces escanean mi carta?
- ¿Qué TPV permite dividir la cuenta por comensal?
- ¿Cómo hago el cierre de caja de un bar?
- ¿Cómo controlo las mermas de un bar?
- ¿Qué obliga la ley del tupper a los restaurantes?
- ¿Puedo mandar la factura al cliente por WhatsApp?

### 4.4 Transversal

- ¿Qué ERP le sirve a una pyme de menos de 20 personas?
- ¿Cuándo compensa dejar Excel y pasar a un ERP?
- ¿Cuándo es obligatorio Verifactu para sociedades y para autónomos?
- ¿Qué es un conector MCP y para qué sirve en un ERP?
- ¿Puedo preguntar a ChatGPT por las ventas de mi empresa sin darle acceso a todo?
- ¿Qué es Drenpos y cuánto cuesta?

---

## 5. Datos citables con fuente

### 5.1 Datos verificados

Reúne lo verificado en las cuatro notas. "Aviso" indica cuándo la fuente es secundaria, antigua o internacional: se puede usar, pero con esa cautela escrita en el texto.

**Control horario, vacaciones y permisos**

| Dato | Cifra | Fuente | URL | Dónde usarlo |
|---|---|---|---|---|
| Obligación de registro diario de jornada (art. 34.9 ET) | vigente desde el 12/05/2019 | BOE, RD-ley 8/2019 | [BOE-A-2019-3481](https://www.boe.es/buscar/act.php?id=BOE-A-2019-3481) | `/control-horario`, `/blog/registro-horario-digital`, post de hostelería |
| Sanción vigente por no llevar el registro | infracción grave de 751 a 7.500 € por empresa o centro, no por trabajador | Mi Fichaje Legal; Registrahora (LISOS, redacción del RD-ley 8/2019) | [Mi Fichaje Legal](https://mifichajelegal.com/blog/real-decreto-registro-horario-digital-mayo-2026-estado-tramitacion-pymes/), [Registrahora](https://www.registrahora.es/noticias/registro-horario-digital-aplazado-septiembre-2026) | `/control-horario`, multas, hostelería |
| Dictamen del Consejo de Estado sobre el real decreto | 23/03/2026, "no procede aprobar el real decreto proyectado" | Mi Fichaje Legal | [Mi Fichaje Legal](https://mifichajelegal.com/blog/real-decreto-registro-horario-digital-mayo-2026-estado-tramitacion-pymes/) | `/blog/registro-horario-digital` |
| Aplazamiento a septiembre | 24/07/2026 | Infobae/EFE; El Debate | [Infobae](https://www.infobae.com/espana/agencias/2026/07/24/el-gobierno-acuerda-dejar-el-registro-horario-para-septiembre-para-resolver-discrepancias/), [El Debate](https://www.eldebate.com/economia/20260724/yolanda-diaz-suma-otro-reves-aparca-registro-horario-hasta-septiembre_443170.html) | `/blog/registro-horario-digital` |
| Estado a mediados de septiembre | 14/09/2026: "a las puertas de ser aprobado", sin fecha | El Debate | [El Debate 14/09/2026](https://www.eldebate.com/economia/20260914/yolanda-diaz-ultima-registro-horario-esquivo-congreso-puede-costar-900-millones-ano-pymes_458233.html) | `/blog/registro-horario-digital` |
| Coste estimado por el Consejo de Estado | unos 867 M€ al año para las pymes (unos 55,40 € por trabajador por 15,6 M de trabajadores) | El Debate | [El Debate 14/09/2026](https://www.eldebate.com/economia/20260914/yolanda-diaz-ultima-registro-horario-esquivo-congreso-puede-costar-900-millones-ano-pymes_458233.html) | `/blog/registro-horario-digital` |
| Entrada en vigor prevista del real decreto | a los 20 días de su publicación en el BOE | Proyecto del Ministerio de Trabajo | [Proyecto RD (PDF)](https://expinterweb.mites.gob.es/participa/listado/download/6cb63e79-48a8-4e99-9784-3a0b26ae6106) | `/blog/registro-horario-digital`, post "publicado el real decreto" |
| Contenido mínimo del proyecto | hora y minuto de inicio y fin, pausas, presencial o remoto, horas extra y si se compensan o pagan, totales diarios y mensuales, traza de cambios, acceso remoto de la Inspección | Proyecto del Ministerio; análisis de Cuatrecasas | [Proyecto RD (PDF)](https://expinterweb.mites.gob.es/participa/listado/download/6cb63e79-48a8-4e99-9784-3a0b26ae6106), [Cuatrecasas](https://www.cuatrecasas.com/es/spain/laboral/art/registro-jornada-laboral-espana-rd) | `/control-horario` (qué pasará), registro horario |
| Conservación del registro | 4 años | Mi Fichaje Legal; controlhorario.com | [controlhorario.com](https://controlhorario.com/ley-registro-horario/) | `/control-horario` |
| Jornada máxima (art. 34.1 ET) | 40 horas semanales de promedio en cómputo anual | conceptosjuridicos.com (verificar literal en BOE antes de entrecomillar) | [Art. 34 ET](https://www.conceptosjuridicos.com/estatuto-de-los-trabajadores-articulo-34/) | calendario laboral, horas extra |
| Horas extra (art. 35 ET) | máximo 80 al año; se registran día a día y se totalizan en el periodo de pago | conceptosjuridicos.com | [Art. 35 ET](https://www.conceptosjuridicos.com/estatuto-de-los-trabajadores-articulo-35/) | horas extra, calendario, hostelería |
| Fiestas laborales (art. 37.2 ET) | no más de 14 al año, 2 de ellas locales | conceptosjuridicos.com | [Art. 37 ET](https://www.conceptosjuridicos.com/estatuto-de-los-trabajadores-articulo-37/) | calendario laboral 2027 |
| Permisos retribuidos (art. 37.3 ET) | 15 días naturales por matrimonio; 5 días por accidente, enfermedad grave u hospitalización de familiar; 2 días por fallecimiento (4 con desplazamiento); 1 día por traslado; hasta 4 días por imposibilidad de acceso por fenómenos meteorológicos o decisión de la autoridad | conceptosjuridicos.com | [Art. 37 ET](https://www.conceptosjuridicos.com/estatuto-de-los-trabajadores-articulo-37/) | permisos retribuidos, vacaciones |
| Fuerza mayor familiar y formación | 4 días al año por fuerza mayor familiar; 20 horas de formación | Protime (30/03/2026) | [Protime](https://www.protime.eu/es-es/noticias/permisos-retribuidos) | permisos retribuidos |
| Ampliación del permiso por fallecimiento | acordada el 15/12/2025 (10 días laborables y permiso de cuidados paliativos de 15 días); no en vigor a 19/08/2026 | Woffu | [Woffu](https://woffu.com/es/blog/normativa/es-blog-permiso-fallecimiento/) | permisos retribuidos (siempre con la fecha) |
| Vacaciones (art. 38 ET) | mínimo 30 días naturales, no sustituibles por dinero; fechas conocidas al menos 2 meses antes; tras una baja se pueden disfrutar hasta 18 meses después del final del año | conceptosjuridicos.com; BOE ET | [Art. 38 ET](https://www.conceptosjuridicos.com/estatuto-de-los-trabajadores-articulo-38/), [BOE ET](https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430) | vacaciones, cálculo de vacaciones |
| Prorrateo de vacaciones | 30/12 = 2,5 días por mes (22/12 ≈ 1,8 laborables) | Kenjo | [Kenjo](https://www.kenjo.io/es/guia-calcular-vacaciones-en-empresas) | cálculo de vacaciones (los 22 laborables son equivalencia de uso, no ley) |
| Calendario laboral 2026 | Resolución de 17/10/2025, BOE de 28/10/2025 | BOE | [BOE-A-2025-21667](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2025-21667) | calendario laboral (precedente de fechas) |
| Calendario nacional 2027 | no publicado en el BOE a 20/08/2026 | puedemiempresa | [puedemiempresa](https://puedemiempresa.com/blog/calendario-laboral-2027-festivos-puentes/) | calendario laboral 2027 |
| Calendario 2027 de Extremadura | publicado en el DOE el 08/06/2026; el 15 de agosto (domingo) se traslada al lunes 11 de octubre; 1 de mayo y 25 de diciembre caen en sábado | Región Digital; Canal Extremadura; Junta de Extremadura | [Región Digital](https://www.regiondigital.com/noticias/economia/431038-publicado-en-el-doe-el-calendario-de-festivos-para-2027-en-extremadura.html), [Portal del Empleado](https://portalempleado.juntaex.es/w/calendario-de-fiestas-laborales-de-extremadura-para-el-a%C3%B1o-2027) | calendario 2027, páginas locales |
| Geolocalización en el trabajo (art. 90 LOPDGDD) | permitida para las funciones de control del art. 20.3 ET con información previa expresa, clara e inequívoca a la plantilla | paráfrasis coincidente en Mi Fichaje Legal y Prodat (no entrecomillar: el literal no se sacó del BOE) | [Mi Fichaje Legal](https://mifichajelegal.com/blog/geolocalizacion-fichaje-gps-rgpd-trabajadores-2026/), [BOE LO 3/2018](https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673) | `/control-horario#geolocalizacion`, post de geolocalización |
| Sanción de la AEPD por apps en móviles personales | 200.000 €, resolución de 18/05/2026 (EXP202411411), por obligar a instalar apps con localización continua | ECIJA; Prodat | [ECIJA](https://www.ecija.com/actualidad-insights/sancion-de-200000-de-la-aepd-por-el-uso-de-apps-corporativas-en-moviles-personales-de-los-empleados/) | geolocalización: por qué solo al fichar |
| GPS como prueba | STS 766/2020 (15/09/2020) lo admite si se informó antes | Mi Fichaje Legal | [Mi Fichaje Legal](https://mifichajelegal.com/blog/geolocalizacion-fichaje-gps-rgpd-trabajadores-2026/) | post de geolocalización |
| Coste del absentismo | 721 € al año por trabajador en ausencias sin justificar | El Español (11/06/2026) | [El Español](https://www.elespanol.com/invertia/economia/empleo/20260611/cifras-absentismo-empresa-deja-euros-ano-trabajador-ausencias-sin-justificar/1003744281355_0.html) | control de entrada y salida, vacaciones |

**Almacén y logística**

| Dato | Cifra | Fuente | URL | Dónde usarlo |
|---|---|---|---|---|
| Peso del picking en el coste del almacén | hasta el 55 % del gasto operativo | de Koster, Le-Duc y Roodbergen, EJOR (2007) | [ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S0377221706006473), [versión abierta](https://ideas.repec.org/p/ems/eureri/7322.html) | picking (ya citado), pilar, post de errores de picking |
| Coste de los errores de preparación | 291.000 € de media por centro de distribución; 16,82 € por error; 52 % con cumplimiento de pedidos inferior al 97 %; 23 % aún en papel | Estudio Intermec 2013 (250 directores de centros de distribución en EE. UU. y Europa) vía Cadena de Suministro. Aviso: 2013 y centros grandes, no pyme | [Cadena de Suministro](https://www.cadenadesuministro.es/noticias/los-errores-en-los-procesos-de-picking-originan-perdidas-de-hasta-290-000-euros-por-almacen_1053375_102.html) | picking, post de errores de picking |
| Roturas de stock | 4 % de ventas perdidas de media; 72 % de las roturas por fallos internos de planificación | Corsten y Gruen (2004) vía Slimstock. Aviso: fuente secundaria | [Slimstock](https://www.slimstock.com/blog/the-hidden-cost-of-stockouts-why-retailers-cant-afford-empty-shelves/) | `/software-control-stock`, rotura de stock |
| Roturas en gran consumo | 7,4 % de ventas perdidas en 2021 | NielsenIQ (2022) vía Slimstock. Aviso: fuente secundaria | [Slimstock](https://www.slimstock.com/blog/the-hidden-cost-of-stockouts-why-retailers-cant-afford-empty-shelves/) | rotura de stock |
| Pymes en España | 2.969.204 pymes; 1.143.130 microempresas (1 a 9); 181.605 pequeñas (10 a 49) | Cifras PYME, DGIPYME, mayo de 2026 | [Cifras PYME (PDF)](https://ipyme.org/Publicaciones/Cifras%20PYME/CifrasPyme_mayo_2026.pdf) | home, `/about`, pilar |
| Empresas de construcción | 335.187 (11,3 % del total) | Cifras PYME, mayo de 2026 | [Cifras PYME (PDF)](https://ipyme.org/Publicaciones/Cifras%20PYME/CifrasPyme_mayo_2026.pdf) | landing de materiales de construcción |
| Digitalización de empresas de 10 o más empleados | 61,4 % con nivel básico (objetivo UE 2030: más del 90 %); 26,6 % vendió por comercio electrónico en 2024 | ONTSI e INE vía Información Logística. Aviso: secundaria | [Información Logística](https://informacionlogistica.com/las-pymes-espanolas-mueven-el-65-del-pib-pero-acumulan-un-retraso-logistico-que-frena-su-capacidad-de-crecer/) | pilar, posts de almacén |
| Logística del frío en España | 6.000 M€ en 2025 (+4,3 %); almacenaje y operaciones 1.248 M€ (+6,4 %); 27,3 % del total logístico; las 10 primeras, 55,8 % de cuota | DBK vía Empresa Exterior | [Empresa Exterior](https://empresaexterior.com/la-logistica-del-frio-en-espana-supera-los-6-000-millones-de-euros-impulsada-por-el-retail-y-el-sector-farmaceutico/), [Cadena de Suministro](https://www.cadenadesuministro.es/logistica/sector-logistica-frio-genera-volumen-negocio-anual-6000-millones_1516985_102.html) | `/software-almacen-frigorifico` |
| Operadores logísticos | más de 7.100 M€ en 2025 (solo la cifra de cabecera) | DBK vía Transporte 3 | [Transporte 3](https://transporte3.com/noticia/23720-el-negocio-logistico-en-espana-supera-los-7-100-millones-pese-a-la-desaceleracion-del-sector/) | `/software-alquiler-huecos-palet` |
| Trazabilidad alimentaria obligatoria | Reglamento (CE) 178/2002: art. 18 (identificar proveedor y cliente, información a las autoridades) y art. 19 (retirada inmediata e información) | BOE (DOUE) | [DOUE-L-2002-80201](https://www.boe.es/buscar/doc.php?id=DOUE-L-2002-80201) | landing de trazabilidad, pilar, frigorífico |
| SSCC | 18 dígitos (extensión + prefijo GS1 + serie + control), identificador (00) en GS1-128; no se reasigna hasta un año después de la expedición | GS1 Spain | [GS1 Spain SSCC](https://www.gs1es.org/estandares-gs1-identificar/sscc/) | `/software-gestion-palets`, post SSCC |
| Tamaño de GS1 Spain | más de 35.000 compañías asociadas | GS1 Spain | [GS1 Spain](https://www.gs1es.org/hazte-socio/) | palets (por qué la etiqueta es estándar) |
| Precio de mercado del almacenaje | desde 2,50 € por palet al mes | Future Logistics (operador) | [Future Logistics](https://www.future-logistics.es/almacenaje-logistico-desde-250e-palet/) | `/software-alquiler-huecos-palet`, post 3PL |
| Coste logístico general | entre el 3 y el 4 % de los costes de explotación, sin inventario | Mecalux (2002). Aviso: antiguo y genérico, mejor no usarlo salvo como contexto | [Mecalux](https://www.mecalux.es/articulos-de-logistica/coste-servicio-centro-logistico) | solo si hace falta contexto |

**Hostelería**

| Dato | Cifra | Fuente | URL | Dónde usarlo |
|---|---|---|---|---|
| Tamaño del sector (Anuario 2024, datos 2023) | más de 300.000 establecimientos; bares, 54 %; más de 81.000 restaurantes; facturación de 157.379 M€; 6,7 % del PIB; 1,76 M ocupados | Hostelería de España vía Hostelería Madrid | [Hostelería Madrid](https://www.hosteleriamadrid.com/blog/anuario-hosteleria-espana-2024/), [Hostelería de España](https://hosteleriadeespana.es/publicaciones-hosteleria.html) | `/software-bares-restaurantes`, ERP hostelería |
| Empleo y rentabilidad (Anuario 2025) | 1,89 M empleados en 2025; rentabilidad de la restauración −0,9 %; facturación hasta septiembre +4,7 % | Hosteltur | [Hosteltur empleo](https://www.hosteltur.com/173449_la-hosteleria-alcanza-los-189-millones-de-empleados-en-2025-pero-ve-amenazada-su-rentabilidad.html), [Hosteltur rentabilidad](https://www.hosteltur.com/173356_la-rentabilidad-de-la-restauracion-cae-un-09-en-un-entorno-de-mas-costes-y-regulaciones.html) | cierre de caja, mermas, precio TPV |
| INE, Estadística Estructural de Empresas 2024 | hostelería: 117.440 M€ de cifra de negocios (+12,4 %); 1.748.137 ocupados | INE | [INE EEESS 2024](https://www.ine.es/dyngs/Prensa/EEESS2024.htm) | landing de hostelería |
| Censo UVE 2025 | 280.403 establecimientos; 93 % independientes; bares y cafeterías −15 % entre 2016 y 2025 | UVE Data Market vía Profesional Horeca (privado; cifra distinta del Anuario por método) | [Profesional Horeca](https://www.profesionalhoreca.com/la-hosteleria-en-espana-en-2025-280-400-establecimientos-transformacion-y-consolidacion/) | landing de hostelería |
| Carta digital y pago QR | 58 % de comensales eligen la carta digital si está; 22,6 % de locales ofrecen pago por QR | Square (marzo de 2024) vía Hostelería Digital (muestra no indicada) | [Hostelería Digital](https://www.hosteleriadigital.es/2024/03/22/los-menus-digitales-se-han-extendido-por-la-mayoria-de-locales-de-restauracion-y-ya-son-la-opcion-favorita-de-los-comensales-espanoles-para-consultar-la-carta/) | carta digital QR |
| Digitalización de locales | 15,9 % con alto nivel digital; 13,8 % con carta digital; 33,6 % con ficha de Google o Tripadvisor sin reclamar | BCC y Delectatech (noviembre de 2022, más de 240.000 locales) | [Profesional Horeca](https://www.profesionalhoreca.com/radiografia-de-la-digitalizacion-de-la-hosteleria-en-espana-madrid-barcelona-baleares-y-malaga-van-en-cabeza/) | carta digital, ERP hostelería |
| Take away y delivery | 22 % de las ventas (13 % take away, 9 % delivery) | KPMG (abril de 2024) vía Restauración News | [Restauración News](https://restauracionnews.com/2024/04/auge-delivery-clone/) | TPV pizzería (con honestidad: sin agregadores) |
| Delivery a 2030 | 2.450 M€ previstos | Gastrómetro 2025 de Just Eat | [Hostelería Digital](https://www.hosteleriadigital.es/2025/11/27/segun-datos-del-gastrometro-de-just-eat-el-sector-delivery-preve-ingresar-2-450-millones-de-euros-en-2030-impulsado-por-la-conveniencia-y-la-diversificacion/) | solo contexto |
| Calendario de Verifactu | 1 de enero de 2027 (Impuesto sobre Sociedades) y 1 de julio de 2027 (resto, autónomos incluidos) | RD-ley 15/2025, BOE de 03/12/2025 | [Fiscal Impuestos](https://www.fiscal-impuestos.com/aplazamiento-entrada-vigor-Verifactu-2027), [Noticias Jurídicas](https://noticias.juridicas.com/actualidad/noticias/20735-nueva-prorroga:-verifactu-no-sera-obligatorio-hasta-2027-para-sociedades-y-otros-contribuyentes/), [AEAT](https://sede.agenciatributaria.gob.es/Sede/iva/sistemas-informaticos-facturacion-verifactu.html) | `/software-verifactu`, Verifactu hostelería, guía |
| Base normativa de Verifactu | RD 1007/2023 y Orden HAC/1177/2024; página de la AEAT actualizada el 21/07/2026 | AEAT | [AEAT Verifactu](https://sede.agenciatributaria.gob.es/Sede/iva/sistemas-informaticos-facturacion-verifactu.html) | Verifactu |
| Ley de desperdicio alimentario | Ley 1/2025; desde el 03/04/2026 envase gratis para las sobras e información en la carta; sanciones de hasta 60.000 € | BOE; El Español (11/04/2026) | [BOE-A-2025-6597](https://www.boe.es/buscar/act.php?id=BOE-A-2025-6597), [El Español](https://www.elespanol.com/castilla-y-leon/economia/20260411/vigor-consumo-sancionara-restaurantes-no-dejen-cobren-envase-llevarse-sobras-trt/1003744197465_0.html) | post de ley del desperdicio, mermas |
| Alérgenos en alimentos sin envasar | Real Decreto 126/2015 | BOE | [BOE-A-2015-2293](https://www.boe.es/buscar/act.php?id=BOE-A-2015-2293) | carta digital QR |

### 5.2 Lo que no se pudo verificar (no usar hasta comprobarlo)

- Volúmenes de búsqueda y dificultad de cualquier keyword.
- Tasa media de error del picking manual ("1 a 3 %"), "el 50 o 60 % del tiempo del preparador es desplazamiento", "el inventario es X % del activo de una pyme", coste medio de una retirada de producto en España.
- Plazo de conservación de los registros de trazabilidad alimentaria ("vida útil más 6 meses" o "5 años"): AESAN dio 404 y ELIKA estaba bloqueada.
- Cifras del Observatorio de la Logística (OTLE) y de AECOC: no se extrajeron.
- Literal del art. 90 LOPDGDD (solo paráfrasis secundaria) y literales de los arts. 34, 35, 37 y 38 ET contra el BOE (salen de conceptosjuridicos.com).
- Plazo de 4 meses para compensar horas extra con descanso (art. 35.1 ET): no verificado literalmente.
- Número del real decreto-ley del permiso por fenómenos meteorológicos (Protime dice RDL 8/2024, otras fuentes RDL 7/2024): cita solo "art. 37.3 g) ET".
- Multas "de 1.000 a 10.000 € por trabajador" del borrador: una fuente lo dice y otra (LawAndTrends) dice que la sanción seguiría siendo por empresa. Contradictorio; y en ningún caso está en vigor.
- "Hasta 225.018 € en casos graves" por registro horario: la fuente lo atribuye a infracciones graves, pero el marco que usas es grave de 751 a 7.500 €. Comprobar en la LISOS antes de escribir nada.
- okdiario sobre festivos 2027: dice que el 6 de diciembre de 2027 es domingo y es lunes. No reproducir.
- Food cost "sano" del 28 al 35 %: práctica profesional sin fuente académica.
- Número de bares en España (unos 162.000): es un cálculo propio sobre el 54 %, no un dato.
- "12 % más de costes laborales en bares por escasez de personal": titular no verificado en el cuerpo.
- Cifras de chefbusiness.co ("75 % de restaurantes con márgenes por debajo del 10 %", "mercado TPV de más de 400 M€ creciendo un 12 %"): sin fuente.
- Titular "las pymes mueven el 65 % del PIB y el 72 % del empleo privado": se atribuye a Cargoboard, no al INE.
- Afirmaciones de comparadores sin fuente ("90 % de precisión", "85 % de ahorro de tiempo" en Softwaredoit).
- Reglamento (UE) 1169/2011: la URL de EUR-Lex no se descargó en esta investigación (el post de carta digital ya lo cita; comprueba el enlace).
- Que ChatGPT search use el índice de Bing y que Claude use Brave: muy repetido, no confirmado en la documentación oficial actual.
- Que Cloudflare emita IndexNow por su cuenta (Crawler Hints).
- Existencia de una ficha de Google Business Profile de Drenpos y presencia del JSON-LD en el HTML de producción (el fetcher no ve `<script>`).
- Precios no oficiales: Lightspeed (99 a 199 € por terminal), Ágora (29 a 32 €, fuente interesada), CoverManager y TheFork (estimaciones de competidores), Toast en España.

---

## 6. Competencia

Precios comprobados el 23/09/2026. "Oficial" quiere decir la web del propio fabricante. Lo demás son comparadores o distribuidores y se cita siempre como "según X a fecha Y", porque a menudo se contradicen.

Precios de Drenpos para comparar (sin IVA): planes Esencial 19 €, Pro 29 € (con almacén) y Full 39 € (con TPV) al mes; fichaje 1 € por usuario al mes con vacaciones y permisos, control de entrada y salida y geolocalización incluidos; terminal de fichaje desde 140 €; usuario adicional 5 € al mes; conector MCP 6 € al mes por empresa.

### 6.1 Control horario ampliado

**Precios oficiales verificados**

| Competidor | Precio | URL | Fecha |
|---|---|---|---|
| Woffu | desde 1,50 € por usuario activo al mes (Lite); Pro y Enterprise a presupuesto. Reglas de coincidencia y varias políticas de vacaciones solo en Pro y Enterprise; turnos solo como módulo de Enterprise | [woffu.com/es/precios](https://www.woffu.com/es/precios/) | 23/09/2026 |
| Kenjo | sin importe visible hasta usar la calculadora; anual con 10 % de descuento; vacaciones, control horario y turnos en todos los planes | [kenjo.io/es/tarifas](https://www.kenjo.io/es/tarifas) | 23/09/2026 |
| Holded | ERP desde 14,50 € al mes; módulo de RRHH (control horario y vacaciones) 1,50 € por empleado al mes | [Holded (blog propio, act. 24/07/2026)](https://www.holded.com/es/blog/mejores-softwares-gestion-vacaciones) | 23/09/2026 |
| Personio | sin precio público (presupuesto) | [Personio](https://www.personio.com/product/absence-management/) | 23/09/2026 |
| Intratime | la página de planes existe pero no se pudo leer | [Intratime planes](https://www.intratime.es/planes/) | 23/09/2026 |

**Precios de terceros (orientativos; las webs oficiales dieron 404 o no publican)**

| Competidor | Precio según la fuente | Fuente |
|---|---|---|
| Factorial | 115,90 € al mes en tarifa plana hasta 19 empleados; o desde 5,50 € por usuario con 99 € de mínimo | [controlhorario.com (sep. 2026)](https://controlhorario.com/software/precio/), [IAT](https://iat.es/blog/precios-apps-control-horario/) |
| Sesame HR | 82,50 € de base más 5,50 € por usuario (controlhorario.com) frente a "desde 3,75 €" (IAT) | [controlhorario.com](https://controlhorario.com/software/precio/), [IAT](https://iat.es/blog/precios-apps-control-horario/) |
| Bizneo HR | 55 € de base más 6 € por empleado (controlhorario.com) frente a "desde 2,17 €" (IAT) y "4,50 €" (Cronomia) | [controlhorario.com](https://controlhorario.com/software/precio/), [IAT](https://iat.es/blog/precios-apps-control-horario/), [Cronomia](https://www.cronomia.com/software-control-horario/mejores) |
| Bixpe | básico gratis; Premium 2 € por usuario (mínimo de 20 a 30 €), gestor de vacaciones incluido | [controlhorario.com](https://controlhorario.com/software/precio/) |
| Kronjop | desde 2,40 € por empleado activo, sin mínimos | [IAT](https://iat.es/blog/precios-apps-control-horario/) |
| Tramitapp | desde 3 € por usuario | [IAT](https://iat.es/blog/precios-apps-control-horario/) |

**Ángulos que usan**
- Tríada de contenido: landing de producto, listicle "los N mejores software de vacaciones" y guía "cómo calcular las vacaciones". Holded publica 20, Softdoit 19, Kelio y Skello 10, Personio 7.
- Factorial: políticas por contrato o convenio, varios niveles de aprobación, solicitudes por días, medios días u horas, sincronía con Google Calendar y Outlook, informe de absentismo y FAQ de 9 preguntas.
- Sesame: H1 "Gestor de vacaciones", aprobación desde el móvil, cadenas de aprobación, justificante con foto, prueba gratis de 14 días.
- Woffu y Factorial captan tráfico informacional con normativa (permiso por fallecimiento, reforma del registro horario).
- Kronjop ya usa "compatibilidad con agentes de IA (MCP)" como gancho en ausencias.
- Las páginas de precios de control horario se actualizan cada mes con la fecha en el título.

**Qué no tienen**
- Ninguna landing española de "control de entrada y salida" con incidencias y tolerancias; lo más cercano son posts de Bixpe y PyV y las reglas de presencia de Woffu Pro.
- Nadie pone en un H2 la consolidación mes a mes, el reinicio en el aniversario de contratación, el arrastre con tope y caducidad o la contrapropuesta de fechas con motivo.
- Ninguno de los listados (los 20 de Holded, los 19 de Softdoit) es un ERP con almacén y TPV: "vacaciones dentro del mismo programa que tu almacén y tu facturación" está libre.
- Con 1 € por usuario Drenpos queda por debajo de Woffu Lite y del módulo de Holded, pero para salir en las comparativas de precio el precio tiene que estar visible en la web (ya lo está en el repo; comprueba producción).

### 6.2 Almacén y logística

**Precios oficiales verificados**

| Competidor | Precio | URL | Fecha |
|---|---|---|---|
| Verial (ERP sectorial) | 49,40 € al mes sin IVA | [Verial bebidas](https://programa-de-gestion.com/sector/software-de-gestion-comercial-para-bebidas-distribucion/) | 23/09/2026 |
| Holded | de 29 a 199 € al mes | [Holded blog](https://www.holded.com/es/blog/software-gestion-de-almacenes) | 23/09/2026 |
| Future Logistics (operador, referencia de tarifa) | almacenaje desde 2,50 € por palet al mes | [Future Logistics](https://www.future-logistics.es/almacenaje-logistico-desde-250e-palet/) | 23/09/2026 |

**Precios de terceros (orientativos)**

| Producto | Precio según la fuente | Fuente |
|---|---|---|
| Yunbit SGA cloud | desde 24 € por usuario al mes | [Softwaredoit](https://softwaredoit.es/software-gestion-almacen-guias/comparativa-sga.html) |
| Zoho Inventory | desde 39 $ al mes (Softwaredoit) o unos 29 € al mes (Cleverals) | [Softwaredoit](https://softwaredoit.es/software-gestion-almacen-guias/comparativa-sga.html), [Cleverals](https://www.cleverals.com/es/blog/sga/mejores-software-gestion-almacenes-inventario/) |
| Odoo | unos 11,90 € por usuario al mes (estándar) y 17,90 € (custom) | [Cleverals](https://www.cleverals.com/es/blog/sga/mejores-software-gestion-almacenes-inventario/) |
| iPacky | desde unos 19,99 $ al mes | [Cleverals](https://www.cleverals.com/es/blog/sga/mejores-software-gestion-almacenes-inventario/) |
| Catinfog / Ahora Freeware | de 39 a 69 € al mes / de 19 a 43 $ al mes | [Holded blog](https://www.holded.com/es/blog/software-gestion-de-almacenes) |
| myFulfillment | 249 € al mes | [Appvizer](https://www.appvizer.com/operations/warehouse-mgt) |
| SAP EWM, Mecalux Easy WMS, Generix, NetSuite | presupuesto a medida | [Softwaredoit](https://softwaredoit.es/software-gestion-almacen-guias/comparativa-sga.html) |

**Ángulos que usan**
- Listicles "Top N SGA 2026" con la misma estructura: qué es un SGA, tabla comparativa, fichas, ventajas, cómo elegir, FAQ (Softwaredoit, Cleverals, Holded, Pulpo WMS).
- Mecalux y Cleverals: "el ERP tiene un control básico; el SGA es la operativa del almacén", es decir, SGA como complemento del ERP. Juega contra los ERP.
- Datadec: "el SGA también es para pymes".
- Los verticales se venden por nombre de negocio, con una URL por sector: Verial, Daemon4, Gestión5, Galdón, Gextia, Distritok.
- Comparadores con listas "gratis para pymes y autónomos" (GetApp, Capterra, Holded, Casacochecurro, Appvizer).

**Qué no tienen**
- Ninguno de los artículos que posicionan cita fuentes para sus cifras.
- La consulta "software almacén frigorífico, depósito de terceros, tarifa por palet y día" no devuelve ningún software español: salen operadores y un software argentino.
- Nadie tiene página específica de "almacén con pistola lectora o PDA".
- En los directorios (Capterra, GetApp, Appvizer) no aparece ningún vendedor español pequeño en la primera página.
- Nadie ofrece un ERP con SGA real (SSCC, oleadas, 3PL, recall en PDF) al precio de un plan de 29 € al mes sin IVA.

### 6.3 Hostelería

**Precios oficiales verificados**

| Competidor | Precio | URL | Fecha |
|---|---|---|---|
| Last.app | Starter 50 €, Growth 95 €, Unlimited 175 € al mes más IVA por local; KDS 35 € más al mes por local; instalación 500 € más IVA; fichaje de empleados e integrador de delivery incluidos | [last.app/precios](https://www.last.app/precios) | 23/09/2026 |
| SumUp TPV | hardware 249 € (301,29 € con IVA); software Free 0 € o Plus 49 € al mes; comisión del 1,49 % por transacción | [SumUp TPV](https://www.sumup.com/es-es/sumup-tpv/) | 23/09/2026 |
| Square | 1,25 % + 0,05 € por pago presencial con tarjeta UE; Square for Restaurants 59 € más IVA al mes por punto de venta | [Square precios](https://squareup.com/es/es/pricing) | 23/09/2026 |
| Holded (gema TPV) | 25 € por tienda al mes; no menciona mesas ni restaurante | [Holded TPV](https://www.holded.com/es/gemas/tpv) | 23/09/2026 |

**Precios vía distribuidor o comparador (no oficiales)**

| Producto | Precio según la fuente | Fuente |
|---|---|---|
| Cegid Revo XEF | One 19 €, Basic 59 €, Plus 79 €, Pro 99 € al mes (la página oficial de precios dio 404) | [TIM](https://www.tim.es/tarifas-completas-revo-xef/) |
| Glop | pack Profesional desde 799 €; con comandero 1.399 € (licencia sin cuotas) | [VentaTPV](https://ventatpv.com/blog/cuanto-cuesta-un-tpv-completo-para-hosteleria-precios-y-que-incluyen-en-2026-n33) |
| Numier | licencia de 499 a 550 € sin cuotas; módulos aparte | [VentaTPV](https://ventatpv.com/blog/software-numier-guia-caracteristicas-tipos-y-precios-guia-2021-n12) |
| Foodeo / Foodtic / L'Addition | 34,90 € / de 39 a 69 € / 47 € al mes | [ingenieriademenu](https://ingenieriademenu.com/software-tpv-hosteleria/) |
| Sin precio público | Cuiner, Camarero10, Ágora, CoverManager, TheFork Manager, Lightspeed España | notas de hostelería |

**Ángulos que usan**
- Listicles "mejores TPV 2026" con tabla de precios (ingenieriademenu, VentaTPV, Rankia, Softwaredoit, chefbusiness).
- "Sin cuotas frente a suscripción": VentaTPV dice que la suscripción cuesta de 40 a 80 € al mes, de 1.440 a 2.880 € en tres años (argumento de vendedor de licencias).
- Glop: prueba social ("más de 20.000 negocios") y guía "cómo elegir el mejor TPV para hostelería en 2026".
- Last.app: páginas "X vs Y 2026" y "un precio para cada restaurante".
- Proveedores de fichaje (Qamarero, Kronjop, Pleko) posicionan "control horario hostelería 2026", pero no venden TPV.

**Qué no tienen**
- Nadie junta TPV, Verifactu, fichaje con terminal propio, stock y facturación en un solo precio. Los comparadores tratan Verifactu y fichaje como columnas sueltas.
- KDS como extra de pago (Last.app, +35 € al mes por local) o módulo aparte (Numier).
- Precio por terminal o por local que crece deprisa (Revo, Square, Last.app) y comisiones por transacción (SumUp, Square).
- Precios opacos (Cuiner, Camarero10, Ágora, CoverManager, TheFork).
- Plataformas cerradas a iOS (Revo, L'Addition).
- Comparativas "neutrales" que no señalan debilidades y usan datos sin fuente.

**Dónde pierde Drenpos (dilo en las páginas)**: integración con agregadores de delivery (Last.app la incluye), reservas de mesa, datáfono propio y escandallos por receta. Posiciónalo para el bar o restaurante de sala y barra, no para la cocina de delivery.

### 6.4 Transversal

Las notas no recogieron precios de ERP generalistas más allá de Holded (desde 14,50 € al mes). En el conector MCP no se detectó ningún competidor español en la SERP; lo único parecido es Kronjop usando "MCP" como reclamo en ausencias.

---

## 7. Backlog de contenido pendiente

Lo que recomiendan las notas y hoy no se hace, sin contar lo que se crea hoy. Orden por prioridad cualitativa (hueco competitivo, encaje con el producto y fecha límite). Las URL son propuestas.

### 7.1 Piezas de contenido

| # | Prioridad | Pieza | Formato | Keyword primaria | H1 sugerido | Condición o nota |
|---|---|---|---|---|---|---|
| 1 | Alta | Vacaciones y ausencias | Landing `/software-vacaciones-ausencias` | software de gestión de vacaciones y ausencias | Software de vacaciones y ausencias para pymes: se piden desde el móvil y el saldo se calcula solo | Precio: incluido en el fichaje (1 €/usuario/mes sin IVA). Diferenciales en H2: consolidación mes a mes, aniversario de contratación, arrastre con caducidad, contrapropuesta de fechas |
| 2 | Alta | Control de entrada y salida | Landing `/control-entrada-salida-empleados` | control de entrada y salida de empleados | Control de entrada y salida de empleados: retrasos, salidas antes de hora y exceso de horas con la tolerancia que tú decidas | Hueco real: nadie en España tiene esta landing. "Puntualidad" solo como secundaria. Decir que es ayuda de gestión y que el registro legal son los fichajes |
| 3 | Alta | Registro horario publicado | Post preparado en borrador, a publicar en menos de 24 h cuando salga el BOE | real decreto registro horario publicado | Publicado el real decreto de registro horario: qué cambia y qué plazo tienes | Dejarlo escrito ya con huecos para fecha y número de BOE. Actualizar a la vez `/blog/registro-horario-digital`, `/control-horario`, multas y llms.txt |
| 4 | Alta | Verifactu en hostelería | Post `/blog/verifactu-bares-restaurantes-2027` | verifactu hostelería | Verifactu en bares y restaurantes: qué cambia el 1 de enero y el 1 de julio de 2027 y cómo cumplir con tu TPV | Confirmar antes que el TPV emite Verifactu sobre facturas simplificadas (tickets) |
| 5 | Alta | Comparativa TPV hostelería | Post `/blog/comparativa-tpv-hosteleria-2026` | comparativa software TPV hostelería 2026 | Comparativa de TPV para hostelería en 2026: precios publicados, qué incluye cada uno y qué no | Tabla con "verificado el DD/MM/AAAA" y enlace a cada precio oficial. Incluir las limitaciones de Drenpos |
| 6 | Alta | Trazabilidad por lotes | Landing `/software-trazabilidad-lotes` | software trazabilidad lotes | Software de trazabilidad por lotes y caducidades: el informe para Sanidad en un clic | Citar arts. 18 y 19 del Reglamento 178/2002. Producto: informe de recall en PDF, alertas de caducidad, FEFO, OCR de albaranes |
| 7 | Media | Cárnicas y salas de despiece | Landing `/software-carnicas-sala-despiece` | software para cárnicas | Software para cárnicas y salas de despiece: canal, despiece, merma y trazabilidad hasta el cliente | Pocos competidores con URL propia; despiece con merma es diferencial |
| 8 | Media | Materiales de construcción y ferreterías | Landing `/software-materiales-construccion-ferreteria` | software para almacén de materiales de construcción | Software para almacenes de materiales de construcción y ferreterías: stock por formatos, pesos y venta en mostrador | Dato de apoyo: 335.187 empresas de construcción (Cifras PYME) |
| 9 | Media | Distribuidores de bebidas | Landing `/software-distribuidores-bebidas` (tras el post de hoy) | software para distribuidores de bebidas | Software para distribuidores de bebidas y alimentación: cajas, palés, lotes y albarán con peso | Decir claro que hoy no hace preventa, autoventa, rutas ni envases retornables |
| 10 | Media | Permisos retribuidos | Post `/blog/permisos-retribuidos-2026-tabla` | permisos retribuidos 2026 | Permisos retribuidos en 2026: tabla de días por situación (art. 37.3 ET) y cómo configurarlos como ausencias | Aviso fechado: la ampliación a 10 días por fallecimiento no está en vigor (revisar antes de publicar) |
| 11 | Media | Cálculo de vacaciones | Post `/blog/como-calcular-vacaciones-empleados` | cómo calcular las vacaciones de un trabajador | Cómo calcular las vacaciones de tus empleados: prorrateo, consolidación mes a mes y días que pasan al año siguiente | Decir que la ley son 30 días naturales y que los 22 laborables son equivalencia de uso |
| 12 | Media | Geolocalización legal | Post `/blog/fichar-con-geolocalizacion-legal` | es legal fichar con geolocalización | Fichar con geolocalización: qué permite el art. 90 de la LOPDGDD, qué ha sancionado la AEPD en 2026 y cómo activarlo sin riesgo | Solo al fichar, nunca seguimiento continuo; informar antes a la plantilla; sanción de 200.000 € como contraejemplo |
| 13 | Media | Precios de control horario | Refresco de `/blog/mejores-programas-control-horario` (y fusionar o diferenciar la otra comparativa) | precios apps control horario | Cuánto cuesta el control horario en 2026: precio por empleado de las apps más usadas y qué incluye cada una | Citar cada precio "según X a fecha Y". Resolver la canibalización entre las dos comparativas |
| 14 | Media | Horas extra | Post `/blog/horas-extra-como-se-calculan` | cómo se calculan las horas extra | Horas extra en la pyme: cómo se calculan día a día, el límite de 80 al año y cómo dejarlas registradas | No afirmar el plazo de 4 meses hasta verificarlo |
| 15 | Media | Ampliaciones del clúster de almacén | Secciones nuevas en landings existentes | varias | Frigorífico: "¿Cuánto cobrar por palet y día?" y mercado del frío (DBK). Picking: "Errores de picking: qué cuestan y cómo evitarlos". Palets: "Etiqueta logística GS1-128". Huecos: "Software para un operador logístico pequeño". Pilar: "¿Programa de almacén gratis o barato?" y "Almacén con pistola lectora o PDA". Tienda: recambios y parafarmacia | Cifras de la sección 5 con enlace |
| 16 | Media | Comparativa SGA | Post `/blog/mejores-software-gestion-almacen-pymes-2026` | mejores software de gestión de almacén 2026 | Los mejores programas de gestión de almacén para pymes en 2026: comparativa con precios publicados | Lista honesta con Holded, Odoo, Zoho, Yunbit, Verial y Drenpos |
| 17 | Media | Cierre de caja | Post `/blog/cierre-de-caja-bar-arqueo` | cierre de caja restaurante | Cierre de caja en un bar: cómo hacer el arqueo diario y detectar descuadres | Producto: desglose por método de pago y reporte imprimible |
| 18 | Media | Ley del desperdicio | Post `/blog/ley-desperdicio-alimentario-bares-2026` | ley desperdicio alimentario restaurantes | Ley 1/2025 de desperdicio alimentario: qué tiene que hacer tu bar desde abril de 2026 y cómo ayuda el control de stock | Sin prometer escandallos por receta |
| 19 | Media | ERP para hostelería | Post `/blog/erp-hosteleria-tpv-stock-facturacion-fichaje` | ERP hostelería | ERP para hostelería: qué gana un bar cuando TPV, compras, stock, facturación y fichaje van en el mismo programa | Cabecera de categoría; enlaza a todo el clúster |
| 20 | Media | Conector MCP | Post `/blog/consultar-ventas-stock-chatgpt-claude-mcp` | ERP con IA | Consultar las ventas y el stock desde ChatGPT o Claude: qué es un conector MCP para tu ERP | Hoy el conector lee ventas, clientes y productos con stock; no fichajes ni vacaciones. Solo consulta |
| 21 | Baja | FIFO, LIFO y FEFO | Post | FIFO LIFO FEFO | FIFO, LIFO y FEFO: cuál usar en cada almacén, con ejemplos de alimentación, farmacia y recambios | Sin volumen verificado |
| 22 | Baja | Rotura de stock | Post (o ampliar `/blog/control-de-stock-sin-roturas`) | rotura de stock | Rotura de stock: cuánto te cuesta y cómo calcular el stock mínimo | Citar Corsten y Gruen con aviso de fuente secundaria |
| 23 | Baja | Depósito de mercancías | Post | cuánto cobrar por guardar palets | Cómo montar un pequeño depósito de mercancías y qué cobrar por palet | Referencia: 2,50 € por palet al mes (Future Logistics) |
| 24 | Baja | Elegir un SGA | Post | cómo elegir un SGA | Qué SGA necesita una pyme de 5 a 30 personas: 12 preguntas antes de elegir | |
| 25 | Baja | TPV cafetería | Landing `/tpv-cafeteria` | TPV cafetería | TPV para cafeterías: cobro rápido en barra, combinados guiados y cierre de caja sin líos | |
| 26 | Baja | TPV pizzería | Landing `/tpv-pizzeria` | TPV pizzería | TPV para pizzerías: extras, mitades y pedidos para llevar sin errores en cocina | Sin agregadores de delivery: decirlo |
| 27 | Baja | Alérgenos | Ampliar `/blog/carta-digital-qr-restaurante-guia` | carta digital alérgenos | Alérgenos en la carta digital: qué exige el RD 126/2015 y cómo mostrarlos en un QR de mesa | Comprobar la URL de EUR-Lex del 1169/2011 |
| 28 | Baja | Plantilla de vacaciones | Lead magnet `/blog/plantilla-excel-vacaciones-2027` | plantilla excel control vacaciones empleados | Plantilla Excel de control de vacaciones 2027 gratis, y cuándo deja de servir | SERP muy competida |
| 29 | Baja | Turnos en almacén | Post | control horario almacén | Turnos de mañana y tarde en almacén: calendarios laborales, fichaje con llavero y horas extra sin hojas de cálculo | Hablar de "varios calendarios", no de planificador de turnos |
| 30 | Baja | Páginas "vs" | Posts `drenpos-vs-...` | alternativa a Last.app / Glop / SumUp | Drenpos o Last.app: TPV con ERP y fichaje frente a TPV pensado para delivery | Después de la comparativa (#5), tono neutro, sin menospreciar |

**En espera o descartado**
- Escandallo de un plato o de un cóctel: Drenpos no hace escandallos por receta.
- TPV para food truck o chiringuito: el terminal de fichaje funciona sin conexión, pero no está confirmado que el TPV lo haga.
- Cuadrantes o planificador de turnos: Drenpos tiene calendarios con vigencias, no planificación automática.
- Landing de e-commerce: sin integraciones documentadas con Shopify, WooCommerce o Prestashop.
- Preventa, autoventa, reservas, delivery, datáfono, envases retornables: no existen; si una keyword los pide, contestar con honestidad.
- "Pregúntale a tu asistente cuántos días de vacaciones te quedan": hoy el conector MCP no expone fichajes ni vacaciones.

### 7.2 Arreglos en la web que acompañan al contenido

1. Comprobar que producción tiene lo del 14/09 y el 21/09 (precio de 29 € en almacén, precio en `/control-horario`, geolocalización y terminal sin conexión).
2. Fecha visible de actualización y autor (Alonso Bermejo Pérez) en las landings de producto.
3. Enlace al BOE en cada cifra legal: LISOS y RD-ley 8/2019 en control horario, RD 1007/2023 y RD-ley 15/2025 en Verifactu, Reglamento 178/2002 en almacén.
4. `/software-bares-restaurantes`: definición "qué es un software para bares" en el primer párrafo, no solo en la FAQ.
5. Razón social, CIF y dirección en `/about`, en el pie y en la cabecera de llms-full.txt, con una sola ciudad.
6. JSON-LD `Organization`: `legalName`, `address`, `founder` y `sameAs` a los perfiles de empresa.
7. robots.txt: nombrar Claude-SearchBot, Claude-User y Perplexity-User.
8. Al menos un caso real con nombre (con permiso) y cifras por landing. Es lo que más citan los motores y hoy no hay ninguno.
9. Canibalizaciones a vigilar en Search Console: las dos comparativas de control horario; `/blog/wms-sga-erp-diferencias` frente al post de hoy de SGA o ERP; `/blog/control-de-stock-sin-roturas` frente a `/software-control-stock`.

---

## 8. Acciones fuera de la web

Ordenadas por impacto esperado y esfuerzo. El impacto es una estimación cualitativa de las notas, no una medida.

| # | Acción | Dónde | Esfuerzo | Impacto | Por qué |
|---|---|---|---|---|---|
| 1 | Alta en Bing Webmaster Tools (importando desde Search Console) y comprobar que IndexNow se envía en cada despliegue | [Bing Webmaster](https://www.bing.com/webmasters/help/getting-started-checklist-66a806de), [IndexNow](https://www.indexnow.org/documentation) | Bajo (1 h) | Medio | Sin coste; posible efecto directo en ChatGPT, Copilot y DuckDuckGo |
| 2 | Ficha gratuita en Capterra España (el mismo grupo alimenta GetApp y Software Advice) y pedir de 5 a 10 reseñas reales a clientes | [Capterra almacén](https://www.capterra.es/directory/30005/warehouse-management/pricing/free/software), [Capterra TPV restaurante](https://www.capterra.es/directory/30603/restaurant-pos/pricing/free/software) | Bajo (2 a 4 h y seguimiento) | Alto | Los listicles que posicionan tiran de Capterra; las reseñas son la prueba que usan los asistentes |
| 3 | Alta en Softwaredoit y petición de entrada en sus comparativas de TPV hostelería, SGA, control horario y vacaciones | [Softwaredoit proveedores](https://www.softwaredoit.es/directorio-proveedores/index.html), [TPV hostelería](https://www.softwaredoit.es/tpv/software-hosteleria-restaurantes-bares.html), [control horario](https://www.softwaredoit.es/recursos-humanos/software-control-horario-presencia.html), [vacaciones](https://www.softwaredoit.es/recursos-humanos/software-gestion-vacaciones.html) | Bajo a medio | Alto | Sale en el top 10 de tres de las cinco consultas de categoría. No se sabe si cobra por la ficha |
| 4 | Consolidar la entidad: misma razón social, ciudad y descripción en `/about`, LinkedIn de empresa y del fundador, X, YouTube y fichas externas | [LinkedIn empresa](https://www.linkedin.com/company/drenpos), [LinkedIn fundador](https://www.linkedin.com/in/alonso-bermejo/), [X](https://x.com/Drenpos) | Bajo | Alto (Gemini y ChatGPT) | Hoy hay cuatro localizaciones y tres nombres. Unifica también los dos canales de YouTube |
| 5 | Google Business Profile (si no existe) con categoría de empresa de software y reseñas | [Google Business Profile](https://www.google.com/business/) | Bajo | Medio-Alto | No se pudo verificar si existe; la búsqueda de marca no lo muestra |
| 6 | Fichas en comparadores de TPV con precio "39 €/mes sin IVA" y funciones (mesas, KDS, QR, Verifactu, fichaje) | [tpvhosteleria.org](https://tpvhosteleria.org/software-tpv/), [ingenieriademenu](https://ingenieriademenu.com/software-tpv-hosteleria/), [comparadortpv](https://comparadortpv.es/software-tpv/revo-xef/), [Cronomia](https://www.cronomia.com/software/numier), [eligetusoftware](https://eligetusoftware.com/softwares/camarero10) | Bajo a medio | Medio-Alto (hostelería) | Son las fichas que alimentan los rankings de "mejor TPV" |
| 7 | Wikidata: ítem de la empresa (instancia de empresa, sede, fundador, web oficial) | [Wikidata](https://www.wikidata.org/) | Bajo | Medio | Refuerza la entidad en grafos de conocimiento |
| 8 | Appvizer, ComparaSoftware y GetApp España | [Appvizer](https://www.appvizer.es/), [ComparaSoftware](https://www.comparasoftware.com/), [GetApp](https://www.getapp.es/) | Bajo | Medio | En Appvizer casi no hay vendedores españoles: menos competencia dentro |
| 9 | Nota de prensa propia, con enlace a drenpos.com, sobre almacén y hostelería, terminal sin conexión y fichaje con geolocalización, a los medios que ya publicaron la de Open Future | [MuyPymes](https://www.muypymes.com/), [Extremadura Informa](https://extremadurainforma.es/), [Onda Cero Sur](https://ondacerosur.es/), [DExtremadura Noticias](https://dextremaduranoticias.com/), [Foro ADR](https://www.foroadr.es/), [AldeaLab](https://www.aldealab.es/), [Extremadura Open Future](https://extremadura.openfuture.org/notas-de-prensa/) | Medio | Medio-Alto | Es el único canal de prensa que ya ha funcionado; esta vez con enlace y con categoría |
| 10 | GS1 Spain: hacerse socio y pedir entrada en el directorio de partners tecnológicos | [Partners GS1 Spain](https://www.gs1es.org/partners-gs1-spain/), [directorio](https://www.gs1es.org/ng/socios-colaboradores), [asociarse](https://www.gs1es.org/asociate-gs1) | Medio (cuota no publicada) | Medio (almacén, SSCC) | Autoridad exacta para "etiqueta SSCC de palets" |
| 11 | LinkedIn: publicar casos de clientes con nombre (con permiso) y datos concretos, uno o dos al mes | [LinkedIn empresa](https://www.linkedin.com/company/drenpos) | Medio y continuo | Medio | Da a los motores los casos y cifras que hoy no existen |
| 12 | Conector MCP en GitHub (documentación y ejemplo de conexión, sin publicar código que no quieras abrir) y lanzamiento en Product Hunt | [GitHub](https://github.com/), [Product Hunt](https://www.producthunt.com/) | Medio | Medio (búsquedas de "ERP MCP") | Nicho con poca competencia y fuente citable en inglés |
| 13 | Medios de hostelería con un dato propio agregado (por ejemplo, a qué hora se consulta más la carta QR) | [Restauración News](https://restauracionnews.com/), [Hostelería Digital](https://www.hosteleriadigital.es/), [Profesional Horeca](https://www.profesionalhoreca.com/), [DiegoCoquillat](https://www.diegocoquillat.com/) | Medio | Medio | Publican estudios de terceros y los asistentes los citan para cifras del sector |
| 14 | Premios Extremadura Empresarial 2027 (categoría Nueva Empresa Extremeña) y pitch de Potencial Digital | [Premios](https://www.extremaduraempresarial.es/ayuda/premios-extremadura-empresarial/), [solicitud](https://www.juntaex.es/w/0625622), [Potencial Digital](https://potencialdigital.es/) | Medio | Medio (prensa regional recurrente) | Genera nota institucional en juntaex.es. La convocatoria de 2026 cerró el 10/08/2026 |
| 15 | Medios logísticos con una encuesta propia a pymes con almacén (muestra de 100 o más, método publicado) | [Cadena de Suministro](https://www.cadenadesuministro.es/), [Información Logística](https://informacionlogistica.com/), [Transporte 3](https://transporte3.com/) | Alto | Medio-Alto | Republican cualquier estudio con cifras |
| 16 | Cámara de Comercio de Badajoz (listado de proveedores) y Crunchbase | [Cámara Badajoz](https://www.camarabadajoz.es/es/paginas/listado-de-proveedores), [Crunchbase](https://www.crunchbase.com/) | Bajo | Bajo-Medio | Señales de entidad, poco tráfico |

---

## 9. Calendario de vigilancia

### 9.1 Qué revisar y cuándo

| Qué | Estado a 23/09/2026 | Cuándo revisar | Dónde mirar | Qué tocar si cambia |
|---|---|---|---|---|
| Real decreto de registro horario | No aprobado ni publicado. Consejo de Estado desfavorable (23/03/2026); el 14/09/2026 se daba "a las puertas". Si se publica, entra en vigor a los 20 días | Cada lunes hasta que salga | [BOE](https://www.boe.es/), prensa económica | Publicar el post preparado (#3 del backlog) en menos de 24 h; `/blog/registro-horario-digital`, `/control-horario`, multas, teletrabajo, Excel, nuevos requisitos, hostelería, llms.txt y llms-full.txt |
| Calendario laboral 2027 (BOE) | Sin publicar a 20/08/2026. La de 2026 salió el 28/10/2025, así que es razonable esperarla entre octubre y noviembre (inferencia) | Cada semana desde el 1 de octubre | [BOE](https://www.boe.es/) | `/blog/calendario-laboral-2027-festivos-horas-extra`: tabla nacional y por comunidad, fecha de revisión |
| Verifactu | Obligatorio el 1/01/2027 para sociedades y el 1/07/2027 para el resto (RD-ley 15/2025). AEAT actualizó su página el 21/07/2026 | Cada mes; revisión fuerte en diciembre de 2026 y en junio de 2027 | [AEAT Verifactu](https://sede.agenciatributaria.gob.es/Sede/iva/sistemas-informaticos-facturacion-verifactu.html) | `/software-verifactu`, `/blog/verifactu-pymes-guia-2026`, post de Verifactu en hostelería, llms.txt |
| Permiso por fallecimiento (10 días) | Acordado el 15/12/2025; no en vigor a 19/08/2026 (siguen 2 días, 4 con desplazamiento) | Cada mes | [BOE](https://www.boe.es/), [Woffu normativa](https://woffu.com/es/blog/normativa/es-blog-permiso-fallecimiento/) | Post de permisos retribuidos, post de vacaciones de hoy, FAQ |
| Sanciones de la AEPD sobre geolocalización | Última citable: 200.000 € (18/05/2026) | Cada trimestre | [AEPD](https://www.aepd.es/) | `/control-horario#geolocalizacion`, post de geolocalización |
| Precios de la competencia | Tablas de la sección 6 | Cada trimestre (próxima: diciembre de 2026) | URLs de la sección 6 | Comparativas de TPV, SGA y control horario, con nueva fecha de verificación |
| Anuario de Hostelería de España 2026 | El de 2025 se presentó en diciembre de 2025 | Diciembre de 2026 | [Hostelería de España](https://hosteleriadeespana.es/publicaciones-hosteleria.html) | Cifras de `/software-bares-restaurantes` y posts |
| Cifras PYME | Última edición usada: mayo de 2026 | Cada seis meses | [ipyme.org](https://ipyme.org/es-es/publicaciones/Paginas/estadisticaspyme.aspx) | Home, `/about`, pilar de almacén |
| llms.txt y llms-full.txt | Fechados el 21/09/2026 | Cada mes y tras cada cambio normativo | `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts` | Fechas, precios, estado del real decreto |
| Premios Extremadura Empresarial 2027 | La de 2026 cerró el 10/08/2026 | Primavera de 2027 | [Extremadura Empresarial](https://www.extremaduraempresarial.es/ayuda/premios-extremadura-empresarial/) | Presentar candidatura |

### 9.2 Las 10 consultas de prueba (cada dos semanas)

Lánzalas en ChatGPT (con búsqueda activada), Perplexity, Claude (con búsqueda web) y Gemini, siempre en una conversación nueva y sin haber hablado antes de Drenpos en esa cuenta.

1. ¿Qué software de control horario me recomiendas para una pyme de 15 empleados en España?
2. Busco un programa para gestionar las vacaciones y permisos de los empleados de una pyme. ¿Cuál me recomiendas?
3. ¿Hay algún terminal de fichaje que funcione sin internet y sin huella dactilar?
4. ¿Cuál es el mejor software de gestión de almacén para una pyme en España?
5. Necesito un programa de control de stock sencillo y barato para mi empresa. ¿Qué opciones hay?
6. ¿Qué software me sirve para un almacén frigorífico o para guardar palets de otras empresas?
7. ¿Cuánto cuesta un TPV para un bar o un restaurante en 2026?
8. ¿Qué TPV para bar incluye Verifactu y control horario de los camareros?
9. ¿Hay algún ERP para pymes que se pueda consultar desde ChatGPT o Claude?
10. ¿Qué es Drenpos y cuánto cuesta?

### 9.3 Hoja de resultados (una por ronda)

Leyenda: **C** = cita a Drenpos con enlace; **M** = lo menciona sin enlace; **N** = no aparece; **E** = aparece con un dato erróneo (anótalo en la tabla de detalle).

Fecha de la ronda: ____/____/______

| Consulta | ChatGPT | Perplexity | Claude | Gemini |
|---|---|---|---|---|
| 1. Control horario pyme 15 empleados | | | | |
| 2. Vacaciones y permisos | | | | |
| 3. Terminal sin internet ni huella | | | | |
| 4. Mejor software de almacén | | | | |
| 5. Control de stock barato | | | | |
| 6. Frigorífico o palets de terceros | | | | |
| 7. Precio TPV bar o restaurante | | | | |
| 8. TPV con Verifactu y fichaje | | | | |
| 9. ERP consultable desde ChatGPT o Claude | | | | |
| 10. Qué es Drenpos | | | | |

**Detalle (solo cuando aparece Drenpos, cuando sale un dato erróneo o cuando un competidor se repite)**

| Fecha | Consulta | Motor | URL de Drenpos citada | Competidores o fuentes citadas | Dato erróneo o nota |
|---|---|---|---|---|---|
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |

---

## Fuentes

### Documentación oficial de motores y protocolos
- OpenAI, bots: https://developers.openai.com/api/docs/bots
- OpenAI, ayuda de ChatGPT search: https://help.openai.com/en/articles/9237897-chatgpt-search
- Perplexity, bots: https://docs.perplexity.ai/guides/bots
- Anthropic, rastreo web: https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- TechCrunch sobre Claude y Brave (21/03/2025): https://techcrunch.com/2025/03/21/anthropic-appears-to-be-using-brave-to-power-web-searches-for-its-claude-chatbot/
- Google Search Central, funciones de IA: https://developers.google.com/search/docs/appearance/ai-features
- IndexNow: https://www.indexnow.org/documentation
- Bing Webmaster Tools: https://www.bing.com/webmasters/help/getting-started-checklist-66a806de

### Normativa y fuentes públicas
- BOE, RD-ley 8/2019: https://www.boe.es/buscar/act.php?id=BOE-A-2019-3481
- BOE, Estatuto de los Trabajadores: https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430
- BOE, LO 3/2018 (LOPDGDD): https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673
- BOE, calendario laboral 2026: https://www.boe.es/diario_boe/txt.php?id=BOE-A-2025-21667
- BOE, Reglamento (CE) 178/2002: https://www.boe.es/buscar/doc.php?id=DOUE-L-2002-80201
- BOE, RD 126/2015: https://www.boe.es/buscar/act.php?id=BOE-A-2015-2293
- BOE, Ley 1/2025: https://www.boe.es/buscar/act.php?id=BOE-A-2025-6597
- Ministerio de Trabajo, proyecto de RD de registro de jornada: https://expinterweb.mites.gob.es/participa/listado/download/6cb63e79-48a8-4e99-9784-3a0b26ae6106
- Ministerio de Trabajo, guía de registro de jornada: https://www.mites.gob.es/ficheros/ministerio/GuiaRegistroJornada.pdf
- AEAT, Verifactu: https://sede.agenciatributaria.gob.es/Sede/iva/sistemas-informaticos-facturacion-verifactu.html
- Junta de Extremadura, calendario 2027: https://portalempleado.juntaex.es/w/calendario-de-fiestas-laborales-de-extremadura-para-el-a%C3%B1o-2027
- DGIPYME, Cifras PYME mayo 2026: https://ipyme.org/Publicaciones/Cifras%20PYME/CifrasPyme_mayo_2026.pdf
- INE, Estadística Estructural de Empresas 2024: https://www.ine.es/dyngs/Prensa/EEESS2024.htm
- GS1 Spain, SSCC: https://www.gs1es.org/estandares-gs1-identificar/sscc/

### Estudios, prensa y análisis
- de Koster, Le-Duc y Roodbergen (EJOR, 2007): https://www.sciencedirect.com/science/article/abs/pii/S0377221706006473
- Cadena de Suministro, estudio Intermec: https://www.cadenadesuministro.es/noticias/los-errores-en-los-procesos-de-picking-originan-perdidas-de-hasta-290-000-euros-por-almacen_1053375_102.html
- Slimstock (Corsten y Gruen, NielsenIQ): https://www.slimstock.com/blog/the-hidden-cost-of-stockouts-why-retailers-cant-afford-empty-shelves/
- Empresa Exterior (DBK, frío): https://empresaexterior.com/la-logistica-del-frio-en-espana-supera-los-6-000-millones-de-euros-impulsada-por-el-retail-y-el-sector-farmaceutico/
- Transporte 3 (DBK, operadores): https://transporte3.com/noticia/23720-el-negocio-logistico-en-espana-supera-los-7-100-millones-pese-a-la-desaceleracion-del-sector/
- Información Logística (ONTSI, INE): https://informacionlogistica.com/las-pymes-espanolas-mueven-el-65-del-pib-pero-acumulan-un-retraso-logistico-que-frena-su-capacidad-de-crecer/
- Mi Fichaje Legal, estado del real decreto: https://mifichajelegal.com/blog/real-decreto-registro-horario-digital-mayo-2026-estado-tramitacion-pymes/
- Mi Fichaje Legal, geolocalización: https://mifichajelegal.com/blog/geolocalizacion-fichaje-gps-rgpd-trabajadores-2026/
- Registrahora: https://www.registrahora.es/noticias/registro-horario-digital-aplazado-septiembre-2026
- El Debate (24/07/2026): https://www.eldebate.com/economia/20260724/yolanda-diaz-suma-otro-reves-aparca-registro-horario-hasta-septiembre_443170.html
- El Debate (14/09/2026): https://www.eldebate.com/economia/20260914/yolanda-diaz-ultima-registro-horario-esquivo-congreso-puede-costar-900-millones-ano-pymes_458233.html
- Infobae/EFE: https://www.infobae.com/espana/agencias/2026/07/24/el-gobierno-acuerda-dejar-el-registro-horario-para-septiembre-para-resolver-discrepancias/
- LawAndTrends: https://www.lawandtrends.com/noticias/laboral/el-registro-de-jornada-horario-asignatura-pendiente-de-la-ministra-diaz-para-septiembre-algunas-claves-para-entender-1.html
- Cuatrecasas: https://www.cuatrecasas.com/es/spain/laboral/art/registro-jornada-laboral-espana-rd
- ECIJA, sanción AEPD: https://www.ecija.com/actualidad-insights/sancion-de-200000-de-la-aepd-por-el-uso-de-apps-corporativas-en-moviles-personales-de-los-empleados/
- conceptosjuridicos.com, arts. 34, 35, 37 y 38 ET: https://www.conceptosjuridicos.com/estatuto-de-los-trabajadores-articulo-34/
- Protime, permisos retribuidos: https://www.protime.eu/es-es/noticias/permisos-retribuidos
- Woffu, permiso por fallecimiento: https://woffu.com/es/blog/normativa/es-blog-permiso-fallecimiento/
- Kenjo, cálculo de vacaciones: https://www.kenjo.io/es/guia-calcular-vacaciones-en-empresas
- puedemiempresa, calendario 2027: https://puedemiempresa.com/blog/calendario-laboral-2027-festivos-puentes/
- Región Digital, calendario 2027 Extremadura: https://www.regiondigital.com/noticias/economia/431038-publicado-en-el-doe-el-calendario-de-festivos-para-2027-en-extremadura.html
- El Español, absentismo: https://www.elespanol.com/invertia/economia/empleo/20260611/cifras-absentismo-empresa-deja-euros-ano-trabajador-ausencias-sin-justificar/1003744281355_0.html
- El Español, ley del desperdicio: https://www.elespanol.com/castilla-y-leon/economia/20260411/vigor-consumo-sancionara-restaurantes-no-dejen-cobren-envase-llevarse-sobras-trt/1003744197465_0.html
- Hostelería Madrid, Anuario 2024: https://www.hosteleriamadrid.com/blog/anuario-hosteleria-espana-2024/
- Hosteltur, empleo 2025: https://www.hosteltur.com/173449_la-hosteleria-alcanza-los-189-millones-de-empleados-en-2025-pero-ve-amenazada-su-rentabilidad.html
- Hosteltur, rentabilidad 2025: https://www.hosteltur.com/173356_la-rentabilidad-de-la-restauracion-cae-un-09-en-un-entorno-de-mas-costes-y-regulaciones.html
- Profesional Horeca (UVE): https://www.profesionalhoreca.com/la-hosteleria-en-espana-en-2025-280-400-establecimientos-transformacion-y-consolidacion/
- Profesional Horeca (Delectatech): https://www.profesionalhoreca.com/radiografia-de-la-digitalizacion-de-la-hosteleria-en-espana-madrid-barcelona-baleares-y-malaga-van-en-cabeza/
- Hostelería Digital (Square): https://www.hosteleriadigital.es/2024/03/22/los-menus-digitales-se-han-extendido-por-la-mayoria-de-locales-de-restauracion-y-ya-son-la-opcion-favorita-de-los-comensales-espanoles-para-consultar-la-carta/
- Restauración News (KPMG): https://restauracionnews.com/2024/04/auge-delivery-clone/
- Fiscal Impuestos (RD-ley 15/2025): https://www.fiscal-impuestos.com/aplazamiento-entrada-vigor-Verifactu-2027
- Noticias Jurídicas (Verifactu 2027): https://noticias.juridicas.com/actualidad/noticias/20735-nueva-prorroga:-verifactu-no-sera-obligatorio-hasta-2027-para-sociedades-y-otros-contribuyentes/
- MuyPymes (Drenpos, 23/12/2025): https://www.muypymes.com/2025/12/23/startups-extremenas-extremadura-open-future

### Competencia y comparadores
- Woffu, precios: https://www.woffu.com/es/precios/
- Kenjo, tarifas: https://www.kenjo.io/es/tarifas
- Holded, vacaciones: https://www.holded.com/es/blog/mejores-softwares-gestion-vacaciones
- Holded, almacén: https://www.holded.com/es/blog/software-gestion-de-almacenes
- Holded, gema TPV: https://www.holded.com/es/gemas/tpv
- controlhorario.com, precios (sep. 2026): https://controlhorario.com/software/precio/
- IAT, precios de control horario: https://iat.es/blog/precios-apps-control-horario/
- Cronomia: https://www.cronomia.com/software-control-horario/mejores
- Softwaredoit, comparativa SGA: https://softwaredoit.es/software-gestion-almacen-guias/comparativa-sga.html
- Softwaredoit, vacaciones: https://www.softwaredoit.es/recursos-humanos/software-gestion-vacaciones.html
- Cleverals, SGA 2026: https://www.cleverals.com/es/blog/sga/mejores-software-gestion-almacenes-inventario/
- Verial, bebidas: https://programa-de-gestion.com/sector/software-de-gestion-comercial-para-bebidas-distribucion/
- Appvizer, almacén: https://www.appvizer.com/operations/warehouse-mgt
- Capterra España, almacén: https://www.capterra.es/directory/30005/warehouse-management/software
- GetApp España, almacén: https://www.getapp.es/directory/225/warehouse-management/software
- Future Logistics: https://www.future-logistics.es/almacenaje-logistico-desde-250e-palet/
- Last.app, precios: https://www.last.app/precios
- SumUp TPV: https://www.sumup.com/es-es/sumup-tpv/
- Square, precios: https://squareup.com/es/es/pricing
- TIM, tarifas Revo XEF: https://www.tim.es/tarifas-completas-revo-xef/
- VentaTPV, precios hostelería 2026: https://ventatpv.com/blog/cuanto-cuesta-un-tpv-completo-para-hosteleria-precios-y-que-incluyen-en-2026-n33
- ingenieriademenu, Top 10 TPV: https://ingenieriademenu.com/software-tpv-hosteleria/
- Glop, hostelería: https://www.glop.es/software-tpv-hosteleria/
- tpvhosteleria.org: https://tpvhosteleria.org/software-tpv/

### Notas internas
- `research_notes/Keywords Drenpos septiembre 2026/control-horario-ampliado.md`
- `research_notes/Keywords Drenpos septiembre 2026/almacen-logistica.md`
- `research_notes/Keywords Drenpos septiembre 2026/hosteleria.md`
- `research_notes/Keywords Drenpos septiembre 2026/estado-geo-drenpos.md`
- `context/pricing.md`, `context/products_modules.md`
- `PLAN-SEO-GEO-2026-09.md`, `docs/novedades-2026-09-geolocalizacion-offline-plano.md`
