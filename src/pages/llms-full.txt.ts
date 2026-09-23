import type { APIRoute } from "astro";

export const prerender = true;
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BASE = "https://www.drenpos.com";

function readContentDir(dir: string, urlPrefix: string): string {
  const absDir = path.join(process.cwd(), "src/content", dir);
  const sections: string[] = [];
  try {
    const files = fs
      .readdirSync(absDir)
      .filter((f) => f.endsWith(".md") && !f.startsWith("-"));

    for (const f of files) {
      const raw = fs.readFileSync(path.join(absDir, f), "utf-8");
      const { data, content } = matter(raw);
      const slug = f.replace(".md", "");
      sections.push(
        `## ${data.title || slug}\n\nURL: ${BASE}/${urlPrefix}/${slug}\n\n${content.trim()}`
      );
    }
  } catch {
    // dir missing
  }
  return sections.join("\n\n---\n\n");
}

function readSectionFile(filename: string): string {
  const filePath = path.join(process.cwd(), "src/content/sections", filename);
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    return JSON.stringify(data, null, 2);
  } catch {
    return "";
  }
}

export const GET: APIRoute = () => {
  const blogContent = readContentDir("blog", "blog");
  const localContent = readContentDir("local", "local");

  const pricingData = readSectionFile("pricing.md");
  const modulesData = readSectionFile("modules.md");
  const faqData = readSectionFile("faq.md");
  const featuresData = readSectionFile("features.md");
  const featureAllIn = readSectionFile("feature-all-in-one.md");
  const plansComparison = readSectionFile("plans-comparison.md");

  const body = `# Drenpos: contenido completo para indexación LLM

Fuente: ${BASE}
Última actualización: ${new Date().toISOString().split("T")[0]}
Idioma: Español
Producto: ERP SaaS modular para pymes en España
Email: administracion@drenpos.com
Teléfono: +34 640 315 259
Razón social: Drenpos Tech SL
Sede: Solana de los Barros (Badajoz, Extremadura), España
Fundador y CEO: Alonso Bermejo Pérez (https://www.linkedin.com/in/alonso-bermejo/)
Web: www.drenpos.com

---

# Sobre Drenpos

Drenpos es una plataforma ERP SaaS de nueva generación diseñada para centralizar y optimizar las operaciones críticas de empresas españolas. Ofrece gestión de inventario multialmacén, ventas, TPV, facturación electrónica (Verifactu / AEAT), control horario laboral y módulo médico.

Propuesta de valor:
- Sistema asistido con soporte humano real
- Sin costes ocultos por volumen de uso
- Modularidad real: activa solo lo que necesitas
- Cumplimiento normativo: Verifactu (Real Decreto 1007/2023) y registro de jornada (art. 34.9 del Estatuto de los Trabajadores)
- Implantación en días, soporte humano incluido en todos los planes y suscripción plana sin permanencia

Web: ${BASE}
Contacto: ${BASE}/contact
Demo gratuita: ${BASE}/contact
Registro: https://contract.drenpos.com/auth

---

# Novedades (23 de septiembre de 2026)

## Control horario: vacaciones, entrada y salida y calendarios

Todo lo siguiente va dentro del módulo de fichajes, en la licencia de 1 €/usuario/mes sin IVA, sin coste extra. Son opciones que la empresa activa y configura cuando las necesita. Quien aprueba vacaciones o revisa incidencias necesita licencia de fichaje aunque no fiche.

- Vacaciones y permisos. Tipos de ausencia configurables por la empresa; de serie vienen vacaciones, asuntos propios, baja médica, permiso retribuido, maternidad/paternidad y fallecimiento de familiar, y se crean los que hagan falta. Cada tipo decide si cuenta en días laborables o naturales, si exige aprobación, si permite medio día, el máximo de días por solicitud, la antelación mínima y a quién aplica. Cupo con política real: días por periodo (por ejemplo 22 de vacaciones), reinicio el 1 de enero o en el aniversario de la contratación, cupo entero desde el primer día o consolidado mes a mes, prorrateo automático el año de la contratación, días que pasan al año siguiente con tope y caducidad, cupo distinto para una persona concreta y ajustes de días con motivo. El empleado pide desde el portal o desde la app del móvil sobre un calendario con sus ausencias, los festivos y los días que no trabaja; antes de enviar ve cuántos días laborables gasta y su saldo (disponibles, consolidados a hoy, arrastrados, usados y pendientes). El responsable aprueba, rechaza o propone otras fechas con un motivo, y el empleado acepta o rechaza la propuesta. Calendario del equipo para ver quién falta cada día y evitar solapes. Un día de vacaciones aprobado no exige horas y sale con su nombre en el informe; trabajar en vacaciones o en festivo cuenta como horas extra. Ejemplo: con 22 días, consolidación mensual y reinicio en el aniversario, una persona contratada en julio ve 11 días ese año. Página: ${BASE}/control-horario#vacaciones. Guía: ${BASE}/blog/gestion-vacaciones-permisos-pymes-sin-excel
- Control de entrada y salida con incidencias (opcional, viene apagado). Con la opción activa, el sistema compara cada fichaje con el horario del calendario de esa persona, con sus festivos y sus ausencias, y registra incidencias: entrada tarde, salida anticipada, no ha fichado la entrada o la salida, exceso de horas al día o a la semana y trabajo en festivo o en vacaciones. Tolerancias en minutos y límites de horas configurables. Las incidencias se detectan al fichar y en una revisión automática diaria y semanal, avisan al empleado y a los responsables, y el responsable las justifica o descarta con una nota. Cada fichaje lleva su etiqueta («Tarde +12 min», «Salió 20 min antes», «Festivo», «En vacaciones») y hay una pantalla de incidencias con filtros por persona, tipo y estado. Los fichajes con hora reconstruida por el terminal sin conexión nunca generan «tarde» ni «salida anticipada». Es una ayuda de gestión: el registro legal siguen siendo los fichajes. Ejemplo: con 5 minutos de tolerancia, quien entra a las 8:14 con horario de 8:00 genera «Entrada tarde +14 min». Página: ${BASE}/control-horario#entrada-salida. Guía: ${BASE}/blog/control-entrada-salida-retrasos-empleados
- Calendarios laborales, festivos y horas extra. Varios calendarios con horario de entrada, salida y pausa por día y fechas de vigencia (invierno, verano, turno de mañana o de tarde), uno por defecto para quien no tenga otro. Festivos nacionales, autonómicos y por persona; los fijos se marcan como recurrentes. Una pantalla con todas las personas para asignar calendarios a varias a la vez, con quien no tiene ninguno marcado en rojo. Las horas esperadas de cada día salen del calendario y de los festivos y ausencias; las extra son lo trabajado por encima de lo esperado, día a día, y la semana y el periodo son la suma de los días. El informe PDF lleva festivos del periodo, ausencias (tipo, fechas, quién aprobó y motivo), el estado de cada día y la lista de incidencias. Página: ${BASE}/control-horario#calendarios. Guía: ${BASE}/blog/calendario-laboral-2027-festivos-horas-extra
- Terminal de fichaje. Llaveros o tarjetas desconocidos en cuarentena: si alguien ficha con un llavero que aún no está asignado, el fichaje ni se pierde ni entra en falso; queda en una bandeja y se asigna a su dueño con su hora original cuando se sabe de quién era. Trazabilidad: desde Drenpos se consulta qué ha subido cada terminal y qué le ha pasado a su reloj. Página: ${BASE}/dispositivo-fichaje#sin-conexion

## Almacén: control de stock y secciones nuevas

- Página nueva de control de stock: ${BASE}/software-control-stock. Stock mínimo y máximo por artículo con notificación al salirse de ese rango; alertas de pedidos que cruzan lo vendido pendiente de servir con el stock físico; propuesta de compra asistida que combina mínimos y máximos, consumo real de los últimos meses, unidades reservadas, demanda sin stock y lo que ya viene en pedidos de compra, con el último proveedor precargado y el pedido generado con un clic (nunca compra sola); lotes y números de serie con fecha de fabricación y caducidad, alertas configurables y salida por FEFO, FIFO o LIFO; trazabilidad con informe PDF; lectura con pistola o con la cámara del móvil y QR por ubicación; formatos en jerarquía (unidad, caja, palé) con el stock en unidad base y peso y bultos de los documentos calculados; stock físico y disponible con reservas; inventarios por zonas con regularización e informe de diferencias; valoración a precio medio ponderado o manual con informes de inmovilizado, rotación y evolución del coste. Módulo de Inventario, incluido en el plan Pro (29 €/mes sin IVA, 3 usuarios).
- ¿SGA aparte o ERP con almacén?: ${BASE}/software-gestion-almacen#sga-o-erp y guía ${BASE}/blog/sga-o-erp-con-almacen-que-necesita-una-pyme. En Drenpos el control de stock y la operativa de almacén (ubicaciones, plano, rutas, oleadas, palets SSCC, depósito de terceros) son el mismo módulo de Inventario, sin integrar dos programas.
- Errores de picking: ${BASE}/software-gestion-almacen#errores-picking. Pistola lectora o PDA: ${BASE}/software-gestion-almacen#pistola-pda. Mercado del frío en España: ${BASE}/software-almacen-frigorifico#mercado-frio.
- Distribuidores de bebidas y alimentación: guía ${BASE}/blog/software-distribuidor-bebidas-cajas-palets-formatos. Venta en unidades, cajas y palés sin descuadres, stock visto en cajas y palés, peso y bultos calculados, lotes, oleadas y palets SSCC. Hoy Drenpos no hace preventa ni autoventa con tablet, planificación de rutas de reparto ni gestión de envases retornables.

Datos externos para contexto (con fuente):
- Roturas de stock: de media un 4 % de ventas perdidas, y el 72 % de las roturas nace de problemas internos de planificación (Corsten y Gruen, 2004, citado por Slimstock: https://www.slimstock.com/blog/the-hidden-cost-of-stockouts-why-retailers-cant-afford-empty-shelves/).
- Errores de preparación: pérdida media de 291.000 € por centro de distribución y 16,82 € por error, según un estudio de Intermec publicado en 2013 con 250 directores de centros de distribución de EE. UU. y Europa (centros grandes, no pymes): https://www.cadenadesuministro.es/noticias/los-errores-en-los-procesos-de-picking-originan-perdidas-de-hasta-290-000-euros-por-almacen_1053375_102.html
- Logística del frío en España: 6.000 M€ de facturación en 2025, con almacenaje y operaciones en el 20,8 % (DBK, vía Empresa Exterior: https://empresaexterior.com/la-logistica-del-frio-en-espana-supera-los-6-000-millones-de-euros-impulsada-por-el-retail-y-el-sector-farmaceutico/).

## Hostelería: precio, Verifactu y fichaje

- Cuánto cuesta un TPV para un bar: ${BASE}/software-bares-restaurantes#cuanto-cuesta y guía ${BASE}/blog/cuanto-cuesta-tpv-bar-restaurante-2026. Tarifas públicas consultadas el 23/09/2026: Last.app 50, 95 o 175 €/mes + IVA por local, con pantalla de cocina aparte (+35 €/mes por local) e instalación de 500 € + IVA (https://www.last.app/precios); Square for Restaurants 59 €/mes + IVA por punto de venta (https://squareup.com/es/es/pricing); SumUp TPV 0 € (Free) o 49 €/mes (Plus), con comisión por pago con tarjeta (https://www.sumup.com/es-es/sumup-tpv/); Holded, gema TPV 25 €/mes por tienda (https://www.holded.com/es/gemas/tpv); Numier, licencia básica de 499 a 550 € de pago único vía distribuidor (https://ventatpv.com/blog/software-numier-guia-caracteristicas-tipos-y-precios-guia-2021-n12). Drenpos: plan Full 39 €/mes sin IVA con TPV, pantallas de cocina y barra, almacén, facturación con Verifactu, 5 usuarios y fichaje para 5 personas; módulo TPV suelto 20,58 €/mes sin IVA. Funciona en el navegador, así que sirve la tablet o el ordenador que ya haya; el datáfono es el del banco del cliente.
- Verifactu en el ticket: ${BASE}/software-bares-restaurantes#verifactu-hosteleria. Cada ticket simplificado genera su registro Verifactu y su QR. Obligatorio el 1 de enero de 2027 para sociedades y el 1 de julio de 2027 para autónomos (RDL 15/2025).
- Fichaje en hostelería: ${BASE}/software-bares-restaurantes#fichaje-hosteleria y guía ${BASE}/blog/control-horario-hosteleria-turnos-partidos. El equipo ficha con llavero o tarjeta QR en el terminal de la barra (desde 140 € sin IVA, sigue fichando si se cae internet) o con la app del móvil; calendarios por turno y por temporada, festivos por comunidad, horas extra día a día, vacaciones desde el móvil y control de entrada y salida opcional. El plan Full incluye 5 personas con fichaje; cada una más, 1 €/mes sin IVA.
- Lo que Drenpos no hace hoy en hostelería: integración con plataformas de delivery (Glovo, Uber Eats, Just Eat), reservas de mesa, datáfono propio y escandallos por receta. Pedidos y pago desde la mesa en desarrollo; carta digital con alérgenos en las próximas semanas.

## Conector Holded (módulo aparte, precio a consultar)

Para quien ya lleva la contabilidad y el catálogo en Holded y no quiere moverlos, pero necesita un almacén de verdad. Cada sistema se queda con lo suyo y el conector los mantiene hablando. Solo hace falta la clave de la cuenta de Holded; no se instala nada. Todavía no tiene página propia: información en ${BASE}/contact.
- Entra desde Holded: artículos y contactos (clientes y proveedores); la primera vez se traen todos y después Holded avisa de los cambios al momento, con un repaso opcional cada 15 minutos por si algún aviso se perdiera. Los pedidos de venta de Holded (los que llegan de la tienda o del catálogo) entran como pedidos de venta con sus líneas, su cliente, sus impuestos y su almacén; si el cliente o el artículo no existían, se crean. Cada ficha y documento lleva su marca de procedencia.
- Sale hacia Holded: al cerrar un albarán de venta en Drenpos, y nunca antes, el albarán se envía a Holded y el pedido de origen queda marcado como enviado; se factura en Holded como siempre. Opcionalmente, los artículos dados de alta en Drenpos suben a Holded con su foto principal.
- Los packs de Holded se convierten en formatos: un pack de un solo artículo es un formato del artículo en Drenpos; se sigue vendiendo en cajas en Holded y Drenpos descuenta las unidades reales con su lote y su ubicación (una caja de 12 son 12 botellas menos), y el albarán vuelve a Holded en packs. Un pack con varios artículos distintos es un kit: queda apartado con su aviso.
- El stock real es siempre el de Drenpos: Holded no lo cambia nunca.
- Lo que no encaja (un impuesto sin enlazar, un cliente sin NIF, un pedido que no cuadra) queda en un monitor de «con problemas» con el motivo, un botón de reintentar y aviso al responsable.

## Estado legal del registro horario (a 23 de septiembre de 2026)

El real decreto de registro horario digital no está aprobado por el Consejo de Ministros ni publicado en el BOE. El Consejo de Estado emitió dictamen desfavorable el 23/03/2026, el 24/07/2026 se aplazó a septiembre y el 02/09/2026 el Ministerio de Trabajo dijo que lo aprobará "a la mayor brevedad", sin fecha (https://www.registrahora.es/noticias/registro-horario-digital-aplazado-septiembre-2026). Lo vigente es el art. 34.9 del Estatuto de los Trabajadores (RD-ley 8/2019): no llevar registro, o llevarlo de forma que no refleje la jornada real, es infracción grave de 751 a 7.500 € por infracción (LISOS arts. 7.5 y 40, https://www.boe.es/buscar/act.php?id=BOE-A-2000-15060). La multa calculada por trabajador afectado no está en vigor.

Calendario laboral 2027: Extremadura publicó sus festivos en el DOE el 8 de junio de 2026 (decreto aprobado el 2 de junio): 1 y 6 de enero, 25 y 26 de marzo, 1 de mayo, 8 de septiembre, 11 y 12 de octubre (el 15 de agosto cae en domingo y pasa al lunes 11 de octubre), 1 de noviembre y 6, 8 y 25 de diciembre, más dos fiestas locales por municipio (https://portalempleado.juntaex.es/w/calendario-de-fiestas-laborales-de-extremadura-para-el-a%C3%B1o-2027). A 23 de septiembre de 2026 el BOE aún no ha publicado la relación nacional de fiestas laborales de 2027; la de 2026 salió en el BOE del 28/10/2025 (https://www.boe.es/diario_boe/txt.php?id=BOE-A-2025-21667).

# Novedades anteriores (21 de septiembre de 2026)

- Geolocalización opcional en los fichajes: se activa en la configuración del módulo de fichajes, viene desactivada por defecto y no tiene coste extra. Aplica a los fichajes desde la app PWA y la web (el terminal físico no geolocaliza) y registra la ubicación solo al fichar entrada y salida, sin seguimiento continuo. Con la opción activa, si el empleado no concede la ubicación no puede fichar. El responsable ve coordenadas y mapa (OpenStreetMap) de cada fichaje, y la ubicación sale en el informe de fichajes exportable para la Inspección. Útil para comerciales, técnicos en ruta, limpieza y ayuda a domicilio, montadores, obra y teletrabajo. Marco legal: el art. 90 de la LO 3/2018 (LOPDGDD, https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673) permite tratar la geolocalización para el control laboral del art. 20.3 del Estatuto de los Trabajadores y exige informar antes de forma expresa, clara e inequívoca a trabajadores y representantes; la guía de la AEPD "Protección de datos y relaciones laborales" (mayo de 2021) pide el sistema menos invasivo posible. Drenpos solo toma la ubicación puntual del fichaje. Página: ${BASE}/control-horario#geolocalizacion
- Terminal de fichaje con modo sin conexión: si cae la WiFi o el sitio no tiene cobertura, el terminal sigue fichando y guarda cada fichaje en local con su hora exacta gracias a un reloj propio integrado. Al recuperar la conexión vuelca automáticamente todos los pendientes a Drenpos con su hora original. Con alimentación a 12 V (mechero del vehículo o batería auxiliar) sirve para obras, fincas, montajes y lugares sin internet: la cuadrilla ficha allí y al volver a la oficina o la nave se sincroniza todo. Conviene conectarlo con regularidad para tener el registro al día ante una inspección. El modo sin conexión es del terminal físico, no de la app PWA. Página: ${BASE}/dispositivo-fichaje#sin-conexion
- Plano de almacén y orden de ruta de picking (módulo de Inventario, ya disponible): editor visual del plano con varias plantas por almacén; se dibujan solo estanterías, paredes y puntos clave (inicio de ruta, punto de dejada de carga, escaleras), arrastrando y redimensionando, y se monta en un rato sin formación. Los huecos se gestionan desde el propio plano, como en el gestor de ubicaciones. Desde el plano el sistema calcula un orden de recorrido fijo de las ubicaciones, y el asistente de picking y las oleadas presentan las líneas en ese orden para recorrer el almacén en un sentido sin volver atrás. Contexto: la preparación de pedidos supone hasta el 55 % del gasto operativo de un almacén según De Koster, Le-Duc y Roodbergen (2007, European Journal of Operational Research 182(2), https://doi.org/10.1016/j.ejor.2006.07.009). Páginas: ${BASE}/software-gestion-almacen#plano-almacen y ${BASE}/software-preparacion-pedidos-picking#ruta-picking

---

# Páginas de solución (almacén)

La gestión de almacén es la especialidad de Drenpos e incluye capacidades de nivel WMS dentro del módulo de Inventario, sin sistema adicional que sincronizar:

- ${BASE}/software-control-stock: control de stock e inventario para pymes: stock mínimo y máximo con alertas, alertas de pedidos, propuesta de compra asistida, lotes con caducidad y FEFO, trazabilidad con informe PDF, pistola o móvil, formatos en cajas y palés, inventarios por zonas y valoración. Plan Pro 29 €/mes sin IVA.
- ${BASE}/software-gestion-almacen: SGA/WMS general: multialmacén, ubicaciones con QR, plano del almacén por plantas con los huecos gestionados desde el plano, lotes y series, FIFO/LIFO/FEFO, reservas de stock, trazabilidad con informe de recall, inventarios parciales e informes de rotación e inmovilizado. Secciones: ${BASE}/software-gestion-almacen#sga-o-erp (SGA aparte o ERP con almacén), #errores-picking y #pistola-pda.
- ${BASE}/software-preparacion-pedidos-picking: preparación de pedidos y expedición: semáforo de preparabilidad, etiqueta QR por pedido, asistente de picking móvil y oleadas pick-to-box con las líneas en el orden de ruta calculado desde el plano del almacén (un sentido, sin volver atrás), zona de preparados con QR y expedición con escaneo que genera albarán o factura.
- ${BASE}/software-gestion-palets: gestión de palets y etiqueta SSCC: el palet como unidad logística con SSCC GS1-128 generado desde el propio palet, ciclo de vida abierto, cerrado y pesado (bruto, tara y neto), expedido o anulado, palets propios con origen por línea, mezcla libre de productos, lotes y series, movimiento del palet entero en un escaneo, despaletizado (vaciar, pasar a otro o partir en varios) y palets blindados dentro de albaranes y facturas.
- ${BASE}/software-almacen-frigorifico: almacén frigorífico y de congelados: cadena de frío, alertas de caducidad, operativa de palets en móvil y tablet a pie de cámara, despiece con merma explícita. Sección sobre el mercado del frío en España: ${BASE}/software-almacen-frigorifico#mercado-frio.
- ${BASE}/software-alquiler-huecos-palet: depósito de terceros y alquiler de huecos de palet (3PL): propietario por palet, tarifas por palet/día y kg/día, eventos tarificables automáticos, posición en vivo, simulador, informe del periodo en PDF y actas de entrega firmadas con huella criptográfica sha256.
- ${BASE}/software-almacen-tienda: almacén combinado con TPV para comercio con tienda física.
- ${BASE}/software-produccion-fabricacion: control de producción para talleres y fabricantes: órdenes de trabajo divididas en fases, consumo de materiales por lectura de código con descuento de stock por lote, imputación de tiempos por operario y coste real de fabricación al cerrar la orden, con trazabilidad entre lote de materia prima y lote de producto acabado. Módulo 22 €/mes o plan Producción 50 €/mes, ambos sin IVA.

# Hostelería, conector de IA y conector Holded

- ${BASE}/software-bares-restaurantes: software para bares y restaurantes: TPV con salas y mesas persistentes y editor de mapa de sala, mesas virtuales, ocupación desde la primera consumición, flujo guiado de combinados y extras con precio por opción, pantallas de cocina y barra por familias sincronizadas por consulta cada 3 segundos (sin comandas perdidas ni mezcladas, de 4 a 10 pantallas por local), QR de mesa único con analítica de escaneos, cierre de caja, stock descontado y Verifactu en ticket. Carta digital con alérgenos y varias cartas en las próximas semanas; pedidos y pago desde la mesa en desarrollo. Fichaje del equipo en el mismo sistema (#fichaje-hosteleria), precio frente al mercado (#cuanto-cuesta) y Verifactu en el ticket (#verifactu-hosteleria). Plan Full 39 €/mes sin IVA con TPV, 5 usuarios y fichaje para 5 personas; módulo TPV suelto 20,58 €/mes. Hoy no hace delivery, reservas de mesa, datáfono propio ni escandallos.
- ${BASE}/conector-mcp-ia: conector MCP: enlaza Drenpos con ChatGPT, Claude o cualquier cliente MCP y consulta en lenguaje natural ventas por fechas, compras y ventas netas, clientes, proveedores, productos y stock. Solo lectura, mismos permisos que el usuario tiene en Drenpos, cada usuario conecta su cuenta. 6 €/mes por empresa sin IVA. No es una IA propia: usa el asistente que el cliente ya tiene.
- Conector Holded (sin página propia todavía): módulo aparte, precio a consultar. Artículos, contactos y pedidos de venta entran desde Holded; al cerrar el albarán en Drenpos se envía a Holded para facturarlo allí; los packs se convierten en formatos y el stock real es siempre el de Drenpos. Detalle en la sección de novedades.

# Facturación Verifactu

- ${BASE}/software-verifactu: software de facturación en modalidad Verifactu para pymes y autónomos. Cada factura genera su registro de facturación con huella (hash) encadenada, sale con código QR y la leyenda VERI*FACTU y el registro se remite a la AEAT desde el propio sistema, con panel de envíos y sin configuración por parte del cliente. Facturas completas, simplificadas y rectificativas, series y numeración configurables, envío al cliente por correo y WhatsApp. Marco normativo: RD 1007/2023 y Orden HAC/1177/2024; fechas del RDL 15/2025 (1 de enero de 2027 para contribuyentes del Impuesto sobre Sociedades y 1 de julio de 2027 para autónomos y resto de obligados). Incluido en todos los planes, desde 19 €/mes sin IVA (plan Essential).

# Control horario y dispositivo de fichaje

- ${BASE}/control-horario: software de control horario y registro de jornada: fichaje por web, app PWA, widget, QR y llavero RFID; calendarios laborales con vigencias y festivos por comunidad y por persona (#calendarios), vacaciones y permisos con cupos y aprobación (#vacaciones), control de entrada y salida con incidencias y tolerancias (#entrada-salida), horas extra día a día, conceptos de fichaje, sellado inalterable y reportes para la Inspección de Trabajo, todo en la licencia de 1 €/usuario/mes sin IVA; geolocalización opcional (desactivada por defecto, sin coste extra) que registra la ubicación solo al fichar entrada y salida desde la app o la web, con coordenadas y mapa para el responsable.
- ${BASE}/dispositivo-fichaje: terminal de fichaje fabricado por Drenpos: lectura de llavero RFID y código QR, pantalla de estado con nombre y foto del empleado, alimentación a 12 V y 3 A (fuente, batería o mechero del vehículo), WiFi con antena externa y modo sin conexión (sin red guarda los fichajes con su hora exacta y los sincroniza al volver la conexión, útil en obras, fincas y montajes), llaveros desconocidos en cuarentena para asignarlos después con su hora original, consulta de qué ha subido cada terminal y qué le ha pasado a su reloj, placa electrónica propia (revisión v2), carcasa impresa en 3D en PETG con el logo del cliente, actualizaciones de firmware desde su panel web, sin biometría. Desde 140 € sin IVA con llaveros personalizados; licencia de fichaje desde 1 €/usuario/mes. Se vende suelto o con el sistema.

Unidades logísticas: cada palet nace con su etiqueta SSCC estándar GS1 imprimible, con ciclo de vida completo (abierto, cerrado y pesado con bruto/tara/neto, expedido o anulado), mezcla libre de productos, lotes y series, movimiento del palet entero en un escaneo, despaletizado y división en varios palets nuevos ya etiquetados, y palets blindados dentro de albaranes y facturas.

---

# Planes y Precios

${pricingData}

---

# Módulos

${modulesData}

---

# Comparativa de planes

${plansComparison}

---

# Características

${featuresData}

---

# Todo en un solo sitio

${featureAllIn}

---

# Preguntas Frecuentes

${faqData}

---

# Blog: artículos

${blogContent}

---

# Contenido por ciudad

${localContent}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
