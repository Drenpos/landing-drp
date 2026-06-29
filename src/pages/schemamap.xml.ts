import { createSchemaMap } from "@jdevalk/astro-seo-graph";
import config from "@/config/config.json";

const SITE_URL = config.site.base_url;

export const prerender = true;

export const GET = createSchemaMap({
  siteUrl: SITE_URL,
  entries: [
    {
      path: "/schema/post.json",
      lastModified: new Date(),
    },
  ],
});
