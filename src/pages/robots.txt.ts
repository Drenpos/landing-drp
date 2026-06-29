import type { APIRoute } from "astro";

export const prerender = true;

const base = import.meta.env.SITE || "https://www.drenpos.com";

const robotsTxt = `
# Content Signals (IETF draft draft-romm-aipref-contentsignals)
Content-Signal: ai-train=yes, search=yes, ai-input=yes

User-agent: *
Allow: /
Disallow: /api/

# AI / LLM crawlers — allowed
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: YouBot
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: DuckAssistBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

Sitemap: ${new URL("sitemap-index.xml", base).href}
Schemamap: ${new URL("schemamap.xml", base).href}
`.trim();

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
