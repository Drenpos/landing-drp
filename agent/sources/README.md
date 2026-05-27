# Fuentes de verdad (Grounding)

Esta carpeta contiene los **documentos fuente** que el agente usa para
generar contenido factual y verificable. El modelo solo puede afirmar datos,
cifras, fechas, artículos legales o cuantías que aparezcan literalmente
en estos documentos.

## Formatos soportados

- `.md` — Markdown plano (recomendado)
- `.txt` — Texto plano
- `.html` — HTML (el agente extrae solo el texto)
- `.json` — Datos estructurados

> Si tienes un **PDF**, conviértelo antes a texto. En macOS:
> ```bash
> brew install poppler
> pdftotext -layout entrada.pdf agent/sources/entrada.txt
> ```

## Cómo se usan

Desde el CLI:

```bash
node agent/index.mjs \
  --idea "Registro horario 2026" \
  --keywords "registro horario 2026,fichajes" \
  --source-docs "agent/sources/normativa-registro-horario-2026.md,agent/sources/drenpos-producto.md" \
  --source-urls "https://www.boe.es/...,https://www.mites.gob.es/..." \
  --strict-sources
```

- `--source-docs`   → rutas locales separadas por coma
- `--source-urls`   → URLs separadas por coma (se descargan y limpian)
- `--strict-sources` → modo estricto: prohíbe inventar nada fuera de las fuentes

## Buenas prácticas

1. **Un archivo por tema**: normativa, datos del producto, datos locales, etc.
2. **Limpia los documentos** antes de guardarlos: quita índices, paginación,
   cabeceras y demás ruido.
3. **Cita literalmente** los textos legales clave (artículos del RD, BOE…)
   en lugar de parafrasearlos: el modelo respeta mejor lo literal.
4. **Datos numéricos en formato consistente**: "2.045 € a 40.985 €" mejor
   que "entre dos mil y cuarenta mil euros".
5. **Mantén cada archivo bajo ~2000 palabras**. Si una fuente es enorme,
   pártela en varios archivos temáticos.

## Archivos sugeridos

| Archivo | Contenido recomendado |
| --- | --- |
| `normativa-registro-horario-2026.md` | Real Decreto, plazos, requisitos digitales, organismos |
| `sanciones-inspeccion-trabajo.md` | Tramos de multas (leves/graves/muy graves), cuantías reales |
| `drenpos-producto.md` | Features del producto, precios, integraciones, casos reales |
| `extremadura-tejido-empresarial.md` | Datos del Instituto de Estadística de Extremadura por ciudad |
