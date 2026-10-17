---
title: "Cómo generar el DeCA desde el albarán: paso a paso, QR y errores típicos"
meta_title: "Cómo generar el DeCA desde el albarán, paso a paso"
description: "Paso a paso para convertir tu albarán en DeCA: datos de la Orden FOM/2861/2012, PDF nativo, QR y URL única, cambios en ruta, conservación y errores típicos."
date: 2026-10-17
image: "/images/blog/etiqueta-sscc-gs1-palets/cover.jpg"
author:
  name: "Alonso Bermejo Pérez"
  designation: "CEO & Founder"
  avatar: "/images/alonso.jpg"
categories: ["Logística y 3PL", "Cumplimiento Legal", "Gestión de Almacén"]
tags:
  [
    "generar DeCA desde albarán",
    "cómo hacer el DeCA",
    "albarán como documento de control",
    "QR DeCA",
    "URL única DeCA",
    "Orden FOM/2861/2012 artículo 6",
    "Resolución 5 junio 2026",
  ]
featured: false
draft: false
hero:
  title: "Del albarán al DeCA: cómo se hace, qué datos lleva y dónde se suele fallar"
  description: "El paso a paso que vale para cualquier programa, los requisitos del QR y la URL según la Resolución de 5 de junio de 2026, y cómo se hace en Drenpos con un botón."
faq:
  - question: "¿Puedo usar mi albarán como DeCA?"
    answer: "Sí. El artículo 5 de la Orden FOM/2861/2012 dice que el documento de control es de libre edición y la Resolución de 5 de junio de 2026 admite cualquier formato de documento de transporte, albarán incluido, siempre que lleve los ocho datos del artículo 6 y distinga de forma expresa al cargador contractual y al transportista efectivo. Desde el 5 de octubre de 2026 debe ser un PDF generado desde los datos, con QR."
  - question: "¿Vale escanear el albarán firmado y añadirle un QR?"
    answer: "No. La Resolución exige que el PDF sea nativo digital, es decir, generado transformando los datos del programa en texto. Los ficheros obtenidos al escanear un papel o a partir de imágenes no son válidos, aunque lleven QR."
  - question: "¿Cuándo hay que generar el DeCA?"
    answer: "Siempre antes del inicio efectivo del servicio, y en cuanto se conozcan los datos. El programa debe registrar la fecha y hora de creación del fichero, y de cada modificación, como metadatos del PDF. El conductor tiene que llevar su copia con el QR antes de arrancar."
  - question: "¿Qué tiene que pasar al escanear el QR del DeCA?"
    answer: "Que se descargue directamente el PDF. La URL tiene que empezar por https, con TLS 1.2 o superior, y no puede llevar a una página que pida usuario o contraseña ni obligue a pulsar un botón de descarga. Puede tener medidas de seguridad, pero no caducar antes de que acabe el servicio."
  - question: "¿Se pueden incluir varios albaranes en un mismo DeCA?"
    answer: "Sí, si el cargador contractual y el transportista efectivo son los mismos en todos los envíos. En ese caso hay que identificar por separado el origen, el destino, la mercancía y el peso de cada envío, según el apartado sexto de la Resolución de 5 de junio de 2026."
  - question: "¿Cómo se genera el DeCA en Drenpos?"
    answer: "Desde el albarán de venta, con el botón Activar DeCA. El sistema comprueba los datos que exige la norma, avisa de lo que falta y genera un PDF con la página de control y el albarán detrás, con un QR de descarga directa. Va incluido en el módulo Financiero, en todos los planes."
---

> Para generar el **DeCA desde el albarán** necesitas que el albarán lleve los **ocho datos** del artículo 6 de la Orden FOM/2861/2012, que tu programa lo convierta en un **PDF nativo** (no escaneado) **antes de que salga el camión**, con un **QR** que descargue el PDF desde una **URL https única** sin contraseña, y que el conductor lleve la copia. Luego se guarda **un año**. Abajo tienes el paso a paso, los fallos típicos y cómo se hace en Drenpos.

<div class="my-8 flex justify-center">
  <a href="/documento-control-transporte-deca" class="inline-flex rounded-full px-6 py-3 font-semibold text-white" style="background: var(--bg-menu-lig);">
    Ver el DeCA desde el albarán en Drenpos
  </a>
</div>

Si ya haces albaranes, tienes casi todo el DeCA hecho: cliente, dirección de entrega, líneas y peso. Lo que falta suele ser el NIF del transportista, la matrícula y la fecha, y es justo lo que más falla. Si buscas qué es el DeCA y desde cuándo es obligatorio, empieza por la [guía del DeCA digital](/blog/deca-documento-control-transporte-digital-5-octubre-2026).

## ¿Puede un albarán servir como DeCA?

Sí. La Orden FOM/2861/2012 dice en su artículo 5 que el documento de control es de libre edición, y la Resolución de 5 de junio de 2026 admite cualquier formato que ya uses para documentar un transporte: albarán, carta de porte, documento ADR. La condición es que lleve los ocho datos del artículo 6 y que identifique de forma expresa y diferenciada al cargador contractual y al transportista efectivo.

Lo dice el apartado octavo de la [Resolución de 5 de junio de 2026](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-12784). Y el artículo 2 de la [Orden FOM/2861/2012](https://www.boe.es/buscar/act.php?id=BOE-A-2013-154) ya decía que una carta de porte u otro documento equivalente sirve como documento de control si contiene todos los datos.

Lo que cambió el 5 de octubre de 2026 no es el contenido, sino el soporte: ya no vale el albarán en papel ni su foto. Tiene que ser un fichero generado por el programa.

Antes de seguir, asegúrate de que el envío lleva DeCA. Solo el transporte público de mercancías por carretera dentro de España (incluido el cabotaje). El reparto con tus propias furgonetas, la paquetería de pocos bultos y las mudanzas quedan fuera. Si dudas de a quién le toca emitirlo, lo tienes en [¿lo emite el cargador o el transportista?](/blog/deca-quien-lo-emite-cargador-transportista).

## ¿Qué datos tiene que llevar el albarán para valer como DeCA?

Los ocho del artículo 6 de la Orden FOM/2861/2012: datos del cargador contractual (nombre, NIF y domicilio), del transportista efectivo (nombre y NIF), origen y destino, naturaleza y peso de la mercancía, autorización especial si la hay, fecha del transporte, matrícula (en un articulado, tractor y semirremolque) y observaciones. Los cuatro primeros los responde el cargador y la autorización, la fecha y la matrícula, el transportista.

| Apartado | Dato | Responde | Dónde suele estar en tu programa |
| --- | --- | --- | --- |
| a) | Nombre o razón social, NIF y domicilio del cargador contractual | Cargador | Ficha de tu empresa |
| b) | Nombre o razón social y NIF del transportista efectivo | Cargador | Ficha del transportista (a menudo, sin NIF) |
| c) | Lugar de origen y de destino | Cargador | Dirección de carga y dirección de envío del cliente |
| d) | Naturaleza y peso de la mercancía (u otra magnitud si el peso exacto es difícil de saber) | Cargador | Líneas del albarán y peso de cada artículo |
| e) | Autorización especial de circulación, si el vehículo la necesita | Transportista | Casi nunca está; hay que añadirla |
| f) | Fecha del transporte | Transportista | Fecha del albarán o de salida |
| g) | Matrícula del vehículo; en un articulado, la del tractor y la del semirremolque | Transportista | Datos de transporte del albarán |
| h) | Observaciones o reservas | Quien las incluya | Notas del albarán |

El reparto de responsabilidad está en el artículo 7, cuyos apartados 2 y 3 se reescribieron con la [Orden TRM/282/2026](https://www.boe.es/buscar/doc.php?id=BOE-A-2026-7128), en vigor desde el 29 de marzo de 2026.

## ¿Qué hay que preparar antes de generar el primer DeCA?

Las fichas. Revisa que tu empresa tiene NIF y domicilio completos, que cada dirección de carga (nave, almacén, muelle) está dada de alta, que cada transportista tiene razón social y NIF, que sus vehículos tienen matrícula y que tus artículos tienen peso. Si eso está bien, cada DeCA sale en segundos. Si no, cada envío se convierte en una búsqueda de datos con el camión esperando.

Truco rápido: saca los albaranes del último mes que salieron con transportista y revisa solo esos transportistas y esos artículos. En un distribuidor de 300 referencias que mueve 40 habituales, es una mañana de trabajo.

Con el peso hay que tener cuidado. Si el programa suma el peso bruto de cada línea, el apartado d) sale solo y cuadra con la báscula. Si falta el peso de un artículo y el programa pone cero, el DeCA dirá que el camión lleva menos de lo que lleva.

## ¿Cuál es el paso a paso para generar el DeCA desde el albarán?

En cualquier programa, el orden es el mismo: haces el albarán con cliente, direcciones y líneas; completas los datos del transporte (transportista, matrícula, fecha, autorización); el programa revisa que están los ocho datos; generas el PDF nativo con su QR antes de la salida; entregas la copia al conductor; y si algo cambia, lo registras sin borrar lo anterior. Después, se conserva un año.

1. **Haz el albarán.** Cliente, dirección de entrega y líneas, como siempre. Comprueba la dirección de carga si tienes más de una nave.
2. **Completa el transporte.** Transportista efectivo con su NIF, matrícula (y remolque), fecha y autorización especial si la hay.
3. **Revisa los ocho datos.** Un buen programa te avisa de lo que falta en lugar de dejarte generar un documento incompleto.
4. **Genera el PDF.** Nativo, de 5 MB como máximo, con la fecha y hora de creación en los metadatos y el QR dentro. Antes del inicio efectivo del servicio.
5. **Entrega la copia al conductor.** En el móvil o en papel, siempre con el QR. En un control puede enseñar el documento o solo el QR.
6. **Prueba el QR.** Las primeras veces, escanéalo con un móvil sin sesión iniciada y comprueba que baja el PDF.
7. **Registra los cambios.** Si cambia la matrícula o el peso, modificas el PDF conservando los datos antiguos marcados como no válidos, o generas uno nuevo guardando el original.
8. **Conserva el fichero un año.** Tú y el transportista, aunque basta con que uno lo genere y el otro pueda descargarlo.

## ¿Cómo tienen que ser el QR y la URL del DeCA?

El QR va dentro del PDF y lleva la dirección web única de ese documento. La URL empieza por https (TLS 1.2 o superior) y, al abrirla, descarga directamente el PDF: sin usuario, contraseña ni botones. Puede llevar tokens o cifrado, pero no puede caducar antes de que termine el servicio. Siete días naturales después de terminar, se puede desactivar la descarga.

Todo esto está en los apartados segundo y tercero de la Resolución. Detalles que se pasan por alto:

- **La forma de construir la URL es libre.** No hace falta registrar el dominio en ningún sitio: la Resolución de 2026 eliminó la comunicación previa.
- **El QR puede ir además como fichero suelto.** Útil para mandárselo al conductor por mensaje.
- **Lo escrito a mano no cuenta.** Si el conductor anota algo en la copia impresa, la inspección no lo tendrá en cuenta.
- **No hace falta firma.** Solo si el documento hace también de contrato, la Resolución pide como mínimo firma electrónica avanzada.

## ¿Se pueden meter varios albaranes en un mismo DeCA?

Sí, con una condición: que el cargador contractual y el transportista efectivo sean los mismos en todos los envíos. Entonces se pueden consignar varios envíos en un solo DeCA, identificando por separado el origen, el destino, la mercancía y el peso de cada uno. El orden en que aparecen no obliga a hacer las entregas en ese orden. Lo regula el apartado sexto de la Resolución.

Es el caso del camión que sale por la mañana con seis repartos a seis clientes. Se puede hacer un DeCA por albarán o uno que agrupe los seis. Lo que no se puede es mezclar envíos de dos cargadores distintos o de dos transportistas distintos en el mismo documento.

En Drenpos el DeCA se genera desde cada albarán de venta, así que cada envío lleva el suyo.

## ¿Qué pasa si cambia algo después de generarlo?

Hay dos formas válidas. Modificar el mismo PDF, añadiendo los datos nuevos y el motivo y dejando los antiguos marcados como no válidos, con lo que la URL y el QR no cambian. O generar un PDF nuevo, con otra URL y otro QR, guardando el original para la trazabilidad. En los dos casos el conductor tiene que recibir el PDF actualizado.

Si el cambio es de vehículo con el viaje empezado, el artículo 6.g de la Orden dice que lo hace constar la empresa de transportes. Lo importante es no tocar el original sin dejar rastro.

## ¿Cuánto tiempo y dónde hay que conservar el DeCA?

Al menos un año, según el artículo 9 de la Orden FOM/2861/2012 y el apartado segundo de la Resolución. Lo conservan el cargador contractual y el transportista efectivo, cada uno en su repositorio o en el mismo. Si uno lo generó, basta con que el otro pueda descargarlo durante ese año. La descarga desde el QR se puede apagar siete días después del servicio, pero el fichero sigue guardado.

Si tu transportista genera el DeCA por ti, pídele acceso o copia de cada documento. Un almacén que manda cinco camiones al día acumula unos 1.200 documentos al año: tienen que estar localizables por albarán, cliente o fecha.

## ¿Cómo se genera el DeCA desde el albarán en Drenpos?

En Drenpos haces el albarán de venta como siempre. Si el cliente tiene un transportista por defecto, entran solos la compañía, el conductor y el vehículo, y el peso se calcula con el de cada artículo. Pulsas «Activar DeCA», el sistema revisa los datos y te dice qué falta, y sale un PDF con la página de control y el albarán detrás, con un QR de descarga directa.

El detalle, paso a paso:

1. **El albarán, como siempre.** El origen es la dirección de la empresa marcada como origen por defecto (nave, almacén o lugar de carga), salvo que elijas otra. El destino, la dirección de envío del cliente.
2. **«Activar DeCA».** Pide un permiso específico y no tiene vuelta atrás: una vez activado, el documento de control ya no se quita.
3. **Revisión.** Cargador con NIF y domicilio, transportista con NIF, origen, destino, mercancía y peso, fecha, matrícula y remolque, autorización especial si la hay. Lo que falte, lo completas en el mismo albarán.
4. **PDF oficial.** Una página de control con los ocho apartados rotulados y, detrás, el albarán con su formato de siempre. El QR lleva a una dirección web única que descarga el PDF sin usuario ni contraseña.
5. **Copia para el conductor.** El QR sale también en todos los formatos de albarán y en el modelo de carta de porte. Desde el albarán ves el PDF, copias la dirección, descargas el QR suelto o lo imprimes.
6. **Cambios.** Otra matrícula u otro peso generan una versión nueva con la misma dirección web y el historial con su motivo. Un albarán anulado queda indicado. Nada se borra.

Va incluido en el módulo Financiero, en todos los planes desde 19 €/mes sin IVA. Si comparas con otras opciones del mercado, tienes la [comparativa de software para el DeCA](/blog/software-deca-comparativa-pymes). Y si tus envíos salen en palets, el mismo albarán puede llevar los palets escaneados con su [etiqueta SSCC](/blog/etiqueta-sscc-gs1-palets).

## ¿Cuáles son los errores más típicos al generar el DeCA?

Los que vemos una y otra vez: el NIF del transportista vacío, el peso a cero porque faltan pesos de artículos, la matrícula del tractor sin la del semirremolque, el PDF generado cuando el camión ya ha salido, un QR que lleva a una página con login, y cambios en ruta hechos a mano sobre el papel. Todos tienen arreglo fácil si se detectan antes de la salida.

| Error | Qué pasa | Cómo evitarlo |
| --- | --- | --- |
| Transportista sin NIF | Falta el apartado b), del que responde el cargador | Completar fichas de transportistas antes de empezar |
| Peso a cero o inventado | El apartado d) no cuadra con la carga | Peso en cada artículo; que el programa avise si falta |
| Solo la matrícula del tractor | En un articulado falta la del semirremolque (apartado g) | Campo de remolque obligatorio en vehículos articulados |
| PDF creado tras la salida | La fecha de creación en los metadatos lo delata | Generar en el muelle, antes de cargar el último palet |
| Albarán escaneado con QR pegado | No es PDF nativo: no vale | Generar desde los datos del programa |
| QR que abre una web con login o botón | La Resolución no lo admite | Probar el QR con un móvil sin sesión |
| Cambio escrito a mano en la copia | No cuenta para la inspección | Modificar el PDF o generar uno nuevo |
| Cargador y transportista mezclados | El documento no los diferencia de forma expresa | Página de control con los apartados rotulados |

La multa por no llevar el documento o llevarlo sin datos esenciales es grave: de 401 a 600 € por expedición, según los artículos 141.17 y 143.1.d de la [Ley de Ordenación de los Transportes Terrestres](https://www.boe.es/buscar/act.php?id=BOE-A-1987-17803).

## Preguntas frecuentes sobre cómo generar el DeCA

### ¿Puedo usar mi albarán como DeCA?

Sí. El artículo 5 de la Orden FOM/2861/2012 dice que el documento de control es de libre edición y la Resolución de 5 de junio de 2026 admite cualquier formato de documento de transporte, albarán incluido, siempre que lleve los ocho datos del artículo 6 y distinga de forma expresa al cargador contractual y al transportista efectivo. Desde el 5 de octubre de 2026 debe ser un PDF generado desde los datos, con QR.

### ¿Vale escanear el albarán firmado y añadirle un QR?

No. La Resolución exige que el PDF sea nativo digital, es decir, generado transformando los datos del programa en texto. Los ficheros obtenidos al escanear un papel o a partir de imágenes no son válidos, aunque lleven QR.

### ¿Cuándo hay que generar el DeCA?

Siempre antes del inicio efectivo del servicio, y en cuanto se conozcan los datos. El programa debe registrar la fecha y hora de creación del fichero, y de cada modificación, como metadatos del PDF. El conductor tiene que llevar su copia con el QR antes de arrancar.

### ¿Qué tiene que pasar al escanear el QR del DeCA?

Que se descargue directamente el PDF. La URL tiene que empezar por https, con TLS 1.2 o superior, y no puede llevar a una página que pida usuario o contraseña ni obligue a pulsar un botón de descarga. Puede tener medidas de seguridad, pero no caducar antes de que acabe el servicio.

### ¿Se pueden incluir varios albaranes en un mismo DeCA?

Sí, si el cargador contractual y el transportista efectivo son los mismos en todos los envíos. En ese caso hay que identificar por separado el origen, el destino, la mercancía y el peso de cada envío, según el apartado sexto de la Resolución de 5 de junio de 2026.

### ¿Cómo se genera el DeCA en Drenpos?

Desde el albarán de venta, con el botón Activar DeCA. El sistema comprueba los datos que exige la norma, avisa de lo que falta y genera un PDF con la página de control y el albarán detrás, con un QR de descarga directa. Va incluido en el módulo Financiero, en todos los planes.

## Siguiente paso

Si quieres verlo con tus propios albaranes, pide una demo de veinte minutos en [DeCA desde el albarán](/documento-control-transporte-deca). Para el resto de la salida de mercancía (ubicaciones, preparación y expedición), mira la [gestión de almacén](/software-gestion-almacen).
