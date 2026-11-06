---
title: "Exportar facturas a A3 con el fichero SUENLACE.DAT: guía para pymes y gestorías"
meta_title: "Exportar facturas a A3 con SUENLACE.DAT: paso a paso"
description: "Qué es el enlace contable SUENLACE.DAT de A3, formatos 4 y 5, qué facturas se exportan y cuáles no, y cómo mandarlas a la gestoría sin teclear asientos."
date: 2026-11-06
updated: 2026-11-06
image: "/images/blog/erp-para-pymes-vs-excel/cover.jpg"
author:
  name: "Alonso Bermejo Pérez"
  designation: "CEO & Founder"
  avatar: "/images/alonso.jpg"
categories: ["Facturación", "Gestión Empresarial", "Automatización pymes"]
tags:
  [
    "exportar facturas a A3",
    "SUENLACE.DAT",
    "enlace contable A3",
    "a3ASESOR",
    "a3innuva",
    "a3ERP",
    "gestoría",
    "contabilidad pyme",
  ]
featured: false
draft: false
hero:
  title: "Tus facturas en el A3 de la gestoría, sin teclear asientos"
  description: "Qué es el fichero SUENLACE.DAT, en qué se diferencian los formatos 4 y 5, qué exporta Drenpos y qué no, y el paso a paso del primer mes, contado para la empresa y para su asesor."
faq:
  - question: "¿Qué es el fichero SUENLACE.DAT?"
    answer: "Es el fichero de texto que usan los programas de contabilidad de A3 (a3ASESOR, a3ERP, a3innuva) para importar asientos desde otro programa. Cada factura va en registros con fecha, cuentas, bases, impuestos y totales en posiciones fijas. La gestoría lo importa desde el enlace contable y los asientos entran sin teclearlos."
  - question: "¿Qué diferencia hay entre el formato 4 y el formato 5 de A3?"
    answer: "El formato 5 añade los campos del SII (Suministro Inmediato de Información), como el tipo de factura y los datos que la AEAT pide en el libro registro. El 4 es el anterior y lo siguen usando instalaciones más antiguas. Drenpos genera los dos y propone el 5 por defecto; la gestoría dice cuál importa."
  - question: "¿Qué facturas exporta Drenpos a A3?"
    answer: "Emitidas, recibidas y rectificativas del periodo que elijas. Los tickets van en un resumen diario por serie, no uno a uno. Cada factura exportada queda marcada y por defecto solo salen las nuevas, así que repetir la exportación no duplica asientos. Las facturas que no cuadran no salen y se avisa."
  - question: "¿Exporta también cobros, pagos y vencimientos?"
    answer: "No. El fichero lleva solo facturas. Cobros y pagos, vencimientos, contabilidad analítica y modelo 190 se siguen llevando en A3. Tampoco admite importaciones con DUA, criterio de caja ni IGIC o IPSI, y solo exporta a A3, no a ContaSol ni a Sage."
  - question: "¿Qué tiene que configurar la empresa antes de exportar?"
    answer: "El código de la empresa en A3, los dígitos de las cuentas y las cuentas por defecto de ventas, compras, clientes, proveedores e impuestos. Lo normal es que la gestoría pase esos datos y se configuren una vez. Si hace falta, se ponen cuentas propias por impuesto, artículo, familia, cliente o proveedor."
  - question: "¿Cuánto cuesta la exportación a A3 en Drenpos?"
    answer: "Nada aparte: va incluida en el módulo Financiero, que está en todos los planes. El plan más pequeño, Facturación, cuesta [[n:facturacion]] euros al mes sin IVA con Verifactu, remesas SEPA y la exportación a A3."
---

> Para exportar las facturas a A3 se genera un fichero SUENLACE.DAT con las facturas emitidas, recibidas y rectificativas del periodo, y la gestoría lo importa en a3ASESOR, a3ERP o a3innuva desde el enlace contable. Los asientos entran sin teclearlos. En Drenpos se elige periodo y tipos, se revisa una vista previa con los errores de cada factura y se descarga el fichero en formato 4 o 5.

<div class="my-8 flex justify-center">
  <a href="/software-verifactu" class="inline-flex rounded-full px-6 py-3 font-semibold text-white" style="background: var(--bg-menu-lig);">
    Ver la facturación de Drenpos
  </a>
</div>

Drenpos no es un programa de contabilidad. Factura, lleva el almacén y la caja, y la contabilidad la sigue llevando la gestoría en su programa. Lo que cambia es cómo le llegan las facturas: en vez de un ZIP de PDF que alguien teclea, un fichero que A3 importa solo.

## ¿Qué es el enlace contable SUENLACE.DAT?

Es el fichero de texto con el que los programas de contabilidad de A3 importan asientos hechos en otro programa. Cada factura ocupa varios registros de longitud fija con la fecha, las cuentas, las bases, los tipos de IVA y el total. La gestoría lo carga desde el enlace contable y los asientos aparecen sin teclear ni una línea.

El nombre del fichero es siempre el mismo, SUENLACE.DAT, y lo leen las tres familias de A3 que usan las asesorías y las empresas:

| Programa | Quién lo usa | ¿Importa SUENLACE.DAT? |
| --- | --- | --- |
| a3ASESOR | Gestorías y asesorías | Sí |
| a3ERP | Empresas con su propio ERP de A3 | Sí |
| a3innuva | Contabilidad en la nube de A3 | Sí |

En a3ASESOR la importación está en Utilidades, Importar/Exportar, Enlace contable, según la guía de [CopilotGestoria](https://copilotgestoria.com/tutoriales/exportar-a-a3) consultada el 06/11/2026. La ruta exacta puede cambiar con la versión: tu gestoría la conoce.

## ¿Qué diferencia hay entre el formato 4 y el 5?

El formato 5 añade los campos del SII: el tipo de factura y los datos que la AEAT pide en los libros registro. El formato 4 es el anterior y algunas instalaciones antiguas solo leen ese. Para la empresa no cambia nada; para la gestoría, el 5 evita completar a mano datos del SII después de importar.

Drenpos genera los dos y propone el 5 por defecto. Antes de la primera exportación, pregunta a tu asesor cuál quiere: es una casilla.

## ¿Qué facturas exporta Drenpos y cuáles no?

Exporta facturas emitidas, recibidas y rectificativas, y los tickets en un resumen diario por serie. No exporta cobros ni pagos, vencimientos, analítica ni modelo 190. Tampoco admite importaciones con DUA, criterio de caja ni IGIC o IPSI. Una factura que no cuadra no sale: se avisa en la vista previa para corregirla.

| Qué | ¿Va en el fichero? | Notas |
| --- | --- | --- |
| Facturas emitidas | Sí | Una por una, con sus bases e impuestos |
| Facturas recibidas | Sí | Incluidas las que entran por OCR, una vez registradas |
| Rectificativas | Sí | De venta y de compra |
| Tickets del TPV | Sí, agrupados | Un resumen diario por serie |
| Cobros y pagos | No | Se siguen apuntando en A3 |
| Vencimientos | No | |
| Analítica y modelo 190 | No | |
| Importaciones con DUA | No | |
| Criterio de caja | No | |
| Canarias, Ceuta y Melilla (IGIC, IPSI) | No | |
| Otros programas (ContaSol, Sage) | No | Solo A3 |

Si tu empresa está en criterio de caja o en Canarias, hoy la exportación no te sirve. Lo decimos claro para que la gestoría no se lleve la sorpresa al importar.

## ¿Qué hay que configurar antes de la primera exportación?

El código de la empresa en A3, los dígitos de las cuentas y las cuentas por defecto de ventas, compras, clientes, proveedores e impuestos. Lo habitual es que la gestoría pase esos datos y se configuren una sola vez en la pestaña «Enlace contable». A partir de ahí, cada mes es elegir periodo y descargar.

Si la gestoría usa cuentas distintas según el caso, se ponen cuentas propias por impuesto, por artículo, por familia y por cliente o proveedor. Pongamos una tienda que quiere separar las ventas de ropa (700) de las de complementos (701): se asigna la cuenta a cada familia y cada factura reparte sus bases.

Esas cuentas solo se ven con la configuración avanzada activada. El usuario que factura no ve números de cuenta, y exportar al programa de contabilidad es un permiso propio que se da a quien toca.

## ¿Cómo se exporta paso a paso?

En cinco pasos que llevan un par de minutos al mes: abrir «Exportar a contabilidad», elegir periodo y tipos de factura, revisar la vista previa, corregir lo que salga en rojo y descargar el fichero. Cada factura exportada queda marcada, así que la siguiente vez solo salen las nuevas y no se duplica nada en A3.

1. **Periodo y tipos.** Por ejemplo, octubre completo: emitidas, recibidas y rectificativas.
2. **Vista previa.** Una línea por factura con su estado: lista, aviso o error. El caso típico de error es una factura descuadrada, que no sale hasta que se corrige.
3. **Corrección.** Se arregla en la factura o en la ficha y se vuelve a la vista previa.
4. **Formato.** El 5 por defecto, o el 4 si la gestoría lo pide.
5. **Descarga y envío.** Se descarga SUENLACE.DAT y se manda a la gestoría por el canal de siempre.

Si hace falta volver a sacar una factura ya exportada, se puede incluir a propósito. Por defecto no sale, para que nadie importe dos veces el mismo asiento.

## ¿Qué gana la gestoría y qué sigue haciendo ella?

Gana no teclear facturas. Con el fichero importa en un minuto lo que antes eran horas de picar bases e IVA, y con el formato 5 los datos del SII ya vienen puestos. Sigue haciendo lo de siempre: cuadrar bancos, apuntar cobros y pagos, revisar el IVA, cerrar el ejercicio y presentar impuestos.

Para la empresa el cambio es igual de simple. A primeros de mes descarga el fichero del mes anterior y lo manda. Si la gestoría prefiere los documentos, el reporte de gestoría sigue disponible: un ZIP con las facturas de compra, venta y rectificativas y un Excel resumen.

Otros programas de gestión también exportan a A3; Holded, por ejemplo, lo documenta en su [centro de ayuda](https://help.holded.com/en/articles/6907973-holded-s-export-to-a3) (consultado el 06/11/2026). Lo que conviene preguntar en cualquier caso es qué formato genera, si marca lo exportado y qué deja fuera. Si estás comparando, tienes [Drenpos frente a Holded](/blog/drenpos-vs-holded).

## ¿Encaja con Verifactu?

Sí, son cosas distintas que conviven. Verifactu afecta a cómo se emite cada factura: huella encadenada, QR y remisión a la AEAT. La exportación a A3 pasa esas mismas facturas a la contabilidad. La factura que sale con su QR es la misma que viaja en el fichero, con el mismo número y los mismos importes.

Lo que cambia con Verifactu y sus fechas lo tienes en la [guía de Verifactu para pymes](/blog/verifactu-pymes-guia-2026). Y si cobras a tus clientes por domiciliación, el paso anterior a la contabilidad es la remesa: lo explico en [remesas SEPA para pymes](/blog/remesas-sepa-cobros-domiciliados-pyme).

## Preguntas frecuentes sobre la exportación a A3

### ¿Qué es el fichero SUENLACE.DAT?

Es el fichero de texto que usan los programas de contabilidad de A3 (a3ASESOR, a3ERP, a3innuva) para importar asientos desde otro programa. Cada factura va en registros con fecha, cuentas, bases, impuestos y totales en posiciones fijas. La gestoría lo importa desde el enlace contable y los asientos entran sin teclearlos.

### ¿Qué diferencia hay entre el formato 4 y el formato 5 de A3?

El formato 5 añade los campos del SII (Suministro Inmediato de Información), como el tipo de factura y los datos que la AEAT pide en el libro registro. El 4 es el anterior y lo siguen usando instalaciones más antiguas. Drenpos genera los dos y propone el 5 por defecto; la gestoría dice cuál importa.

### ¿Qué facturas exporta Drenpos a A3?

Emitidas, recibidas y rectificativas del periodo que elijas. Los tickets van en un resumen diario por serie, no uno a uno. Cada factura exportada queda marcada y por defecto solo salen las nuevas, así que repetir la exportación no duplica asientos. Las facturas que no cuadran no salen y se avisa.

### ¿Exporta también cobros, pagos y vencimientos?

No. El fichero lleva solo facturas. Cobros y pagos, vencimientos, contabilidad analítica y modelo 190 se siguen llevando en A3. Tampoco admite importaciones con DUA, criterio de caja ni IGIC o IPSI, y solo exporta a A3, no a ContaSol ni a Sage.

### ¿Qué tiene que configurar la empresa antes de exportar?

El código de la empresa en A3, los dígitos de las cuentas y las cuentas por defecto de ventas, compras, clientes, proveedores e impuestos. Lo normal es que la gestoría pase esos datos y se configuren una vez. Si hace falta, se ponen cuentas propias por impuesto, artículo, familia, cliente o proveedor.

### ¿Cuánto cuesta la exportación a A3 en Drenpos?

Nada aparte: va incluida en el módulo Financiero, que está en todos los planes. El plan más pequeño, Facturación, cuesta [[n:facturacion]] euros al mes sin IVA con Verifactu, remesas SEPA y la exportación a A3.

## Siguiente paso

Pide a tu gestoría tres datos: el código de tu empresa en A3, cuántos dígitos usan sus cuentas y qué formato importan. Con eso la exportación queda lista el primer día. Mira cómo factura Drenpos en la página de [facturación Verifactu](/software-verifactu) y los [planes y precios](/pricing).
