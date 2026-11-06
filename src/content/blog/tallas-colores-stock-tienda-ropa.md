---
title: "Stock por talla y color en una tienda de ropa sin duplicar artículos"
meta_title: "Stock por talla y color en tienda de ropa, sin duplicar"
description: "Cómo llevar el stock de una tienda de ropa por talla y color: modelo y variantes, matriz de tallas, reposición por talla, recuentos y etiquetas por variante."
date: 2026-11-06
updated: 2026-11-06
image: "/images/blog/control-de-stock-sin-roturas/cover.jpg"
author:
  name: "Alonso Bermejo Pérez"
  designation: "CEO & Founder"
  avatar: "/images/alonso.jpg"
categories: ["Gestión de retail", "Gestión de Almacén", "TPV y Punto de Venta"]
tags:
  [
    "stock por talla y color",
    "programa tienda de ropa",
    "matriz de tallas",
    "variantes de producto",
    "TPV tienda de ropa",
    "reposición por talla",
    "etiquetas tienda de ropa",
    "zapatería stock por número",
  ]
featured: false
draft: false
hero:
  title: "El stock de una tienda de ropa, talla a talla"
  description: "Modelo y variantes en vez de veinte fichas sueltas, la matriz de tallas en el pedido y la recepción, reposición por talla con números y una etiqueta por variante. Y lo que conviene saber antes de migrar."
faq:
  - question: "¿Cómo se lleva el stock por talla y color en una tienda de ropa?"
    answer: "Con un modelo que agrupa sus variantes. Cada combinación de talla y color es un artículo con su propio stock, su código de barras y su etiqueta, y el modelo solo las agrupa. Así cada venta, compra o recuento mueve la variante exacta y el modelo enseña el total en una rejilla."
  - question: "¿Es mejor una ficha por talla o un modelo con variantes?"
    answer: "Un modelo con variantes. Con fichas sueltas, cambiar el precio, la familia o el IVA del modelo obliga a tocar cada talla, y los informes no agrupan las ventas de la prenda. Con variantes, lo que cambias en el modelo pasa a todas, y cada talla sigue teniendo su stock propio."
  - question: "¿Cómo se repone por talla?"
    answer: "Con un mínimo por variante calculado con lo que vende cada talla, no con un reparto igual. Si de una camiseta vendes 2 S, 5 M, 6 L y 2 XL a la semana y el proveedor tarda dos semanas, el mínimo de la M ronda 15 unidades (10 para cubrir el plazo y 5 de colchón) y el de la S, 6."
  - question: "¿Qué es la matriz o rejilla de tallas?"
    answer: "Una tabla con las tallas en un eje y los colores en el otro, donde cada celda es una variante. Sirve para ver el stock de un vistazo y para rellenar pedidos, recepciones o recuentos escribiendo cantidades en las celdas, en lugar de añadir una línea por cada talla."
  - question: "¿Hace falta una etiqueta distinta para cada talla?"
    answer: "Sí, si quieres que el stock cuadre. Cada variante necesita su propio código de barras para que en caja, al recibir o al contar, la pistola distinga la S de la L. Con una etiqueta por modelo, alguien acaba eligiendo la talla a mano y ahí empiezan los descuadres."
  - question: "¿Cuánto cuesta llevar las tallas y colores con Drenpos?"
    answer: "Para llevar el stock por talla y color con pedidos, recepción y recuentos, el plan Almacén con TPV cuesta [[n:almacen_tpv]] euros al mes sin IVA. Si solo necesitas vender y facturar con las tallas en el TPV, el plan Tienda y Hostelería cuesta [[n:tienda]] euros al mes sin IVA, sin módulo de inventario."
---

> Para llevar el stock de una tienda de ropa por talla y color sin duplicar artículos hay que trabajar con modelos y variantes: el modelo («Camiseta básica») agrupa y cada combinación de talla y color es una variante con su propio stock, su código de barras y su etiqueta. Con eso, el pedido y la recepción se rellenan en una rejilla, la reposición se calcula talla a talla y la caja sabe qué talla ha vendido.

<div class="my-8 flex justify-center">
  <a href="/software-tienda-ropa" class="inline-flex rounded-full px-6 py-3 font-semibold text-white" style="background: var(--bg-menu-lig);">
    Ver el programa para tiendas de ropa
  </a>
</div>

Una camiseta en cinco tallas y cuatro colores son 20 productos distintos para el almacén. Para el cliente es una camiseta. El programa tiene que entender las dos cosas a la vez, y la mayoría de los descuadres de una tienda de moda vienen de que no lo hace.

## ¿Por qué no sirve dar de alta una ficha por talla?

Porque se pierde el modelo. Con 20 fichas sueltas, subir el precio, cambiar la familia o el IVA de la camiseta es repetir el cambio 20 veces, y siempre se escapa una. Los informes tampoco agrupan: sabes cuántas «Camiseta azul M» vendiste, pero no cuántas camisetas. Y el alta de una temporada nueva se convierte en una tarde copiando fichas.

La alternativa contraria, una sola ficha por modelo sin tallas, es peor: el programa sabe que quedan 14 camisetas pero no si queda alguna M. La pregunta del cliente se responde yendo al almacén.

| Forma de darlo de alta | Qué sabes del stock | Qué pasa al cambiar el precio | Informes |
| --- | --- | --- | --- |
| Una ficha por modelo, sin tallas | El total, no la talla | Un cambio | Por modelo, sin detalle |
| Una ficha suelta por talla y color | Cada talla | Un cambio por ficha (20 para una camiseta) | Por talla, sin agrupar |
| Modelo con variantes | Cada talla y el total del modelo | Un cambio en el modelo, pasa a todas | Por talla y por modelo |

## ¿Cómo funciona un modelo con variantes?

El modelo guarda lo común (nombre, familia, impuestos, precio base, etiqueta) y las variantes guardan lo que cambia: talla, color, stock y código de barras. El modelo no se vende ni tiene stock propio. Cada variante es un artículo normal que se compra, se vende, se cuenta y se etiqueta, y el modelo enseña la suma en una rejilla.

En Drenpos se hace así:

1. Defines una vez el catálogo de atributos: tallas XS a XXL, colores con su muestra, números de calzado del 36 al 46.
2. En la ficha del modelo, pestaña Variantes, eliges atributos y valores. El programa avisa «Se crearán 20 variantes» y las crea de golpe, con código MODELO-valor-valor.
3. Lo que cambias en el modelo (familia, impuestos, unidades, etiqueta, almacenes) pasa a las variantes. El precio lo heredan, salvo la variante que lleve uno propio, por ejemplo la XXL un euro más cara.

No está atado a la ropa. Una zapatería usa número × color, una tienda de iluminación color × potencia, y una de bolsos color × acabado. Admite hasta tres atributos por modelo.

## ¿Qué es la matriz de tallas y para qué sirve?

Es una tabla con las tallas en un eje y los colores en el otro, donde cada celda es una variante. Sirve para dos cosas: ver de un vistazo qué hay de cada combinación y meter cantidades sin teclear líneas. En un pedido rellenas las celdas y entra una línea por cada una.

Así se ve la rejilla de stock de una camiseta:

| Color / Talla | S | M | L | XL | Total |
| --- | --- | --- | --- | --- | --- |
| Blanco | 4 | 7 | 6 | 2 | 19 |
| Negro | 3 | 2 | 5 | 1 | 11 |
| Azul | 0 | 3 | 4 | 2 | 9 |
| Rojo | 2 | 1 | 0 | 0 | 3 |
| **Total** | 9 | 13 | 15 | 5 | 42 |

Leída de un vistazo: la S azul está a cero y la roja se está acabando en las tallas grandes. Eso no lo ves con 20 fichas en un listado.

En Drenpos la rejilla aparece donde se elige un artículo a mano: pedidos, albaranes y facturas de compra y venta, recepción, recuentos, reservas y etiquetas. Enseña dos ejes; si el modelo tiene un tercer atributo, se elige en un selector encima de la rejilla.

## ¿Cómo se repone el stock talla a talla?

Con un mínimo por variante que sale de lo que vende cada talla, no de repartir igual. Las tallas centrales rotan más que los extremos, así que la M y la L necesitan más colchón que la XS o la XXL. Si repartes el pedido a partes iguales, acabas con la M agotada y la XS en rebajas.

Pongamos una camiseta que vende 15 unidades a la semana en blanco, con un proveedor que tarda dos semanas en servir:

| Talla | Venta semanal | Venta en 2 semanas | Colchón (1 semana) | Mínimo orientativo |
| --- | --- | --- | --- | --- |
| S | 2 | 4 | 2 | 6 |
| M | 5 | 10 | 5 | 15 |
| L | 6 | 12 | 6 | 18 |
| XL | 2 | 4 | 2 | 6 |

La cuenta es la de siempre, consumo durante el plazo del proveedor más un margen, aplicada talla a talla. La tienes desarrollada en [stock mínimo y punto de pedido](/blog/stock-minimo-punto-de-pedido).

Como en Drenpos cada variante es un artículo normal, cada una lleva su mínimo y su máximo, y el aviso de bajo mínimos llega por variante. En moda de temporada conviene usar el mínimo solo en los básicos que se reponen todo el año; la colección de temporada se compra una vez y se liquida.

## ¿Cómo se recibe un pedido de tallas sin errores?

Comparando lo pedido con lo recibido talla por talla, no por bulto. Llegan 60 camisetas y la caja cuadra, pero vienen 10 M en vez de 15 y 5 XL de más. Si se recibe por total, el error se descubre en el probador semanas después. Si se recibe por variante, se ve en el momento y se reclama.

Dos formas de hacerlo:

- **Con la rejilla:** abres la recepción del pedido y corriges las celdas que no cuadran.
- **Con la pistola:** escaneas cada prenda y el programa suma en su variante. Es más lento, pero no deja pasar un error de etiqueta del proveedor.

El paso a paso general está en [recepción de mercancía](/blog/recepcion-mercancia-almacen). Para contar la tienda sin cerrar, el método de [inventario cíclico](/blog/inventario-ciclico-almacen) funciona igual con tallas: un modelo o una familia cada día.

## ¿Hace falta una etiqueta por talla y color?

Sí. Cada variante necesita su propio código de barras para que la pistola distinga la S de la L en caja, al recibir y al contar. Si etiquetas por modelo, la dependienta acaba eligiendo la talla a mano en el TPV y basta un error al día para que el stock deje de cuadrar en un mes.

En Drenpos cada variante tiene su código de barras y su etiqueta. Desde el Centro de etiquetas se añaden variantes con la rejilla o escaneando, se pone «= stock» para etiquetar todo lo recibido y se imprime en rollo térmico u hoja A4, con el diseño de precio y código de barras para tienda. También se imprimen desde la recepción.

## ¿Cómo se vende por talla en el TPV?

Con el modelo abierto como un grupo, con un botón por variante. En Drenpos la dependienta toca «Camiseta» y le salen los botones «Azul · M», «Azul · L» con su foto y su stock, o escanea la etiqueta y la variante entra directa. Cada ticket descuenta la talla exacta y sale en modalidad Verifactu.

## ¿Qué conviene saber antes de migrar desde otro programa?

Que lo práctico es crear los modelos nuevos y retirar las fichas antiguas. En Drenpos un artículo que ya tiene movimientos no se convierte en modelo, así que si vienes de un programa con cada talla como ficha suelta, cargas los modelos desde la hoja Variantes del Excel y desactivas las fichas viejas, que conservan su histórico.

Otras tres cosas que conviene tener claras:

- **No hay variantes de variantes.** Un modelo tiene hasta tres atributos, todos al mismo nivel.
- **En la tienda online se publica el modelo.** Con WooCommerce o Faire sale como producto variable con todas sus opciones; no se publica una talla suelta.
- **El código de cada variante lo genera el programa** (MODELO-valor-valor). El código de barras del proveedor se asocia a cada variante para leerlo con la pistola.

Lo que hace y lo que no hace, con precios, está en el [programa para tiendas de ropa](/software-tienda-ropa).

## Preguntas frecuentes sobre el stock por talla y color

### ¿Cómo se lleva el stock por talla y color en una tienda de ropa?

Con un modelo que agrupa sus variantes. Cada combinación de talla y color es un artículo con su propio stock, su código de barras y su etiqueta, y el modelo solo las agrupa. Así cada venta, compra o recuento mueve la variante exacta y el modelo enseña el total en una rejilla.

### ¿Es mejor una ficha por talla o un modelo con variantes?

Un modelo con variantes. Con fichas sueltas, cambiar el precio, la familia o el IVA del modelo obliga a tocar cada talla, y los informes no agrupan las ventas de la prenda. Con variantes, lo que cambias en el modelo pasa a todas, y cada talla sigue teniendo su stock propio.

### ¿Cómo se repone por talla?

Con un mínimo por variante calculado con lo que vende cada talla, no con un reparto igual. Si de una camiseta vendes 2 S, 5 M, 6 L y 2 XL a la semana y el proveedor tarda dos semanas, el mínimo de la M ronda 15 unidades (10 para cubrir el plazo y 5 de colchón) y el de la S, 6.

### ¿Qué es la matriz o rejilla de tallas?

Una tabla con las tallas en un eje y los colores en el otro, donde cada celda es una variante. Sirve para ver el stock de un vistazo y para rellenar pedidos, recepciones o recuentos escribiendo cantidades en las celdas, en lugar de añadir una línea por cada talla.

### ¿Hace falta una etiqueta distinta para cada talla?

Sí, si quieres que el stock cuadre. Cada variante necesita su propio código de barras para que en caja, al recibir o al contar, la pistola distinga la S de la L. Con una etiqueta por modelo, alguien acaba eligiendo la talla a mano y ahí empiezan los descuadres.

### ¿Cuánto cuesta llevar las tallas y colores con Drenpos?

Para llevar el stock por talla y color con pedidos, recepción y recuentos, el plan Almacén con TPV cuesta [[n:almacen_tpv]] euros al mes sin IVA. Si solo necesitas vender y facturar con las tallas en el TPV, el plan Tienda y Hostelería cuesta [[n:tienda]] euros al mes sin IVA, sin módulo de inventario.

## Siguiente paso

Saca de tu programa actual la lista de prendas con modelo, talla, color, precio y stock. Con esa hoja adaptada a la plantilla de variantes se carga el catálogo de una vez. Mira el [programa para tiendas de ropa](/software-tienda-ropa) o la visión general de [almacén y TPV para tiendas](/software-almacen-tienda), y pide una demo con tus modelos delante.
