/**
 * Módulo 6 — Persistencia
 * Guarda dos archivos en src/content/blog/:
 *   1. YYYY-MM-DD-slug.md       — el artículo del blog
 *   2. YYYY-MM-DD-slug.ads.md   — assets Meta Ads (companion file)
 */
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { config } from '../config.mjs';
import { log } from '../utils/logger.mjs';

/** Construye el frontmatter YAML del post */
function buildFrontmatter(article, date) {
  const esc = (s = '') => String(s).replace(/"/g, '\\"');

  const categories = (article.categories || ['Blog']).map((c) => `"${esc(c)}"`).join(', ');
  const tags = (article.tags || []).map((t) => `"${esc(t)}"`).join(', ');

  return `---
title: "${esc(article.title)}"
meta_title: "${esc(article.metaTitle || article.title)}"
description: "${esc(article.description)}"
date: ${date}
image: ""
author:
  name: "${esc(config.blog.author.name)}"
  designation: "${esc(config.blog.author.designation)}"
  avatar: "${config.blog.author.avatar}"
categories: [${categories}]
tags: [${tags}]
featured: false
draft: false
hero:
  title: "${esc(article.heroTitle || article.title)}"
  description: "${esc(article.heroDescription || article.description)}"
---

`;
}

/** Construye el companion file de assets Meta Ads en markdown */
function buildAdsFile(ads, article, date) {
  const hooks = (ads.hooks || []).map((h, i) => `${i + 1}. ${h}`).join('\n');
  const copiesShort = (ads.copiesShort || []).map((c, i) => `### Copy corto ${i + 1}\n${c}`).join('\n\n');
  const ctaSuggestions = (ads.ctaSuggestions || []).map((c) => `- ${c}`).join('\n');

  return `# Assets Meta Ads — ${article.title}
> Generado automáticamente por el agente SEO de Drenpos
> Post: \`src/content/blog/${date}-${article.slug}.md\`
> Fecha: ${date}

---

## Hooks (scroll-stop)

${hooks}

---

## Copies cortos (tráfico / leads)

${copiesShort}

---

## Copy medio (leads con formulario)

${ads.copyMedium || ''}

---

## Mensaje principal

> **${ads.mainMessage || ''}**

---

## CTAs sugeridos

${ctaSuggestions}

---

## Sugerencias de audiencia

| Campaña | Audiencia |
|---------|-----------|
| Tráfico | ${ads.audienceSuggestions?.trafficCampaign || ''} |
| Leads | ${ads.audienceSuggestions?.leadCampaign || ''} |
| Remarketing | ${ads.audienceSuggestions?.retargetingCampaign || ''} |

---

## Notas de uso en el funnel

${ads.usageNotes || ''}
`;
}

/**
 * Persistir artículo + companion ads.
 * @param {object} article   - Artículo generado
 * @param {object} adsAssets - Assets Meta Ads generados
 * @returns {Promise<{filepath, filename, adsFilepath, adsFilename, date}>}
 */
export async function persistArticle(article, adsAssets = {}) {
  log.step('MÓDULO 6 · PERSISTENCIA', 'Guardando post y assets de ads...');

  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const filename = `${date}-${article.slug}.md`;
  const adsFilename = `${date}-${article.slug}.ads.md`;

  const filepath = join(config.blog.postsDir, filename);
  const adsFilepath = join(config.blog.postsDir, adsFilename);

  await mkdir(config.blog.postsDir, { recursive: true });

  // 1. Guardar post
  const postContent = buildFrontmatter(article, date) + (article.content || '');
  await writeFile(filepath, postContent, 'utf-8');
  log.success(`Post guardado: src/content/blog/${filename}`);

  // 2. Guardar companion ads
  const adsContent = buildAdsFile(adsAssets, article, date);
  await writeFile(adsFilepath, adsContent, 'utf-8');
  log.success(`Ads guardados: src/content/blog/${adsFilename}`);

  return { filepath, filename, adsFilepath, adsFilename, date };
}
