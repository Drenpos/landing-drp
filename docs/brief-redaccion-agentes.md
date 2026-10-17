# Brief común para los agentes de contenido (17 de octubre de 2026)

Plan general: `docs/plan-contenidos-2026-10-17.md`. Léelo antes de empezar.

## Dónde trabajas
- El repo está en el Mac de Alonso. Se accede con la herramienta `mcp__remote-devices__device_bash` en `$HOME/mnt/landing-drp` (en el Mac: `/Users/abp/Documents/Proyectos/DRP/landing-drp`).
- La verdad del producto está en `$HOME/mnt/context/` (`products_modules.md`, `pricing.md`, `differentiators.md`). Léelos. **No inventes funcionalidades.** Si dudas de que algo exista, no lo afirmes y anótalo en tu informe final.
- Cada llamada a device_bash es un `bash -c` nuevo. Escribe ficheros con heredoc o con un script corto de python que lea y reescriba. No puedes borrar ficheros (rm falla). No hagas commits.
- **No ejecutes `npm run build`** ni `astro build`: hay otros agentes trabajando a la vez. La validación final la hace un agente de integración.
- No toques ficheros que no sean de tu encargo. **No edites `llms.txt.ts` ni `llms-full.txt.ts`** salvo que tu encargo lo diga.

## Antes de escribir
- Lee `CLAUDE.md`, `src/content.config.ts` (esquema del blog) y un post de referencia: `src/content/blog/cuadrante-turnos-rotativos-4x4-ejemplos-estatuto.md`. Copia su estructura de frontmatter (title, meta_title, description, date, categories, tags, author, image, draft, faqs si existe...).
- Para landings, mira cómo usan `LandingMeta` y las props `published_date`, `modified_date`, `author` de `<Base>`.

## Estilo (obligatorio)
- Español de España, tono de alguien que lleva años con ERP y almacenes y habla claro a un dueño de pyme. Frases cortas, ejemplos concretos con números.
- **Prohibido el carácter de raya larga (—) y la raya media (–) como puntuación.** Usa punto, coma, dos puntos o paréntesis. Comprueba con grep al terminar.
- Sin coletillas de IA: nada de "en el mundo actual", "en definitiva", "no es solo X, es Y", "sin más dilación", "descubre", "potencia", "revoluciona", "clave" como muletilla, listas de tres adjetivos, cierres motivacionales.
- Estructura AEO: H2 en forma de pregunta real; justo debajo, un párrafo de 50 a 80 palabras que responde solo; luego el detalle. Al menos una tabla. Bloque de preguntas frecuentes (en `faqs` del frontmatter si el esquema lo tiene, si no al final).
- Un solo H1 (el title). `meta_title` máx. 60 caracteres, `description` 140 a 160, únicos.
- Fecha `date: 2026-10-17` en los nuevos. Autor: el mismo que usan los posts recientes (Alonso Bermejo Pérez).
- Enlaces internos: 3 a 6 por post, a landings del pilar y posts relacionados. Solo a URLs que existan o a las de la lista de slugs planificados de abajo. Rutas sin barra final y sin `.html`.

## Datos que no se pueden equivocar
- Precios públicos sin IVA: fichaje 1 €/usuario/mes; terminal desde 140 €. El resto, exactamente como en `pricing.md` y en las landings. No menciones el conector de Holded como precio.
- **Ningún nombre de cliente.** Ejemplos genéricos ("un distribuidor de bebidas de 12 personas").
- Todo dato legal o de fecha (BOE, boletines autonómicos, AEPD, plazos) se verifica en la web con WebSearch/WebFetch y se enlaza a la fuente oficial. Escribe "a fecha de 17 de octubre de 2026" cuando el estado pueda cambiar.
- Del terminal de fichaje: ficha con llavero RFID, tarjeta o QR; no usa huella ni cara. No lo presentes como carencia: si sale, explica que así no se tratan datos biométricos (categoría especial para la AEPD).

## Slugs planificados (existirán al terminar; puedes enlazarlos)
Logística: `/blog/software-deca-comparativa-pymes`, `/blog/como-generar-deca-desde-albaran`, `/blog/deca-quien-lo-emite-cargador-transportista`, `/blog/deca-vs-ecmr-diferencias`
Almacén: `/blog/codificar-ubicaciones-almacen`, `/blog/inventario-ciclico-almacen`, `/blog/recepcion-mercancia-almacen`, `/blog/stock-minimo-punto-de-pedido`, `/blog/fifo-fefo-lifo-almacen`
Producción: `/blog/ordenes-de-fabricacion-pyme-sin-excel`, `/blog/escandallo-lista-materiales-coste-fabricacion`, `/blog/trazabilidad-lotes-produccion`, `/blog/kits-packs-montables-stock-componentes`, `/blog/produccion-obrador-industria-alimentaria`
Fichajes: `/blog/calendario-laboral-2027-extremadura`, `/blog/calendario-laboral-2027-andalucia`, `/blog/calendario-laboral-2027-madrid`, `/blog/calendario-laboral-2027-cataluna`, `/blog/calendario-laboral-2027-comunidad-valenciana`, `/blog/calendario-laboral-2027-castilla-y-leon`, `/blog/fichar-con-huella-aepd-alternativas`, `/blog/control-horario-almacenes-naves-turnos`, `/blog/registro-jornada-seguridad-privada-cuadrante-anual`
Tienda: `/blog/stock-tienda-recambios-sin-tecdoc`

(Los calendarios solo existirán si la comunidad ya publicó su calendario 2027; el agente que los escribe te dirá cuáles. Si enlazas a uno, enlaza mejor al general `/blog/calendario-laboral-2027-festivos-horas-extra`.)

## Al terminar
- `grep -n '—\|–'` sobre tus ficheros: cero resultados.
- Informe final breve: ficheros creados o cambiados, afirmaciones que no pudiste verificar, huecos de información.
