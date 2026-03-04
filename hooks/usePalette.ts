"use client";

import { useQueryState, parseAsString } from "nuqs";
import { useMemo, useState, useEffect } from "react";
import { generateScale, type PaletteStop } from "@/lib/color-engine";

export function usePalette() {
  const [urlHex, setUrlHex] = useQueryState(
    "color",
    parseAsString.withDefault("3B82F6")
  );

  // liveHex drives the palette — updates instantly on every drag event
  const [liveHex, setLiveHex] = useState(urlHex);

  // Keep liveHex in sync when URL changes externally (history navigation, deep links)
  useEffect(() => {
    setLiveHex(urlHex);
  }, [urlHex]);

  const palette: PaletteStop[] = useMemo(() => generateScale(liveHex), [liveHex]);

  function setHex(val: string) {
    setLiveHex(val);  // instant preview
    setUrlHex(val);   // async URL persistence
  }

  return { hex: liveHex, setHex, palette };
}
