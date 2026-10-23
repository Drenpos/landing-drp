---
title: "Módulos de Drenpos"
description: "Los cuatro módulos principales van dentro de los planes. Lo demás lo activas solo si lo necesitas."
badge: "Módulos"

modules:
  - name: "Facturación"
    description: "Presupuestos, pedidos, albaranes y facturas, clientes y proveedores, cobros y pagos. Viene en todos los planes."
    price_monthly: "Incluido"
    price_yearly: "Incluido"
    included_in:
      - "Facturación"
      - "Tienda y Hostelería"
      - "Almacén"
      - "Producción"
    features:
      - "Verifactu en facturas y tickets"
      - "Presupuesto, pedido, albarán y factura sin volver a teclear"
      - "Clientes y proveedores con sus tarifas, descuentos y forma de pago"
      - "Cobros, pagos y remesas SEPA"
      - "DeCA del transporte desde el albarán, con PDF y QR"
      - "Facturas de proveedor leídas con OCR"
      - "Envío de documentos por email y WhatsApp"
      - "Informes de ventas, compras y márgenes"

  - name: "TPV"
    description: "Un solo módulo para tienda y para hostelería. Viene en el plan Tienda y Hostelería; en Almacén o Producción se añade por [[p:tpv]]/mes."
    price_monthly: "Incluido"
    price_yearly: "Incluido"
    included_in:
      - "Tienda y Hostelería"
    features:
      - "Venta con lector de códigos, tallas y colores"
      - "Tickets, devoluciones y cierre de caja"
      - "Mapa de sala con mesas abiertas y lo que lleva cada una"
      - "Comanderos en móvil o tablet"
      - "Pantallas de cocina y barra por familias de producto"
      - "Combinados y extras con su precio"
      - "QR en las mesas"

  - name: "Inventario"
    description: "El módulo de almacén completo, sin versiones recortadas. Viene en Almacén y Producción."
    price_monthly: "Incluido"
    price_yearly: "Incluido"
    included_in:
      - "Almacén"
      - "Producción"
    features:
      - "Stock en tiempo real en varios almacenes"
      - "Ubicaciones con QR y plano del almacén por plantas"
      - "Lotes, caducidades y salida FEFO"
      - "Picking con ruta según el plano, recepciones y traslados con pistola"
      - "Stock mínimo, avisos y propuesta de compra"
      - "Palets con etiqueta SSCC y depósito de terceros"
      - "Inventarios por zonas y valoración"

  - name: "Producción"
    description: "Órdenes de trabajo con fases, consumo de material y horas de cada operario. Viene en el plan Producción."
    price_monthly: "Incluido"
    price_yearly: "Incluido"
    included_in:
      - "Producción"
    features:
      - "Órdenes de trabajo por fases y puestos"
      - "Escandallos con semielaborados"
      - "Consumo de material leyendo el código"
      - "Horas de cada operario en cada fase"
      - "Coste real de cada orden frente al previsto"
      - "Trazabilidad de la materia prima al producto acabado"

  - name: "Fichajes"
    description: "Control horario completo en todos los planes. Cada persona más que fiche o apruebe vacaciones, [[p:fichaje]]/mes."
    price_monthly: "[[p:fichaje]]"
    price_yearly: "[[p:fichaje×meses_pagados/12]]"
    included_in:
      - "Facturación"
      - "Tienda y Hostelería"
      - "Almacén"
      - "Producción"
    features:
      - "Fichaje por web, app, QR o llavero"
      - "Terminal propio que guarda los fichajes si se cae internet"
      - "Vacaciones y permisos pedidos desde el móvil, con su saldo"
      - "Avisos de retrasos, olvidos y horas de más"
      - "Calendarios con los festivos de cada comunidad"
      - "Turnos rotativos 4x4, 5/2 o 6/3"
      - "Planificación del año con PDF por trabajador"
      - "Geolocalización si la activas"

  - name: "Usuarios"
    description: "Personas de más que entran al sistema, aparte de las que trae tu plan."
    price_monthly: "[[p:usuario]]"
    price_yearly: "[[p:usuario×meses_pagados/12]]"
    included_in: []
    features:
      - "Permisos por persona"
      - "Entra desde el ordenador, la tablet o el móvil"
      - "Sin límite de dispositivos"

  - name: "Puntos de venta"
    description: "Cajas o comanderos de más sobre los que trae tu plan."
    price_monthly: "[[p:caja]]"
    price_yearly: "[[p:caja×meses_pagados/12]]"
    included_in: []
    features:
      - "Otra caja en el mismo local o en otro"
      - "Comanderos para la terraza o la segunda planta"

  - name: "Comerciales"
    description: "Opcional. Agentes comerciales con su cartera de clientes y sus comisiones."
    price_monthly: "[[p:comerciales]]"
    price_yearly: "[[p:comerciales×meses_pagados/12]]"
    included_in: []
    features:
      - "Cada comercial ve y vende solo a sus clientes"
      - "Cálculo de comisiones"
      - "Ventas por comercial"

  - name: "Agencias de transporte"
    description: "Opcional y sin coste. MRW, UPS, DHL y CTT Express, y tu propio reparto con hoja de ruta. Los portes los cobra cada agencia."
    price_monthly: "Sin coste"
    price_yearly: "Sin coste"
    included_in: []
    features:
      - "Etiqueta y seguimiento desde el albarán"
      - "Hoja de ruta y hoja de entrega para tu reparto"

  - name: "Conectores"
    description: "Opcionales y sin coste. Holded, WooCommerce y Faire."
    price_monthly: "Sin coste"
    price_yearly: "Sin coste"
    included_in: []
    features:
      - "Holded: sigues facturando allí y el almacén lo llevas en Drenpos"
      - "WooCommerce: los pedidos entran solos y el stock vuelve a la web"
      - "Faire: los pedidos del marketplace entran como pedidos de venta"

  - name: "Conector con ChatGPT o Claude"
    description: "Opcional. Preguntas a tu asistente por ventas, clientes o stock y te contesta con tus datos, con los permisos de cada usuario."
    price_monthly: "[[p:mcp]]"
    price_yearly: "[[p:mcp×meses_pagados/12]]"
    included_in: []
    features:
      - "Ventas por fechas, compras y ventas netas"
      - "Fichas de clientes, proveedores y productos con su stock"
      - "Solo consulta: no cambia nada en el sistema"
      - "Un precio por empresa, para todos los usuarios"

  - name: "Soporte prioritario"
    description: "Opcional. Respuesta en 4 horas laborables y teléfono directo."
    price_monthly: "[[p:soporte]]"
    price_yearly: "[[p:soporte×meses_pagados/12]]"
    included_in: []
    features:
      - "Respuesta en 4 horas laborables"
      - "Teléfono directo"
      - "Una revisión de la configuración cada trimestre"

notes:
  - "Precios sin IVA"
  - "Pagando el año, dos meses gratis"
  - "Los módulos opcionales se activan y se quitan cuando quieras"
  - "Sin permanencia"
---
