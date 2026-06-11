import type { APIRoute } from "astro";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BASE = "https://www.drenpos.com";

function getContentLinks(dir: string, urlPrefix: string): string[] {
  const absDir = path.join(process.cwd(), "src/content", dir);
  try {
    return fs
      .readdirSync(absDir)
      .filter((f) => f.endsWith(".md") && !f.startsWith("-"))
      .map((f) => {
        const raw = fs.readFileSync(path.join(absDir, f), "utf-8");
        const { data } = matter(raw);
        const slug = f.replace(".md", "");
        const title = data.title || slug;
        const desc = data.description
          ? `: ${data.description.slice(0, 120)}`
          : "";
        return `- [${title}](${BASE}/${urlPrefix}/${slug})${desc}`;
      });
  } catch {
    return [];
  }
}

export const GET: APIRoute = () => {
  const blogLinks = getContentLinks("blog", "blog");
  const localLinks = getContentLinks("local", "local");

  const content = `# Drenpos

> Drenpos es una plataforma ERP SaaS modular para pymes y autónomos en España. Centraliza inventario, ventas, control horario y facturación electrónica con cumplimiento Verifactu (AEAT). Sin costes ocultos por uso. Soporte humano incluido. Web: ${BASE}

---

## Qué es Drenpos

Drenpos es un ecosistema de gestión empresarial 100% en la nube diseñado para pequeñas y medianas empresas españolas. Permite activar únicamente los módulos necesarios: almacén multialmacén, TPV, facturación, control horario y módulo médico.

**Propuesta de valor:**
- Sistema asistido con soporte humano real, no bots
- Sin costes ocultos por volumen de datos, transacciones o usuarios
- Modularidad real: activa solo lo que necesitas, crece cuando tu negocio lo pida
- Cumplimiento normativo: Verifactu (Real Decreto 1007/2023), Ley de Registro Horario
- Implantación rápida: configuración en días, no meses
- Soporte en español con respuesta ≤24h laborables

**Dirigido a:** pymes, autónomos y cualquier empresa española que quiera centralizar sus operaciones sin hojas de cálculo ni múltiples programas.

---

## Planes y Precios

### Plan Essential — 19€/mes (17.10€/mes anual)
Para autónomos y gestión administrativa básica.
- 2 usuarios incluidos
- Módulo Financiero (facturación, Verifactu)
- Módulo Informes
- Módulo Fichajes (control horario)
- Envío de documentos por email
- Sistema cloud, copias de seguridad diarias, multidispositivo

### Plan Pro — 29€/mes (26.10€/mes anual) ★ Recomendado
Para negocios con control de stock.
- 3 usuarios incluidos
- Todo lo de Essential
- Módulo Inventario (almacén, stock, lotes)

### Plan Full — 39€/mes (35.10€/mes anual)
Para negocios con local físico y punto de venta.
- 5 usuarios incluidos
- Todo lo de Pro
- Módulo TPV (terminal punto de venta)

### Plan a Medida — Precio personalizado
Para empresas con necesidades específicas. Estudio integral, desarrollo a medida, integraciones con sistemas existentes y formación personalizada.

**Condiciones generales de todos los planes:**
- Sin permanencia ni costes de instalación
- Actualizaciones automáticas incluidas
- Precios con IVA incluido
- Descuento 10% en suscripción anual
- Los módulos no incluidos se pueden añadir como módulos adicionales

---

## Módulos disponibles

### Módulo Financiero — 19.90€/mes (incluido en Essential, Pro, Full)
- Verifactu (facturación inalterable según normativa AEAT)
- Gestión de ofertas, pedidos, albaranes y facturas
- Control de clientes y proveedores
- Gestión de pagos y cobros
- Gestión de impuestos
- Remesas bancarias SEPA
- Reportes e informes

### Módulo Inventario — 19.90€/mes (incluido en Pro y Full)
- Gestión de artículos
- Control de almacenes y ubicaciones
- Gestión de stock en tiempo real
- Control de lotes y trazabilidad completa

### Módulo TPV — 24.90€/mes (incluido en Full)
- Terminal punto de venta
- Gestión de tickets y cajas
- Cierre de caja diario

### Módulo Comercial — 19.90€/mes (opcional)
- Gestión de agentes comerciales
- Control de comisiones
- Análisis de ventas por comercial

### Módulo Fichajes — 1.09€/mes por usuario (incluido en todos los planes)
- Registro de jornada laboral
- Control de asistencia
- Gestión de fichajes
- Informes de presencia
- Cumplimiento Ley de Registro Horario

### Módulo Usuarios adicional — 3.90€/mes por usuario
- Usuario adicional al sistema
- Gestión de permisos por área
- Acceso multidispositivo sin límite de dispositivos

### Módulo Informes — 6.90€/mes (incluido en todos los planes)
- Informes avanzados y KPIs personalizables
- Análisis de datos y rentabilidad
- Exportación de datos

### Envío por correo — 4.90€/mes (incluido en todos los planes)
- Envío de facturas y documentos por email sin salir del sistema
- Plantillas personalizables
- Envío automático

### Módulo Cloud Storage — 4.90€/mes (opcional)
- Integración con Dropbox
- Almacenamiento en la nube de documentos y anexos
- Sincronización automática

---

## Características clave

### Control de stock sin inventarios eternos
- Gestión de almacén con ubicaciones, movimientos en tiempo real y alertas automáticas
- Reduce hasta un 35% el tiempo en inventarios
- Multi-almacén con ubicaciones: organiza por almacén, zona y ubicación específica
- Trazabilidad completa: histórico de entradas, salidas y movimientos con registro de usuario y fecha

### Verifactu listo desde el primer día
- Registro inalterable de todas las facturas (normativa AEAT)
- Generación automática de QR de verificación
- Trazabilidad completa para inspecciones
- Actualizado con cambios normativos automáticamente

### Todo conectado en un solo sitio
- Ventas, stock, finanzas y control horario en un único panel
- Cada acción actualiza lo que tiene que actualizar sin duplicar datos
- Se adapta al negocio: activa módulos según necesidad, desactiva lo que no uses
- Roles por usuario: almacén ve almacén, ventas ve ventas, administración ve todo

### Acceso total desde cualquier lugar
- 100% cloud, cero instalaciones ni servidores propios
- Móvil, tablet u ordenador sin configuraciones complejas
- Stock en tiempo real por almacén, zona o ubicación
- Ventas unificadas: presupuestos, pedidos, albaranes y facturas desde el mismo panel

---

## Por qué elegir Drenpos (ventajas frente a alternativas)

Frente a Excel u hojas de cálculo:
- Datos en tiempo real sin riesgo de versiones desactualizadas
- Sin límite de usuarios accediendo simultáneamente
- Registros inalterables para cumplimiento normativo

Frente a otros ERP:
- Implantación en días, no en meses
- Sin costes ocultos por uso, transacciones o módulos activos
- Soporte humano en español, no bots ni tickets sin respuesta
- Precio transparente desde 19€/mes

---

## Preguntas frecuentes

**¿Qué es Drenpos y para quién está pensado?**
ERP modular para PYMEs y autónomos en España. Centraliza stock, ventas, finanzas (Verifactu) e informes en una sola plataforma.

**¿Cumple con Verifactu y la AEAT?**
Sí. Facturación con series por periodo, registros inalterables, firma digital y preparación de envíos a AEAT.

**¿Cuánto tardaremos en tenerlo operativo?**
Implantación estándar en pocos días: configuración de empresa, importación de artículos/clientes/proveedores y carga de stock inicial.

**¿Puedo importar mis datos actuales?**
Sí. Servicio de importación de datos desde otros sistemas incluido.

**¿Dónde se alojan los datos?**
Alojamiento en la UE, copias de seguridad diarias, monitorización de disponibilidad continua.

**¿Hay demo o prueba gratuita?**
Sí. Demo guiada gratuita de 20 minutos + 15 días de prueba gratuita sin tarjeta de crédito.

**¿Qué soporte ofrecéis?**
Soporte en español con respuesta ≤24h laborables. Acompañamiento humano en el arranque.

**¿Cómo funcionan los precios?**
Por módulos y usuarios. Sin permanencia ni costes de instalación. Crece cuando tu negocio lo necesite.

---

## Contacto

- **Web:** ${BASE}
- **Contacto / Demo:** ${BASE}/contact
- **Email:** administracion@drenpos.com
- **Teléfono:** +34 640 315 259
- **Ubicación:** Extremadura, España
- **Registro gratuito:** https://contract.drenpos.com/auth

---

## Páginas principales

- [Inicio](${BASE}/): Visión general del ecosistema Drenpos
- [Funcionalidades](${BASE}/funcionalidades): Módulos y capacidades del ERP
- [Control Horario](${BASE}/control-horario): Software de control horario laboral
- [Precios](${BASE}/pricing): Planes Essential, Pro, Full y a Medida
- [Módulos](${BASE}/modulos): Detalle de cada módulo activable y precios
- [Integraciones](${BASE}/integrations): Conectores y compatibilidades
- [Sobre nosotros](${BASE}/about): Equipo y filosofía
- [Contacto](${BASE}/contact): Demo gratuita y consultas comerciales
- [FAQ](${BASE}/faq): Preguntas frecuentes
- [Blog](${BASE}/blog): Artículos sobre ERP, gestión empresarial y normativa

---

## Artículos del blog

${blogLinks.join("\n")}

---

## Contenido local por ciudad

${localLinks.join("\n")}

---

*Drenpos: ERP SaaS modular para pymes en España. Sin costes ocultos. Soporte humano. Verifactu incluido.*
*Generado: ${new Date().toISOString().split("T")[0]}*
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
