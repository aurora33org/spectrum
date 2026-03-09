"use client";

import { useCallback } from "react";
import { Shuffle } from "lucide-react";
import { formatHex } from "culori";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ColorSlot } from "@/components/palette/ColorSlot";
import { ExportPanel } from "@/components/generator/ExportPanel";
import type { PaletteStop } from "@/lib/color-engine";

function randomPrimaryHex(): string {
  const h = Math.random() * 360;
  return (formatHex({ mode: "oklch", l: 0.55, c: 0.18, h }) ?? "#3b82f6").replace("#", "");
}

interface BrandTabProps {
  primaryHex: string;
  onPrimaryChange: (hex: string) => void;
  secondaryHex: string | null;
  onSecondaryChange: (hex: string) => void;
  onSecondaryRemove: () => void;
  tertiaryHex: string | null;
  onTertiaryChange: (hex: string) => void;
  onTertiaryRemove: () => void;
  onAddSecondary: () => void;
  onAddTertiary: () => void;
  primaryPalette: PaletteStop[];
}

export function BrandTab({
  primaryHex, onPrimaryChange,
  secondaryHex, onSecondaryChange, onSecondaryRemove,
  tertiaryHex, onTertiaryChange, onTertiaryRemove,
  onAddSecondary, onAddTertiary,
  primaryPalette,
}: BrandTabProps) {
  const handleRandomize = useCallback(() => {
    onPrimaryChange(randomPrimaryHex());
  }, [onPrimaryChange]);

  return (
    <div className="flex flex-col gap-3 p-4">
      {/* Color slots */}
      <div className="flex flex-col">
        <ColorSlot
          label="Primary"
          hex={primaryHex}
          onChange={onPrimaryChange}
        />

        {secondaryHex !== null && (
          <ColorSlot
            label="Secondary"
            hex={secondaryHex}
            onChange={onSecondaryChange}
            onRemove={onSecondaryRemove}
          />
        )}

        {tertiaryHex !== null && (
          <ColorSlot
            label="Tertiary"
            hex={tertiaryHex}
            onChange={onTertiaryChange}
            onRemove={onTertiaryRemove}
          />
        )}
      </div>

      {/* Add color buttons */}
      <div className="flex flex-col gap-1">
        {secondaryHex === null && (
          <Button
            variant="outline"
            size="sm"
            onClick={onAddSecondary}
            className="w-full justify-start text-muted-foreground hover:text-foreground text-xs h-7"
          >
            + Add secondary color scale
          </Button>
        )}
        {tertiaryHex === null && secondaryHex !== null && (
          <Button
            variant="outline"
            size="sm"
            onClick={onAddTertiary}
            className="w-full justify-start text-muted-foreground hover:text-foreground text-xs h-7"
          >
            + Add tertiary color scale
          </Button>
        )}
      </div>

      <Separator />

      {/* Random */}
      <Button variant="outline" size="sm" onClick={handleRandomize} className="w-full gap-2">
        <Shuffle className="h-3.5 w-3.5" />
        Generate Random
      </Button>

      <Separator />

      {/* Export */}
      <ExportPanel palette={primaryPalette} paletteName="primary" />
    </div>
  );
}
