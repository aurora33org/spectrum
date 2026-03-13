"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// ── Section Header with color indicator (neutral background) ────────────────────────────
function SectionHeader({ label, color }: { label: string; color: string }) {
  return (
    <div
      className="px-4 py-3 mb-4 flex items-center gap-2 rounded-lg"
      style={{
        borderLeft: `3px solid ${color}`,
        backgroundColor: "rgba(128, 128, 128, 0.08)",
      }}
    >
      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
      <p className="text-sm font-semibold">{label}</p>
    </div>
  );
}

// ── Component showcase card (neutral background for contrast) ────────────────────────────────────────
function ComponentBox({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-4 rounded-lg" style={{ backgroundColor: "var(--neutral-bg)" }}>
      <div className="flex items-center justify-center min-h-10">{children}</div>
      <p className="text-[9px] text-muted-foreground text-center">{label}</p>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────
export function ComponentsTab() {
  const pAccent = "var(--p-accent)";
  const sAccent = "var(--s-accent, var(--p-accent))";
  const tAccent = "var(--t-accent, var(--p-accent))";

  return (
    <div className="grid grid-cols-3 gap-8">

      {/* ═══ PRIMARY SECTION ═══ */}
      <div>
        <SectionHeader label="Primary" color={pAccent} />
        <div className="space-y-3">
          <ComponentBox label="Button · Solid">
            <Button className="px-4 py-2 text-sm" style={{ backgroundColor: pAccent }}>
              Continue →
            </Button>
          </ComponentBox>
          <ComponentBox label="Badge · Accent">
            <Badge style={{ backgroundColor: pAccent, color: "#fff", border: "none" }}>
              Featured
            </Badge>
          </ComponentBox>
          <ComponentBox label="Alert · Primary">
            <Alert style={{ borderColor: pAccent, borderLeftWidth: "3px" }}>
              <AlertCircle className="h-4 w-4" style={{ color: pAccent }} />
              <AlertDescription className="text-xs">Primary message here</AlertDescription>
            </Alert>
          </ComponentBox>
          <ComponentBox label="Toggle · Enabled">
            <div className="flex items-center gap-2">
              <Switch defaultChecked style={{ "--primary": pAccent } as React.CSSProperties} />
              <span className="text-xs text-muted-foreground">On</span>
            </div>
          </ComponentBox>
          <ComponentBox label="Progress · 70%">
            <div className="w-32 h-3">
              <Progress value={70} />
            </div>
          </ComponentBox>
        </div>
      </div>

      {/* ═══ SECONDARY SECTION ═══ */}
      <div>
        <SectionHeader label="Secondary" color={sAccent} />
        <div className="space-y-3">
          <ComponentBox label="Button · Outline">
            <Button
              variant="outline"
              className="px-4 py-2 text-sm"
              style={{
                borderColor: sAccent,
                color: sAccent,
                backgroundColor: `color-mix(in srgb, ${sAccent} 8%, transparent)`,
              }}
            >
              Explore →
            </Button>
          </ComponentBox>
          <ComponentBox label="Badge · Outline">
            <Badge
              variant="outline"
              style={{ borderColor: sAccent, color: sAccent }}
            >
              In Development
            </Badge>
          </ComponentBox>
          <ComponentBox label="Alert · Secondary">
            <Alert style={{ borderColor: sAccent, borderLeftWidth: "3px" }}>
              <AlertCircle className="h-4 w-4" style={{ color: sAccent }} />
              <AlertDescription className="text-xs">Secondary notice here</AlertDescription>
            </Alert>
          </ComponentBox>
          <ComponentBox label="Toggle · Disabled">
            <div className="flex items-center gap-2">
              <Switch style={{ "--primary": sAccent } as React.CSSProperties} />
              <span className="text-xs text-muted-foreground">Off</span>
            </div>
          </ComponentBox>
          <ComponentBox label="Progress · 45%">
            <div className="w-32 h-3">
              <Progress value={45} />
            </div>
          </ComponentBox>
        </div>
      </div>

      {/* ═══ TERTIARY SECTION ═══ */}
      <div>
        <SectionHeader label="Tertiary" color={tAccent} />
        <div className="space-y-3">
          <ComponentBox label="Button · Ghost">
            <Button
              variant="ghost"
              className="px-4 py-2 text-sm border"
              style={{
                borderColor: tAccent,
                color: tAccent,
              }}
            >
              Discover →
            </Button>
          </ComponentBox>
          <ComponentBox label="Badge · Accent">
            <Badge
              style={{ backgroundColor: tAccent, color: "white", border: "none" }}
            >
              Hot & New
            </Badge>
          </ComponentBox>
          <ComponentBox label="Alert · Tertiary">
            <Alert style={{ borderColor: tAccent, borderLeftWidth: "3px" }}>
              <AlertCircle className="h-4 w-4" style={{ color: tAccent }} />
              <AlertDescription className="text-xs">Tertiary warning here</AlertDescription>
            </Alert>
          </ComponentBox>
          <ComponentBox label="Toggle · Intermediate">
            <div className="flex items-center gap-2">
              <Switch defaultChecked style={{ "--primary": tAccent } as React.CSSProperties} />
              <span className="text-xs text-muted-foreground">Mixed</span>
            </div>
          </ComponentBox>
          <ComponentBox label="Progress · 60%">
            <div className="w-32 h-3">
              <Progress value={60} />
            </div>
          </ComponentBox>
        </div>
      </div>

    </div>
  );
}
