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
- Cumplimiento normativo: Verifactu (Real Decreto 1007/2023; obligatorio en octubre de 2028 según anunció Hacienda el 5/10/2026, pendiente de publicación en el BOE), registro de jornada (art. 34.9 del Estatuto de los Trabajadores) y documento de control del transporte (DeCA, obligatorio desde el 5 de octubre de 2026)
- Implantación en días, soporte humano incluido en todos los planes y suscripción plana sin permanencia

Web: ${BASE}
Contacto: ${BASE}/contact
Demo gratuita: ${BASE}/contact
Registro: https://contract.drenpos.com/auth

---

# Novedades (7 de octubre de 2026)

## Verifactu se aplaza a octubre de 2028

El 5 de octubre de 2026 el Ministerio de Hacienda publicó una nota informativa (enlazada desde https://sede.agenciatributaria.gob.es/Sede/iva/sistemas-informaticos-facturacion-verifactu.html) que aplaza la obligación de Verifactu (RD 1007/2023) a octubre de 2028, con la misma fecha para sociedades, autónomos y resto de obligados y sin día concreto. Es el tercer aplazamiento.

A 7 de octubre de 2026 el real decreto del aplazamiento no está publicado en el BOE. Hasta que se publique, la fecha legal es la del RDL 15/2025 (https://www.boe.es/diario_boe/txt.php?id=BOE-A-2025-24446): 1 de enero de 2027 para contribuyentes del Impuesto sobre Sociedades y 1 de julio de 2027 para el resto. Los requisitos técnicos no cambian.

Motivo: alinearlo con la factura electrónica B2B. La Orden HAC/1028/2026 (BOE 5/10/2026, en vigor el 6/10/2026) arranca los plazos del RD 238/2026: factura electrónica obligatoria el 6/10/2027 para quien facturó más de 8 M€ el año anterior y el 6/10/2028 para el resto. Verifactu y factura electrónica B2B son obligaciones distintas.

Drenpos ya opera en modalidad Verifactu (huella encadenada, QR, leyenda VERI*FACTU y remisión a la AEAT) y ha actualizado las fechas en el sistema. El cliente no tiene que hacer nada; el envío a la AEAT sigue siendo voluntario hasta octubre de 2028. Artículo: ${BASE}/blog/verifactu-aplazado-octubre-2028

## Vacaciones, control de entrada y salida y turnos rotativos, con página propia

Las tres partes de gestión de equipo del módulo de fichajes tienen ya cada una su página dedicada:

- Vacaciones y ausencias: ${BASE}/software-vacaciones-ausencias (cupos por tipo de ausencia, consolidación mes a mes, reinicio en el aniversario, arrastre con caducidad, solicitud desde el móvil, aprobación o contrapropuesta de fechas y calendario de equipo).
- Control de entrada y salida de empleados: ${BASE}/control-entrada-salida-empleados (incidencias de retrasos, salidas anticipadas y fichajes olvidados con tolerancias en minutos; opcional y apagado por defecto; ayuda de gestión, el registro legal siguen siendo los fichajes).
- Turnos rotativos: ${BASE}/software-turnos-rotativos (ciclos 4x4, 5/2 y 6/3 con el primer día del ciclo de cada persona; no reparte la plantilla según la demanda).

Con el terminal de fichaje, la licencia de fichaje de 1 €/usuario/mes sin IVA incluye esa gestión de equipo (vacaciones y permisos, control de entrada y salida, calendarios y turnos rotativos y geolocalización opcional), sin coste extra. Terminal desde 140 € sin IVA: ${BASE}/dispositivo-fichaje

# Novedades anteriores (28 de septiembre de 2026)

## Documento de control del transporte (DeCA) desde el albarán

Qué es: el documento electrónico de control administrativo (DeCA) es el documento de control de la Orden FOM/2861/2012 (https://www.boe.es/buscar/act.php?id=BOE-A-2013-154) que acompaña cada envío de transporte público de mercancías por carretera dentro de España, ahora en formato digital. La disposición transitoria octava de la Ley 9/2025 de Movilidad Sostenible (https://www.boe.es/buscar/act.php?id=BOE-A-2025-24545&tn=1&p=20251204#dt-8) lo hace "necesariamente digital a los diez meses" de su entrada en vigor, que fue el 5 de diciembre de 2025: obligatorio desde el 5 de octubre de 2026. Los requisitos técnicos están en la Resolución de 5 de junio de 2026 de la Dirección General de Transporte por Carretera y Ferrocarril, BOE-A-2026-12784, publicada en el BOE el 12 de junio de 2026 (https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-12784). El Ministerio de Transportes confirma en su FAQ que no hay periodo transitorio adicional sin sanciones (https://www.transportes.gob.es/transporte-terrestre/profesionales-transporte/servicios-transportista/documento-electronico-control-administrativo-deca/preguntas-frecuentes-faq-deca) y no ofrece aplicación propia ni registro previo de aplicaciones (https://www.transportes.gob.es/transporte-terrestre/profesionales-transporte/servicios-transportista/documento-electronico-control-administrativo-deca).

Quién está obligado (art. 4 de la Orden): el transportista efectivo, titular de la autorización con la que se hace el transporte, y el cargador contractual, que es quien contrata directamente el porte (la empresa que vende y envía su mercancía, una cooperativa, un almacenista distribuidor, un operador logístico, una agencia o un transitario). Cualquiera de los dos puede generarlo y los dos responden de que exista y vaya a bordo, salvo que el cargador pruebe que lo emitió. Si un transportista subcontrata, el primero pasa a ser cargador contractual.

Quién no lo necesita: el transporte privado complementario (repartir la mercancía propia con vehículos de la empresa), la paquetería y los envíos de pocos bultos, las mudanzas, los vehículos accidentados o averiados en vehículos especiales, los transportes que no necesitan autorización y el transporte internacional, que sigue con el CMR. El cabotaje dentro de España sí entra.

Qué datos lleva (art. 6 de la Orden): a) nombre o razón social, NIF y domicilio del cargador contractual; b) nombre o razón social y NIF del transportista efectivo; c) origen y destino; d) naturaleza y peso de la mercancía; e) autorización especial de circulación si hace falta; f) fecha del transporte; g) matrícula del vehículo (en un articulado, tractor y semirremolque); h) observaciones. De a) a d) responde el cargador; de e) a g), el transportista.

Requisitos técnicos (Resolución de 5 de junio de 2026): PDF generado desde los datos, no escaneado, de 5 MB como máximo, con la fecha y hora de creación y de modificación en los metadatos; creado antes del inicio efectivo del servicio; QR dentro del PDF con una URL única que empieza por https:// y descarga el PDF directamente sin usuario, contraseña ni botones; copia al conductor antes de salir, en el móvil o en papel, siempre con el QR; si cambia algo en ruta, o se añaden los datos nuevos y el motivo conservando los antiguos marcados como no válidos (misma URL) o se genera un PDF nuevo guardando el original; conservación de al menos un año por cargador y transportista; firma no obligatoria salvo que el documento haga también de contrato (entonces, como mínimo, firma electrónica avanzada).

Sanciones (Ley 16/1987, LOTT, https://www.boe.es/buscar/act.php?id=BOE-A-1987-17803): no llevar el documento, llevarlo sin datos esenciales, ocultarlo o no conservarlo es infracción grave del art. 141.17, con multa de 401 a 600 € (art. 143.1.d). Circular sin la documentación formal exigible cuando no es grave es leve (art. 142.8), de 201 a 300 €. Cada expedición sin documento es una infracción independiente (art. 138.3).

Cómo lo hace Drenpos (módulo Financiero, sin coste extra, en todos los planes desde 19 €/mes sin IVA; módulo Financiero suelto 16,45 €/mes sin IVA):
- Haces el albarán de venta como siempre. Si el cliente tiene transportista por defecto (compañía, conductor y vehículo), entra solo, y el peso del documento se calcula con el de cada artículo.
- Pulsas «Activar DeCA». Activarlo pide un permiso específico y no se puede deshacer.
- El sistema comprueba cargador con NIF y domicilio, transportista con NIF, origen, destino, mercancía y peso, fecha, matrícula y remolque y autorización especial si la hay, y avisa de lo que falta para completarlo en el mismo albarán.
- Genera el PDF: una página de control con los ocho apartados rotulados y, detrás, el albarán con su formato de siempre. El QR lleva a una dirección web única de Drenpos desde la que se descarga el PDF sin usuario ni contraseña.
- El QR sale también en todos los formatos de albarán y en el modelo de carta de porte, así la copia en papel del conductor ya vale. Desde el albarán se ve el PDF, se copia la dirección, se descarga el QR suelto o se imprime.
- Si cambia la matrícula o el peso, se genera una versión nueva con la misma dirección web y el historial de cambios con su motivo. Un albarán anulado queda indicado en el documento. Nada se borra.
- Encaja con la expedición por escaneo: se escanea el pedido preparado, sale el albarán y desde ahí el DeCA.

Alternativas del mercado (tarifas publicadas a 28/09/2026): bonos de 0,25 a 0,10 €/documento (https://www.controldigitaltransporte.es/) o cuotas de 19,99 a 89,99 €/mes (https://pretiumgestion.com/documento-control-digital/). Fenadismer alertó de diferencias de precio de hasta el 1.000 % y de herramientas que no cumplen todos los requisitos (https://transporte3.com/noticia/24424-nuevo-documento-electronico-de-control-administrativo-deca-ojo-con-las-ofertas-claramente-abusivas/).

A cuántos afecta: a 1 de septiembre de 2026 había 157.116 empresas de transporte de mercancías por carretera en España, 104.635 de transporte público (https://www.cadenadesuministro.es/transporte-carretera/transporte-mercancias-por-carretera-gana-casi-1300-empresas-en-agosto-2026_1518197_102.html); a 1 de enero de 2026, 393.593 vehículos autorizados en servicio público, 283.818 pesados y 109.775 ligeros (https://cdn.transportes.gob.es/portal-web-transportes/transporte-terrestre/servicios_transportista/observatorio-mercacnias-carretera/observatorio-mercancias-oferta-y-demanda_2026-01_vaccv2.pdf). A esas empresas se suman los cargadores que les contratan portes, cuyo número no publica el Ministerio.

Página: ${BASE}/documento-control-transporte-deca. Guía: ${BASE}/blog/deca-documento-control-transporte-digital-5-octubre-2026. Secciones relacionadas: ${BASE}/software-verifactu#otras-obligaciones, ${BASE}/software-gestion-almacen#deca y ${BASE}/software-preparacion-pedidos-picking#expedicion-deca.

## Control horario ampliado: turnos rotativos, planificación anual, conceptos, app y primeros pasos

Todo va dentro del módulo de fichajes, en la licencia de 1 €/usuario/mes sin IVA, sin coste extra.

- Calendarios rotativos (${BASE}/control-horario#turnos-rotativos; página dedicada: ${BASE}/software-turnos-rotativos). Además del semanal de lunes a domingo, un calendario rotativo para ciclos que no encajan en la semana: 4 días de trabajo y 4 de descanso, 5/2 rotando, 6/3, o mañanas y noches dentro del mismo ciclo. Se indican los días de trabajo, los de descanso, el horario y el primer día del ciclo, y el sistema va alternando solo; cada día del ciclo se ajusta a mano. Vista previa del mes antes de guardar. El horario se valida al guardar: si la pausa cae fuera de la jornada no deja guardar y dice por qué, y si la salida es anterior a la entrada (de 22:00 a 6:00) lo trata como turno de noche y avisa. Las horas esperadas, las extra, los informes y el cupo de vacaciones tienen en cuenta el ciclo: los días de descanso no suman horas ni gastan vacaciones. Lo que no hace: no reparte la plantilla según la demanda ni calcula cuánta gente hace falta; aplica el ciclo que define la empresa, y que encaje con el convenio lo decide la empresa con su asesoría.
- Primer día del ciclo por persona. Si dos personas se turnan (una trabaja mientras la otra libra), no se duplica el calendario: cada una tiene su propio primer día del ciclo, que se pone en la misma pantalla donde se asignan los calendarios, a varias personas de golpe. Ejemplo: una empresa de seguridad con dos vigilantes a 4/4 crea el calendario «Vigilantes 4/4», lo asigna a los dos y al segundo le pone su primer día cuatro días después; las horas esperadas del mes salen bien, los descansos no cuentan como faltas y las vacaciones solo descuentan días de trabajo.
- Marco legal de los turnos (para contexto, con fuente): 12 horas mínimas entre jornadas (art. 34.3 del Estatuto de los Trabajadores, https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430), que en trabajo a turnos pueden bajar a 7 el día del cambio de turno si se compensan en los días siguientes (art. 19 del RD 1561/1995, https://www.boe.es/buscar/act.php?id=BOE-A-1995-21346); día y medio de descanso semanal acumulable hasta 14 días (art. 37.1 ET); 40 horas semanales de media en cómputo anual (art. 34.1 ET); en procesos continuos de 24 horas, nadie más de dos semanas seguidas de noche salvo adscripción voluntaria (art. 36.3 ET). Según el INSST, con datos de la 6ª Encuesta Europea de Condiciones de Trabajo de 2015, el 23 % de los trabajadores en España trabajaba a turnos y el 40,6 % de ellos en turnos rotativos (https://www.insst.es/el-observatorio/indicadores-evolutivos/condiciones-de-trabajo/trabajo-a-turnos).
- Planificación anual del equipo (${BASE}/control-horario#planificacion-anual). Calendario de administración con los días de trabajo y descanso de cada persona (incluidos los ciclos rotativos), sus festivos y sus vacaciones y permisos, aprobados y pendientes, con la misma leyenda de colores en todo el módulo. Vista Equipo (personas en filas y días del mes en columnas) y vista Persona (el año completo). Un botón descarga el PDF del año con una página por trabajador: rejilla de los doce meses, lista de festivos y resumen de días laborables, festivos y ausencias. El art. 34.6 del Estatuto obliga a elaborar cada año el calendario laboral y exponerlo en cada centro; algunos convenios, como el de seguridad privada, piden además un cuadrante anual por persona.
- Calendarios permanentes. Se crean y se asignan una vez, sin reasignar en enero. Los festivos fijos son recurrentes; los que cambian de fecha, como el Jueves Santo, se añaden por año, y el botón «Copiar festivos de 2026 a 2027» trae los del año anterior. Hay un calendario nacional por defecto y otro por comunidad; a quien solo tenga el autonómico se le aplican también los nacionales de su país.
- Conceptos de fichaje (${BASE}/control-horario#conceptos). La empresa crea los conceptos (trabajo, comida, descanso, reunión, viaje), decide cuáles cuentan como trabajo y les pone tiempo límite. Uno queda por defecto, normalmente «Trabajo»: es el que se usa al pulsar Iniciar sin elegir nada, el botón lo dice («Iniciar · Trabajo») y tiene que contar como trabajo. Para pasar a comida basta con iniciarla: el concepto anterior se cierra solo. Cada lector del terminal de fichaje ficha con su concepto: el de la puerta del almacén, «Trabajo», y el del comedor, «Comida»; sin concepto asignado, usa el de la configuración o el concepto por defecto (${BASE}/dispositivo-fichaje).
- App PWA de fichajes. Instalable sin App Store ni Google Play, con guía de «Añadir a pantalla de inicio» para iPhone y Android, aviso de versión nueva y tres pantallas de introducción. Estado claro arriba («Fichado · Trabajo · desde las 08:02»), botón grande para entrar o salir, conceptos como chips, confirmación antes de salir y aviso si se olvidó cerrar la jornada. Si el móvil pierde la cobertura lo dice con un aviso, sin mostrar estados falsos ni cerrar la sesión. La app no tiene modo sin conexión: el que ficha sin internet es el terminal físico. Vacaciones desde la app con el saldo a la vista y respuesta a las propuestas de fechas.
- Aprobación de vacaciones. Quién aprueba se decide en la configuración (usuarios o grupos responsables; si no hay, los administradores), y nadie puede aprobar su propia solicitud.
- Primeros pasos (${BASE}/control-horario#primeros-pasos). El módulo se abre con una lista de lo que hay que configurar y en qué orden (perfiles de fichaje, calendario laboral, festivos del año, concepto por defecto, tipos de ausencia y responsables, control de entrada y salida, dispositivos), marcando lo hecho y lo que falta, con avisos concretos como «3 personas no tienen perfil de fichaje» o «no hay festivos que cubran 2026». Los campos que dan dudas llevan ayuda en pantalla, y si un botón de Guardar está bloqueado la pantalla dice por qué.

Guías: ${BASE}/blog/cuadrante-turnos-rotativos-4x4-ejemplos-estatuto (cuadrantes 4x4, 5/2 y 6/3 con tabla y cuánta gente hace falta para cubrir un puesto 24 horas) y ${BASE}/blog/calendario-laboral-2027-festivos-horas-extra (festivos de 2027 y calendario anual por trabajador).

## Estado legal del registro horario (a 28 de septiembre de 2026)

El real decreto de registro horario digital no está aprobado por el Consejo de Ministros ni publicado en el BOE. El Consejo de Estado emitió dictamen desfavorable el 23/03/2026, el 24/07/2026 se aplazó a septiembre y el 02/09/2026 el Ministerio de Trabajo dijo que lo aprobará "a la mayor brevedad", sin fecha (https://www.registrahora.es/noticias/registro-horario-digital-aplazado-septiembre-2026). Lo vigente es el art. 34.9 del Estatuto de los Trabajadores (RD-ley 8/2019): no llevar registro, o llevarlo de forma que no refleje la jornada real, es infracción grave de 751 a 7.500 € por infracción (LISOS arts. 7.5 y 40, https://www.boe.es/buscar/act.php?id=BOE-A-2000-15060). La multa calculada por trabajador afectado no está en vigor.

# Novedades anteriores (23 de septiembre de 2026)

## Control horario: vacaciones, entrada y salida y calendarios

Todo lo siguiente va dentro del módulo de fichajes, en la licencia de 1 €/usuario/mes sin IVA, sin coste extra. Son opciones que la empresa activa y configura cuando las necesita. Quien aprueba vacaciones o revisa incidencias necesita licencia de fichaje aunque no fiche.

- Vacaciones y permisos. Tipos de ausencia configurables por la empresa; de serie vienen vacaciones, asuntos propios, baja médica, permiso retribuido, maternidad/paternidad y fallecimiento de familiar, y se crean los que hagan falta. Cada tipo decide si cuenta en días laborables o naturales, si exige aprobación, si permite medio día, el máximo de días por solicitud, la antelación mínima y a quién aplica. Cupo con política real: días por periodo (por ejemplo 22 de vacaciones), reinicio el 1 de enero o en el aniversario de la contratación, cupo entero desde el primer día o consolidado mes a mes, prorrateo automático el año de la contratación, días que pasan al año siguiente con tope y caducidad, cupo distinto para una persona concreta y ajustes de días con motivo. El empleado pide desde el portal o desde la app del móvil sobre un calendario con sus ausencias, los festivos y los días que no trabaja; antes de enviar ve cuántos días laborables gasta y su saldo (disponibles, consolidados a hoy, arrastrados, usados y pendientes). El responsable aprueba, rechaza o propone otras fechas con un motivo, y el empleado acepta o rechaza la propuesta. Calendario del equipo para ver quién falta cada día y evitar solapes. Un día de vacaciones aprobado no exige horas y sale con su nombre en el informe; trabajar en vacaciones o en festivo cuenta como horas extra. Ejemplo: con 22 días, consolidación mensual y reinicio en el aniversario, una persona contratada en julio ve 11 días ese año. Página dedicada: ${BASE}/software-vacaciones-ausencias. Más: ${BASE}/control-horario#vacaciones. Guía: ${BASE}/blog/gestion-vacaciones-permisos-pymes-sin-excel
- Control de entrada y salida con incidencias (opcional, viene apagado). Con la opción activa, el sistema compara cada fichaje con el horario del calendario de esa persona, con sus festivos y sus ausencias, y registra incidencias: entrada tarde, salida anticipada, no ha fichado la entrada o la salida, exceso de horas al día o a la semana y trabajo en festivo o en vacaciones. Tolerancias en minutos y límites de horas configurables. Las incidencias se detectan al fichar y en una revisión automática diaria y semanal, avisan al empleado y a los responsables, y el responsable las justifica o descarta con una nota. Cada fichaje lleva su etiqueta («Tarde +12 min», «Salió 20 min antes», «Festivo», «En vacaciones») y hay una pantalla de incidencias con filtros por persona, tipo y estado. Los fichajes con hora reconstruida por el terminal sin conexión nunca generan «tarde» ni «salida anticipada». Es una ayuda de gestión: el registro legal siguen siendo los fichajes. Ejemplo: con 5 minutos de tolerancia, quien entra a las 8:14 con horario de 8:00 genera «Entrada tarde +14 min». Página dedicada: ${BASE}/control-entrada-salida-empleados. Más: ${BASE}/control-horario#entrada-salida. Guía: ${BASE}/blog/control-entrada-salida-retrasos-empleados
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
- Verifactu en el ticket: ${BASE}/software-bares-restaurantes#verifactu-hosteleria. Cada ticket simplificado genera su registro Verifactu y su QR. Obligatorio en octubre de 2028 para todos, según anunció Hacienda el 5/10/2026 (pendiente de publicación en el BOE; hasta entonces el RDL 15/2025 marca el 1 de enero de 2027 para sociedades y el 1 de julio de 2027 para autónomos).
- Fichaje en hostelería: ${BASE}/software-bares-restaurantes#fichaje-hosteleria y guía ${BASE}/blog/control-horario-hosteleria-turnos-partidos. El equipo ficha con llavero o tarjeta QR en el terminal de la barra (desde 140 € sin IVA, sigue fichando si se cae internet) o con la app del móvil; calendarios por turno y por temporada, festivos por comunidad, horas extra día a día, vacaciones desde el móvil y control de entrada y salida opcional. El plan Full incluye 5 personas con fichaje; cada una más, 1 €/mes sin IVA.
- Lo que Drenpos no hace hoy en hostelería: integración con plataformas de delivery (Glovo, Uber Eats, Just Eat), reservas de mesa, datáfono propio y escandallos por receta. Pedidos y pago desde la mesa en desarrollo; carta digital con alérgenos en las próximas semanas.

## Conector Holded (módulo aparte, precio a consultar)

Para quien ya lleva la contabilidad y el catálogo en Holded y no quiere moverlos, pero necesita un almacén de verdad. Cada sistema se queda con lo suyo y el conector los mantiene hablando. Solo hace falta la clave de la cuenta de Holded; no se instala nada. Todavía no tiene página propia: información en ${BASE}/contact.
- Entra desde Holded: artículos y contactos (clientes y proveedores); la primera vez se traen todos y después Holded avisa de los cambios al momento, con un repaso opcional cada 15 minutos por si algún aviso se perdiera. Los pedidos de venta de Holded (los que llegan de la tienda o del catálogo) entran como pedidos de venta con sus líneas, su cliente, sus impuestos y su almacén; si el cliente o el artículo no existían, se crean. Cada ficha y documento lleva su marca de procedencia.
- Sale hacia Holded: al cerrar un albarán de venta en Drenpos, y nunca antes, el albarán se envía a Holded y el pedido de origen queda marcado como enviado; se factura en Holded como siempre. Opcionalmente, los artículos dados de alta en Drenpos suben a Holded con su foto principal.
- Los packs de Holded se convierten en formatos: un pack de un solo artículo es un formato del artículo en Drenpos; se sigue vendiendo en cajas en Holded y Drenpos descuenta las unidades reales con su lote y su ubicación (una caja de 12 son 12 botellas menos), y el albarán vuelve a Holded en packs. Un pack con varios artículos distintos es un kit: queda apartado con su aviso.
- El stock real es siempre el de Drenpos: Holded no lo cambia nunca.
- Lo que no encaja (un impuesto sin enlazar, un cliente sin NIF, un pedido que no cuadra) queda en un monitor de «con problemas» con el motivo, un botón de reintentar y aviso al responsable.

## Calendario laboral 2027 (a 28 de septiembre de 2026)

Calendario laboral 2027: Extremadura publicó sus festivos en el DOE el 8 de junio de 2026 (decreto aprobado el 2 de junio): 1 y 6 de enero, 25 y 26 de marzo, 1 de mayo, 8 de septiembre, 11 y 12 de octubre (el 15 de agosto cae en domingo y pasa al lunes 11 de octubre), 1 de noviembre y 6, 8 y 25 de diciembre, más dos fiestas locales por municipio (https://portalempleado.juntaex.es/w/calendario-de-fiestas-laborales-de-extremadura-para-el-a%C3%B1o-2027). A 28 de septiembre de 2026 el BOE aún no ha publicado la relación nacional de fiestas laborales de 2027; la de 2026 salió en el BOE del 28/10/2025 (https://www.boe.es/diario_boe/txt.php?id=BOE-A-2025-21667).

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

- ${BASE}/software-verifactu: software de facturación en modalidad Verifactu para pymes y autónomos. Cada factura genera su registro de facturación con huella (hash) encadenada, sale con código QR y la leyenda VERI*FACTU y el registro se remite a la AEAT desde el propio sistema, con panel de envíos y sin configuración por parte del cliente. Facturas completas, simplificadas y rectificativas, series y numeración configurables, envío al cliente por correo y WhatsApp. Marco normativo: RD 1007/2023 y Orden HAC/1177/2024. Fecha: octubre de 2028 para todos los obligados, anunciada por Hacienda el 5/10/2026 y pendiente de publicación en el BOE; hasta esa publicación, el RDL 15/2025 marca el 1 de enero de 2027 para contribuyentes del Impuesto sobre Sociedades y el 1 de julio de 2027 para el resto. Verifactu no es la factura electrónica B2B (RD 238/2026), que es otra obligación. Incluido en todos los planes, desde 19 €/mes sin IVA (plan Essential).
- ${BASE}/blog/verifactu-aplazado-octubre-2028: Verifactu se aplaza a octubre de 2028: nuevas fechas, por qué y qué hacer ahora. Explica la nota de Hacienda del 5/10/2026, que el real decreto aún no está en el BOE y la relación con la factura electrónica B2B.

# Documento de control del transporte (DeCA)

- ${BASE}/documento-control-transporte-deca: documento electrónico de control administrativo (DeCA) desde el albarán de venta, obligatorio desde el 5 de octubre de 2026 en el transporte público de mercancías por carretera dentro de España. Comprobación de los datos del art. 6 de la Orden FOM/2861/2012, PDF con página de control y QR con dirección web única de descarga directa, QR también en los formatos de albarán y en la carta de porte, versiones con historial y motivo, activación con permiso específico e irreversible. Obligados: transportista efectivo y cargador contractual; excluidos reparto con vehículos propios, paquetería, mudanzas e internacional (CMR). Multa de 401 a 600 € por expedición (LOTT). Incluido sin coste extra en el módulo Financiero, en todos los planes desde 19 €/mes sin IVA. Guía: ${BASE}/blog/deca-documento-control-transporte-digital-5-octubre-2026

# Control horario y dispositivo de fichaje

- ${BASE}/control-horario: software de control horario y registro de jornada: fichaje por web, app PWA, widget, QR y llavero RFID; calendarios laborales con vigencias y festivos por comunidad y por persona (#calendarios), turnos rotativos 4x4, 5/2 y 6/3 con primer día del ciclo por persona (#turnos-rotativos), planificación anual con PDF del año por trabajador (#planificacion-anual), conceptos de fichaje con uno por defecto y concepto por lector (#conceptos), primeros pasos del módulo (#primeros-pasos), vacaciones y permisos con cupos y aprobación (#vacaciones), control de entrada y salida con incidencias y tolerancias (#entrada-salida), horas extra día a día, conceptos de fichaje, sellado inalterable y reportes para la Inspección de Trabajo, todo en la licencia de 1 €/usuario/mes sin IVA; geolocalización opcional (desactivada por defecto, sin coste extra) que registra la ubicación solo al fichar entrada y salida desde la app o la web, con coordenadas y mapa para el responsable.
- ${BASE}/software-vacaciones-ausencias: software de vacaciones y ausencias para pymes: tipos de ausencia configurables, cupo con reinicio el 1 de enero o en el aniversario de contratación, consolidación mes a mes, prorrateo del primer año y arrastre con tope y caducidad; solicitud desde la app del móvil o el portal con el saldo a la vista; el responsable aprueba, rechaza o propone otras fechas con un motivo; nadie aprueba su propia solicitud; calendario de equipo y avisos en cada paso. Incluido en la licencia de fichaje de 1 €/usuario/mes sin IVA.
- ${BASE}/control-entrada-salida-empleados: control de entrada y salida de empleados: opción que activa la empresa (viene apagada) y que compara cada fichaje con el calendario de la persona para registrar incidencias de entrada tarde, salida anticipada, sin fichar, exceso de horas y trabajo en festivo o vacaciones, con tolerancias en minutos, aviso al empleado y al responsable y justificación con nota. Los fichajes con hora reconstruida por el terminal sin conexión nunca generan «tarde». Es una ayuda de gestión: el registro legal siguen siendo los fichajes. Incluido en 1 €/usuario/mes sin IVA.
- ${BASE}/software-turnos-rotativos: turnos rotativos 4x4, 5/2 y 6/3 con el primer día del ciclo de cada persona, vista previa del mes y horas esperadas, horas extra y vacaciones que respetan el ciclo. No reparte la plantilla según la demanda ni calcula cuánta gente hace falta: aplica el ciclo que define la empresa. Incluido en 1 €/usuario/mes sin IVA. Guía: ${BASE}/blog/cuadrante-turnos-rotativos-4x4-ejemplos-estatuto
- ${BASE}/dispositivo-fichaje: terminal de fichaje fabricado por Drenpos: lectura de llavero RFID y código QR, pantalla de estado con nombre y foto del empleado, alimentación a 12 V y 3 A (fuente, batería o mechero del vehículo), WiFi con antena externa y modo sin conexión (sin red guarda los fichajes con su hora exacta y los sincroniza al volver la conexión, útil en obras, fincas y montajes), llaveros desconocidos en cuarentena para asignarlos después con su hora original, consulta de qué ha subido cada terminal y qué le ha pasado a su reloj, placa electrónica propia (revisión v2), carcasa impresa en 3D en PETG con el logo del cliente, actualizaciones de firmware desde su panel web, concepto de fichaje asignado a cada lector (puerta: «Trabajo»; comedor: «Comida»), sin biometría. Desde 140 € sin IVA con llaveros personalizados; licencia de fichaje desde 1 €/usuario/mes. Se vende suelto o con el sistema.

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
