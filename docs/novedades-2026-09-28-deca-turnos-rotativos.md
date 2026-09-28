# Landing Drenpos, 28/09/2026: DeCA, turnos rotativos, planificación anual y guion de vídeo

Estado: cambios hechos en el repo, `npx astro build` pasa (EXIT 0, seoGraph sin enlaces rotos en 156 páginas, 235 bloques JSON-LD válidos, 49 FAQPage, H1 único). Revisión de contenido por un agente independiente: 8,5/10. Sin commit.

## 1. Qué se ha detectado como nuevo en `context/`

- DeCA: documento electrónico de control administrativo del transporte, obligatorio desde el 5 de octubre de 2026, generado desde el albarán de venta con botón, PDF con QR, versiones con historial, incluido en el módulo Financiero sin coste.
- Control horario: calendarios rotativos (4/4, 5/2, 6/3, noches) con primer día del ciclo por persona, calendarios permanentes con copia de festivos de un año al siguiente, calendario nacional más autonómico, planificación anual del equipo con PDF por trabajador, conceptos con uno por defecto y concepto por lector, aprobación sin auto-aprobarse, app PWA mejorada, informes que guardan si contaba como trabajo, página de primeros pasos con ayuda.
- Costes, márgenes y cuadro de mando de almacén: retirados de `products_modules.md` porque no están desplegados. No se han publicado.

Decisiones tomadas contigo: precios web sin cambios (1 €/usuario/mes y terminal desde 140 €; la promo de 3 € + 0,90 € + 130 € queda en ofertas privadas), DeCA con landing y post, guion de vídeo solo para DeCA, sin nombres de clientes en la web, corrección del `obligaciones_legales.md` del CRM.

## 2. Qué se ha cambiado

### DeCA (transporte)

- Landing nueva `/documento-control-transporte-deca`: definición citable con las tres normas enlazadas al BOE (Orden FOM/2861/2012 BOE-A-2013-154, Ley 9/2025 BOE-A-2025-24545 DT octava, Resolución de 5 de junio de 2026 BOE-A-2026-12784), qué exige la Resolución, tabla del art. 6 con quién responde de cada dato, cómo se genera en Drenpos en 6 pasos, obligados y excluidos, sanciones LOTT (401 a 600 € por expedición), comparativa con plataformas de pago (tarifas con fuente, sin nombrar marcas), cifras del sector con fuente, 3 casos, precio desde 19 €/mes, `DemoForm interes="deca"`, 10 FAQ, JSON-LD completo. En el menú Funcionalidades junto a Verifactu.
- Post `/blog/deca-documento-control-transporte-digital-5-octubre-2026`: guía para cargadores y pequeños transportistas, 6 tablas, checklist previo al 5/10, 7 FAQ, aviso fechado.
- Secciones nuevas: `/software-gestion-almacen#deca`, `/software-preparacion-pedidos-picking#expedicion-deca`, frase en `/software-almacen-frigorifico`, `/software-verifactu#otras-obligaciones` (DeCA, registro de jornada, trazabilidad). `funcionalidades.astro` con bloque "Facturación y cumplimiento".
- `docs/video-deca-guion-rodaje.md`: dossier de rodaje del Reel (1:23 y versión de 28 s, 17 planos, shot list por setup, B-roll, rótulos, subtítulos, copies por canal, checklist de grabación con móvil).

### Control horario

- `/control-horario`: `#calendarios` ampliado (8 tarjetas), bloque `#turnos-rotativos` con tabla 4/4 de dos personas y nota legal, sección nueva `#planificacion-anual` (vistas Equipo y Persona, PDF por trabajador, art. 34.6 ET y convenio estatal de seguridad privada 2026-2030 BOE-A-2026-8569), bloques `#primeros-pasos` y `#conceptos` (concepto por defecto, concepto por lector, app), caso de vigilantes 4/4, 5 FAQ nuevas, JSON-LD y `meta_title` nuevos.
- `/dispositivo-fichaje`: concepto por lector (puerta «Trabajo», comedor «Comida»), FAQ, ficha técnica, `additionalProperty`.
- Post `/blog/cuadrante-turnos-rotativos-4x4-ejemplos-estatuto`: tabla legal (arts. 34, 36, 37 ET y art. 19 RD 1561/1995), tres cuadrantes con tabla, cuenta para cubrir 24/7, cómo se hace en Drenpos y lo que no hace, cifra INSST (23 % a turnos) con URL.
- Refrescados con `updated: 2026-09-28`: `calendario-laboral-2027-festivos-horas-extra`, `gestion-vacaciones-permisos-pymes-sin-excel`, `control-horario-hosteleria-turnos-partidos`, `fichar-desde-el-movil-legal-2026`.

### Capa para IA

- `llms.txt.ts` y `llms-full.txt.ts`: novedades del 28/09, DeCA como cuarta obligación legal con fuentes, intenciones nuevas, 8 datos citables con URL, FAQ nuevas, páginas nuevas.
- `Base.astro`: `featureList` y `knowsAbout` ampliados. `modules.md`, `faq.md`, `menu.json`, `CLAUDE.md` (lista de landings de cumplimiento), `PLAN-SEO-GEO-2026-09.md` (tanda 5).

### CRM-Seller

- `context/obligaciones_legales.md` corregido: régimen vigente del registro de jornada separado del proyecto de real decreto (con fecha 28/09/2026), sin "homologado", sin multa por trabajador como vigente, Verifactu con 1/1/2027 y 1/7/2027, línea "Cómo hablar de esto con el cliente" y bloque "Fechas a vigilar". Secciones de trazabilidad y DeCA sin cambios.

## 3. Capturas (opcionales, con guard, no rompen nada)

| Ruta dentro de `public/` | Tamaño | Qué debe verse |
| --- | --- | --- |
| `images/funcionalidades/deca/01-albaran-activar-deca.png` | 1280×800 | Albarán de venta con el botón «Activar DeCA» y los datos del transportista (datos ficticios) |
| `images/funcionalidades/deca/02-pdf-control-qr.png` | 1280×800 | PDF generado con la página de control rotulada y el QR |
| `images/funcionalidades/control-horario/13-planificacion-anual-equipo.png` | 1280×800 | Planificación anual, vista Equipo, con la leyenda de colores |

Las dos del DeCA merecen la pena: la landing enseña hoy un esquema HTML en el hero y usa la portada de SSCC como imagen OG. Portadas propias pendientes para los dos posts nuevos (1200×675, vía script de Pexels desde terminal local).

## 4. Confirmar antes de publicar

1. Versiones del DeCA: el contexto dice "versión nueva con la misma dirección web". La Resolución solo mantiene la URL si es el mismo PDF con los datos antiguos marcados como no válidos dentro de él. Confirma que el PDF de Drenpos lo hace así; landing, post y guion dicen "mismo QR".
2. Que Drenpos cumple los requisitos técnicos de la Resolución que la web solo explica como norma (PDF de 5 MB como máximo, metadatos de creación y modificación, URL https que no caduca antes de terminar el servicio).
3. Albarán: el peso del documento sale de los artículos y el transportista por defecto del cliente entra solo. Las salidas de depósito del frigorífico se documentan con albarán de venta.
4. Turnos: el calendario rotativo admite horarios distintos por día del ciclo (el ejemplo 5/2 del post lo usa); el terminal del comedor cierra el concepto anterior; "calendarios rotativos y planificación anual incluidos sin coste extra".
5. Cuentas de horas del post de turnos (42 h/semana en 4x4 de 12 h, 4,2 y 4,9 personas para 24/7): correctas, pero conviene que las valide una asesoría laboral.
6. Guion: el QR de demo del vídeo se puede escanear; decide si se pixela. No publicar el vídeo hasta que la landing esté desplegada.
7. `DemoForm` envía ahora `interes=deca`: el flujo de n8n debe aceptarlo.
8. Enlaces con `nofollow` a dos plataformas DeCA de pago como fuente de tarifas (controldigitaltransporte.es y pretiumgestion.com).
9. Tras desplegar: pedir en Search Console la indexación de `/documento-control-transporte-deca`, del post del DeCA y del post de turnos antes del 5 de octubre, y comprobar que `www.drenpos.com/llms.txt` es el documento redactado (empieza por "# Drenpos" y la línea de entidad).

## 5. Fuentes principales

- Ley 9/2025, de Movilidad Sostenible: https://www.boe.es/diario_boe/txt.php?id=BOE-A-2025-24545
- Resolución de 5 de junio de 2026 (requisitos técnicos del DeCA): https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-12784
- Orden FOM/2861/2012: https://www.boe.es/buscar/act.php?id=BOE-A-2013-154
- LOTT (Ley 16/1987): https://www.boe.es/buscar/act.php?id=BOE-A-1987-17803
- Estatuto de los Trabajadores: https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430
- RD 1561/1995: https://www.boe.es/buscar/act.php?id=BOE-A-1995-21346
- Convenio estatal de seguridad privada 2026-2030: https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-8569
- INSST, trabajo a turnos: https://www.insst.es/el-observatorio/indicadores-evolutivos/condiciones-de-trabajo/trabajo-a-turnos
- El resto (cifras del sector del transporte, tarifas de plataformas, FAQ del Ministerio) está enlazado en cada página y en las notas de investigación.
