---
title: "Pantalla de cocina para bares: por qué se pierden comandas y cómo evitarlo"
meta_title: "Pantalla de cocina KDS: evitar comandas perdidas"
description: "Qué es un KDS, por qué se pierden o se mezclan las comandas entre pantallas, cómo se evita consultando al servidor cada pocos segundos y qué hardware necesita un bar."
date: 2026-09-10
image: "/images/blog/pantalla-cocina-kds-bares-comandas-perdidas/cover.jpg"
author:
  name: "Alonso Bermejo Pérez"
  designation: "CEO & Founder"
  avatar: "/images/alonso.jpg"
categories: ["Hostelería", "TPV y Punto de Venta", "Operativa"]
tags:
  [
    "pantalla de cocina KDS",
    "comandas perdidas",
    "TPV con pantalla de cocina",
    "software hostelería",
    "programa para bares",
  ]
featured: false
draft: false
hero:
  title: "La comanda que nadie vio existía en algún sitio"
  description: "Por qué las pantallas de cocina pierden pedidos cuando la WiFi parpadea, y cómo se arregla sin cambiar de router."
faq:
  - question: "¿Qué es un KDS o pantalla de cocina?"
    answer: "Un KDS (Kitchen Display System) es una pantalla en cocina o barra que recibe las comandas del TPV en cuanto el camarero las envía, las muestra ordenadas con su mesa y permite marcarlas como completadas. Sustituye al ticket de papel: no hay impresora, ni rollo que se acaba, ni comanda que se cae detrás de la plancha."
  - question: "¿Por qué se pierden comandas entre el TPV y la cocina?"
    answer: "Casi siempre por la conexión. Muchos sistemas mantienen una conexión permanente entre el TPV y cada pantalla, y si la WiFi parpadea un segundo la pantalla se queda desconectada sin avisar: lo que se envió mientras tanto no aparece. También se pierden por filtros mal configurados, cuando un artículo sin familia asignada no llega a ninguna pantalla."
  - question: "¿Cuántas pantallas de cocina puede tener un local?"
    answer: "Las que necesite la operativa. En Drenpos funcionan entre 4 y 10 pantallas por local sin problema: cocina caliente, cocina fría, barra, postres, plancha o pase, cada una recibiendo solo las familias de productos que tiene asignadas. Los artículos sin familia van a las pantallas que no tienen filtro."
  - question: "¿Qué hardware hace falta para poner una pantalla de cocina?"
    answer: "Cualquier tablet, ordenador o monitor con navegador. No hace falta hardware específico ni una pantalla certificada de marca: si abre una página web y se ve bien a metro y medio, sirve. Lo que sí conviene es un soporte fijo, la pantalla protegida del vapor y un enchufe cerca para no depender de la batería."
  - question: "¿Es mejor la pantalla de cocina o la ticketera de papel?"
    answer: "La pantalla, en casi todos los casos. El papel no dice qué comanda lleva más tiempo esperando, no se puede reordenar, se moja, se arruga y desaparece. Dicho esto, muchos locales mantienen la impresora como respaldo para el día que se va la luz o para tickets de barra concretos, y eso es razonable."
  - question: "¿Cómo se evita que dos pantallas muestren cosas distintas?"
    answer: "Haciendo que el estado viva en el servidor y que todas las pantallas lo consulten periódicamente, en lugar de que cada una mantenga su propia versión. En Drenpos cada pantalla pregunta al servidor cada 3 segundos y recibe exactamente el mismo estado, así que si alguien marca una comanda como completada en cocina, en barra deja de aparecer."
---

> Un KDS es la pantalla que recibe las comandas en cocina o en barra, las ordena por mesa y deja marcarlas como completadas. Las comandas se pierden casi siempre por la conexión: si la pantalla depende de un canal permanente con el TPV y la WiFi parpadea, lo enviado en ese hueco no aparece nunca. La alternativa es que la pantalla pregunte al servidor cada pocos segundos y todas vean el mismo estado.

<div class="my-8 flex justify-center">
  <a href="/software-bares-restaurantes" class="inline-flex rounded-full px-6 py-3 font-semibold text-white" style="background: var(--bg-menu-lig);">
    Ver el software para bares y restaurantes de Drenpos
  </a>
</div>

## ¿Qué es una pantalla de cocina y qué resuelve?

Un KDS (Kitchen Display System) es una pantalla colocada en cocina o en barra que muestra las comandas en cuanto el camarero las envía desde el TPV. Cada comanda aparece con su mesa, sus líneas y sus modificadores, y el personal la marca como completada cuando sale. No hay papel, ni rollo que se acaba a media noche, ni ticket que se cae detrás de la plancha.

![Pase de cocina con comandas a la espera de salir](/images/blog/pantalla-cocina-kds-bares-comandas-perdidas/section-1.jpg)

Lo que resuelve no es solo el papel. Resuelve el orden. En una barra con cinco camareros metiendo pedidos a la vez, el papel llega en el orden en que se imprime y ahí muere: nadie sabe qué comanda lleva ocho minutos esperando y cuál acaba de entrar.

También resuelve el reparto. Los platos van a cocina, las bebidas a barra y los postres a su sitio, sin que nadie tenga que gritar por encima de la campana extractora.

## ¿Por qué se pierden o se mezclan las comandas?

Por tres motivos, y el primero es el que más duele. Los sistemas que mantienen una conexión permanente entre el TPV y cada pantalla dependen de que esa conexión no se corte nunca. Si la WiFi parpadea medio segundo, la pantalla se queda desconectada sin decir nada y las comandas enviadas en ese hueco no llegan. La cocina no sabe que le falta un pedido: para ella, ese pedido nunca existió.

El segundo motivo son los filtros mal configurados. Cuando cada pantalla recibe solo ciertas familias de productos y alguien da de alta un artículo nuevo sin asignarle familia, ese artículo se queda huérfano. Si además ninguna pantalla está configurada sin filtro, la línea no aparece en ningún sitio.

El tercero es más humano: dos pantallas que muestran versiones distintas de la realidad. Ocurre cuando cada pantalla guarda su propio estado en local en lugar de leerlo del servidor. Cocina marca una comanda como servida, barra sigue viéndola pendiente y alguien la prepara dos veces.

![Pantalla de cocina mostrando comandas con su código de mesa en el TPV de Drenpos](/images/funcionalidades/hosteleria/02-pantalla-cocina.png)

En un bar, cualquiera de las tres cosas se traduce en lo mismo: un cliente esperando un plato que nadie está cocinando, y un camarero volviendo a cocina a preguntar. Ese viaje es el síntoma; el problema está en el diseño del sistema.

## ¿Cómo se evita que una comanda desaparezca?

Cambiando quién pregunta. Si la pantalla es un receptor pasivo que espera a que le empujen los datos, cualquier corte deja un agujero. Si la pantalla pregunta activamente al servidor cada pocos segundos, un corte de red solo retrasa la información: en cuanto la conexión vuelve, la siguiente consulta trae todo lo pendiente.

Desde septiembre de 2026, las pantallas de órdenes de Drenpos funcionan así: cada pantalla consulta al servidor cada 3 segundos y recibe exactamente el mismo estado que todas las demás. No hay conexión permanente que se caiga en silencio, no hay comandas que se pierdan en un parpadeo de WiFi y no hay dos pantallas contando historias distintas.

La diferencia práctica en un local con WiFi imperfecta (o sea, casi cualquier local con paredes gruesas y una cámara frigorífica en medio) es enorme. Tres segundos de retraso no los nota nadie en cocina. Una comanda perdida la nota todo el mundo.

| Enfoque | Qué pasa si la red parpadea | Estado entre pantallas |
| --- | --- | --- |
| Conexión permanente entre TPV y pantalla | La pantalla se desconecta sin avisar y pierde lo enviado en ese hueco | Cada pantalla puede quedarse con su propia versión |
| Consulta al servidor cada 3 segundos | La siguiente consulta recupera todo lo pendiente | El servidor manda: todas las pantallas ven lo mismo |

## ¿Cómo se reparten las pantallas por familias?

Cada pantalla se configura con las familias de productos que le corresponden. La de cocina recibe entrantes, carnes y pescados; la de barra, refrescos, cervezas y cafés; la de postres, lo suyo. Un mismo ticket de mesa se parte solo y cada trozo aparece donde tiene que aparecer.

![Camarero de barra preparando bebidas durante el servicio](/images/blog/pantalla-cocina-kds-bares-comandas-perdidas/section-2.jpg)

Los artículos sin familia asignada van a las pantallas que no tienen filtro, que es la red de seguridad para que nada quede huérfano. Merece la pena dejar al menos una pantalla sin filtro en locales con catálogo cambiante, porque el día que entra un plato nuevo a las nueve de la noche nadie se acuerda de asignarle familia.

Un consejo de configuración: revisa las familias cuando cambies la carta de temporada, no cuando falle algo. Cinco minutos mirando qué familia tiene cada plato nuevo ahorran una noche complicada.

## ¿Cuántas pantallas necesita un local y dónde se ponen?

Depende del reparto de trabajo, no del tamaño. Un bar pequeño con barra y cocina funciona con dos. Un restaurante con cocina caliente, cocina fría, pase y barra pide cuatro. En Drenpos, entre 4 y 10 pantallas por local funcionan sin problema, y cada una recibe solo lo suyo.

Dónde ponerlas importa tanto como cuántas. La pantalla tiene que verse desde la posición de trabajo real, no desde la puerta: si el cocinero tiene que darse la vuelta y dar dos pasos para leerla, acabará pidiendo que vuelva la impresora. A metro y medio, a la altura de los ojos y fuera de la línea directa del vapor.

El código de mesa en pantalla es lo que cierra el círculo. Cocina no necesita saber quién es el cliente, pero sí a qué mesa va el plato para que el pase lo cante y el camarero lo recoja sin preguntar. Cómo se organiza esa numeración lo contamos en [gestión de mesas y mapa de sala](/blog/gestion-mesas-restaurante-mapa-sala).

## ¿Qué hardware sirve para montar el KDS?

Casi cualquier cosa con navegador. Una tablet vieja de casa, un monitor conectado a un mini PC, un televisor pequeño con un ordenador detrás o el portátil que ya estaba en el office. Si abre una página web y se lee a metro y medio, sirve como pantalla de cocina.

Eso cambia bastante la cuenta del proyecto. Los sistemas que exigen terminales propietarios convierten cada punto de la cocina en una compra de hardware; aquí el gasto es el soporte, el cable y, si acaso, una funda que aguante salpicaduras.

Tres cosas que sí conviene cuidar:

- **Alimentación fija.** Una tablet a batería en servicio se apaga siempre en el peor momento.
- **Protección del vapor.** Una carcasa o una posición ligeramente alejada de la campana alarga mucho la vida del aparato.
- **Pantalla siempre encendida.** Desactiva el bloqueo automático o el personal acabará tocando la pantalla con las manos llenas.

![Pasos de complementos y bebidas en el flujo guiado del TPV de Drenpos](/images/funcionalidades/hosteleria/04-flujo-combinados.png)

## ¿Qué llega a la pantalla cuando el pedido tiene extras?

Lo que el camarero eligió, paso a paso. En el TPV de Drenpos, al marcar una hamburguesa o un combinado se abren los pasos configurados: complementos, punto de la carne, bebida, extras. Cada opción tiene su propio precio y sus propios pasos, así que un JB con Coca-Cola y un JB con Red Bull son dos cosas distintas en el ticket y en la comanda.

Eso importa en cocina porque el extra viaja con la línea. La pantalla no muestra "hamburguesa" y luego una nota suelta a pie de comanda, sino la hamburguesa con lo que lleva. Menos interpretaciones, menos platos devueltos.

Y también importa en el inventario: cada línea descuenta su producto del stock, extras incluidos. El pan de brioche y el bacon salen del almacén igual que la carne, sin recuentos aparte. Cómo funciona ese descuento automático lo explicamos en [control de stock sin roturas](/blog/control-de-stock-sin-roturas).

## ¿Merece la pena quitar del todo la impresora?

En la mayoría de los locales, sí, pero no hace falta hacerlo el primer día. Una transición tranquila es tener la pantalla y la impresora funcionando a la vez durante una o dos semanas, comprobar que todo lo que se manda aparece donde debe y solo entonces retirar el papel.

Hay casos donde la impresora se queda, y es una decisión legítima: cocinas con mucho vapor donde una pantalla dura poco, servicios de barra que trabajan mejor con un ticket físico en la mano, o locales que quieren un respaldo en papel para el día que se cae internet.

Lo que no tiene sentido es mantener el papel porque la pantalla pierde comandas. Ese es un problema del sistema, no del formato.

## Preguntas frecuentes sobre pantallas de cocina

### ¿Qué es un KDS o pantalla de cocina?

Un KDS (Kitchen Display System) es una pantalla en cocina o barra que recibe las comandas del TPV en cuanto el camarero las envía, las muestra ordenadas con su mesa y permite marcarlas como completadas. Sustituye al ticket de papel: no hay impresora, ni rollo que se acaba, ni comanda que se cae detrás de la plancha.

### ¿Por qué se pierden comandas entre el TPV y la cocina?

Casi siempre por la conexión. Muchos sistemas mantienen una conexión permanente entre el TPV y cada pantalla, y si la WiFi parpadea un segundo la pantalla se queda desconectada sin avisar: lo que se envió mientras tanto no aparece. También se pierden por filtros mal configurados, cuando un artículo sin familia asignada no llega a ninguna pantalla.

### ¿Cuántas pantallas de cocina puede tener un local?

Las que necesite la operativa. En Drenpos funcionan entre 4 y 10 pantallas por local sin problema: cocina caliente, cocina fría, barra, postres, plancha o pase, cada una recibiendo solo las familias de productos que tiene asignadas. Los artículos sin familia van a las pantallas que no tienen filtro.

### ¿Qué hardware hace falta para poner una pantalla de cocina?

Cualquier tablet, ordenador o monitor con navegador. No hace falta hardware específico ni una pantalla certificada de marca: si abre una página web y se ve bien a metro y medio, sirve. Lo que sí conviene es un soporte fijo, la pantalla protegida del vapor y un enchufe cerca para no depender de la batería.

### ¿Es mejor la pantalla de cocina o la ticketera de papel?

La pantalla, en casi todos los casos. El papel no dice qué comanda lleva más tiempo esperando, no se puede reordenar, se moja, se arruga y desaparece. Dicho esto, muchos locales mantienen la impresora como respaldo para el día que se va la luz o para tickets de barra concretos, y eso es razonable.

### ¿Cómo se evita que dos pantallas muestren cosas distintas?

Haciendo que el estado viva en el servidor y que todas las pantallas lo consulten periódicamente, en lugar de que cada una mantenga su propia versión. En Drenpos cada pantalla pregunta al servidor cada 3 segundos y recibe exactamente el mismo estado, así que si alguien marca una comanda como completada en cocina, en barra deja de aparecer.

## Siguiente paso

Si esta semana han vuelto a cantar un plato que nadie estaba haciendo, la pregunta que hay que hacerle al proveedor del sistema es concreta: qué pasa cuando la WiFi se corta un segundo. Si la respuesta convence, perfecto. Si no, cuéntanos cómo trabaja tu cocina en [contacto](/contact) o mira el [software para bares y restaurantes](/software-bares-restaurantes) y cómo se configuran las pantallas por familias.
