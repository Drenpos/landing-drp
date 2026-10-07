# Diagnóstico y plan SEO / AEO: qué ha funcionado con el fichaje y cómo repetirlo con equipo, almacén y producción

Fecha: 7 de octubre de 2026. Para: Alonso. Complementa `keywords-intenciones-2026-09.md` (mapa de keywords de septiembre, sigue vigente) y `PLAN-SEO-GEO-2026-09.md`. Este documento no repite ese mapa: lo usa como base y añade lo que ha cambiado en dos semanas, lo que se ha descubierto hoy al revisar producción y el plan de ejecución.

Cómo leerlo: la sección 1 es lo urgente (hay un problema de caché que invalida parte del trabajo de septiembre). La 2 explica por qué el fichaje funciona y el resto no. La 3 es el mapa de intenciones nuevo. La 4 es el plan por fases con el reparto para los subagentes. La 5 son las preguntas que hay que resolver antes de ejecutar.

---

## 1. Hallazgo crítico: producción sirve versiones antiguas de las páginas

### 1.1 Qué se ha comprobado

Se ha pedido cada URL dos veces: tal cual y con un parámetro de consulta (`?nocache=...`) que obliga a Cloudflare a ir al origen. El resultado es distinto:

| URL | Sin parámetro (lo que ven Google y los bots de IA) | Con parámetro (lo que hay desplegado de verdad) |
| --- | --- | --- |
| `/control-horario` | Título "Software de Control Horario y Fichajes 2026". H1 "...para cumplir la ley sin Excel ni multas". 14 H2, ninguno de vacaciones, turnos ni entrada y salida. FAQ de 8 preguntas, todas legales. | Título "Control Horario, Turnos Rotativos y Vacaciones". H1 "...fichajes, vacaciones y retrasos sin Excel". 24 H2 con vacaciones, retrasos, horas extra, turnos 4x4 y planificación anual. |
| `/dispositivo-fichaje` | "Desde 120 €" en meta, hero y FAQ. Sin JSON-LD `Product` visible. | "Desde 140 €" en todo. |
| `/sitemap-0.xml` | 163 URLs, `lastmod` más reciente 17/07/2026. Incluye `/case-studies/*`, `/careers/*`, `/features/*`. No incluye los posts de septiembre ni octubre. | 178 URLs, `lastmod` 07/10/2026. Sin páginas plantilla. Con todos los posts nuevos. |
| `/case-studies` | 200 con título "Case Studies", descripción "this is meta description" y ocho fichas de "TechPulse / Michael Brown". | Esas páginas ya no existen en el repositorio. |
| `/blog/verifactu-aplazado-octubre-2028`, `/blog/gestion-vacaciones-permisos-pymes-sin-excel` | Frescos y correctos. | Igual. |

La lectura es clara: las URLs nuevas se ven bien porque nunca estuvieron en caché. Las URLs que ya existían se siguen sirviendo con la copia que Cloudflare guardó en su momento (julio en el caso del sitemap, principios de septiembre en el caso del dispositivo). Las páginas prerrenderizadas son activos estáticos y la caché de borde no se ha purgado al desplegar.

### 1.2 Qué consecuencias tiene

- Google trabaja con un sitemap de julio: no sabe que existen los 13 posts de septiembre y octubre ni la landing de DeCA, salvo que los descubra por enlaces internos.
- Los asistentes de IA que leen `/control-horario` encuentran la versión en la que el control horario es solo fichaje y hardware. Eso explica buena parte de "solo dicen el dispositivo físico y no todo lo que tenemos": vacaciones, turnos y control de entrada y salida literalmente no están en la página que leen.
- Las páginas plantilla del tema (ocho casos de estudio falsos en inglés, careers, features) siguen indexables y restan calidad al dominio. Memoria del 14/09: se borraron del repo. En producción siguen vivas.
- El precio del terminal que circula es 120 € cuando el oficial es 140 €.
- Todo el trabajo de refresco de septiembre (fechas de Verifactu, sanciones corregidas, geolocalización, terminal sin conexión) ha llegado a los posts nuevos y a `llms.txt`, pero no a las landings que ya existían.

### 1.3 Qué hay que hacer (fase 0, antes de escribir una sola línea de contenido nuevo)

1. **Purgar toda la caché** del dominio en el panel de Cloudflare (Caching, Configuration, Purge Everything). Efecto inmediato.
2. **Revisar las reglas de caché** de la zona. Casi seguro hay una Cache Rule o Page Rule tipo "Cache Everything" con Edge TTL largo sobre todo el sitio. Opciones, de menos a más intrusiva: excluir `text/html` de la regla; bajar el Edge TTL de HTML a 1 hora; o quitar la regla y dejar que Workers Static Assets gestione su caché (se invalida sola en cada despliegue).
3. **Añadir `public/_headers`** (Workers Static Assets lo respeta) para que el HTML no se quede pegado y los assets con hash sí:
   ```
   /*
     Cache-Control: public, max-age=0, must-revalidate
   /_astro/*
     Cache-Control: public, max-age=31536000, immutable
   /images/*
     Cache-Control: public, max-age=2592000
   /fonts/*
     Cache-Control: public, max-age=31536000, immutable
   ```
   Si la regla de Cloudflare sobrescribe el TTL del origen, este fichero no basta por sí solo; hace falta el punto 2.
4. **Purga automática en cada despliegue.** Una llamada a la API de Cloudflare (`POST /zones/{zone}/purge_cache` con `{"purge_everything":true}`) al final del paso de deploy, con un token de API limitado a "Cache Purge". Se puede meter en el script `deploy` de `package.json` o en Jenkins si el deploy vuelve allí.
5. **Comprobar `cf-cache-status`** en las cabeceras de `/control-horario` y `/sitemap-0.xml` tras purgar: debe salir `DYNAMIC`, `MISS` o `REVALIDATED`, no `HIT` con `age` de días.
6. **Reenviar el sitemap** en Search Console y pedir indexación manual de las 6 landings y 13 posts que Google no ha visto todavía.

### 1.4 Dudas sobre el despliegue que afectan al SEO

- El `Jenkinsfile` solo hace checkout, lychee y build. **El paso de deploy está comentado.** Si el despliegue real es `npm run deploy` desde tu Mac, hay dos efectos: (a) IndexNow nunca se dispara, porque `astro.config.mjs` lo activa solo con `BRANCH_NAME=main` e `INDEXNOW_KEY` en el entorno del build, variables que pone Jenkins y no tu terminal; y (b) el build de Jenkins, que sí dispara IndexNow, avisa a Bing de URLs que luego no se despliegan desde ahí. Hay que decidir un único camino de despliegue y meter ahí IndexNow y la purga.
- En el sitemap con `nocache`, 156 de 178 URLs comparten el mismo `lastmod` (07/10/2026 09:44:35). Los dos últimos commits tocan 27 y 26 ficheros, no 156. O el build de producción se hizo desde un checkout sin historial de git (entonces `gitLastmod` devuelve la fecha del único commit) o el serializador asigna la fecha de build a todo. Un `lastmod` idéntico en todas las URLs es un `lastmod` que Google ignora. Conviene comprobar en el `dist/sitemap-0.xml` local qué fechas salen.

---

## 2. Por qué funciona el fichaje y no lo demás

### 2.1 Lo que se ha hecho bien en el clúster de control horario

No es casualidad ni es solo que el tema tenga demanda. Son cinco cosas concretas, y las cinco se pueden copiar.

1. **Una página de producto por objeto concreto.** `/dispositivo-fichaje` habla de una cosa que se puede tocar: terminal, llavero RFID, pantalla con foto, 12 V, sin huella, logo en la carcasa, 140 €, sin internet. Un asistente de IA puede responder "¿hay algún terminal de fichaje que funcione sin internet y sin huella?" citando una sola página con una sola afirmación. Las landings de almacén hablan de capacidades; esta habla de un producto con ficha técnica.
2. **Afirmaciones únicas que ningún competidor hace.** "Lo fabricamos nosotros, de la placa a la carcasa", "tu logo en la carcasa", "sigue fichando sin internet con su propio reloj", "se vende suelto sin el ERP". Los motores citan lo que no encuentran en otro sitio. En almacén y producción hay afirmaciones igual de únicas (etiqueta SSCC incluida en el plan de 29 €, fichaje de tarea independiente del fichaje de jornada, coste real al cerrar la orden) pero están enterradas en párrafos, no en titulares.
3. **Densidad de contenido alrededor.** 15 posts de blog de registro horario, 11 páginas locales de control horario, 2 comparativas, 1 landing de dispositivo y 1 de control horario. Todo enlazado. En almacén hay 8 landings y 11 posts, también bien enlazados. En producción hay 1 landing y 0 posts.
4. **Demanda legal con fecha.** El registro horario digital es obligación pendiente de real decreto desde 2024 y la gente busca con miedo a la multa. Almacén no tiene esa presión, pero producción y almacén sí tienen ganchos legales que no se están usando: trazabilidad (Reglamento 178/2002), DeCA desde el 5/10/2026, Verifactu en el albarán, etiqueta SSCC (estándar GS1).
5. **Página con precio, FAQ y schema `Product` + `FAQPage`.** El resto del sitio usa `SoftwareApplication`, que es correcto pero menos citable que un `Product` con `Offer` y precio numérico.

### 2.2 Por qué los asistentes dicen "solo el dispositivo"

Tres causas, por orden de peso:

1. **La caché.** La página de control horario que leen no menciona vacaciones, turnos ni incidencias (sección 1). Hasta que se purgue, nada de lo que se escriba sobre esto cambia la respuesta.
2. **Todo el "control de equipo" vive como anclas dentro de una sola página.** Vacaciones (`#vacaciones`), entrada y salida (`#entrada-salida`), turnos rotativos (`#turnos-rotativos`), planificación anual (`#planificacion-anual`) y calendarios (`#calendarios`) son secciones de `/control-horario`, una página de 1.800 líneas y 24 H2. Un motor de respuestas resume una página en una idea; la idea de esa página es "fichaje". Las landings `/software-vacaciones-ausencias` y `/control-entrada-salida-empleados`, propuestas en septiembre como prioridad alta, siguen sin existir (la primera devuelve 404).
3. **La página del dispositivo no vende lo que hay detrás.** `/dispositivo-fichaje` no menciona vacaciones ni permisos ni turnos. Cuando un asistente llega por el terminal, no encuentra la frase "con el terminal va una licencia de 1 € al mes que incluye vacaciones, permisos, turnos rotativos y control de entrada y salida". Es la página que más citan y la que menos cuenta.

### 2.3 Por qué almacén y producción no aparecen

- **Autoridad externa cero.** No hay ficha en Capterra, GetApp, Softwaredoit, Appvizer ni ComparaSoftware. Las búsquedas de categoría de almacén las ganan comparadores y listicles; los asistentes de IA citan esos listicles. Si Drenpos no está en la lista, no existe para la pregunta "cuál es el mejor software de almacén para pymes". El dispositivo de fichaje se salta este filtro porque la pregunta es tan concreta que no hay listicle que la responda.
- **Sin fecha ni autor visible en las landings.** Las landings de almacén y producción no muestran "actualizado el" ni firma. Perplexity y Claude penalizan páginas sin señal de frescura ni de autoría. Los posts sí lo tienen.
- **Sin caso real con cifras.** Ninguna landing tiene un cliente con nombre y números. Solchem Logistics (viene de SAP B1), Mr. Bones (viene de Holded) y Ous Cabrera (viene de Odoo) son prueba social lista para usar con permiso.
- **Producción: una sola página.** Buen H1, buena definición, 7 FAQ y precio claro, pero sin ningún post alrededor, sin comparativa, sin casos, sin ganchos legales. No tiene masa crítica.
- **Marca difusa.** "drenpos" en buscadores devuelve Dripos, Danpos y una montaña de los Balcanes. Sin Wikidata, sin Crunchbase, con tres nombres y cuatro ciudades según la fuente (ya señalado en septiembre, sin resolver).

### 2.4 Por qué Barcelona (hipótesis, sin datos)

No hay acceso a GA4 ni a Search Console desde aquí, así que esto son hipótesis ordenadas por probabilidad, con la comprobación que las confirma o descarta:

| Hipótesis | Cómo comprobarla en 5 minutos |
| --- | --- |
| **Google Ads.** La campaña de fichaje y almacén tiene ámbito "toda España" sin ajuste de puja por ubicación. Google reparte el presupuesto donde más subastas gana, y Barcelona y Madrid concentran la mayor densidad de pymes de 10 a 50 trabajadores. Cataluña además tiene una Inspección de Trabajo muy activa en registro horario. | GA4: Informes, Usuario, Atributos, Ubicación, dimensión Ciudad, añadir dimensión secundaria "Grupo de canales predeterminado de la sesión". Si Barcelona es casi todo `Paid Search`, es la campaña. En Google Ads: Ubicaciones, informe por ciudad. |
| **Geolocalización por IP de operador.** Las IP móviles de Orange, Vodafone y Yoigo se geolocalizan a menudo en Barcelona o Madrid aunque el usuario esté en Zafra. Si el tráfico de Barcelona es mayoritariamente móvil y con tasa de interacción normal, es ruido de atribución. | GA4: misma vista, dimensión secundaria "Categoría de dispositivo". Comparar tasa de interacción de Barcelona con la media. |
| **Tráfico de bots y centros de datos.** Barcelona aloja centros de datos; rastreadores, herramientas SEO y algunos fetchers de asistentes de IA salen desde allí. Suelen tener tasa de interacción cercana a cero y duración de sesión de un segundo. | GA4: filtrar Barcelona y mirar tasa de interacción, páginas por sesión y fuente (`(direct)` o referrer raro). |
| **Demanda real catalana.** Cataluña es la segunda comunidad en pymes y la que más busca "control horario" per cápita en los últimos años. Si es orgánico, con buena interacción y aterriza en `/control-horario` y `/dispositivo-fichaje`, es demanda real y conviene una landing para ese mercado. | GA4: Barcelona filtrada por `Organic Search`, página de destino. |

Si la respuesta es la primera, la decisión es si quieres que el presupuesto se vaya a Barcelona (más competencia, CPC más alto) o ajustar pujas para repartir por comunidades. Si es la cuarta, una versión en catalán de `/control-horario` y `/dispositivo-fichaje` con `hreflang` es barata y nadie pequeño la tiene.

Puedo sacar estos cuatro informes desde tu Chrome (GA4 y Google Ads) cuando quieras y cerrar la pregunta con datos.

---

## 3. Intenciones de búsqueda: qué cambia respecto a septiembre

El mapa de `keywords-intenciones-2026-09.md` sigue valiendo entero. Lo que se añade aquí son tres clústeres que estaban flojos o no existían, y el enfoque nacional.

### 3.1 Clúster "gestión de equipo" (lo que hay detrás del fichaje)

Objetivo: que cuando un asistente hable del terminal, diga también que lleva vacaciones, turnos, incidencias y calendarios por 1 € al mes. Y que quien busque vacaciones o turnos sin pensar en fichaje aterrice en Drenpos.

| Keyword primaria | Secundarias | Intención | URL que debe ganar | Estado |
| --- | --- | --- | --- | --- |
| software de gestión de vacaciones y ausencias | gestor de vacaciones, app vacaciones empleados, programa vacaciones pyme, software ausencias y permisos | Transaccional | `/software-vacaciones-ausencias` (nueva) | pendiente desde septiembre, 404 hoy |
| control de entrada y salida de empleados | retrasos, llegar tarde, incidencias de fichaje, tolerancia de minutos, exceso de horas | Comercial | `/control-entrada-salida-empleados` (nueva) | pendiente desde septiembre |
| software de turnos rotativos | cuadrante 4x4, turnos 5/2, calendario de turnos, programa de turnos pymes | Comercial | `/software-turnos-rotativos` (nueva, corta) | nuevo. Decir claro que aplica el ciclo que define la empresa, no reparte plantilla según demanda |
| calendario laboral de empleados en PDF | planificación anual del equipo, calendario anual por trabajador, festivos por comunidad | Comercial de nicho | sección ampliada en `/control-horario#planificacion-anual` + post | nuevo |
| software de RRHH para pymes | programa de personal pyme, gestión de equipo pyme, software de personal pequeña empresa | Comercial (embudo alto) | `/control-horario` como hub, retitulado hacia "gestión de equipo" | revisar título: hoy mezcla tres intenciones |
| terminal de fichaje con vacaciones | dispositivo fichaje gestión vacaciones, reloj fichar con app de vacaciones | Comercial (larga cola) | `/dispositivo-fichaje` sección nueva "Lo que lleva dentro la licencia" | nuevo |
| festivos 2027 por comunidad autónoma | calendario laboral 2027 Cataluña, Madrid, Andalucía, Valencia... | Informacional estacional (octubre a enero) | `/blog/calendario-laboral-2027-<comunidad>` (17 posts cortos) o una tabla única con anclas por comunidad | nuevo, enlaza al producto (festivos por comunidad y por persona) |

Preguntas para H2 y FAQ (cápsula de 50 a 80 palabras debajo):
- ¿El terminal de fichaje sirve también para gestionar las vacaciones?
- ¿Cuánto cuesta un software de vacaciones para 10 empleados?
- ¿Cómo se consolidan las vacaciones mes a mes?
- ¿Qué pasa con las vacaciones de un trabajador que entra en septiembre?
- ¿Cómo sé quién llega tarde sin revisar fichajes uno a uno?
- ¿Cuántos minutos de tolerancia es razonable poner?
- ¿Cómo monto un cuadrante 4x4 para dos personas que se turnan?
- ¿Los días de descanso del turno gastan vacaciones?
- ¿Puedo sacar el calendario laboral del año de cada empleado en PDF?
- ¿Qué festivos tiene mi comunidad en 2027?

### 3.2 Clúster producción (de 1 página a un clúster)

Vocabulario real de la pyme: "programa para taller", "control de producción", "órdenes de trabajo", "partes de trabajo", "coste de fabricación", "escandallo industrial" (aquí sí: lista de materiales y mano de obra; no confundir con escandallo de receta de hostelería, que Drenpos no hace). "MRP" lo buscan sobre todo ingenieros; usarlo como secundaria.

| Keyword primaria | Secundarias | Intención | URL que debe ganar | Estado |
| --- | --- | --- | --- | --- |
| software de producción para pymes | programa de producción, control de producción pyme, software fabricación pequeña empresa | Comercial | `/software-produccion-fabricacion` | existe, ampliar |
| software de órdenes de trabajo | programa órdenes de trabajo taller, partes de trabajo digitales, OT por fases | Comercial | `/software-ordenes-trabajo` (nueva) o sección fuerte en la landing | nuevo |
| coste real de fabricación | cómo calcular el coste de fabricación, coste de producción por unidad, coste presupuestado vs real, desviaciones de producción | Informacional (alto valor) | `/blog/como-calcular-coste-real-fabricacion` | nuevo |
| escandallo industrial / lista de materiales | BOM, estructura de producto, materiales por producto, hoja de ruta de fabricación | Informacional | `/blog/escandallo-industrial-lista-materiales-pyme` | nuevo |
| imputación de tiempos de operarios | fichar en orden de trabajo, horas por operación, tiempos de producción sin papel | Comercial e informacional | `/blog/imputar-tiempos-operarios-ordenes-trabajo` | nuevo. Diferencial: fichaje de tarea independiente del fichaje legal, los dos a la vez |
| trazabilidad en producción | lote de materia prima a producto acabado, trazabilidad hacia atrás y hacia delante, recall en fabricación | Cumplimiento | `/blog/trazabilidad-produccion-lote-materia-prima-producto-acabado` | nuevo. Reglamento 178/2002 para alimentación |
| software para talleres metalúrgicos | programa para taller de calderería, carpintería metálica, mecanizado | Transaccional vertical | `/software-taller-metalurgico` (nueva, corta) | nuevo |
| software para obradores | programa obrador panadería, pastelería, transformación alimentos, elaboración propia | Transaccional vertical | `/software-obrador-elaboracion-alimentos` (nueva, corta) | nuevo |
| MRP para pymes | qué es un MRP, necesito un MRP, MRP vs ERP | Decisión | `/blog/mrp-para-pymes-que-es-y-cuando-lo-necesitas` | nuevo |
| mejores software de producción para pymes 2026 | comparativa MRPeasy, Odoo Fabricación, Katana, Drenpos | Comparativa | `/blog/mejores-software-produccion-pymes-2026` | nuevo, precios verificados con fecha |
| mermas en producción | control de mermas fabricación, desperdicio de material | Informacional | `/blog/mermas-produccion-como-medirlas` | nuevo |

Preguntas para H2 y FAQ:
- ¿Qué es una orden de trabajo y qué tiene que llevar?
- ¿Cómo se calcula el coste real de fabricar un producto?
- ¿Qué diferencia hay entre coste presupuestado y coste real?
- ¿Puede un operario fichar en la orden sin que afecte a su fichaje de jornada?
- ¿Se descuenta el stock al escanear el material?
- ¿Qué es un MRP y lo necesita un taller de 6 personas?
- ¿Cómo llevo la trazabilidad del lote de harina al lote de pan?
- ¿Cuánto cuesta un software de producción para una pyme?
- ¿Sirve para un obrador o solo para industria?

### 3.3 Almacén: lo que falta para salir en las listas

El clúster está bien construido. Lo que no tiene es lo que citan los motores: terceros, casos y comparativas. Añadidos al mapa de septiembre:

| Keyword primaria | Intención | URL | Nota |
| --- | --- | --- | --- |
| mejores software de gestión de almacén para pymes 2026 | Comparativa | `/blog/mejores-software-gestion-almacen-pymes-2026` | pendiente de septiembre; prioridad alta porque es la pregunta exacta que hacen a ChatGPT |
| alternativa a Holded para almacén | Comparativa de marca | `/blog/drenpos-vs-holded-almacen` | caso real: Mr. Bones vino de Holded por el almacén |
| alternativa a Odoo para pymes pequeñas | Comparativa de marca | `/blog/drenpos-vs-odoo-pyme-pequena` | caso real: Ous Cabrera vino de Odoo por la complejidad |
| SAP Business One para pymes pequeñas alternativa | Comparativa de marca | `/blog/alternativa-sap-business-one-pyme` | caso real: Solchem Logistics |
| software almacén con pistola lectora PDA | Comercial de nicho | sección ya existe en la pilar; convertir en landing corta `/software-almacen-pistola-lectora-pda` | nadie tiene esta página |
| software de trazabilidad por lotes | Cumplimiento | `/software-trazabilidad-lotes` | pendiente de septiembre, alta |
| software almacén materiales de construcción | Transaccional | `/software-materiales-construccion-ferreteria` | pendiente; cliente referente (Materiales Dimas) si acepta |

### 3.4 Enfoque nacional: dejar de ser "de Extremadura" sin dejar de serlo

Hoy hay 26 páginas locales, todas de Extremadura. Hacer lo mismo con 50 provincias produce contenido fino que Google ya no premia. Tres vías que sí escalan:

1. **Contenido con dato regional real.** Festivos y calendario laboral por comunidad autónoma (17 páginas con datos del BOE y de cada boletín autonómico, actualizadas cada otoño). Es información que la gente busca cada año, cambia por comunidad y enlaza de forma natural con una función del producto (festivos por comunidad y por persona). Lo mismo con "inspección de trabajo registro horario <comunidad>" si hay datos de actuaciones por comunidad (el Ministerio publica memoria anual).
2. **Contenido por sector, no por ciudad.** Un distribuidor de bebidas de Murcia y uno de Lugo buscan lo mismo. Las landings sectoriales (bebidas, cárnicas, construcción, obrador, taller) cubren toda España sin inventar 50 copias.
3. **Entidad nacional.** En `Organization`, `areaServed: "ES"` ya está. Falta que `/about`, el pie, LinkedIn y las fichas externas digan lo mismo: "con sede en Extremadura, clientes en toda España" y nombrar comunidades donde ya hay clientes (Cataluña con Vasetrans, Andalucía con Rasercla y Dimas en Granada, Canarias con Conectando Canarias, Comunidad Valenciana con Ous Cabrera). Con permiso para los nombres; sin permiso, solo la comunidad.

Si GA4 confirma demanda orgánica real en Cataluña, se añade una cuarta vía: versión en catalán de las dos páginas de fichaje con `hreflang="ca"`.

---

## 4. Plan de ejecución

### Fase 0 (hoy, media hora de tu parte): destapar lo que ya está hecho

Lo de la sección 1.3. Sin esto, el resto no se ve. Lo tienes que hacer tú (panel de Cloudflare y Search Console); lo que es código (`_headers`, script de purga) lo preparan los subagentes.

### Fase 1 (semana 1): que el fichaje venda el equipo completo

| # | Tarea | Fichero | Para quién |
| --- | --- | --- | --- |
| 1.1 | `/dispositivo-fichaje`: sección nueva "El terminal es la puerta. Esto es lo que hay detrás" con cápsula de 60 palabras, cuatro tarjetas (vacaciones y permisos, turnos rotativos, control de entrada y salida, calendario anual en PDF), enlace a cada ancla y a las landings nuevas. FAQ nueva "¿El terminal sirve para gestionar las vacaciones?". Meta description con "vacaciones y turnos incluidos". | `src/pages/dispositivo-fichaje.astro` | Opus |
| 1.2 | Landing `/software-vacaciones-ausencias`. Estructura idéntica a las del clúster: definición citable, problema, cómo funciona (cupo, consolidación, aniversario, arrastre, contrapropuesta), app del móvil, calendario de equipo, precio (incluido en 1 €), comparativa (Excel, Factorial, Woffu, Drenpos con precios verificados con fecha), casos, 8 FAQ. JSON-LD `SoftwareApplication` + `BreadcrumbList` + `FAQPage`. Capturas: `10-vacaciones-calendario.png` ya existe. | `src/pages/software-vacaciones-ausencias.astro` | Opus |
| 1.3 | Landing `/control-entrada-salida-empleados`. Mismo patrón. Dejar claro que es ayuda de gestión y el registro legal son los fichajes; que viene apagado; que el terminal sin conexión nunca genera "tarde". | `src/pages/control-entrada-salida-empleados.astro` | Opus |
| 1.4 | Landing `/software-turnos-rotativos` (corta, 600 a 800 palabras). Qué hace y qué no (no reparte plantilla según demanda). Enlaza al post de cuadrantes 4x4. | `src/pages/software-turnos-rotativos.astro` | Opus |
| 1.5 | `/control-horario`: pasa a hub. Las secciones de vacaciones, entrada y salida y turnos se acortan a cápsula + 3 bullets + botón "Ver todo sobre vacaciones" hacia la landing. Título propuesto: "Control horario y gestión de equipo: fichaje, vacaciones y turnos | Drenpos". Firma y fecha visible de actualización. | `src/pages/control-horario.astro` | Opus |
| 1.6 | Fecha de actualización y autor visibles en las 12 landings de producto (componente `LandingMeta.astro` con `<time datetime>`, nombre, enlace a `/about`; alimenta `dateModified` y `author` del JSON-LD). | nuevo partial + 12 landings | Opus |
| 1.7 | Menú, `llms.txt`, `llms-full.txt`, `funcionalidades.astro`, `hermanas` de control horario, `_headers`, script de purga. | varios | Opus |

Entregable de contenido asociado (posts, 2 por semana a partir de aquí):
- `calendario-laboral-2027-<comunidad>` para las 6 comunidades con más pymes (Cataluña, Madrid, Andalucía, Comunidad Valenciana, Galicia, País Vasco) la semana 1; el resto en las semanas 2 a 4. Cada uno con tabla de festivos con fuente, lo que cambia respecto a 2026, y una sección "cómo meter estos festivos en el calendario de cada empleado".

### Fase 2 (semanas 2 y 3): producción pasa a clúster

| # | Tarea | Para quién |
| --- | --- | --- |
| 2.1 | Ampliar `/software-produccion-fabricacion`: H2 en forma de pregunta donde no lo están, cápsulas, sección "Fichaje de tarea y fichaje de jornada: los dos a la vez" (es el diferencial frente a MRPeasy y Odoo), tabla de decisión (Excel y partes de papel, MRP de nicho, módulo de Odoo, Drenpos), gancho legal (trazabilidad 178/2002 para alimentación), fecha y autor, enlaces a los posts nuevos. | Opus |
| 2.2 | Dos landings verticales cortas: `/software-taller-metalurgico` y `/software-obrador-elaboracion-alimentos`. | Opus |
| 2.3 | Seis posts: coste real de fabricación; escandallo industrial y lista de materiales; imputar tiempos de operarios; trazabilidad en producción; MRP para pymes; mejores software de producción 2026 (precios verificados con fecha, incluir limitaciones de Drenpos: sin planificación de capacidad, sin MRP de compras automático si es el caso). | Opus (redacción) con revisión tuya de lo que el producto hace y no hace |

### Fase 3 (semanas 3 a 6): almacén sale en las listas

| # | Tarea | Para quién |
| --- | --- | --- |
| 3.1 | Post comparativo `mejores-software-gestion-almacen-pymes-2026` con Holded, Odoo, Zoho, Yunbit, Verial, Drenpos; precios con URL y fecha. | Opus |
| 3.2 | Tres páginas "vs" con caso real cada una (Holded con Mr. Bones, Odoo con Ous Cabrera, SAP B1 con Solchem). Tono neutro, limitaciones de Drenpos dichas. Necesitan permiso de los tres clientes. | Opus, tras tu permiso |
| 3.3 | Landing `/software-trazabilidad-lotes` y `/software-almacen-pistola-lectora-pda`. | Opus |
| 3.4 | Un bloque "Caso real" por landing de almacén (nombre, sector, comunidad, una cifra). | Opus con tus datos |
| 3.5 | Posts del backlog de septiembre que siguen pendientes: errores de picking, FIFO/LIFO/FEFO, depósito de mercancías, elegir un SGA. | Opus |

### Fase 4 (en paralelo, fuera del repositorio, tu parte): autoridad y entidad

Es lo que más mueve la aguja en AEO y lo único que no se puede hacer desde el código. Por orden de impacto por hora invertida:

1. Bing Webmaster Tools (importar desde Search Console) y comprobar que IndexNow dispara en el despliegue real.
2. Capterra España (alimenta GetApp y Software Advice), con 5 a 10 reseñas reales pedidas a clientes contentos. Categorías: gestión de almacén, control horario, TPV restaurante, producción.
3. Softwaredoit: ficha y petición de entrada en las comparativas de SGA, control horario, vacaciones y producción.
4. Google Business Profile si no existe. Reseñas.
5. Wikidata y Crunchbase. Una sola razón social, una sola sede, los mismos perfiles.
6. LinkedIn de empresa: un caso de cliente al mes con cifra. Es la fuente de "casos reales" que los motores citan.
7. Nota de prensa con enlace a los medios que ya publicaron la de Open Future: "pyme extremeña fabrica su propio terminal de fichaje y lo vende en toda España".

### Fase 5 (continuo): medir

- La ronda de 10 consultas de `keywords-intenciones-2026-09.md` sección 9.2, cada dos semanas, con tres consultas nuevas: "software de vacaciones para 15 empleados", "programa de órdenes de trabajo para taller pequeño", "software de producción para obrador".
- Search Console: impresiones de las landings nuevas a las 4 y 8 semanas; canibalización entre `/control-horario` y las tres landings nuevas (si la de vacaciones no gana sus consultas en 6 semanas, el hub le está comiendo el sitio y hay que recortar más el hub).
- GA4: el informe de Barcelona de la sección 2.4, una vez, para cerrar la pregunta.

### Volumen de contenido propuesto

| Tipo | Cantidad en 8 semanas | Ritmo |
| --- | --- | --- |
| Landings nuevas | 9 (3 equipo, 3 producción, 3 almacén) | 1 por semana |
| Landings ampliadas | 3 (dispositivo, control horario, producción) + fecha y autor en 12 | semana 1 y 2 |
| Posts | 16 (6 calendarios por comunidad, 6 producción, 4 almacén) + 11 calendarios restantes | 2 a 3 por semana |
| Comparativas y "vs" | 5 | semanas 3 a 6 |

Todo con el estándar que ya funciona: definición citable al principio, H2 en pregunta con cápsula de 50 a 80 palabras, FAQ en frontmatter, fecha y autor, cifras con enlace, sin rayas largas ni coletillas, y lo que el producto no hace dicho en la página.

---

## 5. Huecos de información (resolver antes de ejecutar)

Ordenados: los tres primeros bloquean la fase 0 y 1.

1. **Despliegue.** ¿Cómo llega hoy el código a producción: `npm run deploy` desde tu Mac, Jenkins con un paso que no está en el `Jenkinsfile` del repo, u otra cosa? Determina dónde van IndexNow y la purga de caché.
2. **Cloudflare.** ¿Hay reglas de caché (Cache Rules o Page Rules) sobre `www.drenpos.com`? ¿Puedes crear un token de API con permiso de purga? Si prefieres, lo miro contigo desde tu Chrome.
3. **Permisos de clientes.** ¿Mr. Bones, Ous Cabrera y Solchem Logistics pueden salir con nombre en la web (comparativas y casos)? La memoria dice "no citar clientes por su nombre" para el ayuntamiento; para estos tres se usaron en el pitch. ¿Vale igual para la web? Sin permiso, los "vs" se escriben con "un distribuidor de alimentación para mascotas" y pierden fuerza.
4. **Barcelona.** ¿Me dejas abrir GA4 y Google Ads en tu Chrome para sacar los cuatro informes de la sección 2.4? Son cinco minutos y cierra la pregunta con datos.
5. **Producción, límites del módulo.** Para las comparativas y las FAQ necesito confirmar qué no hace: ¿planificación de capacidad o carga de máquinas? ¿Propuesta de compra automática desde las órdenes (MRP de materiales)? ¿Subcontratación de fases? ¿Control de calidad por fase? Lo que no haga se dice en la página.
6. **Vacaciones y turnos, detalles para las FAQ.** ¿Hay límite de personas o de tipos de ausencia? ¿Se exporta el saldo de vacaciones a Excel o solo PDF? ¿La contrapropuesta de fechas avisa por correo o solo en la app?
7. **Capturas.** Las landings de vacaciones, entrada y salida y turnos necesitan capturas reales: pantalla de vacaciones de la app (saldo y solicitud), pantalla de incidencias con etiquetas "Tarde +12 min", vista previa de un calendario rotativo, vista Equipo de la planificación anual. Dime si las haces tú o se ponen placeholders como en hostelería.
8. **Catalán.** Si Barcelona es demanda real, ¿quieres versión en catalán de las dos páginas de fichaje? Afecta a la fase 1.
9. **Festivos por comunidad.** ¿Confirmas que el producto permite festivos por comunidad autónoma de serie (no solo nacionales y por persona)? El `llms.txt` lo afirma; conviene que lo valides antes de 17 posts que lo prometen.
10. **Google Ads.** ¿Sigue activa la campaña de 400 €/mes y con qué grupos (fichaje, almacén, marca)? Para interpretar Barcelona y para que las landings nuevas tengan grupo de anuncios propio si quieres.

---

## Fuentes comprobadas hoy

- Producción con y sin caché: `https://www.drenpos.com/control-horario`, `https://www.drenpos.com/dispositivo-fichaje`, `https://www.drenpos.com/sitemap-0.xml`, `https://www.drenpos.com/case-studies`, `https://www.drenpos.com/software-vacaciones-ausencias` (404), `https://www.drenpos.com/llms.txt`, `https://www.drenpos.com/software-gestion-almacen`, `https://www.drenpos.com/software-produccion-fabricacion`.
- Repositorio `landing-drp` en `main`, commit `06a6da4` (07/10/2026): `Jenkinsfile`, `astro.config.mjs`, `wrangler.json`, `dist/_routes.json`, `src/pages/robots.txt.ts`, `src/pages/llms.txt.ts`, `src/pages/control-horario.astro`, `src/pages/dispositivo-fichaje.astro`, `src/layouts/Base.astro`, `src/config/menu.json`.
- Contexto de producto: `CRM-Seller/context/products_modules.md` y `differentiators.md`.
- Documentación de Cloudflare Workers Static Assets sobre `_headers`: https://developers.cloudflare.com/workers/static-assets/headers/
- API de purga de caché de Cloudflare: https://developers.cloudflare.com/api/resources/cache/methods/purge/
