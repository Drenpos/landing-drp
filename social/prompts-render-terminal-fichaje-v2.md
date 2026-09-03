# Renders y fotos de marketing del terminal de fichaje v2

Prompts listos para ChatGPT (GPT Image), Gemini (Nano Banana) o Midjourney con imagen de referencia. La idea es la misma en todos: partir de las fotos reales del terminal y cambiar solo la escena, nunca el diseño del dispositivo.

## Antes de empezar

Adjunta siempre estas tres fotos como referencia, en este orden:

1. `IMG_3335` (terminal de pie con marca arilex, pantalla de estado encendida)
2. `IMG_3336` (terminal en la mano, antena horizontal)
3. `IMG_3355` (carcasa frontal con placas v2 delante)

Frase que va al final de todos los prompts, en español o inglés según el modelo:

> Usa el dispositivo EXACTO de las fotos adjuntas sin alterar su diseño: carcasa negra impresa en 3D con textura fina, antena WiFi negra arriba, pantalla pequeña cuadrada en la parte superior con fondo oscuro que muestra "Disponible / Acerca tu tarjeta" y una IP en la esquina, ventana de lectura grande iluminada en blanco azulado en el centro con los iconos de QR y tarjeta debajo, rejilla de ventilación en el lateral izquierdo y el logo de la empresa en relieve en la parte inferior del frontal. Manténlo idéntico.

Sobre el logo: si la imagen es para un cliente concreto, deja "arilex" como en la foto o pide el suyo. Si es para la web de Drenpos, indica "sustituye el logo inferior por el logotipo DRENPOS de la cuarta imagen" y adjunta el logo en PNG como cuarta referencia. La IA suele destrozar el texto: revisa siempre el logo y regenera si sale ilegible.

## Escena 1. Hero de producto (web y ficha técnica)

Uso: cabecera de `/dispositivo-fichaje`, miniatura de Google, anuncios.

> Fotografía de producto en estudio del terminal de fichaje de las fotos adjuntas, de pie sobre una superficie de hormigón pulido gris claro, fondo degradado neutro de gris a blanco roto, sin objetos alrededor. Iluminación de estudio con una luz principal suave desde arriba a la izquierda y una luz de contorno fría por detrás que perfila la antena y el canto derecho. La pantalla pequeña muestra "Disponible / Acerca tu tarjeta" y la ventana de lectura brilla con el azul blanquecino de la foto original. A la derecha del terminal, un llavero RFID redondo morado con el logo en relieve, apoyado en la base. Ligera profundidad de campo, enfoque perfecto en el frontal. Formato 16:9 horizontal, alta resolución, aspecto de foto de catálogo, no de render de videojuego.

Variante vertical 4:5 para LinkedIn: misma escena, el terminal ocupa dos tercios de la altura y el llavero queda delante a la izquierda.

## Escena 2. Entrada de nave con operario

Uso: sección de almacenes en la landing, post de LinkedIn sobre fichaje sin móvil.

> Foto realista tomada con móvil en la entrada de una nave de almacén de distribución: pared de bloque pintada de blanco, marco de puerta metálica gris a la derecha, estanterías con palets retractilados desenfocadas al fondo. El terminal de fichaje de las fotos adjuntas está fijado a la pared a la altura del pecho, con el cable saliendo por abajo hacia una canaleta. Un operario de unos 40 años con chaleco reflectante amarillo y guantes de trabajo acerca un llavero RFID morado a la ventana de lectura; solo se ven su mano, el antebrazo y parte del chaleco. La pantalla pequeña muestra el nombre y la foto de un empleado con el texto "Fichaje registrado" en verde. Luz de mañana entrando por la puerta, sombras coherentes, encuadre ligeramente inclinado como en una foto rápida. Formato 4:5.

## Escena 3. Mostrador de cafetería junto al TPV

Uso: hostelería y retail, argumento "con la marca del local".

> Foto ambiente de la barra de una cafetería de barrio española a primera hora: mostrador de madera clara, máquina de café cromada desenfocada al fondo, una tablet de TPV en soporte negro a la izquierda. A su lado, el terminal de fichaje de las fotos adjuntas, de pie sobre el mostrador, con el logo de la cafetería en relieve en la parte inferior (usa el texto "Café Lola" en la misma tipografía redondeada que el logo de la foto). Una tarjeta blanca con un código QR grande apoyada contra el terminal. Luz cálida de las lámparas de la barra mezclada con luz natural de la ventana. Estilo de foto casual con móvil, ligera imperfección. Formato 1:1 para Instagram.

## Escena 4. Furgoneta y mechero (equipos móviles)

Uso: post sobre fichaje portátil a 12 V. Es la escena que ya tenías en `prompt-render-furgoneta.md`; aquí va ajustada al terminal v2.

> El terminal de fichaje de las fotos adjuntas está apoyado en el asiento del copiloto de una furgoneta de reparto usada, con tapicería gris algo desgastada. Un cable negro sale de la base del terminal y llega hasta la toma de mechero de 12 V del salpicadero, visible en el encuadre. Junto al terminal, dos llaveros RFID morados y unos guantes de trabajo. La pantalla pequeña muestra "Disponible / Acerca tu tarjeta". Luz natural de media mañana a través del parabrisas, sombras suaves y coherentes, fondo de cabina un poco desordenado. Foto casual hecha con móvil desde la puerta abierta, sin aspecto de render. Formato 4:5.

## Escena 5. Taller mecánico

Uso: sector talleres y fábricas, conceptos de fichaje por tarea.

> Foto realista en un taller mecánico: pared de chapa gris con un panel de herramientas colgadas, banco de trabajo de acero con virutas y una llave dinamométrica. El terminal de fichaje de las fotos adjuntas está atornillado a la pared junto al panel, con el logo del taller en relieve abajo (texto "Talleres Vega"). Un mecánico con mono azul y manos manchadas de grasa acerca su llavero RFID al terminal; solo se ven la mano y el antebrazo. La pantalla pequeña muestra la foto y el nombre de un empleado con "Fichaje registrado". Luz de fluorescentes fría mezclada con luz de la puerta del taller. Encuadre a la altura del terminal, ligeramente desde abajo. Formato 4:5.

## Escena 6. Obra con batería auxiliar

Uso: construcción, fichaje sin acometida eléctrica.

> Foto de una caseta de obra por dentro: mesa plegable con planos enrollados, un casco blanco y un termo. Sobre la mesa, el terminal de fichaje de las fotos adjuntas conectado con su cable a una batería portátil de 12 V tipo estación de energía compacta. Al fondo, por la ventana de la caseta, un edificio en estructura con andamios desenfocado. Dos llaveros RFID morados y una tarjeta con QR sobre la mesa. Luz dura de sol de mediodía entrando por la puerta, polvo en suspensión visible en el haz de luz. Foto casual hecha con móvil, sin retoque de estudio. Formato 4:5.

## Escena 7. Vista explosionada (la placa propia)

Uso: sección "lo fabricamos nosotros", post técnico en LinkedIn, ficha técnica.

> Render técnico limpio, tipo ilustración de producto, del terminal de fichaje de las fotos adjuntas en vista explosionada sobre fondo blanco: de izquierda a derecha, la tapa frontal negra con sus dos ventanas, la pantalla pequeña cuadrada, el módulo lector con su ventana blanca, la placa de circuito impreso verde de la tercera foto con el texto DRENPOS y la marca V2 en la serigrafía, la placa base con la antena, y la tapa trasera. Las piezas flotan separadas en línea con pequeñas guías punteadas grises que indican cómo encajan. Luz suave y uniforme, sombras mínimas, colores fieles a las fotos. Sin texto añadido salvo la serigrafía real de la placa. Formato 16:9.

Si el modelo no respeta la placa real, adjunta solo la tercera foto como referencia y pide que use "esa placa verde exactamente, con su silueta y su serigrafía".

## Escena 8. Versión "tu logo aquí" (argumento de venta)

Uso: página de producto y propuestas comerciales.

> Composición de tres terminales de fichaje idénticos al de las fotos adjuntas, alineados de pie sobre una superficie blanca, con fondo blanco uniforme. Cada uno lleva un logo distinto en relieve en la parte inferior del frontal: el primero "arilex" como en la foto original, el segundo "DRENPOS" con el logotipo de la cuarta imagen adjunta y el tercero un rectángulo punteado con el texto "Tu logo" en gris. Las tres pantallas pequeñas muestran "Disponible / Acerca tu tarjeta". Luz de estudio suave, sin reflejos fuertes. Formato 16:9.

## Formatos por canal

| Canal | Formato | Escenas recomendadas |
| --- | --- | --- |
| Hero de la landing y Open Graph | 16:9, mínimo 1200x675 | 1, 7 |
| LinkedIn (imagen única) | 4:5, 1080x1350 | 2, 4, 5, 6 |
| Instagram feed | 1:1, 1080x1080 | 3, 1 |
| Reels y TikTok (fotograma fijo) | 9:16, 1080x1920 | 2 recortada, 4 |
| Propuestas comerciales (docx) | 16:9 | 8, 1 |

## Checklist antes de publicar

- El logo se lee bien y tiene la tipografía correcta. Si no, regenera con "keep the logo exactly as in the reference".
- La pantalla pequeña muestra un texto plausible en español, sin galimatías.
- La ventana de lectura brilla en blanco azulado, no en verde ni en rojo.
- La antena está arriba y es negra; la IA a veces la duplica o la convierte en un micrófono.
- El cable llega de verdad al mechero o a la batería en las escenas 4 y 6.
- Las sombras van todas en la misma dirección.
- Si parece render de videojuego, añade al prompt "amateur smartphone photo, slightly grainy, imperfect framing".
- En las escenas con persona, que no se vea la cara: evita problemas de derechos de imagen y centra la atención en el gesto.

## Plan B: sesión de fotos reales en una hora

Las escenas 2, 3, 4 y 5 se pueden hacer con el terminal real, un móvil y una tarde. Un almacén conocido, una cafetería amiga, la furgoneta de alguien del equipo y un taller. Foto desde la altura del terminal, luz de día, sin editar. Para el hero de producto (escena 1) basta una cartulina blanca curvada, una lámpara de escritorio y una ventana. Lo real rinde más en LinkedIn que cualquier render, y evita el problema del logo.
