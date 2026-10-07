# Datos reales de GA4 y Search Console (7 de octubre de 2026)

Lectura hecha desde el navegador de Alonso con su sesión abierta. Complementa `plan-seo-aeo-2026-10-07-equipo-almacen-produccion.md` (sección 2.4, Barcelona) y cambia algunas prioridades. Cifras exactas tal como las mostraban las dos herramientas; no hay estimaciones.

## 1. GA4 (propiedad Drenpos Tech, S.L., 7 de septiembre al 7 de octubre de 2026)

| Métrica | Valor |
| --- | --- |
| Usuarios activos (30 días) | 205 |
| Sesiones (30 días) | 363 |
| Sesiones con interacción | 215 (59,23 %) |
| Eventos clave configurados | 0 |

### 1.1 Sesiones por fuente y medio (30 días)

| Fuente / medio | Sesiones | % | Tiempo medio de interacción |
| --- | --- | --- | --- |
| google / organic | 122 | 33,6 % | 41 s |
| (direct) / (none) | 107 | 29,5 % | 21 s |
| fb / paid | 39 | 10,7 % | 38 s |
| bing / organic | 36 | 9,9 % | 1 min 06 s |
| chatgpt.com / ai-assistant | 31 | 8,5 % | 1 min 39 s |
| ig / social | 11 | 3,0 % | 24 s |
| ig / paid | 5 | 1,4 % | 3 min 01 s |
| google / cpc | 2 | 0,6 % | 29 s |

Lo que dice esto:

- **ChatGPT ya es el cuarto canal real** y el que más tiempo de interacción trae (1 min 39 s frente a 41 s de Google). 31 sesiones al mes con el contenido antiguo en caché. Es la confirmación de que el AEO funciona y de que merece el esfuerzo.
- **Bing trae casi lo mismo que ChatGPT** y con buena interacción. Dar de alta Bing Webmaster Tools es obligatorio: ChatGPT y Copilot beben de ahí.
- **Google Ads casi no existe** (2 sesiones). La campaña de 400 €/mes de septiembre no está gastando o no está activa. El tráfico pagado real es Meta (fb e ig paid: 44 sesiones).
- **(direct) 29 %** con 21 segundos de interacción: parte es tráfico sin atribución por el consentimiento denegado por defecto y parte bots.

### 1.2 Usuarios por ciudad (30 días)

| Ciudad | Usuarios |
| --- | --- |
| (not set) | 179 (87,3 %) |
| (vacío) | 11 |
| San Miguel | 4 |
| Atlanta | 2 |
| Almendralejo, Amsterdam, Bayan Lepas, Buenos Aires, Caracas, Donostia | 1 cada una |

**Barcelona no aparece en GA4.** El 87 % de los usuarios no tiene ciudad porque el Consent Mode v2 está en "denegado" por defecto y casi nadie acepta las cookies: GA4 no recibe geolocalización fina. GA4 no sirve para saber de dónde viene la gente mientras siga así. La afirmación "estamos llegando sobre todo a Barcelona" no sale de GA4; con casi toda seguridad sale del gestor de anuncios de Meta (fb / ig paid), que reparte el alcance por población cuando la campaña es "toda España". Pendiente de confirmar con Alonso dónde lo ha visto.

### 1.3 Páginas más vistas (últimos 7 días)

| Página | Vistas |
| --- | --- |
| Home | 85 |
| DeCA: documento de control del transporte digital | 37 |
| Control horario | 10 |
| Precios | 8 |
| Contacto | 5 |
| Dispositivo de fichaje | 2 |

DeCA ha funcionado como noticia (obligatorio desde el 5/10). El post de Verifactu aplazado debería hacer lo mismo esta semana.

### 1.4 Configuración pendiente en GA4

- **Cero eventos clave.** Los eventos de conversión del `dataLayer` (`docs/gtm-conversiones.md`) no están marcados como eventos clave en GA4: no se mide ninguna demo ni contacto. Hay que marcar como evento clave el envío del formulario de demo y el clic en WhatsApp. GA4 ya sugiere `generate_lead` en `/contact`.
- **Search Console sin vincular** a GA4 (la propia GA4 lo recomienda; la propiedad es `sc-domain:drenpos.com`). Vincularla da el informe de consultas orgánicas dentro de GA4.

## 2. Search Console (dominio drenpos.com, 5 de julio al 4 de octubre de 2026, búsqueda web)

| Métrica | Valor |
| --- | --- |
| Clics | 175 |
| Impresiones | 11.200 |
| CTR medio | 1,6 % |
| Posición media | 25,9 |
| Consultas distintas | 668 |
| Páginas con impresiones | 119 |

Las impresiones suben desde finales de agosto (de unas 50 al día a 200 o 300). Los clics no acompañan: la web aparece en la página 2 y 3 para casi todo.

### 2.1 Consultas (3 meses)

| Consulta | Clics | Impresiones |
| --- | --- | --- |
| drenpos | 96 | 156 |
| preparación de pedidos picking | 1 | 54 |
| erp para pymes: cuándo dejar de usar excel | 0 | 221 |
| software gestion tienda | 0 | 138 |
| software monitorización supermercados badajoz | 0 | 132 |
| software para supermercados | 0 | 132 |
| desfichar | 0 | 131 |
| programas para tiendas | 0 | 80 |
| software para tiendas de congelados | 0 | 70 |
| software gestión vallas precio | 0 | 68 |
| software retail con trazabilidad unitaria | 0 | 65 |
| software gestion almacen | 0 | 57 |
| pos de almacén | 0 | 53 |
| etiqueta sscc | 0 | 42 |
| hiopos go verifactu | 0 | 40 |
| software gestión de almacenes barcelona | 0 | 36 |
| comprar software sga | 0 | 35 |
| software control horario madrid | 0 | 26 |
| software verifactu badajoz | 0 | 28 |
| enviar facturas por whatsapp | 0 | 28 |

Y unas cuarenta variantes de "programa / software de gestión tienda de recambios / repuestos" con 24 a 37 impresiones cada una y 0 clics.

Lo que dice esto:

1. **96 de los 175 clics son la marca.** El tráfico orgánico no de marca de Google en tres meses son 2 clics. Google todavía no es un canal; ChatGPT y Bing sí.
2. **El clúster de tienda y recambios es el mayor hueco de la web.** Google ya nos enseña para "software gestión tienda", "programa gestión tienda de recambios" y decenas de variantes (en conjunto, más de 1.500 impresiones), pero en posición 20 a 40 y con `/software-almacen-tienda` como página de destino, que no habla de recambios. Una landing `/software-tienda-recambios` (o `/software-tiendas-recambios-repuestos`) con el vocabulario exacto de esas consultas tiene demanda demostrada. No estaba en el plan de septiembre ni en el de hoy: hay que meterla en la fase 1 o 2.
3. **"desfichar" tiene 131 impresiones.** Nadie busca eso en una landing de producto: es la palabra que la gente usa para "fichar la salida". Un post corto "Qué es desfichar y cómo se hace" con enlace al control horario captura una consulta que ya tenemos.
4. **Supermercados.** Las páginas locales de "monitorización de supermercados" dan unas 400 impresiones sin clics. Son contenido de la época de Extremadura y no corresponden a un producto activo; decidir si se reescriben hacia "software para supermercados y tiendas de alimentación" (hay demanda) o se dejan.
5. **Control horario en Google casi no aparece.** Solo "software control horario madrid" (26) y "desfichar". El fichaje funciona en los asistentes de IA, no en Google. Las landings nuevas de equipo deben pensarse para los dos.
6. **Barcelona en Search Console:** 6 consultas, 84 impresiones, 0 clics, posición 56. Todas de almacén e inventario ("software gestión de almacenes barcelona", "software para inventarios de almacen barcelona"). Google nos asocia con "almacén" lo bastante para enseñarnos en consultas con ciudad, pero en la página 6. No explica el "mucho tráfico de Barcelona".

### 2.2 Páginas (3 meses)

| Página | Clics | Impresiones | CTR |
| --- | --- | --- | --- |
| / | 125 | 518 | 24 % (marca) |
| /software-almacen-tienda | 9 | 3.946 | 0,2 % |
| /control-horario | 8 | 743 | 1,1 % |
| /blog/preparacion-de-pedidos-picking-almacen | 4 | 1.226 | 0,3 % |
| /software-gestion-almacen | 4 | 985 | 0,4 % |
| /blog/ayuda-innovacion-abierta-extremadura-2026 | 4 | 326 | 1,2 % |
| /blog/etiqueta-sscc-gs1-palets | 3 | 367 | 0,8 % |
| /local | 3 | 88 | |
| /blog/erp-para-pymes-vs-excel | 2 | 397 | 0,5 % |
| /blog/deca-documento-control-transporte-digital-5-octubre-2026 | 2 | 234 | 0,9 % |

`/software-almacen-tienda` es la página con más impresiones de todo el sitio (3.946) y un CTR del 0,2 %. Dos causas: posición media baja (página 2 y 3) y título que no coincide con lo que busca la gente (buscan "tienda de recambios", "programa para tienda", y el título habla de "almacén y tienda"). Es la optimización on-page con más retorno inmediato de toda la web.

## 3. Qué cambia en el plan

| Cambio | Fase |
| --- | --- |
| Nueva landing `/software-tienda-recambios` (recambios, repuestos, autopartes: stock por referencia, equivalencias, mostrador, pistola). Demanda demostrada: más de 1.500 impresiones al trimestre. Cliente potencial de referencia: Materiales Dimas no (es construcción), pero Dimas sí vende a mostrador. | Fase 1 (semana 2), por delante de producción |
| Retocar título, H1 y primer párrafo de `/software-almacen-tienda` hacia "programa de gestión para tiendas" y añadir sección de recambios y alimentación. Enlazar a la landing nueva. | Fase 1, inmediato |
| Post "Qué significa desfichar y cómo se hace bien" enlazando a `/control-horario` y al dispositivo. | Fase 1, 400 palabras |
| Decidir qué hacer con las 8 páginas locales de "monitorización de supermercados". | Decisión de Alonso |
| Bing Webmaster Tools pasa de "recomendable" a prioritario: Bing es el 10 % del tráfico y alimenta a ChatGPT. | Hoy |
| Marcar eventos clave en GA4 (demo, WhatsApp, contacto). Sin esto no se puede medir nada de lo que hagamos. | Hoy, 10 minutos |
| Vincular Search Console con GA4. | Hoy, 1 minuto |
| Barcelona: confirmar que el dato viene de Meta Ads. Si es así, la decisión es de segmentación de la campaña, no de SEO. | Pregunta a Alonso |

## 4. Consultas de control para la próxima lectura (en 4 semanas)

- Impresiones y posición de `/software-almacen-tienda` para "software gestion tienda" y "programa gestion tienda recambios".
- Clics no de marca (hoy: 2 en 3 meses).
- Sesiones desde chatgpt.com, perplexity.ai y claude.ai (hoy: 31, 0 visibles, 0 visibles).
- Impresiones de las tres landings nuevas de equipo y del hub de control horario.
- "desfichar": si el post sale, clics.

## 5. Hecho a las 22:00 del 7 de octubre (desde el navegador de Alonso)

| Acción | Estado | Detalle |
| --- | --- | --- |
| GA4, eventos clave | Hecho | `form_submit` (medición mejorada, cubre el formulario de demo y el de contacto) marcado como evento clave. Evento nuevo `whatsapp_click` creado como evento clave con la regla `event_name = click` y `link_url contiene wa.me`, copiando los parámetros del evento de origen. Los eventos del `dataLayer` (`demo_form_submit`, `contact_form_sent`, `phone_click`, etc.) NO llegan a GA4: GTM solo tiene las etiquetas de Ads, no etiquetas de evento GA4. Pendiente opcional: crear esas etiquetas en GTM para tener `interest` y `page` como parámetros, o un evento `phone_click` en GA4 con `link_url contiene tel:`. |
| GA4, Search Console | Hecho | Vinculación creada: propiedad `drenpos.com` (dominio) con el flujo web Drenpos (ID 12127058344). Los informes "Consultas de búsqueda orgánica" tardan un día en aparecer. |
| Bing Webmaster Tools | Ya estaba | El sitio `drenpos.com/` ya está dado de alta. Últimos 3 meses: 35 clics y 517 impresiones. Sitemaps `sitemap-index.xml` y `sitemap-0.xml` enviados hoy, 161 URLs descubiertas (todavía el sitemap antiguo en caché; cuando Bing vuelva a leerlo verá las 178). Recomendaciones de Bing: descripciones y títulos cortos o repetidos, pocos enlaces entrantes. |
| IndexNow | Funciona | El build de producción envía IndexNow en cada despliegue: hoy 317 URLs a las 17:57, y envíos en todas las fechas de despliegue desde julio. Queda invalidada la hipótesis del plan de que no se disparaba. |
| Search Console, indexación manual | Hecho (5 de 8) | Solicitada para `/software-vacaciones-ausencias`, `/control-entrada-salida-empleados`, `/software-turnos-rotativos` (las tres "no reconocidas" por Google hasta hoy), `/control-horario` y `/dispositivo-fichaje`. Pendientes hasta que se despliegue la segunda tanda: `/software-tienda-recambios`, `/software-almacen-tienda`, `/blog/que-es-desfichar-como-se-hace`. |

### 5.1 Hallazgo nuevo: cobertura de indexación en Google

Informe "Indexación de páginas" a 4/10/2026: **151 indexadas, 138 sin indexar**.

| Motivo | Páginas | Qué es |
| --- | --- | --- |
| Página con redirección | 44 | Casi seguro URLs con barra final o rutas antiguas que redirigen. Normal, pero conviene revisar la lista por si hay enlaces internos que apunten a la versión que redirige. |
| Descubierta: actualmente sin indexar | 24 | Google conoce la URL pero no la ha rastreado. **`/dispositivo-fichaje` estaba aquí**: la página que más citan los asistentes de IA no estaba en Google. Indexación solicitada hoy. |
| Rastreada: actualmente sin indexar | 23 | Google la leyó y decidió no indexarla (contenido fino o duplicado). Sacar la lista y ver si son las páginas plantilla antiguas o páginas locales. |
| No se ha encontrado (404) | 18 | Las páginas plantilla borradas (case-studies, careers...) y rutas antiguas. Se irán solas. |
| Página alternativa con canónica adecuada | 18 | Normal. |
| Error de redirección | 4 | Revisar: bucles o cadenas. |
| Duplicada, Google eligió otra canónica | 4 | Revisar cuáles. |
| Duplicada sin canónica | 2 | Revisar. |
| Indexada sin contenido | 1 | Google indexó una URL vacía. Localizarla. |

Para la próxima sesión: exportar las listas de "Rastreada sin indexar", "Descubierta sin indexar", "Error de redirección" y "Duplicada" y decidir página a página.
