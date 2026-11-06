---
title: "Remesas SEPA para pymes: mandato, FRST y RCUR, fecha de cobro y fichero XML"
meta_title: "Remesas SEPA en una pyme: mandato, FRST/RCUR y XML"
description: "Cobrar facturas por domiciliación con remesas SEPA: el mandato, primer cobro y recurrente, fecha de cobro, qué impide cobrar una factura y el XML del banco."
date: 2026-11-06
updated: 2026-11-06
image: "/images/blog/enviar-facturas-por-whatsapp-automaticamente/cover.jpg"
author:
  name: "Alonso Bermejo Pérez"
  designation: "CEO & Founder"
  avatar: "/images/alonso.jpg"
categories: ["Facturación", "Gestión Empresarial", "Automatización pymes"]
tags:
  [
    "remesas SEPA",
    "adeudo directo SEPA",
    "mandato SEPA",
    "FRST RCUR",
    "domiciliación bancaria",
    "fichero XML banco",
    "programa de facturación",
    "cobros recurrentes",
  ]
featured: false
draft: false
hero:
  title: "Cobrar por domiciliación sin preparar la remesa a mano"
  description: "Qué es el mandato y quién lo guarda, cuándo un cobro es FRST o RCUR, cómo se elige la fecha, por qué una factura no entra en la remesa y cómo se sube el XML al banco."
faq:
  - question: "¿Qué es una remesa SEPA?"
    answer: "Un fichero que agrupa varios cobros por domiciliación para presentarlos al banco de una vez. Cada cobro es un adeudo directo a la cuenta de un cliente que ha firmado un mandato. El fichero va en formato XML y se sube a la banca online; el banco reparte los cargos en la fecha indicada."
  - question: "¿Qué es el mandato SEPA y quién lo guarda?"
    answer: "Es la autorización firmada por el cliente para que le cargues en su cuenta. Lleva una referencia única, tus datos y tu identificador de acreedor, el IBAN del cliente y la fecha de firma. Lo guarda la empresa que cobra, no el banco, y lo necesita para defenderse si el cliente reclama un cargo."
  - question: "¿Qué significan FRST y RCUR?"
    answer: "Son tipos de secuencia del adeudo. FRST es el primer cobro de un mandato recurrente y RCUR los siguientes. Existen también OOFF, para un cobro único, y FNAL, para el último. El tipo se decide por el historial de cada mandato, no por la factura."
  - question: "¿Por qué una factura no entra en la remesa?"
    answer: "Porque le falta algo para poder cobrarse: el cliente no tiene IBAN, no tiene mandato, el mandato ha caducado o la cuenta de tu empresa no tiene identificador de acreedor. Hasta que se arregla, el banco no aceptaría ese cobro, así que lo sensato es no meterlo."
  - question: "¿Cuánto tiempo tiene el cliente para devolver un recibo?"
    answer: "Hasta 8 semanas desde el cargo por cualquier motivo, y hasta 13 meses si el cargo no estaba autorizado, según la ficha de adeudos directos SEPA publicada en sepaesp.es. En el segundo caso, el acreedor puede oponerse aportando copia del mandato vigente."
  - question: "¿Qué plan de Drenpos incluye las remesas SEPA?"
    answer: "Todos. Las remesas SEPA van en el módulo Financiero, que tienen todos los planes. El más pequeño, Facturación, cuesta [[n:facturacion]] euros al mes sin IVA con facturas Verifactu, cobros y pagos, remesas SEPA y exportación a A3."
---

> Para cobrar facturas por domiciliación con una remesa SEPA hacen falta tres cosas: el IBAN del cliente, un mandato firmado y vigente, y el identificador de acreedor de tu empresa. Con eso se seleccionan las facturas pendientes, se elige la fecha de cobro y se genera el fichero XML que se sube al banco. El primer cobro de cada mandato va como FRST y los siguientes como RCUR.

<div class="my-8 flex justify-center">
  <a href="/software-verifactu" class="inline-flex rounded-full px-6 py-3 font-semibold text-white" style="background: var(--bg-menu-lig);">
    Ver la facturación de Drenpos
  </a>
</div>

Una distribuidora que cobra a 80 clientes por domiciliación a fin de mes no puede permitirse preparar la remesa a mano. Un IBAN mal copiado o un mandato que nadie firmó se convierten en devoluciones con comisión, y en una llamada incómoda al cliente.

## ¿Qué es una remesa SEPA y cuándo compensa?

Es un fichero que agrupa varios cobros por domiciliación para presentarlos al banco de una vez. Cada cobro es un adeudo directo a la cuenta de un cliente que ha firmado un mandato. Compensa cuando cobras cada mes a los mismos clientes: suministros, cuotas, servicios o distribución con pago a fin de mes.

| Forma de cobro | Quién mueve el dinero | Riesgo de impago | Trabajo al mes |
| --- | --- | --- | --- |
| Transferencia del cliente | El cliente, cuando se acuerda | Alto: depende de él | Perseguir pagos y casarlos |
| Tarjeta o datáfono | El cliente, en el momento | Bajo | Ninguno, pero solo en venta presencial |
| Adeudo directo SEPA | Tú, en la fecha que eliges | Medio: puede devolverlo | Generar y subir la remesa |

## ¿Qué es el mandato y qué debe llevar?

Es la autorización firmada por el cliente para que le cargues en su cuenta. Lleva una referencia única, tu nombre y tu identificador de acreedor, el IBAN del cliente, el tipo de pago (recurrente o único) y la fecha de firma. Lo guarda tu empresa, no el banco, y lo enseñas si el cliente niega haber autorizado un cargo.

Tres reglas prácticas:

- **Una referencia por mandato y por cliente.** Si cambia el IBAN, conviene firmar uno nuevo.
- **Guárdalo firmado.** Escaneado o firmado en digital, pero localizable.
- **Un mandato que no se usa caduca.** Según las [reglas de gestión de mandatos](https://www.aib.ie/content/dam/frontdoor/business/docs/products/payments/mandate-management-rules.pdf) que publican los bancos (consultadas el 06/11/2026), un mandato sin cobros durante 36 meses deja de valer y hay que firmar otro.

En Drenpos la cuenta bancaria para SEPA y el modo de pago por defecto van en la ficha del cliente, así que sus facturas salen ya marcadas para domiciliar.

## ¿Qué significan FRST, RCUR, OOFF y FNAL?

Son los tipos de secuencia del adeudo. FRST es el primer cobro de un mandato recurrente, RCUR los siguientes, OOFF un cobro único y FNAL el último de una serie. El tipo lo marca el historial del mandato: si con ese mandato ya se ha cobrado, el siguiente es recurrente. No depende de la factura ni del importe.

| Código | Significado | Cuándo se usa |
| --- | --- | --- |
| FRST | Primer adeudo | El primer cobro de un mandato recurrente |
| RCUR | Recurrente | Los cobros siguientes con el mismo mandato |
| OOFF | Único | Un mandato para un solo cobro |
| FNAL | Último | El cobro que cierra la serie |

Los cuatro códigos vienen de la [ficha de adeudos directos SEPA](https://www.sepaesp.es/f/websepa/secciones/Instrumentos/FICHA_DE_ADEUDOS_DIRECTOS_SEPA.pdf) de la banca española (consultada el 06/11/2026). En Drenpos no se eligen a mano: el programa decide FRST o RCUR por el historial de cada mandato, que es donde suelen venir los rechazos cuando se hace en una hoja de cálculo.

## ¿Qué impide cobrar una factura por SEPA?

Cuatro cosas, casi siempre: el cliente no tiene IBAN, no tiene mandato, su mandato ha caducado o la cuenta de tu empresa no tiene identificador de acreedor. Con cualquiera de ellas el banco rechazaría el cobro. Lo útil es que el programa lo diga antes de generar el fichero, no que lo descubras con la devolución.

| Motivo | Qué falta | Cómo se arregla |
| --- | --- | --- |
| Falta IBAN | La cuenta del cliente | Pedirla y ponerla en su ficha |
| Falta mandato | La autorización firmada | Mandar el mandato y registrarlo |
| Mandato caducado | Un mandato vigente | Firmar uno nuevo |
| Cuenta sin ID de acreedor | El identificador que te da tu banco | Pedirlo al banco y ponerlo en la cuenta de la empresa |

En Drenpos, la pantalla de remesas tiene una columna «Para cobrar» que dice, factura a factura, si está lista o por qué no, con un enlace para arreglarlo. «Seleccionar todo lo listo» monta la remesa de un toque con las que se pueden cobrar.

## ¿Cómo se elige la fecha de cobro?

Se pone la fecha en la que quieres que el banco cargue a los clientes, y el fichero se presenta con antelación suficiente. Lo habitual es cobrar a fin de mes o en la fecha pactada con cada cliente. El plazo mínimo de presentación lo marca tu banco: pregúntale cuántos días antes tienes que subir el fichero.

Avisa al cliente del cargo antes de pasarlo, con el importe y la fecha. Un recibo que el cliente no espera es un recibo que se devuelve.

## ¿Cuánto tiempo tiene el cliente para devolver un recibo?

Hasta 8 semanas desde el cargo por cualquier motivo, y hasta 13 meses si el cargo no estaba autorizado, según la misma ficha de adeudos directos SEPA. En ese segundo caso, la empresa puede oponerse a la devolución aportando copia del mandato vigente. Por eso el mandato firmado vale dinero.

## ¿Cómo se genera el fichero XML y se sube al banco?

Se seleccionan las facturas listas, se elige la fecha de cobro y el programa genera el XML con todos los adeudos. Ese fichero se sube en la banca online de tu empresa, en el apartado de adeudos o remesas. El banco lo valida, carga a cada cliente en la fecha y te abona el total.

En Drenpos el paso a paso es este:

1. Abrir remesas SEPA y filtrar las facturas pendientes del mes.
2. Revisar la columna «Para cobrar» y arreglar lo que no esté listo.
3. «Seleccionar todo lo listo» y elegir la fecha de cobro.
4. Generar el XML y subirlo al banco.

Cada remesa guarda sus facturas a la vista y descargables, las columnas se configuran y se pasa de una remesa a otra con flechas. Así, cuando un cliente pregunta qué se le cobró el día 30, está a dos clics.

## ¿Qué hace el programa y qué sigue haciendo el banco?

El programa prepara el cobro: sabe qué facturas están pendientes, a qué cliente, con qué mandato y como primer cobro o recurrente, y genera el fichero. El banco lo ejecuta: valida el XML, carga a los clientes, abona el importe y avisa de las devoluciones. Drenpos no se conecta con tu banco: el fichero lo subes tú.

Después del cobro, las facturas van a la contabilidad. Si tu gestoría trabaja con A3, lo tienes en [exportar facturas a A3](/blog/exportar-facturas-a3-suenlace). Y si a esos mismos clientes les mandas la factura cada mes, puedes hacerlo [por WhatsApp de forma automática](/blog/enviar-facturas-por-whatsapp-automaticamente).

## Preguntas frecuentes sobre remesas SEPA

### ¿Qué es una remesa SEPA?

Un fichero que agrupa varios cobros por domiciliación para presentarlos al banco de una vez. Cada cobro es un adeudo directo a la cuenta de un cliente que ha firmado un mandato. El fichero va en formato XML y se sube a la banca online; el banco reparte los cargos en la fecha indicada.

### ¿Qué es el mandato SEPA y quién lo guarda?

Es la autorización firmada por el cliente para que le cargues en su cuenta. Lleva una referencia única, tus datos y tu identificador de acreedor, el IBAN del cliente y la fecha de firma. Lo guarda la empresa que cobra, no el banco, y lo necesita para defenderse si el cliente reclama un cargo.

### ¿Qué significan FRST y RCUR?

Son tipos de secuencia del adeudo. FRST es el primer cobro de un mandato recurrente y RCUR los siguientes. Existen también OOFF, para un cobro único, y FNAL, para el último. El tipo se decide por el historial de cada mandato, no por la factura.

### ¿Por qué una factura no entra en la remesa?

Porque le falta algo para poder cobrarse: el cliente no tiene IBAN, no tiene mandato, el mandato ha caducado o la cuenta de tu empresa no tiene identificador de acreedor. Hasta que se arregla, el banco no aceptaría ese cobro, así que lo sensato es no meterlo.

### ¿Cuánto tiempo tiene el cliente para devolver un recibo?

Hasta 8 semanas desde el cargo por cualquier motivo, y hasta 13 meses si el cargo no estaba autorizado, según la ficha de adeudos directos SEPA publicada en sepaesp.es. En el segundo caso, el acreedor puede oponerse aportando copia del mandato vigente.

### ¿Qué plan de Drenpos incluye las remesas SEPA?

Todos. Las remesas SEPA van en el módulo Financiero, que tienen todos los planes. El más pequeño, Facturación, cuesta [[n:facturacion]] euros al mes sin IVA con facturas Verifactu, cobros y pagos, remesas SEPA y exportación a A3.

## Siguiente paso

Haz una lista de los clientes que te pagan cada mes y comprueba cuáles tienen IBAN y mandato firmado. Los que no, son los que hoy te cuestan llamadas. Mira cómo se factura en Drenpos en la página de [facturación Verifactu](/software-verifactu) y los [planes y precios](/pricing).
