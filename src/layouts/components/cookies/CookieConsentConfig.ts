import type { CookieConsentConfig } from "vanilla-cookieconsent";

// ❌ Quita el grant por defecto: GA4 no debe estar granted sin consentimiento
// if (typeof window !== "undefined") {
//   window.gtag?.("consent", "update", {
//     ad_storage: "denied",
//     ad_user_data: "denied",
//     ad_personalization: "denied",
//     analytics_storage: "granted",
//   });
// }

export const config: CookieConsentConfig = {
  guiOptions: {
    consentModal: {
      layout: "box wide",
      position: "middle center",
      flipButtons: false,
    },
    preferencesModal: {
      layout: "bar wide",
      position: "left",
      equalWeightButtons: false,
      flipButtons: true,
    },
  },
  // Ejecutar al aceptar "todas" o "solo necesarias"
  onFirstConsent: () => {
    window.gtag?.("consent", "update", { analytics_storage: "granted" });
  },
  onConsent: () => {
    window.gtag?.("consent", "update", { analytics_storage: "granted" });
  },
  categories: {
    necessary: {
      readOnly: true,
      services: {
        recaptcha: {
          label:
            '<a href="https://policies.google.com/privacy" target="_blank">Google reCAPTCHA</a>',
          cookies: [{ name: "__Secure-ENID" }],
        },
        cloudflare: {
          label:
            '<a href="https://www.cloudflare.com/privacypolicy/" target="_blank">Cloudflare (seguridad)</a>',
          cookies: [
            { name: "cf_clearance" },
            // { name: "__cf_bm" }, // si aparece en tus pruebas
          ],
        },
      },
    },
    analytics: {
      readOnly: true,
      services: {
        gmt_ga4_all: {
          label: "Analíticas de rendimiento sin información personal",
          cookies: [{ name: "_ga" }, { name: "_ga_Z9GM7FD2VN" }],
        },
      },
    },

    // Publicidad (opcional). Si la usas, descomenta onAccept/onReject
    advertising: {
      services: {
        gtm_ga4_all: {
          onAccept: () => {
            window.gtag?.("consent", "update", {
              ad_storage: "granted",
              ad_user_data: "granted",
              ad_personalization: "granted",
            });
          },
          onReject: () => {
            window.gtag?.("consent", "update", {
              ad_storage: "denied",
              ad_user_data: "denied",
              ad_personalization: "denied",
            });
          },
        },
      },
    },

    // Analítica de rendimiento (GA4 / GTM)
    // analytics: {
    //      services: {
    //           gtm_ga4: {
    //                label: "Google Tag Manager / Google Analytics 4",
    //                // Cookieless por defecto (ya viene de tu snippet global).
    //                // Al aceptar, concedemos analytics_storage.
    //                onAccept: () => {
    //                     window.gtag?.("consent", "update", {analytics_storage: "granted"});
    //                },
    //                onReject: () => {
    //                     window.gtag?.("consent", "update", {analytics_storage: "denied"});
    //                },
    //           },
    //      },
    // },
  },

  language: {
    default: "es",
    autoDetect: "browser",
    translations: {
      es: {
        consentModal: {
          title: "Uso de cookies",
          description:
            "Usamos cookies técnicas (siempre activas) y analíticas <b>sin cookies</b> para métricas básicas. " +
            "La analítica de rendimiento (GA4) está <b>desactivada por defecto</b> y solo se activa si la aceptas en “Configurar”. " +
            'Opcionalmente puedes permitir cookies publicitarias. Más info en la <a href="/legal/cookies">Política de Cookies</a>.',
          acceptAllBtn: "Aceptar todas",
          acceptNecessaryBtn: "Rechazar todas",
          showPreferencesBtn: "Configurar",
        },
        preferencesModal: {
          title: "Centro de preferencias de cookies",
          acceptAllBtn: "Aceptar todas",
          acceptNecessaryBtn: "Rechazar todas",
          savePreferencesBtn: "Cerrar",
          closeIconLabel: "Cerrar modal",
          serviceCounterLabel: "Servicio|Servicios",
          sections: [
            {
              title: "Uso de Cookies",
              description:
                "Cookies técnicas (siempre activas); analíticas anónimas (siempre activas, sin cookies) para conteo de visitas; " +
                "analítica de rendimiento (GA4) desactivada por defecto y configurable; y cookies publicitarias bajo consentimiento.",
            },
            {
              title:
                'Cookies técnicas <span class="pm__badge">Siempre activas</span>',
              description:
                "Necesarias para que el sitio funcione y no se pueden desactivar en nuestros sistemas. " +
                "Puedes bloquearlas en tu navegador, pero algunas partes no funcionarán. No guardan información personal identificable.",
              linkedCategory: "necessary",
            },
            {
              title:
                'Cookies de rendimiento <span class="pm__badge">Siempre activas</span>',
              description:
                "Necesarias para poder medir el rendimiento del sitio, no almacena datos personales ",
              linkedCategory: "analytics",
            },
            // {
            //      title: 'Cookies de analítica de rendimiento <span class="pm__badge">Desactivadas por defecto</span>',
            //      description:
            //           "Google Analytics 4 (a través de Tag Manager) para medir y mejorar el desempeño del sitio. " +
            //           "Se activan solo si las aceptas.",
            //      linkedCategory: "analytics",
            // },
            {
              title:
                'Cookies publicitarias <span class="pm__badge">Desactivadas por defecto</span>',
              description:
                "Se utilizan para mostrarte publicidad personalizada en función de tu comportamiento " +
                "y para medir la eficacia de nuestras campañas publicitarias (Google Ads, Facebook Pixel, etc.). " +
                "Solo se activan si las aceptas.",
              linkedCategory: "advertising",
            },
            {
              title: "Más información",
              description:
                '¿Dudas? <a class="cc__link" href="/contacto/">Contáctanos</a>.',
            },
          ],
        },
      },
    },
  },
};
