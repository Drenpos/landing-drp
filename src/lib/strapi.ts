interface Props {
  endpoint: string;
  query?: Record<string, string>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
}

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from
 * @param query - The query parameters to add to the url
 * @param wrappedByKey - The key to unwrap the response from
 * @param wrappedByList - If the response is a list, unwrap it
 * @returns
 */
export default async function fetchApi<T>({
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
}: Props): Promise<T> {
  if (endpoint.startsWith("/")) {
    endpoint = endpoint.slice(1);
  }

  const url = new URL(`${import.meta.env.STRAPI_URL}/api/${endpoint}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  // Si hay token en build, autentica (permite API privada). Si no, va público.
  const token = import.meta.env.STRAPI_API_TOKEN;
  const res = await fetch(
    url.toString(),
    token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
  );
  let data: any = await res.json();

  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  if (wrappedByList) {
    data = data[0];
  }

  return data as T;
}

// ── Tipos crudos Strapi (v5 plano, con fallback v4 `attributes`) ──────────

interface StrapiMedia {
  url?: string;
  // fallback v4
  data?: { attributes?: { url?: string } } | null;
}

// El campo image puede llegar como objeto (single) o array (multiple media)
type StrapiImage = string | StrapiMedia | StrapiMedia[];

interface StrapiAuthor {
  name?: string;
  designation?: string;
  avatar?: string | StrapiMedia;
}

interface StrapiHero {
  title?: string;
  description?: string;
}

export interface StrapiPost {
  id: number;
  documentId?: string;
  attributes?: Omit<StrapiPost, "id" | "attributes">; // v4
  title?: string;
  slug?: string;
  meta_title?: string;
  description?: string;
  date?: string;
  image?: StrapiImage;
  author?: StrapiAuthor;
  hero?: StrapiHero;
  categories?: string[];
  tags?: string[];
  featured?: boolean;
  body?: string;
}

// Forma que esperan las collections Astro (= frontmatter de los .md)
export interface BlogFrontmatter {
  title: string;
  meta_title?: string;
  description?: string;
  date?: Date;
  image?: string;
  author?: { name: string; designation: string; avatar: string };
  hero?: { title: string; description?: string };
  categories: string[];
  tags?: string[];
  featured?: boolean;
  draft?: boolean;
}

const SITE = () => import.meta.env.STRAPI_URL?.replace(/\/$/, "") ?? "";

/**
 * Resuelve URL de imagen:
 * - string  → ruta tal cual (campo texto: ruta del site Astro `/images/...` o URL completa)
 * - array   → primer elemento (campo Multiple media)
 * - Media   → prefija STRAPI_URL si la url de Strapi es relativa (`/uploads/...`)
 */
function resolveMedia(m?: StrapiImage): string | undefined {
  if (!m) return undefined;
  if (Array.isArray(m)) return resolveMedia(m[0]);
  if (typeof m === "string") return m; // ruta del site, no tocar
  const url = m.url ?? m.data?.attributes?.url ?? undefined;
  if (!url) return undefined;
  return /^https?:\/\//.test(url) ? url : `${SITE()}${url}`;
}

/** Aplana un post Strapi (v4/v5) al frontmatter que consumen los componentes */
export function mapStrapiPost(raw: StrapiPost): {
  slug: string;
  body: string;
  data: BlogFrontmatter;
} {
  const f = { ...(raw.attributes ?? {}), ...raw } as StrapiPost;

  const slug = f.slug ?? String(raw.documentId ?? raw.id);

  const avatar = resolveMedia(f.author?.avatar) ?? "/images/logo.svg";

  return {
    slug,
    body: f.body ?? "",
    data: {
      title: f.title ?? "Sin título",
      meta_title: f.meta_title,
      description: f.description,
      date: f.date ? new Date(f.date) : undefined,
      image: resolveMedia(f.image),
      author: f.author
        ? {
            name: f.author.name ?? "Admin",
            designation: f.author.designation ?? "",
            avatar,
          }
        : undefined,
      hero: f.hero?.title
        ? { title: f.hero.title, description: f.hero.description }
        : undefined,
      categories: f.categories?.length ? f.categories : ["others"],
      tags: f.tags,
      featured: f.featured,
      draft: false, // Strapi sirve solo publicados por defecto
    },
  };
}

/** Trae todos los posts publicados de un content-type Strapi (paginado completo) */
export async function fetchStrapiPosts(
  pluralApiId: string
): Promise<StrapiPost[]> {
  const all: StrapiPost[] = [];
  let page = 1;
  const pageSize = 100;

  while (true) {
    const res = await fetchApi<{
      data: StrapiPost[];
      meta?: { pagination?: { pageCount?: number } };
    }>({
      endpoint: pluralApiId,
      query: {
        populate: "*",
        "pagination[page]": String(page),
        "pagination[pageSize]": String(pageSize),
        sort: "date:desc",
      },
    });

    const batch = res?.data ?? [];
    all.push(...batch);

    const pageCount = res?.meta?.pagination?.pageCount ?? 1;
    if (page >= pageCount || batch.length === 0) break;
    page += 1;
  }

  return all;
}
