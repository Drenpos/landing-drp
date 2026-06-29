import { getCollection } from "astro:content";
import { createSchemaEndpoint } from "@jdevalk/astro-seo-graph";

export const prerender = true;
import {
  buildArticle,
  buildBreadcrumbList,
  buildWebPage,
  makeIds,
} from "@jdevalk/seo-graph-core";
import config from "@/config/config.json";

const SITE_URL = config.site.base_url;
const ids = makeIds({ siteUrl: SITE_URL });
const orgRef = { "@id": `${SITE_URL}/#organization` };

export const GET = createSchemaEndpoint({
  entries: async () => {
    const blog = await getCollection(
      "blog",
      ({ id, data }) => !data.draft && id !== "-index",
    );
    const local = await getCollection(
      "local",
      ({ id, data }) => !data.draft && id !== "-index",
    );
    return [
      ...blog.map((p) => ({ post: p, prefix: "blog" })),
      ...local.map((p) => ({ post: p, prefix: "local" })),
    ];
  },
  mapper: ({ post, prefix }) => {
    const url = `${SITE_URL}/${prefix}/${post.id}`;
    const date = post.data.date ? new Date(post.data.date) : new Date();
    const pieces = [
      buildWebPage(
        {
          url,
          name: post.data.meta_title || post.data.title,
          description: post.data.description || "",
          isPartOf: { "@id": ids.website },
          breadcrumb: { "@id": ids.breadcrumb(url) },
        },
        ids,
      ),
      buildArticle(
        {
          url,
          isPartOf: { "@id": ids.webPage(url) },
          author: post.data.author?.name
            ? { "@id": ids.person, name: post.data.author.name }
            : { "@id": ids.person },
          publisher: orgRef,
          headline: post.data.title,
          description: post.data.description || "",
          datePublished: date,
          articleSection: post.data.categories?.[0],
        },
        ids,
        "BlogPosting",
      ),
      buildBreadcrumbList(
        {
          url,
          items: [
            { name: "Inicio", url: `${SITE_URL}/` },
            {
              name: prefix === "blog" ? "Blog" : "Local",
              url: `${SITE_URL}/${prefix}`,
            },
            { name: post.data.title, url },
          ],
        },
        ids,
      ),
    ];
    return pieces;
  },
});
