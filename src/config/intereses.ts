// Opciones de "¿Qué te interesa?" del formulario de demo (DemoForm).
// El tipo `Interes` sale de esta lista: para añadir una landing con su propio
// interés, añade aquí la opción y ya se puede usar <DemoForm interes="..." />.
export const INTERESES = [
  { value: "almacen", label: "Almacén e inventario" },
  { value: "fichaje", label: "Control horario y fichaje" },
  { value: "tpv", label: "TPV de tienda" },
  { value: "hosteleria", label: "TPV de bar o restaurante" },
  { value: "verifactu", label: "Facturación Verifactu" },
  { value: "mcp", label: "Conector MCP para ChatGPT o Claude" },
  { value: "deca", label: "Documento de control del transporte (DeCA)" },
  { value: "sat", label: "Partes de trabajo y órdenes de servicio (SAT)" },
  { value: "ropa", label: "Tienda de ropa y calzado (tallas y colores)" },
  { value: "todo", label: "Todo el sistema" },
] as const;

export type Interes = (typeof INTERESES)[number]["value"];
