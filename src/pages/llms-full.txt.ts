import type { APIRoute } from "astro";

export const prerender = true;
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BASE = "https://www.drenpos.com";

function readContentDir(dir: string, urlPrefix: string): string {
  const absDir = path.join(process.cwd(), "src/content", dir);
  const sections: string[] = [];
  try {
    const files = fs
      .readdirSync(absDir)
      .filter((f) => f.endsWith(".md") && !f.startsWith("-"));

    for (const f of files) {
      const raw = fs.readFileSync(path.join(absDir, f), "utf-8");
      const { data, content } = matter(raw);
      const slug = f.replace(".md", "");
      sections.push(
        `## ${data.title || slug}\n\nURL: ${BASE}/${urlPrefix}/${slug}\n\n${content.trim()}`
      );
    }
  } catch {
    // dir missing
  }
  return sections.join("\n\n---\n\n");
}

function readSectionFile(filename: string): string {
  const filePath = path.join(process.cwd(), "src/content/sections", filename);
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    return JSON.stringify(data, null, 2);
  } catch {
    return "";
  }
}

export const GET: APIRoute = () => {
  const blogContent = readContentDir("blog", "blog");
  const localContent = readContentDir("local", "local");

  const pricingData = readSectionFile("pricing.md");
  const modulesData = readSectionFile("modules.md");
  const faqData = readSectionFile("faq.md");
  const featuresData = readSectionFile("features.md");
  const featureAllIn = readSectionFile("feature-all-in-one.md");
  const plansComparison = readSectionFile("plans-comparison.md");

  const body = `# Drenpos — Contenido completo para indexación LLM

Fuente: ${BASE}
Última actualización: ${new Date().toISOString().split("T")[0]}
Idioma: Español
Producto: ERP SaaS modular para pymes en España
Email: administracion@drenpos.com
Teléfono: +34 640 315 259
Ubicación: Extremadura, España

---

# Sobre Drenpos

Drenpos es una plataforma ERP SaaS de nueva generación diseñada para centralizar y optimizar las operaciones críticas de empresas españolas. Ofrece gestión de inventario multialmacén, ventas, TPV, facturación electrónica (Verifactu / AEAT), control horario laboral y módulo médico.

Propuesta de valor:
- Sistema asistido con soporte humano real
- Sin costes ocultos por volumen de uso
- Modularidad real: activa solo lo que necesitas
- Cumplimiento normativo: Verifactu (Real Decreto 1007/2023), Ley de Registro Horario
- Implantación sin coste inicial + 4 meses soporte + suscripción plana

Web: ${BASE}
Contacto: ${BASE}/contact
Demo gratuita: ${BASE}/contact
Registro: https://contract.drenpos.com/auth

---

# Páginas de solución (almacén)

La gestión de almacén es la especialidad de Drenpos e incluye capacidades de nivel WMS dentro del módulo de Inventario, sin sistema adicional que sincronizar:

- ${BASE}/software-gestion-almacen — SGA/WMS general: multialmacén, ubicaciones con QR, lotes y series, FIFO/LIFO/FEFO, reservas de stock, trazabilidad con informe de recall, inventarios parciales e informes de rotación e inmovilizado.
- ${BASE}/software-preparacion-pedidos-picking — preparación de pedidos y expedición: semáforo de preparabilidad, etiqueta QR por pedido, asistente de picking móvil, oleadas pick-to-box, zona de preparados con QR y expedición con escaneo que genera albarán o factura.
- ${BASE}/software-gestion-palets — gestión de palets y etiqueta SSCC: el palet como unidad logística con SSCC GS1-128 generado desde el propio palet, ciclo de vida abierto, cerrado y pesado (bruto, tara y neto), expedido o anulado, palets propios con origen por línea, mezcla libre de productos, lotes y series, movimiento del palet entero en un escaneo, despaletizado (vaciar, pasar a otro o partir en varios) y palets blindados dentro de albaranes y facturas.
- ${BASE}/software-almacen-frigorifico — almacén frigorífico y de congelados: cadena de frío, alertas de caducidad, operativa de palets en móvil y tablet a pie de cámara, despiece con merma explícita.
- ${BASE}/software-alquiler-huecos-palet — depósito de terceros y alquiler de huecos de palet (3PL): propietario por palet, tarifas por palet/día y kg/día, eventos tarificables automáticos, posición en vivo, simulador, informe del periodo en PDF y actas de entrega firmadas con huella criptográfica sha256.
- ${BASE}/software-almacen-tienda — almacén combinado con TPV para comercio con tienda física.
- ${BASE}/software-produccion-fabricacion — control de producción para talleres y fabricantes: órdenes de trabajo divididas en fases, consumo de materiales por lectura de código con descuento de stock por lote, imputación de tiempos por operario y coste real de fabricación al cerrar la orden, con trazabilidad entre lote de materia prima y lote de producto acabado. Módulo 22 €/mes o plan Producción 50 €/mes, ambos sin IVA.

# Hostelería y conector de IA

- ${BASE}/software-bares-restaurantes — software para bares y restaurantes: TPV con salas y mesas persistentes y editor de mapa de sala, mesas virtuales, ocupación desde la primera consumición, flujo guiado de combinados y extras con precio por opción, pantallas de cocina y barra por familias sincronizadas por consulta cada 3 segundos (sin comandas perdidas ni mezcladas, de 4 a 10 pantallas por local), QR de mesa único con analítica de escaneos, cierre de caja, stock descontado y Verifactu en ticket. Carta digital con alérgenos y varias cartas en las próximas semanas; pedidos y pago desde la mesa en desarrollo. Plan Full 39 €/mes sin IVA con TPV para 5 usuarios; módulo TPV suelto 20,58 €/mes.
- ${BASE}/conector-mcp-ia — conector MCP: enlaza Drenpos con ChatGPT, Claude o cualquier cliente MCP y consulta en lenguaje natural ventas por fechas, compras y ventas netas, clientes, proveedores, productos y stock. Solo lectura, mismos permisos que el usuario tiene en Drenpos, cada usuario conecta su cuenta. 6 €/mes por empresa sin IVA. No es una IA propia: usa el asistente que el cliente ya tiene.

# Facturación Verifactu

- ${BASE}/software-verifactu: software de facturación en modalidad Verifactu para pymes y autónomos. Cada factura genera su registro de facturación con huella (hash) encadenada, sale con código QR y la leyenda VERI*FACTU y el registro se remite a la AEAT desde el propio sistema, con panel de envíos y sin configuración por parte del cliente. Facturas completas, simplificadas y rectificativas, series y numeración configurables, envío al cliente por correo y WhatsApp. Marco normativo: RD 1007/2023 y Orden HAC/1177/2024; fechas del RDL 15/2025 (1 de enero de 2027 para contribuyentes del Impuesto sobre Sociedades y 1 de julio de 2027 para autónomos y resto de obligados). Incluido en todos los planes, desde 19 €/mes sin IVA (plan Essential).

# Control horario y dispositivo de fichaje

- ${BASE}/control-horario — software de control horario y registro de jornada: fichaje por web, app PWA, widget, QR y llavero RFID; calendarios laborales, conceptos de fichaje, sellado inalterable y reportes para la Inspección de Trabajo.
- ${BASE}/dispositivo-fichaje — terminal de fichaje fabricado por Drenpos: lectura de llavero RFID y código QR, pantalla de estado con nombre y foto del empleado, alimentación a 12 V y 3 A (fuente, batería o mechero del vehículo), WiFi con antena externa, placa electrónica propia (revisión v2), carcasa impresa en 3D en PETG con el logo del cliente, actualizaciones de firmware desde su panel web, sin biometría. Desde 140 € sin IVA con llaveros personalizados; licencia de fichaje desde 1 €/usuario/mes. Se vende suelto o con el sistema.

Unidades logísticas: cada palet nace con su etiqueta SSCC estándar GS1 imprimible, con ciclo de vida completo (abierto, cerrado y pesado con bruto/tara/neto, expedido o anulado), mezcla libre de productos, lotes y series, movimiento del palet entero en un escaneo, despaletizado y división en varios palets nuevos ya etiquetados, y palets blindados dentro de albaranes y facturas.

---

# Planes y Precios

${pricingData}

---

# Módulos

${modulesData}

---

# Comparativa de planes

${plansComparison}

---

# Características

${featuresData}

---

# Todo en un solo sitio

${featureAllIn}

---

# Preguntas Frecuentes

${faqData}

---

# Blog — Artículos

${blogContent}

---

# Contenido por ciudad

${localContent}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
