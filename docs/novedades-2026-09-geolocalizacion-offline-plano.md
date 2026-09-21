# Landing Drenpos: geolocalización, terminal sin conexión y plano de almacén

Fecha: 21/09/2026. Estado: cambios hechos en el repo, `npm run build` pasa (EXIT 0, seoGraph sin errores, JSON-LD válido, H1 único). Sin commit.

## 1. Capturas que necesito

Las secciones ya están montadas y se ven bien sin imagen. En cuanto dejes el fichero en esa ruta exacta y vuelvas a construir, la imagen aparece sola (se comprueba con `existsSync` en build). El `alt` ya está escrito.

| # | Ruta dentro de `public/` | Tamaño | Qué debe verse |
|---|---|---|---|
| 1 | `images/funcionalidades/control-horario/09-geolocalizacion-mapa.png` | 1280×800 | Detalle de un fichaje con coordenadas de entrada y salida y el mapa de OpenStreetMap. Datos de prueba, sin nombres reales ni direcciones de casas. |
| 2 | `images/funcionalidades/control-horario/hardware/v2-terminal-furgoneta.webp` | 1200×800 | Foto del terminal enchufado al mechero de una furgoneta, mejor en una obra o finca. |
| 3 | `images/funcionalidades/almacen-tienda/05-plano-almacen-editor.png` | 1200×800 | Editor del plano con estanterías, paredes, punto de inicio y punto de carga. Si se ve el selector de plantas, mejor. |
| 4 | `images/funcionalidades/almacen-tienda/06-plano-almacen-ruta-picking.png` | 1200×800 | Plano con las ubicaciones numeradas según el orden de ruta, de inicio a punto de carga. |

Opcionales que sumarían: captura del informe PDF de fichajes con la ubicación, y pantalla del terminal en modo sin conexión (si muestra algún aviso de pendientes).

## 2. Qué confirmar antes de publicar

Son frases que se deducen de lo que me has contado, no hechos que me hayas dicho literal:

1. Terminal sin red: la web dice que el empleado ficha "igual, con su llavero o su QR" y que la pantalla confirma con nombre y foto. ¿Sin conexión también muestra nombre y foto? Si no, retoco el paso 3 de `/dispositivo-fichaje`.
2. Plano: "si mañana cambias una estantería de sitio, la mueves en el plano" (FAQ de gestión de almacén).
3. Ruta: "el asistente de picking y las oleadas presentan las líneas en el orden de ruta". Confirma que aplica a los dos.
4. No se dice en qué planes entra cada novedad ni se tocó `plans-comparison.md` ni `pricing.md`. Si quieres filas nuevas en la comparativa de planes, dime en cuáles entra.

## 3. Qué se ha cambiado

### `/control-horario`
- Sección nueva `#geolocalizacion`: H2 en pregunta, cápsula de 75 palabras, 4 tarjetas y nota legal con enlaces a la LOPDGDD (BOE) y a la guía de la AEPD.
- Bloque "¿Y si no hay internet donde fichas?" dentro de `#hardware`, enlazado a `/dispositivo-fichaje#sin-conexion`.
- Caso nuevo "Obra o finca sin cobertura" y caso comercial con ubicación al fichar.
- 4 FAQ nuevas (entran solas en el FAQPage): legalidad de la geolocalización, rastreo continuo, terminal sin internet, fichar en obra o campo sin cobertura.
- Hero, métodos, `description` (148 car.) y `featureList` del JSON-LD.

### `/dispositivo-fichaje`
- Corregida la FAQ que decía que el terminal necesitaba red. Era falso y es justo lo que citan las IA.
- Sección nueva `#sin-conexion` con cápsula de 69 palabras y 3 pasos (ficha en el tajo, guarda con su hora, sincroniza al volver).
- Ficha técnica: "Conectividad" corregida y fila "Sin conexión". Ventajas 6 → 8. Columna "Sin internet" en la comparativa. Caso de obra reescrito.
- 2 FAQ nuevas (mechero en obra sin cobertura, fiabilidad de la hora offline). `additionalProperty` "Funcionamiento sin conexión" en el schema Product.

### Post `blog/dispositivo-fichaje-portatil-12v-ley-control-jornada`
- Sección nueva sobre fichar sin cobertura, FAQ nueva, frases corregidas que exigían red o móvil como punto de acceso, `updated: 2026-09-21`.

### Clúster de almacén
- `/software-gestion-almacen`: sección `#plano-almacen` (cápsula de 69 palabras, 4 tarjetas), 2 FAQ, comparativa, `hermanas`, JSON-LD.
- `/software-preparacion-pedidos-picking`: sección `#ruta-picking` (cápsula de 66 palabras, 3 pasos) con la cita de De Koster, Le-Duc y Roodbergen (2007): la preparación de pedidos llega al 55 % del gasto operativo de un almacén. 2 FAQ y JSON-LD.
- `/software-almacen-frigorifico`: párrafo corto (ruta ordenada, menos tiempo en cámara).
- Nada de IA en la ruta, nada de porcentajes de ahorro propios.

### Capa para IA
- `llms.txt`: bloque "Novedades (actualizado el 2026-09-21)", intenciones de búsqueda nuevas (fichaje con geolocalización legal, terminal de fichaje offline, fichar en obra o campo sin cobertura, control horario para construcción y agricultura, software con plano de almacén, optimizar rutas de picking), sectores nuevos, módulos, datos citables, mini FAQ e índice.
- `llms-full.txt`: sección de novedades fechada y bloques de almacén y fichaje actualizados.
- `Base.astro`: 3 ítems nuevos en el `featureList` global.
- `modules.md` y `faq.md`: características y 3 FAQ nuevas.
- `robots.txt` no se ha tocado: ya permitía GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, etc.

## 4. Avisos

- No existe colección `changelog` en el repo (CLAUDE.md la menciona, pero no está en `src/content/` ni en `content.config.ts`). No se ha creado.
- `description` de `/software-gestion-almacen` mide 196 caracteres y la de picking 161. Ya estaban así antes. Google las corta. Recorte pendiente si quieres.
- La ruta de las imágenes del plano sigue la convención del clúster (`almacen-tienda/05-`, `06-`), no una carpeta `almacen/` nueva.

## 5. Siguiente paso fuera del repo (GEO)

Lo que más mueve las citas en ChatGPT y Perplexity a partir de aquí no está en la web: reseñas y menciones en terceros (foros de construcción y agricultura, directorios de software, LinkedIn con foto real del terminal en furgoneta) y un vídeo corto del terminal fichando sin red. Revisar cada 2 semanas 5 preguntas de marca y 5 de categoría en ChatGPT, Perplexity, Claude y Gemini para ver si citan las páginas nuevas.

## Fuentes

- LOPDGDD, art. 90: https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673
- AEPD, guía "Protección de datos y relaciones laborales" (18/05/2021): https://www.aepd.es/prensa-y-comunicacion/notas-de-prensa/aepd-publica-guia-pd-y-relaciones-laborales
- De Koster, Le-Duc y Roodbergen (2007), EJOR 182(2), 481-501: https://www.sciencedirect.com/science/article/abs/pii/S0377221706006473
