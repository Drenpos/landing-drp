import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// homepage
const homepageCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/homepage",
  }),
  schema: z.object({
    banner: z.object({
      title: z.string(),
      content: z.string(),
      main_image: z.object({
        src: z.string(),
        alt: z.string(),
      }),
      background_image: z.object({
        src: z.string(),
        alt: z.string(),
      }),
      buttons: z.array(
        z.object({
          enable: z.boolean(),
          label: z.string(),
          link: z.string(),
        }),
      ),
    }),
    solution_section: z.object({
      enable: z.boolean(),
      title: z.string(),
      content: z.string(),
      badge: z.string(),
      cards: z.array(
        z.object({
          title: z.string(),
          content: z.string(),
          icon: z.string(),
        }),
      ),
    }),
    problems_section: z.object({
      enable: z.boolean(),
      title: z.string(),
      content: z.string(),
      badge: z.string(),
      cards: z.array(
        z.object({
          title: z.string(),
          content: z.string(),
          icon: z.string(),
        }),
      ),
    }),
    features: z.array(
      z.object({
        title: z.string(),
        image: z.string(),
        content: z.string(),
        bulletpoints: z.array(z.string()),
        button: z.object({
          enable: z.boolean(),
          label: z.string().optional(),
          link: z.string().optional(),
        }),
      }),
    ),
  }),
});

// about
const aboutCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/about",
  }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string(),
    image: z.string(),

    hero: z.object({
      title: z.string(),
      description: z.string(),
      image: z.string(),
    }),

    card: z.object({
      title: z.string(),
      subtitle: z.string(),
      description: z.string(),
      icon: z.string(),
    }),

    accomplishments: z.object({
      enable: z.boolean(),
      list: z.array(
        z.object({
          number: z.string(),
          prefix: z.string().optional(),
          subtitle: z.string(),
        }),
      ),
    }),
  }),
});

// Post collection schema
const blogCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/blog",
  }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    date: z.date().optional(),
    image: z.string().optional(),
    author: z
      .object({
        name: z.string().default("Admin"),
        avatar: z.string(),
        designation: z.string(),
      })
      .optional(),
    categories: z.array(z.string()).default(["others"]),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    hero: z
      .object({
        title: z.string(),
        description: z.string().optional(),
      })
      .optional(),
  }),
});
// Post collection schema
const localCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/local",
  }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    date: z.date().optional(),
    image: z.string().optional(),
    author: z
      .object({
        name: z.string().default("Admin"),
        avatar: z.string(),
        designation: z.string(),
      })
      .optional(),
    categories: z.array(z.string()).default(["others"]),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    hero: z
      .object({
        title: z.string(),
        description: z.string().optional(),
      })
      .optional(),
  }),
});

// Features Collection
const featuresCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/features",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    meta_title: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
    categories: z.array(z.string()).optional(),
    date: z.date().optional(),
    hero: z
      .object({
        title: z.string(),
        description: z.string(),
      })
      .optional(),
    section: z
      .object({
        enable: z.boolean(),
        title: z.string(),
        description: z.string(),
        badge: z.string(),
      })
      .optional(),
  }),
});

// career
const careersCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/careers",
  }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    summary: z.string().optional(),
    location: z.string().optional(),
    duration: z.string().optional(),
    salary: z.string().optional(),
    benefits: z.string().optional(),
    hero: z
      .object({
        title: z.string(),
        description: z.string(),
      })
      .optional(),
    section: z
      .object({
        title: z.string(),
        description: z.string(),
        badge: z.string(),
      })
      .optional(),
  }),
});

// pricingCollection
const pricingCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/pricing",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    meta_title: z.string().optional(),
    image: z.string().optional(),
    hero: z.object({
      title: z.string(),
      description: z.string(),
    }),
  }),
});

// Pages collection schema
const pagesCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/pages" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
    hero: z
      .object({
        title: z.string(),
        description: z.string(),
      })
      .optional(),
  }),
});

// feature section collection
const featureListCollection = defineCollection({
  loader: glob({
    pattern: "feature**.{md,mdx}",
    base: "src/content/sections",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    badge: z.string(),
    list_columns: z.array(
      z.object({
        title: z.string(),
        images: z.array(z.string()),
        description: z.string(),
        list: z
          .array(
            z.object({
              icon: z.string(),
              title: z.string(),
              description: z.string(),
            }),
          )
          .optional(),
        list_check: z.array(z.string()).optional(),
        button: z
          .object({
            enable: z.boolean(),
            label: z.string(),
            link: z.string(),
          })
          .optional(),
      }),
    ),
  }),
});

// pricingPlanCollection
const pricingPlanCollection = defineCollection({
  loader: glob({
    pattern: "pricing.{md,mdx}",
    base: "src/content/sections",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    badge: z.string(),
    plans_labels: z.array(z.string()),
    plans: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        price_prefix: z.string(),
        price_monthly: z.string(),
        price_yearly: z.string(),
        price_description_monthly: z.string(),
        price_description_yearly: z.string(),
        features: z.array(z.string()),
        badge: z.object({
          enable: z.boolean(),
          label: z.string(),
        }),
        button: z.object({
          enable: z.boolean(),
          label: z.string(),
          link: z.string(),
        }),
      }),
    ),
  }),
});

// integrationsPageCollection
const integrationsPageCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/integrations",
  }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string(),
    image: z.string().optional(),
    hero: z.object({
      title: z.string(),
      description: z.string(),
      image: z.string().optional(),
    }),
    integrations_section: z.object({
      title: z.string(),
      description: z.string(),
      badge: z.string(),
      list: z.array(
        z.object({
          name: z.string(),
          image: z.string(),
          description: z.string(),
          button: z.object({
            enable: z.boolean(),
            label: z.string().optional(),
            link: z.string(),
          }),
          list: z.array(z.string()).optional(),
        }),
      ),
    }),
  }),
});

// changelogPageCollection
const changelogPageCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/changelog",
  }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string(),
    image: z.string().optional(),
    hero: z.object({
      title: z.string(),
      description: z.string(),
    }),
    list: z.array(
      z.object({
        version: z.string(),
        title: z.string(),
        date: z.string(),
        image: z.string(),
        content: z.string(),
      }),
    ),
  }),
});

// contactPageCollection
const contactPageCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/contact",
  }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string(),
    draft: z.boolean().optional(),
    contact_section: z.object({
      title: z.string(),
      description: z.string(),
      form: z.object({
        title: z.string(),
        description: z.string(),
      }),
      list: z.array(
        z.object({
          icon: z.string(),
          title: z.string(),
          description: z.string(),
        }),
      ),
    }),
  }),
});

// caseStudiesPageCollection
const caseStudiesPageCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/case-studies",
  }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string(),
    image: z.string().optional(),
    hero: z
      .object({
        title: z.string(),
        description: z.string(),
      })
      .optional(),
    categories: z.array(z.string()).optional(),
    date: z.date().optional(),
    draft: z.boolean().optional(),
    author: z
      .object({
        name: z.string(),
        designation: z.string(),
        avatar: z.string().optional(),
      })
      .optional(),
  }),
});

// clientSectionCollection
const clientSectionCollection = defineCollection({
  loader: glob({
    pattern: "clients.{md,mdx}",
    base: "src/content/sections",
  }),
  schema: z.object({
    title: z.string(),
    brands: z.array(
      z.object({
        src: z.string(),
        alt: z.string(),
      }),
    ),
  }),
});

// customerReviewsCollection
const testimonialCollection = defineCollection({
  loader: glob({
    pattern: "testimonial.{md,mdx}",
    base: "src/content/sections",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    badge: z.string(),
    enable: z.boolean(),
    list: z.array(
      z.object({
        name: z.string(),
        designation: z.string(),
        avatar: z.string(),
        rating: z.number().optional(),
        content: z.string(),
      }),
    ),
  }),
});

// ctaSectionCollection
const ctaSectionCollection = defineCollection({
  loader: glob({
    pattern: "call-to-action.{md,mdx}",
    base: "src/content/sections",
  }),
  schema: z.object({
    enable: z.boolean(),
    title: z.string(),
    image: z.string(),
    description: z.string(),
    button: z.object({
      enable: z.boolean(),
      label: z.string(),
      link: z.string(),
    }),
    button_secondary: z.object({
      enable: z.boolean(),
      label: z.string(),
      link: z.string(),
    }),
  }),
});

// teamPageCollection
const teamPageCollection = defineCollection({
  loader: glob({
    pattern: "team.{md,mdx}",
    base: "src/content/sections",
  }),
  schema: z.object({
    title: z.string(),
    badge: z.string(),
    description: z.string(),
    members: z.array(
      z.object({
        name: z.string(),
        image: z.string(),
        position: z.string(),
        social: z.array(
          z.object({
            name: z.string(),
            icon: z.string(),
            link: z.string(),
          }),
        ),
      }),
    ),
  }),
});

// faqPageCollection
const faqSectionCollection = defineCollection({
  loader: glob({
    pattern: "faq.{md,mdx}",
    base: "src/content/sections",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    badge: z.string(),
    exclusive_open: z.boolean().optional(),
    exclusive_open_group: z.string().optional(),
    list: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        active: z.boolean().optional(),
      }),
    ),
  }),
});

// Export collections
export const collections = {
  // pages
  homepage: homepageCollection,
  about: aboutCollection,
  blog: blogCollection,
  local: localCollection,
  careers: careersCollection,
  features: featuresCollection,
  contact: contactPageCollection,
  pricing: pricingCollection,
  pages: pagesCollection,
  integrations: integrationsPageCollection,
  "case-studies": caseStudiesPageCollection,
  changelog: changelogPageCollection,

  // section
  clients: clientSectionCollection,
  cta: ctaSectionCollection,
  featureSection: featureListCollection,
  pricingSection: pricingPlanCollection,
  testimonialSection: testimonialCollection,
  faq: faqSectionCollection,
  teamSection: teamPageCollection,
};
