---
title: "Traslados entre almacenes con tránsito: enviar, recibir y reponer"
meta_title: "Traslados entre almacenes con stock en tránsito"
description: "Cómo hacer traslados entre almacenes en dos pasos: enviar, dejar en tránsito, recibir con diferencias y reponer según el mínimo y máximo de cada almacén."
date: 2026-11-06
updated: 2026-11-06
image: "/images/blog/como-organizar-almacen-pyme/cover.jpg"
author:
  name: "Alonso Bermejo Pérez"
  designation: "CEO & Founder"
  avatar: "/images/alonso.jpg"
categories: ["Gestión de Almacén", "Logística y 3PL", "Productividad"]
tags:
  [
    "traslados entre almacenes",
    "stock en tránsito",
    "transferencia de stock",
    "reposición de tiendas",
    "stock mínimo por almacén",
    "multialmacén",
    "pistola lectora",
  ]
featured: false
draft: false
hero:
  title: "Mover stock entre almacenes sin que desaparezca por el camino"
  description: "Cuándo basta un traslado de un paso y cuándo hace falta tránsito, cómo se recibe con diferencias y cómo se calcula qué mandar a cada almacén."
faq:
  - question: "¿Qué es el stock en tránsito?"
    answer: "Es la mercancía que ha salido de un almacén y todavía no ha entrado en otro. No está disponible ni en origen ni en destino, así que no debe venderse ni asignarse a pedidos hasta que se recibe."
  - question: "¿Qué diferencia hay entre un traslado de un paso y uno de dos?"
    answer: "En el de un paso, al confirmar se resta en origen y se suma en destino a la vez. En el de dos pasos, al enviar la mercancía queda en tránsito y solo entra en destino cuando alguien la recibe y confirma lo que ha llegado. El segundo encaja cuando entre almacenes hay un viaje."
  - question: "¿Qué pasa si en destino reciben menos de lo enviado?"
    answer: "En Drenpos se recibe lo que llega de verdad, la diferencia queda anotada en el traslado y lo que no ha llegado sigue en tránsito. Si aparece, se recibe después; si se perdió o se rompió, se da de baja."
  - question: "¿Cómo sé cuánto mandar a cada tienda?"
    answer: "Con un mínimo y un máximo por almacén. Cuando el stock de la tienda baja de su mínimo, se manda lo que falta hasta su máximo. En Drenpos la pestaña «Por almacén» de la propuesta de compra lo calcula y abre el traslado ya relleno desde el almacén que la surte."
  - question: "¿Se puede hacer el traslado con pistola lectora?"
    answer: "Sí. En Drenpos el traslado está pensado para pistola: se escanea la ubicación de origen, el producto, la cantidad y la ubicación de destino, con lote y unidad de medida por línea, sin tocar la pantalla."
  - question: "¿Lo que está en tránsito se puede vender?"
    answer: "No. En Drenpos el stock en tránsito nunca se asigna a un pedido, ni en el almacén de origen ni en el de destino, hasta que se recibe."
---

> **Un traslado entre almacenes con tránsito se hace en dos pasos:** al enviar, la mercancía sale del almacén de origen y queda «en tránsito»; al recibir, el destino registra lo que llega de verdad. Si falta algo, la diferencia queda anotada y lo que no ha llegado sigue en tránsito. Mientras viaja, ese stock no se vende ni se asigna a pedidos en ningún almacén.

<div class="my-8 flex justify-center">
  <a href="/software-control-stock#minimos-por-almacen" class="inline-flex rounded-full px-6 py-3 font-semibold text-white" style="background: var(--bg-menu-lig);">
    Ver el control de stock por almacén
  </a>
</div>

## ¿Qué es un traslado entre almacenes?

Es el documento que mueve stock de un almacén o ubicación a otro de la misma empresa, sin compra ni venta. Resta en el origen, suma en el destino y deja rastro de quién lo hizo, cuándo, con qué lotes y en qué cantidades.

Sirve para reponer una tienda desde el central, equilibrar dos naves o mover mercancía a la cámara de otra planta.

Hay dos formas de hacerlo, y la diferencia está en cuánto tarda la mercancía en llegar:

| | Traslado de un paso | Traslado en dos pasos con tránsito |
| --- | --- | --- |
| Cuándo encaja | Mover entre ubicaciones o almacenes del mismo edificio | Almacenes separados por un viaje: horas o días |
| Qué pasa al confirmar | Resta en origen y suma en destino a la vez | Resta en origen y la mercancía queda en tránsito |
| Quién confirma la llegada | Nadie: se da por hecha | El destino, con lo que llega de verdad |
| Diferencias | Se descubren en el siguiente recuento | Se anotan al recibir |
| Riesgo | Vender en destino algo que aún no ha llegado | Ninguno de los dos almacenes lo vende mientras viaja |

## ¿Por qué hace falta el stock en tránsito?

Porque entre que un camión sale del central y llega a la tienda pasan horas, y en ese rato la mercancía no está en ninguno de los dos sitios. Si el sistema la suma en destino al salir, la tienda vende lo que no tiene. Si la deja en origen, el central la reserva para otro pedido.

El tránsito es la tercera casilla que evita los dos errores.

Las guías de los ERP grandes lo resuelven igual: Infor LN, por ejemplo, [describe el stock en tránsito](https://docs.infor.com/ln/2023.x/es-es/lnolh/wholh/whom000820.html) (consultado el 06/11/2026) como el que ha salido del almacén emisor y aún no ha entrado en el receptor. En una pyme el problema es el mismo, solo que con dos furgonetas en vez de una flota.

## ¿Cómo se hace un traslado en dos pasos?

Primero se envía y después se recibe. Al confirmar el envío, la mercancía sale del almacén de origen y pasa a una ubicación de tránsito del destino, con el traslado «En curso». Cuando llega, alguien en destino abre «Recibir traslados», cuenta lo que ha llegado y lo confirma.

Lo que cuadra entra en su ubicación y lo que falta se queda en tránsito.

En Drenpos se activa marcando una ubicación del almacén de destino como «Tránsito». A partir de ahí:

1. **Se prepara el traslado** en borrador, con lote y unidad de medida por línea. Con pistola: ubicación de origen, producto, cantidad y ubicación de destino, sin tocar la pantalla.
2. **Se confirma el envío.** El stock sale del origen y queda en tránsito. El traslado pasa a «En curso».
3. **Se recibe en destino** desde «Recibir traslados», con lo que llega de verdad.
4. **Las diferencias quedan anotadas** en el traslado. Lo que no ha llegado sigue en tránsito.
5. **Lo que está en tránsito nunca se asigna a un pedido**, ni en origen ni en destino.

Si el almacén de destino no tiene ubicación de tránsito, el traslado funciona como siempre, en un paso. La columna Tránsito va también en el Excel de ubicaciones, así se puede marcar en bloque.

## ¿Qué pasa si llega menos de lo enviado?

Que la diferencia se ve el mismo día, no en el inventario de fin de mes. Si salieron 40 cajas y en destino se cuentan 38, se reciben 38, el traslado registra la diferencia y las 2 cajas siguen en tránsito.

Desde ahí se investiga: si aparecen en el camión, se reciben después; si se rompieron, se dan de baja como merma.

Pongamos un distribuidor con una nave central y dos tiendas a 60 km. Antes, las diferencias salían en el recuento trimestral y nadie sabía si eran del viaje, de la tienda o del central. Con el tránsito, cada diferencia tiene fecha, traslado y persona que recibió.

## ¿Cómo se decide qué mandar a cada almacén?

Con un mínimo y un máximo por almacén. Cuando el stock de una tienda baja de su mínimo, hay que mandarle lo necesario para llegar a su máximo. Así cada almacén tiene su propio colchón, ajustado a lo que vende, y el central no repone a ojo ni manda lo mismo a todas las tiendas.

| Almacén | Mínimo | Máximo | Stock actual | Qué pedir |
| --- | --- | --- | --- | --- |
| Tienda A | 6 cajas | 20 cajas | 4 cajas | Trasladar 16 desde el central |
| Tienda B | 15 cajas | 40 cajas | 22 cajas | Nada: está por encima del mínimo |
| Central | 280 cajas | 600 cajas | 250 cajas | Comprar 350 al proveedor |

El mínimo de cada almacén se calcula igual que el de cualquier artículo: demanda diaria por plazo de reposición, más un colchón. La fórmula y un ejemplo resuelto están en [stock mínimo y punto de pedido](/blog/stock-minimo-punto-de-pedido).

## ¿Cómo hace Drenpos la reposición por almacén?

Con dos piezas. En la pestaña Inventario del artículo se pone un mínimo y un máximo para cada almacén, distinto del general. Y en la propuesta de compra, la pestaña «Por almacén» calcula qué le falta a cada uno y abre un traslado ya relleno, con sus lotes, desde el almacén que lo surte.

Alguien lo revisa y lo confirma: nada se mueve solo.

Lo que sale de la propuesta es un traslado normal, así que con tránsito activado viaja en dos pasos como cualquier otro. Todo va en el [control de stock](/software-control-stock) del plan Almacén, [[p:almacen]] al mes sin IVA.

## ¿Qué no hace?

No planifica rutas de reparto ni sigue el camión por GPS: el tránsito dice qué está viajando, no dónde está. Tampoco crea traslados sin que nadie los confirme. Y si el destino es un almacén de otra empresa, ya no es un traslado: es una venta, un depósito o un almacén externo.

## Preguntas frecuentes sobre traslados entre almacenes

### ¿Qué es el stock en tránsito?

Es la mercancía que ha salido de un almacén y todavía no ha entrado en otro. No está disponible ni en origen ni en destino, así que no debe venderse ni asignarse a pedidos hasta que se recibe.

### ¿Qué diferencia hay entre un traslado de un paso y uno de dos?

En el de un paso, al confirmar se resta en origen y se suma en destino a la vez. En el de dos pasos, al enviar la mercancía queda en tránsito y solo entra en destino cuando alguien la recibe y confirma lo que ha llegado. El segundo encaja cuando entre almacenes hay un viaje.

### ¿Qué pasa si en destino reciben menos de lo enviado?

En Drenpos se recibe lo que llega de verdad, la diferencia queda anotada en el traslado y lo que no ha llegado sigue en tránsito. Si aparece, se recibe después; si se perdió o se rompió, se da de baja.

### ¿Cómo sé cuánto mandar a cada tienda?

Con un mínimo y un máximo por almacén. Cuando el stock de la tienda baja de su mínimo, se manda lo que falta hasta su máximo. En Drenpos la pestaña «Por almacén» de la propuesta de compra lo calcula y abre el traslado ya relleno desde el almacén que la surte.

### ¿Se puede hacer el traslado con pistola lectora?

Sí. En Drenpos el traslado está pensado para pistola: se escanea la ubicación de origen, el producto, la cantidad y la ubicación de destino, con lote y unidad de medida por línea, sin tocar la pantalla.

### ¿Lo que está en tránsito se puede vender?

No. En Drenpos el stock en tránsito nunca se asigna a un pedido, ni en el almacén de origen ni en el de destino, hasta que se recibe.

## Siguiente paso

Elige el artículo que más se repone entre almacenes y pon su mínimo y máximo en cada uno con la demanda de las últimas ocho semanas. Si los almacenes están separados por un viaje, marca la ubicación de tránsito en destino y prueba una semana. El resto del almacén (ubicaciones, plano y preparación) está en la [gestión de almacén](/software-gestion-almacen).
