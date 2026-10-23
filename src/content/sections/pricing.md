---
title: "Elige el plan según lo que haga tu negocio"
description: "Cuatro planes. Cada uno trae sus usuarios y las personas que pueden fichar. Sin permanencia, y si pagas el año entero te regalamos dos meses."
badge: "Precios"

help_cta:
  enable: true
  title: "¿No sabes qué plan elegir?"
  description: "Cuéntanos a qué se dedica tu negocio y te decimos qué necesitas y qué te sobra."
  button:
    label: "Hablar con nosotros"
    link: "/contact"

server_note:
  enable: true
  title: "También en el servidor de tu empresa"
  description: "Cualquier plan se puede instalar en un servidor dentro de tu empresa, si prefieres tener los datos en casa o trabajas con muchos puestos en red. Sigue funcionando aunque se caiga internet, recibe las actualizaciones igual que en la nube y hace cada día una copia de seguridad cifrada fuera de la empresa. Lo vemos contigo y te pasamos una propuesta."
  link_label: "Pedir propuesta"
  link: "/contact"

plans_labels:
  - "Mensual"
  - "Anual"
plans:
  - title: "Facturación"
    description: "Para autónomos y pequeñas empresas que necesitan facturar bien y tener los cobros al día."
    price_prefix: ""
    price_suffix: " €"
    price_monthly: "[[n:facturacion]]"
    price_yearly: "[[n:facturacion_anual]]"
    price_description_monthly: "/mes"
    price_description_yearly: "/mes, pagando el año"
    features:
      - "[[n:facturacion_usuarios]] usuarios y [[n:facturacion_fichajes]] personas que fichan"
      - Presupuestos, pedidos, albaranes y facturas con Verifactu
      - DeCA del transporte desde el albarán
      - Facturas de proveedor leídas con OCR
      - Remesas SEPA y control de cobros y pagos
      - Envío de documentos por email y WhatsApp
      - Informes de ventas y compras
    badge:
      enable: false
      label: "Recomendado"
    button:
      enable: true
      label: "Empezar"
      link: "https://contract.drenpos.com/auth"
  - title: "Tienda y Hostelería"
    description: "Para tiendas, bares y restaurantes que cobran en caja y tienen gente fichando por turnos."
    price_prefix: ""
    price_suffix: " €"
    price_monthly: "[[n:tienda]]"
    price_yearly: "[[n:tienda_anual]]"
    price_description_monthly: "/mes"
    price_description_yearly: "/mes, pagando el año"
    features:
      - "[[n:tienda_usuarios]] usuarios y [[n:tienda_fichajes]] personas que fichan"
      - Todo lo del plan Facturación
      - "TPV de tienda: lector de códigos, tallas y colores, cierre de caja"
      - "TPV de hostelería: mapa de sala, comanderos, cocina y barra"
      - QR en las mesas
      - Fichaje por turnos con vacaciones y calendarios
    badge:
      enable: false
      label: "Recomendado"
    button:
      enable: true
      label: "Empezar"
      link: "https://contract.drenpos.com/auth"
  - title: "Almacén"
    description: "Para distribuidores y negocios que necesitan saber qué tienen, dónde está y qué caduca."
    price_prefix: ""
    price_suffix: " €"
    price_monthly: "[[n:almacen]]"
    price_yearly: "[[n:almacen_anual]]"
    price_description_monthly: "/mes"
    price_description_yearly: "/mes, pagando el año"
    features:
      - "[[n:almacen_usuarios]] usuarios y [[n:almacen_fichajes]] personas que fichan"
      - Todo lo del plan Facturación
      - "Inventario completo: lotes, caducidades, ubicaciones y plano del almacén"
      - Picking, recepciones y traslados con pistola o con el móvil
      - Stock mínimo y propuesta de compra
      - Palets con etiqueta SSCC y depósito de terceros
      - Si también vendes en mostrador, el TPV se añade por [[p:tpv]]/mes
    badge:
      enable: true
      label: "El más usado"
    button:
      enable: true
      label: "Empezar"
      link: "https://contract.drenpos.com/auth"
  - title: "Producción"
    description: "Para talleres, obradores y fábricas pequeñas que quieren saber lo que les cuesta cada cosa que fabrican."
    price_prefix: ""
    price_suffix: " €"
    price_monthly: "[[n:produccion]]"
    price_yearly: "[[n:produccion_anual]]"
    price_description_monthly: "/mes"
    price_description_yearly: "/mes, pagando el año"
    features:
      - "[[n:produccion_usuarios]] usuarios y [[n:produccion_fichajes]] personas que fichan"
      - Todo lo del plan Almacén
      - Órdenes de trabajo por fases y puestos
      - Escandallos y consumo de material leyendo el código
      - Horas de cada operario en cada orden
      - Coste real de cada fabricación
    badge:
      enable: false
      label: "Recomendado"
    button:
      enable: true
      label: "Empezar"
      link: "https://contract.drenpos.com/auth"
  - title: "A medida"
    description: "Para empresas cuyo trabajo no cabe en un plan cerrado. Vemos cómo trabajáis, configuramos un plan con lo que necesitáis y adaptamos Drenpos a vuestros procesos."
    price_prefix: ""
    price_monthly: "Personalizado"
    price_yearly: "Personalizado"
    price_description_monthly: ""
    price_description_yearly: ""
    features:
      - Plan configurado con los módulos, usuarios y fichajes que uses
      - Adaptaciones del programa a tu forma de trabajar
      - Integraciones con los programas que ya tienes
      - Paso de datos desde tu programa actual
      - Formación para tu equipo
      - Una persona de contacto que conoce tu empresa
    badge:
      enable: false
      label: "Recomendado"
    button:
      enable: true
      label: "Pedir propuesta"
      link: "/contact"
---
