import { createApiCatalog } from "@jdevalk/astro-seo-graph";
import config from "@/config/config.json";

const SITE_URL = config.site.base_url;

export const prerender = true;

export const GET = createApiCatalog({
  siteUrl: SITE_URL,
  schemaEndpoints: [
    {
      path: "/schema/post.json",
      schemaType: "BlogPosting",
    },
  ],
  schemaMap: { path: "/schemamap.xml" },
  additional: [
    {
      anchor: "/sitemap-index.xml",
      type: "application/xml",
    },
    {
      anchor: "/rss.xml",
      type: "https://www.w3.org/2005/Atom",
    },
    {
      anchor: "/llms.txt",
      type: "text/plain",
    },
  ],
});
