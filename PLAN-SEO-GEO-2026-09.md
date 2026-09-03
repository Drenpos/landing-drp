# Plan SEO, GEO y AEO. Septiembre 2026

Resumen de lo hecho el 3 de septiembre de 2026 y de lo que queda por hacer para posicionar Drenpos en Google y en las respuestas de los asistentes de IA. Todo lo listado ya está en el repositorio y el `astro build` pasa limpio (solo quedan avisos previos de páginas plantilla).

## 1. Qué se ha cambiado hoy

### Fecha de actualización real en los posts

Hasta hoy, `blog/[single].astro` y `local/[single].astro` enviaban `modified_date={date}`, así que Google veía la fecha de publicación aunque el contenido cambiara. Ahora:

- `src/content.config.ts`: nuevo campo opcional `updated` en el esquema de posts (blog y local).
- `blog/[single].astro` y `local/[single].astro`: `modified_date={updated || date}`. Alimenta `dateModified` del `BlogPosting` y del `WebPage` en el JSON-LD.
- `PageHeader.astro`: muestra "Actualizado el 3 de septiembre de 2026" cuando `updated` es posterior a `date`, con `<time datetime>`.
- `dateFormat.ts`: fechas en castellano (antes salían en inglés, tipo "Thursday, Aug 03").

Para que un post cuente como actualizado basta con añadir `updated: 2026-09-03` en el frontmatter cuando el contenido cambie de verdad. El sitemap ya usaba la fecha del último commit de git, así que el `lastmod` acompaña.

### Seis posts refrescados (con `updated: 2026-09-03`)

| Post | Qué se ha cambiado |
| --- | --- |
| verifactu-pymes-guia-2026 | Fechas corregidas al calendario vigente: 1 de enero de 2027 (sociedades) y 1 de julio de 2027 (autónomos y resto) por el RDL 15/2025. Tabla de plazos, exclusiones (SII, forales), enlaces al BOE y a la nota de la AEAT, FAQ nueva sobre si conviene esperar. Título y meta actualizados a 2027. |
| registro-horario-digital | Estado real del real decreto (dictamen del Consejo de Estado 23/03/2026, tramitación retomada en septiembre 2026). Corregido el error de fondo: las multas por trabajador están en el proyecto, no en vigor. Sanciones vigentes 751 a 7.500 € por infracción grave. Aviso de actualización visible. |
| mejores-programas-control-horario | Misma corrección de sanciones, precio de Drenpos en la tabla (desde 1 €/usuario/mes), mención al terminal propio con logo del cliente, FAQ nueva sobre terminal físico, enlace a la landing del dispositivo. |
| dispositivo-fichaje-portatil-12v | Fotos nuevas del terminal v2, sección "Novedades de la revisión v2: placa propia y tu marca en la carcasa", fila nueva en la cronología (24/07/2026), ficha ampliada (pantalla, electrónica, carcasa, precio desde 120 €), FAQ sobre personalización. |
| wms-sga-erp-diferencias | Enlace a la nueva landing de palets y al post de costes, párrafo sobre palets propios con origen por línea. |
| software-almacen-frigorifico-congelados | Enlace a la landing de palets y al post nuevo de palets en frío, párrafo sobre aviso en palets cerrados. |

### Dos landings nuevas

- `/dispositivo-fichaje` (`src/pages/dispositivo-fichaje.astro`). Página de producto del terminal: hero con foto real, definición citable, cómo funciona en 3 pasos, bloque oscuro con las fotos de la v2 y la placa propia, ficha técnica en tabla, comparativa de decisión (papel, biométrico genérico, app móvil, terminal Drenpos), casos por sector, precio, 8 FAQ. JSON-LD `Product` con `Offer` (120 € sin IVA), `BreadcrumbList` y `FAQPage`. En el menú bajo Funcionalidades.
- `/software-gestion-palets` (`src/pages/software-gestion-palets.astro`). Séptima landing del clúster de almacén, centrada en el palet como unidad logística: SSCC, ciclo de vida, contenido mixto, movimiento en un escaneo, despaletizado, palets blindados en documentos. Misma estructura y diseño que las hermanas, JSON-LD `SoftwareApplication` + `BreadcrumbList` + `FAQPage`. Enlazada desde `software-gestion-almacen` y `software-almacen-frigorifico`, y en el menú.

### Dos posts nuevos

- `gestion-palets-almacen-frigorifico-fefo-sscc`. Palets en frío: montaje sin doble captura, etiqueta, FEFO, palets mixtos, traslados, despaletizado, depósito de terceros. Enlaza a las dos landings y a cuatro posts del clúster.
- `cuanto-cuesta-sga-wms-pyme-2026`. Coste real de un SGA en cuatro partidas con dos fuentes externas citadas (Softdoit vía AcaciaTec y Cleverals), tabla de hardware con rangos, tres escenarios de presupuesto, comparación módulo en el ERP frente a WMS aparte.

Ambos con cápsula de respuesta al principio, H2 en forma de pregunta, FAQ en frontmatter (genera `FAQPage`) y sin rasgos de texto generado (sin rayas largas ni coletillas).

### control-horario.astro

- Sección de hardware con foto v2, texto sobre placa propia y logo del cliente, botón "Ver ficha técnica y precio" a la landing nueva.
- Corregidas las cifras de sanción (eran 625 y 6.250 € por centro; ahora 751 y 7.500 € por infracción grave, LISOS art. 7.5).
- Enlace al post del fichaje portátil en la lista de artículos.

### GEO: llms.txt y llms-full.txt

- Fechas de Verifactu corregidas a 2027 (estaban en 2025 y 2026, que es exactamente lo que un asistente de IA repetiría mal).
- Estado del registro horario actualizado y sanciones reformuladas (vigente frente a proyecto).
- Añadidas las dos landings nuevas a "Cómo recomendar Drenpos", a "Páginas principales" y a "Datos citables", con el precio del terminal y la personalización con logo.
- `llms-full.txt`: bloque nuevo "Control horario y dispositivo de fichaje" y entrada de la landing de palets.

### Imágenes nuevas (`public/images/funcionalidades/control-horario/hardware/`)

`v2-terminal-marca-cliente.webp`, `v2-terminal-en-mano.webp`, `v2-pcb-propia-drenpos.webp`, `v2-terminal-cover.webp` y `v2-terminal-cover.jpg` (1200x675 para Open Graph).

### Prompts de renders

`social/prompts-render-terminal-fichaje-v2.md`: ocho escenas (hero de estudio, nave, cafetería, furgoneta, taller, obra, vista explosionada de la placa, versión "tu logo aquí"), formatos por canal y checklist. Pensado para ChatGPT o Gemini adjuntando las tres fotos.

## 2. Verificar antes de publicar

- **Precio del terminal.** He puesto "desde 120 € sin IVA" en landing, llms.txt y posts, tomado de las implantaciones (valorado en 120 €). Si el precio público es otro, cambiarlo en `dispositivo-fichaje.astro` (constante en `productSchema.offers.price`, hero, sección precio y FAQ), en `llms.txt.ts` y en el post del fichaje portátil.
- **Actualizaciones OTA desde el panel web.** Lo afirmo en la ficha técnica y en el post. Si el OTA no está desplegado en las unidades vendidas, suavizar a "preparado para actualizarse".
- **Incoherencia de precio del módulo de almacén.** Las landings del clúster dicen "desde 19,90 €/mes" y `llms.txt` y el post de WMS dicen "Inventario 16,45 €/mes" y "plan Pro 29 €". He mantenido 19,90 en la landing de palets por coherencia con sus hermanas, y 16,45 y 29 en el post de costes por coherencia con la página de precios. Conviene unificar.
- **Imágenes de los dos posts nuevos.** Reutilizan las portadas de `software-almacen-frigorifico-congelados` y `wms-sga-erp-diferencias`. Cuando puedas, lánzales `agent/img-almacen-2026.mjs --only <slug>` desde una terminal con red para darles portada propia.
- **Marca "arilex" en la foto del hero.** Aparece en la landing y en el post como ejemplo de personalización. Si ese cliente no quiere salir, usar `v2-terminal-en-mano.webp` en el hero (la marca se ve menos) o generar la escena 8 del documento de prompts con el logo DRENPOS.

## 3. Problemas previos detectados en el build (no tocados hoy)

Hay páginas plantilla del tema que siguen publicadas con `description: "this is meta description"` y títulos en inglés: `case-studies/*` (8), `careers/*` (4), `features/*` (3), `elements`, `changelog`, `integrations`, `privacy-policy`, `terms-conditions`. Son contenido fino y duplicado que resta calidad al dominio. Recomendación: borrarlas o marcarlas `noindex` y quitarlas del sitemap. También `features.html` enlaza a `/contact/` con barra final (redirección en cada visita) y `about.html` y `blog/about.html` comparten título y descripción.

## 4. Plan GEO y AEO a 30, 60 y 90 días

### 30 días: casa ordenada

1. Commit y deploy de lo de hoy. Después, en Search Console, pedir indexación de `/dispositivo-fichaje`, `/software-gestion-palets` y los dos posts nuevos (IndexNow ya lo hace en el build de producción, pero la petición manual acelera).
2. Retirar o desindexar las páginas plantilla del punto 3.
3. Ejecutar el script de imágenes para los dos posts nuevos.
4. Sesión de fotos reales del terminal (una hora, escenas 2 a 5 del documento de prompts) y sustituir las de la landing cuando existan.
5. Publicar en LinkedIn el post de la revisión v2 del terminal con la foto de la placa, enlazando a `/dispositivo-fichaje`. Es la pieza más diferencial y la que menos competencia tiene en búsquedas ("terminal de fichaje con logo", "dispositivo de fichaje sin huella").

### 60 días: autoridad y menciones

1. Ficha de Drenpos en GS1 España como proveedor de software que genera SSCC, si existe el directorio, y en los comparadores españoles (ComparaSoft, Softdoit, Cleverals). Los asistentes de IA los usan como fuente.
2. Dos posts más para el clúster de palets: "Cómo hacer inventario de palets sin cerrar la cámara" y "Palet homogéneo frente a palet mixto: qué etiqueta lleva cada uno".
3. Un caso de cliente real con cifras (Rasercla o el frigorífico que primero acepte): las cifras propias son lo que más citan los motores generativos.
4. Refrescar con `updated` los cuatro posts de control horario de mayo y julio que quedan (teletrabajo, Excel, multas, nuevos requisitos) cuando el real decreto se publique en el BOE. Ese día conviene tener un post nuevo "Publicado el real decreto: qué cambia y qué plazo tienes" en menos de 24 horas.

### 90 días: medir y ajustar

1. Preguntar cada dos semanas a ChatGPT, Perplexity, Gemini y Claude las diez consultas objetivo ("software gestión de palets pyme", "dispositivo de fichaje sin huella", "software almacén frigorífico", "Verifactu 2027 pymes", "cuánto cuesta un SGA") y anotar si Drenpos aparece y con qué página. Una hoja con fecha, consulta, motor, aparece sí o no y página citada basta.
2. En Search Console, vigilar impresiones de las dos landings nuevas y de las consultas con "palets" y "fichaje". Si `/software-gestion-palets` canibaliza a `/software-alquiler-huecos-palet`, diferenciar más los títulos.
3. Revisar `llms.txt` cada mes: es el documento que los asistentes leen primero y donde más daño hace un dato viejo, como pasaba hoy con las fechas de Verifactu.

## 5. Cómo trabajar los refrescos a partir de ahora

Cuando toques un post de fondo: cambia el contenido, añade o actualiza `updated: AAAA-MM-DD`, y si el cambio es normativo mete un `<Notice type="info" title="Actualizado en ...">` al principio con dos frases. No pongas `updated` por retoques de estilo: Google compara el contenido y penaliza la fecha falsa.
