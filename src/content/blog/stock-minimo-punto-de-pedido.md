---
title: "Stock mínimo, stock de seguridad y punto de pedido: fórmulas y ejemplo resuelto"
meta_title: "Stock de seguridad y punto de pedido: fórmula y ejemplo"
description: "Cómo calcular el stock de seguridad y el punto de pedido con fórmulas y un ejemplo resuelto paso a paso, qué nivel de servicio elegir y cuándo recalcular."
date: 2026-10-17
image: "/images/blog/control-de-stock-sin-roturas/cover.jpg"
author:
  name: "Alonso Bermejo Pérez"
  designation: "CEO & Founder"
  avatar: "/images/alonso.jpg"
categories: ["Gestión de Almacén", "Automatización pymes", "Productividad"]
tags:
  [
    "stock mínimo",
    "punto de pedido",
    "stock de seguridad fórmula",
    "cómo calcular el stock de seguridad",
    "nivel de servicio",
    "reposición de stock",
    "stock máximo",
  ]
featured: false
draft: false
hero:
  title: "Stock mínimo y punto de pedido, con la cuenta hecha"
  description: "Qué es cada cifra, las tres fórmulas del stock de seguridad de más sencilla a más precisa, un ejemplo resuelto con un distribuidor de bebidas, cuánto cuesta subir el nivel de servicio y cuándo hay que recalcular."
faq:
  - question: "¿Qué diferencia hay entre stock mínimo y punto de pedido?"
    answer: "El stock de seguridad es el colchón para cubrir imprevistos mientras llega el pedido. El punto de pedido es el nivel de stock al que hay que lanzar la compra: la demanda durante el plazo de entrega más el stock de seguridad. Mucha gente llama stock mínimo a cualquiera de los dos; lo importante es que el aviso salte en el punto de pedido, no cuando ya estás tirando del colchón."
  - question: "¿Cuál es la fórmula del punto de pedido?"
    answer: "Punto de pedido = demanda media diaria × plazo de entrega en días + stock de seguridad. Con una demanda de 40 cajas al día, un plazo de 5 días y un stock de seguridad de 80 cajas, el punto de pedido es 40 × 5 + 80 = 280 cajas. Cuando el stock disponible más lo pendiente de recibir baja de 280, toca pedir."
  - question: "¿Cómo se calcula el stock de seguridad?"
    answer: "La fórmula más usada es Z × desviación típica de la demanda diaria × raíz cuadrada del plazo de entrega en días, donde Z depende del nivel de servicio (1,65 para un 95 %). Si el plazo del proveedor también varía, se usa Z × raíz de (plazo × desviación de la demanda al cuadrado + demanda media al cuadrado × desviación del plazo al cuadrado)."
  - question: "¿Qué nivel de servicio debo poner?"
    answer: "Depende de lo que cueste quedarse sin el artículo. Una pauta razonable es un 97 a 98 % en las referencias A o críticas, un 95 % en las B y un 90 % en las C. Pasar del 95 al 99 % en el ejemplo del artículo sube el stock de seguridad de 80 a 113 cajas: un 41 % más de stock parado para ese artículo."
  - question: "¿Cada cuánto hay que recalcular el punto de pedido?"
    answer: "Como mínimo cada trimestre, y siempre que cambie algo de fondo: el plazo del proveedor, la temporada, una promoción, un cliente grande nuevo o una rotura repetida. En productos estacionales, calcula con la demanda de la temporada que viene, no con la media del año."
  - question: "¿Drenpos calcula el punto de pedido automáticamente?"
    answer: "No calcula el stock de seguridad con la fórmula: el mínimo y el máximo los fijas tú en la ficha de cada artículo. Lo que hace es avisar cuando el stock baja del mínimo o supera el máximo, y la propuesta de compra sugiere qué pedir combinando esos límites con el consumo real de los últimos meses, lo reservado y lo que ya viene de camino."
---

> El punto de pedido es el nivel de stock al que hay que lanzar la compra: **demanda media diaria × plazo de entrega + stock de seguridad**. El stock de seguridad cubre la variación de la demanda y del plazo, y se calcula como **Z × σ de la demanda × √plazo**, con Z según el nivel de servicio (1,65 para un 95 %). Con 40 cajas al día, 5 días de plazo y 80 de seguridad, se pide al bajar de 280 cajas.

<div class="my-8 flex justify-center">
  <a href="/software-control-stock" class="inline-flex rounded-full px-6 py-3 font-semibold text-white" style="background: var(--bg-menu-lig);">
    Ver alertas de mínimos en Drenpos
  </a>
</div>

## ¿Qué diferencia hay entre stock mínimo, stock de seguridad y punto de pedido?

El stock de seguridad es el colchón para imprevistos: más ventas de las previstas o un proveedor que se retrasa. El punto de pedido es el nivel al que hay que comprar, y suma la demanda del plazo de entrega más ese colchón. «Stock mínimo» se usa para cualquiera de los dos; lo que importa es que el aviso salte en el punto de pedido y no cuando ya estás gastando el colchón.

| Concepto | Qué es | Fórmula | Para qué sirve |
| --- | --- | --- | --- |
| Stock de seguridad (SS) | Colchón para la variación de demanda y plazo | Z × σD × √L | Que no haya rotura si algo sale peor de lo normal |
| Punto de pedido (PP) | Nivel al que se lanza la compra | D × L + SS | Saber cuándo pedir |
| Cantidad de pedido (Q) | Cuánto se pide cada vez | Por formato, mínimo del proveedor o coste | Saber cuánto pedir |
| Stock máximo | Tope razonable al recibir | SS + Q | Detectar compras de más y stock parado |

En la tabla, D es la demanda media diaria, L el plazo de entrega en días, σD la desviación típica de la demanda diaria y Z el factor del nivel de servicio.

## ¿Cómo se calcula el punto de pedido?

Multiplicando la demanda media diaria por los días que tarda el proveedor en servir, y sumando el stock de seguridad. Ese número es lo que vas a vender mientras esperas el camión, más un margen por si vendes más o el camión tarda. Cuando el stock que tienes, contando lo reservado y lo pendiente de recibir, baja de esa cifra, toca lanzar el pedido.

**PP = D × L + SS**

Un detalle que provoca muchos errores: el punto de pedido se compara con la **posición de stock**, no con el stock físico. La posición es el stock físico, menos lo reservado para pedidos de clientes, más lo que ya has pedido al proveedor y no ha llegado. Si comparas con el físico, pedirás dos veces lo mismo (porque no cuentas lo que viene) o te quedarás corto (porque no restas lo vendido pendiente de servir). Lo vimos en [control de stock sin roturas](/blog/control-de-stock-sin-roturas), donde explicamos la diferencia entre stock físico y disponible.

Usa siempre la misma unidad de tiempo. Si la demanda es por día laborable, el plazo también en días laborables.

## ¿Cómo se calcula el stock de seguridad?

Hay tres métodos, de más sencillo a más preciso. El de días de cobertura multiplica la demanda media por unos días de colchón. El de máximos resta el consumo normal del consumo en el peor caso. Y el estadístico usa la variación real de la demanda y el nivel de servicio que quieres. El estadístico es el único que te dice cuánto riesgo estás asumiendo.

| Método | Fórmula | Ventaja | Inconveniente |
| --- | --- | --- | --- |
| Días de cobertura | SS = D × días de colchón | Se entiende y se calcula en un minuto | Los días se eligen a ojo |
| Máximos | SS = (Dmáx × Lmáx) − (D × L) | No necesita estadística | Suele salir muy alto: junta el peor día con el peor plazo |
| Estadístico, plazo fijo | SS = Z × σD × √L | Ajusta el colchón al riesgo que eliges | Necesita histórico de ventas diario o semanal |
| Estadístico, plazo variable | SS = Z × √(L × σD² + D² × σL²) | Cubre también los retrasos del proveedor | Necesita histórico de plazos reales |

El factor Z sale de la distribución normal según el nivel de servicio, que aquí significa la probabilidad de no quedarte sin stock durante el plazo de reposición:

| Nivel de servicio | Z |
| --- | --- |
| 90 % | 1,28 |
| 95 % | 1,65 |
| 97,5 % | 1,96 |
| 99 % | 2,33 |
| 99,9 % | 3,09 |

## ¿Cómo queda el cálculo en un ejemplo real?

Un distribuidor de bebidas vende agua de 1,5 L en cajas de 6. En las últimas doce semanas ha vendido de media 40 cajas por día laborable, con una desviación típica de 12. El proveedor tarda 5 días laborables, aunque a veces se va a 6 o 7 (desviación de 1 día). Quiere un 95 % de nivel de servicio. Cada caja le cuesta 2,10 €.

**Datos:** D = 40 cajas/día · σD = 12 cajas · L = 5 días · σL = 1 día · Z = 1,65.

**Paso 1. Demanda durante el plazo.** 40 × 5 = 200 cajas.

**Paso 2. Stock de seguridad con plazo fijo.** 1,65 × 12 × √5 = 1,65 × 12 × 2,236 = 44,3. Redondeando hacia arriba, **45 cajas**. Punto de pedido: 200 + 45 = **245 cajas**.

**Paso 3. Stock de seguridad con plazo variable.** Como el proveedor no siempre cumple, conviene este cálculo:

- L × σD² = 5 × 144 = 720
- D² × σL² = 1.600 × 1 = 1.600
- √(720 + 1.600) = √2.320 = 48,2
- SS = 1,65 × 48,2 = 79,5, es decir, **80 cajas**

Punto de pedido: 200 + 80 = **280 cajas**. Los retrasos del proveedor casi duplican el colchón necesario.

**Paso 4. Comparación con el método de máximos.** El peor día fueron 62 cajas y el peor plazo 7 días: 62 × 7 − 200 = **234 cajas** de seguridad, casi el triple, con 491 € parados en lugar de 168 €.

**Paso 5. Cantidad de pedido y stock máximo.** El proveedor sirve por palets de 80 cajas y le pide 3 palets cada vez: Q = 240 cajas, unos 6 días de venta. Stock máximo: 80 + 240 = **320 cajas**.

Resumen para meter en el sistema: avisar al bajar de **280 cajas** y no pasar de **320**.

## ¿Qué nivel de servicio conviene para cada artículo?

El que compense lo que cuesta quedarse sin él frente a lo que cuesta tener stock parado. Cada punto de servicio por encima del 95 % sale cada vez más caro, así que no tiene sentido pedir un 99 % para todo. Una pauta razonable: un 97 a 98 % en las referencias A o críticas para tus clientes, un 95 % en las B y un 90 % en las C.

Con el ejemplo del agua (σ combinada de 48,2 cajas y 2,10 € por caja):

| Nivel de servicio | Z | Stock de seguridad | Punto de pedido | Dinero en el colchón |
| --- | --- | --- | --- | --- |
| 90 % | 1,28 | 62 cajas | 262 | 130,20 € |
| 95 % | 1,65 | 80 cajas | 280 | 168,00 € |
| 97,5 % | 1,96 | 95 cajas | 295 | 199,50 € |
| 99 % | 2,33 | 113 cajas | 313 | 237,30 € |
| 99,9 % | 3,09 | 149 cajas | 349 | 312,90 € |

Pasar del 95 al 99 % sube el colchón un 41 %. En un artículo es poco dinero; multiplicado por 1.200 referencias, es la diferencia entre un almacén con aire y uno lleno de cajas que no salen. La clasificación ABC que usamos en el [inventario cíclico](/blog/inventario-ciclico-almacen) sirve también para repartir niveles de servicio.

## ¿Cuándo hay que recalcular el stock de seguridad y el punto de pedido?

Como mínimo cada trimestre y, además, cada vez que cambie algo de fondo: el plazo o el proveedor, la temporada, una promoción, la entrada de un cliente grande o una rotura que se repite. Un punto de pedido calculado con la media del año falla en cualquier producto estacional, porque en temporada alta se queda corto y en temporada baja deja stock parado.

El agua del ejemplo en verano: la demanda sube a 65 cajas al día y la desviación a 18. Recalculando, √(5 × 324 + 4.225 × 1) = √5.845 = 76,5; por 1,65 da **127 cajas** de seguridad, y el punto de pedido pasa a 65 × 5 + 127 = **452 cajas**. Con el de invierno (280) habría roturas casi cada semana.

| Qué cambia | Qué recalcular |
| --- | --- |
| Temporada alta o baja | D y σD con datos de la misma temporada del año anterior |
| Cambio de proveedor o de plazo | L y σL con las entregas reales |
| Promoción | Subir PP antes de empezar y bajarlo al terminar |
| Cliente grande nuevo | D, y revisar si sus pedidos van con reserva |
| Roturas repetidas | Revisar σD, el nivel de servicio y si el stock del sistema es fiable |
| Artículo nuevo sin histórico | Usar los datos de uno parecido y revisar al mes |

## ¿Qué errores son los más habituales?

Comparar el punto de pedido con el stock físico en lugar de con la posición de stock, usar la media anual en productos de temporada, mezclar días naturales con laborables, poner el aviso en el colchón en vez de en el punto de pedido y no redondear al formato de compra. Todos tienen la misma consecuencia: el aviso llega tarde o el pedido sale mal.

Uno más, menos evidente: calcular sobre un stock que no cuadra. Si el sistema dice 300 cajas y en la estantería hay 260, ninguna fórmula te salva. Antes de afinar el punto de pedido, asegúrate de que el stock es fiable con recuentos frecuentes y una [recepción de mercancía](/blog/recepcion-mercancia-almacen) bien registrada.

## ¿Cómo se lleva el stock mínimo y el punto de pedido en Drenpos?

En la ficha de cada artículo pones un stock mínimo y un máximo, y el sistema avisa en el panel cuando el stock baja del mínimo o supera el máximo. Drenpos no calcula el stock de seguridad con la fórmula: el número lo calculas tú. Nuestra recomendación es poner como mínimo el punto de pedido, para que el aviso llegue cuando toca comprar.

A partir de ahí:

- **Stock disponible en todas las pantallas:** el físico menos lo reservado para pedidos confirmados.
- **Propuesta de compra asistida:** sugiere qué comprar y cuánto combinando mínimo y máximo, consumo real de los últimos meses, unidades reservadas, demanda sin stock y lo que ya viene de camino. Revisas, ajustas y generas el pedido con un clic, con el último proveedor ya puesto. Nunca compra sola.
- **Alertas de pedidos:** cruzan lo vendido pendiente de servir con el stock y dicen cuántas unidades faltan.
- **Informe de rotación:** lo que más sale, por unidades y valor, con la cobertura en días. Es el punto de partida para sacar D y repartir niveles de servicio.

Para calcular la desviación, exporta las ventas a Excel y usa DESVEST sobre las cantidades diarias o semanales. Todo esto va en el [control de stock e inventario](/software-control-stock) del módulo de Inventario, incluido en el plan Pro por 29 €/mes sin IVA.

## Preguntas frecuentes sobre stock mínimo y punto de pedido

### ¿Qué diferencia hay entre stock mínimo y punto de pedido?

El stock de seguridad es el colchón para cubrir imprevistos mientras llega el pedido. El punto de pedido es el nivel de stock al que hay que lanzar la compra: la demanda durante el plazo de entrega más el stock de seguridad. Mucha gente llama stock mínimo a cualquiera de los dos; lo importante es que el aviso salte en el punto de pedido, no cuando ya estás tirando del colchón.

### ¿Cuál es la fórmula del punto de pedido?

Punto de pedido = demanda media diaria × plazo de entrega en días + stock de seguridad. Con una demanda de 40 cajas al día, un plazo de 5 días y un stock de seguridad de 80 cajas, el punto de pedido es 40 × 5 + 80 = 280 cajas. Cuando el stock disponible más lo pendiente de recibir baja de 280, toca pedir.

### ¿Cómo se calcula el stock de seguridad?

La fórmula más usada es Z × desviación típica de la demanda diaria × raíz cuadrada del plazo de entrega en días, donde Z depende del nivel de servicio (1,65 para un 95 %). Si el plazo del proveedor también varía, se usa Z × raíz de (plazo × desviación de la demanda al cuadrado + demanda media al cuadrado × desviación del plazo al cuadrado).

### ¿Qué nivel de servicio debo poner?

Depende de lo que cueste quedarse sin el artículo. Una pauta razonable es un 97 a 98 % en las referencias A o críticas, un 95 % en las B y un 90 % en las C. Pasar del 95 al 99 % en el ejemplo del artículo sube el stock de seguridad de 80 a 113 cajas: un 41 % más de stock parado para ese artículo.

### ¿Cada cuánto hay que recalcular el punto de pedido?

Como mínimo cada trimestre, y siempre que cambie algo de fondo: el plazo del proveedor, la temporada, una promoción, un cliente grande nuevo o una rotura repetida. En productos estacionales, calcula con la demanda de la temporada que viene, no con la media del año.

### ¿Drenpos calcula el punto de pedido automáticamente?

No calcula el stock de seguridad con la fórmula: el mínimo y el máximo los fijas tú en la ficha de cada artículo. Lo que hace es avisar cuando el stock baja del mínimo o supera el máximo, y la propuesta de compra sugiere qué pedir combinando esos límites con el consumo real de los últimos meses, lo reservado y lo que ya viene de camino.

## Siguiente paso

Elige tus diez referencias que más salen, saca sus ventas diarias de las últimas doce semanas y calcula media y desviación. Con el plazo real de cada proveedor tienes su punto de pedido en una tarde. Después, mira cómo se avisa y se propone la compra en el [control de stock](/software-control-stock) de Drenpos.
