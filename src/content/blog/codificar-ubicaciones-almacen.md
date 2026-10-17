---
title: "Cómo codificar las ubicaciones de un almacén: ejemplos de códigos, etiquetas y errores"
meta_title: "Cómo codificar ubicaciones de almacén: ejemplos reales"
description: "Cómo codificar las ubicaciones del almacén por zona, pasillo, estantería, altura y hueco: ejemplos de códigos, etiquetas, errores típicos y fija o caótica."
date: 2026-10-17
image: "/images/blog/preparacion-de-pedidos-picking-almacen/section-1.jpg"
author:
  name: "Alonso Bermejo Pérez"
  designation: "CEO & Founder"
  avatar: "/images/alonso.jpg"
categories: ["Gestión de Almacén", "Logística y 3PL", "Productividad"]
tags:
  [
    "codificar ubicaciones almacén",
    "ubicaciones de almacén",
    "código de ubicación",
    "etiquetas de ubicación",
    "ubicación fija o caótica",
    "pasillo estantería altura hueco",
    "sga para pymes",
  ]
featured: false
draft: false
hero:
  title: "Cómo codificar las ubicaciones de tu almacén"
  description: "El formato de código que funciona en una nave de pyme, un ejemplo completo con números, qué poner en cada etiqueta, los errores que obligan a reetiquetar y cuándo conviene ubicación fija o caótica."
faq:
  - question: "¿Qué formato de código de ubicación es el más recomendable?"
    answer: "Para una pyme funciona bien zona, pasillo, estantería, altura y hueco separados por guiones y con ceros a la izquierda, por ejemplo P-04-07-3-2. Se lee de lo general a lo concreto, se ordena bien en cualquier listado y permite añadir pasillos sin renumerar. Si tu almacén es pequeño puedes quitar la zona o el hueco, pero decide el formato una vez y úsalo en toda la nave."
  - question: "¿Las alturas se cuentan desde el suelo o desde arriba?"
    answer: "Desde el suelo. Así el nivel 1 (o el 0, si prefieres que el suelo sea cero) es siempre el mismo en todas las estanterías, aunque unas tengan cuatro alturas y otras seis. Si cuentas desde arriba, añadir un nivel a una estantería cambia el número de todos los demás y obliga a reetiquetar."
  - question: "¿Qué es mejor, ubicación fija o caótica?"
    answer: "Depende de la zona. La fija, donde cada artículo tiene su sitio, va mejor en la zona de picking de referencias que salen a diario porque el preparador ya sabe dónde ir. La caótica, donde la mercancía va al primer hueco libre, aprovecha mejor el espacio en la reserva de palets. La mayoría de pymes acaban con una mezcla de las dos, y la caótica solo funciona si cada movimiento se registra escaneando."
  - question: "¿Qué tiene que llevar una etiqueta de ubicación?"
    answer: "El código en texto grande, legible a dos o tres metros, y el mismo código en código de barras o QR para escanearlo. En racks de palets conviene una flecha que indique si la etiqueta corresponde al hueco de arriba o al de abajo, y un color por altura ayuda a no equivocarse de nivel. No pongas el nombre del producto: el producto cambia y la etiqueta se queda."
  - question: "¿Drenpos imprime las etiquetas de ubicación?"
    answer: "Sí. Cada ubicación tiene su QR imprimible para pegarlo en la estantería, y las ubicaciones se pueden cargar desde una plantilla de Excel. Si los nombres siguen el patrón de pasillo, estantería y altura, el asistente propone el orden de ruta y genera el plano del almacén a partir de ellos."
---

> Codificar las ubicaciones de un almacén es dar a cada hueco un código único que diga dónde está: zona, pasillo, estantería, altura y hueco, por ejemplo **P-04-07-3-2**. Con ese código y su etiqueta escaneable, cualquier persona encuentra la mercancía sin preguntar, el stock se registra donde está de verdad y el programa puede ordenar la ruta de preparación. Abajo tienes el formato, un ejemplo completo y los errores que obligan a reetiquetar.

<div class="my-8 flex justify-center">
  <a href="/software-gestion-almacen" class="inline-flex rounded-full px-6 py-3 font-semibold text-white" style="background: var(--bg-menu-lig);">
    Ver ubicaciones con QR en Drenpos
  </a>
</div>

## ¿Qué es la codificación de ubicaciones de un almacén?

Es el sistema de nombres que identifica cada hueco físico del almacén. Un buen código se lee de lo general a lo concreto (zona, pasillo, estantería, altura, hueco), es único, tiene siempre la misma longitud y no depende del producto que haya dentro. Sirve para tres cosas: que cualquiera encuentre la mercancía, que el stock del sistema diga dónde está cada unidad y que la preparación de pedidos siga un recorrido lógico.

Codificar es pasar a las estanterías lo que hoy solo sabe la persona que lleva más años en la nave. En la guía de [cómo organizar el almacén de una pyme](/blog/como-organizar-almacen-pyme) vimos el primer paso (pasillo, estantería, altura). Aquí bajamos al detalle: formato, etiquetas, errores y cómo encaja con la ubicación fija o caótica.

## ¿Qué niveles debe tener un código de ubicación?

Cinco como máximo: zona, pasillo, estantería (o módulo), altura y hueco. Cada nivel responde a una pregunta del operario según se acerca al sitio: a qué parte de la nave voy, por qué pasillo entro, delante de qué módulo me paro, a qué balda miro y qué posición de esa balda es. Si dos huecos pueden confundirse, falta un nivel. Si un nivel nunca cambia, sobra.

| Nivel | Formato | Ejemplo | Qué indica |
| --- | --- | --- | --- |
| Zona | 1 letra | P | Área de la nave: picking, reserva de palets, muelle, incidencias |
| Pasillo | 2 dígitos | 04 | La calle por la que se entra |
| Estantería o módulo | 2 dígitos | 07 | El tramo de estantería entre dos puntales |
| Altura | 1 dígito | 3 | La balda o el nivel del rack, contando desde el suelo |
| Hueco | 1 dígito | 2 | La posición dentro de esa balda, de izquierda a derecha |

El código completo queda así: **P-04-07-3-2**. Se lee «zona de picking, pasillo 4, módulo 7, tercera altura, segundo hueco».

En una nave de 300 m² con seis estanterías probablemente sobren la zona y el hueco: **04-07-3** basta. Decide el formato una vez; cambiarlo dentro de dos años es reetiquetar toda la nave.

## ¿Cómo se numeran pasillos, estanterías y alturas sin liarse?

Con cuatro reglas: ceros a la izquierda para que los listados se ordenen bien, alturas contadas desde el suelo, módulos numerados en el sentido en que se recorre el pasillo y nada de letras que se confundan con números. Parecen detalles, pero cada una evita un tipo de error que se repite a diario cuando el almacén ya está etiquetado y cambiarlo cuesta un fin de semana.

**Ceros a la izquierda.** Un programa ordena «P-1-10» antes que «P-1-2» porque compara texto. Con «P-01-10» y «P-01-02» el orden sale bien en pantalla, en los listados y en el Excel.

**Alturas desde el suelo.** El nivel 1 (o el 0, si prefieres que el suelo sea cero) es el mismo en todas las estanterías aunque unas tengan cuatro baldas y otras seis. Si cuentas desde arriba y un día añades una balda, cambian todos los números de esa estantería.

**Módulos en el sentido de la marcha.** Hay dos maneras habituales:

| Sistema | Cómo se numera | Cuándo conviene |
| --- | --- | --- |
| Pares e impares | Impares a la izquierda (01, 03, 05) y pares a la derecha (02, 04, 06) | Pasillos estrechos donde el preparador coge de los dos lados a la vez |
| Correlativo en serpentina | 01 a 10 por un lado y 11 a 20 de vuelta por el otro | Pasillos anchos o con carretilla, donde se recorre un lado y luego el otro |

**Sin letras ambiguas.** Evita la O (se confunde con el 0), la I (con el 1) y la Ñ.

## ¿Cómo queda la codificación de una nave real de 600 m²?

Pongamos un distribuidor de material eléctrico con 12 personas, unas 2.400 referencias y una nave de 600 m². Tiene una zona de estantería ligera para picking de cajas y unidades, dos pasillos de rack para palets de reserva, un muelle de recepción, una zona de expedición y un rincón para devoluciones e incidencias. Así queda su codificación:

| Zona | Letra | Estructura | Ejemplo | Huecos |
| --- | --- | --- | --- | --- |
| Picking en estantería ligera | P | 6 pasillos, 10 módulos, 5 alturas, 3 huecos | P-03-08-2-1 | 900 |
| Reserva en rack de palets | R | 2 pasillos, 12 módulos, 4 alturas, 2 palets por nivel | R-02-05-4-2 | 192 |
| Muelle de recepción | M | 6 posiciones en suelo | M-00-01-0-1 | 6 |
| Expedición y preparados | E | 8 baldas de pedidos preparados | E-00-01-1-1 | 8 |
| Incidencias y devoluciones | X | 1 estantería de 4 alturas | X-01-01-2-1 | 4 |
| **Total** | | | | **1.110** |

Fíjate en dos cosas. El muelle, la expedición y las incidencias también tienen código, porque lo que está ahí también es stock. Y en las zonas sin pasillo se rellena con 00 para que todos los códigos midan lo mismo.

## ¿Ubicación fija o caótica: cuál conviene a una pyme?

La ubicación fija asigna a cada artículo su hueco de siempre, y el preparador acaba yendo de memoria. La caótica mete la mercancía en el primer hueco libre que le cabe y aprovecha mucho mejor el espacio, pero solo funciona si cada entrada se registra escaneando el hueco. En una pyme lo normal es mezclar: fija en la zona de picking y caótica en la reserva de palets.

| Criterio | Ubicación fija | Ubicación caótica |
| --- | --- | --- |
| Aprovechamiento del espacio | Bajo: el hueco se reserva aunque esté medio vacío | Alto: cualquier hueco libre sirve |
| Dependencia del sistema | Baja: se puede trabajar de memoria | Total: sin registro, la mercancía se pierde |
| Formación de personal nuevo | Rápida para el picking | Necesita pistola o móvil desde el primer día |
| Cambios de surtido o temporada | Hay que recolocar | Se adapta solo |
| Dónde encaja | Picking de referencias A, recambios, tienda | Reserva de palets, frío, depósito de terceros |

Un ejemplo con números. El rack de reserva del caso anterior tiene 192 huecos de palet. Con ubicación fija y 140 referencias compradas por palet, cada una tiene su hueco reservado aunque pase medio mes vacío, y en los picos de compra no cabe todo. Con caótica, los 192 huecos admiten 192 palets de cualquier referencia. A cambio, nadie puede ir «a donde está siempre»: hay que mirar en la pistola dónde quedó cada palet.

La clasificación ABC te dice qué va a la fija: las referencias que más salen, a la altura de la mano y cerca de la expedición. Lo explicamos en el post de [inventario cíclico y método ABC](/blog/inventario-ciclico-almacen).

## ¿Qué debe llevar la etiqueta de ubicación?

El código en texto grande, legible a dos o tres metros, y el mismo código en código de barras o QR para escanearlo. Nada más. Ni nombre de producto ni descripción, porque el producto cambia y la etiqueta se queda. En racks de palets ayudan una flecha que indique si la etiqueta es del hueco de arriba o del de abajo y un color distinto por altura.

| Tipo de hueco | Dónde va la etiqueta | Formato práctico |
| --- | --- | --- |
| Balda de estantería ligera | Frontal de la balda, centrada bajo el hueco | Adhesiva o en perfil portaetiquetas, texto de 15 a 20 mm |
| Rack de palets, niveles bajos | Larguero, bajo el hueco, con flecha hacia arriba | Adhesiva o magnética, texto de 40 mm o más |
| Rack de palets, niveles altos | Larguero o cartel colgante legible desde el suelo | Etiqueta grande con flecha y color por nivel |
| Suelo (muelle, expedición) | Señal en el suelo o en la pared frente a la posición | Pintura o placa, con código de barras protegido |

Prueba la lectura con tu pistola antes de imprimir mil etiquetas: un QR pequeño a seis metros no se lee desde el suelo.

## ¿Qué errores de codificación salen caros?

Los que obligan a reetiquetar o a corregir el maestro de artículos: códigos que no se ordenan, nombres que dependen del producto, huecos sin código y numeraciones que se rompen al ampliar. Todos tienen arreglo, pero arreglarlo con el almacén funcionando cuesta muchas más horas que hacerlo bien desde el principio, antes de pegar la primera etiqueta en la estantería.

| Error | Qué pasa | Cómo evitarlo |
| --- | --- | --- |
| Códigos sin ceros a la izquierda | Los listados salen desordenados y la ruta de picking da saltos | Longitud fija en todos los niveles |
| Nombrar el hueco por el producto («TORNILLOS-1») | Cuando cambia el surtido, la etiqueta miente | El código dice dónde, nunca qué |
| Reutilizar un código al mover una estantería | El histórico de movimientos apunta a un sitio que ya no existe | Código nuevo para la estantería nueva; el viejo se da de baja |
| Dejar sin código muelle, expedición o incidencias | Mercancía que está en la nave pero no en el sistema | Toda zona donde pueda haber stock lleva código |
| Alturas contadas desde arriba | Añadir una balda cambia todos los números | Siempre desde el suelo |
| Más niveles de los necesarios | Códigos largos que se leen mal en voz alta | Quita el nivel que nunca cambia |
| Saltarse números «por si acaso» | Huecos fantasma en los listados | Numera lo que existe; si amplías, sigue la serie |

## ¿Cómo se pone en marcha la codificación sin parar el almacén?

En cinco pasos y, normalmente, en un fin de semana o en dos tardes: dibujar el plano, decidir el formato, crear la lista de ubicaciones en una hoja de cálculo, imprimir y pegar las etiquetas en el orden del recorrido y, por último, asignar el stock a cada hueco con un recuento por pasillos. El almacén puede seguir sirviendo mientras se hace, pasillo a pasillo.

1. **Plano en papel** con pasillos, módulos, alturas y zonas.
2. **Formato**: niveles y longitud de cada uno, con el plano delante.
3. **Lista de ubicaciones** en Excel, una fila por hueco, generada con fórmulas. Añade la capacidad si la conoces.
4. **Etiquetas** impresas en el orden del recorrido y pegadas pasillo a pasillo.
5. **Asignar el stock** contando cada pasillo. Ese recuento es tu primer inventario fiable.

Después, nada entra, sale o se mueve sin escanear el hueco. La [recepción de mercancía](/blog/recepcion-mercancia-almacen) es donde primero se nota.

## ¿Cómo trabaja Drenpos con los códigos de ubicación?

Cada almacén tiene sus ubicaciones y cada ubicación su QR imprimible para pegarlo en la estantería. Las ubicaciones se cargan desde una plantilla de Excel, cada artículo puede tener su ubicación por defecto y, si los nombres siguen el patrón de pasillo, estantería y altura, el asistente propone el orden de ruta y genera el plano del almacén a partir de ellos. Un código bien hecho se aprovecha dos veces.

- **Escanear y saber qué hay.** El QR de un hueco abre su contenido: artículo, lote, palet, lo reservado, lo disponible y lo que cabe en palets, peso y volumen.
- **Fija o caótica.** Para la zona fija, la ficha del artículo guarda su hueco y los documentos lo proponen. Para la caótica, el operario escanea el hueco libre al ubicar.
- **Orden de ruta y plano.** Picking, oleadas, recepción e inventarios siguen el recorrido que sale de los nombres. Más detalle en [preparación de pedidos y rutas de picking](/software-preparacion-pedidos-picking).
- **Si vienes de otro programa.** La consulta por escáner reconoce las etiquetas de otro ERP por el nombre de la ubicación: no hace falta reetiquetar para empezar.

Drenpos no decide por ti en qué hueco va cada palet según su rotación (lo que en un SGA grande se llama *slotting* automático). Para una pyme con personas y carretillas, la decisión la toma el mozo con el contenido del hueco en pantalla. Va en el módulo de Inventario, incluido en el plan Pro por 29 €/mes sin IVA.

## Preguntas frecuentes sobre la codificación de ubicaciones

### ¿Qué formato de código de ubicación es el más recomendable?

Para una pyme funciona bien zona, pasillo, estantería, altura y hueco separados por guiones y con ceros a la izquierda, por ejemplo P-04-07-3-2. Se lee de lo general a lo concreto, se ordena bien en cualquier listado y permite añadir pasillos sin renumerar. Si tu almacén es pequeño puedes quitar la zona o el hueco, pero decide el formato una vez y úsalo en toda la nave.

### ¿Las alturas se cuentan desde el suelo o desde arriba?

Desde el suelo. Así el nivel 1 (o el 0, si prefieres que el suelo sea cero) es siempre el mismo en todas las estanterías, aunque unas tengan cuatro alturas y otras seis. Si cuentas desde arriba, añadir un nivel a una estantería cambia el número de todos los demás y obliga a reetiquetar.

### ¿Qué es mejor, ubicación fija o caótica?

Depende de la zona. La fija, donde cada artículo tiene su sitio, va mejor en la zona de picking de referencias que salen a diario porque el preparador ya sabe dónde ir. La caótica, donde la mercancía va al primer hueco libre, aprovecha mejor el espacio en la reserva de palets. La mayoría de pymes acaban con una mezcla de las dos, y la caótica solo funciona si cada movimiento se registra escaneando.

### ¿Qué tiene que llevar una etiqueta de ubicación?

El código en texto grande, legible a dos o tres metros, y el mismo código en código de barras o QR para escanearlo. En racks de palets conviene una flecha que indique si la etiqueta corresponde al hueco de arriba o al de abajo, y un color por altura ayuda a no equivocarse de nivel. No pongas el nombre del producto: el producto cambia y la etiqueta se queda.

### ¿Drenpos imprime las etiquetas de ubicación?

Sí. Cada ubicación tiene su QR imprimible para pegarlo en la estantería, y las ubicaciones se pueden cargar desde una plantilla de Excel. Si los nombres siguen el patrón de pasillo, estantería y altura, el asistente propone el orden de ruta y genera el plano del almacén a partir de ellos.

## Siguiente paso

Coge el plano de tu nave (aunque sea a mano), cuenta pasillos, módulos y alturas y escribe el código de tres huecos al azar. Si los tres se entienden sin explicación, tienes formato. Mira cómo se trabaja después con ese código en el [software de gestión de almacén](/software-gestion-almacen) de Drenpos.
