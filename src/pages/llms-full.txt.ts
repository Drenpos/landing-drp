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
- ${BASE}/software-almacen-frigorifico — almacén frigorífico y de congelados: cadena de frío, alertas de caducidad, operativa de palets en móvil y tablet a pie de cámara, despiece con merma explícita.
- ${BASE}/software-alquiler-huecos-palet — depósito de terceros y alquiler de huecos de palet (3PL): propietario por palet, tarifas por palet/día y kg/día, eventos tarificables automáticos, posición en vivo, simulador, informe del periodo en PDF y actas de entrega firmadas con huella criptográfica sha256.
- ${BASE}/software-almacen-tienda — almacén combinado con TPV para comercio con tienda física.
- ${BASE}/software-produccion-fabricacion — control de producción para talleres y fabricantes: órdenes de trabajo divididas en fases, consumo de materiales por lectura de código con descuento de stock por lote, imputación de tiempos por operario y coste real de fabricación al cerrar la orden, con trazabilidad entre lote de materia prima y lote de producto acabado. Módulo 22 €/mes o plan Producción 50 €/mes, ambos sin IVA.

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
