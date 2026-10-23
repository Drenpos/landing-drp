---
title: "Inventario cíclico: cómo contar el almacén sin cerrarlo, con método ABC y ejemplo"
meta_title: "Inventario cíclico: cómo contar sin cerrar el almacén"
description: "Inventario cíclico frente al anual: clasificación ABC, cada cuánto contar, cómo hacerlo sin parar el almacén y cómo se cuadran las diferencias, con números."
date: 2026-10-17
updated: 2026-10-22
image: "/images/blog/cuanto-cuesta-sga-wms-pyme-2026/cover.jpg"
author:
  name: "Alonso Bermejo Pérez"
  designation: "CEO & Founder"
  avatar: "/images/alonso.jpg"
categories: ["Gestión de Almacén", "Automatización pymes", "Productividad"]
tags:
  [
    "inventario cíclico",
    "inventario cíclico vs anual",
    "clasificación abc inventario",
    "recuento de almacén",
    "diferencias de inventario",
    "exactitud de inventario",
    "inventario sin cerrar",
  ]
featured: false
draft: false
hero:
  title: "Inventario cíclico: contar poco, contar siempre"
  description: "Cómo sustituir el gran recuento anual por recuentos cortos repartidos en el año: clasificación ABC, calendario con números, reglas para contar sin parar el almacén y cómo se buscan y se regularizan las diferencias."
faq:
  - question: "¿Qué es el inventario cíclico?"
    answer: "Es contar el almacén por partes durante todo el año en lugar de hacerlo entero un solo día. Cada jornada se cuentan unas pocas ubicaciones o referencias, se compara con el stock del sistema y se corrigen las diferencias. Las referencias que más se mueven o más valen se cuentan más a menudo, normalmente siguiendo una clasificación ABC."
  - question: "¿Cada cuánto hay que contar cada referencia?"
    answer: "Una pauta habitual es contar las referencias A cada mes, las B cada trimestre y las C una o dos veces al año. Con 1.200 referencias repartidas en 180 A, 300 B y 720 C salen unos 4.080 recuentos al año, unas 19 referencias por día laborable. Ajusta la frecuencia según los errores que encuentres: si una referencia falla a menudo, súbela de clase."
  - question: "¿El inventario cíclico sustituye al inventario anual?"
    answer: "En la práctica, sí, si el recuento es fiable. El Código de Comercio pide transcribir el inventario de cierre del ejercicio en el libro de inventarios y cuentas anuales, pero no obliga a contar todo el almacén el mismo día. Si tus cuentas se auditan, el auditor puede querer presenciar recuentos. Confírmalo con tu asesoría antes de eliminar el recuento de cierre."
  - question: "¿Se puede contar sin parar la preparación de pedidos?"
    answer: "Sí, contando por ubicación y no por artículo, y bloqueando solo el hueco que se está contando durante los minutos que dura el recuento. Ayuda contar a primera hora o cuando el hueco está casi vacío, hacer recuento ciego (sin ver la cantidad teórica) y tener en cuenta la mercancía que está en el muelle o en la zona de preparados."
  - question: "¿Qué exactitud de inventario es razonable?"
    answer: "Se mide como el porcentaje de ubicaciones contadas sin diferencia. No hay una cifra oficial, pero en un almacén ordenado con pistola lectora es razonable aspirar a más del 95 %. Si estás por debajo del 90 %, antes de contar más conviene buscar la causa: recepciones sin registrar, traslados sin confirmar o errores de unidad de medida."
  - question: "¿Drenpos permite hacer recuentos parciales por zona?"
    answer: "Sí. Se cuenta por zona o por ubicación con pistola o móvil, el sistema compara con el stock teórico y regulariza las diferencias con una entrada o una salida, avisando si el recuento deja stock por debajo de lo reservado para pedidos. Al terminar sale un informe imprimible de diferencias."
---

> El inventario cíclico consiste en contar el almacén por partes durante todo el año, unas pocas ubicaciones cada día, en lugar de cerrarlo para un gran recuento anual. Lo que más se mueve o más vale se cuenta más a menudo (clasificación ABC), las diferencias se investigan cuando aún se recuerda qué pasó y el stock del sistema se mantiene fiable los 365 días. Abajo tienes el calendario con números y cómo se cuadran las diferencias.

<div class="my-8 flex justify-center">
  <a href="/software-control-stock" class="inline-flex rounded-full px-6 py-3 font-semibold text-white" style="background: var(--bg-menu-lig);">
    Ver inventarios por zona en Drenpos
  </a>
</div>

## ¿Qué es el inventario cíclico?

Es un método de recuento en el que el almacén se cuenta por partes y de forma continua. Cada día se cuenta un grupo pequeño de ubicaciones o referencias, se compara con el stock del sistema y se corrigen las diferencias. Al cabo del año todo se ha contado al menos una vez, y lo importante varias. No hay que cerrar, no hay que pagar horas extra un sábado y los errores aparecen cuando todavía se pueden explicar.

El inventario anual tiene un problema de fondo: encuentra las diferencias once meses tarde. Si en marzo alguien sirvió cajas de 12 como si fueran de 6, en diciembre solo verás un faltante, sin forma de saber de dónde salió. Con recuentos frecuentes, la diferencia aparece a las pocas semanas y el albarán equivocado todavía está en la bandeja.

## ¿En qué se diferencia del inventario anual?

El anual cuenta todo un día concreto, normalmente con el almacén cerrado, y sirve para cuadrar el cierre. El cíclico cuenta un poco cada día y sirve para que el stock sea fiable todo el año. El anual mide el error acumulado; el cíclico lo corrige antes de que se acumule. Para una pyme con más de unos cientos de referencias, el cíclico suele salir más barato y da más información.

| Aspecto | Inventario anual | Inventario cíclico |
| --- | --- | --- |
| Cuándo se cuenta | Un día, normalmente a fin de año | Todos los días o varias veces por semana |
| ¿Hay que cerrar? | Sí, o parar la actividad | No |
| Quién cuenta | Toda la plantilla, a veces con ayuda externa | Una o dos personas, en ratos cortos |
| Calidad del recuento | Baja: cansancio, prisas, gente que no conoce el producto | Alta: lo cuenta quien conoce la zona |
| Detección de errores | Una vez al año, sin rastro de la causa | A las pocas semanas, con la causa reciente |
| Coste típico | Un día de cierre más horas extra | Unos 30 a 45 minutos diarios |

## ¿Cómo se clasifica el stock con el método ABC?

Ordenando las referencias por su consumo anual valorado (unidades que salen al año por su coste) y cortando la lista en tres grupos. Las A son las pocas referencias que concentran la mayor parte del valor que se mueve; las C, la larga cola que apenas pesa. El corte habitual deja en A en torno al 15 a 20 % de las referencias, que suelen sumar cerca del 75 a 80 % del valor movido.

Un ejemplo con un distribuidor de alimentación de 1.200 referencias:

| Clase | Referencias | % de referencias | Consumo anual valorado | % del valor |
| --- | --- | --- | --- | --- |
| A | 180 | 15 % | 1.170.000 € | 78 % |
| B | 300 | 25 % | 240.000 € | 16 % |
| C | 720 | 60 % | 90.000 € | 6 % |
| **Total** | **1.200** | **100 %** | **1.500.000 €** | **100 %** |

Para el recuento hay una variante útil: clasificar por número de movimientos (líneas de picking al año) en vez de por valor. Los errores de stock nacen en los movimientos, así que una referencia barata que sale cuarenta veces al día se descuadra más que una cara que sale una vez al mes. Mucha gente combina las dos: A por valor o por movimientos, lo que llegue antes.

La misma clasificación sirve para colocar: las A, a la altura de la mano y cerca de la expedición. Lo contamos en [cómo organizar el almacén de una pyme](/blog/como-organizar-almacen-pyme).

## ¿Con qué frecuencia se cuenta cada clase?

Una pauta que funciona en la mayoría de pymes: las A cada mes, las B cada trimestre y las C una vez al año. Multiplica referencias por recuentos al año, divide entre los días laborables y tendrás cuántas referencias hay que contar cada día. En el ejemplo salen unas 19 al día, que una persona con pistola cuenta en menos de una hora.

| Clase | Referencias | Recuentos al año | Recuentos totales |
| --- | --- | --- | --- |
| A | 180 | 12 (mensual) | 2.160 |
| B | 300 | 4 (trimestral) | 1.200 |
| C | 720 | 1 (anual) | 720 |
| **Total** | | | **4.080** |

Con unos 220 días laborables, 4.080 entre 220 son 18,5: redondeando, **19 referencias al día**. Si cada recuento lleva de uno a dos minutos (ir al hueco, escanear, contar, registrar), son entre 20 y 40 minutos diarios.

Estas frecuencias no son fijas. Si una referencia B aparece con diferencias dos meses seguidos, pásala a A hasta que deje de fallar. Si una A lleva un año sin una sola diferencia, puedes espaciarla.

## ¿Cómo se cuenta sin parar el almacén?

Contando por ubicación y no por artículo, bloqueando solo el hueco que se cuenta durante los minutos que dura el recuento y eligiendo bien el momento: a primera hora, antes de que empiece el picking, o cuando el hueco está casi vacío. Si además el recuento es ciego, sin ver la cantidad que espera el sistema, la cifra que sale es la real y no la que el operario esperaba encontrar.

Las reglas que más diferencia marcan:

- **Por ubicación, no por artículo.** Se cuenta lo que hay en el hueco P-03-08-2, sea lo que sea. Así aparecen las referencias que estaban donde no debían. Si las ubicaciones no están codificadas, empieza por ahí: [cómo codificar ubicaciones de almacén](/blog/codificar-ubicaciones-almacen).
- **Recuento ciego.** El operario no ve la cantidad teórica. Si la ve, tiende a «encontrarla».
- **Ojo con lo que está en tránsito.** Mercancía en el muelle sin ubicar, pedidos preparados en la balda de expedición y traslados a medias. Si no se tienen en cuenta, generan diferencias falsas.
- **Contar con el hueco bajo.** Un hueco con 4 cajas se cuenta en segundos; con 40, no. Si el sistema dice que un hueco está casi vacío, es buen momento para contarlo.
- **Confirmar los ceros.** Cuando el picking deja un hueco vacío, confirmar ese cero es un recuento gratis.
- **Segundo recuento si la diferencia supera el umbral.** Antes de regularizar una diferencia grande, que la cuente otra persona.

## ¿Cómo se cuadran las diferencias de inventario?

Primero se recuenta, luego se busca la causa y solo después se regulariza con un motivo. La mayoría de diferencias no son robos ni roturas: son movimientos que no se han registrado o que se han registrado mal. Si se regulariza sin buscar la causa, el mismo error volverá el mes siguiente, y la cifra de merma acabará escondiendo un fallo de proceso que nadie ha corregido.

Las causas que aparecen una y otra vez:

| Causa | Cómo se detecta | Qué se corrige |
| --- | --- | --- |
| Recepción sin registrar | Sobra mercancía que coincide con un pedido de compra pendiente | Registrar la recepción, no regularizar |
| Traslado sin confirmar | Falta en un hueco y sobra lo mismo en otro | Confirmar el traslado |
| Error de unidad de medida | La diferencia es múltiplo exacto del formato (6, 12, 24) | Revisar el albarán y los códigos de barras de cada formato |
| Lote cruzado | El total cuadra pero no por lote | Corregir el lote en el documento |
| Rotura o caducidad sin dar de baja | Falta, y hay producto dañado en la zona de incidencias | Salida de stock con su motivo |
| Venta sin documento | Falta sin explicación, de forma repetida | Revisar el proceso de venta en mostrador o furgoneta |

Una vez agotadas las causas, se regulariza: una entrada si sobra y una salida si falta, cada una con su motivo. Pon tolerancias por clase para no perseguir céntimos. Por ejemplo, cero de tolerancia en A, un 2 % en B y un 5 % en C.

**El indicador que hay que mirar** es la exactitud de inventario: ubicaciones contadas sin diferencia dividido entre ubicaciones contadas. Un mes de ejemplo:

| Concepto | Valor |
| --- | --- |
| Ubicaciones contadas en el mes | 400 |
| Ubicaciones sin diferencia | 368 |
| Exactitud | 92 % |
| Sobrantes valorados | 310 € |
| Faltantes valorados | 845 € |
| Diferencia neta | −535 € |

Mira las dos cifras de valor por separado. Un neto pequeño puede esconder faltantes y sobrantes grandes que se compensan, y eso significa que el stock está mal en los dos sentidos.

## ¿El inventario cíclico sustituye al inventario de cierre?

En la práctica, sí, si el recuento es fiable. El [artículo 28 del Código de Comercio](https://www.boe.es/buscar/act.php?id=BOE-A-1885-6627#a28) pide transcribir el inventario de cierre del ejercicio en el libro de inventarios y cuentas anuales, pero no obliga a contar todo el almacén el mismo día. Si tus cuentas se auditan, el auditor puede pedir presenciar recuentos. Confírmalo con tu asesoría.

Lo que sí conviene, a fecha de 17 de octubre de 2026, es que a 31 de diciembre el stock del sistema esté al día: recepciones registradas, traslados confirmados y bajas dadas. Si el cíclico ha funcionado durante el año, el listado del sistema a esa fecha, valorado, es tu inventario de cierre.

## ¿Cómo se hace el inventario cíclico en Drenpos?

Con recuentos por zona o por ubicación desde la pistola o el móvil. El sistema compara lo contado con el stock teórico y regulariza las diferencias con una entrada o una salida, según sobre o falte. Si el recuento deja el stock por debajo de lo reservado para pedidos, avisa. Al terminar sale un informe imprimible de diferencias, y las ubicaciones se recorren en el orden de ruta del almacén.

Para montar el calendario ABC tienes el informe de rotación, que ordena lo que más sale por unidades y por valor, con la cobertura en días. Con esa lista cortas A, B y C y decides qué se cuenta cada semana; el reparto lo decides tú, Drenpos no programa los recuentos por su cuenta. La foto del stock por almacén y ubicación se exporta a Excel, y la merma valorada recoge los faltantes de inventario con su motivo, por mes, producto y almacén.

Si además quieres que lo que cuentas sirva para comprar mejor, lee [stock mínimo y punto de pedido](/blog/stock-minimo-punto-de-pedido): un mínimo calculado sobre un stock que no cuadra no sirve de mucho. Todo va en el módulo de Inventario, incluido en el plan Almacén por [[p:almacen]]/mes sin IVA.

## Preguntas frecuentes sobre el inventario cíclico

### ¿Qué es el inventario cíclico?

Es contar el almacén por partes durante todo el año en lugar de hacerlo entero un solo día. Cada jornada se cuentan unas pocas ubicaciones o referencias, se compara con el stock del sistema y se corrigen las diferencias. Las referencias que más se mueven o más valen se cuentan más a menudo, normalmente siguiendo una clasificación ABC.

### ¿Cada cuánto hay que contar cada referencia?

Una pauta habitual es contar las referencias A cada mes, las B cada trimestre y las C una o dos veces al año. Con 1.200 referencias repartidas en 180 A, 300 B y 720 C salen unos 4.080 recuentos al año, unas 19 referencias por día laborable. Ajusta la frecuencia según los errores que encuentres: si una referencia falla a menudo, súbela de clase.

### ¿El inventario cíclico sustituye al inventario anual?

En la práctica, sí, si el recuento es fiable. El Código de Comercio pide transcribir el inventario de cierre del ejercicio en el libro de inventarios y cuentas anuales, pero no obliga a contar todo el almacén el mismo día. Si tus cuentas se auditan, el auditor puede querer presenciar recuentos. Confírmalo con tu asesoría antes de eliminar el recuento de cierre.

### ¿Se puede contar sin parar la preparación de pedidos?

Sí, contando por ubicación y no por artículo, y bloqueando solo el hueco que se está contando durante los minutos que dura el recuento. Ayuda contar a primera hora o cuando el hueco está casi vacío, hacer recuento ciego (sin ver la cantidad teórica) y tener en cuenta la mercancía que está en el muelle o en la zona de preparados.

### ¿Qué exactitud de inventario es razonable?

Se mide como el porcentaje de ubicaciones contadas sin diferencia. No hay una cifra oficial, pero en un almacén ordenado con pistola lectora es razonable aspirar a más del 95 %. Si estás por debajo del 90 %, antes de contar más conviene buscar la causa: recepciones sin registrar, traslados sin confirmar o errores de unidad de medida.

### ¿Drenpos permite hacer recuentos parciales por zona?

Sí. Se cuenta por zona o por ubicación con pistola o móvil, el sistema compara con el stock teórico y regulariza las diferencias con una entrada o una salida, avisando si el recuento deja stock por debajo de lo reservado para pedidos. Al terminar sale un informe imprimible de diferencias.

## Siguiente paso

Saca las ventas de los últimos doce meses por referencia, valóralas a coste y córtalas en A, B y C. Divide los recuentos entre los días laborables y ya tienes tu cifra diaria. Para ver cómo se cuenta y se regulariza por zonas, mira el [control de stock e inventario](/software-control-stock) de Drenpos o el resumen del [software de gestión de almacén](/software-gestion-almacen).
