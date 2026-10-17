---
title: "Recepción de mercancía en el almacén: qué comprobar, cómo registrarla y qué hacer con las incidencias"
meta_title: "Recepción de mercancía: qué comprobar y cómo registrarla"
description: "Qué comprobar al recibir mercancía: albarán frente a pedido, lotes y caducidades, reservas al transportista, incidencias y cómo ubicarla después, con ejemplo."
date: 2026-10-17
image: "/images/blog/etiqueta-sscc-gs1-palets/section-1.jpg"
author:
  name: "Alonso Bermejo Pérez"
  designation: "CEO & Founder"
  avatar: "/images/alonso.jpg"
categories: ["Gestión de Almacén", "Logística y 3PL", "Trazabilidad"]
tags:
  [
    "recepción de mercancía",
    "recepción de mercancía en almacén",
    "albarán y pedido de compra",
    "incidencias en recepción",
    "reservas al transportista",
    "lotes y caducidades",
    "ubicar mercancía",
  ]
featured: false
draft: false
hero:
  title: "Recepción de mercancía: lo que se revisa en el muelle"
  description: "Qué mirar antes de firmar al transportista, cómo cuadrar pedido, albarán y lo que llega de verdad, qué hacer con lotes, caducidades e incidencias y cómo dejar la mercancía ubicada sin que se quede en el muelle."
faq:
  - question: "¿Qué hay que comprobar al recibir mercancía?"
    answer: "Primero, con el transportista delante: número de bultos o palets frente a la carta de porte, estado del embalaje, precintos y, en frío, la temperatura. Después, ya en el muelle: que las referencias y cantidades coinciden con el pedido de compra, que los lotes y las caducidades son aceptables y que no viene nada roto ni nada que no se pidió."
  - question: "¿Se recibe contra el albarán o contra el pedido?"
    answer: "Contra el pedido. El pedido de compra es lo que tú pediste; el albarán es lo que el proveedor dice que te manda. Si recibes solo contra el albarán, das por bueno lo que el proveedor decidió enviar, incluidos cambios de referencia o cantidades que no pediste. Lo correcto es contar lo que llega, compararlo con el pedido y anotar en el albarán cualquier diferencia."
  - question: "¿Cuánto tiempo hay para reclamar daños al transportista?"
    answer: "Según el artículo 60 de la Ley 15/2009 del contrato de transporte terrestre de mercancías, las reservas por pérdidas o averías se hacen por escrito en el momento de la entrega. Si el daño no se ve a simple vista, hay siete días naturales desde la entrega. Sin reservas se presume, salvo prueba en contrario, que la mercancía llegó como dice la carta de porte. Así consta a fecha de 17 de octubre de 2026."
  - question: "¿Qué se hace con la mercancía que llega con incidencia?"
    answer: "Se separa en una ubicación de incidencias con su propio código, se anota en el albarán qué ha pasado (falta, rotura, referencia equivocada, caducidad corta) y se avisa a compras para que lo reclame al proveedor. Lo que está bien se recibe y se ubica con normalidad; lo dañado no entra en el stock disponible hasta que se decida qué hacer con ello."
  - question: "¿Qué es el cross-docking en la recepción?"
    answer: "Es sacar directamente hacia expedición la mercancía que llega y que ya tiene un pedido de cliente esperando, sin pasar por la estantería. Ahorra una ubicación y una recogida. Para hacerlo hace falta que, al recibir, el programa avise de qué líneas tienen pedidos de venta pendientes."
  - question: "¿Cómo se registra la recepción en Drenpos?"
    answer: "Con una sesión de recepción contra el pedido de compra: el operario escanea con la pistola, el sistema compara lo esperado con lo recibido, valida lotes y series y deja anotar incidencias por línea. Al cerrar la sesión se genera el albarán de compra, se pueden imprimir etiquetas GS1 con lote y avisa si hay pedidos de venta esperando ese producto."
---

> Recibir mercancía es comprobar que lo que llega coincide con lo que pediste, en cantidad, referencia, estado, lote y caducidad, antes de que entre en el stock. Se revisa en dos tiempos: con el transportista delante (bultos, embalaje, temperatura) y después contra el pedido de compra, no contra el albarán. Las diferencias se anotan, lo dañado se separa y lo bueno se ubica en su hueco ese mismo día.

<div class="my-8 flex justify-center">
  <a href="/software-gestion-almacen" class="inline-flex rounded-full px-6 py-3 font-semibold text-white" style="background: var(--bg-menu-lig);">
    Ver la recepción contra pedido en Drenpos
  </a>
</div>

## ¿Qué es la recepción de mercancía?

Es el proceso que va desde que el camión llega al muelle hasta que la mercancía queda ubicada y registrada en el stock. Incluye descargar, comprobar bultos y estado, contar y cotejar con el pedido de compra, revisar lotes y caducidades, anotar incidencias, etiquetar si hace falta y llevar cada cosa a su hueco. Es el primer punto de control del almacén: lo que entra mal aquí sale mal después.

Buena parte de los descuadres de stock nacen en la recepción. Un palet que se descargó con prisas y se dio por bueno según el albarán, una caja rota que nadie apuntó, un lote que no se anotó. Cuando un recuento encuentra un sobrante, lo primero que hay que mirar es si hay una recepción sin registrar.

## ¿Qué hay que comprobar antes de firmar al transportista?

Lo que se ve sin abrir: número de palets o bultos frente a la carta de porte, estado del embalaje y del film, precintos y, si es mercancía refrigerada o congelada, la temperatura. Si algo falla, se anota por escrito en el documento del transportista antes de firmar. Una firma sin reservas da por buena la entrega, y reclamar después es mucho más difícil.

Lo que dice la ley, a fecha de 17 de octubre de 2026: según el [artículo 60 de la Ley 15/2009 del contrato de transporte terrestre de mercancías](https://www.boe.es/buscar/act.php?id=BOE-A-2009-18004#a60), el destinatario tiene que hacer sus reservas por escrito, describiendo la pérdida o avería, en el momento de la entrega. Si el daño no se aprecia a simple vista, tiene siete días naturales. Sin reservas se presume, salvo prueba en contrario, que la mercancía llegó como describe la carta de porte. Para reclamar un retraso, las reservas escritas se envían en veintiún días.

| Comprobación | Cómo se hace | Si falla |
| --- | --- | --- |
| Número de palets o bultos | Contar frente a la carta de porte o el albarán | Anotar la falta en el documento del transportista |
| Estado exterior | Mirar film, esquinas, cajas aplastadas, humedad | Fotografiar y anotar «recibido con daños» y el detalle |
| Precintos | Comprobar que están intactos y que el número coincide | Anotar y avisar al proveedor antes de abrir |
| Temperatura (frío) | Lectura del registrador del camión o sonda en producto | No aceptar o aceptar con reserva escrita, según tu plan de control |
| Documentación | Albarán, carta de porte o documento de control | Pedir copia o anotar lo que falta |

## ¿Se recibe contra el albarán o contra el pedido?

Contra el pedido de compra. El pedido es lo que pediste; el albarán es lo que el proveedor dice que te manda; y lo que hay en el palet es lo único real. Si cuentas mirando el albarán, acabas dando por bueno lo que el proveedor decidió enviar. Lo correcto es contar lo que llega, compararlo con el pedido y anotar las diferencias en el albarán.

Esos tres documentos casi nunca coinciden al cien por cien. Las discrepancias más comunes:

| Discrepancia | Ejemplo | Qué hacer |
| --- | --- | --- |
| Falta | Pedido 40 cajas, albarán 40, llegan 38 | Recibir 38 y anotar la falta de 2 en el albarán |
| Sobra | Pedido 40, llegan 44 | Decidir si se aceptan; si no, devolver o dejar en incidencias |
| Referencia cambiada | Pediste la referencia de 1 L y llega la de 1,5 L | No recibir como si fuera la pedida; consultar con compras |
| No pedido | Llega una referencia que no está en el pedido | Separar en incidencias hasta que compras confirme |
| Entrega parcial | Llegan 20 de 40 y el resto «la semana que viene» | Recibir 20 y dejar el pedido abierto por la diferencia |

Una práctica que ayuda mucho es el **recuento ciego**: quien cuenta no ve la cantidad esperada. Apunta lo que hay y el sistema hace la comparación. Si ve el número del albarán, tiende a encontrarlo.

## ¿Cómo se revisan lotes y caducidades al recibir?

Anotando el lote y la caducidad de cada partida tal como vienen en la etiqueta del producto, no copiándolos del albarán, y comprobando que la vida útil restante es aceptable. Si un mismo palet trae varios lotes, se registra cada uno con su cantidad. Sin ese dato en la entrada, no hay forma de aplicar FEFO ni de localizar un lote si hay que retirarlo.

Tres comprobaciones prácticas:

- **Vida útil restante.** Fija tu regla y aplícala siempre. Por ejemplo, no aceptar producto fresco con menos del 60 % de su vida útil por delante salvo que compras lo autorice. Un yogur con 30 días de vida que llega con 8 te va a dar merma.
- **Lote real frente a lote del albarán.** El albarán a veces lleva el lote equivocado o ninguno. Lo que vale es la etiqueta del producto.
- **Etiqueta legible.** Si el proveedor no etiqueta bien, etiqueta tú al recibir, con el lote y la caducidad en código de barras GS1. Así cada movimiento posterior se hace escaneando.

En alimentación esto no es opcional: el [Reglamento (CE) 178/2002](https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32002R0178), en su artículo 18, obliga a poder identificar a quién compraste cada producto. La recepción es donde se registra ese dato. Cómo se usa después para decidir qué sale primero lo contamos en [FIFO, FEFO y LIFO](/blog/fifo-fefo-lifo-almacen).

## ¿Qué se hace con una incidencia de recepción?

Se separa físicamente, se registra y se comunica. Lo dañado o dudoso va a una ubicación de incidencias con su propio código, para que esté localizado pero no disponible para vender. En el albarán se anota qué ha pasado y cuánto, y compras recibe el aviso para reclamar. Lo que llega bien se recibe y se ubica con normalidad, sin esperar a resolver lo demás.

| Incidencia | En el muelle | Qué se registra | A quién se avisa |
| --- | --- | --- | --- |
| Rotura | Separar y fotografiar | Unidades rotas, motivo, foto | Compras y transportista (reserva escrita) |
| Falta | Contar dos veces | Unidades que faltan | Compras |
| Caducidad corta | Separar si no cumple tu regla | Lote, fecha y vida restante | Compras |
| Temperatura fuera de rango | Según tu plan de control | Lectura y hora | Calidad y compras |
| Producto no pedido | Separar | Referencia y cantidad | Compras |

Si en lugar de reclamar compras decide quedarse la mercancía, se recibe desde incidencias como cualquier otra. Si se devuelve, sale con su documento. En los dos casos, el movimiento queda registrado.

## ¿Cómo se ubica la mercancía después de recibirla?

Llevándola a su hueco el mismo día y registrando la ubicación escaneando. En la zona de picking con ubicación fija, cada artículo va a su sitio de siempre; en la reserva de palets con ubicación caótica, al hueco libre que le quepa. Lo que ya tiene un pedido de cliente esperando puede ir directo a expedición (cross-docking). Lo que no debe pasar es que se quede en el muelle.

Una regla sencilla: nada pasa la noche en el muelle sin ubicar. La mercancía que se queda ahí no está en ningún hueco del sistema, nadie la encuentra para el picking del día siguiente y es la primera candidata a una diferencia de inventario. Si las ubicaciones todavía no tienen código, el primer paso es ese: [cómo codificar las ubicaciones del almacén](/blog/codificar-ubicaciones-almacen).

Cuando llega un palet completo de una sola referencia, lo normal es ubicarlo entero en la reserva y bajar a picking solo lo necesario. Si trabajas con palets etiquetados, cada uno lleva su SSCC y se ubica con un escaneo; lo explicamos en [la etiqueta SSCC de GS1](/blog/etiqueta-sscc-gs1-palets).

## ¿Cómo queda una recepción real, con números?

Un distribuidor de alimentación recibe un pedido de compra de cinco referencias. Al contar, una llega con falta, otra con una caja rota y otra con un lote de caducidad corta. Lo que entra en stock disponible son 307 cajas de las 320 pedidas; el resto queda registrado como falta o incidencia, con su nota en el albarán, y compras sabe exactamente qué reclamar.

| Referencia | Pedido | Albarán | Llega | Bien | Incidencia | Destino |
| --- | --- | --- | --- | --- | --- | --- |
| Agua 1,5 L (caja 6) | 120 | 120 | 120 | 120 | Ninguna | Reserva de palets |
| Zumo naranja 1 L (caja 12) | 60 | 60 | 58 | 58 | Falta de 2 | Picking |
| Tomate triturado (caja 12) | 40 | 40 | 40 | 39 | 1 caja rota | 39 a picking, 1 a incidencias |
| Yogur natural (caja 24) | 30 | 30 | 30 | 20 | 10 cajas con 8 días de vida | 20 a cámara, 10 a incidencias |
| Aceite 1 L (caja 15) | 70 | 70 | 70 | 70 | Ninguna | Reserva de palets |
| **Total** | **320** | **320** | **318** | **307** | **13** | |

Si esto se hubiera recibido «según albarán», el sistema tendría 320 cajas disponibles. Habría 13 que no existen o no se pueden vender, y aparecerían como diferencias en el próximo recuento, sin que nadie recuerde por qué.

## ¿Cómo se hace la recepción de mercancía en Drenpos?

Con un panel de recepción que trabaja en sesiones contra los pedidos de compra. El operario recibe con la pistola o el móvil, el sistema compara lo esperado con lo recibido y valida lotes y series al momento. Las incidencias se anotan por línea (faltas, roturas, mercancía no pedida) y viajan como notas al albarán de compra, que se genera solo al cerrar la sesión.

Además:

- **Ruta guiada** por la ubicación de destino de cada artículo, para ubicar sin dar vueltas.
- **Etiquetas GS1 al recibir** con lote o serie, en hoja A4 o en rollo, desde la propia sesión.
- **Cross-docking:** si hay pedidos de venta esperando ese producto, la línea lo avisa.
- **OCR de albaranes:** a partir de una foto del albarán del proveedor detecta las líneas y da de alta los lotes que vengan en él, con una revisión rápida.
- **Pedidos ya facturados:** si un pedido se facturó directamente sin albarán, la recepción lo detecta y no pide recibir de más.
- **Palets:** se montan con pistola y nacen con su SSCC. Lo vemos en el [software de gestión de palets](/software-gestion-palets).

La diferencia con un SGA aparte es que todo esto ocurre en el mismo sistema donde está el pedido de compra y la factura del proveedor, sin sincronizar dos programas. Si dudas entre una cosa y otra, lee [diferencias entre WMS, SGA y ERP](/blog/wms-sga-erp-diferencias). Va en el módulo de Inventario, incluido en el plan Pro por 29 €/mes sin IVA.

## Preguntas frecuentes sobre la recepción de mercancía

### ¿Qué hay que comprobar al recibir mercancía?

Primero, con el transportista delante: número de bultos o palets frente a la carta de porte, estado del embalaje, precintos y, en frío, la temperatura. Después, ya en el muelle: que las referencias y cantidades coinciden con el pedido de compra, que los lotes y las caducidades son aceptables y que no viene nada roto ni nada que no se pidió.

### ¿Se recibe contra el albarán o contra el pedido?

Contra el pedido. El pedido de compra es lo que tú pediste; el albarán es lo que el proveedor dice que te manda. Si recibes solo contra el albarán, das por bueno lo que el proveedor decidió enviar, incluidos cambios de referencia o cantidades que no pediste. Lo correcto es contar lo que llega, compararlo con el pedido y anotar en el albarán cualquier diferencia.

### ¿Cuánto tiempo hay para reclamar daños al transportista?

Según el artículo 60 de la Ley 15/2009 del contrato de transporte terrestre de mercancías, las reservas por pérdidas o averías se hacen por escrito en el momento de la entrega. Si el daño no se ve a simple vista, hay siete días naturales desde la entrega. Sin reservas se presume, salvo prueba en contrario, que la mercancía llegó como dice la carta de porte. Así consta a fecha de 17 de octubre de 2026.

### ¿Qué se hace con la mercancía que llega con incidencia?

Se separa en una ubicación de incidencias con su propio código, se anota en el albarán qué ha pasado (falta, rotura, referencia equivocada, caducidad corta) y se avisa a compras para que lo reclame al proveedor. Lo que está bien se recibe y se ubica con normalidad; lo dañado no entra en el stock disponible hasta que se decida qué hacer con ello.

### ¿Qué es el cross-docking en la recepción?

Es sacar directamente hacia expedición la mercancía que llega y que ya tiene un pedido de cliente esperando, sin pasar por la estantería. Ahorra una ubicación y una recogida. Para hacerlo hace falta que, al recibir, el programa avise de qué líneas tienen pedidos de venta pendientes.

### ¿Cómo se registra la recepción en Drenpos?

Con una sesión de recepción contra el pedido de compra: el operario escanea con la pistola, el sistema compara lo esperado con lo recibido, valida lotes y series y deja anotar incidencias por línea. Al cerrar la sesión se genera el albarán de compra, se pueden imprimir etiquetas GS1 con lote y avisa si hay pedidos de venta esperando ese producto.

## Siguiente paso

Imprime tu próximo pedido de compra y recibe el camión con él en la mano, no con el albarán. Apunta cada diferencia, por pequeña que sea, durante una semana. Lo que salga en esa lista es lo que hoy se te está colando en el stock. Mira cómo se hace con pistola en el [software de gestión de almacén](/software-gestion-almacen) de Drenpos.
