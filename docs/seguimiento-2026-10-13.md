# Seguimiento SEO / AEO: 13 de octubre de 2026 (6 días después del despliegue)

Lectura hecha desde el navegador de Alonso. Base de comparación: `datos-ga4-gsc-2026-10-07.md`. Search Console va con dos o tres días de retraso: sus datos llegan hasta el 10 de octubre, es decir, solo tres días completos con el contenido nuevo.

## 1. Search Console, 4 al 10 de octubre (7 días)

| Métrica | 7 días (4 a 10 oct) | Media semanal del trimestre anterior | Lectura |
| --- | --- | --- | --- |
| Clics | 44 | 13 | x3 |
| Impresiones | 2.520 | 860 | x3 |
| CTR | 1,7 % | 1,6 % | igual |
| Posición media | 12,7 | 25,9 | de página 3 a página 1 y 2 |
| Clics de marca ("drenpos") | 14 | 7 | x2 |
| Clics NO de marca | 30 | menos de 1 (2 en todo el trimestre) | es el dato |
| Consultas distintas | 401 en 7 días | 668 en 90 días | |

La posición media baja de 25,9 a 12,7 porque las páginas nuevas entran directamente en posiciones altas para consultas de cola larga, no porque las viejas hayan subido 13 puestos. Aun así, la dirección es la buena.

### Páginas con más actividad (7 días)

| Página | Clics | Impresiones | Nota |
| --- | --- | --- | --- |
| / | 21 | 60 | marca |
| /software-preparacion-pedidos-picking | 4 | 53 | |
| /blog/deca-documento-control-transporte-digital-5-octubre-2026 | 3 | 287 | pico por la fecha del 5/10 |
| /blog/preparacion-de-pedidos-picking-almacen | 2 | 429 | |
| /blog/etiqueta-sscc-gs1-palets | 2 | 125 | |
| **/software-turnos-rotativos** | **2** | **114** | nueva el 7/10: indexada y con clics en 3 días |
| **/software-tienda-recambios** | **1** | **578** | nueva el 7/10: ya es la página con más impresiones del sitio después del post de picking |
| /control-horario | 1 | 92 | |
| /software-gestion-almacen | 1 | 65 | |
| /blog/cuanto-cuesta-tpv-bar-restaurante-2026 | 1 | 33 | |

### Consultas (7 días)

| Consulta | Clics | Impresiones |
| --- | --- | --- |
| drenpos | 14 | 21 |
| **desfichar** | **1** | 9 | post publicado el 7/10, ya trae clic |
| verifactu aplazado | 1 | 3 |
| erp para pymes: cuándo dejar de usar excel | 0 | 19 |
| preparación de pedidos picking | 0 | 19 |
| software gestion tienda | 0 | 18 |
| picking y preparacion de pedidos | 0 | 17 |
| preparacion de pedidos | 0 | 15 |
| sistema de preparación de pedidos | 0 | 15 |
| etiqueta sscc | 0 | 14 |

## 2. GA4, 6 al 13 de octubre

| Canal | Sesiones (8 días) | Semana anterior | Variación |
| --- | --- | --- | --- |
| Organic Search (Google) | 79 | 48 | +65 % |
| Direct | 31 | 38 | -18 % |
| Bing organic | 13 | 9 | +44 % |
| ChatGPT | 4 | 9 | -55 % |
| Meta paid (fb e ig) | 0 | 32 | campaña parada |
| **Total** | **117** | | |

- Usuarios activos 51, un 43 % menos que la semana anterior: es el efecto de parar Meta Ads (32 sesiones pagadas desaparecen). El tráfico que queda es el que vale: orgánico de Google y Bing.
- Página de precios: 42 vistas, +367 % respecto a la semana anterior. La gente que llega ahora mira precios.
- Dispositivo de fichaje: 8 vistas (+167 %). Alquiler de huecos de palet: 9 vistas (+800 %).
- ChatGPT baja a 4 sesiones. Con 4 datos no es tendencia; los asistentes tardan en volver a leer las páginas. Dato a vigilar el 21 de octubre.
- Eventos clave: 0 en la semana. Ni `form_submit` ni `whatsapp_click` se han disparado. O no ha habido ninguna demo ni clic en WhatsApp en 117 sesiones (posible), o `form_submit` de la medición mejorada no captura el formulario de demo porque se envía por JavaScript sin `submit` nativo. Hay que comprobarlo: enviar una demo de prueba y mirar DebugView o el informe en tiempo real.

## 3. Veredicto

Vamos bien, y más rápido de lo previsto en el plan del 7 de octubre:

1. **Recambios y tienda**: era el hueco con más impresiones y 0 clics. En tres días la landing nueva tiene 578 impresiones y su primer clic. Lo que se esperaba para las semanas 3 a 6 ha empezado en la primera.
2. **Equipo**: turnos rotativos ya trae clics. Vacaciones y entrada y salida están indexadas pero aún sin aparecer en el top 10 de páginas; normal, son consultas más competidas.
3. **Clics no de marca**: de 2 por trimestre a 30 por semana. Es el cambio de fondo.
4. **Meta Ads parada**: el tráfico total baja, pero era tráfico que no convertía (0 eventos clave con 32 sesiones pagadas la semana anterior tampoco). Si se retoma, con segmentación por comunidad y hacia las landings nuevas.

Lo que no ha cambiado todavía y no tenía que cambiar: ChatGPT y Perplexity (semanas 1 a 3), conversiones medidas (hay que validar el evento del formulario).

## 4. Qué hacer esta semana

| Quién | Qué |
| --- | --- |
| Alonso | Enviar una demo de prueba desde `/control-horario` y decirme la hora: compruebo en GA4 si `form_submit` la registra. Si no, se añade un evento `demo_form_submit` vía GTM. |
| Alonso | Capturas pendientes (vacaciones, incidencias, calendario rotativo, planificación anual, app de vacaciones). Las landings de equipo salen sin imagen de producto en esas secciones. |
| Alonso | Permiso de Mr. Bones, Ous Cabrera y Solchem para los "vs". |
| Claude | Fase 2: producción (landing ampliada, 2 verticales, 6 posts) y 6 calendarios laborales 2027 por comunidad. |
| Claude | Limpieza del sitemap (tildes duplicadas) y de las 3 landings con rayas. |
| 21 de octubre | Segunda lectura completa y ronda de consultas a ChatGPT, Perplexity, Claude y Gemini. |

## 5. Añadido el 14 de octubre: agent readiness

Escáner isitagentready.com sobre drenpos.com, antes y después del deploy del commit 5b82947:

| | Antes | Después |
| --- | --- | --- |
| Puntuación | 33 | 54 |
| Nivel | 2 | 4 |

Lo que ha entrado: Markdown por negociación de contenido (`Accept: text/markdown`), cabeceras `Link` (api-catalog, ai-catalog, llms.txt, alternate .md), `/.well-known/api-catalog` (RFC 9727), `/.well-known/ai-catalog.json` (ARD), robots.txt con `Agentmap`, atributos WebMCP en los formularios.

Nota del deploy: el build automático de Workers del commit 5b82947 falló en Cloudflare con `Build failed to initialize and was timed out` (fallo de su infraestructura). Se relanzó desde el panel y desplegó en 1m21s. Si el escáner o la web no reflejan un cambio tras un push, mirar primero el historial de compilaciones del Worker.

Pendiente:
- WebMCP: el escáner sigue sin darlo por bueno. Se prepara más adelante.
- `/x.md` abierto directo en el navegador se sirve sin `charset` (tildes mal). Por negociación `Accept` sí lleva `charset=utf-8`. Corregir añadiendo `/*.md` a `run_worker_first` y fijando el content-type en el worker.
- MCP público, DNS-AID y OAuth: no aplican. El MCP de Drenpos es solo para clientes y no se publica.
