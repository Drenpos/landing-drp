import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export const prerender = true;

export async function GET(context) {
  const posts = (
    await getCollection(
      "blog",
      ({ id, data }) => !data.draft && id !== "-index",
    )
  ).filter((p) => p.data.date);

  return rss({
    title: "Drenpos - Software",
    description:
      "El desarrollo de software que tu empresa necesita para potenciar su crecimiento.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description || "",
      pubDate: new Date(post.data.date),
      link: `/blog/${post.id}`,
    })),
  });
}
