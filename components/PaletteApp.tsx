"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ColorInput } from "@/components/generator/ColorInput";
import { PaletteScale } from "@/components/generator/PaletteScale";
import { ExportPanel } from "@/components/generator/ExportPanel";
import { PreviewProvider } from "@/components/preview/PreviewProvider";
import { GallerySection } from "@/components/preview/GallerySection";
import { StatsSection } from "@/components/preview/StatsSection";
import { ChartSection } from "@/components/preview/ChartSection";
import { LoginFormSection } from "@/components/preview/LoginFormSection";
import { ButtonsSection } from "@/components/preview/ButtonsSection";
import { DataTableSection } from "@/components/preview/DataTableSection";
import { AlertsSection } from "@/components/preview/AlertsSection";
import { HistoryPanel } from "@/components/history/HistoryPanel";
import { usePalette } from "@/hooks/usePalette";
import { useDarkMode } from "@/hooks/useDarkMode";
import { generateScale } from "@/lib/color-engine";
import { useState, useMemo } from "react";

type ExtraColor = { id: string; hex: string; label: "Secondary" | "Tertiary" };

export function PaletteApp() {
  const { hex, setHex, palette } = usePalette();
  const { isDark, toggle } = useDarkMode();
  const [extraColors, setExtraColors] = useState<ExtraColor[]>([]);

  const extraPalettes = useMemo(() => {
    return extraColors.map((color) => ({
      ...color,
      palette: generateScale(color.hex),
    }));
  }, [extraColors]);

  const addSecondaryColor = () => {
    if (extraColors.length === 0) {
      setExtraColors([{ id: "secondary", hex: "6366F1", label: "Secondary" }]);
    }
  };

  const addTertiaryColor = () => {
    if (extraColors.length === 1) {
      setExtraColors([
        extraColors[0],
        { id: "tertiary", hex: "EC4899", label: "Tertiary" },
      ]);
    }
  };

  const removeExtraColor = (id: string) => {
    setExtraColors((prev) => prev.filter((color) => color.id !== id));
  };

  const updateExtraColor = (id: string, hex: string) => {
    setExtraColors((prev) =>
      prev.map((color) => (color.id === id ? { ...color, hex } : color))
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b px-6 h-14 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div
            className="w-5 h-5 rounded"
            style={{ background: `linear-gradient(135deg, var(--p-400, #60a5fa), var(--p-700, #1d4ed8))` }}
          />
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-sm">UI Color Scale</span>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              OKLCH · perceptual ramps
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <HistoryPanel currentHex={hex} onSelect={(h) => setHex(h)} />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="h-8 w-8"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      {/* Two-panel body */}
      <div className="flex flex-1 min-h-0 flex-col md:flex-row overflow-hidden">
        {/* Left sidebar — generator controls */}
        <aside className="w-full md:w-80 md:flex-shrink-0 border-b md:border-b-0 md:border-r flex flex-col overflow-y-auto">
          <div className="p-5 flex flex-col gap-5">
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                Base color
              </h2>
              <ColorInput hex={hex} onChange={(h) => setHex(h)} />

              {extraColors.length === 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addSecondaryColor}
                  className="mt-3 w-full"
                >
                  + Add secondary color scale
                </Button>
              )}
            </section>

            {extraColors.length > 0 && (
              <section>
                <ColorInput
                  hex={extraColors[0].hex}
                  onChange={(h) => updateExtraColor("secondary", h)}
                  label="Secondary"
                  onRemove={() => removeExtraColor("secondary")}
                />
                {extraColors.length === 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addTertiaryColor}
                    className="mt-3 w-full"
                  >
                    + Add tertiary color scale
                  </Button>
                )}
              </section>
            )}

            {extraColors.length > 1 && (
              <section>
                <ColorInput
                  hex={extraColors[1].hex}
                  onChange={(h) => updateExtraColor("tertiary", h)}
                  label="Tertiary"
                  onRemove={() => removeExtraColor("tertiary")}
                />
              </section>
            )}

            <Separator />

            <section className="pb-4">
              <h2 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                Export
              </h2>
              <ExportPanel palette={palette} />
            </section>
          </div>
        </aside>

        {/* Right panel — scrollable component gallery */}
        <main className="flex-1 overflow-y-auto bg-muted/30">
          <PreviewProvider palette={palette} isDark={isDark}>
            <div className="p-6 flex flex-col gap-4 max-w-3xl mx-auto">
              {/* Primary Scale — 11 stops */}
              <div className="border rounded-lg p-4 bg-background">
                <PaletteScale palette={palette} label="Scale — Primary" />
              </div>

              {/* Extra color scales */}
              {extraPalettes.map((extra) => (
                <div key={extra.id} className="border rounded-lg p-4 bg-background">
                  <PaletteScale
                    palette={extra.palette}
                    label={`Scale — ${extra.label}`}
                  />
                </div>
              ))}

              <GallerySection title="Stat Cards">
                <StatsSection />
              </GallerySection>

              <GallerySection title="Bar Chart">
                <ChartSection />
              </GallerySection>

              <GallerySection title="Login Form">
                <LoginFormSection />
              </GallerySection>

              <GallerySection title="Buttons">
                <ButtonsSection />
              </GallerySection>

              <GallerySection title="Data Table">
                <DataTableSection />
              </GallerySection>

              <GallerySection title="Alerts & Notifications">
                <AlertsSection />
              </GallerySection>
            </div>
          </PreviewProvider>
        </main>
      </div>
    </div>
  );
}
