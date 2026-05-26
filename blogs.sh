#!/bin/bash

CITIES=(
  "Badajoz"
  "Cáceres"
  "Mérida"
  "Don Benito"
  "Almendralejo"
  "Villanueva de la Serena"
  "Zafra"
  "Montijo"
)

for CITY in "${CITIES[@]}"
do
  node agent/index.mjs \
    --idea "Software de monitorización para supermercados en ${CITY}" \
    --keywords "software supermercados ${CITY},monitorizacion supermercados ${CITY},erp supermercados ${CITY}" \
    --context "Digitalización y monitorización en tiempo real para supermercados en ${CITY}" \
    --icp-type "supermercados y retail alimentacion" \
    --icp-role "gerente supermercado" \
    --icp-maturity "medio" \
    --icp-pains "stock,perdidas,errores inventario"
done