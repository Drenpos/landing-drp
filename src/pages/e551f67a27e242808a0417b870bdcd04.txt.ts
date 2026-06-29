import { createIndexNowKeyRoute } from "@jdevalk/astro-seo-graph";

export const prerender = true;

// IndexNow key verification route. Filename matches the key (per spec
// the key file MUST be served at /<key>.txt and contain only the key).
// Same value is set as INDEXNOW_KEY env var in Jenkins; the
// `seoGraph()` integration gates submission on prod build.
export const GET = createIndexNowKeyRoute({
  key: "e551f67a27e242808a0417b870bdcd04",
});
