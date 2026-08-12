---
title: "Preparación de pedidos y picking en almacén: guía práctica"
meta_title: "Preparación de pedidos: picking y expedición"
description: "Qué es la preparación de pedidos, en qué se diferencia del picking y la expedición, qué métodos existen y cómo reducir errores en el almacén paso a paso."
date: 2026-08-12
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
    "picking por oleadas",
    "expedición",
    "software de almacén",
  ]
featured: false
draft: false
hero:
  title: "Preparación de pedidos sin errores ni vueltas de más"
  description: "Del pedido confirmado al camión cargado, con trazabilidad."
faq:
  - question: "¿Qué diferencia hay entre picking y preparación de pedidos?"
    answer: "El picking es la fase de recogida: ir a la ubicación y coger las unidades del artículo. La preparación de pedidos es el proceso completo: decidir qué pedidos entran, recoger, agrupar por pedido, verificar y dejar la mercancía lista e identificada. El picking es una parte de la preparación, igual que la expedición es el paso siguiente, cuando la mercancía sale con su albarán o factura."
  - question: "¿Cuál es el mejor método de picking para una pyme?"
    answer: "Depende del perfil de pedido. Con pocos pedidos y muchas líneas cada uno, el picking por pedido es suficiente y no complica nada. Con muchos pedidos pequeños y referencias repetidas, las oleadas con pick-to-box ahorran recorridos porque se recoge una sola vez por artículo. Lo habitual es combinar: pedido a pedido para lo urgente y oleadas para el grueso diario."
  - question: "¿Cómo se reducen los errores de picking en un almacén?"
    answer: "Con cuatro medidas concretas: ubicaciones identificadas con etiqueta escaneable, ruta guiada para que nadie decida el recorrido sobre la marcha, confirmación por escaneo de producto y lote en vez de listas en papel, y una verificación de control antes de cargar. Cuando cada línea se confirma escaneando, el error deja de detectarse en casa del cliente y se detecta en el muelle."
  - question: "¿Qué es el picking por oleadas o pick-to-box?"
    answer: "Una oleada agrupa varios pedidos en una sola ruta por el almacén. El operario recoge de una vez todas las unidades que necesitan esos pedidos y las va repartiendo en cajas o bultos, uno por pedido: eso es pick-to-box. Se ahorran recorridos y desplazamientos repetidos a la misma estantería, a cambio de exigir más disciplina en el reparto."
  - question: "¿Se puede preparar un pedido directamente sobre un palet?"
    answer: "Sí, y es lo razonable cuando el pedido sale entero en palet. En Drenpos el pedido se prepara sobre el palet con su etiqueta SSCC del estándar GS1, de modo que al expedir sale la unidad logística completa con su trazabilidad. El palet admite varios productos y varios lotes, y su contenido queda registrado línea a línea."
  - question: "¿Qué necesito para empezar a preparar pedidos con Drenpos?"
    answer: "Ubicaciones creadas con su QR pegado en la estantería, artículos con almacén y ubicación por defecto, y un móvil o una pistola lectora por preparador. Con eso ya funciona el semáforo de preparabilidad, la etiqueta QR por pedido y el asistente de picking. El módulo de Inventario cuesta 16,45 €/mes sin IVA sobre el plan contratado."
---

> La preparación de pedidos es el proceso que va desde que un pedido de venta se confirma hasta que la mercancía queda lista para salir: seleccionar los artículos, recogerlos de sus ubicaciones, agruparlos por pedido y verificarlos. El picking es solo la fase de recogida dentro de ese proceso, y la expedición es la salida física con su albarán o factura. Cuando estas tres fases se digitalizan, los errores se detectan en el muelle y no en casa del cliente.

<div class="my-8 flex justify-center">
  <a href="/contact" class="inline-flex rounded-full px-6 py-3 font-semibold text-white" style="background: var(--bg-menu-lig);">
    Ver la preparación de pedidos de Drenpos
  </a>
</div>

## ¿Qué es la preparación de pedidos en un almacén?

La preparación de pedidos es el conjunto de tareas que convierten un pedido de venta en mercancía lista para salir. Incluye decidir qué pedidos se lanzan, recoger los artículos de sus ubicaciones, agruparlos por pedido, verificar lo preparado y dejarlo identificado en una zona concreta. Es el punto donde se juega la mayor parte de la calidad de servicio de un almacén.

Por eso la preparación no se arregla corriendo más, sino quitando decisiones al operario. Antes de nada, conviene tener el almacén ordenado por zonas: lo explicamos en la guía para [organizar un almacén de pyme](/blog/como-organizar-almacen-pyme).

## ¿Picking, preparación y expedición son lo mismo?

No son lo mismo, aunque se usen como sinónimos. La preparación de pedidos es el proceso completo. El picking es la fase de recogida física de las unidades. La expedición es la salida: cargar, documentar y entregar la mercancía al transportista o al cliente. Confundirlas hace que se compren soluciones para una fase y se deje el problema en otra.

![Operario escaneando la ubicación de un producto con pistola lectora](/images/blog/preparacion-de-pedidos-picking-almacen/section-1.jpg)

| Fase | Qué ocurre | Documento que genera |
| --- | --- | --- |
| Preparación | Se lanza el pedido, se recoge, se agrupa y se verifica | Sesión de picking, lista de picking |
| Picking | Recogida física de cada línea en su ubicación | Confirmación de línea con lote y ubicación |
| Expedición | Carga, salida y entrega de la mercancía | Albarán o factura, etiqueta de envío |

## ¿Qué métodos de picking existen y cuándo usarlos?

Los métodos de picking son formas de organizar el recorrido y el reparto. Los más habituales son picking por pedido, por lotes o batch, por oleadas, por zonas y pick-to-box. Ninguno es mejor en abstracto: dependen del número de pedidos, de las líneas por pedido y del tamaño del almacén. Muchos almacenes acaban combinando dos de ellos según el momento del día.

| Método | Cuándo usarlo | Ventaja principal | Cuándo NO usarlo |
| --- | --- | --- | --- |
| Por pedido | Pocos pedidos con muchas líneas | Simplicidad total, cero reparto posterior | Muchos pedidos pequeños: multiplica recorridos |
| Por lotes (batch) | Referencias que se repiten en muchos pedidos | Se recoge una vez por artículo | Pedidos muy distintos entre sí |
| Por oleadas (wave) | Salidas agrupadas por hora de transporte o ruta | Ordena el día por cortes de salida | Flujo continuo sin horarios de corte |
| Por zonas | Almacén grande con familias muy separadas | Cada operario domina su zona | Equipos pequeños: obliga a consolidar |
| Pick-to-box | Oleada de pedidos pequeños y homogéneos | Se prepara y se reparte en el mismo paso | Pedidos voluminosos o de palet completo |

## ¿Qué es el picking por oleadas y a quién sirve?

El picking por oleadas consiste en lanzar varios pedidos a la vez en una única ruta consolidada por el almacén. El operario recoge de golpe todas las unidades necesarias y las va repartiendo en un bulto por pedido, lo que se conoce como pick-to-box. Encaja cuando hay muchos pedidos pequeños que comparten referencias y hay una hora de corte para el transporte.

![Comparación de rutas de picking sobre la planta de un almacén: cuatro vueltas preparando pedido a pedido frente a una sola vuelta con picking por oleadas](/images/blog/preparacion-de-pedidos-picking-almacen/figura-1.png)

En Drenpos la oleada se lanza desde el listado de preparación seleccionando los pedidos que interesan. El asistente construye una sola ruta y va indicando en qué caja va cada unidad.

## ¿Cuáles son los 7 errores de picking que más cuestan?

Los errores caros de la preparación de pedidos no son de destreza, son de organización: nadie sabe qué pedido es servible, la información va en papel y no queda rastro de quién hizo qué. Estos siete se repiten en casi todos los almacenes que digitalizan por primera vez, y todos tienen la misma raíz: decisiones que se toman de memoria en mitad del pasillo.

| Error | Qué provoca | Cómo se corta |
| --- | --- | --- |
| Recorridos sin ruta definida | Vueltas, tiempo perdido, líneas olvidadas | Ruta guiada por ubicación |
| Lista de picking en papel | Confirmaciones a boli, líneas sin marcar | Confirmación por escaneo en móvil |
| No saber si un pedido es servible | Preparaciones que se abortan a medias | Semáforo de preparabilidad |
| No verificar antes de cargar | El error se descubre en el cliente | Recuento de control configurable |
| No saber quién preparó qué | Nadie puede revisar ni formar | Preparador y receptor por sesión |
| No trazar el lote servido | Recall imposible de acotar | Lote confirmado línea a línea |
| Preparados sin sitio identificado | Pedidos que se cargan dos veces o ninguna | Zona de preparados con QR por balda |

## ¿Cómo saber qué pedidos se pueden servir completos?

Con un semáforo de preparabilidad: una vista que cruza el pedido con el stock disponible y con lo que viene de camino. Drenpos muestra en el listado de preparación qué pedidos se pueden servir completos con el stock actual, cuáles tienen faltas y qué unidades están pendientes de llegar en pedidos de compra. Así se decide qué lanzar antes de que nadie coja un carro.

![Semáforo de preparabilidad de pedidos: servible completo, con faltas pero con mercancía de camino, y con faltas sin cobertura de compra](/images/blog/preparacion-de-pedidos-picking-almacen/figura-2.png)

La clave está en distinguir stock físico de stock disponible. Drenpos reserva el stock al confirmar el pedido, y el disponible es el físico menos lo comprometido.

Los traslados, las salidas manuales y los inventarios respetan esas reservas y avisan si una operación deja el stock por debajo de lo comprometido. Es el mismo principio que aplicamos para [evitar roturas de stock](/blog/control-de-stock-sin-roturas).

## ¿Cómo funciona la preparación de pedidos en Drenpos?

En Drenpos la preparación es un flujo pensado para móvil y pistola, no una pantalla de oficina. Cada pedido tiene su etiqueta QR: al escanearla se abre o se crea la sesión de picking. A partir de ahí, el asistente guía línea a línea con producto, ubicación y lote sugerido, y permite anotar incidencias sin salir del proceso. Todo queda asociado al preparador.

1. **Se revisa el listado** de preparación con el semáforo y se eligen los pedidos del turno.
2. **Se imprime la hoja de etiquetas QR** de esos pedidos, o se lanza una oleada con varios a la vez.
3. **Se escanea el QR del pedido** y se abre la sesión de picking en el móvil.
4. **Se recorre la ruta** confirmando cada línea: producto, ubicación y lote sugerido por FIFO, LIFO o FEFO.
5. **Se anotan las incidencias por línea** (falta, rotura, cantidad distinta) sin interrumpir la sesión.
6. **Se aparca el pedido preparado** en una balda de la zona de preparados y se escanea su QR.
7. **Se verifica** con el recuento de control si esa configuración está activada.
8. **Se expide escaneando** el pedido preparado, lo que genera el albarán o la factura.

Para pedidos que salen enteros en palet, la preparación se hace directamente sobre el palet con su etiqueta SSCC del estándar GS1-128. Al expedir sale la unidad logística completa, con su contenido y su trazabilidad. Es la operativa habitual en un [almacén frigorífico](/software-almacen-frigorifico), donde el palet es la unidad de trabajo real.

## ¿Cómo se expide la mercancía sin papeleo manual?

La expedición se resuelve escaneando el pedido preparado: Drenpos genera automáticamente el albarán o la factura, con la trazabilidad documental completa desde el pedido de venta. Antes de ese paso se puede exigir una verificación de control configurable, un recuento que confirma lo preparado. Desde la misma pantalla se imprimen la lista de picking y la etiqueta de envío.

![Zona de preparados con pedidos listos para expedir en el muelle de carga](/images/blog/preparacion-de-pedidos-picking-almacen/section-2.jpg)

Las reservas de stock se consumen solas al servir, incluso en servicios parciales, y el lote servido queda registrado.

Cuando aparece una alerta sanitaria, esa traza es lo que permite responder. El informe de trazabilidad muestra de qué proveedor entró cada lote, a qué clientes salió y cuánto queda vivo, y genera un PDF listo para presentar. Es una exigencia directa del Reglamento (CE) 178/2002 para cualquier empresa alimentaria.

## ¿Qué pasa con los pedidos que no tienen stock?

Los pedidos con faltas no se quedan en un limbo: quedan marcados en el semáforo y su demanda alimenta las compras. Drenpos cruza la demanda pendiente de los pedidos de venta con el stock físico y avisa de cuántas unidades faltan por comprar para servir todo, con notificación y widget en el dashboard. La propuesta de compra asistida sugiere qué pedir y a quién.

También hay un atajo para lo urgente: el cross-docking. Si al recibir mercancía hay pedidos de venta esperando ese producto, la línea de recepción lo avisa para que salga directo sin pasar por estantería.

## ¿Cómo montar un flujo de preparación en 9 pasos?

Digitalizar la preparación de pedidos no empieza por el software, empieza por el almacén físico. Sin ubicaciones identificadas y artículos con su sitio asignado, cualquier asistente de picking se queda a medias. Estos nueve pasos son el orden que funciona en implantaciones reales de pymes, del papel al escaneo, sin parar la operativa ni un día.

1. **Divide el almacén en zonas y ubicaciones** con una lógica de recorrido, no de aparcamiento oportunista.
2. **Imprime el QR de cada ubicación** y pégalo en la estantería, a la altura de la vista.
3. **Asigna a cada artículo su almacén y ubicación por defecto** para que los documentos se rellenen solos.
4. **Activa lotes o números de serie** solo en los artículos que de verdad lo necesitan.
5. **Configura el método de salida** (FIFO, LIFO o FEFO) según lo que vendas.
6. **Activa las reservas de stock** al confirmar pedido, para separar físico de disponible.
7. **Define la zona de preparados** con baldas etiquetadas con QR y una regla de uso clara.
8. **Decide si exiges verificación** antes de expedir: al principio sí, siempre.
9. **Asigna preparadores y permisos por rol** (mozo, responsable, supervisor) y mide con la sesión, no de oído.

Si el almacén también atiende mostrador o tienda, conviene revisar cómo conviven ambos flujos sobre el mismo stock en [software de almacén y tienda](/software-almacen-tienda).

## ¿Cuánto cuesta digitalizar la preparación de pedidos?

La preparación de pedidos forma parte del módulo de Inventario de Drenpos, que cuesta 16,45 €/mes sin IVA sobre el plan contratado. Los planes base son Esencial por 19 €/mes, Pro por 29 €/mes y Full por 39 €/mes, todos sin IVA. En ese precio entran el picking, la recepción contra pedido, los palets con SSCC, la trazabilidad y las actualizaciones, sin coste por versión.

El resto de módulos y planes están detallados en la página de [precios](/pricing), sin funciones básicas de pago aparte.

## Preguntas frecuentes sobre la preparación de pedidos

### ¿Qué diferencia hay entre picking y preparación de pedidos?

El picking es la fase de recogida: ir a la ubicación y coger las unidades del artículo. La preparación de pedidos es el proceso completo: decidir qué pedidos entran, recoger, agrupar por pedido, verificar y dejar la mercancía lista e identificada. El picking es una parte de la preparación, igual que la expedición es el paso siguiente, cuando la mercancía sale con su albarán o factura.

### ¿Cuál es el mejor método de picking para una pyme?

Depende del perfil de pedido. Con pocos pedidos y muchas líneas cada uno, el picking por pedido es suficiente y no complica nada. Con muchos pedidos pequeños y referencias repetidas, las oleadas con pick-to-box ahorran recorridos porque se recoge una sola vez por artículo. Lo habitual es combinar: pedido a pedido para lo urgente y oleadas para el grueso diario.

### ¿Cómo se reducen los errores de picking en un almacén?

Con cuatro medidas concretas: ubicaciones identificadas con etiqueta escaneable, ruta guiada para que nadie decida el recorrido sobre la marcha, confirmación por escaneo de producto y lote en vez de listas en papel, y una verificación de control antes de cargar. Cuando cada línea se confirma escaneando, el error deja de detectarse en casa del cliente y se detecta en el muelle.

### ¿Qué es el picking por oleadas o pick-to-box?

Una oleada agrupa varios pedidos en una sola ruta por el almacén. El operario recoge de una vez todas las unidades que necesitan esos pedidos y las va repartiendo en cajas o bultos, uno por pedido: eso es pick-to-box. Se ahorran recorridos y desplazamientos repetidos a la misma estantería, a cambio de exigir más disciplina en el reparto.

### ¿Se puede preparar un pedido directamente sobre un palet?

Sí, y es lo razonable cuando el pedido sale entero en palet. En Drenpos el pedido se prepara sobre el palet con su etiqueta SSCC del estándar GS1, de modo que al expedir sale la unidad logística completa con su trazabilidad. El palet admite varios productos y varios lotes, y su contenido queda registrado línea a línea.

### ¿Qué necesito para empezar a preparar pedidos con Drenpos?

Ubicaciones creadas con su QR pegado en la estantería, artículos con almacén y ubicación por defecto, y un móvil o una pistola lectora por preparador. Con eso ya funciona el semáforo de preparabilidad, la etiqueta QR por pedido y el asistente de picking. El módulo de Inventario cuesta 16,45 €/mes sin IVA sobre el plan contratado.

## ¿Por dónde se empieza mañana mismo?

La preparación de pedidos deja de ser un cuello de botella cuando el sistema decide la ruta, el lote y el sitio donde se aparca lo preparado. El operario ejecuta y confirma escaneando; el almacén gana trazabilidad sin pedirle a nadie que rellene nada a mano. Se empieza por lo barato: ubicaciones con QR y semáforo de preparabilidad.

Puedes ver cómo funciona todo el proceso en el [software de preparación de pedidos y picking](/software-preparacion-pedidos-picking) de Drenpos, o revisar el módulo completo de [gestión de almacén](/software-gestion-almacen).
