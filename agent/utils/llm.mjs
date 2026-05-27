/**
 * LLM Facade
 * ─────────────────────────────────────────────────────────────────────────
 * Abstrae el proveedor del modelo (Ollama o cualquier API OpenAI-compatible).
 * El resto de módulos importa `chat` y `checkLLM` solo desde aquí.
 *
 * Selección de proveedor: variable de entorno LLM_PROVIDER
 *   'ollama'  → motor local (default)
 *   'openai'  → endpoint OpenAI-compatible (OpenAI, OpenRouter, Together,
 *               Groq, Mistral, DeepSeek, Azure, vLLM, llama.cpp...)
 *
 * Las opciones `numCtx` y `num_ctx` solo aplican a Ollama; en OpenAI se
 * traducen a `max_tokens` cuando se pasa explícitamente.
 */
import { config } from "../config.mjs";
import { chat as chatOllama, checkOllama } from "./ollama.mjs";
import { chatOpenAI, checkOpenAI } from "./openai.mjs";

/** Devuelve el id del proveedor activo. */
export function activeProvider() {
  return config.llm.provider === "openai" ? "openai" : "ollama";
}

/** Devuelve el modelo configurado para el proveedor activo. */
export function activeModel() {
  return activeProvider() === "openai"
    ? config.openai.model
    : config.ollama.model;
}

/**
 * Envía un chat al proveedor activo.
 * @param {string} userPrompt
 * @param {string} systemPrompt
 * @param {object} options - { temperature, numCtx, maxTokens, timeout, model }
 * @returns {Promise<string>}
 */
export async function chat(userPrompt, systemPrompt = "", options = {}) {
  if (activeProvider() === "openai") {
    return chatOpenAI(userPrompt, systemPrompt, options);
  }
  return chatOllama(userPrompt, systemPrompt, options);
}

/**
 * Comprueba que el proveedor activo está disponible y devuelve los modelos.
 * Estructura idéntica a `checkOllama()` para minimizar cambios aguas abajo.
 * @returns {Promise<{ok: boolean, models: string[], provider: string, error?: string}>}
 */
export async function checkLLM() {
  const provider = activeProvider();
  const result =
    provider === "openai" ? await checkOpenAI() : await checkOllama();
  return { ...result, provider };
}
