# Medición y conversiones de Google Ads en drenpos.com

Este documento describe qué eventos empuja la web al `dataLayer`, cómo montar en Google Tag Manager los activadores y las etiquetas de conversión de Google Ads, y cómo dejar bien la medición entre `www.drenpos.com` y `contract.drenpos.com`.

El contenedor de la web es **GTM-PDNNFZ98**. Se carga desde `src/layouts/Base.astro`, con Consent Mode v2 en modo denegado por defecto y el banner de vanilla-cookieconsent actualizando el consentimiento. Eso no se toca: las conversiones de Ads funcionan igual, con modelado de conversiones cuando el usuario no acepta.

## Eventos que emite la web

Todos los eventos llevan siempre el parámetro `page`, que es `location.pathname` en el momento del clic o del envío.

| Evento | Cuándo se dispara | Parámetros | Dónde está el código |
| --- | --- | --- | --- |
| `demo_form_submit` | El visitante envía el formulario de demo embebido en una landing, justo antes de mandar los datos al webhook | `interest` (almacen, fichaje, tpv, hosteleria, verifactu, mcp, todo), `page` | `src/layouts/partials/DemoForm.astro` |
| `contact_form_submit` | El visitante envía el formulario de `/contact` y reCAPTCHA ya ha validado | `interest`, `page` | `src/pages/contact.astro` |
| `contact_form_sent` | La página `/contact` se carga con `?sended=true`, es decir, el webhook aceptó el envío. Se empuja una sola vez por sesión | `page` | `src/pages/contact.astro` |
| `whatsapp_click` | Clic en cualquier enlace que empiece por `https://wa.me` (botón flotante, botones dentro del formulario de demo, enlaces sueltos) | `page` | `src/layouts/Base.astro` |
| `phone_click` | Clic en cualquier enlace `tel:` | `page` | `src/layouts/Base.astro` |
| `signup_click` | Clic en cualquier enlace hacia `contract.drenpos.com` (el botón "Acceder" de la cabecera y los CTA de alta) | `page` | `src/layouts/Base.astro` |
| `calendly_click` | Clic en cualquier enlace hacia `calendly.com` | `page` | `src/layouts/Base.astro` |

El script de `Base.astro` delega el clic en `document` en fase de captura, así que también recoge los enlaces que se añadan más adelante sin tocar nada.

### Atribución guardada en el navegador

El mismo script global guarda en `localStorage`, bajo la clave `drp_attr`, los parámetros de campaña que traiga la URL: `gclid`, `gbraid`, `wbraid`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, más un `ts` con la fecha de captura y la `landing` de entrada. Se conserva 90 días y una visita sin `gclid` nunca pisa una atribución de pago anterior.

Los dos formularios leen esa clave y mandan `gclid`, `utm_source`, `utm_medium`, `utm_campaign` y `source_page` al webhook de n8n. Así, cuando el comercial cierra una venta, en n8n queda el `gclid` con el que se puede subir una conversión offline a Google Ads si algún día interesa.

## Variables a crear en GTM

En Variables, crea una variable de capa de datos por cada parámetro que quieras usar:

- `dlv - interest`, nombre de variable de capa de datos `interest`, versión 2.
- `dlv - page`, nombre de variable de capa de datos `page`, versión 2.

Con eso basta. El resto de la información (URL, referente, etc.) la aportan las variables integradas de GTM, que conviene activar: Click URL, Click Element, Page Path y Page Hostname.

## Activadores

Crea un activador de tipo **Evento personalizado** por cada evento de la tabla. El nombre del evento se escribe tal cual, sin expresión regular:

- Demo enviada: evento `demo_form_submit`.
- Contacto enviado: evento `contact_form_submit`.
- Contacto confirmado: evento `contact_form_sent`.
- Clic WhatsApp: evento `whatsapp_click`.
- Clic teléfono: evento `phone_click`.
- Clic alta: evento `signup_click`.
- Clic Calendly: evento `calendly_click`.

Si quieres separar campañas por producto, duplica el activador de `demo_form_submit` y añade la condición `dlv - interest` igual a `almacen`, `hosteleria` o el valor que toque. Es preferible tener una sola conversión "Demo" y segmentar después en Ads con el parámetro, salvo que vayas a pujar de forma distinta por cada línea de producto.

## Etiquetas de conversión de Google Ads

Antes de tocar GTM, en Google Ads ve a Objetivos, Conversiones, Nueva acción de conversión, tipo Sitio web, y créalas manualmente (opción "añadir manualmente con código"). Apunta el ID de conversión (`AW-XXXXXXXXX`) y la etiqueta de conversión de cada una.

Acciones de conversión recomendadas:

| Acción en Ads | Categoría | Valor | Recuento | Evento de GTM |
| --- | --- | --- | --- | --- |
| Demo solicitada | Enviar formulario de posible cliente | Valor fijo, por ejemplo 40 € | Una | `demo_form_submit` |
| Contacto enviado | Enviar formulario de posible cliente | Valor fijo, por ejemplo 25 € | Una | `contact_form_sent` |
| Clic en WhatsApp | Contactar | Valor fijo, por ejemplo 10 € | Una | `whatsapp_click` |
| Clic en teléfono | Contactar | Valor fijo, por ejemplo 10 € | Una | `phone_click` |
| Inicio de alta | Otra | Sin valor, secundaria | Una | `signup_click` |

Marca como conversión principal (la que optimiza la puja) solo "Demo solicitada" y "Contacto enviado". Las demás déjalas como secundarias: sirven para leer el comportamiento, pero si pujas por clics en WhatsApp acabas comprando tráfico que escribe y no compra.

El valor en euros no tiene que ser el ticket real. Es una forma de decirle a Ads qué conversión vale más que otra. Un criterio sencillo es estimar el margen del primer año por lead y aplicarle la tasa de cierre.

### Montaje en GTM

1. Crea una sola etiqueta **Etiqueta de Google** con el ID `AW-XXXXXXXXX`, activada en Inicialización del consentimiento o en All Pages. Es la que carga gtag y la que hace el enlace entre dominios.
2. Por cada acción de conversión, crea una etiqueta **Conversión de Google Ads** con su ID de conversión y su etiqueta de conversión, y asígnale el activador correspondiente.
3. En cada etiqueta de conversión, en Configuración avanzada, Configuración de consentimiento, deja "No se establecen comprobaciones de consentimiento adicionales". El Consent Mode ya está gobernando el comportamiento desde la plantilla de Google, y añadir comprobaciones extra aquí bloquearía también el modelado.
4. Si quieres pasar el interés a Ads, añade en la etiqueta de conversión de la demo un parámetro personalizado con la variable `dlv - interest`. No sustituye a la segmentación por campaña, pero ayuda a leer los informes.
5. Publica el contenedor con un nombre de versión que diga qué cambia, por ejemplo "Conversiones Ads: demo, contacto, WhatsApp y teléfono".

### Comprobación antes de publicar

Entra en Vista previa de GTM y repasa esta lista:

- Cargar una landing con `?gclid=test123&utm_source=google&utm_medium=cpc&utm_campaign=prueba` y comprobar en la consola que `localStorage.drp_attr` tiene esos valores.
- Enviar el formulario de demo y ver `demo_form_submit` en el resumen de eventos, con `interest` relleno.
- Pulsar el botón flotante de WhatsApp y ver `whatsapp_click`.
- Enviar el formulario de `/contact` y ver `contact_form_submit` y, al volver con `?sended=true`, `contact_form_sent`.
- Recargar `/contact?sended=true`: `contact_form_sent` no debe volver a dispararse en la misma sesión.
- Aceptar y rechazar cookies en el banner y comprobar que en ambos casos el evento llega al `dataLayer`, aunque con consentimiento denegado la etiqueta de conversión se envíe en modo modelado.

Ten en cuenta que el formulario de demo se manda con `fetch` en modo `no-cors`: el navegador no deja leer la respuesta, así que el evento se empuja al `dataLayer` justo antes del envío. Si n8n estuviera caído, la conversión se contaría igual. Para descartarlo, compara de vez en cuando el número de conversiones en Ads con las filas que llegan a n8n.

## Medición entre dominios con contract.drenpos.com

El alta y la contratación viven en `contract.drenpos.com`, que es otro proyecto: el repositorio **Contratacion-Front**. Si no se enlazan los dos dominios, Google Ads pierde el rastro del usuario al saltar de la web al alta y esa conversión se atribuye a "directo".

Pasos:

1. **Instalar el mismo contenedor GTM-PDNNFZ98 en Contratacion-Front**, con el snippet de `<head>` y el `<noscript>` del `<body>`, igual que en la web. Es el mismo contenedor, no uno nuevo: así las etiquetas y el enlazador se comparten.
2. Llevar también el bloque de Consent Mode v2 por defecto denegado y el banner de cookies, para que el consentimiento sea coherente en los dos dominios.
3. En GTM, abrir la etiqueta **Etiqueta de Google** (`AW-XXXXXXXXX`), ir a Configuración, Ajustes de configuración, y añadir el ajuste de dominios de enlace (`linker`) con la lista `drenpos.com` y `contract.drenpos.com`. Al indicar el dominio raíz se cubren también los subdominios `www` y `carta`.
4. Si además tienes una propiedad de Google Analytics 4, añade en su configuración de flujo de datos, dentro de Ajustes de etiqueta, Configurar dominios, esos mismos dos dominios, y en la lista de exclusión de referencias añade `contract.drenpos.com` para que el salto no cuente como sesión nueva.
5. Comprobar que funciona: pulsa un botón "Acceder" desde la web y mira la URL de destino. Debe llegar con un parámetro `_gl` largo. Si no aparece, el enlazador no está activo o la etiqueta de Google no se ha cargado en el momento del clic.
6. Si la conversión real (el alta completada o el pago) se va a medir en `contract.drenpos.com`, crea allí una acción de conversión distinta, por ejemplo "Alta completada", y dispárala con un evento propio del `dataLayer` de ese repositorio. Con el enlazador ya puesto, Ads la atribuirá a la campaña que trajo la visita a la web.

Mientras el alta no tenga su propia conversión medida, `signup_click` es la señal más cercana al negocio que tenemos en la web, pero es solo un clic: no confirma que nadie haya completado el alta. Conviene resolver el punto 6 en cuanto se pueda tocar Contratacion-Front.

## Conversiones offline con el gclid

Los formularios ya mandan el `gclid` a n8n. Cuando el CRM marque un lead como cliente, se puede exportar un CSV con las columnas `Google Click ID`, `Conversion Name`, `Conversion Time` y `Conversion Value` y subirlo en Google Ads, en Objetivos, Conversiones, Cargas. Eso le enseña a Ads qué leads acabaron en venta y mejora las campañas de puja automática mucho más que optimizar por formularios enviados.

Para que funcione hay que crear antes una acción de conversión de tipo "Importar, desde clics" con el mismo nombre que se use en el CSV.
