---
title: "FIFO, FEFO y LIFO en el almacén: diferencias, cuál usar en tu sector y qué admite la contabilidad"
meta_title: "FIFO, FEFO y LIFO: diferencias y cuál usar en tu almacén"
description: "Diferencias entre FIFO, FEFO y LIFO, cuál usar en alimentación, farmacia o recambios, su relación con lotes y caducidad y por qué el PGC no admite LIFO."
date: 2026-10-17
image: "/images/blog/trazabilidad-alimentaria-lotes-recall/section-1.jpg"
author:
  name: "Alonso Bermejo Pérez"
  designation: "CEO & Founder"
  avatar: "/images/alonso.jpg"
categories: ["Gestión de Almacén", "Trazabilidad", "Cumplimiento Normativo"]
tags:
  [
    "fifo fefo lifo",
    "diferencia entre fifo y fefo",
    "método fefo almacén",
    "lifo plan general contable",
    "rotación de stock",
    "lotes y caducidad",
    "valoración de existencias",
  ]
featured: false
draft: false
hero:
  title: "FIFO, FEFO o LIFO: qué sale primero de tu almacén"
  description: "Qué significa cada método, por qué FEFO no es lo mismo que FIFO, cuál usar según el sector, cómo condiciona la estantería que eliges y la diferencia entre sacar la mercancía por un orden y valorarla en contabilidad."
faq:
  - question: "¿Qué diferencia hay entre FIFO y FEFO?"
    answer: "FIFO saca primero lo que entró antes; FEFO saca primero lo que caduca antes. Casi siempre coinciden, pero no cuando un proveedor te sirve un lote más viejo después de uno más nuevo. En ese caso FIFO dejaría caducar el lote que llegó más tarde. Por eso en alimentación y farmacia se trabaja por FEFO, y para hacerlo hay que registrar la caducidad de cada lote al recibirlo."
  - question: "¿Se puede usar LIFO en la contabilidad española?"
    answer: "No. La norma de registro y valoración 10ª del Plan General de Contabilidad establece el precio medio ponderado como método general y admite FIFO si la empresa lo prefiere. La resolución del ICAC de 14 de abril de 2015 lo dice expresamente: en el PGC en vigor solo se admiten esos dos métodos. LIFO sí se puede usar como orden físico de salida, pero no para valorar las existencias."
  - question: "¿Qué método debe usar una farmacia o un distribuidor de medicamentos?"
    answer: "FEFO. Las directrices europeas de 5 de noviembre de 2013 sobre prácticas correctas de distribución de medicamentos de uso humano piden que la rotación de existencias se haga de modo que el medicamento que primero caduque sea el primero que se expide, y que las excepciones queden documentadas."
  - question: "¿Qué método conviene en una tienda de recambios o una ferretería?"
    answer: "FIFO. La mayoría de piezas no caducan, pero envejecen: las gomas se resecan, las baterías pierden carga y los fabricantes cambian versiones. Sacar primero lo que entró antes evita que se queden piezas viejas al fondo del hueco. Si una pieza lleva fecha de fabricación, como un neumático, conviene usar esa fecha como referencia."
  - question: "¿El método de salida y el de valoración tienen que ser el mismo?"
    answer: "No. El orden físico en que sale la mercancía (por ejemplo, FEFO) y el método con el que se valora en contabilidad (precio medio ponderado o FIFO) son cosas distintas. Puedes sacar por FEFO y valorar a precio medio ponderado, que es lo más habitual en pymes."
  - question: "¿Drenpos aplica FEFO automáticamente?"
    answer: "Sí. En los artículos con lotes se configura el método de salida (FEFO, FIFO o LIFO) y el sistema propone el lote al añadir el artículo a un documento o durante el picking, respetando lo reservado. Además avisa los días que configures antes de que un lote caduque. El stock se valora a precio medio ponderado o a precio manual."
---

> **FIFO** saca primero lo que entró antes, **FEFO** saca primero lo que caduca antes y **LIFO** saca primero lo último que entró. En alimentación y farmacia se usa FEFO; en recambios, ferretería y textil, FIFO; LIFO solo tiene sentido en mercancía que no caduca y se apila, como los áridos. Ojo: una cosa es el orden físico de salida y otra la valoración contable, y en España el PGC solo admite precio medio ponderado y FIFO.

<div class="my-8 flex justify-center">
  <a href="/software-control-stock" class="inline-flex rounded-full px-6 py-3 font-semibold text-white" style="background: var(--bg-menu-lig);">
    Ver lotes y FEFO en Drenpos
  </a>
</div>

## ¿Qué son FIFO, FEFO y LIFO?

Son tres reglas para decidir qué unidad sale primero del almacén cuando hay varias partidas del mismo artículo. FIFO (*first in, first out*) saca lo que entró antes. FEFO (*first expired, first out*) saca lo que caduca antes. LIFO (*last in, first out*) saca lo último que entró. La regla se aplica al preparar cada pedido, y condiciona cómo se coloca la mercancía y qué datos hay que registrar al recibirla.

| Método | Qué sale primero | Dato que necesitas | Dónde encaja |
| --- | --- | --- | --- |
| FIFO | Lo que entró antes | Fecha de entrada de cada partida | Producto sin caducidad que envejece o cambia de versión |
| FEFO | Lo que caduca antes | Lote y fecha de caducidad | Alimentación, farmacia, cosmética con fecha |
| LIFO | Lo último que entró | Nada en especial | Mercancía que no caduca y se apila: áridos, leña, materiales a granel |

## ¿Por qué FEFO no es lo mismo que FIFO?

Porque la mercancía no siempre llega en orden de caducidad. Si un proveedor te sirve el lunes un lote que caduca en mayo y el viernes otro que caduca en abril, FIFO sacará primero el de mayo y el de abril se quedará atrás hasta caducar. FEFO mira la fecha de caducidad, no la de entrada. Casi siempre coinciden; cuando no, la diferencia se paga en merma.

Un ejemplo con números. Un distribuidor de lácteos recibe:

| Lote | Entrada | Caducidad | Unidades | Coste unitario |
| --- | --- | --- | --- | --- |
| A | 1 de marzo | 30 de junio | 400 | 3,40 € |
| B | 5 de marzo | 15 de mayo | 120 | 3,40 € |

Vende unas 5 unidades al día. Con FIFO saca primero el lote A: tarda unos 80 días en agotarlo y, cuando llega al B, ya ha pasado el 15 de mayo. Las 120 unidades del lote B caducan en la estantería: **408 € de merma**. Con FEFO saca primero el B, lo agota a finales de marzo y después vende el A antes de que llegue el 30 de junio.

El ejemplo no es raro. Pasa con devoluciones de clientes que vuelven al hueco, con proveedores que vacían stock antiguo y con mercancía que se queda olvidada al fondo de un palet. En un frigorífico, un palet olvidado al fondo de una calle es merma segura; lo contamos en [gestión de palets con FEFO y SSCC](/blog/gestion-palets-almacen-frigorifico-fefo-sscc).

## ¿Qué método conviene en cada sector?

Donde hay fecha de caducidad o de consumo preferente, FEFO. Donde el producto no caduca pero envejece, se deteriora o cambia de versión, FIFO. LIFO queda para mercancía a granel que no se deteriora y se amontona, donde sacar lo de abajo costaría más que lo que se gana. En casi todas las pymes conviven dos métodos según la familia de artículos.

| Sector | Método | Por qué |
| --- | --- | --- |
| Alimentación fresca y refrigerada | FEFO | Pasada la fecha de caducidad el alimento no se considera seguro |
| Congelados | FEFO | Fechas largas, pero el cliente compra por fecha y la cámara cuesta dinero |
| Bebidas y conservas | FEFO | Llevan consumo preferente y muchos clientes piden una fecha mínima al recibir |
| Farmacia y distribución de medicamentos | FEFO | Lo piden las directrices europeas de buenas prácticas de distribución |
| Cosmética y droguería | FEFO si hay fecha, FIFO si no | Los productos con fecha se tratan como alimentación |
| Recambios de automoción y ferretería | FIFO | Gomas, baterías y piezas con fecha de fabricación envejecen |
| Textil y calzado | FIFO | La temporada pasada pierde valor rápido |
| Áridos, leña, materiales a granel | LIFO | No caducan y se apilan: sale lo de arriba |

**Alimentación.** El [artículo 24 del Reglamento (UE) 1169/2011](https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32011R1169) dice que, después de su fecha de caducidad, el alimento no se considerará seguro. La de consumo preferente es distinta: indica calidad, no seguridad. En los dos casos, sacar por FEFO es lo que evita tirar producto.

**Farmacia.** Las [directrices de 5 de noviembre de 2013 sobre prácticas correctas de distribución de medicamentos](https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:52013XC1123(01)) piden que la rotación se haga de modo que el medicamento que primero caduque sea el primero que se expide, y que las excepciones queden documentadas.

**Recambios.** Una correa o un retén no caducan, pero tres años en una caja los resecan. FIFO evita que el cliente reciba la pieza que lleva más tiempo en el hueco.

## ¿Qué relación tienen FIFO y FEFO con los lotes y la caducidad?

FEFO es imposible sin lotes: hay que saber, para cada partida, cuál es su fecha de caducidad y dónde está. Eso se registra en la recepción, copiando el lote y la fecha de la etiqueta del producto. FIFO puede funcionar solo con la fecha de entrada, pero con lotes también ganas la trazabilidad para localizar una partida si hay que retirarla del mercado.

En alimentación, además, el artículo 18 del Reglamento (CE) 178/2002 obliga a saber de quién compraste cada producto y a qué empresas se lo suministraste. Con el lote registrado en cada entrada y cada salida, esa respuesta sale en minutos; lo explicamos en [trazabilidad alimentaria por lotes y retirada de producto](/blog/trazabilidad-alimentaria-lotes-recall).

El punto débil siempre es la entrada. Si en la [recepción de mercancía](/blog/recepcion-mercancia-almacen) no se anota el lote real (el de la etiqueta, no el del albarán), el sistema propondrá un lote que no es el que hay en el hueco y FEFO dejará de funcionar sin que nadie se dé cuenta.

## ¿Cómo condiciona la estantería el método de salida?

Mucho más de lo que parece. En una estantería convencional, con acceso directo a cada palet, puedes aplicar cualquier método. Pero en una compacta con una sola entrada (drive-in) o en un sistema push-back, el último palet que entra es el primero que sale: la propia estructura impone LIFO. Si vendes producto con caducidad, esos sistemas solo sirven con un lote por calle.

| Sistema de almacenaje | Método natural | Comentario |
| --- | --- | --- |
| Rack convencional (selectivo) | Cualquiera | Acceso directo a cada palet; el método lo pone el sistema de gestión |
| Compacta con una entrada (drive-in) | LIFO | Si hay caducidad, un solo lote por calle |
| Compacta de doble acceso (drive-through) | FIFO | Se carga por un lado y se saca por el otro |
| Dinámica por gravedad | FIFO | El palet o la caja avanzan por rodillos hacia la salida |
| Push-back | LIFO | El palet nuevo empuja al anterior hacia el fondo |
| Estantería de picking convencional | Cualquiera | Reponer por detrás o colocar lo nuevo al fondo |

En picking manual, la regla práctica es reponer siempre por detrás: lo nuevo al fondo del hueco y lo viejo delante. Parece obvio, pero con prisa es lo primero que se salta.

## ¿Se puede usar LIFO en la contabilidad española?

No. La [norma de registro y valoración 10ª del Plan General de Contabilidad](https://www.boe.es/buscar/act.php?id=BOE-A-2007-19884) establece el precio medio o coste medio ponderado como método general y admite FIFO si la empresa lo considera más conveniente. La [resolución del ICAC de 14 de abril de 2015](https://www.boe.es/buscar/act.php?id=BOE-A-2015-4394) lo deja claro: en el PGC en vigor solo se admiten esos dos métodos de valoración.

A fecha de 17 de octubre de 2026 sigue así. La norma internacional de referencia, la NIC 2, tampoco admite LIFO. Esto afecta a cómo se **valora** el stock en las cuentas, no a cómo se **saca** del almacén. Son dos decisiones distintas:

- **Orden físico de salida:** FEFO, FIFO o LIFO, según el producto y la estantería.
- **Método de valoración contable:** precio medio ponderado o FIFO, el que elijas, aplicado de forma uniforme.

Puedes sacar por FEFO y valorar a precio medio ponderado; es lo más habitual en pymes. Para ver cómo cambia el resultado según el método de valoración, un ejemplo: compras 100 unidades a 2,00 € y después 100 a 2,40 €, y vendes 120.

| Método de valoración | Coste de las 120 vendidas | Valor de las 80 que quedan | ¿Admitido en el PGC? |
| --- | --- | --- | --- |
| Precio medio ponderado (2,20 €) | 264 € | 176 € | Sí, método general |
| FIFO | 248 € | 192 € | Sí |
| LIFO | 280 € | 160 € | No |

Con precios al alza, LIFO da más coste y menos beneficio, y deja el stock valorado por debajo de lo que cuesta reponerlo. Por eso la normativa contable no lo acepta. Para cualquier duda sobre tu caso concreto, habla con tu asesoría.

## ¿Cómo aplica Drenpos FIFO, FEFO y LIFO?

En cada artículo con control de lotes se elige el método de salida: FEFO, FIFO o LIFO. Cuando ese artículo entra en un pedido, un albarán o una factura, el sistema propone de qué almacén, ubicación y lote sale según ese método, respetando lo ya reservado. Si después cambias la cantidad de la línea, la asignación se rehace sola sin deshacer lo que la estrategia había elegido primero.

Lo que lo completa:

- **En el picking**, el asistente móvil sugiere el lote según el método. Lo vemos en la [preparación de pedidos](/software-preparacion-pedidos-picking).
- **Alertas de caducidad** los días antes que configures, por artículo o en general, con almacén y ubicación.
- **Trazabilidad** de cualquier lote: de qué proveedor entró, a qué clientes salió y cuánto queda, con informe PDF.
- **Packs montables**: el pack nace con la caducidad del componente que antes caduca.
- **Valoración** a precio medio ponderado o a precio manual por artículo, compatible con el método general del PGC. El LIFO de Drenpos es un orden físico de salida, no un método de valoración.

Para almacenes de frío, donde FEFO pesa más que en ningún otro sitio, mira el [software para almacén frigorífico](/software-almacen-frigorifico). Lotes y métodos de salida van en el módulo de Inventario, incluido en el plan Pro por 29 €/mes sin IVA.

## Preguntas frecuentes sobre FIFO, FEFO y LIFO

### ¿Qué diferencia hay entre FIFO y FEFO?

FIFO saca primero lo que entró antes; FEFO saca primero lo que caduca antes. Casi siempre coinciden, pero no cuando un proveedor te sirve un lote más viejo después de uno más nuevo. En ese caso FIFO dejaría caducar el lote que llegó más tarde. Por eso en alimentación y farmacia se trabaja por FEFO, y para hacerlo hay que registrar la caducidad de cada lote al recibirlo.

### ¿Se puede usar LIFO en la contabilidad española?

No. La norma de registro y valoración 10ª del Plan General de Contabilidad establece el precio medio ponderado como método general y admite FIFO si la empresa lo prefiere. La resolución del ICAC de 14 de abril de 2015 lo dice expresamente: en el PGC en vigor solo se admiten esos dos métodos. LIFO sí se puede usar como orden físico de salida, pero no para valorar las existencias.

### ¿Qué método debe usar una farmacia o un distribuidor de medicamentos?

FEFO. Las directrices europeas de 5 de noviembre de 2013 sobre prácticas correctas de distribución de medicamentos de uso humano piden que la rotación de existencias se haga de modo que el medicamento que primero caduque sea el primero que se expide, y que las excepciones queden documentadas.

### ¿Qué método conviene en una tienda de recambios o una ferretería?

FIFO. La mayoría de piezas no caducan, pero envejecen: las gomas se resecan, las baterías pierden carga y los fabricantes cambian versiones. Sacar primero lo que entró antes evita que se queden piezas viejas al fondo del hueco. Si una pieza lleva fecha de fabricación, como un neumático, conviene usar esa fecha como referencia.

### ¿El método de salida y el de valoración tienen que ser el mismo?

No. El orden físico en que sale la mercancía (por ejemplo, FEFO) y el método con el que se valora en contabilidad (precio medio ponderado o FIFO) son cosas distintas. Puedes sacar por FEFO y valorar a precio medio ponderado, que es lo más habitual en pymes.

### ¿Drenpos aplica FEFO automáticamente?

Sí. En los artículos con lotes se configura el método de salida (FEFO, FIFO o LIFO) y el sistema propone el lote al añadir el artículo a un documento o durante el picking, respetando lo reservado. Además avisa los días que configures antes de que un lote caduque. El stock se valora a precio medio ponderado o a precio manual.

## Siguiente paso

Repasa tus familias de artículos y marca cuáles tienen caducidad (FEFO), cuáles envejecen (FIFO) y cuáles se apilan (LIFO). Luego mira si tu estantería permite el método que toca. Si quieres ver cómo se propone el lote solo, entra en el [control de stock con lotes y caducidad](/software-control-stock) de Drenpos.
