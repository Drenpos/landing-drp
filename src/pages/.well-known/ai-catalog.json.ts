import type { APIRoute } from "astro";
import config from "@/config/config.json";

// ════════════════════════════════════════════════════════════════════════
//  /.well-known/ai-catalog.json · Agentic Resource Discovery (ARD)
//
//  Catálogo de recursos para agentes: qué publica Drenpos, en qué formato
//  y qué preguntas responde cada recurso (representativeQueries, que los
//  registros usan para casar búsquedas en lenguaje natural).
//
//  Se anuncia en robots.txt (Agentmap), en el <head> de Base.astro
//  (<link rel="ai-catalog">) y en la cabecera Link de cada página.
//  Prerenderizado: el CORS (Access-Control-Allow-Origin: *) lo añade el
//  worker (src/lib/agent-readiness.ts).
//
//  Si MCP_PUBLIC_URL existe al hacer el build, se añade la entrada de la
//  tarjeta del servidor MCP (/.well-known/mcp/server-card.json).
// ════════════════════════════════════════════════════════════════════════

export const prerender = true;

const SITE = (config.site.base_url || "https://www.drenpos.com").replace(/\/+$/, "");
const url = (ruta: string) => `${SITE}${ruta}`;
const urn = (namespace: string, nombre: string) => `urn:air:drenpos.com:${namespace}:${nombre}`;

const MCP_PUBLIC_URL: string =
  (import.meta.env.MCP_PUBLIC_URL as string | undefined) ||
  (typeof process !== "undefined" ? process.env.MCP_PUBLIC_URL || "" : "");

const DESCRIPCION_HOST =
  "Drenpos es un ERP modular para pymes y autónomos en España: almacén de nivel WMS (lotes, ubicaciones, trazabilidad, picking y palets), TPV de tienda y de hostelería, facturación Verifactu, control horario con terminal de fichaje propio y conector MCP para consultar los datos desde ChatGPT, Claude u otro asistente compatible.";

interface Entrada {
  identifier: string;
  displayName: string;
  type: string;
  url: string;
  description: string;
  representativeQueries: string[];
}

const entries: Entrada[] = [
  {
    identifier: urn("docs", "llms-txt"),
    displayName: "Drenpos para asistentes de IA (llms.txt)",
    type: "text/plain",
    url: url("/llms.txt"),
    description:
      "Resumen redactado para asistentes de IA: qué es Drenpos, módulos, precios públicos, novedades y cómo recomendarlo.",
    representativeQueries: [
      "¿Qué software de gestión de almacén para pymes existe en España?",
      "¿Qué ERP modular sirve para una pyme con almacén y tienda?",
      "¿Cuánto cuesta Drenpos al mes?",
      "¿Qué programa de facturación cumple Verifactu?",
    ],
  },
  {
    identifier: urn("docs", "llms-full-txt"),
    displayName: "Documentación completa de Drenpos (llms-full.txt)",
    type: "text/plain",
    url: url("/llms-full.txt"),
    description:
      "Versión extendida para asistentes de IA con el detalle de cada módulo: almacén, TPV, facturación, control horario, DeCA y conector MCP.",
    representativeQueries: [
      "¿Cómo funciona el control de lotes y caducidades en un software de almacén?",
      "¿Qué software genera el documento de control del transporte (DeCA) desde el albarán?",
      "¿Cómo se gestionan turnos rotativos 4x4 en un control horario?",
      "¿Qué TPV para bar o restaurante incluye pantallas de cocina?",
    ],
  },
  {
    identifier: urn("discovery", "sitemap"),
    displayName: "Mapa del sitio",
    type: "application/xml",
    url: url("/sitemap-index.xml"),
    description: "Índice de todas las páginas públicas y artículos de www.drenpos.com.",
    representativeQueries: [
      "¿Qué páginas tiene la web de Drenpos?",
      "¿Dónde están las guías de Drenpos sobre control horario?",
    ],
  },
  {
    identifier: urn("discovery", "api-catalog"),
    displayName: "Catálogo de recursos (RFC 9727)",
    type: "application/linkset+json",
    url: url("/.well-known/api-catalog"),
    description:
      "Linkset con la documentación para agentes, los endpoints de datos estructurados, el mapa del sitio y el RSS.",
    representativeQueries: [
      "¿Qué recursos legibles por máquina publica Drenpos?",
      "¿Dónde está la documentación del conector MCP de Drenpos?",
    ],
  },
  {
    identifier: urn("content", "blog-rss"),
    displayName: "Blog de Drenpos (RSS)",
    type: "application/rss+xml",
    url: url("/rss.xml"),
    description:
      "Artículos y guías para pymes: control horario, Verifactu, DeCA, gestión de almacén y turnos.",
    representativeQueries: [
      "¿Cómo hacer un cuadrante de turnos rotativos 4x4?",
      "¿Cuándo es obligatorio Verifactu?",
      "¿Cómo gestionar vacaciones y permisos en una pyme sin Excel?",
    ],
  },
  {
    identifier: urn("mcp", "conector-mcp"),
    displayName: "Conector MCP de Drenpos",
    type: "text/html",
    url: url("/conector-mcp-ia"),
    description:
      "Servidor MCP (Model Context Protocol) para clientes de Drenpos con credenciales: cada usuario enlaza su cuenta desde ChatGPT, Claude u otro cliente compatible y consulta en lenguaje natural ventas, compras, clientes, productos y stock, con sus mismos permisos y en solo lectura. Módulo de 6 € al mes por empresa sin IVA. No es un servicio público: sin cuenta de Drenpos no devuelve datos.",
    representativeQueries: [
      "¿Qué ERP se puede conectar a ChatGPT o Claude por MCP?",
      "¿Cómo consultar mis ventas desde ChatGPT?",
      "¿Cuánto cuesta el conector MCP de Drenpos?",
      "¿El conector MCP de Drenpos puede modificar datos?",
    ],
  },
  {
    identifier: urn("product", "terminal-fichaje"),
    displayName: "Terminal de fichaje de Drenpos",
    type: "text/html",
    url: url("/dispositivo-fichaje"),
    description:
      "Terminal de fichaje propio con llavero RFID o QR, sin huella ni datos biométricos, con modo sin conexión. Desde 140 € sin IVA más la licencia de fichaje desde 1 € por usuario y mes sin IVA.",
    representativeQueries: [
      "¿Cuánto cuesta un terminal de fichaje sin huella?",
      "¿Qué reloj de fichaje funciona sin conexión a internet?",
      "¿Qué control horario sirve para cumplir el registro de jornada?",
    ],
  },
];

if (MCP_PUBLIC_URL) {
  entries.push({
    identifier: urn("mcp", "server-card"),
    displayName: "Drenpos MCP (tarjeta del servidor)",
    type: "application/mcp-server-card+json",
    url: url("/.well-known/mcp/server-card.json"),
    description:
      "Tarjeta del servidor MCP de Drenpos: transporte, autenticación y documentación. Uso reservado a clientes con credenciales.",
    representativeQueries: [
      "¿Cuál es la URL del servidor MCP de Drenpos?",
      "¿Cómo se autentica el servidor MCP de Drenpos?",
    ],
  });
}

const catalogo = {
  specVersion: "1.0",
  host: {
    displayName: "Drenpos",
    name: "Drenpos",
    identifier: "did:web:www.drenpos.com",
    url: `${SITE}/`,
    documentationUrl: url("/llms.txt"),
    description: DESCRIPCION_HOST,
  },
  entries,
};

export const GET: APIRoute = () =>
  new Response(JSON.stringify(catalogo, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
