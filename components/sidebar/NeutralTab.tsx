import { generateScale } from "@/lib/color-engine";
import { PaletteStrip } from "@/components/palette/PaletteStrip";

// Computed once at module level — not reactive
const slatePalette  = generateScale("64748b");
const zincPalette   = generateScale("71717a");
const stonePalette  = generateScale("78716c");
const grayPalette   = generateScale("6b7280");

export function NeutralTab() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <p className="text-[10px] text-muted-foreground">
        Reference neutral ramps — same OKLCH engine.
      </p>
      <PaletteStrip palette={slatePalette} label="Slate · #64748b" compact />
      <PaletteStrip palette={zincPalette}  label="Zinc  · #71717a" compact />
      <PaletteStrip palette={stonePalette} label="Stone · #78716c" compact />
      <PaletteStrip palette={grayPalette}  label="Gray  · #6b7280" compact />
    </div>
  );
}
