# Componentes de Módulos y Comparativa de Planes

## 📋 Descripción

Sistema completo de tablas responsive para mostrar módulos de Drenpos y comparar planes. Incluye **dos componentes principales**:

1. **ModulesTableCollapsible**: Tabla colapsable de módulos con precios
2. **PlansComparison**: Tabla de comparación entre Plan Financiero y Plan Pyme

---

## 📂 Ubicación de Archivos

### Componentes Astro

- **Tabla de Módulos Colapsable**: `/src/layouts/partials/ModulesTableCollapsible.astro`
- **Comparativa de Planes**: `/src/layouts/partials/PlansComparison.astro`
- **Tabla Original (legacy)**: `/src/layouts/partials/ModulesTable.astro`

### Archivos de Datos

- **Módulos**: `/src/content/sections/modules.md`
- **Comparativa**: `/src/content/sections/plans-comparison.md`
- **Precios**: `/src/content/sections/pricing.md`

### Páginas

- **Página Principal**: `/src/pages/modulos.astro`

---

## 🆕 1. Tabla Colapsable de Módulos

### Características

✅ **Expandible/Colapsable**: Click en cualquier fila para ver detalles  
✅ **Responsive**: Tabla en desktop, tarjetas en móvil  
✅ **Toggle de Precios**: Cambio entre mensual y anual (10% dto)  
✅ **Sin "Incluido en"**: Solo muestra módulos y precios  
✅ **Animaciones suaves**: Transiciones al expandir

### Uso Básico

```astro
---
import ModulesTableCollapsible from "@/partials/ModulesTableCollapsible.astro";
---

<ModulesTableCollapsible isSection={false} showPricing={true} />
```

### Props

| Prop          | Tipo      | Default | Descripción              |
| ------------- | --------- | ------- | ------------------------ |
| `isSection`   | `boolean` | `true`  | Añade padding de sección |
| `showPricing` | `boolean` | `true`  | Muestra precios y toggle |

### Vista Desktop

**Estructura de la tabla:**

```
[▶] | Módulo Financiero          | Incluido
[▶] | Módulo CRM                 | 9.90 € /mes
```

**Al hacer click:**

```
[▼] | Módulo CRM                 | 9.90 € /mes
    └─ Descripción: Gestión de relaciones...
       Características:
       ✓ Seguimiento de oportunidades
       ✓ Historial de clientes
       ✓ Pipeline de ventas
```

### Vista Móvil

Tarjetas individuales con:

- Header siempre visible (icono + nombre + precio)
- Click para expandir detalles
- Chevron que rota al expandir

---

## 🆕 2. Tabla de Comparación de Planes

### Características

✅ **Comparación clara**: Planes en columnas (X), características en filas (Y)  
✅ **Indicadores visuales**: ✓ incluido, ✗ no incluido  
✅ **Valores numéricos**: Para cantidades (ej: 2 usuarios)  
✅ **Responsive**: Tabla en desktop, tarjetas en móvil  
✅ **Solo planes estándar**: Excluye "Plan a Medida"

### Uso Básico

```astro
---
import PlansComparison from "@/partials/PlansComparison.astro";
---

<PlansComparison isSection={true} />
```

### Props

| Prop        | Tipo      | Default | Descripción              |
| ----------- | --------- | ------- | ------------------------ |
| `isSection` | `boolean` | `true`  | Añade padding de sección |

### Vista Desktop

```
┌───────────────────────────┬──────────────┬────────────┐
│ Características           │ Financiero   │ Pyme       │
├───────────────────────────┼──────────────┼────────────┤
│ CARACTERÍSTICAS GENERALES                             │
├───────────────────────────┼──────────────┼────────────┤
│ Usuarios incluidos        │ 1            │ 2          │
│ Sistema en la nube        │ ✓            │ ✓          │
├───────────────────────────┼──────────────┼────────────┤
│ MÓDULOS INCLUIDOS                                     │
├───────────────────────────┼──────────────┼────────────┤
│ Módulo Financiero         │ ✓            │ ✓          │
│ Módulo Almacén            │ ✗            │ ✓          │
│ Módulo TPV                │ ✗            │ Hasta 2026 │
└───────────────────────────┴──────────────┴────────────┘
```

### Vista Móvil

Una tarjeta por plan con todas las características listadas dentro.

---

## 🎨 Sistema de Colores

Ambos componentes usan el mismo sistema rotativo:

Ambos componentes usan el mismo sistema rotativo:

- 🟢 Verde: `#00FF99` / `#D1FADF`
- 🟣 Morado: `#D735D7` / `#FFEAFF`
- 🟠 Naranja: `#FF7A28` / `#FFFBF9`
- 🔴 Rojo: `#FF7575` / `#FDF2F2`
- 🔵 Azul: `#5C96FF` / `#EEF4FF`
- 🟣 Violeta: `#9966FF` / `#F1EAFF`

---

## 📊 Estructura de Datos

### Módulos (`modules.md`)

```yaml
---
title: "Módulos Drenpos"
modules:
  - name: "Módulo CRM"
    description: "Gestión de relaciones con clientes..."
    price_monthly: "9.90 €"
    price_yearly: "8.91 €"
    included_in: [] # Vacío = módulo adicional
    features:
      - "Seguimiento de oportunidades"
      - "Historial de clientes"
---
```

### Comparativa de Planes (`plans-comparison.md`)

```yaml
---
plans:
  - id: "financiero"
    name: "Plan Financiero"
  - id: "pyme"
    name: "Plan Pyme"

features:
  - category: "Características generales"
    items:
      - name: "Usuarios incluidos"
        financiero: 1 # Número
        pyme: 2
      - name: "Sistema en la nube"
        financiero: true # Booleano
        pyme: true

modules:
  - category: "Módulos incluidos"
    items:
      - name: "Módulo TPV"
        financiero: false
        pyme: "Hasta fin 2026" # String para casos especiales
---
```

---

## 🚀 Implementación Completa

### En la página `/modulos`

```astro
---
import Base from "@/layouts/Base.astro";
import PageHeader from "@/partials/PageHeader.astro";
import ModulesTableCollapsible from "@/partials/ModulesTableCollapsible.astro";
import PlansComparison from "@/partials/PlansComparison.astro";
import CallToAction from "@/partials/CallToAction.astro";
---

<Base title="Módulos Drenpos">
  <PageHeader title="Módulos y Planes" description="..." />

  {/* 1. Tabla de módulos colapsable */}
  <div class="section-up pb-0">
    <ModulesTableCollapsible isSection={false} showPricing={true} />
  </div>

  {/* 2. Comparativa de planes */}
  <PlansComparison isSection={true} />

  <CallToAction />
</Base>
```

---

## 💡 Casos de Uso

### Solo mostrar módulos (sin comparativa)

```astro
<ModulesTableCollapsible isSection={true} showPricing={true} />
```

### Solo mostrar comparativa (sin módulos)

```astro
<PlansComparison isSection={true} />
```

### Mostrar módulos sin precios

```astro
<ModulesTableCollapsible
  isSection={true}
  showPricing={false}
  {/* Oculta precios y toggle */}
/>
```

---

## ✏️ Añadir Nuevo Módulo

Edita `/src/content/sections/modules.md`:

```yaml
modules:
  - name: "Módulo Nuevo"
    description: "Descripción completa..."
    price_monthly: "15.90 €"
    price_yearly: "14.31 €"
    included_in: [] # o ["Plan Pyme"] si está incluido
    features:
      - "Característica 1"
      - "Característica 2"
```

## ✏️ Actualizar Comparativa de Planes

Edita `/src/content/sections/plans-comparison.md`:

### Añadir nueva característica:

```yaml
features:
  - category: "Características generales"
    items:
      # ... existentes
      - name: "Nueva característica"
        financiero: true
        pyme: true
```

### Añadir nuevo módulo a la comparativa:

```yaml
modules:
  - category: "Módulos incluidos"
    items:
      # ... existentes
      - name: "Módulo Nuevo"
        financiero: false
        pyme: true
```

---

## 🎭 Interacciones JavaScript

### Tabla Colapsable

**Desktop:**

- Click en fila completa → expande/colapsa
- Click en botón chevron → expande/colapsa
- Chevron rota 90° al expandir

**Móvil:**

- Click en tarjeta → expande/colapsa
- Chevron rota 180° al expandir

### Toggle de Precios

- Switch cambia entre mensual/anual
- Precios se actualizan con animación
- Texto descriptivo cambia ("/mes" ↔ "/mes (dto. 10%)")

---

## 📱 Responsive Breakpoints

| Breakpoint | Componente              | Vista                |
| ---------- | ----------------------- | -------------------- |
| < 1024px   | ModulesTableCollapsible | Tarjetas colapsables |
| ≥ 1024px   | ModulesTableCollapsible | Tabla colapsable     |
| < 768px    | PlansComparison         | Tarjetas por plan    |
| ≥ 768px    | PlansComparison         | Tabla comparativa    |

---

## 🎨 Clases CSS Importantes

### Tabla Colapsable

- `.module-row` - Fila principal
- `.module-details` - Fila expandible
- `.module-toggle-btn` - Botón de expandir
- `.chevron-icon` - Icono que rota
- `.module-price-monthly` - Precio que cambia

### Comparativa

- `.comparison-table` - Tabla principal
- Check verde: `bg-primary/10 text-primary`
- Cross gris: `bg-dark/5 text-text/30`

---

## ⚠️ Notas Importantes

1. **Plan Custom NO incluido**: La comparativa solo muestra Plan Financiero y Plan Pyme
2. **Valores flexibles**: Soporta `boolean`, `number` y `string` en las celdas
3. **Animaciones AOS**: Se inicializan automáticamente
4. **Eventos de página**: Script se reinicializa en navegación SPA

---

## 🔧 Compatibilidad

- ✅ Astro 5.x
- ✅ Tailwind CSS 4.x
- ✅ Content Collections
- ✅ Todos los navegadores modernos
- ✅ Responsive en todos los dispositivos

---

## 📚 Componente Legacy

El componente original `ModulesTable.astro` sigue disponible pero se recomienda usar `ModulesTableCollapsible.astro` para la nueva funcionalidad colapsable.
