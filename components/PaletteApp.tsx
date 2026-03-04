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

export function PaletteApp() {
  const { hex, setHex, palette } = usePalette();
  const { isDark, toggle } = useDarkMode();

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
            </section>

            <Separator />

            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                Scale — 11 stops
              </h2>
              <PaletteScale palette={palette} />
            </section>

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
