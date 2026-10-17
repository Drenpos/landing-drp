# Seguimiento SEO / AEO: 17 de octubre de 2026

Lectura desde el navegador de Alonso. Base: `seguimiento-2026-10-13.md`. Search Console trae datos hasta el 14 de octubre.

## 1. Search Console, últimos 7 días (8 a 14 oct) contra los 7 anteriores

| Métrica | 8 a 14 oct | 7 días anteriores | Lectura |
| --- | --- | --- | --- |
| Clics | 30 | 39 | baja por marca |
| Clics de marca ("drenpos") | 4 | 16 | caída de búsquedas de marca (sin Meta Ads) |
| Clics no de marca | 26 | 23 | sube |
| Impresiones | 3.230 | 1.850 | +75 % |
| CTR | 0,9 % | 2,1 % | baja: muchas impresiones nuevas sin clic |
| Posición media | 8,6 | 18,5 | ya en página 1 de media |
| Consultas distintas | 570 | | |

La caída de clics es toda de marca. Sin anuncios en Meta, menos gente busca "drenpos". El tráfico que llega por lo que hacemos, no por quién somos, sube.

### Páginas

| Página | Clics | Impresiones (antes) | Posición |
| --- | --- | --- | --- |
| /software-turnos-rotativos | 5 | 281 (11) | 6,7 |
| / | 5 | 35 (60) | 3,2 |
| /blog/preparacion-de-pedidos-picking-almacen | 3 | 370 (436) | 10,7 |
| /dispositivo-fichaje | 2 | 57 (3) | 5,9 |
| /blog/deca-documento-control-transporte-digital-5-octubre-2026 | 2 | 106 (365) | 6,3 |
| /blog/cuanto-cuesta-tpv-bar-restaurante-2026 | 2 | 28 (40) | 4,0 |
| /blog/como-organizar-almacen-pyme | 2 | 9 (4) | 6,8 |
| **/software-tienda-recambios** | **1** | **1.469 (5)** | **7,2** |
| /control-entrada-salida-empleados | 0 | 220 (3) | 7,6 |
| /software-vacaciones-ausencias | 0 | 17 (1) | 6,1 |
| /blog/que-es-desfichar-como-se-hace | 1 | 59 (0) | 2,9 |
| /blog/verifactu-aplazado-octubre-2028 | 1 | 41 (0) | 6,4 |
| /software-almacen-tienda | 1 | 174 (386) | 43,3 |

### El dato de la semana: recambios

1.469 impresiones en 7 días, posición media 7,2, **1 clic (CTR 0,1 %)**. En Google "programa de gestion recambios" sale 4.º orgánico, debajo de anuncios (Sage, Clientify) y de especialistas (GIRA, Distritok, Keyloop). Decenas de variantes en posición 1 a 3 con 10 a 17 impresiones y 0 clics. El título genérico no compite con los especialistas del sector: hay que reescribir título y descripción con el diferencial (precio visible, TPV y almacén en uno, sin permanencia).

## 2. GA4, 10 a 16 oct

| Canal | Sesiones |
| --- | --- |
| Organic Search | 77 |
| Direct | 26 |
| AI Assistant | 3 |
| **Total** | **106** |

- Eventos clave: **3 `whatsapp_click`** (todos en Direct). La medición de WhatsApp funciona.
- `form_submit`: 0. `form_start`: 1. Sigue pendiente la demo de prueba para validar el formulario.

## 3. ChatGPT (búsqueda web), 17 oct

| Consulta | ¿Sale Drenpos? | Cómo |
| --- | --- | --- |
| Software de control horario con vacaciones y turnos 4x4 para pyme | No | aTurnos, Factorial, Kenjo, Sesame |
| Terminal de fichaje RFID sin huella que funcione sin internet, precio | **Sí** (5.º de 5) | "Desde 140 € + IVA", RFID y QR, sin huella, sincroniza al volver internet, software desde 1 €/usuario/mes. Elegido para "almacene fichajes y los sincronice después" |
| Programa de gestión para tienda de recambios con almacén y TPV | **Sí** (6.º de 6) | Precios correctos (29 y 39 €/mes sin IVA), aviso honesto de que no tiene TecDoc. Recomendado para "tienda pequeña" y "repuestos sin catálogo de automoción" |
| Software que genera el DeCA desde el albarán | No | SimplyGest, GEXTOR, DECAOK, Eclipse, DeCA Flow |

Perplexity pide iniciar sesión para responder; no se pudo medir.

## 4. Veredicto

1. Producto concreto con precio = citado (terminal, recambios). La landing de recambios, publicada el 7/10, ya la usa ChatGPT con sus precios y su limitación.
2. Categorías amplias (control horario, DeCA) = no citado. Ahí ganan marcas con presencia en comparadores y listados (Softwaredoit, Capterra, Appvizer, blogs de Holded y Factorial).
3. Google: posición media en página 1. El problema ya no es aparecer, es que hagan clic (recambios).

## 5. Próximos pasos

| Quién | Qué | Por qué |
| --- | --- | --- |
| Claude | Reescribir título y descripción de `/software-tienda-recambios` y `/control-entrada-salida-empleados` | Muchas impresiones en página 1 y 0 clics |
| Claude | DeCA: comparativa "software para el DeCA" con tabla y precio, y FAQ en la landing | Hay landing y post pero ChatGPT no nos cita; los citados tienen guía paso a paso desde el albarán |
| Alonso | Fichas en Capterra y Softwaredoit (gratis) | Es de donde sacan los asistentes las listas de control horario |
| Alonso | Demo de prueba desde el formulario | Validar `form_submit` |
| Claude | Fase 2 (producción, calendarios 2027) | Pendiente |
