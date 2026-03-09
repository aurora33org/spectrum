"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

// ── A card that wraps one component with a label ───────────────────
function ComponentCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl border flex flex-col items-center justify-center gap-3 p-5"
      style={{ backgroundColor: "var(--p-surface-1)", minHeight: 100 }}
    >
      <div className="flex items-center justify-center">{children}</div>
      <p className="text-[10px] text-muted-foreground text-center">{label}</p>
    </div>
  );
}

// ── Palette column header ──────────────────────────────────────────
function ColHeader({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-2 mb-3 px-1">
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────
export function ComponentsTab() {
  const pAccent = "var(--p-accent)";
  const sAccent = "var(--s-accent, var(--p-accent))";
  const tAccent = "var(--t-accent, var(--p-accent))";

  return (
    <div className="grid grid-cols-3 gap-6">

      {/* ── Primary column ── */}
      <div>
        <ColHeader label="Primary" color={pAccent} />
        <div className="flex flex-col gap-3">
          <ComponentCard label="Button · Primary">
            <Button>Continue →</Button>
          </ComponentCard>
          <ComponentCard label="Badge">
            <Badge>New feature</Badge>
          </ComponentCard>
          <ComponentCard label="Checkbox">
            <div className="flex items-center gap-2">
              <Checkbox id="cb-p" defaultChecked />
              <label htmlFor="cb-p" className="text-xs">Accept terms</label>
            </div>
          </ComponentCard>
          <ComponentCard label="Avatar">
            <Avatar>
              <AvatarFallback style={{ backgroundColor: pAccent, color: "white" }}>AL</AvatarFallback>
            </Avatar>
          </ComponentCard>
          <ComponentCard label="Progress 70%">
            <div className="w-32">
              <Progress value={70} />
            </div>
          </ComponentCard>
        </div>
      </div>

      {/* ── Secondary column ── */}
      <div>
        <ColHeader label="Secondary" color={sAccent} />
        <div className="flex flex-col gap-3">
          <ComponentCard label="Button · Soft">
            <Button
              variant="outline"
              style={{
                borderColor: sAccent,
                color: sAccent,
                backgroundColor: `color-mix(in srgb, ${sAccent} 10%, transparent)`,
              }}
            >
              Explore →
            </Button>
          </ComponentCard>
          <ComponentCard label="Badge · Outline">
            <Badge
              variant="outline"
              style={{ borderColor: sAccent, color: sAccent }}
            >
              Beta
            </Badge>
          </ComponentCard>
          <ComponentCard label="Switch">
            <div
              className="flex items-center gap-2"
              style={{ "--primary": sAccent } as React.CSSProperties}
            >
              <Switch defaultChecked />
              <span className="text-xs text-muted-foreground">Enabled</span>
            </div>
          </ComponentCard>
          <ComponentCard label="Avatar">
            <Avatar>
              <AvatarFallback style={{ backgroundColor: sAccent, color: "white" }}>MK</AvatarFallback>
            </Avatar>
          </ComponentCard>
          <ComponentCard label="Slider">
            <div className="w-32">
              <Slider defaultValue={[60]} max={100} step={1} />
            </div>
          </ComponentCard>
        </div>
      </div>

      {/* ── Tertiary column ── */}
      <div>
        <ColHeader label="Tertiary" color={tAccent} />
        <div className="flex flex-col gap-3">
          <ComponentCard label="Button · Ghost">
            <Button
              variant="ghost"
              style={{
                border: `1.5px solid ${tAccent}`,
                color: tAccent,
              }}
            >
              Discover →
            </Button>
          </ComponentCard>
          <ComponentCard label="Badge · Accent">
            <Badge
              style={{ backgroundColor: tAccent, color: "white", border: "none" }}
            >
              Hot
            </Badge>
          </ComponentCard>
          <ComponentCard label="Input · Focused">
            <Input
              defaultValue="Search..."
              className="w-32 text-xs h-8"
              style={{ borderColor: tAccent, outline: `2px solid color-mix(in srgb, ${tAccent} 30%, transparent)` }}
            />
          </ComponentCard>
          <ComponentCard label="Avatar">
            <Avatar>
              <AvatarFallback style={{ backgroundColor: tAccent, color: "white" }}>PX</AvatarFallback>
            </Avatar>
          </ComponentCard>
          <ComponentCard label="Progress 45%">
            <div className="w-32 h-2 rounded-full overflow-hidden" style={{ backgroundColor: `color-mix(in srgb, ${tAccent} 20%, transparent)` }}>
              <div className="h-full rounded-full w-[45%]" style={{ backgroundColor: tAccent }} />
            </div>
          </ComponentCard>
        </div>
      </div>

    </div>
  );
}
