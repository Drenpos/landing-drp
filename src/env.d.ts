/// <reference types="astro/client" />
/// <reference types="@clerk/astro/env" />

// Atributos de WebMCP declarativo (DemoForm, contact). Los navegadores sin
// WebMCP los ignoran.
declare namespace astroHTML.JSX {
  interface HTMLAttributes {
    toolname?: string;
    tooldescription?: string;
    toolparamdescription?: string;
    toolautosubmit?: boolean | string;
  }
}
