import { converter, formatHex, parse, wcagContrast } from "culori";

export interface PaletteStop {
  stop: number;
  hex: string;
  wcagOnWhite: number;
  wcagOnBlack: number;
}

const toOklch = converter("oklch");

const STOPS: Array<{ stop: number; l: number; cFactor: number }> = [
  { stop: 50, l: 0.97, cFactor: 0.03 },
  { stop: 100, l: 0.93, cFactor: 0.08 },
  { stop: 200, l: 0.86, cFactor: 0.18 },
  { stop: 300, l: 0.76, cFactor: 0.45 },
  { stop: 400, l: 0.65, cFactor: 0.70 },
  { stop: 500, l: 0.55, cFactor: 1.00 },
  { stop: 600, l: 0.45, cFactor: 0.90 },
  { stop: 700, l: 0.37, cFactor: 0.80 },
  { stop: 800, l: 0.28, cFactor: 0.65 },
  { stop: 900, l: 0.20, cFactor: 0.50 },
  { stop: 950, l: 0.15, cFactor: 0.38 },
];

export function generateScale(hex: string): PaletteStop[] {
  const parsed = parse(hex.startsWith("#") ? hex : `#${hex}`);
  if (!parsed) return [];

  const oklch = toOklch(parsed);
  if (!oklch) return [];

  const baseHue = oklch.h ?? 0;
  const baseChroma = oklch.c ?? 0;

  return STOPS.map(({ stop, l, cFactor }) => {
    const stopColor = { mode: "oklch" as const, l, c: baseChroma * cFactor, h: baseHue };
    const hex = formatHex(stopColor) ?? "#000000";

    const wcagOnWhite = wcagContrast(hex, "#ffffff");
    const wcagOnBlack = wcagContrast(hex, "#000000");

    return {
      stop,
      hex,
      wcagOnWhite: Math.round(wcagOnWhite * 100) / 100,
      wcagOnBlack: Math.round(wcagOnBlack * 100) / 100,
    };
  });
}

export type WcagLevel = "AAA" | "AA" | "fail";

export function wcagLevel(ratio: number): WcagLevel {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  return "fail";
}
