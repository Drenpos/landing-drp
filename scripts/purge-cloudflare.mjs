#!/usr/bin/env node
// Purga toda la caché de la zona de Cloudflare tras un despliegue.
//
// Uso: npm run purge:cf
// Lee .env si existe (process.loadEnvFile, Node >= 20.12). No se usa
// "node --env-file=.env" porque Node aborta si el fichero no existe (p. ej. en
// un CI sin .env) y eso rompería el deploy.
// Variables:
//   CF_ZONE_ID    ID de la zona drenpos.com (panel de Cloudflare, Overview).
//   CF_API_TOKEN  Token de API con permiso "Zone > Cache Purge > Purge" solo
//                 para esa zona.
//
// Si faltan las variables avisa y sale con 0 para no romper el deploy.
// Si la API responde con error, imprime los errores y sale con 1.

try {
  process.loadEnvFile(".env");
} catch {
  /* sin .env: se usan solo las variables del entorno */
}

const zoneId = process.env.CF_ZONE_ID?.trim();
const token = process.env.CF_API_TOKEN?.trim();

if (!zoneId || !token) {
  console.warn(
    "[purge-cloudflare] AVISO: faltan CF_ZONE_ID y/o CF_API_TOKEN. " +
      "No se ha purgado la caché de Cloudflare. Añádelas a .env para " +
      "purgar automáticamente tras cada despliegue.",
  );
  process.exit(0);
}

const url = `https://api.cloudflare.com/client/v4/zones/${encodeURIComponent(zoneId)}/purge_cache`;

try {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ purge_everything: true }),
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!data || data.success !== true) {
    console.error(
      `[purge-cloudflare] ERROR: la API de Cloudflare no ha confirmado la purga (HTTP ${res.status}).`,
    );
    const errors = data?.errors ?? [];
    if (errors.length > 0) {
      for (const err of errors) {
        console.error(`  - [${err.code ?? "?"}] ${err.message ?? JSON.stringify(err)}`);
      }
    } else if (data) {
      console.error(JSON.stringify(data, null, 2));
    }
    process.exit(1);
  }

  console.log(
    `[purge-cloudflare] Caché de la zona purgada (id ${data.result?.id ?? zoneId}).`,
  );
} catch (error) {
  console.error(
    `[purge-cloudflare] ERROR de red llamando a la API de Cloudflare: ${error.message}`,
  );
  process.exit(1);
}
