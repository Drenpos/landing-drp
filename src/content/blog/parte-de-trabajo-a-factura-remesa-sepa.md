---
title: "Del parte de trabajo a la factura y la remesa SEPA: cobrar los servicios domiciliados"
meta_title: "Del parte de trabajo a la factura y la remesa SEPA"
description: "Cómo pasar los partes terminados a albarán, juntar varios en una factura y cobrar por remesa SEPA: mandatos, FRST y RCUR, fecha de cobro y facturas no listas."
date: 2026-11-06
updated: 2026-11-06
image: "/images/blog/enviar-facturas-por-whatsapp-automaticamente/section-1.jpg"
author:
  name: "Alonso Bermejo Pérez"
  designation: "CEO & Founder"
  avatar: "/images/alonso.jpg"
categories: ["Servicios", "Gestión Empresarial", "Automatización pymes"]
tags:
  [
    "remesa SEPA",
    "parte de trabajo a factura",
    "facturar partes de trabajo",
    "adeudo directo SEPA",
    "mandato SEPA",
    "FRST RCUR",
    "software SAT",
    "empresa de limpieza facturación",
  ]
featured: false
draft: false
hero:
  title: "Del parte terminado al cobro domiciliado"
  description: "Albaranar lo pendiente, facturar con varios albaranes y montar la remesa SEPA sin recibos devueltos: mandatos, primer cobro o recurrente, fecha de cobro y por qué una factura no entra."
faq:
  - question: "¿Hay que hacer un albarán por cada parte de trabajo?"
    answer: "No hace falta. Lo práctico es juntar en un albarán por cliente todo lo terminado y pendiente de un periodo, por ejemplo el mes. En Drenpos la pestaña «Por albaranar» lo hace de una vez para todos los clientes, y luego una factura puede recoger uno o varios albaranes con «Copiar de»."
  - question: "¿Qué es un mandato SEPA y quién lo guarda?"
    answer: "Es la autorización firmada por el cliente para que le cargues recibos en su cuenta. Lleva una referencia única, la fecha de firma y los datos de las dos partes. Lo guarda la empresa que cobra, no el banco, y tiene que poder enseñarlo si el cliente discute un cargo."
  - question: "¿Qué diferencia hay entre FRST y RCUR en una remesa?"
    answer: "FRST marca el primer cobro de un mandato y RCUR los siguientes cobros con ese mismo mandato. En Drenpos no lo eliges tú: el sistema lo decide por el mandato de cada cliente, según si ya se ha cobrado antes con él o no."
  - question: "¿Por qué una factura no entra en la remesa?"
    answer: "Porque le falta algo para poder cobrarse por domiciliación: el IBAN del cliente, el mandato, un mandato vigente o el identificador de acreedor en la cuenta de tu empresa. En Drenpos la columna «Para cobrar» dice el motivo de cada factura y enlaza a donde se arregla."
  - question: "¿Cuánto tiempo tiene el cliente para devolver un recibo domiciliado?"
    answer: "Ocho semanas desde el cargo para pedir la devolución de un adeudo que autorizó, sin tener que justificarla, y hasta trece meses si el cargo no estaba autorizado, según el Real Decreto-ley 19/2018 de servicios de pago. Por eso conviene tener el mandato firmado y localizable."
  - question: "¿Sale la factura sola cuando el operario termina el trabajo?"
    answer: "En Drenpos no. Lo terminado pasa a «Por albaranar» y alguien de la oficina genera los albaranes y después la factura con «Copiar de». Es a propósito: así se revisan horas y material antes de cobrar, y la factura sale en modalidad Verifactu."
---

> Para cobrar por remesa SEPA los trabajos de un mes, primero se pasan a albarán todos los partes terminados, uno por cliente; después se hace la factura con esos albaranes y, por último, se genera el fichero de la remesa con las facturas domiciliadas que tienen IBAN, mandato vigente e identificador de acreedor. Si falta algo, esa factura se queda fuera.

<div class="my-8 flex justify-center">
  <a href="/software-partes-trabajo-sat" class="inline-flex rounded-full px-6 py-3 font-semibold text-white" style="background: var(--bg-menu-lig);">
    Ver el software de partes de trabajo y SAT
  </a>
</div>

Este artículo empieza donde termina el trabajo del operario. Cómo se recoge el parte en el móvil, con fotos y material, está en [cómo dejar el parte en papel en una empresa de limpieza](/blog/app-partes-de-trabajo-empresa-limpieza). Aquí va lo que hace la oficina después: albaranar, facturar y cobrar.

## ¿Cómo se pasa lo terminado a albarán?

Se juntan todos los partes terminados y pendientes de un periodo y se hace un albarán por cliente. En Drenpos la pestaña «Por albaranar» de Órdenes de servicio enseña todo lo terminado que aún no está en un albarán y lo convierte de una vez, cliente por cliente, con sus horas, material y kilómetros.

Hay dos caminos y sirven para casos distintos:

| Camino | Cuándo usarlo | Qué hace |
| --- | --- | --- |
| Pestaña «Por albaranar» | Cierre de mes con muchos clientes | Albaranes de todos los clientes con trabajo pendiente, de una vez |
| Desde el albarán: «Copiar de › Órdenes de servicio» | Un cliente concreto o un trabajo suelto | Trae al albarán las órdenes que elijas de ese cliente |

Antes de albaranar conviene repasar dos cosas. El tipo de hora (normal, urgente, festivo) lo reparte la oficina, porque el operario no lo elige en el móvil. Y el material: si la empresa lo tiene activado, lo apuntado ya ha descontado stock; si no, solo sirve para cobrarlo.

## ¿Cómo se factura con varios albaranes?

Con una sola factura que recoge todos los albaranes del cliente en el periodo. En Drenpos se crea la factura y con «Copiar de» se eligen los albaranes y sus líneas pasan a la factura sin volver a teclearlas. La factura sale en modalidad Verifactu, con su huella y su QR.

Pongamos una empresa de mantenimiento con un cliente que tuvo cuatro revisiones y un aviso urgente en el mes:

| Documento | Contenido | Importe sin IVA |
| --- | --- | --- |
| Albarán semana 1 | Revisión: 2 h, filtro | 96 € |
| Albarán semana 2 | Revisión: 2 h | 80 € |
| Albarán semana 3 | Revisión: 2 h; aviso urgente: 1,5 h y desplazamiento | 185 € |
| Albarán semana 4 | Revisión: 2 h | 80 € |
| **Factura del mes** | **Copiar de los cuatro albaranes** | **441 €** |

Los importes son de ejemplo. Si en vez de albaranar cada semana se albarana a fin de mes con «Por albaranar», sale un solo albarán por cliente y la factura es aún más directa.

Para cuotas fijas que no dependen de partes, como una limpieza mensual a precio cerrado, Drenpos permite programar la factura para que se repita cada mes. Lo que hay en el parte solo se añade si hubo algo extra. Lo de Verifactu en cada factura está explicado en [facturación Verifactu](/software-verifactu).

## ¿Qué necesita una factura para cobrarse por remesa SEPA?

Cuatro cosas: que el cliente pague por domiciliación, que tenga IBAN en su ficha, que haya firmado un mandato SEPA vigente y que la cuenta bancaria de tu empresa tenga el identificador de acreedor. Si falta cualquiera, el banco rechazará el recibo o no lo podrás presentar, y es mejor saberlo antes de generar el fichero.

### El mandato

El mandato es la autorización firmada por el cliente para que le cargues recibos en su cuenta. Lleva una referencia única, la fecha de firma y los datos de los dos. Lo guarda la empresa que cobra, no el banco, y es lo que enseñas si el cliente discute un cargo.

Un mandato que pasa 36 meses sin usarse caduca según las reglas del esquema SEPA del European Payments Council. Con un cliente que vuelve tras tres años sin servicio, hay que firmar uno nuevo.

### El identificador de acreedor

Es el código que identifica a tu empresa como emisora de adeudos. En España se construye a partir del NIF y se tramita con tu banco. Va en la cuenta bancaria de la empresa desde la que cobras, una sola vez.

### Lo que puede hacer el cliente después

El cliente puede pedir la devolución de un adeudo que autorizó durante ocho semanas desde el cargo, sin justificarla, y hasta trece meses si el cargo no estaba autorizado. Lo recoge el [Real Decreto-ley 19/2018 de servicios de pago](https://www.boe.es/buscar/act.php?id=BOE-A-2018-16036) (consultado el 06/11/2026). Con el mandato firmado y el parte con fotos, la discusión se resuelve rápido.

## ¿Qué son FRST y RCUR y quién los decide?

FRST marca el primer cobro que se hace con un mandato y RCUR los cobros siguientes con ese mismo mandato. Es un dato que va en el fichero de la remesa, recibo a recibo. En Drenpos no se elige a mano: el sistema lo decide por el mandato de cada cliente, según si ya se ha cobrado con él o no.

| Situación del cliente | Tipo de cobro | Qué hace Drenpos |
| --- | --- | --- |
| Primer recibo con un mandato recién firmado | FRST | Lo marca solo como primer cobro |
| Cliente que ya pagó por domiciliación con ese mandato | RCUR | Lo marca como recurrente |
| Mandato nuevo tras cambiar de cuenta | FRST | Vuelve a empezar con el mandato nuevo |
| Mandato caducado | No entra | Avisa en «Para cobrar» para firmar otro |

## ¿Cómo se elige la fecha de cobro?

La fecha de cobro es el día en que el banco carga el recibo al cliente, y se elige al montar la remesa. Lo habitual es fijarla con unos días de margen sobre la fecha de la factura, para que el cliente la reciba antes del cargo, y que caiga cuando tu tesorería lo necesita.

Tres cosas que conviene saber:

- **Aviso previo.** Las reglas SEPA piden avisar al cliente del importe y la fecha 14 días antes, salvo que el contrato pacte otro plazo. Muchas empresas lo resuelven pactando un plazo corto y mandando la factura como aviso.
- **Plazo del banco.** Cada banco fija con cuánta antelación hay que subir el fichero respecto a la fecha de cobro. Pregúntaselo al tuyo una vez y ajusta tu calendario de cierre.
- **Remesas por fecha.** Si tienes clientes que pagan el día 5 y otros el 20, monta dos remesas, cada una con su fecha de cobro.

## ¿Por qué una factura no está lista para la remesa?

Porque le falta uno de los requisitos para cobrarse por domiciliación. En Drenpos la columna «Para cobrar» de la remesa dice, factura a factura, si está lista o por qué no: falta el IBAN, falta el mandato, el mandato ha caducado o la cuenta de la empresa no tiene identificador de acreedor. Cada motivo enlaza a donde se arregla.

| Motivo que enseña «Para cobrar» | Dónde se arregla | Prevención |
| --- | --- | --- |
| Falta IBAN | Ficha del cliente | Pedir el IBAN al dar de alta al cliente |
| Falta mandato | Ficha del cliente | Firmar el mandato con el contrato de servicio |
| Mandato caducado | Ficha del cliente: mandato nuevo | Revisar clientes que vuelven tras mucho tiempo |
| Cuenta de la empresa sin ID de acreedor | Cuentas bancarias de la empresa | Darlo de alta una vez al empezar a remesar |

Cuando todo está en orden, «Seleccionar todo lo listo» monta la remesa de un toque con las facturas que se pueden cobrar. Las demás se quedan fuera hasta que se arreglen, en vez de volver devueltas con comisión. El sistema genera el fichero XML para subirlo al banco, y cada remesa guarda sus facturas a la vista y descargables.

## ¿Cómo queda el cierre de mes de principio a fin?

Pongamos una empresa de limpieza con 8 operarias y 40 clientes, 35 de ellos domiciliados. El último día hábil la oficina albarana desde «Por albaranar», factura con «Copiar de», monta la remesa con lo listo y deja apuntados los clientes a los que les falta algo. Es trabajo de una mañana, no de varios días.

1. **Revisar Terminadas y Atrasadas:** que no quede nada sin cerrar del mes.
2. **«Por albaranar»:** 40 albaranes, uno por cliente.
3. **Facturas:** cada una con «Copiar de» su albarán, en modalidad Verifactu. Se pueden enviar por correo o por WhatsApp.
4. **Remesa:** «Seleccionar todo lo listo». Pongamos que salen 33 de 35; los dos que faltan son un IBAN sin dar y un mandato caducado.
5. **Fecha de cobro y fichero:** se elige la fecha, se descarga el XML y se sube al banco.
6. **Pendientes:** se arreglan los dos clientes y entran en la remesa siguiente o se cobran por otro medio.

Lo que no hace Drenpos: no factura solo al terminar el trabajo ni manda la remesa al banco por su cuenta. El fichero lo subes tú a la banca online. Si además tu equipo ficha en la misma app, lo legal del registro de jornada está en [control horario](/control-horario).

Si quieres ver este cierre con tus propios clientes, pide una demo desde [partes de trabajo y SAT](/software-partes-trabajo-sat).

## Preguntas frecuentes sobre cobrar partes de trabajo por remesa SEPA

### ¿Hay que hacer un albarán por cada parte de trabajo?

No hace falta. Lo práctico es juntar en un albarán por cliente todo lo terminado y pendiente de un periodo, por ejemplo el mes. En Drenpos la pestaña «Por albaranar» lo hace de una vez para todos los clientes, y luego una factura puede recoger uno o varios albaranes con «Copiar de».

### ¿Qué es un mandato SEPA y quién lo guarda?

Es la autorización firmada por el cliente para que le cargues recibos en su cuenta. Lleva una referencia única, la fecha de firma y los datos de las dos partes. Lo guarda la empresa que cobra, no el banco, y tiene que poder enseñarlo si el cliente discute un cargo.

### ¿Qué diferencia hay entre FRST y RCUR en una remesa?

FRST marca el primer cobro de un mandato y RCUR los siguientes cobros con ese mismo mandato. En Drenpos no lo eliges tú: el sistema lo decide por el mandato de cada cliente, según si ya se ha cobrado antes con él o no.

### ¿Por qué una factura no entra en la remesa?

Porque le falta algo para poder cobrarse por domiciliación: el IBAN del cliente, el mandato, un mandato vigente o el identificador de acreedor en la cuenta de tu empresa. En Drenpos la columna «Para cobrar» dice el motivo de cada factura y enlaza a donde se arregla.

### ¿Cuánto tiempo tiene el cliente para devolver un recibo domiciliado?

Ocho semanas desde el cargo para pedir la devolución de un adeudo que autorizó, sin tener que justificarla, y hasta trece meses si el cargo no estaba autorizado, según el Real Decreto-ley 19/2018 de servicios de pago. Por eso conviene tener el mandato firmado y localizable.

### ¿Sale la factura sola cuando el operario termina el trabajo?

En Drenpos no. Lo terminado pasa a «Por albaranar» y alguien de la oficina genera los albaranes y después la factura con «Copiar de». Es a propósito: así se revisan horas y material antes de cobrar, y la factura sale en modalidad Verifactu.
