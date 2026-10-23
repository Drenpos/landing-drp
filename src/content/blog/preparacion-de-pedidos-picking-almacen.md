---
title: "Preparación de pedidos y picking: qué es, métodos y ruta en el almacén"
meta_title: "Preparación de pedidos y picking: métodos y ruta"
description: "Qué es la preparación de pedidos y el picking, cuándo usar picking por pedido, por lotes, por zonas o por oleadas y cómo ordenar la ruta con el plano."
date: 2026-08-12
updated: 2026-10-22
image: "/images/blog/preparacion-de-pedidos-picking-almacen/cover.jpg"
author:
  name: "Alonso Bermejo Pérez"
  designation: "CEO & Founder"
  avatar: "/images/alonso.jpg"
categories: ["Gestión de Almacén", "Logística y 3PL", "Productividad"]
tags:
  [
    "preparación de pedidos",
    "picking",
    "métodos de picking",
    "picking por oleadas",
    "ruta de picking",
    "plano de almacén",
    "expedición",
    "software de almacén",
  ]
featured: false
draft: false
hero:
  title: "Preparación de pedidos sin errores ni vueltas de más"
  description: "Qué es, qué método de picking encaja con tus pedidos y cómo se ordena la ruta para no volver sobre tus pasos."
faq:
  - question: "¿Qué es la preparación de pedidos?"
    answer: "Es el proceso que va desde que un pedido de venta se confirma hasta que la mercancía queda lista para salir: decidir qué pedidos se lanzan, recoger los artículos de sus ubicaciones, agruparlos por pedido, verificarlos y dejarlos identificados. El picking es la fase de recogida dentro de ese proceso y la expedición es el paso siguiente, cuando la mercancía sale con su albarán o factura."
  - question: "¿Qué diferencia hay entre picking y preparación de pedidos?"
    answer: "El picking es la fase de recogida: ir a la ubicación y coger las unidades del artículo. La preparación de pedidos es el proceso completo: decidir qué pedidos entran, recoger, agrupar por pedido, verificar y dejar la mercancía lista e identificada. El picking es una parte de la preparación, igual que la expedición es el paso siguiente."
  - question: "¿Cuál es el mejor método de picking para una pyme?"
    answer: "Depende del perfil de pedido. Con pocos pedidos y muchas líneas cada uno, el picking por pedido basta y no complica nada. Con muchos pedidos pequeños que repiten referencias, los lotes o las oleadas con pick-to-box ahorran recorridos porque se pasa una sola vez por cada estantería. Lo habitual es combinar: pedido a pedido para lo urgente y oleadas para el grueso del día."
  - question: "¿Qué es la ruta de picking?"
    answer: "Es el orden en que el preparador recorre las ubicaciones para recoger las líneas de uno o varios pedidos. Una ruta bien ordenada avanza en un sentido por los pasillos, sin volver atrás, y termina cerca del punto donde se deja la carga. Como andar es la parte que más tiempo se lleva en la preparación, ordenar la ruta es de las mejoras más baratas que hay."
  - question: "¿Drenpos calcula la ruta de picking?"
    answer: "Sí. En el módulo de Inventario se dibuja el plano del almacén (estanterías, paredes, inicio de ruta, punto de dejada de carga y escaleras) y el sistema calcula un orden fijo de recorrido de las ubicaciones. El asistente de picking y las oleadas presentan las líneas en ese orden. El operario no consulta ningún mapa: el asistente le dice a qué ubicación ir."
  - question: "¿Cómo se reducen los errores de picking en un almacén?"
    answer: "Con cuatro medidas: ubicaciones identificadas con etiqueta escaneable, una ruta fija para que nadie decida el recorrido sobre la marcha, confirmación por escaneo de producto y lote en vez de listas en papel, y una verificación de control antes de cargar. Cuando cada línea se confirma escaneando, el error se detecta en el muelle y no en casa del cliente."
  - question: "¿Qué es el picking por oleadas o pick-to-box?"
    answer: "Una oleada agrupa varios pedidos en una sola ruta por el almacén, normalmente alrededor de una hora de salida. El operario recoge de una vez las unidades que necesitan esos pedidos y las va repartiendo en cajas o bultos, uno por pedido: eso es pick-to-box. Se ahorran vueltas a la misma estantería a cambio de más disciplina en el reparto."
  - question: "¿Se puede preparar un pedido directamente sobre un palet?"
    answer: "Sí, y es lo razonable cuando el pedido sale entero en palet. En Drenpos el pedido se prepara sobre un palet con su etiqueta SSCC del estándar GS1, de modo que al expedir sale la unidad logística completa con su trazabilidad. El palet admite varios productos y varios lotes, y su contenido queda registrado línea a línea."
  - question: "¿Qué necesito para empezar a preparar pedidos con Drenpos?"
    answer: "Ubicaciones creadas con su QR pegado en la estantería, artículos con almacén y ubicación por defecto, el plano del almacén si quieres orden de ruta, y un móvil o una pistola lectora por preparador. El almacén va incluido en los planes Almacén ([[p:almacen]]/mes, [[p:almacen_tpv]] con TPV) y Producción ([[p:produccion]]/mes), siempre sin IVA."
---

> **Respuesta corta:** la preparación de pedidos es el proceso que convierte un pedido de venta confirmado en mercancía lista para salir: elegir qué pedidos se lanzan, recoger cada artículo en su ubicación, agruparlo por pedido, verificarlo y dejarlo identificado. El picking es solo la fase de recogida dentro de ese proceso, y la expedición es la salida física con su albarán o factura. Bien organizada, los errores se ven en el muelle y no en casa del cliente.

<div class="my-8 flex justify-center">
  <a href="/software-preparacion-pedidos-picking" class="inline-flex rounded-full px-6 py-3 font-semibold text-white" style="background: var(--bg-menu-lig);">
    Ver la preparación de pedidos de Drenpos
  </a>
</div>

## ¿Qué es la preparación de pedidos y qué es el picking?

La preparación de pedidos es el conjunto de tareas que van del pedido confirmado a la mercancía lista en el muelle: lanzar el pedido, recoger, agrupar, verificar e identificar. El picking es la recogida física de cada línea en su ubicación. La expedición es la salida: cargar, documentar y entregar al transportista. Se usan como sinónimos, pero confundirlos lleva a arreglar una fase y dejar el problema en otra.

Por eso la preparación no se arregla corriendo más, sino quitando decisiones al operario: qué pedido va primero, por dónde empieza y qué lote coge. Antes de nada conviene tener el almacén ordenado por zonas, como explicamos en la guía para [organizar un almacén de pyme](/blog/como-organizar-almacen-pyme).

![Operario escaneando la ubicación de un producto con pistola lectora](/images/blog/preparacion-de-pedidos-picking-almacen/section-1.jpg)

| Fase | Qué ocurre | Qué deja registrado |
| --- | --- | --- |
| Preparación | Se lanza el pedido, se recoge, se agrupa y se verifica | Sesión de picking, lista de picking |
| Picking | Recogida física de cada línea en su ubicación | Confirmación de línea con lote y ubicación |
| Expedición | Carga, salida y entrega de la mercancía | Albarán o factura, etiqueta de envío |

## ¿Qué métodos de picking existen y cuándo usar cada uno?

Hay cuatro métodos de base: por pedido, por lotes, por zonas y por oleadas. Se diferencian en cuántos pedidos recorre a la vez cada preparador y en si el almacén se reparte entre varias personas. Ninguno gana en abstracto: lo deciden el número de pedidos al día, las líneas por pedido, cuántas referencias se repiten entre pedidos y el tamaño de la nave. La mayoría de pymes acaba combinando dos.

| Método | Cómo funciona | Cuándo usarlo | Cuándo no usarlo |
| --- | --- | --- | --- |
| Por pedido (discreto) | Un preparador recorre el almacén para un solo pedido, de principio a fin | Pocos pedidos al día, pedidos grandes o urgentes, equipos de una o dos personas | Muchos pedidos pequeños: repites la misma vuelta una vez por pedido |
| Por lotes (batch) | Se agrupan varios pedidos, se recoge el total de cada artículo en una pasada y después se reparte | Muchos pedidos que comparten referencias y una mesa donde separar | Pedidos muy distintos entre sí o sin sitio para el reparto posterior |
| Por zonas | Cada preparador cubre una zona fija y solo recoge las líneas que caen en ella | Naves grandes o con zonas de condiciones distintas (seco, frío, congelado) | Almacenes pequeños: partir el pedido añade consolidación sin ganar nada |
| Por oleadas (wave) | Se lanzan tandas de pedidos agrupados por hora de salida, ruta o urgencia | Salidas con horario: la furgoneta de las 11 o la recogida de la agencia | Pedidos que entran todo el día y salen según llegan, sin cortes |

Pick-to-box no es un quinto método, sino una forma de repartir: se recoge directamente en la caja final de cada pedido, así que al terminar la vuelta el pedido ya está montado. Encaja con lotes y oleadas cuando los pedidos son de pocas líneas y volumen manejable.

Un ejemplo de combinación: un distribuidor de bebidas de 12 personas con 60 pedidos al día prepara pedido a pedido los cuatro o cinco grandes que salen en palet, y agrupa el resto en tres oleadas según la hora de cada furgoneta. Con un solo preparador y 15 pedidos diarios, el picking por pedido con una buena ruta suele ser suficiente.

## ¿Qué es el picking por oleadas y a quién sirve?

El picking por oleadas lanza varios pedidos a la vez en una única ruta por el almacén. El operario recoge de golpe todas las unidades necesarias y las va repartiendo en un bulto por pedido (pick-to-box). Encaja cuando hay muchos pedidos pequeños que comparten referencias y una hora de corte para el transporte. Si los pedidos llegan de uno en uno y salen al momento, no aporta.

![Comparación de rutas de picking sobre la planta de un almacén: cuatro vueltas preparando pedido a pedido frente a una sola vuelta con picking por oleadas](/images/blog/preparacion-de-pedidos-picking-almacen/figura-1.png)

En Drenpos la oleada se lanza desde el listado de preparación seleccionando los pedidos que interesan. El asistente construye una sola ruta, en el orden que sale del plano del almacén, y va indicando en qué caja va cada unidad.

## ¿Qué es la ruta de picking y por qué pesa tanto?

La ruta de picking es el orden en que el preparador recorre las ubicaciones para recoger las líneas de uno o varios pedidos. Pesa porque la preparación de pedidos puede suponer hasta el 55 % del gasto operativo de un almacén, y buena parte de ese tiempo se va andando. Una ruta que avanza en un sentido y no vuelve atrás recorta metros en cada pedido sin comprar nada.

El dato del 55 % es de la revisión de De Koster, Le-Duc y Roodbergen publicada en [European Journal of Operational Research (2007)](https://doi.org/10.1016/j.ejor.2006.07.009), la referencia más citada sobre preparación de pedidos. En la misma literatura se describen las estrategias de recorrido más comunes:

| Estrategia de ruta | Cómo se recorre | Cuándo encaja |
| --- | --- | --- |
| En S (serpentina) | Se entra en cada pasillo con algo que recoger y se sale por el otro extremo | Muchas líneas por pedido, pasillos estrechos |
| Retorno | Se entra en el pasillo, se recoge y se vuelve por el mismo lado | Pocas líneas, casi siempre cerca de la cabecera |
| Punto medio | Se recoge la mitad delantera de cada pasillo a la ida y la trasera a la vuelta | Naves con dos pasillos transversales |
| Ruta fija por orden de ubicación | Todas las ubicaciones tienen un número de orden y las líneas se presentan siempre en ese orden | Pymes: fácil de aprender y de mantener |

En la práctica, lo que cambia el día a día de una pyme es tener un orden fijo y que el sistema lo respete al presentar las líneas. El preparador se aprende el recorrido en una semana y quien entra nuevo lo sigue desde el primer día. Para eso las ubicaciones tienen que estar bien codificadas: lo contamos paso a paso en [cómo codificar las ubicaciones del almacén](/blog/codificar-ubicaciones-almacen).

## ¿Cómo se ordena la ruta de picking con el plano del almacén?

En Drenpos la ruta sale del plano. En el módulo de Inventario se dibuja el almacén con un editor visual: estanterías, paredes y puntos clave (inicio de ruta, punto de dejada de carga y escaleras), con varias plantas si la nave las tiene. A partir de ese plano el sistema calcula un orden fijo de recorrido de las ubicaciones, y el asistente de picking y las oleadas presentan las líneas en ese orden.

![Editor del plano de almacén de Drenpos con estanterías, paredes, punto de inicio de ruta y punto de carga dibujados sobre una planta](/images/funcionalidades/almacen-tienda/05-plano-almacen-editor.png)

1. **Dibujas el plano.** Arrastras y redimensionas estanterías, paredes y puntos clave. No hace falta reproducir la nave al detalle ni un delineante: se monta en un rato.
2. **Gestionas los huecos desde el plano.** Sobre cada estantería creas y consultas sus ubicaciones, igual que en el gestor de ubicaciones.
3. **El sistema calcula el orden de ruta.** Para el mismo almacén, el recorrido es siempre el mismo.
4. **El asistente y las oleadas siguen ese orden.** El operario no mira ningún mapa mientras prepara: el asistente le dice directamente a qué ubicación ir, avanza en un sentido y no vuelve sobre sus pasos.

Si cambias una estantería de sitio, la mueves en el plano. Tienes el funcionamiento completo en la sección de [ruta de picking](/software-preparacion-pedidos-picking#ruta-picking) del software de preparación de pedidos.

## ¿Cuáles son los 7 errores de picking que más cuestan?

Los errores caros de la preparación no son de destreza, son de organización: nadie sabe qué pedido es servible, la información va en papel y no queda rastro de quién hizo qué. Estos siete se repiten en casi todos los almacenes que digitalizan por primera vez, y todos tienen la misma raíz: decisiones que se toman de memoria en mitad del pasillo.

| Error | Qué provoca | Cómo se corta |
| --- | --- | --- |
| Recorridos sin ruta definida | Vueltas, tiempo perdido, líneas olvidadas | Orden de ruta fijo por ubicación |
| Lista de picking en papel | Confirmaciones a boli, líneas sin marcar | Confirmación por escaneo en móvil |
| No saber si un pedido es servible | Preparaciones que se abortan a medias | Semáforo de preparabilidad |
| No verificar antes de cargar | El error se descubre en el cliente | Recuento de control configurable |
| No saber quién preparó qué | Nadie puede revisar ni formar | Preparador y receptor por sesión |
| No trazar el lote servido | Recall imposible de acotar | Lote confirmado línea a línea |
| Preparados sin sitio identificado | Pedidos que se cargan dos veces o ninguna | Zona de preparados con QR por balda |

## ¿Cómo saber qué pedidos se pueden servir completos?

Con un semáforo de preparabilidad: una vista que cruza cada pedido con el stock disponible y con lo que viene de camino. Drenpos muestra en el listado de preparación qué pedidos se pueden servir completos con el stock actual, cuáles tienen faltas y qué unidades están pendientes de llegar en pedidos de compra. Así se decide qué lanzar antes de que nadie coja un carro.

![Semáforo de preparabilidad de pedidos: servible completo, con faltas pero con mercancía de camino, y con faltas sin cobertura de compra](/images/blog/preparacion-de-pedidos-picking-almacen/figura-2.png)

Lo que importa es distinguir stock físico de stock disponible. Drenpos reserva el stock al confirmar el pedido, y el disponible es el físico menos lo comprometido. Los traslados, las salidas manuales y los inventarios respetan esas reservas y avisan si una operación deja el stock por debajo de lo comprometido. Es el mismo principio que aplicamos para [evitar roturas de stock](/blog/control-de-stock-sin-roturas).

## ¿Cómo funciona la preparación de pedidos en Drenpos?

En Drenpos la preparación es un flujo pensado para móvil y pistola, no una pantalla de oficina. Cada pedido tiene su etiqueta QR: al escanearla se abre o se crea la sesión de picking. El asistente guía línea a línea, en el orden de ruta, con producto, ubicación y lote sugerido, y permite anotar incidencias sin salir del proceso. Todo queda asociado al preparador.

1. **Se revisa el listado** de preparación con el semáforo y se eligen los pedidos del turno.
2. **Se imprime la hoja de etiquetas QR** de esos pedidos, o se lanza una oleada con varios a la vez.
3. **Se escanea el QR del pedido** y se abre la sesión de picking en el móvil.
4. **Se recorre la ruta** confirmando cada línea: producto, ubicación y lote sugerido por FIFO, LIFO o FEFO.
5. **Se anotan las incidencias por línea** (falta, rotura, cantidad distinta) sin interrumpir la sesión.
6. **Se aparca el pedido preparado** en una balda de la zona de preparados y se escanea su QR.
7. **Se verifica** con el recuento de control si esa opción está activada.
8. **Se expide escaneando** el pedido preparado, lo que genera el albarán o la factura.

Para pedidos que salen enteros en palet, la preparación se hace directamente sobre el palet con su [etiqueta SSCC](/blog/etiqueta-sscc-gs1-palets) del estándar GS1. Al expedir sale la unidad logística completa, con su contenido y su trazabilidad. Es la operativa habitual en un [almacén frigorífico](/software-almacen-frigorifico), donde el palet es la unidad de trabajo real.

## ¿Cómo se expide la mercancía sin papeleo manual?

Escaneando el pedido preparado: Drenpos genera el albarán o la factura con la trazabilidad documental completa desde el pedido de venta. Antes se puede exigir una verificación configurable, un recuento que confirma lo preparado. Desde la misma pantalla se imprimen la lista de picking y la etiqueta de envío. Nadie vuelve a teclear las líneas del pedido en un documento de salida.

![Zona de preparados con pedidos listos para expedir en el muelle de carga](/images/blog/preparacion-de-pedidos-picking-almacen/section-2.jpg)

Las reservas de stock se consumen solas al servir, incluso en servicios parciales, y el lote servido queda registrado. Cuando llega una alerta sanitaria, esa traza es lo que permite responder: el informe de trazabilidad muestra de qué proveedor entró cada lote, a qué clientes salió y cuánto queda, y genera un PDF listo para presentar. La trazabilidad es una exigencia del artículo 18 del Reglamento (CE) 178/2002 para cualquier empresa alimentaria.

## ¿Qué pasa con los pedidos que no tienen stock?

Quedan marcados en el semáforo y su demanda alimenta las compras. Drenpos cruza la demanda pendiente de los pedidos de venta con el stock físico y avisa de cuántas unidades faltan por comprar para servirlo todo, con notificación y widget en el panel de inicio. La propuesta de compra asistida sugiere qué pedir y cuánto, y tú decides. Cómo fijar los mínimos lo explicamos en [stock mínimo y punto de pedido](/blog/stock-minimo-punto-de-pedido).

Para lo urgente hay un atajo: el cross-docking. Si al recibir mercancía hay pedidos de venta esperando ese producto, la línea de recepción lo avisa para que salga directo hacia preparación sin pasar por estantería. Qué comprobar en ese momento y cómo registrarlo está en la guía de [recepción de mercancía](/blog/recepcion-mercancia-almacen).

## ¿Cómo montar un flujo de preparación en 10 pasos?

Digitalizar la preparación no empieza por el software, empieza por el almacén físico. Sin ubicaciones identificadas y artículos con su sitio asignado, cualquier asistente de picking se queda a medias. Estos diez pasos son el orden que funciona en implantaciones de pymes, del papel al escaneo, sin parar la operativa ni un día.

1. **Divide el almacén en zonas y ubicaciones** con lógica de recorrido, no de aparcamiento oportunista. Te ayudará la guía para [codificar ubicaciones](/blog/codificar-ubicaciones-almacen).
2. **Imprime el QR de cada ubicación** y pégalo en la estantería, a la altura de la vista.
3. **Dibuja el plano del almacén** para que el sistema calcule el orden de ruta.
4. **Asigna a cada artículo su almacén y ubicación por defecto** para que los documentos se rellenen solos.
5. **Activa lotes o números de serie** solo en los artículos que de verdad lo necesitan.
6. **Configura el método de salida** (FIFO, LIFO o FEFO) según lo que vendas.
7. **Activa las reservas de stock** al confirmar pedido, para separar físico de disponible.
8. **Define la zona de preparados** con baldas etiquetadas con QR y una regla de uso clara.
9. **Decide si exiges verificación** antes de expedir: al principio, siempre.
10. **Asigna preparadores y permisos por rol** (mozo, responsable, supervisor) y mide con la sesión, no de oído.

Si el almacén también atiende mostrador o tienda, revisa cómo conviven los dos flujos sobre el mismo stock en [software de almacén y tienda](/software-almacen-tienda).

## ¿Cuánto cuesta digitalizar la preparación de pedidos?

En Drenpos la preparación de pedidos forma parte del módulo de Inventario, que va incluido en los planes Almacén ([[p:almacen]]/mes, [[n:almacen_usuarios]] usuarios; [[p:almacen_tpv]] con TPV) y Producción ([[p:produccion]]/mes). No se contrata suelto. Todos los precios son sin IVA, a fecha de 17 de octubre de 2026, e incluyen picking, plano y orden de ruta, recepción, palets con SSCC y actualizaciones.

El resto de módulos y planes están en la página de [precios](/pricing).

## Preguntas frecuentes sobre la preparación de pedidos

### ¿Qué es la preparación de pedidos?

Es el proceso que va desde que un pedido de venta se confirma hasta que la mercancía queda lista para salir: decidir qué pedidos se lanzan, recoger los artículos de sus ubicaciones, agruparlos por pedido, verificarlos y dejarlos identificados. El picking es la fase de recogida dentro de ese proceso y la expedición es el paso siguiente, cuando la mercancía sale con su albarán o factura.

### ¿Qué diferencia hay entre picking y preparación de pedidos?

El picking es la fase de recogida: ir a la ubicación y coger las unidades del artículo. La preparación de pedidos es el proceso completo: decidir qué pedidos entran, recoger, agrupar por pedido, verificar y dejar la mercancía lista e identificada. El picking es una parte de la preparación, igual que la expedición es el paso siguiente.

### ¿Cuál es el mejor método de picking para una pyme?

Depende del perfil de pedido. Con pocos pedidos y muchas líneas cada uno, el picking por pedido basta y no complica nada. Con muchos pedidos pequeños que repiten referencias, los lotes o las oleadas con pick-to-box ahorran recorridos porque se pasa una sola vez por cada estantería. Lo habitual es combinar: pedido a pedido para lo urgente y oleadas para el grueso del día.

### ¿Qué es la ruta de picking?

Es el orden en que el preparador recorre las ubicaciones para recoger las líneas de uno o varios pedidos. Una ruta bien ordenada avanza en un sentido por los pasillos, sin volver atrás, y termina cerca del punto donde se deja la carga. Como andar es la parte que más tiempo se lleva en la preparación, ordenar la ruta es de las mejoras más baratas que hay.

### ¿Drenpos calcula la ruta de picking?

Sí. En el módulo de Inventario se dibuja el plano del almacén (estanterías, paredes, inicio de ruta, punto de dejada de carga y escaleras) y el sistema calcula un orden fijo de recorrido de las ubicaciones. El asistente de picking y las oleadas presentan las líneas en ese orden. El operario no consulta ningún mapa: el asistente le dice a qué ubicación ir.

### ¿Cómo se reducen los errores de picking en un almacén?

Con cuatro medidas: ubicaciones identificadas con etiqueta escaneable, una ruta fija para que nadie decida el recorrido sobre la marcha, confirmación por escaneo de producto y lote en vez de listas en papel, y una verificación de control antes de cargar. Cuando cada línea se confirma escaneando, el error se detecta en el muelle y no en casa del cliente.

### ¿Qué es el picking por oleadas o pick-to-box?

Una oleada agrupa varios pedidos en una sola ruta por el almacén, normalmente alrededor de una hora de salida. El operario recoge de una vez las unidades que necesitan esos pedidos y las va repartiendo en cajas o bultos, uno por pedido: eso es pick-to-box. Se ahorran vueltas a la misma estantería a cambio de más disciplina en el reparto.

### ¿Se puede preparar un pedido directamente sobre un palet?

Sí, y es lo razonable cuando el pedido sale entero en palet. En Drenpos el pedido se prepara sobre un palet con su etiqueta SSCC del estándar GS1, de modo que al expedir sale la unidad logística completa con su trazabilidad. El palet admite varios productos y varios lotes, y su contenido queda registrado línea a línea.

### ¿Qué necesito para empezar a preparar pedidos con Drenpos?

Ubicaciones creadas con su QR pegado en la estantería, artículos con almacén y ubicación por defecto, el plano del almacén si quieres orden de ruta, y un móvil o una pistola lectora por preparador. El almacén va incluido en los planes Almacén ([[p:almacen]]/mes, [[p:almacen_tpv]] con TPV) y Producción ([[p:produccion]]/mes), siempre sin IVA.

## ¿Por dónde se empieza mañana mismo?

Por lo barato: ubicaciones con QR, un orden de ruta y un semáforo que diga qué pedidos se pueden servir. Con eso el operario ejecuta y confirma escaneando, y el almacén gana trazabilidad sin que nadie rellene nada a mano. Los métodos más elaborados (lotes, zonas, oleadas) se añaden cuando el volumen de pedidos lo pide.

Puedes ver el proceso completo en el [software de preparación de pedidos y picking](/software-preparacion-pedidos-picking) de Drenpos o revisar el módulo entero de [gestión de almacén](/software-gestion-almacen).
