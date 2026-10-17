---
title: "Órdenes de fabricación en una pyme: cómo llevarlas sin Excel"
meta_title: "Órdenes de fabricación en una pyme: cómo llevarlas sin Excel"
description: "Qué datos lleva una orden de fabricación, cómo se mueve por la nave y cómo se lanza desde el pedido, con el ejemplo de un taller de muebles de 9 personas."
date: 2026-10-17
image: "/images/blog/erp-para-pymes-vs-excel/cover.jpg"
author:
  name: "Alonso Bermejo Pérez"
  designation: "CEO & Founder"
  avatar: "/images/alonso.jpg"
categories: ["Producción", "Gestión Empresarial"]
tags:
  [
    "órdenes de fabricación",
    "orden de producción",
    "software órdenes de fabricación",
    "control de producción pyme",
    "orden de trabajo taller",
    "producción sin Excel",
  ]
featured: false
draft: false
hero:
  title: "Órdenes de fabricación en una pyme, sin Excel ni pizarra"
  description: "Qué datos tiene que llevar una orden, cómo pasa por cada fase de la nave, cómo se lanza desde un pedido de venta y qué cambia el primer mes, con los números de un taller de muebles."
faq:
  - question: "¿Qué diferencia hay entre una orden de fabricación y una orden de trabajo?"
    answer: "La orden de fabricación produce un artículo que entra en el almacén con su lote y su coste. La orden de trabajo de servicio no produce stock: acumula el material y las horas de una reparación o un montaje para un cliente, y después se factura. En Drenpos las dos son el mismo documento con distinto tipo (Fabricación o Servicio), y en las de servicio el cliente es obligatorio."
  - question: "¿Si cambio la receta se cambian las órdenes que ya están lanzadas?"
    answer: "No. Al crear una orden desde un trabajo tipo, la receta se copia en la orden en vez de quedar enlazada. Si mañana cambias la cantidad de barniz por mesa, las órdenes nuevas salen con el dato nuevo y las que ya están en marcha conservan lo que tenían. Mientras la orden está en borrador se puede editar entera, incluida la cantidad."
  - question: "¿Qué pasa si se consume más material del previsto?"
    answer: "Se permite, porque la realidad manda, pero el sistema avisa en ámbar y pide el motivo: rotura, defecto del proveedor, ajuste de receta u otro. Esos motivos salen después en el informe de desviaciones por producto y por receta, así que se ve si el tablero que se raja es mala suerte o un problema de proveedor que se repite cada mes."
  - question: "¿Hace falta una tablet por operario?"
    answer: "El puesto de trabajo de Drenpos está pensado para que cada operario entre con su propia sesión en su tablet, porque las horas de cada fase van a su nombre. No hay tarjeta de empleado para un puesto compartido. La pistola lectora es opcional: sin ella se elige la orden de una lista y se consume el material con botones de +1, +5 o +10."
---

> Una orden de fabricación es el documento que dice qué se fabrica, cuántas unidades, para cuándo, con qué materiales y por qué fases pasa. En una pyme suele vivir en un Excel o en una pizarra hasta que hay más de diez trabajos abiertos a la vez. A partir de ahí la hoja no sabe qué material falta, quién está en cada fase ni cuánto ha costado de verdad cada trabajo. Abajo tienes cómo se lleva en un taller de muebles de 9 personas.

<div class="my-8 flex justify-center">
  <a href="/software-produccion-fabricacion" class="inline-flex rounded-full px-6 py-3 font-semibold text-white" style="background: var(--bg-menu-lig);">
    Ver el módulo de producción de Drenpos
  </a>
</div>

## ¿Qué es una orden de fabricación?

Una orden de fabricación (también la verás como orden de producción u OF) es la instrucción interna para fabricar una cantidad concreta de un producto antes de una fecha. Lleva el producto, la cantidad, la fecha comprometida, la lista de materiales, las fases del proceso y quién las hace. Mientras está abierta recoge lo que se consume de verdad y las horas que se dedican. Al cerrarla, el producto entra en el almacén con su coste.

Conviene separarla de la orden de trabajo de servicio, la de quien repara una máquina o monta una cocina en casa del cliente: no fabrica nada para la estantería, acumula material y horas para cobrarlos. En Drenpos son el mismo documento con distinto tipo. La de **Fabricación** produce un artículo que entra en stock con su lote; la de **Servicio** lleva cliente obligatorio y, al cerrarla, abre el albarán ya relleno con el material y las horas reales.

El ejemplo de este artículo es un taller de muebles con 9 personas: 6 en la nave, un encargado y 2 en oficina. Hace unas 35 órdenes al mes, la mayoría mesas, sillas y aparadores para tiendas de decoración.

## ¿Qué datos debe llevar una orden de fabricación?

Como mínimo: número, producto, cantidad, fecha comprometida, prioridad, materiales con su cantidad y fases con el puesto que las hace y sus horas previstas. Con eso se planifica. Para que la orden sirva además para costes y trazabilidad hacen falta los datos reales: qué lote de cada material se consumió, cuántas horas echó cada persona en cada fase, cuántas piezas salieron buenas y cuántas defectuosas, y con qué lote entra el producto terminado.

| Dato | Para qué sirve | Ejemplo en el taller de muebles |
| --- | --- | --- |
| Número y serie | Identificar la orden en la nave y en los papeles | OF-2026-0142 |
| Producto y cantidad | Saber qué entra en stock al cerrar | 12 mesas de comedor de roble 180 x 90 |
| Fecha comprometida y prioridad | Ordenar la cola de trabajo | 6 de noviembre, urgente |
| Cliente o pedido de origen | Saber para quién es | Pedido de una tienda de decoración |
| Materiales previstos | Tenerlo todo antes de empezar | 12 tableros alistonados, 48 patas, herrajes, barniz |
| Fases y puesto | Saber por dónde pasa | Corte, mecanizado CNC, montaje, lijado, barnizado |
| Horas previstas | Comparar con las reales | 38 horas para las 12 mesas |
| Consumos reales con lote | Coste y trazabilidad | 13 tableros (uno se rajó en el corte) |
| Horas reales por persona | Coste de mano de obra | 41,5 horas |
| Buenas, defectuosas y lote | Lo que entra de verdad en el almacén | 12 buenas, 0 defectuosas |

## ¿Por qué el Excel deja de servir para llevar las órdenes?

Porque el Excel guarda lo que alguien escribe, no lo que pasa. No descuenta el material del almacén cuando se consume, no sabe si hay tablero para las tres órdenes de la semana, no registra quién estuvo en cada fase ni cuánto tiempo, y dos personas no pueden actualizarlo a la vez sin pisarse. Funciona con cinco órdenes abiertas. Con veinte, el encargado pasa más tiempo cuadrando la hoja que en la nave.

En el taller del ejemplo el encargado dedicaba cerca de una hora al día a preguntar puesto por puesto por dónde iba cada trabajo y pasarlo a la hoja: unas 22 horas al mes.

El segundo coste es el stock. El Excel decía que quedaban 20 tableros de roble y en la estantería había 7, porque los consumos se apuntaban cuando alguien se acordaba. Se quedaron sin material a mitad de una orden y el pedido salió con tres días de retraso.

## ¿Cómo se mueve una orden por la nave, paso a paso?

En cinco pasos: se crea desde la receta con su fecha y su prioridad, se comprueba que hay material, el operario arranca su fase y consume escaneando, las fases se cierran una a una y al final se declara la cantidad buena para que el producto entre en el almacén con su lote. Cada paso deja rastro, así que cualquiera sabe en qué punto está la orden sin tener que bajar a preguntar.

Así lo hace el taller en Drenpos:

1. **Alta desde el trabajo tipo.** El encargado abre «Mesa comedor roble 180» y pulsa fabricar. La orden copia materiales, horas previstas y fases, y se le pone fecha comprometida y prioridad. Una orden ya hecha también se puede duplicar.
2. **Comprobación de material.** La orden enseña un semáforo: verde si hay de todo, ámbar si se cubre con lo que viene de compras, rojo si falta.
3. **Trabajo en planta.** El operario ve la fase en «Mi trabajo» en su tablet, pulsa empezar y consume escaneando. Para la tornillería y el barniz, «Consumir lo previsto» descuenta lo que dice la receta.
4. **Pausas con motivo.** Si se para, elige por qué: falta material, avería, calidad, fin de turno u otro. Ese motivo alimenta el informe de paros.
5. **Cierre.** Con todas las fases hechas se declara la cantidad real, las defectuosas aparte y la ubicación de entrada. El lote sale solo con el número de la orden y la fecha, y se imprimen las etiquetas.

## ¿Cómo se lanza una orden desde un pedido de venta?

Se crea una orden por cada línea del pedido que se fabrica, con el cliente, la fecha y solo la cantidad que falta. Esa cantidad es lo pedido, menos lo ya servido, menos lo que ya está en otras órdenes, menos el stock libre. Así no se fabrican mesas que ya estaban en la estantería ni se duplica una orden que el encargado lanzó la semana anterior para el mismo cliente.

Un ejemplo con sillas de roble:

| Concepto | Unidades |
| --- | --- |
| Pedidas por la tienda | 20 |
| Ya servidas en un albarán anterior | 4 |
| Ya en una orden abierta | 6 |
| Libres en el almacén | 3 |
| **Cantidad de la orden nueva** | **7** |

A partir de ahí el pedido y la orden quedan conectados. Si la orden va tarde, le falta material o lleva días parada, el cuadro de producción marca ese pedido como en riesgo. Y las alertas de pedidos de venta dicen «En producción» con el número de la orden en vez de pedir que se compre algo que va a salir de la nave.

## ¿Cómo se sabe si hay material antes de empezar?

Sumando lo que piden todas las órdenes abiertas y comparándolo con lo libre en el almacén y con lo que viene de compras. Una orden suelta casi siempre tiene material; el problema aparece cuando tres órdenes tiran del mismo tablero. Por eso el cálculo tiene que ser conjunto, producto a producto, y avisar antes de que el operario llegue a la estantería y se la encuentre vacía.

En el taller, esta semana hay tres órdenes que usan tablero de roble: la OF-0142 necesita 13, la OF-0145 necesita 8 y la OF-0150 necesita 10. Son 31. Hay 18 libres y vienen 10 en un pedido de compra. Faltan 3, así que el semáforo sale en rojo.

En Drenpos eso se ve en la pantalla de necesidades de material. Desde las filas con falta se genera el pedido de compra: uno por proveedor, con la cantidad redondeada a la unidad de compra y la fecha de la orden que antes lo necesita. Si lo ya pedido llega después, la fila dice «Llega tarde». Con reservas de stock activadas, el material se reserva al arrancar la orden y ventas no se lo lleva. Los mínimos y la propuesta de compra del resto del almacén se explican en la página de [control de stock](/software-control-stock).

## ¿Cómo apunta el operario las horas sin partes de papel?

Pulsando empezar y parar en la fase desde su tablet, o escaneando el QR de la hoja de la orden. Las horas caen solas en la línea de mano de obra de esa fase, con su nombre, y se valoran al coste hora del puesto. No hay que pasar partes a final de semana ni reconstruir de memoria cuántas horas se fueron en el barnizado de un pedido concreto de hace diez días.

Este fichaje de tarea es independiente del registro de jornada. El operario ficha su entrada y su salida del día como siempre (lo explicamos en [control horario](/control-horario)) y, dentro de la jornada, ficha en qué fase de qué orden está. Las dos cosas conviven sin pisarse.

Varios operarios pueden estar en la misma fase, cada uno con su reloj, y si alguien ficha en una orden que ya no estaba en curso sus horas quedan en «Horas sin imputar» para que el encargado las reasigne. La CNC es un puesto de tipo máquina con su coste hora: sus horas se apuntan a mano o se usan las previstas con un toque.

## ¿Qué cambia el primer mes al dejar el Excel?

Lo primero que se nota no es el ahorro de tiempo, sino las sorpresas: productos que se creían rentables y no lo son, fases que se comen bastantes más horas de lo presupuestado y material que se consume sin que nadie lo apunte. Con un mes de órdenes cerradas ya hay datos suficientes para repreciar lo que pierde dinero y para presupuestar el siguiente pedido con horas reales en vez de con intuición.

| Qué se mira | Con Excel | Con un software de producción |
| --- | --- | --- |
| Estado de cada orden | Lo que recuerde el encargado | Fase en curso, quién está y desde cuándo |
| Material | Se apunta tarde o no se apunta | Se descuenta al consumirlo, con su lote |
| Faltas | Se descubren en la estantería | Semáforo antes de empezar |
| Horas | Partes de papel semanales | Fichaje por fase con nombre |
| Coste | Presupuestado y nunca revisado | Previsto frente a real en cada orden |
| Trazabilidad | No existe | Lote de cada material y del producto terminado |

En el taller, la mesa de roble se presupuestaba con 38 horas por cada orden de 12 mesas. Las órdenes reales salían a 41,5. Con un coste interno de 21 € la hora, son 73,50 € más por orden. A tres órdenes de mesas al mes, 220,50 € al mes que no aparecían en ningún informe. El cálculo completo, con materiales y mermas, lo tienes en la guía de [escandallo y coste de fabricación](/blog/escandallo-lista-materiales-coste-fabricacion).

## ¿Qué no hace un software de órdenes como Drenpos?

Drenpos no es un MRP completo: no planifica solo con capacidad finita ni dibuja un diagrama de Gantt. Enseña la carga de cada puesto frente a la capacidad de su calendario, las fechas y las faltas de material, y el encargado decide el orden de la cola arrastrando tarjetas en el tablero. Tampoco admite cierres parciales: el producto entra en stock al cerrar la orden entera, así que quien quiera meter género por turnos lanza una orden por turno.

Además, el puesto de trabajo necesita conexión (sin red avisa y bloquea el escaneo para no mover stock a ciegas), no lee sensores de máquina y no factura solo: deja el albarán relleno para que una persona lo revise.

## ¿Cuánto cuesta llevar las órdenes de fabricación en Drenpos?

El módulo de producción va en el plan Producción, que cuesta 50 € al mes sin IVA e incluye también los módulos de Inventario, Financiero, Informes y Fichajes. Cada operario que ficha tiempo en las órdenes necesita su usuario y su licencia de fichaje. Si la plantilla supera lo incluido en el plan, cada usuario adicional cuesta 5 € y cada licencia de fichaje 1 € al mes, siempre sin IVA y sin coste de instalación.

Como el inventario va en el mismo plan, el lote de cada material consumido queda enlazado con el lote de la mesa terminada. Cómo se aprovecha eso ante una reclamación lo contamos en [trazabilidad de lotes en producción](/blog/trazabilidad-lotes-produccion).

## Preguntas frecuentes sobre órdenes de fabricación

### ¿Qué diferencia hay entre una orden de fabricación y una orden de trabajo?

La orden de fabricación produce un artículo que entra en el almacén con su lote y su coste. La orden de trabajo de servicio no produce stock: acumula el material y las horas de una reparación o un montaje para un cliente, y después se factura. En Drenpos las dos son el mismo documento con distinto tipo (Fabricación o Servicio), y en las de servicio el cliente es obligatorio.

### ¿Si cambio la receta se cambian las órdenes que ya están lanzadas?

No. Al crear una orden desde un trabajo tipo, la receta se copia en la orden en vez de quedar enlazada. Si mañana cambias la cantidad de barniz por mesa, las órdenes nuevas salen con el dato nuevo y las que ya están en marcha conservan lo que tenían. Mientras la orden está en borrador se puede editar entera, incluida la cantidad.

### ¿Qué pasa si se consume más material del previsto?

Se permite, porque la realidad manda, pero el sistema avisa en ámbar y pide el motivo: rotura, defecto del proveedor, ajuste de receta u otro. Esos motivos salen después en el informe de desviaciones por producto y por receta, así que se ve si el tablero que se raja es mala suerte o un problema de proveedor que se repite cada mes.

### ¿Hace falta una tablet por operario?

El puesto de trabajo de Drenpos está pensado para que cada operario entre con su propia sesión en su tablet, porque las horas de cada fase van a su nombre. No hay tarjeta de empleado para un puesto compartido. La pistola lectora es opcional: sin ella se elige la orden de una lista y se consume el material con botones de +1, +5 o +10.

## Siguiente paso

Si hoy llevas las órdenes en una hoja de cálculo, empieza por las cinco recetas que más fabricas y lanza con ellas las órdenes de una semana. En la página del [software de producción y fabricación](/software-produccion-fabricacion) tienes lo que hace el módulo y lo que no, y puedes pedir una demo con tus propios productos.
