---
title: "Tarifas sobre coste: cómo actualizar los precios de venta cuando sube el proveedor"
meta_title: "Actualizar precios de venta cuando sube el coste"
description: "Margen sobre venta o recargo sobre coste, con números: cómo recalcular la tarifa cuando sube el proveedor, con margen mínimo, redondeo y propuestas de cambio."
date: 2026-11-06
updated: 2026-11-06
image: "/images/blog/cuanto-cuesta-sga-wms-pyme-2026/cover.jpg"
author:
  name: "Alonso Bermejo Pérez"
  designation: "CEO & Founder"
  avatar: "/images/alonso.jpg"
categories: ["Gestión Empresarial", "Gestión de retail", "Automatización pymes"]
tags:
  [
    "tarifas sobre coste",
    "actualizar precios de venta",
    "margen sobre venta",
    "recargo sobre coste",
    "margen mínimo",
    "redondeo de precios",
    "listas de precios",
    "subida de proveedores",
  ]
featured: false
draft: false
hero:
  title: "Que el precio de venta siga al coste, sin perder margen"
  description: "La diferencia entre margen y recargo con números, de qué coste partir, cómo poner un margen mínimo y un redondeo, y cómo revisar las subidas antes de que lleguen al lineal."
faq:
  - question: "¿Qué diferencia hay entre margen sobre venta y recargo sobre coste?"
    answer: "El margen se calcula sobre el precio de venta y el recargo sobre el coste. Con un coste de 7 euros, un margen del 30 % da un precio de 10 euros (7 / 0,70) y un recargo del 30 % da 9,10 euros (7 × 1,30). Con el mismo porcentaje, el margen siempre da un precio más alto."
  - question: "¿Cómo paso de margen a recargo?"
    answer: "Recargo = margen / (1 − margen). Un margen del 30 % equivale a un recargo del 42,86 %. Al revés, margen = recargo / (1 + recargo): un recargo del 30 % deja un margen del 23,08 %. Confundirlos es la forma más común de vender por debajo de lo que creías."
  - question: "¿De qué coste parto para calcular el precio?"
    answer: "Del que refleje lo que te cuesta reponer. La última compra sigue las subidas al día; el precio medio suaviza los saltos; el mayor de los dos te protege cuando el coste sube y aún tienes stock barato. Si el proveedor te pasa una tarifa, puedes partir de ella."
  - question: "¿Qué es el margen mínimo?"
    answer: "El margen por debajo del cual un precio no puede bajar aunque la regla diga otra cosa. Si tu margen objetivo es el 30 % y el mínimo el 20 %, una subida de coste nunca dejará el artículo por debajo del 20 %: o se sube el precio o se avisa para que lo decidas."
  - question: "¿Es mejor actualizar los precios automáticamente o revisarlos?"
    answer: "Depende del negocio. En automático, la tarifa sigue al coste sin que nadie intervenga. Con propuestas, cada cambio espera a que alguien lo apruebe, uno a uno, por lote o todos. Para empezar, las propuestas: ves qué va a cambiar y dejas a mano los precios de reclamo."
  - question: "¿Cuánto cuesta tener tarifas sobre coste en Drenpos?"
    answer: "Nada aparte: van dentro del módulo Financiero, incluido en todos los planes. El coste de compra que usan sale de las compras y facturas de proveedor registradas. Con almacén, el plan Almacén cuesta [[n:almacen]] euros al mes sin IVA."
---

> Para que los precios de venta sigan al coste hay que decidir cuatro cosas: de qué coste partes (última compra, precio medio o el mayor de los dos), cuánto quieres ganar (margen sobre venta o recargo sobre coste), qué margen mínimo no se perfora y cómo se redondea. Con eso, cada subida del proveedor recalcula la tarifa, en automático o como propuesta que apruebas antes de que llegue al lineal.

<div class="my-8 flex justify-center">
  <a href="/software-almacen-tienda" class="inline-flex rounded-full px-6 py-3 font-semibold text-white" style="background: var(--bg-menu-lig);">
    Ver el programa para tiendas con almacén
  </a>
</div>

Cuando el proveedor sube un 6 % y la tarifa de venta no se toca, el margen se va sin que nadie lo vea. En una tienda con 3.000 referencias nadie revisa los precios uno a uno cada vez que llega una factura. Por eso la tarifa tiene que moverse sola, o al menos avisar.

## ¿Qué diferencia hay entre margen sobre venta y recargo sobre coste?

El margen se calcula sobre el precio de venta y el recargo sobre el coste. Con un coste de 7 euros, un margen del 30 % da un precio de 10 euros (7 / 0,70). Un recargo del 30 % da 9,10 euros (7 × 1,30). Con el mismo porcentaje, el margen siempre da un precio más alto.

La tabla, con un coste de 7 euros:

| Porcentaje | Precio con margen sobre venta | Precio con recargo sobre coste | Diferencia |
| --- | --- | --- | --- |
| 20 % | 8,75 € | 8,40 € | 0,35 € |
| 30 % | 10,00 € | 9,10 € | 0,90 € |
| 40 % | 11,67 € | 9,80 € | 1,87 € |
| 50 % | 14,00 € | 10,50 € | 3,50 € |

Las fórmulas: con margen, precio = coste / (1 − margen). Con recargo, precio = coste × (1 + recargo).

## ¿Cómo se pasa de margen a recargo sin equivocarse?

Con dos fórmulas: recargo = margen / (1 − margen) y margen = recargo / (1 + recargo). Un margen del 30 % equivale a un recargo del 42,86 %. Un recargo del 30 % deja un margen del 23,08 %. Si el dueño piensa en margen y el encargado pone recargos, se vende siete puntos por debajo.

| Margen sobre venta | Recargo equivalente | Recargo sobre coste | Margen equivalente |
| --- | --- | --- | --- |
| 20 % | 25,00 % | 20 % | 16,67 % |
| 25 % | 33,33 % | 25 % | 20,00 % |
| 30 % | 42,86 % | 30 % | 23,08 % |
| 40 % | 66,67 % | 40 % | 28,57 % |
| 50 % | 100,00 % | 50 % | 33,33 % |

Lo práctico es elegir uno y que el programa enseñe el ejemplo en euros al escribirlo. En Drenpos, al poner el porcentaje en la regla, sale al lado el precio que daría un coste de ejemplo, así nadie confunde uno con otro.

## ¿De qué coste se parte para calcular el precio?

Del que refleje lo que te cuesta reponer. La última compra sigue las subidas al día. El precio medio suaviza los saltos, pero tarda en reflejar una subida si tienes stock barato. El mayor de los dos protege el margen cuando el coste sube y no deja bajar el precio por una compra puntual más barata.

En Drenpos, partir del precio medio necesita el [módulo de Inventario](/software-control-stock) (plan Almacén o Producción), porque es el que lleva el coste medio de cada artículo.

| Coste de partida | Cuándo encaja | Riesgo |
| --- | --- | --- |
| Última compra | Proveedores que suben a menudo | Una compra en oferta baja la tarifa si la lista también baja |
| Precio medio | Costes estables, mucho stock | Llega tarde a las subidas |
| El mayor de los dos | Subidas frecuentes con stock antiguo | Precios algo más altos tras una oferta |
| Tarifa de compra | El proveedor te pasa su tarifa | Hay que tenerla al día |

En Drenpos se elige por lista, y se pueden poner reglas distintas por familia o por artículo. Un artículo sin coste no tiene precio calculado: se queda como esté.

## ¿Qué pasa con el margen cuando sube el coste y no tocas el precio?

Se come la subida entera. Con un precio de 10 euros y un coste que pasa de 7 a 7,42 (un 6 % más), el margen baja del 30 % al 25,8 %. Para mantener el 30 %, el precio tiene que ir a 10,60. Con un margen mínimo del 20 %, el suelo está en 9,28.

| Situación | Coste | Precio | Margen |
| --- | --- | --- | --- |
| Antes de la subida | 7,00 € | 10,00 € | 30,0 % |
| Sube el coste, el precio no | 7,42 € | 10,00 € | 25,8 % |
| Precio recalculado al 30 % | 7,42 € | 10,60 € | 30,0 % |
| Precio mínimo con margen mínimo del 20 % | 7,42 € | 9,28 € | 20,0 % |

## ¿Para qué sirven el margen mínimo, el redondeo y el umbral?

Para que la tarifa automática no haga cosas raras. El margen mínimo impide que un precio quede por debajo de lo que estás dispuesto a ganar. El redondeo deja precios de tienda, terminados en ,95 o ,99. Y el umbral evita mover un precio por dos céntimos, que obliga a reetiquetar el lineal para nada.

En una lista sobre coste de Drenpos se configuran así:

- **Margen mínimo:** nunca se perfora. La simulación avisa de qué artículos quedarían por debajo.
- **Redondeo:** a 0,05, a ,99 y similares.
- **Umbral:** por debajo de esa diferencia, el precio no se mueve.
- **Solo sube o también baja:** muchas tiendas prefieren que la tarifa suba con el coste pero no baje sola tras una oferta del proveedor.

## ¿Cuándo y cómo se recalculan los precios?

Al recibir la compra o registrar la factura del proveedor, cada noche o cuando pulsas «Recalcular ahora». El cambio se aplica solo o se queda como propuesta que alguien aprueba. Para empezar conviene la propuesta: ves qué va a cambiar, apruebas lo normal y dejas a mano los precios de reclamo o los pactados.

En Drenpos las propuestas llegan a «Cambios de precio» con un aviso en la campana. Se aprueban una a una, por lote o todas, y si el coste se movió otra vez entre medias, se recalcula antes de aprobar. Antes de activar una regla, «Simular» dice cuántos precios cambiarían y cuáles quedarían por debajo del margen mínimo, sin guardar nada.

En la tabla de la tarifa salen las columnas Coste y Margen real en verde, ámbar o rojo. Los permisos van separados: quien edita reglas, quien aprueba cambios y quien ve costes y márgenes. Un dependiente puede trabajar con la tarifa sin ver lo que te cuesta cada artículo.

Pongamos una ferretería con proveedores que suben cada mes. Lista de venta sobre la última compra, margen del 30 %, mínimo del 20 %, redondeo a ,95 y propuestas. Al registrar la factura del proveedor, los 40 artículos que han subido aparecen en «Cambios de precio» con su margen nuevo; el encargado los aprueba de golpe y deja dos a mano.

## ¿Y las listas que dependen de otra?

Siguen a su base. Una lista puede heredar de otra con un factor: la de profesionales a 0,90 de la general, por ejemplo. Cuando la general sube por el coste, la de profesionales sube detrás. Cada fila elige si hereda, si lleva su propio factor o si es manual, y las manuales no las toca nadie.

| Modo de la fila | Qué hace | Ejemplo |
| --- | --- | --- |
| Hereda | Precio base × factor de la lista | Toda la lista a 0,90 de la general |
| Factor propio | Sigue a la base con otro factor | Este artículo a 0,95 |
| Manual | No cambia con nada | Precio pactado con un cliente |

Si fabricas lo que vendes, el coste de partida es el de la orden de fabricación; cómo se calcula está en [escandallo y lista de materiales](/blog/escandallo-lista-materiales-coste-fabricacion). Para tiendas con mostrador y almacén, mira el [programa para tiendas de recambios](/software-tienda-recambios), donde las listas por cliente son el pan de cada día.

## Preguntas frecuentes sobre tarifas sobre coste

### ¿Qué diferencia hay entre margen sobre venta y recargo sobre coste?

El margen se calcula sobre el precio de venta y el recargo sobre el coste. Con un coste de 7 euros, un margen del 30 % da un precio de 10 euros (7 / 0,70) y un recargo del 30 % da 9,10 euros (7 × 1,30). Con el mismo porcentaje, el margen siempre da un precio más alto.

### ¿Cómo paso de margen a recargo?

Recargo = margen / (1 − margen). Un margen del 30 % equivale a un recargo del 42,86 %. Al revés, margen = recargo / (1 + recargo): un recargo del 30 % deja un margen del 23,08 %. Confundirlos es la forma más común de vender por debajo de lo que creías.

### ¿De qué coste parto para calcular el precio?

Del que refleje lo que te cuesta reponer. La última compra sigue las subidas al día; el precio medio suaviza los saltos; el mayor de los dos te protege cuando el coste sube y aún tienes stock barato. Si el proveedor te pasa una tarifa, puedes partir de ella.

### ¿Qué es el margen mínimo?

El margen por debajo del cual un precio no puede bajar aunque la regla diga otra cosa. Si tu margen objetivo es el 30 % y el mínimo el 20 %, una subida de coste nunca dejará el artículo por debajo del 20 %: o se sube el precio o se avisa para que lo decidas.

### ¿Es mejor actualizar los precios automáticamente o revisarlos?

Depende del negocio. En automático, la tarifa sigue al coste sin que nadie intervenga. Con propuestas, cada cambio espera a que alguien lo apruebe, uno a uno, por lote o todos. Para empezar, las propuestas: ves qué va a cambiar y dejas a mano los precios de reclamo.

### ¿Cuánto cuesta tener tarifas sobre coste en Drenpos?

Nada aparte: van dentro del módulo Financiero, incluido en todos los planes. El coste de compra que usan sale de las compras y facturas de proveedor registradas. Con almacén, el plan Almacén cuesta [[n:almacen]] euros al mes sin IVA.

## Siguiente paso

Elige tres familias que suban a menudo, decide margen, mínimo y redondeo, y simula antes de activar nada. Lo verás funcionando con tus artículos en el [programa para tiendas con almacén](/software-almacen-tienda); los precios de cada plan están en [planes y precios](/pricing). Cuando cierres el mes, las facturas van a la gestoría con la [exportación a A3](/blog/exportar-facturas-a3-suenlace).
