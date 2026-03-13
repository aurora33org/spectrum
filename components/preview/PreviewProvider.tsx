"use client";

import { useMemo, type ReactNode } from "react";
import type { PaletteStop } from "@/lib/color-engine";

interface PreviewProviderProps {
  palette: PaletteStop[];
  isDark: boolean;
  children: ReactNode;
  secondaryPalette?: PaletteStop[] | null;
  tertiaryPalette?: PaletteStop[] | null;
}

export function PreviewProvider({
  palette, isDark, children, secondaryPalette, tertiaryPalette,
}: PreviewProviderProps) {
  const cssVars = useMemo(() => {
    const vars: Record<string, string> = {};

    // Primary — --p-50…--p-950
    for (const stop of palette) {
      vars[`--p-${stop.stop}`] = stop.hex;
    }
    if (isDark) {
      vars["--p-surface-1"]  = "color-mix(in srgb, var(--p-800) 40%, var(--p-900) 60%)";
      vars["--p-surface-2"]  = "var(--p-900)";
      vars["--p-surface-3"]  = "var(--p-800)";
      vars["--neutral-bg"]   = "#1c1c1e";
      vars["--neutral-bg-2"] = "#2c2c2e";
      vars["--p-text-1"]     = "var(--p-50)";
      vars["--p-text-2"]     = "var(--p-300)";
      vars["--p-accent"]     = "var(--p-400)";
      vars["--p-border"]     = "var(--p-700)";
      vars["--p-badge"]      = "var(--p-800)";
      vars["--p-badge-text"] = "var(--p-200)";
    } else {
      vars["--neutral-bg"]   = "#ffffff";
      vars["--neutral-bg-2"] = "#f4f4f5";
      vars["--p-surface-1"]  = "var(--p-50)";
      vars["--p-surface-2"]  = "var(--p-100)";
      vars["--p-surface-3"]  = "var(--p-200)";
      vars["--p-text-1"]     = "var(--p-900)";
      vars["--p-text-2"]     = "var(--p-600)";
      vars["--p-accent"]     = "var(--p-500)";
      vars["--p-border"]     = "var(--p-200)";
      vars["--p-badge"]      = "var(--p-100)";
      vars["--p-badge-text"] = "var(--p-700)";
    }

    // Secondary — --s-50…--s-950 + --s-accent
    if (secondaryPalette) {
      for (const stop of secondaryPalette) {
        vars[`--s-${stop.stop}`] = stop.hex;
      }
      vars["--s-accent"] = isDark ? "var(--s-400)" : "var(--s-500)";
    }

    // Tertiary — --t-50…--t-950 + --t-accent
    if (tertiaryPalette) {
      for (const stop of tertiaryPalette) {
        vars[`--t-${stop.stop}`] = stop.hex;
      }
      vars["--t-accent"] = isDark ? "var(--t-400)" : "var(--t-500)";
    }

    // Bridge: map shadcn CSS vars → palette semantic vars
    // Makes <Card>, <Button>, <Badge>, <Alert>, <Table> auto-use the palette
    vars["--background"]           = "var(--p-surface-1)";
    vars["--foreground"]           = "var(--p-text-1)";
    vars["--card"]                 = "var(--p-surface-1)";
    vars["--card-foreground"]      = "var(--p-text-1)";
    vars["--popover"]              = "var(--p-surface-1)";
    vars["--popover-foreground"]   = "var(--p-text-1)";
    vars["--primary"]              = "var(--p-accent)";
    vars["--primary-foreground"]   = "#ffffff";
    vars["--secondary"]            = "var(--p-surface-2)";
    vars["--secondary-foreground"] = "var(--p-text-2)";
    vars["--muted"]                = "var(--p-surface-2)";
    vars["--muted-foreground"]     = "var(--p-text-2)";
    vars["--accent"]               = "var(--p-surface-3)";
    vars["--accent-foreground"]    = "var(--p-text-1)";
    vars["--border"]               = "var(--p-border)";
    vars["--input"]                = "var(--p-border)";
    vars["--ring"]                 = "var(--p-accent)";

    return vars;
  }, [palette, isDark, secondaryPalette, tertiaryPalette]);

  return (
    <div style={cssVars as React.CSSProperties} className="min-h-full">
      {children}
    </div>
  );
}
