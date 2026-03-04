import type { PaletteStop } from "./color-engine";

export function toCssVars(stops: PaletteStop[], name = "primary"): string {
  const vars = stops.map((s) => `  --${name}-${s.stop}: ${s.hex};`).join("\n");
  return `:root {\n${vars}\n}`;
}

export function toTailwindConfig(stops: PaletteStop[], name = "primary"): string {
  const entries = stops.map((s) => `    '${s.stop}': '${s.hex}',`).join("\n");
  return `/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        ${name}: {\n${entries}\n        },\n      },\n    },\n  },\n}`;
}

export function toScss(stops: PaletteStop[], name = "primary"): string {
  return stops.map((s) => `$${name}-${s.stop}: ${s.hex};`).join("\n");
}
