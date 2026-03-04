"use client";

import { useMemo, type ReactNode } from "react";
import type { PaletteStop } from "@/lib/color-engine";

interface PreviewProviderProps {
  palette: PaletteStop[];
  isDark: boolean;
  children: ReactNode;
}

export function PreviewProvider({ palette, isDark, children }: PreviewProviderProps) {
  const cssVars = useMemo(() => {
    const vars: Record<string, string> = {};

    // Raw palette stops
    for (const stop of palette) {
      vars[`--p-${stop.stop}`] = stop.hex;
    }

    // Semantic vars — adapt to dark mode
    if (isDark) {
      vars["--p-surface-1"] = "var(--p-900)";
      vars["--p-surface-2"] = "var(--p-800)";
      vars["--p-surface-3"] = "var(--p-700)";
      vars["--p-text-1"]    = "var(--p-50)";
      vars["--p-text-2"]    = "var(--p-300)";
      vars["--p-accent"]    = "var(--p-400)";
      vars["--p-border"]    = "var(--p-700)";
      vars["--p-badge"]     = "var(--p-800)";
      vars["--p-badge-text"]= "var(--p-200)";
    } else {
      vars["--p-surface-1"] = "var(--p-50)";
      vars["--p-surface-2"] = "var(--p-100)";
      vars["--p-surface-3"] = "var(--p-200)";
      vars["--p-text-1"]    = "var(--p-900)";
      vars["--p-text-2"]    = "var(--p-600)";
      vars["--p-accent"]    = "var(--p-500)";
      vars["--p-border"]    = "var(--p-200)";
      vars["--p-badge"]     = "var(--p-100)";
      vars["--p-badge-text"]= "var(--p-700)";
    }

    return vars;
  }, [palette, isDark]);

  return (
    <div style={cssVars as React.CSSProperties} className="contents">
      {children}
    </div>
  );
}
