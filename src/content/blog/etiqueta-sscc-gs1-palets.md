---
title: "Etiqueta SSCC: qué es, cómo se genera y por qué la exigen"
meta_title: "Etiqueta SSCC GS1: guía práctica para palets"
description: "Qué es la etiqueta SSCC, cómo se componen sus 18 dígitos, qué identificadores GS1 lleva y cómo generar etiquetas de palet estándar sin errores."
date: 2026-08-12
image: "/images/blog/etiqueta-sscc-gs1-palets/cover.webp"
author:
  name: "Alonso Bermejo Pérez"
  designation: "CEO & Founder"
  avatar: "/images/alonso.jpg"
categories: ["Gestión de Almacén", "Logística y 3PL", "Trazabilidad"]
tags:
  [
    "etiqueta SSCC",
    "GS1-128",
    "palets",
    "unidad logística",
    "trazabilidad de palets",
  ]
featured: false
draft: false
hero:
  title: "La matrícula de tu palet se llama SSCC"
  description: "18 dígitos, un código de barras y todo el palet identificado en un escaneo."
faq:
  - question: "¿Qué es el código SSCC?"
    answer: "El SSCC (Serial Shipping Container Code) es el código GS1 de 18 dígitos que identifica de forma única e irrepetible una unidad logística concreta: un palet, una caja agrupada o un contenedor. No describe qué producto hay dentro, sino qué bulto es. Se imprime en la etiqueta logística codificado en GS1-128 con el identificador de aplicación 00 y acompaña al palet durante todo su recorrido."
  - question: "¿Cuántos dígitos tiene un SSCC y cómo se estructura?"
    answer: "Un SSCC tiene siempre 18 dígitos. El primero es el dígito de extensión, que elige libremente la empresa emisora para ampliar su capacidad de numeración. Después va el prefijo de compañía GS1, asignado al asociarse a GS1 España, seguido del número de serie que genera el emisor. El último dígito es el de control, calculado con el algoritmo módulo 10 sobre los diecisiete anteriores."
  - question: "¿Cuál es la diferencia entre GTIN y SSCC?"
    answer: "El GTIN identifica un producto: todas las botellas iguales comparten el mismo GTIN. El SSCC identifica un bulto físico concreto e irrepetible: dos palets con contenido idéntico llevan SSCC distintos. En la etiqueta logística conviven los dos, porque el AI 01 dice qué producto contiene el palet y el AI 00 dice cuál es ese palet exactamente. Uno responde qué, el otro responde cuál."
  - question: "¿Se puede reutilizar un número SSCC?"
    answer: "No conviene y la norma GS1 no lo permite durante un periodo prolongado, precisamente para que la trazabilidad nunca sea ambigua. Si un SSCC se repite, un mismo escaneo puede apuntar a dos expediciones distintas y el aviso de expedición del cliente deja de cuadrar. La solución práctica es generar la serie automáticamente desde el sistema, nunca a mano en una hoja de cálculo."
  - question: "¿Cómo se generan las etiquetas SSCC de un palet?"
    answer: "Se generan desde el software que gestiona el almacén, no a mano. Al crear el palet, el sistema toma el siguiente número de serie libre, calcula el dígito de control, compone el código de barras GS1-128 con el AI 00 y añade el resto de identificadores: GTIN, lote, caducidad, peso y unidades. La etiqueta se imprime en rollo o en A4 y se pega en dos caras adyacentes."
  - question: "¿Es obligatoria la etiqueta SSCC para vender a la distribución?"
    answer: "Ninguna norma española obliga con carácter general a usar SSCC, pero en la práctica lo exigen los pliegos logísticos de la gran distribución, los operadores 3PL y cualquier cadena que trabaje con aviso de expedición electrónico. Sin SSCC, el palet no puede recepcionarse por escaneo y todo el proceso pasa a ser manual, con las incidencias y los retrasos que eso genera."
---

> El SSCC (Serial Shipping Container Code) es un código GS1 de 18 dígitos que identifica de manera única e irrepetible una unidad logística concreta, normalmente un palet. Se imprime en la etiqueta logística mediante un código de barras GS1-128 precedido del identificador de aplicación 00. Funciona como la matrícula del bulto: escaneando ese número, cualquier eslabón de la cadena sabe qué contiene, de quién viene y hacia dónde va.

<div class="my-8 flex justify-center">
  <a href="/contact" class="inline-flex rounded-full px-6 py-3 font-semibold text-white" style="background: var(--bg-menu-lig);">
    Ver la gestión de palets de Drenpos
  </a>
</div>

## ¿Qué es la etiqueta SSCC y para qué sirve?

La etiqueta SSCC es la etiqueta logística que se pega en un palet y lleva impreso su Serial Shipping Container Code de 18 dígitos. Su función es convertir un bulto anónimo en una unidad identificable: en lugar de describir la mercancía con palabras, se escanea un único código y el sistema recupera todo el contenido asociado. Es la base de la trazabilidad logística moderna.

Para una pyme que empieza a servir a cadenas de distribución, el SSCC deja de ser buena práctica y pasa a ser requisito de entrada, como en cualquier [software de gestión de almacén](/software-gestion-almacen) serio.

## ¿Cómo se componen los 18 dígitos del SSCC?

El SSCC suma siempre 18 dígitos repartidos en cuatro bloques: un dígito de extensión, el prefijo de compañía GS1, un número de serie y un dígito de control final. El prefijo lo asigna GS1 y su longitud varía según la empresa; lo que sobra hasta el dígito 17 es la serie que gestiona el emisor. El último dígito no se elige: se calcula.

| Posición | Componente | Longitud | Quién lo fija |
|---|---|---|---|
| 1 | Dígito de extensión | 1 dígito | La empresa emisora, libremente |
| 2 en adelante | Prefijo de compañía GS1 | Variable | GS1 (al asociarse a GS1 España) |
| Hasta el 17 | Número de serie | Lo que reste hasta 17 | La empresa emisora |
| 18 | Dígito de control | 1 dígito | Calculado con el algoritmo módulo 10 |

Cuanto más corto sea tu prefijo, más dígitos quedan libres para numerar palets. Ni el prefijo ni sus reglas las decides tú: se obtienen al asociarte a GS1 España y se consultan en la Especificación General de GS1 vigente.

## ¿Cómo se calcula el dígito de control módulo 10?

El dígito 18 se obtiene aplicando el algoritmo módulo 10 de GS1 sobre los 17 dígitos anteriores. Se multiplican alternativamente por 3 y por 1 empezando por la izquierda con peso 3, se suman todos los productos y se busca el múltiplo de 10 igual o superior más cercano. La diferencia entre esa suma y ese múltiplo es el dígito de control.

Con un ejemplo puramente ilustrativo, partiendo de los 17 dígitos `34012345000000011`:

1. **Asigna pesos alternos**: 3, 1, 3, 1… empezando por la izquierda con peso 3.
2. **Multiplica y suma**: (3×3)+(4×1)+(0×3)+(1×1)+(2×3)+(3×1)+(4×3)+… La suma es 44.
3. **Sube al múltiplo de 10**: el siguiente múltiplo por encima de 44 es 50.
4. **Resta**: 50 − 44 = 6. El SSCC completo queda `340123450000000116`.

Si la suma ya fuera múltiplo de 10, el dígito de control sería 0. En producción esta cuenta la hace el sistema al generar la etiqueta, nunca una persona.

## ¿Qué diferencia hay entre GTIN y SSCC?

El GTIN identifica un producto y el SSCC identifica un bulto. Todas las unidades iguales de una referencia comparten GTIN, mientras que cada palet, aunque contenga exactamente lo mismo que el de al lado, tiene su propio SSCC. Uno responde a "qué es esto" y el otro a "cuál de todos es este", y en la etiqueta logística conviven los dos sin ningún conflicto.

Si un cliente reclama, no buscas "yogur de fresa": buscas el palet exacto que salió hacia él, con sus lotes. Esa es la diferencia entre un aviso genérico y un [recall quirúrgico por lote](/blog/trazabilidad-alimentaria-lotes-recall).

## ¿Qué lleva una etiqueta logística GS1 estándar?

La etiqueta logística GS1 se estructura en tres secciones apiladas: transporte arriba, cliente en medio y proveedor abajo. Cada bloque agrupa la información según quién la necesita y en qué momento del recorrido. El formato habitual es A5 y la recomendación práctica es colocarla en dos caras adyacentes del palet, para que sea legible se aproxime la carretilla por donde se aproxime.

- **Transporte**: lo que usa quien mueve la mercancía (destinatario, punto de entrega, bultos).
- **Cliente**: lo que interesa a quien recibe (producto, cantidad, lote, fechas) y se cruza contra el pedido.
- **Proveedor**: cierra con el SSCC en un GS1-128 grande y su representación numérica debajo. Es el dato maestro de la etiqueta.

## ¿Qué identificadores de aplicación usa el palet?

Los identificadores de aplicación (AI) son prefijos numéricos que indican qué significa cada dato codificado dentro del GS1-128. El AI 00 introduce el SSCC, el 01 el GTIN del contenido, el 10 el lote y el 17 la caducidad. Gracias a ellos un solo código de barras transporta varios datos y cualquier lector del mundo los interpreta sin acuerdo previo entre las partes.

| AI | Dato | Qué significa en la etiqueta del palet |
|---|---|---|
| 00 | SSCC | Identificador único de la unidad logística: la matrícula del palet |
| 01 | GTIN | Qué producto contiene el palet (referencia comercial) |
| 10 | Lote | Lote del contenido: la clave del recall |
| 11 | Fecha de fabricación | Cuándo se produjo la mercancía |
| 15 | Consumo preferente | Duración mínima, no crítica sanitariamente |
| 17 | Fecha de caducidad | Límite de consumo, crítica en alimentación |
| 3102 / 310n | Peso neto | Kilos netos del contenido; la `n` indica los decimales |
| 37 | Número de unidades | Cuántas unidades del GTIN lleva el palet |

En la familia `310n` el último dígito marca los decimales: `3102` es peso neto en kilos con dos decimales. Contrasta siempre cada formato con la Especificación General de GS1 vigente.

## ¿Por qué la distribución exige la etiqueta SSCC?

Porque sin SSCC la recepción no se puede automatizar. Una plataforma que descarga cientos de palets al día necesita escanear un código y saber al instante qué ha entrado, sin teclear nada ni abrir el retractilado. El SSCC es lo que enlaza el palet físico con el aviso de expedición electrónico que el proveedor envió antes de que llegara el camión.

Para el proveedor el beneficio tampoco es menor: un palet identificado se recepciona antes y genera menos incidencias. Si preparas sobre palet con un sistema de [preparación de pedidos y picking](/software-preparacion-pedidos-picking), la expedición se resuelve en un gesto.

En los almacenes que guardan mercancía de terceros el SSCC es la unidad de facturación: permite cobrar por palet y día, como en el [alquiler de huecos de palet](/software-alquiler-huecos-palet).

## ¿Qué errores se cometen al etiquetar palets?

Los cuatro fallos más repetidos son reutilizar un SSCC ya emitido, imprimir sin verificar el dígito de control, etiquetar una sola cara del palet y no vincular el SSCC con su contenido en el sistema. Los tres primeros se detectan en el muelle del cliente. El cuarto es el más caro: la etiqueta parece correcta, pero el número no responde a nada.

- **Reutilizar un SSCC**: si dos expediciones comparten número, la trazabilidad pasa de cadena a ambigüedad.
- **No verificar el dígito de control**: pasa al maquetar en Word o Excel; el código se ve bien, pero el lector lo rechaza.
- **Etiquetar una sola cara**: nadie moverá un palet de 700 kg para leer una pegatina del lado contrario.
- **No vincular el SSCC al contenido**: la etiqueta solo es la llave del dato; si no abre nada, es un adhesivo bonito.

| Aspecto | Etiqueta artesanal (Word o Excel) | Etiqueta SSCC estándar GS1 |
|---|---|---|
| Identificador | Texto libre: "Palet 12" | 18 dígitos únicos e irrepetibles |
| Lectura | Hay que leer y teclear a mano | Escaneable por cualquier lector GS1-128 |
| Dígito de control | Inexistente | Módulo 10: valida el número al leerlo |
| Contenido asociado | Un papel o la memoria del encargado | Vinculado en el sistema con lotes y series |
| En distribución | Recepción manual o rechazo | Requisito estándar de las plataformas |
| Ante un recall | Reconstrucción manual de horas | Consulta directa por palet y lote |

## ¿Cómo empezar a etiquetar tus palets con SSCC?

Empezar con SSCC no exige obra ni maquinaria nueva: hacen falta un prefijo de compañía GS1, un sistema que genere y guarde los números y una impresora de etiquetas. Lo demás es método. En un almacén pequeño el proceso se pone en marcha en cuestión de días, y el cambio de fondo no es tecnológico sino de disciplina operativa.

### Cómo empezar a etiquetar tus palets con SSCC en 7 pasos

1. **Asóciate a GS1 España** y obtén tu prefijo de compañía: es el punto de partida obligatorio.
2. **Define tu plan de numeración**: cuántos dígitos quedan para la serie y quién controla el contador.
3. **Elige el software** que generará los SSCC, calculará el dígito de control y guardará el vínculo con el contenido.
4. **Diseña la etiqueta en tres secciones** (transporte, cliente, proveedor) en formato A5.
5. **Decide los AIs a imprimir**: lote y caducidad en alimentación, peso neto si vendes a granel.
6. **Prueba con un lector real** antes de imprimir mil etiquetas y valida el resultado con tu cliente.
7. **Forma al equipo**: dos caras adyacentes, nunca reimprimir etiquetas viejas y cerrar el palet en el sistema.

## ¿Cómo gestiona Drenpos los palets y sus SSCC?

En Drenpos cada palet nace con su etiqueta SSCC estándar GS1 imprimible en rollo o en A4, la misma que exigen las grandes plataformas logísticas. El palet tiene ciclo de vida propio: abierto, cerrado y pesado con bruto, tara y neto, expedido o anulado, cada paso con su permiso separado. La etiqueta y el contenido nunca se separan.

Dentro cabe cualquier mezcla de productos, lotes y series, con una pestaña de trazabilidad que cuenta todo lo que ha entrado y salido del palet. El montaje se hace con pistola o a mano, y mover el palet entero de ubicación o de almacén es un solo escaneo: el stock viaja con él.

La vista global de contenido responde a la pregunta de siempre: "¿dónde tengo este lote?". Y el despaletizado se resuelve en tres gestos: vaciar a una ubicación, pasar mercancía a otro palet o partir uno en varios nuevos que nacen cargados y etiquetados.

Todas las pantallas funcionan en móvil y tablet, para trabajar a pie de cámara y no en la oficina, algo clave en un [almacén frigorífico](/software-almacen-frigorifico). En albaranes y facturas los palets van blindados: escanear un SSCC arrastra el palet entero, las líneas quedan bloqueadas y la impresión muestra la relación producto-palet.

El módulo de Inventario, donde vive esta gestión de palets, cuesta 16,45 €/mes sin IVA sobre un plan base de 19, 29 o 39 €/mes sin IVA. Tienes el detalle en [precios](/pricing).

## Preguntas frecuentes sobre la etiqueta SSCC

### ¿Qué es el código SSCC?

El SSCC (Serial Shipping Container Code) es el código GS1 de 18 dígitos que identifica de forma única e irrepetible una unidad logística concreta: un palet, una caja agrupada o un contenedor. No describe qué producto hay dentro, sino qué bulto es. Se imprime en la etiqueta logística codificado en GS1-128 con el identificador de aplicación 00 y acompaña al palet durante todo su recorrido.

### ¿Cuántos dígitos tiene un SSCC y cómo se estructura?

Un SSCC tiene siempre 18 dígitos. El primero es el dígito de extensión, que elige libremente la empresa emisora para ampliar su capacidad de numeración. Después va el prefijo de compañía GS1, asignado al asociarse a GS1 España, seguido del número de serie que genera el emisor. El último dígito es el de control, calculado con el algoritmo módulo 10 sobre los diecisiete anteriores.

### ¿Cuál es la diferencia entre GTIN y SSCC?

El GTIN identifica un producto: todas las botellas iguales comparten el mismo GTIN. El SSCC identifica un bulto físico concreto e irrepetible: dos palets con contenido idéntico llevan SSCC distintos. En la etiqueta logística conviven los dos, porque el AI 01 dice qué producto contiene el palet y el AI 00 dice cuál es ese palet exactamente. Uno responde qué, el otro responde cuál.

### ¿Se puede reutilizar un número SSCC?

No conviene y la norma GS1 no lo permite durante un periodo prolongado, precisamente para que la trazabilidad nunca sea ambigua. Si un SSCC se repite, un mismo escaneo puede apuntar a dos expediciones distintas y el aviso de expedición del cliente deja de cuadrar. La solución práctica es generar la serie automáticamente desde el sistema, nunca a mano en una hoja de cálculo.

### ¿Cómo se generan las etiquetas SSCC de un palet?

Se generan desde el software que gestiona el almacén, no a mano. Al crear el palet, el sistema toma el siguiente número de serie libre, calcula el dígito de control, compone el código de barras GS1-128 con el AI 00 y añade el resto de identificadores: GTIN, lote, caducidad, peso y unidades. La etiqueta se imprime en rollo o en A4 y se pega en dos caras adyacentes.

### ¿Es obligatoria la etiqueta SSCC para vender a la distribución?

Ninguna norma española obliga con carácter general a usar SSCC, pero en la práctica lo exigen los pliegos logísticos de la gran distribución, los operadores 3PL y cualquier cadena que trabaje con aviso de expedición electrónico. Sin SSCC, el palet no puede recepcionarse por escaneo y todo el proceso pasa a ser manual, con las incidencias y los retrasos que eso genera.

---

La etiqueta SSCC no es burocracia: convierte un palet en un dato consultable. Si quieres que cada palet nazca etiquetado y con su trazabilidad completa, descubre el [software de gestión de almacén](/software-gestion-almacen) de Drenpos.