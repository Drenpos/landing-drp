---
title: "Cómo controlar la factura de un almacén externo (3PL): conceptos y cotejo"
meta_title: "Factura de un almacén 3PL: cómo controlarla"
description: "Qué conceptos cobra un almacén externo 3PL y cómo cotejar su factura con tus datos: hueco por día, unidades, pedidos preparados y servicios."
date: 2026-11-06
updated: 2026-11-06
image: "/images/blog/wms-sga-erp-diferencias/cover.jpg"
author:
  name: "Alonso Bermejo Pérez"
  designation: "CEO & Founder"
  avatar: "/images/alonso.jpg"
categories: ["Gestión de Almacén", "Logística y 3PL", "Gestión Empresarial"]
tags:
  [
    "almacén externo",
    "3PL",
    "coste logístico",
    "factura de almacenaje",
    "pick and pack",
    "operador logístico",
    "tarifas 3PL",
  ]
featured: false
draft: false
hero:
  title: "La factura del 3PL, comprobada con tus propios datos"
  description: "Qué te cobra un operador logístico, cómo se cuenta cada concepto y cómo cotejarlo cada mes sin fiarte solo de su Excel."
faq:
  - question: "¿Qué es un almacén externo o 3PL?"
    answer: "Es un operador logístico que guarda tu mercancía, prepara tus pedidos y los envía a cambio de una tarifa. 3PL viene de third party logistics, logística de terceros. La mercancía sigue siendo tuya; el operador cobra por espacio, movimientos, pedidos y servicios."
  - question: "¿Qué conceptos se pagan a un almacén 3PL?"
    answer: "Almacenaje por hueco, palet o metro y día; manipulación por unidad o bulto; preparación por pedido y a veces por línea; servicios añadidos como retractilar, etiquetar o usar embalaje propio; portes repercutidos y, en muchos contratos, un mínimo mensual. Cada operador combina estos conceptos a su manera."
  - question: "¿Cómo compruebo que la factura del 3PL es correcta?"
    answer: "Valorando tú el mismo periodo con las tarifas del contrato y tu propia actividad: huecos ocupados por día, unidades, pedidos y servicios. Después se compara línea a línea con la factura y se revisan solo las diferencias. Lo primero que conviene mirar son los conceptos con actividad que no tienen tarifa en el contrato."
  - question: "¿Drenpos factura el coste del almacén externo?"
    answer: "No. El informe 3PL de Drenpos solo valora lo que debería cobrarte el almacén externo para cotejar su factura. No genera la factura de proveedor ni reparte ese coste a productos o pedidos."
  - question: "¿Qué conceptos valora el informe 3PL de Drenpos?"
    answer: "Cuatro: hueco ocupado por día, unidad tratada, pedido preparado (contado una vez) y servicios de preparación, como bulto propio o retractilado, que se cuentan desde la propia preparación. Da el detalle día a día y avisa de los conceptos con actividad pero sin tarifa. Portes y materiales se revisan aparte."
  - question: "¿Cuánto cuesta el informe 3PL?"
    answer: "Va incluido en el plan Almacén de Drenpos, [[p:almacen]] al mes sin IVA, sin módulo aparte."
---

> **Para controlar la factura de un almacén externo hay que valorar tú, con tus propios datos, lo mismo que te cobra el operador:** huecos ocupados por día, unidades tratadas, pedidos preparados y servicios como retractilar o poner un bulto propio. Si tu cifra y la suya no coinciden, la diferencia dice qué revisar. Sin esa valoración propia, la factura del 3PL se paga a ciegas.

<div class="my-8 flex justify-center">
  <a href="/software-gestion-almacen#novedades-almacen" class="inline-flex rounded-full px-6 py-3 font-semibold text-white" style="background: var(--bg-menu-lig);">
    Ver el almacén de Drenpos
  </a>
</div>

Este artículo está escrito desde el lado de la marca que deja su mercancía en un almacén ajeno. Si eres tú quien guarda mercancía de otros y cobra por ello, el caso contrario lo tienes en [alquiler de huecos de palet: tarifas y contrato](/blog/alquiler-huecos-palet-tarifas).

## ¿Qué conceptos cobra un almacén externo 3PL?

Casi siempre cuatro bloques: almacenaje (por palet, hueco o metro y día), manipulación (por unidad o bulto que entra o sale), preparación (por pedido y por línea) y servicios añadidos (retractilar, etiquetar, montar packs, usar un embalaje propio). Encima van portes, materiales y, a veces, un mínimo mensual. Cada operador los combina a su manera.

| Bloque | Cómo se suele cobrar | Qué dato necesitas para cotejarlo |
| --- | --- | --- |
| Almacenaje | Hueco o palet por día, a veces foto a fin de mes | Huecos ocupados cada día |
| Manipulación | Por unidad o bulto tratado | Unidades que entran y salen |
| Preparación | Por pedido, a veces más un tanto por línea | Pedidos preparados, contados una vez |
| Servicios | Por servicio: retractilado, bulto propio, etiquetado | Cuántas veces se hizo cada uno |
| Portes | Repercutidos de la agencia | Envíos y tarifa de la agencia |
| Mínimo mensual | Importe fijo si no se llega | Total del mes |

Las guías de los propios proveedores de software para 3PL, como la de [Extensiv sobre facturación de almacén](https://www.extensiv.com/blog/warehouse-billing-complete-guide-to-3pl-invoicing-and-cost-management) (consultada el 06/11/2026), describen esta misma división en almacenaje, manipulación y cargos accesorios. Lo que no cuentan es cómo lo comprueba el cliente.

## ¿Por qué no basta con revisar la factura a ojo?

Porque la factura de un 3PL resume cientos de eventos en unas pocas líneas. «Almacenaje: 1.240 €» no dice cuántos huecos, cuántos días ni con qué criterio se contaron. Si un mes sube un 15 %, a ojo no sabes si tuviste más stock o te contaron el pico en vez de la media.

Los errores más típicos que se ven al cotejar:

- **Huecos contados de más**: palets vacíos o medio vacíos que siguen ocupando posición.
- **Pedidos contados dos veces**: un pedido que se prepara en dos tandas y se cobra como dos.
- **Servicios sin pedir**: retractilados o etiquetados que nadie solicitó.
- **Tarifa vieja**: el precio subió en el contrato nuevo pero se aplica desde antes, o al revés.

## ¿Cómo se coteja la factura del 3PL paso a paso?

Con una valoración propia del mismo periodo, concepto a concepto. Necesitas tres cosas: las tarifas del contrato, la actividad real del mes registrada en tu sistema y la factura del operador. Se calcula cada concepto con tus datos, se compara con la línea de la factura y se revisan solo las diferencias que pasan de un margen razonable.

1. **Pasa las tarifas del contrato a tu sistema**, una por concepto, con su unidad de cobro.
2. **Asegúrate de que la actividad queda registrada**: entradas, salidas, pedidos y servicios del almacén externo.
3. **Valora el periodo** con esas tarifas y esa actividad.
4. **Compara línea a línea** con la factura del operador.
5. **Mira primero los conceptos con actividad y sin tarifa**: suelen ser servicios que nadie pactó.
6. **Pide el detalle diario** de los conceptos que no cuadren. Un buen operador lo tiene.

Pongamos una marca con 18 palets de media en un almacén externo, 2.400 unidades enviadas y 610 pedidos al mes. Si el contrato dice 0,25 € por hueco y día, 0,10 € por unidad y 1,20 € por pedido, el mes de 30 días sale en 135 € de almacenaje, 240 € de unidades y 732 € de pedidos. Si la factura dice 1.300 €, los 193 € de diferencia tienen nombre y se buscan.

## ¿Qué hace el informe 3PL de Drenpos?

Valora lo que debería cobrarte el almacén externo con lo que ha pasado de verdad en Drenpos. En la ficha del almacén pones sus tarifas y la pestaña «Informe 3PL» calcula el periodo con cuatro conceptos: hueco ocupado por día, unidad tratada, pedido preparado (contado una vez) y servicios de preparación.

Da el detalle día a día y avisa de los conceptos con actividad pero sin tarifa.

Los servicios funcionan como contadores. Cada tarifa de servicio, por ejemplo «bulto propio» o «retractilado», aparece en el bloque «Servicios del almacén» de la preparación, y quien prepara el pedido marca cuántas veces lo ha hecho. Así el número sale de la operación y no de un parte de fin de mes.

| Concepto en Drenpos | Cómo se cuenta | Línea de la factura con la que se compara |
| --- | --- | --- |
| Hueco ocupado por día | Huecos con mercancía cada día del periodo | Almacenaje |
| Unidad tratada | Unidades movidas en el almacén externo | Manipulación |
| Pedido preparado | Una vez por pedido, aunque se prepare en varias tandas | Preparación o pick and pack |
| Servicios de preparación | Contador por cada tarifa de servicio | Servicios añadidos |

Para que el informe tenga sentido, lo que pasa en ese almacén tiene que quedar en tu Drenpos: por ejemplo, porque el operador prepara tus pedidos en tu sistema. Si además no quieres que prepare nada hasta que tú lo liberes, los [pedidos en espera](/software-preparacion-pedidos-picking#pedidos-en-espera) retienen los que llegan de la tienda online o se meten a mano.

## ¿Qué no hace el informe 3PL?

No factura ni reparte el coste. Es solo un informe para cotejar la factura del almacén externo: no genera una factura de proveedor, no imputa ese coste a cada producto ni a cada pedido y no calcula el margen por pedido con el coste logístico dentro.

Tampoco valora portes ni materiales; esos se comprueban aparte con la tarifa de la agencia.

Si lo que necesitas es lo contrario, cobrar tú a quien deja mercancía en tu almacén, eso es el depósito de terceros, con tarifario por palet y día, eventos que se apuntan solos y liquidación del periodo: lo explica la página de [alquiler de huecos de palet](/software-alquiler-huecos-palet).

## ¿Cuánto cuesta en Drenpos?

El informe 3PL va dentro del plan Almacén, sin coste aparte: [[p:almacen]] al mes sin IVA, con el inventario completo, la preparación de pedidos y los pedidos en espera, sin permanencia. No hay un módulo de 3PL que contratar por separado.

Cómo encaja con el resto del almacén, en el [software de gestión de almacén](/software-gestion-almacen).

## Preguntas frecuentes sobre la factura de un almacén 3PL

### ¿Qué es un almacén externo o 3PL?

Es un operador logístico que guarda tu mercancía, prepara tus pedidos y los envía a cambio de una tarifa. 3PL viene de third party logistics, logística de terceros. La mercancía sigue siendo tuya; el operador cobra por espacio, movimientos, pedidos y servicios.

### ¿Qué conceptos se pagan a un almacén 3PL?

Almacenaje por hueco, palet o metro y día; manipulación por unidad o bulto; preparación por pedido y a veces por línea; servicios añadidos como retractilar, etiquetar o usar embalaje propio; portes repercutidos y, en muchos contratos, un mínimo mensual. Cada operador combina estos conceptos a su manera.

### ¿Cómo compruebo que la factura del 3PL es correcta?

Valorando tú el mismo periodo con las tarifas del contrato y tu propia actividad: huecos ocupados por día, unidades, pedidos y servicios. Después se compara línea a línea con la factura y se revisan solo las diferencias. Lo primero que conviene mirar son los conceptos con actividad que no tienen tarifa en el contrato.

### ¿Drenpos factura el coste del almacén externo?

No. El informe 3PL de Drenpos solo valora lo que debería cobrarte el almacén externo para cotejar su factura. No genera la factura de proveedor ni reparte ese coste a productos o pedidos.

### ¿Qué conceptos valora el informe 3PL de Drenpos?

Cuatro: hueco ocupado por día, unidad tratada, pedido preparado (contado una vez) y servicios de preparación, como bulto propio o retractilado, que se cuentan desde la propia preparación. Da el detalle día a día y avisa de los conceptos con actividad pero sin tarifa. Portes y materiales se revisan aparte.

### ¿Cuánto cuesta el informe 3PL?

Va incluido en el plan Almacén de Drenpos, [[p:almacen]] al mes sin IVA, sin módulo aparte.

## Siguiente paso

Coge la última factura de tu operador y el contrato, y haz la cuenta del ejemplo con tus números de un mes. Si la diferencia pasa del 3 o 4 %, merece la pena llevar la valoración cada mes. Para el resto de la operativa de stock entre almacenes propios, mira [traslados entre almacenes con tránsito](/blog/traslados-entre-almacenes-transito).
