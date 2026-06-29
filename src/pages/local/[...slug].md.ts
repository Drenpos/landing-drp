import { getCollection } from "astro:content";
import { createMarkdownEndpoint } from "@jdevalk/astro-seo-graph";
import config from "@/config/config.json";

const SITE_URL = config.site.base_url;

export const prerender = true;

export const getStaticPaths = async () => {
  const posts = await getCollection(
    "local",
    ({ id, data }) => !data.draft && id !== "-index",
  );
  return posts.map((p) => ({ params: { slug: p.id } }));
};

export const GET = createMarkdownEndpoint({
  entries: () =>
    getCollection(
      "local",
      ({ id, data }) => !data.draft && id !== "-index",
    ),
  mapper: (post, slug) =>
    post.id !== slug
      ? null
      : {
          frontmatter: {
            title: post.data.title,
            canonical: `${SITE_URL}/local/${post.id}`,
            pubDate: post.data.date,
            author: post.data.author?.name,
            description: post.data.description,
            tags: post.data.tags,
            categories: post.data.categories,
          },
          body: post.body ?? "",
        },
});
