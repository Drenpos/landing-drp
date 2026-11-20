---
title: "Entradas y salidas de almacén: tipos de movimiento y cómo registrarlos para que cuadre el stock"
meta_title: "Entradas y salidas de almacén: cómo registrarlas bien"
description: "Qué tipos de entradas y salidas de almacén hay, qué documento respalda cada una, por qué se descuadra el stock y cómo registrarlas para que cuadre. Con ejemplo."
date: 2026-11-20
updated: 2026-11-20
image: "/images/blog/como-organizar-almacen-pyme/cover.jpg"
author:
  name: "Alonso Bermejo Pérez"
  designation: "CEO & Founder"
  avatar: "/images/alonso.jpg"
categories: ["Gestión de Almacén", "Logística y 3PL", "Productividad"]
tags:
  [
    "entradas y salidas de almacén",
    "movimientos de stock",
    "programa de entradas y salidas de almacén",
    "control de stock",
    "regularización de inventario",
    "mermas almacén",
    "albarán de entrada",
  ]
featured: false
draft: false
hero:
  title: "El stock no se descuadra en el inventario. Se descuadra en cada movimiento que no se apuntó"
  description: "Los tipos de entrada y de salida que tiene cualquier almacén, el documento que respalda cada uno, un ejemplo con números y las reglas para que la pantalla diga lo mismo que la estantería."
faq:
  - question: "¿Qué es una entrada de almacén?"
    answer: "Es cualquier movimiento que suma unidades al stock de un almacén: una compra recibida, una devolución de cliente, un producto fabricado, un traslado que llega de otro almacén o una regularización al alza tras un inventario. Cada una debería tener un documento que la respalde, como el albarán del proveedor o la orden de fabricación."
  - question: "¿Qué es una salida de almacén?"
    answer: "Es cualquier movimiento que resta unidades: una venta expedida, una devolución al proveedor, el consumo de material en producción, un traslado a otro almacén, una merma por rotura o caducidad o una regularización a la baja. Igual que las entradas, cada salida debería ir con su documento y su motivo."
  - question: "¿Por qué no me cuadra el stock?"
    answer: "Casi siempre porque hay movimientos que no se registran, se registran tarde o se registran mal: una merma que nadie apunta, un traslado que sale y no se recibe, una venta registrada en unidades cuando salió en cajas o un artículo dejado en otra ubicación. Los robos y los errores de proveedor existen, pero pesan menos de lo que parece."
  - question: "¿Se pueden llevar las entradas y salidas de almacén en Excel?"
    answer: "Se puede con pocas referencias y una sola persona apuntando. En cuanto hay varias personas, lotes o más de un almacén, el Excel no sabe quién cambió qué, no avisa cuando falta stock y se rellena a final de día, que es justo cuando se pierden los movimientos."
  - question: "¿Cada cuánto hay que hacer inventario para corregir el stock?"
    answer: "Depende del valor y la rotación de cada referencia. En vez de un inventario anual de todo, funciona mejor el inventario cíclico: contar cada semana una parte, empezando por lo que más sale o más vale, y regularizar las diferencias con su motivo."
---

> Una entrada de almacén es todo movimiento que suma stock: compras recibidas, devoluciones de clientes, producción terminada, traslados que llegan y regularizaciones al alza. Una salida es lo que lo resta: ventas expedidas, devoluciones a proveedor, consumos de producción, traslados que salen, mermas y regularizaciones a la baja. El stock cuadra cuando cada movimiento se registra en el momento, con su documento y su motivo.

<div class="my-8 flex justify-center">
  <a href="/software-control-stock" class="inline-flex rounded-full px-6 py-3 font-semibold text-white" style="background: var(--bg-menu-lig);">
    Ver el control de stock de Drenpos
  </a>
</div>

Cuando un cliente me dice que su stock no cuadra, la conversación casi nunca va de robos. Va de la caja rota que se tiró sin apuntar, del traslado que salió el viernes y nadie recibió, o de la venta que se registró en unidades cuando salió en cajas. El inventario solo enseña el agujero. Se cava antes, movimiento a movimiento.

## ¿Qué es una entrada y una salida de almacén?

Una entrada de almacén es cualquier movimiento que suma unidades al stock de un almacén y una salida es cualquier movimiento que las resta. Las dos tienen que dejar rastro de qué artículo, cuántas unidades, en qué almacén y ubicación, cuándo, quién y por qué. Ese registro se llama movimiento de stock, y la suma de todos es el stock.

La regla de oro es que nada entre ni salga sin un documento detrás: albarán, orden de fabricación, traslado o acta de regularización. Sin documento no hay forma de saber después si el movimiento era correcto.

## ¿Qué tipos de entradas hay?

| Tipo de entrada | De dónde viene | Documento que la respalda |
| --- | --- | --- |
| Compra recibida | Un proveedor entrega lo que se le pidió | Albarán del proveedor, contrastado con el pedido de compra |
| Devolución de cliente | El cliente devuelve producto vendido | Albarán o factura rectificativa, con el motivo |
| Producción terminada | Se fabrica o se monta un producto | Orden de fabricación o de montaje |
| Traslado entrante | Llega mercancía de otro almacén de la empresa | Documento de traslado |
| Regularización al alza | El recuento encuentra más de lo que dice el sistema | Acta de inventario, con el motivo |

La entrada que más errores genera es la compra. Si se da de alta mirando solo el albarán del proveedor, se cuela lo que el proveedor puso mal. Lo correcto es recibir contra el pedido y anotar las diferencias, como explicamos en la guía de [recepción de mercancía](/blog/recepcion-mercancia-almacen).

## ¿Qué tipos de salidas hay?

| Tipo de salida | Qué ocurre | Documento que la respalda |
| --- | --- | --- |
| Venta expedida | La mercancía sale hacia un cliente | Albarán o factura de venta |
| Devolución a proveedor | Se devuelve mercancía defectuosa o equivocada | Albarán de devolución |
| Consumo en producción | El material se gasta al fabricar | Orden de fabricación |
| Traslado saliente | La mercancía va a otro almacén de la empresa | Documento de traslado |
| Merma | Rotura, caducidad, robo o pérdida | Registro de merma con el motivo |
| Regularización a la baja | El recuento encuentra menos de lo que dice el sistema | Acta de inventario, con el motivo |

La salida que más descuadra es la merma, porque nadie la quiere apuntar. Una caja rota que se tira sin registrar es stock fantasma: el sistema dice que hay y la estantería dice que no. Y ese día alguien vende lo que no tiene.

## ¿Por qué se descuadra el stock?

Porque hay movimientos que no se registran, que se registran tarde o que se registran mal. En la práctica, cinco causas explican casi todos los descuadres:

1. **Mermas sin registrar.** Lo roto, lo caducado y lo que se coge para uso interno sale sin papel.
2. **Traslados a medias.** Sale del almacén A y nadie lo recibe en el B, así que durante días no está en ninguno.
3. **Unidades mal convertidas.** Se compra en cajas de 12 y se vende por unidades, y alguien apunta 1 donde eran 12.
4. **Ubicación equivocada.** El producto está, pero en otro hueco, y para el sistema es como si no estuviera.
5. **Registro a final de día.** Lo que se apunta de memoria a las siete de la tarde ya no es lo que pasó a las diez de la mañana.

Si quieres profundizar en la parte de reposición, la tienes en [control de stock sin roturas](/blog/control-de-stock-sin-roturas) y en cómo calcular el [stock mínimo y el punto de pedido](/blog/stock-minimo-punto-de-pedido).

## ¿Cómo queda el movimiento de una referencia en una semana?

Pongamos una referencia que se compra en cajas de 12 unidades, en un almacén con dos ubicaciones. Este es su registro de movimientos de lunes a viernes:

| Día | Movimiento | Entrada | Salida | Stock |
| --- | --- | --- | --- | --- |
| Lunes | Stock inicial | | | 40 |
| Lunes | Compra recibida: 5 cajas | 60 | | 100 |
| Martes | Venta expedida | | 18 | 82 |
| Miércoles | Traslado a la tienda | | 24 | 58 |
| Jueves | Devolución de cliente | 2 | | 60 |
| Jueves | Merma: una caja con golpe | | 12 | 48 |
| Viernes | Venta expedida | | 30 | 18 |

El viernes se cuentan 18 unidades y todo cuadra. Ahora quita la línea de la merma del jueves, que es lo que pasa cuando nadie la apunta: el sistema diría 30 y en la estantería habría 18. Si el punto de pedido de esa referencia está en 20, el sistema no avisa, el lunes se vende lo que no hay y el problema parece de compras cuando es de registro.

## ¿Cómo se registran las entradas y salidas para que cuadre el stock?

Con seis reglas sencillas, que valen igual para un almacén de 200 referencias que para uno de 20.000:

1. **Nada se mueve sin documento.** Cada entrada y cada salida va con su albarán, orden, traslado o motivo de merma.
2. **Se escanea, no se teclea.** El código de barras del artículo y el QR de la ubicación evitan la referencia de al lado.
3. **Se registra en el momento**, en la estantería, con el móvil o la PDA, no a final de día en la oficina.
4. **Cada artículo con sus unidades.** Si se compra en cajas y se vende por unidades, la conversión la hace el sistema, no la persona.
5. **Los traslados se cierran.** Lo que sale de un almacén queda en tránsito hasta que el otro lo recibe, con las diferencias anotadas.
6. **Se cuenta un poco cada semana.** Un [inventario cíclico](/blog/inventario-ciclico-almacen) encuentra el descuadre cuando todavía se recuerda qué pasó. Al regularizar, se apunta el motivo.

Para los traslados entre almacenes hay un detalle que se olvida mucho, la mercancía en tránsito. Lo explicamos en [traslados entre almacenes](/blog/traslados-entre-almacenes-transito).

## ¿Por qué Excel se queda corto para las entradas y salidas?

Excel sirve mientras hay pocas referencias y una sola persona que apunta. A partir de ahí falla en lo importante: no sabe quién cambió una celda, no bloquea una salida sin stock, no lleva lotes ni caducidades con comodidad y no avisa cuando una referencia baja del mínimo. Y casi siempre se rellena a final de día, que es justo cuando se pierden los movimientos.

Si estás en ese punto, en [ERP para pymes frente a Excel](/blog/erp-para-pymes-vs-excel) tienes las señales de que ha llegado el momento de cambiar.

## ¿Cómo registra Drenpos las entradas y salidas de almacén?

En Drenpos cada compra, venta, traslado, consumo de producción o merma mueve el stock en el momento y deja rastro de quién, cuándo, dónde y por qué. Las ubicaciones llevan un QR imprimible y cada artículo admite un código de barras por formato, así que recepciones, traslados, picking e inventarios se hacen escaneando con pistola o con la cámara del móvil.

- **Recepción contra el pedido de compra**, con lotes, series e incidencias por línea. El albarán de compra se genera solo al cerrar la sesión.
- **Entrada rápida** (Movimientos › Entrada rápida) para dar entrada a varios lotes en una misma línea, con la caducidad ya propuesta, cuando no hay albarán de proveedor.
- **Salidas por venta** desde la preparación de pedidos, con el lote y la ubicación de cada línea. Lo contamos en [preparación de pedidos y picking](/blog/preparacion-de-pedidos-picking-almacen).
- **Consumo en producción:** el operario escanea el material que consume y el stock se descuenta en ese momento, con su lote.
- **Traslados en dos pasos**, con ubicación de tránsito y recepción con diferencias.
- **Mermas registradas como una línea más**, con su motivo. Nunca desaparecen en silencio.
- **Inventarios físicos** que comparan el recuento con el stock teórico y regularizan las diferencias con una entrada o una salida.

El stock se valora a precio medio ponderado y la foto por almacén y ubicación se exporta a Excel. Todo va en el módulo de Inventario, incluido en el plan Almacén por [[p:almacen]]/mes sin IVA. Tienes el detalle en el [programa de gestión de almacén](/software-gestion-almacen) y en el [control de stock](/software-control-stock).

## Preguntas frecuentes sobre las entradas y salidas de almacén

### ¿Qué es una entrada de almacén?

Es cualquier movimiento que suma unidades al stock de un almacén: una compra recibida, una devolución de cliente, un producto fabricado, un traslado que llega de otro almacén o una regularización al alza tras un inventario. Cada una debería tener un documento que la respalde, como el albarán del proveedor o la orden de fabricación.

### ¿Qué es una salida de almacén?

Es cualquier movimiento que resta unidades: una venta expedida, una devolución al proveedor, el consumo de material en producción, un traslado a otro almacén, una merma por rotura o caducidad o una regularización a la baja. Igual que las entradas, cada salida debería ir con su documento y su motivo.

### ¿Por qué no me cuadra el stock?

Casi siempre porque hay movimientos que no se registran, se registran tarde o se registran mal: una merma que nadie apunta, un traslado que sale y no se recibe, una venta registrada en unidades cuando salió en cajas o un artículo dejado en otra ubicación. Los robos y los errores de proveedor existen, pero pesan menos de lo que parece.

### ¿Se pueden llevar las entradas y salidas de almacén en Excel?

Se puede con pocas referencias y una sola persona apuntando. En cuanto hay varias personas, lotes o más de un almacén, el Excel no sabe quién cambió qué, no avisa cuando falta stock y se rellena a final de día, que es justo cuando se pierden los movimientos.

### ¿Cada cuánto hay que hacer inventario para corregir el stock?

Depende del valor y la rotación de cada referencia. En vez de un inventario anual de todo, funciona mejor el inventario cíclico: contar cada semana una parte, empezando por lo que más sale o más vale, y regularizar las diferencias con su motivo.

## Siguiente paso

Coge tres referencias que siempre te den guerra y apunta durante una semana cada movimiento con su documento, como en la tabla de arriba. Si el viernes no cuadran, ya sabes en qué paso se pierde el stock. Si quieres verlo en tu almacén, pide una demo del [programa de gestión de almacén de Drenpos](/software-gestion-almacen).
