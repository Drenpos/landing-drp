#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
#  Drenpos — Campaña SEO: Registro Horario 2026
# ─────────────────────────────────────────────────────────────────────────────
#  Objetivo:
#    Atacar la oportunidad SEO del nuevo registro horario en España (2026)
#    combinando posts legales, comerciales y SEO local en Extremadura.
#
#  ⚠️ ANTI-ALUCINACIÓN
#    Todos los posts se generan con --strict-sources y un bundle de
#    documentos fuente (normativa + producto + datos locales).
#    El modelo NO puede añadir cifras, leyes ni datos que no aparezcan
#    en agent/sources/.
#
#  Uso:
#    chmod +x blogs-registro-horario.sh
#    ./blogs-registro-horario.sh                # campaña completa
#    ./blogs-registro-horario.sh pilar          # solo el post pilar
#    ./blogs-registro-horario.sh secundarios    # solo los posts secundarios
#    ./blogs-registro-horario.sh local          # SEO local por ciudades
#    ./blogs-registro-horario.sh local Badajoz  # solo una ciudad
# ─────────────────────────────────────────────────────────────────────────────

set -e

# ── Configuración ───────────────────────────────────────────────────────────
AGENT="node agent/index.mjs"

# Bundle de fuentes de verdad — se reutiliza en todos los posts
SOURCES_LEGAL="agent/sources/normativa-registro-horario-2026.md"
SOURCES_PRODUCT="agent/sources/drenpos-producto.md"
SOURCES_LOCAL="agent/sources/extremadura-tejido-empresarial.md"

# Bundle por tipo de post
SOURCES_PILAR="${SOURCES_LEGAL},${SOURCES_PRODUCT}"
SOURCES_SECUNDARIOS="${SOURCES_LEGAL},${SOURCES_PRODUCT}"
SOURCES_LOCAL_BUNDLE="${SOURCES_LEGAL},${SOURCES_PRODUCT},${SOURCES_LOCAL}"

# URLs oficiales que se descargarán dinámicamente (opcional, puedes vaciarlo)
# Si dejas la variable vacía, no se intenta descargar nada.
SOURCE_URLS=""
# Ejemplo:
# SOURCE_URLS="https://www.boe.es/buscar/act.php?id=BOE-A-2019-3481,https://www.mites.gob.es/ficheros/ministerio/sec_trabajo/guia_registro_jornada.pdf"

CITIES=(
  "Badajoz"
  "Cáceres"
  "Mérida"
  "Don Benito"
  "Almendralejo"
  "Villanueva de la Serena"
  "Zafra"
  "Montijo"
  "Plasencia"
  "Navalmoral de la Mata"
  "Coria"
)

# Pequeña pausa entre ejecuciones para no saturar Ollama
SLEEP_BETWEEN=3

# ── Helpers ─────────────────────────────────────────────────────────────────
log_step() {
  echo ""
  echo "═══════════════════════════════════════════════════════════════════════"
  echo "  $1"
  echo "═══════════════════════════════════════════════════════════════════════"
  echo ""
}

# Wrapper que añade --source-urls solo si SOURCE_URLS no está vacío
run_agent() {
  if [ -n "$SOURCE_URLS" ]; then
    "$@" --source-urls "$SOURCE_URLS"
  else
    "$@"
  fi
}

# ─────────────────────────────────────────────────────────────────────────────
#  1) POST PILAR — la guía maestra
# ─────────────────────────────────────────────────────────────────────────────
run_pilar() {
  log_step "🔥 POST PILAR — Registro horario en 2026: nuevos requisitos"

  run_agent $AGENT \
    --idea "Registro horario en 2026: nuevos requisitos y cómo adaptarse" \
    --keywords "registro horario 2026,control horario obligatorio,control de jornada laboral,fichajes empleados,sistema control presencia,software control horario,nueva ley fichajes,requisitos registro jornada" \
    --context "Explicar los nuevos requisitos legales del registro horario en España en 2026 (digitalización obligatoria, trazabilidad, accesibilidad para la Inspección de Trabajo) y cómo las empresas pueden adaptarse mediante software cloud. Todas las cifras, artículos y sanciones deben salir de las fuentes." \
    --icp-type "pymes y empresas con empleados" \
    --icp-role "gerente,rrhh y administracion" \
    --icp-maturity "medio" \
    --icp-pains "multas,descontrol horario,registro manual,falta trazabilidad,inspecciones de trabajo" \
    --source-docs "$SOURCES_PILAR" \
    --strict-sources

  sleep $SLEEP_BETWEEN
}

# ─────────────────────────────────────────────────────────────────────────────
#  2) POSTS SECUNDARIOS — long tail con intención muy alta
# ─────────────────────────────────────────────────────────────────────────────
run_multas() {
  log_step "⚖️  SECUNDARIO 1 — Multas por incumplir el registro horario"

  run_agent $AGENT \
    --idea "Multas por incumplir el registro horario en 2026: cuánto te puede costar" \
    --keywords "multas registro horario,sanciones control horario,inspeccion trabajo fichajes,registro jornada obligatorio,sanciones laborales 2026" \
    --context "Explicar los tramos de sanciones (leves, graves, muy graves) por no llevar registro horario en 2026. Las cuantías y artículos DEBEN coincidir con la normativa de las fuentes." \
    --icp-type "pymes" \
    --icp-role "gerente y administracion" \
    --icp-maturity "bajo" \
    --icp-pains "miedo inspecciones,multas,falta informacion,desconocimiento normativa" \
    --source-docs "$SOURCES_SECUNDARIOS" \
    --strict-sources

  sleep $SLEEP_BETWEEN
}

run_excel() {
  log_step "📉 SECUNDARIO 2 — Por qué Excel ya no sirve para controlar horarios"

  run_agent $AGENT \
    --idea "Por qué Excel ya no sirve para controlar horarios laborales en 2026" \
    --keywords "excel control horario,software fichajes,registro jornada digital,control presencia cloud,alternativa excel fichajes" \
    --context "Comparativa entre métodos manuales (Excel, papel) y soluciones cloud. Riesgos legales del Excel frente a Inspección de Trabajo (no inalterable, no firmado, no accesible). Citar requisitos legales solo desde las fuentes." \
    --icp-type "pymes tradicionales" \
    --icp-role "gerente empresa" \
    --icp-maturity "bajo" \
    --icp-pains "errores manuales,falta control,perdida tiempo,formato no valido" \
    --source-docs "$SOURCES_SECUNDARIOS" \
    --strict-sources

  sleep $SLEEP_BETWEEN
}

run_movil() {
  log_step "📱 SECUNDARIO 3 — Cómo fichar desde el móvil de forma legal"

  run_agent $AGENT \
    --idea "Cómo fichar desde el móvil de forma legal en 2026" \
    --keywords "app fichajes empleados,fichar desde movil,control horario movil,registro jornada app,geolocalizacion fichajes" \
    --context "Cómo funcionan los fichajes móviles y qué exige la ley (geolocalización, biometría, consentimiento). Usar como referencia los requisitos legales de las fuentes." \
    --icp-type "empresas con movilidad" \
    --icp-role "rrhh y operaciones" \
    --icp-maturity "medio" \
    --icp-pains "teletrabajo,empleados desplazados,falta control,fichajes fraudulentos" \
    --source-docs "$SOURCES_SECUNDARIOS" \
    --strict-sources

  sleep $SLEEP_BETWEEN
}

run_comparativa() {
  log_step "🆚 SECUNDARIO 4 — Comparativa software de control horario"

  run_agent $AGENT \
    --idea "Comparativa: mejores software de control horario para pymes en 2026" \
    --keywords "mejor software control horario,comparativa fichajes,software fichajes pymes,sistema control presencia comparativa" \
    --context "Comparativa basada en criterios objetivos (cumplimiento legal, integraciones, soporte). Solo describir Drenpos con los datos del documento de producto. No inventar features que no estén." \
    --icp-type "pymes españolas" \
    --icp-role "gerente,it,rrhh" \
    --icp-maturity "medio" \
    --icp-pains "comparar opciones,miedo a equivocarse,presupuesto ajustado" \
    --source-docs "$SOURCES_SECUNDARIOS" \
    --strict-sources

  sleep $SLEEP_BETWEEN
}

run_teletrabajo() {
  log_step "🏠 SECUNDARIO 5 — Control horario en teletrabajo"

  run_agent $AGENT \
    --idea "Control horario en teletrabajo: cómo cumplir la ley en 2026" \
    --keywords "control horario teletrabajo,registro jornada teletrabajo,fichajes remoto,ley teletrabajo 2026" \
    --context "Cómo combinar la Ley del Teletrabajo y el registro horario 2026. Citar requisitos solo desde las fuentes." \
    --icp-type "empresas con teletrabajo o modelo híbrido" \
    --icp-role "rrhh,gerente" \
    --icp-maturity "medio" \
    --icp-pains "control empleados remotos,cumplir ley,equilibrio vida-trabajo" \
    --source-docs "$SOURCES_SECUNDARIOS" \
    --strict-sources

  sleep $SLEEP_BETWEEN
}

run_secundarios() {
  run_multas
  run_excel
  run_movil
  run_comparativa
  run_teletrabajo
}

# ─────────────────────────────────────────────────────────────────────────────
#  3) SEO LOCAL — un post por ciudad de Extremadura
#     ▸ MISMO contexto, MISMAS keywords (solo cambia el municipio)
#     ▸ MISMAS fuentes para garantizar contenido factual idéntico
# ─────────────────────────────────────────────────────────────────────────────
run_local_city() {
  local CITY="$1"
  log_step "📍 SEO LOCAL — ${CITY}"

  run_agent $AGENT \
    --idea "Software de control horario para empresas en ${CITY}" \
    --keywords "software control horario ${CITY},control de jornada ${CITY},registro horario ${CITY},fichajes empleados ${CITY},app fichajes ${CITY},sistema control presencia ${CITY}" \
    --context "Cómo las empresas de ${CITY} (Extremadura) pueden adaptarse al registro horario digital obligatorio de 2026. Mantener exactamente la misma estructura, argumentos y datos legales que en los posts de otras ciudades — solo cambian las referencias a ${CITY}. No inventar cifras locales: usa solo las que aparezcan en las fuentes de tejido empresarial. Si no hay datos específicos de ${CITY}, omítelos en lugar de inventar." \
    --icp-type "pymes y empresas locales" \
    --icp-role "gerente y recursos humanos" \
    --icp-maturity "medio" \
    --icp-pains "multas laborales,registro manual,falta control empleados,proveedor lejano" \
    --source-docs "$SOURCES_LOCAL_BUNDLE" \
    --strict-sources

  sleep $SLEEP_BETWEEN
}

run_local_all() {
  for CITY in "${CITIES[@]}"; do
    run_local_city "${CITY}"
  done
}

# ─────────────────────────────────────────────────────────────────────────────
#  Dispatcher
# ─────────────────────────────────────────────────────────────────────────────
MODE="${1:-all}"
CITY_ARG="${2:-}"

case "$MODE" in
  pilar)         run_pilar ;;
  secundarios)   run_secundarios ;;
  multas)        run_multas ;;
  excel)         run_excel ;;
  movil)         run_movil ;;
  comparativa)   run_comparativa ;;
  teletrabajo)   run_teletrabajo ;;
  local)
    if [ -n "$CITY_ARG" ]; then
      run_local_city "$CITY_ARG"
    else
      run_local_all
    fi
    ;;
  all|"")
    run_pilar
    run_secundarios
    run_local_all
    ;;
  *)
    echo "Uso: $0 [pilar|secundarios|multas|excel|movil|comparativa|teletrabajo|local [Ciudad]|all]"
    exit 1
    ;;
esac

log_step "✅ Campaña completada"
echo "  Revisa los posts generados en: src/content/blog/"
echo "  Imágenes en: public/images/blog/"
echo ""
