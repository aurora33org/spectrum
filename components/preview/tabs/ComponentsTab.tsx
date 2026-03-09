"use client";

// ── Component preview card shell ──────────────────────────────────
function ComponentCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl border border-white/10 flex flex-col items-center justify-center gap-3 p-4"
      style={{ backgroundColor: "#1a1a1a", minHeight: 100 }}
    >
      <div className="flex items-center justify-center flex-1">{children}</div>
      <p className="text-[10px] text-white/40 text-center">{label}</p>
    </div>
  );
}

// ── Mini components ───────────────────────────────────────────────

function Avatar({ color, initials }: { color: string; initials: string }) {
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}

function Slider({ accent }: { accent: string }) {
  return (
    <div className="w-24 flex flex-col gap-1">
      <div className="h-1.5 rounded-full bg-white/10 relative">
        <div className="absolute left-0 top-0 h-full rounded-full w-2/3" style={{ backgroundColor: accent }} />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full shadow left-[calc(66%-6px)]"
          style={{ backgroundColor: accent }}
        />
      </div>
    </div>
  );
}

function Checkbox({ accent }: { accent: string }) {
  return (
    <div
      className="w-5 h-5 rounded flex items-center justify-center"
      style={{ backgroundColor: accent }}
    >
      <svg viewBox="0 0 12 12" width="12" height="12" fill="none">
        <polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function MiniButton({ accent, label, soft }: { accent: string; label: string; soft?: boolean }) {
  return (
    <div
      className="px-3 py-1.5 rounded-lg text-[11px] font-medium"
      style={
        soft
          ? { backgroundColor: `color-mix(in srgb, ${accent} 20%, transparent)`, color: accent }
          : { backgroundColor: accent, color: "white" }
      }
    >
      {label}
    </div>
  );
}

function MiniTag({ accent, label }: { accent: string; label: string }) {
  return (
    <div
      className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
      style={{ backgroundColor: `color-mix(in srgb, ${accent} 20%, transparent)`, color: accent }}
    >
      {label}
    </div>
  );
}

function RadioDot({ accent }: { accent: string }) {
  return (
    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ borderColor: accent }}>
      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }} />
    </div>
  );
}

function LinkText({ accent }: { accent: string }) {
  return (
    <span className="text-xs underline underline-offset-2" style={{ color: accent }}>
      Learn more →
    </span>
  );
}

function Toggle({ accent }: { accent: string }) {
  return (
    <div className="w-10 h-5 rounded-full relative" style={{ backgroundColor: accent }}>
      <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white shadow" />
    </div>
  );
}

function FocusInput({ accent }: { accent: string }) {
  return (
    <div
      className="w-24 h-7 rounded-md border-2 px-2 flex items-center text-[10px] text-white/60"
      style={{ borderColor: accent, backgroundColor: "rgba(255,255,255,0.05)" }}
    >
      Text...
    </div>
  );
}

function ProgressBar({ accent }: { accent: string }) {
  return (
    <div className="w-24 h-2 rounded-full bg-white/10">
      <div className="h-full rounded-full w-[70%]" style={{ backgroundColor: accent }} />
    </div>
  );
}

function TogglePill({ accent }: { accent: string }) {
  return (
    <div className="flex rounded-lg overflow-hidden border border-white/10">
      <div className="px-2.5 py-1.5 text-[10px] font-medium text-white/40">Off</div>
      <div className="px-2.5 py-1.5 text-[10px] font-medium text-white" style={{ backgroundColor: accent }}>On</div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────
export function ComponentsTab() {
  const p = "var(--p-accent)";
  const s = "var(--s-accent, var(--p-accent))";
  const t = "var(--t-accent, var(--p-accent))";

  return (
    <div className="space-y-4">
      {/* Row labels */}
      <div className="grid grid-cols-5 gap-3">
        {/* Row 1 — Primary */}
        <ComponentCard label="Avatar">
          <Avatar color={p} initials="EV" />
        </ComponentCard>
        <ComponentCard label="Slider">
          <Slider accent={p} />
        </ComponentCard>
        <ComponentCard label="Checkbox">
          <Checkbox accent={p} />
        </ComponentCard>
        <ComponentCard label="Button">
          <MiniButton accent={p} label="Continue →" />
        </ComponentCard>
        <ComponentCard label="Badge">
          <MiniTag accent={p} label="New" />
        </ComponentCard>

        {/* Row 2 — Secondary */}
        <ComponentCard label="Radio">
          <RadioDot accent={s} />
        </ComponentCard>
        <ComponentCard label="Link">
          <LinkText accent={s} />
        </ComponentCard>
        <ComponentCard label="Button (soft)">
          <MiniButton accent={s} label="Continue →" soft />
        </ComponentCard>
        <ComponentCard label="Switch">
          <Toggle accent={s} />
        </ComponentCard>
        <ComponentCard label="Avatar">
          <Avatar color={s} initials="EV" />
        </ComponentCard>

        {/* Row 3 — Tertiary */}
        <ComponentCard label="Avatar">
          <Avatar color={t} initials="EV" />
        </ComponentCard>
        <ComponentCard label="Toggle pill">
          <TogglePill accent={t} />
        </ComponentCard>
        <ComponentCard label="Input">
          <FocusInput accent={t} />
        </ComponentCard>
        <ComponentCard label="Tag">
          <MiniTag accent={t} label="Label" />
        </ComponentCard>
        <ComponentCard label="Progress">
          <ProgressBar accent={t} />
        </ComponentCard>
      </div>

      {/* Legend */}
      <div className="flex gap-6 px-1">
        {[
          { label: "Primary", color: p },
          { label: "Secondary", color: s },
          { label: "Tertiary", color: t },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
