import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import fs from "node:fs";
import path from "node:path";
import satori from "satori";
import sharp from "sharp";

export const prerender = true;

const fontRegular = fs.readFileSync(
  path.join(process.cwd(), "public/fonts/Aptos.ttf"),
);
const fontBold = fs.readFileSync(
  path.join(process.cwd(), "public/fonts/Aptos-Bold.ttf"),
);

type Variant = { collection: "blog" | "local"; slug: string };

export async function getStaticPaths() {
  const blog = await getCollection(
    "blog",
    ({ id, data }) => !data.draft && id !== "-index",
  );
  const local = await getCollection(
    "local",
    ({ id, data }) => !data.draft && id !== "-index",
  );
  return [
    ...blog.map((p) => ({
      params: { slug: `blog/${p.id}` },
      props: { post: p, collection: "blog" as const },
    })),
    ...local.map((p) => ({
      params: { slug: `local/${p.id}` },
      props: { post: p, collection: "local" as const },
    })),
  ];
}

export const GET: APIRoute = async ({ props }) => {
  const { post, collection } = props as {
    post: any;
    collection: Variant["collection"];
  };
  const title = post.data.meta_title || post.data.title;
  const subtitle = post.data.description || "";
  const tag = collection === "local" ? "GUÍA LOCAL" : "BLOG DRENPOS";

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: 1200,
          height: 675,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0c4a6e 100%)",
          color: "#ffffff",
          fontFamily: "Aptos",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                fontSize: 26,
                letterSpacing: 2,
                color: "#67e8f9",
                fontWeight: 700,
              },
              children: tag,
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: 24,
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: 64,
                      fontWeight: 700,
                      lineHeight: 1.1,
                      color: "#ffffff",
                    },
                    children: title.length > 110
                      ? `${title.slice(0, 107)}…`
                      : title,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: 28,
                      lineHeight: 1.35,
                      color: "#cbd5e1",
                    },
                    children: subtitle.length > 180
                      ? `${subtitle.slice(0, 177)}…`
                      : subtitle,
                  },
                },
              ],
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid rgba(255,255,255,0.15)",
                paddingTop: 24,
                fontSize: 24,
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: { color: "#ffffff", fontWeight: 700 },
                    children: "drenpos.com",
                  },
                },
                {
                  type: "div",
                  props: {
                    style: { color: "#94a3b8" },
                    children: "ERP modular · pymes España",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 675,
      fonts: [
        { name: "Aptos", data: fontRegular, weight: 400, style: "normal" },
        { name: "Aptos", data: fontBold, weight: 700, style: "normal" },
      ],
    },
  );

  const jpg = await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toBuffer();

  return new Response(jpg, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
