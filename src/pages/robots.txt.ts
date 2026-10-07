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

# Un bot que tiene su propio bloque ignora el de "User-agent: *", por eso los
# bloques nuevos repiten "Disallow: /api/".
User-agent: Claude-SearchBot
Allow: /
Disallow: /api/

User-agent: Claude-User
Allow: /
Disallow: /api/

User-agent: Perplexity-User
Allow: /
Disallow: /api/

# Buscadores con respuestas generadas (Apple Intelligence / Spotlight, Bing y Copilot)
User-agent: Applebot
Allow: /
Disallow: /api/

User-agent: Bingbot
Allow: /
Disallow: /api/

Sitemap: ${new URL("sitemap-index.xml", base).href}
# "Schemamap" no es una directiva estándar de robots.txt: ningún motor de
# búsqueda ni asistente la reconoce a día de hoy. Se deja por si acaso.
Schemamap: ${new URL("schemamap.xml", base).href}
`.trim();

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
