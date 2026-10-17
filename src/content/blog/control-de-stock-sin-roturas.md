---
title: "Control de stock: qué es, métodos y cómo evitar roturas en una pyme"
meta_title: "Control de stock: qué es, métodos y cómo evitar roturas"
description: "Qué es el control de stock, qué métodos usar (ABC, stock mínimo, FIFO o FEFO, inventario cíclico), cómo calcular el punto de pedido y evitar roturas."
date: 2026-08-11
updated: 2026-10-17
image: "/images/blog/control-de-stock-sin-roturas/cover.jpg"
author:
  name: "Alonso Bermejo Pérez"
  designation: "CEO & Founder"
  avatar: "/images/alonso.jpg"
categories: ["Gestión de Almacén", "Gestión de retail", "Automatización pymes"]
tags:
  [
    "control de stock",
    "rotura de stock",
    "métodos de control de inventario",
    "stock mínimo",
    "punto de pedido",
    "stock disponible",
    "reservas de stock",
    "gestión de inventario",
  ]
featured: false
draft: false
hero:
  title: "Control de stock sin roturas"
  description: "Qué es, qué métodos funcionan en una pyme y cómo saber qué pedir antes de quedarte sin género."
faq:
  - question: "¿Qué es el control de stock?"
    answer: "Es el conjunto de reglas y registros que permiten saber en todo momento cuánto hay de cada artículo, dónde está y cuánto se puede vender, y decidir cuándo y cuánto reponer. Incluye registrar cada entrada y salida, fijar mínimos, elegir una regla de salida (FIFO o FEFO) y contar de forma periódica para que el stock del sistema coincida con el de la estantería."
  - question: "¿Qué es una rotura de stock?"
    answer: "Es quedarse sin unidades de un artículo cuando un cliente lo pide, o descubrir que las que había ya estaban comprometidas con otro pedido. Casi siempre nace dentro de la empresa: un mínimo que no estaba fijado, un aviso que no llegó, un pedido al proveedor hecho a ojo o un stock en el sistema que no coincide con el real."
  - question: "¿Cómo evitar roturas de stock en una pyme?"
    answer: "Con cuatro piezas: registrar cada movimiento al momento, fijar un stock mínimo o punto de pedido por referencia con alerta, separar el stock físico del disponible con reservas al confirmar pedidos, y contar una parte del almacén cada semana con inventario cíclico. La reposición se hace desde una propuesta de compra revisada una vez por semana, no de memoria."
  - question: "¿Cómo se calcula el punto de pedido?"
    answer: "Punto de pedido = consumo medio diario × plazo de entrega del proveedor en días + stock de seguridad. Si vendes 20 unidades al día, el proveedor tarda 5 días y quieres un colchón de 40 unidades, el punto de pedido es 20 × 5 + 40 = 140 unidades. Cuando el stock disponible baja de 140, toca pedir."
  - question: "¿Qué métodos de control de stock existen?"
    answer: "Los más usados en pymes son el inventario permanente (cada movimiento actualiza el stock al momento), el inventario periódico (se cuenta cada cierto tiempo), la clasificación ABC por rotación, el stock mínimo con punto de pedido, las reglas de salida FIFO, FEFO o LIFO y el inventario cíclico, que cuenta una parte del almacén cada semana sin cerrar."
  - question: "¿Sirve Excel para llevar el control de stock?"
    answer: "Hasta cierto volumen, sí. Deja de servir cuando varias personas mueven stock a la vez, cuando vendes en tienda y en almacén, cuando trabajas con lotes y caducidades o cuando aparecen versiones distintas del mismo archivo. A partir de ahí el Excel describe un almacén que ya no existe."
  - question: "¿Qué diferencia hay entre stock físico y stock disponible?"
    answer: "El stock físico es lo que hay en la estantería; el disponible es lo que puedes vender, es decir, el físico menos lo reservado por pedidos ya confirmados. Vender mirando solo el físico es la vía rápida para comprometer dos veces la misma unidad."
  - question: "¿Qué pasa con una reserva si el pedido se sirve a medias?"
    answer: "En Drenpos la reserva se consume en la parte servida y el resto sigue comprometido para ese cliente hasta completar la entrega. Si el pedido se queda parado, se puede configurar una caducidad de reserva para que las unidades vuelvan solas al stock disponible pasado el plazo."
---

> **Respuesta corta:** el control de stock es saber en todo momento cuánto tienes de cada artículo, dónde está y cuánto puedes vender de verdad, y reponer antes de quedarte sin género. En una pyme se apoya en cuatro reglas: registrar cada movimiento al momento, fijar un stock mínimo o punto de pedido por referencia, separar el stock físico del disponible y contar una parte del almacén cada semana. Con eso, la mayoría de roturas desaparecen.

<div class="my-8 flex justify-center">
  <a href="/software-control-stock" class="inline-flex rounded-full px-6 py-3 font-semibold text-white" style="background: var(--bg-menu-lig);">
    Ver el control de stock de Drenpos
  </a>
</div>

## ¿Qué es el control de stock?

El control de stock es el conjunto de reglas y registros que te dicen cuánto hay de cada artículo, en qué almacén y ubicación está, cuánto está ya comprometido y cuándo hay que pedir más. No es contar una vez al año: es registrar cada entrada y cada salida en el momento, fijar mínimos por referencia y comprobar de forma periódica que el sistema y la estantería dicen lo mismo.

En la práctica responde a cuatro preguntas que un dueño de pyme se hace cada semana: qué tengo, dónde lo tengo, qué puedo vender sin fallarle a nadie y qué tengo que comprar. Si alguna de las cuatro se contesta "creo que...", el control de stock no está funcionando.

## ¿Qué es una rotura de stock y por qué ocurre?

Una rotura de stock es quedarte sin unidades de un artículo cuando un cliente lo pide, o descubrir que las que había ya estaban vendidas a otro. Casi nunca la provoca el proveedor. Suele nacer dentro: un mínimo sin fijar, un pedido de compra hecho a ojo, un movimiento sin registrar o un stock en pantalla que no coincide con el de la estantería.

| Causa | Cómo se nota | Cómo se corta |
| --- | --- | --- |
| No hay stock mínimo fijado | Te enteras cuando la balda ya está vacía | Mínimo o punto de pedido por referencia, con alerta |
| Compras de memoria | Pides de lo que te acuerdas y no de lo que falta | Propuesta de compra con consumo real y lo que viene de camino |
| Movimientos sin registrar | Mermas, roturas o traslados que no constan | Registro por escaneo de cada entrada, salida y traslado |
| Vender el físico, no el disponible | Dos clientes con la misma unidad | Reservas al confirmar el pedido |
| Stock teórico desviado | El sistema dice 12 y hay 3 | Inventario cíclico semanal |
| Producto que no se encuentra | "Está, pero no sé dónde" | Ubicaciones codificadas con QR |

## ¿Cuánto cuesta una rotura de stock?

Más de lo que se ve en caja. El estudio de Corsten y Gruen sobre distribución minorista, que recoge [Slimstock](https://www.slimstock.com/blog/the-hidden-cost-of-stockouts-why-retailers-cant-afford-empty-shelves/), calcula que las roturas se llevan de media un 4 % de las ventas y que el 72 % nacen de problemas de pedido y reposición que la propia tienda puede corregir. Ante el hueco, el cliente sustituye, espera, abandona la compra o se va a la competencia.

Son datos de gran distribución y en tu negocio la cifra será otra. El patrón, en cambio, se repite en cualquier tienda o almacén: la mayoría de las roturas son un aviso que no llegó o un pedido que se hizo a ojo. Por eso las dos palancas más baratas son el stock mínimo con alerta y la propuesta de compra.

![Encargado de almacén revisando el inventario con una lista de comprobación entre estanterías](/images/blog/control-de-stock-sin-roturas/section-1.jpg)

## ¿Qué métodos de control de stock existen?

Los métodos que usan las pymes se combinan entre sí: uno decide cuándo se actualiza el stock (permanente o periódico), otro qué artículos vigilar más (ABC), otro cuándo pedir (stock mínimo y punto de pedido), otro qué lote sale primero (FIFO, FEFO o LIFO) y otro cómo se comprueba (inventario cíclico). Ninguno sustituye a los demás; lo normal es usar los cinco a la vez.

| Método | Qué resuelve | Cuándo usarlo |
| --- | --- | --- |
| Inventario permanente | Cada movimiento actualiza el stock al momento | Siempre que haya un sistema que registre ventas y compras |
| Inventario periódico | Se cuenta todo cada cierto tiempo y se ajusta | Negocios muy pequeños o como cierre anual |
| Clasificación ABC | Qué referencias vigilar y contar más (las A) | Catálogos de más de 100 referencias |
| Stock mínimo y punto de pedido | Cuándo pedir y cuánto | Toda referencia que no quieras ver a cero |
| FIFO, FEFO o LIFO | Qué unidad o lote sale primero | FEFO en todo lo que caduca; FIFO en el resto |
| Inventario cíclico | Contar una parte del almacén cada semana sin cerrar | Cuando el inventario anual ya no cuadra |

Tienes cada pieza desarrollada en su guía: [stock mínimo y punto de pedido](/blog/stock-minimo-punto-de-pedido), [FIFO, FEFO y LIFO](/blog/fifo-fefo-lifo-almacen) e [inventario cíclico](/blog/inventario-ciclico-almacen).

## ¿Cómo se calcula el stock mínimo y el punto de pedido?

El punto de pedido es la cantidad a la que, cuando el stock disponible baja de ahí, hay que pedir. Se calcula así: consumo medio diario por plazo de entrega del proveedor en días, más un stock de seguridad. Con 20 unidades vendidas al día, 5 días de plazo y un colchón de 40, el punto de pedido es 20 × 5 + 40 = 140 unidades.

El stock de seguridad cubre lo que no controlas: un proveedor que se retrasa dos días o una semana de ventas por encima de lo normal. Una forma sencilla de empezar es cubrir con él los días de retraso que ya te han pasado alguna vez. En el ejemplo, dos días de retraso a 20 unidades diarias son esas 40 unidades.

| Dato | Ejemplo | De dónde sale |
| --- | --- | --- |
| Consumo medio diario | 20 ud | Ventas de los últimos 3 a 6 meses dividido entre días laborables |
| Plazo de entrega | 5 días | Lo que tarda de verdad el proveedor, no lo que promete |
| Stock de seguridad | 40 ud | Días de retraso que quieres cubrir por consumo diario |
| Punto de pedido | 140 ud | 20 × 5 + 40 |

Revisa estos números cada trimestre y en cuanto cambie el proveedor o la temporada. Un mínimo que se fijó en enero y nadie ha tocado desde entonces es la causa más común de rotura en verano.

## ¿Qué diferencia hay entre stock físico y stock disponible?

El stock físico es lo que hay en la estantería; el disponible es lo que puedes vender, es decir, el físico menos lo reservado por pedidos ya confirmados. La rotura más frustrante es la que ocurre con el producto en la balda, ya comprometido con otro cliente, sin que nadie se haya enterado. Un sistema de reservas evita justo eso.

En Drenpos, al confirmar un pedido, esas unidades quedan comprometidas para ese cliente, y en todas las pantallas se distinguen las dos cifras, también al elegir lotes y números de serie. La reserva se consume al servir, incluso en entregas parciales. Los traslados, las salidas manuales por merma y los inventarios respetan lo comprometido y avisan si una operación deja el stock por debajo de lo reservado, algo que importa cuando preparas varios pedidos a la vez con [oleadas de picking](/blog/preparacion-de-pedidos-picking-almacen).

También se configura hasta dónde llega la reserva: reservar solo lo que haya o exigir el pedido completo, y una caducidad de reserva para que, si el pedido no avanza, las unidades se liberen solas. Una pantalla de reservas activas por producto, cliente y documento dice quién tiene qué comprometido.

## ¿Sirve Excel para llevar el control de stock?

Hasta cierto volumen, sí. Excel deja de servir cuando varias personas mueven stock a la vez, cuando vendes en mostrador y preparas pedidos sobre el mismo género, cuando trabajas con lotes y caducidades o cuando aparecen dos versiones del mismo archivo. Desde ese momento la hoja describe un almacén que ya no existe, y cada tarde alguien pierde un rato cuadrando.

Piensa en una ferretería que empezó con dos personas y un Excel que bastaba. Con seis personas y tres líneas de producto, el mismo archivo lo tocan varios a la vez y ninguna versión es la buena. Cuándo compensa dar el salto lo contamos en [ERP para pymes frente a Excel](/blog/erp-para-pymes-vs-excel).

## ¿Qué indicadores de stock conviene mirar cada mes?

Cinco bastan para una pyme: rotación, cobertura en días, roturas, stock sin movimiento y exactitud del inventario. Los tres primeros dicen si compras bien; los dos últimos, si el dinero está parado o si el sistema miente. Mirarlos una vez al mes, siempre con el mismo criterio, vale más que un cuadro de mando con cuarenta cifras que nadie abre.

| Indicador | Qué mide | Señal de alarma |
| --- | --- | --- |
| Rotación | Cuántas veces se vende el stock medio en un periodo | Referencias A que rotan menos que el mes anterior |
| Cobertura en días | Cuántos días aguanta el stock al ritmo de venta actual | Por debajo del plazo de entrega del proveedor |
| Roturas | Pedidos o líneas que no se pudieron servir completas | Cualquier rotura repetida en la misma referencia |
| Stock sin movimiento | Lo que lleva meses sin salir y el dinero que ata | Más de 90 días en referencias que no son de temporada |
| Exactitud del inventario | Coincidencia entre sistema y recuento | Diferencias repetidas en las mismas ubicaciones |

![Responsable de una pyme revisando pedidos y stock desde el portátil](/images/blog/control-de-stock-sin-roturas/section-2.jpg)

## ¿Cómo se lleva el control de stock en Drenpos?

Drenpos lleva el stock en el mismo sistema que compra, vende y factura. Cada artículo tiene stock mínimo y máximo con alerta, el stock se ve por almacén, ubicación y lote, y una propuesta de compra asistida sugiere qué pedir combinando mínimos, consumo real de los últimos meses, reservas, pedidos sin stock y lo que ya viene de camino. Tú revisas y generas el pedido de compra en un clic.

Además:

- **Lotes con caducidad** y salida automática por FIFO, LIFO o FEFO, con aviso configurable días antes de que caduque un lote.
- **Ubicaciones con QR** y traslados pensados para pistola: escanear origen, producto, cantidad y destino.
- **Inventarios físicos** con regularización automática de las diferencias e informe imprimible.
- **Informes de rotación**, con cobertura en días, y de **productos sin movimiento**, con el dinero que hay parado en ellos.
- **Alertas de pedidos**: cuántas unidades faltan por comprar para servir todo lo pendiente.

Si vendes en mostrador, el TPV del plan Full descuenta del mismo stock en cada ticket, sin hojas intermedias. Tienes todo el detalle en el [software de control de stock](/software-control-stock).

## ¿Cómo pasar del stock a ojo a un control fiable en cinco pasos?

Se hace en este orden: primero el almacén físico, después el registro, después las reglas de reposición. Saltarse el primer paso es la razón por la que muchos programas de stock fracasan: el sistema no puede reflejar un almacén donde nadie sabe dónde va cada cosa. Con un almacén de tamaño pyme, los cinco pasos caben en dos o tres semanas.

1. **Ordena el almacén**: zonas, ubicaciones codificadas con QR y una regla de salida por familia. Tienes el método en la guía para [organizar el almacén de una pyme](/blog/como-organizar-almacen-pyme) y el detalle de los códigos en [cómo codificar ubicaciones](/blog/codificar-ubicaciones-almacen).
2. **Registra cada movimiento con escaneo**: entradas, traslados, mermas y salidas, sin excepciones.
3. **Activa lotes o series** solo donde haga falta, con su caducidad y su método de salida.
4. **Fija mínimos y confirma los pedidos en el sistema** para que las reservas se generen solas.
5. **Repón desde la propuesta de compra** una vez por semana y cuenta una parte del almacén cada semana con inventario cíclico.

## Preguntas frecuentes sobre control de stock

### ¿Qué es el control de stock?

Es el conjunto de reglas y registros que permiten saber en todo momento cuánto hay de cada artículo, dónde está y cuánto se puede vender, y decidir cuándo y cuánto reponer. Incluye registrar cada entrada y salida, fijar mínimos, elegir una regla de salida (FIFO o FEFO) y contar de forma periódica para que el stock del sistema coincida con el de la estantería.

### ¿Qué es una rotura de stock?

Es quedarse sin unidades de un artículo cuando un cliente lo pide, o descubrir que las que había ya estaban comprometidas con otro pedido. Casi siempre nace dentro de la empresa: un mínimo que no estaba fijado, un aviso que no llegó, un pedido al proveedor hecho a ojo o un stock en el sistema que no coincide con el real.

### ¿Cómo evitar roturas de stock en una pyme?

Con cuatro piezas: registrar cada movimiento al momento, fijar un stock mínimo o punto de pedido por referencia con alerta, separar el stock físico del disponible con reservas al confirmar pedidos, y contar una parte del almacén cada semana con inventario cíclico. La reposición se hace desde una propuesta de compra revisada una vez por semana, no de memoria.

### ¿Cómo se calcula el punto de pedido?

Punto de pedido = consumo medio diario × plazo de entrega del proveedor en días + stock de seguridad. Si vendes 20 unidades al día, el proveedor tarda 5 días y quieres un colchón de 40 unidades, el punto de pedido es 20 × 5 + 40 = 140 unidades. Cuando el stock disponible baja de 140, toca pedir.

### ¿Qué métodos de control de stock existen?

Los más usados en pymes son el inventario permanente (cada movimiento actualiza el stock al momento), el inventario periódico (se cuenta cada cierto tiempo), la clasificación ABC por rotación, el stock mínimo con punto de pedido, las reglas de salida FIFO, FEFO o LIFO y el inventario cíclico, que cuenta una parte del almacén cada semana sin cerrar.

### ¿Sirve Excel para llevar el control de stock?

Hasta cierto volumen, sí. Deja de servir cuando varias personas mueven stock a la vez, cuando vendes en tienda y en almacén, cuando trabajas con lotes y caducidades o cuando aparecen versiones distintas del mismo archivo. A partir de ahí el Excel describe un almacén que ya no existe.

### ¿Qué diferencia hay entre stock físico y stock disponible?

El stock físico es lo que hay en la estantería; el disponible es lo que puedes vender, es decir, el físico menos lo reservado por pedidos ya confirmados. Vender mirando solo el físico es la vía rápida para comprometer dos veces la misma unidad.

### ¿Qué pasa con una reserva si el pedido se sirve a medias?

En Drenpos la reserva se consume en la parte servida y el resto sigue comprometido para ese cliente hasta completar la entrega. Si el pedido se queda parado, se puede configurar una caducidad de reserva para que las unidades vuelvan solas al stock disponible pasado el plazo.

## ¿Por dónde empiezo?

Elige las 20 referencias que más vendes, fija su punto de pedido con la fórmula de arriba y cuenta esas 20 la semana que viene. Si el recuento no cuadra con el sistema, el problema está en el registro, no en las compras. Si quieres ver cómo se lleva todo esto en un solo programa, mira el [software de gestión de almacén](/software-gestion-almacen) de Drenpos o lee las [diferencias entre WMS, SGA y ERP](/blog/wms-sga-erp-diferencias).
