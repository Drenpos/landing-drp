---
title: "Qué trae cada plan"
description: "La misma tabla para todos. Lo que no viene en tu plan se puede añadir cuando lo necesites."
badge: "Comparativa"

plans:
  - id: "facturacion"
    name: "Facturación"
  - id: "almacen"
    name: "Almacén"
  - id: "produccion"
    name: "Producción"

features:
  - category: "Lo básico"
    items:
      - name: "Precio al mes, sin IVA"
        facturacion: "[[p:facturacion]]"
        almacen: "[[p:almacen]]"
        produccion: "[[p:produccion]]"
      - name: "Usuarios"
        facturacion: "[[n:facturacion_usuarios]]"
        almacen: "[[n:almacen_usuarios]]"
        produccion: "[[n:produccion_usuarios]]"
      - name: "Personas que fichan"
        facturacion: "[[n:facturacion_fichajes]]"
        almacen: "[[n:almacen_fichajes]]"
        produccion: "[[n:produccion_fichajes]]"
      - name: "TPV de tienda y hostelería"
        facturacion: false
        almacen: "+[[p:tpv]]/mes"
        produccion: "+[[p:tpv]]/mes"
      - name: "En la nube, desde cualquier dispositivo"
        facturacion: true
        almacen: true
        produccion: true
      - name: "Copia de seguridad diaria"
        facturacion: true
        almacen: true
        produccion: true
      - name: "Soporte por email"
        facturacion: true
        almacen: true
        produccion: true
      - name: "Soporte por teléfono y WhatsApp"
        facturacion: false
        almacen: true
        produccion: true

modules:
  - category: "Módulos"
    items:
      - name: "Facturación con Verifactu, DeCA y exportación a A3"
        facturacion: true
        almacen: true
        produccion: true
      - name: "Fichajes, vacaciones, turnos y calendarios"
        facturacion: true
        almacen: true
        produccion: true
      - name: "Informes y envío por email y WhatsApp"
        facturacion: true
        almacen: true
        produccion: true
      - name: "TPV de tienda y de hostelería"
        facturacion: false
        almacen: "+[[p:tpv]]/mes"
        produccion: "+[[p:tpv]]/mes"
      - name: "Inventario: stock, lotes, caducidades, ubicaciones, picking"
        facturacion: false
        almacen: true
        produccion: true
      - name: "Producción: órdenes, escandallos, tiempos y coste real"
        facturacion: false
        almacen: false
        produccion: true

notes:
  - "Opcional en cualquier plan: comerciales y comisiones, agencias de transporte, conectores con Holded, WooCommerce y Faire, y el conector con ChatGPT o Claude"
  - "Usuario de más: [[p:usuario]]/mes. Persona de más que ficha: [[p:fichaje]]/mes. Caja o comandero de más: [[p:caja]]/mes"
  - "Si solo quieres el control horario, mira Drenpos Equipo en la página de control horario"
  - "Cualquier plan se puede instalar en el servidor de tu empresa; lo estudiamos y te pasamos una propuesta"
  - "Pagando el año, [[n:anual_descuento]] % de descuento. Sin permanencia"
---
