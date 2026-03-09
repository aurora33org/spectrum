"use client";

import { useQueryState, parseAsString } from "nuqs";
import { useMemo } from "react";
import { generateScale, type PaletteStop } from "@/lib/color-engine";

export interface MultiPalette {
  primaryHex: string;
  setPrimaryHex: (hex: string | null) => Promise<URLSearchParams>;
  primaryPalette: PaletteStop[];

  secondaryHex: string | null;
  setSecondaryHex: (hex: string | null) => Promise<URLSearchParams>;
  secondaryPalette: PaletteStop[] | null;

  tertiaryHex: string | null;
  setTertiaryHex: (hex: string | null) => Promise<URLSearchParams>;
  tertiaryPalette: PaletteStop[] | null;
}

export function useMultiPalette(): MultiPalette {
  const [primaryHex, setPrimaryHex] = useQueryState(
    "primary",
    parseAsString.withDefault("3B82F6")
  );
  const [secondaryHex, setSecondaryHex] = useQueryState("secondary", parseAsString);
  const [tertiaryHex, setTertiaryHex] = useQueryState("tertiary", parseAsString);

  const primaryPalette = useMemo(() => generateScale(primaryHex), [primaryHex]);
  const secondaryPalette = useMemo(
    () => (secondaryHex ? generateScale(secondaryHex) : null),
    [secondaryHex]
  );
  const tertiaryPalette = useMemo(
    () => (tertiaryHex ? generateScale(tertiaryHex) : null),
    [tertiaryHex]
  );

  return {
    primaryHex, setPrimaryHex, primaryPalette,
    secondaryHex, setSecondaryHex, secondaryPalette,
    tertiaryHex, setTertiaryHex, tertiaryPalette,
  };
}
