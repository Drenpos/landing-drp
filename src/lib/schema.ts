/**
 * Constructores de JSON-LD para landings. Base.astro ya emite Organization,
 * WebSite y WebPage; aquí solo van los bloques propios de cada página, que
 * apuntan a la Organization por su @id en vez de repetir sus datos.
 *
 * Uso en una landing:
 *   const jsonLd = [
 *     breadcrumb([{ name: "Funcionalidades", path: "/funcionalidades" }, { name: "Control de stock", path: PATH }]),
 *     softwareApp({ name: "Drenpos · Control de Stock", path: PATH, description, featureList, plan: "almacen" }),
 *     faqPage(faqs),
 *   ];
 *   <JsonLd data={jsonLd} />
 */
import { decimal, valor, type ClavePlan, P } from "@/lib/precios";
import { abs, ORG_ID } from "@/lib/site";

type Nodo = Record<string, unknown>;
const CTX = "https://schema.org";

export interface Miga {
  name: string;
  path: string;
}

/** Migas de pan. "Inicio" se añade solo al principio. */
export function breadcrumb(migas: Miga[]): Nodo {
  const todas = [{ name: "Inicio", path: "/" }, ...migas];
  return {
    "@context": CTX,
    "@type": "BreadcrumbList",
    itemListElement: todas.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.name,
      item: abs(m.path),
    })),
  };
}

export interface Pregunta {
  q: string;
  a: string;
}

export function faqPage(faqs: Pregunta[]): Nodo {
  return {
    "@context": CTX,
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Oferta de un plan, con el precio sacado de precios.json. */
export function oferta(plan: ClavePlan, description?: string): Nodo {
  return {
    "@type": "Offer",
    price: decimal(valor(plan)),
    priceCurrency: "EUR",
    valueAddedTaxIncluded: false,
    description:
      description ?? `Plan ${P.planes[plan].nombre}, [[p:${plan}]] al mes sin IVA.`,
    url: abs("/pricing"),
  };
}

export interface App {
  name: string;
  path: string;
  description: string;
  featureList?: string[];
  plan?: ClavePlan;
  offerDescription?: string;
}

export function softwareApp(app: App): Nodo {
  return {
    "@context": CTX,
    "@type": "SoftwareApplication",
    name: app.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: abs(app.path),
    description: app.description,
    ...(app.plan && { offers: oferta(app.plan, app.offerDescription) }),
    ...(app.featureList && { featureList: app.featureList }),
    provider: { "@id": ORG_ID },
  };
}
