import { generateScale } from "@/lib/color-engine";
import { PaletteStrip } from "@/components/palette/PaletteStrip";

const successPalette = generateScale("16A34A");
const warningPalette = generateScale("D97706");
const errorPalette   = generateScale("DC2626");
const infoPalette    = generateScale("2563EB");

export function StatusTab() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <p className="text-[10px] text-muted-foreground">
        Semantic status ramps — same OKLCH engine.
      </p>
      <PaletteStrip palette={successPalette} label="Success · #16A34A" compact />
      <PaletteStrip palette={warningPalette} label="Warning · #D97706" compact />
      <PaletteStrip palette={errorPalette}   label="Error   · #DC2626" compact />
      <PaletteStrip palette={infoPalette}    label="Info    · #2563EB" compact />
    </div>
  );
}
