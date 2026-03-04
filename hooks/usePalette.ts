"use client";

import { useQueryState, parseAsString } from "nuqs";
import { useMemo } from "react";
import { generateScale, type PaletteStop } from "@/lib/color-engine";

export function usePalette() {
  const [hex, setHex] = useQueryState(
    "color",
    parseAsString.withDefault("3B82F6")
  );

  const palette: PaletteStop[] = useMemo(() => generateScale(hex), [hex]);

  return { hex, setHex, palette };
}
