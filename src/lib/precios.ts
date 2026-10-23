/**
 * Precios de Drenpos: una sola fuente (src/config/precios.json).
 *
 * En código (.astro, .ts) importa `P`, `valor()` o `eur()`.
 * En textos (Markdown del blog, frontmatter, strings sueltos) escribe:
 *   [[p:almacen]]             -> "59 €"
 *   [[n:almacen]]             -> "59"
 *   [[p:almacen+tpv]]         -> "79 €"   (se admiten + - × / y paréntesis)
 *   [[p:produccion+2×usuario]] -> "93 €"  (multiplica con ×, no con *)
 *   [[n:almacen_usuarios]]    -> "3"
 * El middleware (src/middleware.ts) los sustituye en cada respuesta de texto,
 * también al prerenderizar. Una clave que no existe rompe el build a propósito:
 * es mejor eso que publicar un precio mal.
 */
import datos from "@/config/precios.json";

export const P = datos;
export type ClavePlan = keyof typeof datos.planes;

const valores: Record<string, number> = {};
for (const [id, plan] of Object.entries(datos.planes)) {
  valores[id] = plan.mensual;
  valores[`${id}_usuarios`] = plan.usuarios;
  valores[`${id}_fichajes`] = plan.fichajes;
  // Precio al mes pagando el año entero (meses_pagados de 12).
  valores[`${id}_anual`] = (plan.mensual * datos.anual.meses_pagados) / 12;
  valores[`${id}_ano`] = plan.mensual * datos.anual.meses_pagados;
}
for (const [id, v] of Object.entries(datos.extras)) valores[id] = v;
for (const [id, v] of Object.entries(datos.equipo)) {
  if (typeof v === "number") valores[`equipo_${id}`] = v;
  else {
    valores[id] = v.mensual;
    valores[`${id}_personas`] = v.personas;
  }
}
valores.terminal = datos.terminal;
valores.almacen_tpv = datos.planes.almacen.mensual + datos.extras.tpv;
valores.produccion_tpv = datos.planes.produccion.mensual + datos.extras.tpv;
valores.desde = Math.min(...Object.values(datos.planes).map((p) => p.mensual));
valores.hasta = Math.max(...Object.values(datos.planes).map((p) => p.mensual));
valores.meses_gratis = 12 - datos.anual.meses_pagados;
valores.meses_pagados = datos.anual.meses_pagados;
valores.nuevas_descuento = datos.empresas_nuevas.descuento;
valores.nuevas_meses = datos.empresas_nuevas.meses;
valores.nuevas_prorroga = datos.empresas_nuevas.prorroga_meses;
valores.nuevas_facturacion_max = datos.empresas_nuevas.facturacion_max;
valores.nuevas_facturacion_prorroga_max =
  datos.empresas_nuevas.facturacion_prorroga_max;
valores.nuevas_antiguedad = datos.empresas_nuevas.antiguedad_max_anos;
valores.nuevas_antiguedad_startup = datos.empresas_nuevas.antiguedad_startup_anos;
valores.nuevas_documentos = datos.empresas_nuevas.uso_documentos;
valores.nuevas_dias_fichaje = datos.empresas_nuevas.uso_dias_fichaje;

export const VALORES: Readonly<Record<string, number>> = valores;

/** Evalúa una expresión con claves y + - * / ( ). Lanza si algo no existe. */
export function valor(expr: string): number {
  // "×" es el operador de multiplicar en los textos: el "*" lo convierte
  // Markdown en cursiva.
  const limpio = expr.replace(/\s+/g, "").replace(/×/g, "*");
  const js = limpio.replace(/[a-z_][a-z0-9_]*/g, (clave) => {
    if (!(clave in valores)) {
      throw new Error(`precios: clave desconocida "${clave}" en "${expr}"`);
    }
    return `(${valores[clave]})`;
  });
  if (!/^[\d.()+\-*/]+$/.test(js)) {
    throw new Error(`precios: expresión no válida "${expr}"`);
  }
  const n = Function(`"use strict";return (${js});`)() as number;
  if (!Number.isFinite(n)) throw new Error(`precios: resultado no válido "${expr}"`);
  return Math.round(n * 100) / 100;
}

/** 59 -> "59", 1.5 -> "1,50", 1188 -> "1.188", 15.833 -> "15,83" */
export function num(n: number): string {
  const entero = Number.isInteger(Math.round(n * 100) / 100);
  return n.toLocaleString("es-ES", {
    minimumFractionDigits: entero ? 0 : 2,
    maximumFractionDigits: entero ? 0 : 2,
    useGrouping: n >= 1000 ? "always" : false,
  } as Intl.NumberFormatOptions);
}

/** Precio con símbolo: "59 €", "1,50 €". */
export function eur(n: number): string {
  return `${num(n)} €`;
}

/** Para JSON-LD y atributos: "59.00" */
export function decimal(n: number): string {
  return n.toFixed(2);
}

const TOKEN = /\[\[(p|n):([^\]]+)\]\]/g;

/** Sustituye los [[p:...]] y [[n:...]] de un texto. */
export function resolverPrecios(texto: string): string {
  if (!texto.includes("[[")) return texto;
  return texto.replace(TOKEN, (_, tipo: string, expr: string) => {
    const n = valor(expr);
    return tipo === "p" ? eur(n) : num(n);
  });
}

/** "3 en Facturación, 8 en Tienda y Hostelería, 5 en Almacén y 10 en Producción" */
export function fichajesPorPlan(): string {
  const partes = Object.values(datos.planes).map((p) => `${p.fichajes} en ${p.nombre}`);
  return partes.length > 1
    ? `${partes.slice(0, -1).join(", ")} y ${partes[partes.length - 1]}`
    : partes.join("");
}

export function tieneTokens(texto: string): boolean {
  return /\[\[(p|n):/.test(texto);
}
