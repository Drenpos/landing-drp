/**
 * Cliente OpenAI-compatible
 * ─────────────────────────────────────────────────────────────────────────
 * Funciona con cualquier endpoint que implemente el spec
 *   POST /v1/chat/completions
 *
 * Probado con: OpenAI, OpenRouter, Together, Groq, Mistral, DeepSeek,
 *              Azure OpenAI, vLLM, llama.cpp server, Ollama (vía /v1).
 *
 * Variables de entorno:
 *   OPENAI_API_BASE_URL  default https://api.openai.com/v1
 *   OPENAI_API_KEY       requerido
 *   OPENAI_MODEL         default gpt-4o
 *   OPENAI_TIMEOUT       default 180_000 ms
 *   OPENAI_ORG           opcional (header OpenAI-Organization)
 *   OPENAI_PROJECT       opcional (header OpenAI-Project)
 */
import { config } from "../config.mjs";
import { log } from "./logger.mjs";

/**
 * Envía un chat al endpoint OpenAI-compatible.
 * @param {string} userPrompt
 * @param {string} systemPrompt
 * @param {object} options - model, temperature, maxTokens, timeout, topP
 * @returns {Promise<string>}
 */
export async function chatOpenAI(userPrompt, systemPrompt = "", options = {}) {
  const model = options.model || config.openai.model;
  const baseUrl = config.openai.baseUrl.replace(/\/+$/, "");
  const url = `${baseUrl}/chat/completions`;

  if (!config.openai.apiKey) {
    throw new Error(
      "OPENAI_API_KEY no está definida. Configúrala en agent/.env o como variable de entorno.",
    );
  }

  const body = {
    model,
    messages: [
      ...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
      { role: "user", content: userPrompt },
    ],
    temperature: options.temperature ?? 0.7,
    stream: false,
  };

  if (options.maxTokens) body.max_tokens = options.maxTokens;
  if (options.topP !== undefined) body.top_p = options.topP;
  if (options.responseFormat) body.response_format = options.responseFormat;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${config.openai.apiKey}`,
  };
  if (config.openai.org) headers["OpenAI-Organization"] = config.openai.org;
  if (config.openai.project) headers["OpenAI-Project"] = config.openai.project;

  const timeoutMs = options.timeout ?? config.openai.timeout;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    log.debug(
      `OpenAI-compat request → host=${baseUrl}, model=${model}, timeout=${timeoutMs / 1000}s`,
    );
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`OpenAI API ${res.status}: ${text.slice(0, 500)}`);
    }

    const data = await res.json();
    // El spec OpenAI devuelve choices[0].message.content
    const content = data?.choices?.[0]?.message?.content ?? "";
    return content.trim();
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Verifica disponibilidad del endpoint OpenAI-compatible.
 * Intenta GET /models (estándar), pero si no responde solo verifica que
 * exista API key.
 * @returns {Promise<{ok: boolean, models: string[], error?: string}>}
 */
export async function checkOpenAI() {
  if (!config.openai.apiKey) {
    return {
      ok: false,
      models: [],
      error: "OPENAI_API_KEY no definida",
    };
  }

  const baseUrl = config.openai.baseUrl.replace(/\/+$/, "");
  const headers = {
    Authorization: `Bearer ${config.openai.apiKey}`,
  };
  if (config.openai.org) headers["OpenAI-Organization"] = config.openai.org;
  if (config.openai.project) headers["OpenAI-Project"] = config.openai.project;

  try {
    const res = await fetch(`${baseUrl}/models`, {
      headers,
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      // Algunos providers (Groq, vLLM) requieren claves específicas para /models.
      // Si responde 401/403 pero el endpoint existe, consideramos OK con warning.
      if (res.status === 401 || res.status === 403) {
        return {
          ok: true,
          models: [],
          error: `Endpoint accesible pero /models requiere permisos extra (${res.status})`,
        };
      }
      return {
        ok: false,
        models: [],
        error: `HTTP ${res.status} en ${baseUrl}/models`,
      };
    }

    const data = await res.json();
    const models = (data?.data || []).map((m) => m.id).filter(Boolean);
    return { ok: true, models };
  } catch (e) {
    // Si /models no existe pero la API key está, asumimos que probablemente
    // funcione (algunos endpoints custom no exponen /models).
    return {
      ok: true,
      models: [],
      error: `No se pudo verificar /models: ${e.message}`,
    };
  }
}
