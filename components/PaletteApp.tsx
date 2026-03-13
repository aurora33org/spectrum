"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import { PreviewProvider } from "@/components/preview/PreviewProvider";
import { HistoryPanel } from "@/components/history/HistoryPanel";
import { PaletteStrip } from "@/components/palette/PaletteStrip";
import { BrandTab } from "@/components/sidebar/BrandTab";
import { NeutralTab } from "@/components/sidebar/NeutralTab";
import { StatusTab } from "@/components/sidebar/StatusTab";

import { CardsTab }      from "@/components/preview/tabs/CardsTab";
import { ComponentsTab } from "@/components/preview/tabs/ComponentsTab";
import { AppsTab }       from "@/components/preview/tabs/AppsTab";
import { ChartsTab }     from "@/components/preview/tabs/ChartsTab";
import { GradientsTab }  from "@/components/preview/tabs/GradientsTab";
import { HeadingsTab }   from "@/components/preview/tabs/HeadingsTab";
import { LogosTab }      from "@/components/preview/tabs/LogosTab";

const SHOWCASE_TABS = [
  { id: "cards",      label: "Cards" },
  { id: "components", label: "Components" },
  { id: "apps",       label: "Apps" },
  { id: "charts",     label: "Charts" },
  { id: "gradients",  label: "Gradients" },
  { id: "headings",   label: "Headings" },
  { id: "logos",      label: "Logos" },
] as const;

type ShowcaseTabId = typeof SHOWCASE_TABS[number]["id"];

// Tabs that respond to dark mode toggle
const THEME_AWARE_TABS: ShowcaseTabId[] = ["cards", "components", "apps", "charts"];

import { useMultiPalette } from "@/hooks/useMultiPalette";
import { useDarkMode } from "@/hooks/useDarkMode";
import { generateScale } from "@/lib/color-engine";

const DEFAULT_SECONDARY = "E38B63";
const DEFAULT_TERTIARY  = "8B63E3";

// Module-level palettes for neutral/status strips
const _slate   = generateScale("64748b");
const _zinc    = generateScale("71717a");
const _stone   = generateScale("78716c");
const _gray    = generateScale("6b7280");
const _success = generateScale("16A34A");
const _warning = generateScale("D97706");
const _error   = generateScale("DC2626");
const _info    = generateScale("2563EB");

function NeutralStrips() {
  return (
    <>
      <PaletteStrip palette={_slate}   label="Slate · #64748b" />
      <PaletteStrip palette={_zinc}    label="Zinc  · #71717a" />
      <PaletteStrip palette={_stone}   label="Stone · #78716c" />
      <PaletteStrip palette={_gray}    label="Gray  · #6b7280" />
    </>
  );
}

function StatusStrips() {
  return (
    <>
      <PaletteStrip palette={_success} label="Success · #16A34A" />
      <PaletteStrip palette={_warning} label="Warning · #D97706" />
      <PaletteStrip palette={_error}   label="Error   · #DC2626" />
      <PaletteStrip palette={_info}    label="Info    · #2563EB" />
    </>
  );
}

export function PaletteApp() {
  const {
    primaryHex, setPrimaryHex, primaryPalette,
    secondaryHex, setSecondaryHex, secondaryPalette,
    tertiaryHex, setTertiaryHex, tertiaryPalette,
  } = useMultiPalette();

  const { isDark, toggle } = useDarkMode();
  const [activeTab, setActiveTab] = useState<"brand" | "neutral" | "status">("brand");
  const [showcaseTab, setShowcaseTab] = useState<ShowcaseTabId>("cards");

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Header — logo only ── */}
      <header className="border-b px-5 h-12 flex items-center flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div
            className="w-4 h-4 rounded-sm"
            style={{ background: "linear-gradient(135deg, var(--p-400, #60a5fa), var(--p-700, #1d4ed8))" }}
          />
          <span className="font-semibold text-sm">UI Color Scale</span>
          <span className="text-xs text-muted-foreground hidden sm:inline">OKLCH · perceptual ramps</span>
        </div>
      </header>

      {/* ── Two-panel body ── */}
      <div className="flex flex-1 min-h-0 flex-col md:flex-row overflow-hidden">

        {/* ── Left Sidebar ── */}
        <aside className="w-full md:w-72 md:flex-shrink-0 border-b md:border-b-0 md:border-r flex flex-col overflow-hidden">

          {/* Controls at the top */}
          <div className="px-3 py-2 border-b flex items-center gap-1.5 flex-shrink-0">
            <HistoryPanel currentHex={primaryHex} onSelect={(h) => setPrimaryHex(h)} />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggle}
              className="h-8 w-8 ml-auto flex-shrink-0"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>

          {/* Category tabs */}
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as typeof activeTab)}
            className="flex flex-col flex-1 min-h-0"
          >
            <div className="px-4 pt-3 pb-2 flex-shrink-0">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="brand">Brand</TabsTrigger>
                <TabsTrigger value="neutral">Neutral</TabsTrigger>
                <TabsTrigger value="status">Status</TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto">
              <TabsContent value="brand" className="mt-0">
                <BrandTab
                  primaryHex={primaryHex}
                  onPrimaryChange={(h) => setPrimaryHex(h)}
                  secondaryHex={secondaryHex}
                  onSecondaryChange={(h) => setSecondaryHex(h)}
                  onSecondaryRemove={() => setSecondaryHex(null)}
                  tertiaryHex={tertiaryHex}
                  onTertiaryChange={(h) => setTertiaryHex(h)}
                  onTertiaryRemove={() => setTertiaryHex(null)}
                  onAddSecondary={() => setSecondaryHex(DEFAULT_SECONDARY)}
                  onAddTertiary={() => setTertiaryHex(DEFAULT_TERTIARY)}
                  primaryPalette={primaryPalette}
                />
              </TabsContent>
              <TabsContent value="neutral" className="mt-0">
                <NeutralTab />
              </TabsContent>
              <TabsContent value="status" className="mt-0">
                <StatusTab />
              </TabsContent>
            </div>
          </Tabs>
        </aside>

        {/* ── Right Main ── */}
        <main className="flex-1 overflow-y-auto">
          <PreviewProvider
            palette={primaryPalette}
            isDark={isDark}
            secondaryPalette={secondaryPalette}
            tertiaryPalette={tertiaryPalette}
          >
            {/* Palette strips */}
            <div className="px-6 py-5 border-b" style={{ backgroundColor: isDark ? "#1a1a1a" : "#f8f8f8" }}>
              <h2 className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--p-text-2)" }}>
                {activeTab === "brand"   ? "Brand Palette" :
                 activeTab === "neutral" ? "Neutral Reference Palettes" : "Status Reference Palettes"}
              </h2>
              {activeTab === "brand" && (
                <div className="flex flex-col gap-3">
                  <PaletteStrip palette={primaryPalette} label="Primary" />
                  {secondaryPalette && <PaletteStrip palette={secondaryPalette} label="Secondary" />}
                  {tertiaryPalette  && <PaletteStrip palette={tertiaryPalette}  label="Tertiary" />}
                </div>
              )}
              {activeTab === "neutral" && <div className="flex flex-col gap-3"><NeutralStrips /></div>}
              {activeTab === "status"  && <div className="flex flex-col gap-3"><StatusStrips /></div>}
            </div>

            {/* Showcase nav */}
            <div
              className="px-6 border-b flex gap-1 overflow-x-auto flex-shrink-0"
              style={{ backgroundColor: "var(--p-surface-1)" }}
            >
              {SHOWCASE_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setShowcaseTab(tab.id)}
                  className={cn(
                    "px-3 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-colors",
                    showcaseTab === tab.id
                      ? "border-current"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                  style={showcaseTab === tab.id ? { color: "var(--p-accent)", borderColor: "var(--p-accent)" } : {}}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Showcase content */}
            <div className="p-6" style={{ backgroundColor: "var(--p-surface-2)" }}>
              {showcaseTab === "cards"      && <CardsTab />}
              {showcaseTab === "components" && <ComponentsTab />}
              {showcaseTab === "apps"       && <AppsTab />}
              {showcaseTab === "charts"     && <ChartsTab />}
              {showcaseTab === "gradients"  && <GradientsTab />}
              {showcaseTab === "headings"   && <HeadingsTab />}
              {showcaseTab === "logos"      && <LogosTab />}
            </div>
          </PreviewProvider>
        </main>
      </div>
    </div>
  );
}
