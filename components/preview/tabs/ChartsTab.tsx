"use client";

// ── Data ─────────────────────────────────────────────────────────
const BAR_DATA = [
  [60, 45, 30], [80, 60, 40], [50, 70, 55], [90, 40, 65],
  [70, 85, 45], [40, 55, 75], [65, 50, 60], [85, 75, 35],
];

const X_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];

const LINE_DATA = [
  [30, 50, 40, 65, 55, 75, 60, 80, 70, 90, 65, 85],
  [20, 35, 25, 45, 40, 55, 45, 65, 50, 70, 55, 72],
  [10, 25, 18, 35, 28, 45, 35, 52, 40, 58, 45, 60],
];

const STACKED_DATA = [
  [40, 35, 25], [30, 45, 25], [50, 30, 20], [25, 40, 35],
  [45, 30, 25], [35, 45, 20], [20, 50, 30], [40, 35, 25],
];

const DONUT_SLICES = [
  { pct: 45, color: "var(--p-accent)", label: "Primary" },
  { pct: 30, color: "var(--s-accent, var(--p-300))", label: "Secondary" },
  { pct: 25, color: "var(--t-accent, var(--p-200))", label: "Tertiary" },
];

const LEGEND = [
  { label: "Primary",   color: "var(--p-accent)" },
  { label: "Secondary", color: "var(--s-accent, var(--p-300))" },
  { label: "Tertiary",  color: "var(--t-accent, var(--p-200))" },
];

function Legend() {
  return (
    <div className="flex gap-4 mt-2">
      {LEGEND.map(({ label, color }) => (
        <div key={label} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
          {label}
        </div>
      ))}
    </div>
  );
}

// ── Multi Bar Chart ───────────────────────────────────────────────
function MultiBarChart() {
  const barColors = ["var(--p-accent)", "var(--s-accent, var(--p-300))", "var(--t-accent, var(--p-200))"];

  return (
    <div className="flex flex-col h-full">
      <p className="text-xs font-semibold mb-3">Revenue by Category</p>
      <div className="flex-1 flex items-end gap-3">
        {BAR_DATA.map((group, gi) => (
          <div key={gi} className="flex-1 flex flex-col items-stretch gap-0.5 h-full">
            <div className="flex-1 flex items-end gap-1">
              {group.map((h, bi) => (
                <div
                  key={bi}
                  className="flex-1 rounded-t-sm"
                  style={{ height: `${h}%`, backgroundColor: barColors[bi], minWidth: 8 }}
                />
              ))}
            </div>
            <p className="text-[9px] text-muted-foreground text-center">{X_LABELS[gi]}</p>
          </div>
        ))}
      </div>
      <div className="h-px bg-border mt-1" />
      <Legend />
    </div>
  );
}

// ── Line Chart ────────────────────────────────────────────────────
function LineChartSvg() {
  const w = 300;
  const h = 100;
  const colors = ["var(--p-accent)", "var(--s-accent, var(--p-300))", "var(--t-accent, var(--p-200))"];
  const gridLines = [0, 25, 50, 75, 100];

  const toPoints = (data: number[]) =>
    data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / 100) * h}`).join(" ");

  const toAreaPath = (data: number[]) => {
    const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / 100) * h}`);
    return `M${pts[0]} L${pts.join(" L")} L${w},${h} L0,${h} Z`;
  };

  return (
    <div className="flex flex-col h-full">
      <p className="text-xs font-semibold mb-3">Trend Over Time</p>
      <div className="flex-1">
        <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
          {/* Gridlines */}
          {gridLines.map((y) => (
            <line
              key={y}
              x1={0} y1={h - (y / 100) * h}
              x2={w} y2={h - (y / 100) * h}
              stroke="currentColor" strokeOpacity="0.1" strokeWidth="1"
            />
          ))}
          {/* Area fills */}
          {LINE_DATA.map((data, i) => (
            <path
              key={`area-${i}`}
              d={toAreaPath(data)}
              fill={colors[i]}
              fillOpacity="0.12"
            />
          ))}
          {/* Lines */}
          {LINE_DATA.map((data, i) => (
            <polyline
              key={i}
              points={toPoints(data)}
              fill="none"
              stroke={colors[i]}
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              opacity="0.95"
            />
          ))}
          {/* Data points */}
          {LINE_DATA.map((data, i) =>
            data.map((v, pi) => (
              <circle
                key={`dot-${i}-${pi}`}
                cx={(pi / (data.length - 1)) * w}
                cy={h - (v / 100) * h}
                r="2"
                fill={colors[i]}
                opacity="0.8"
              />
            ))
          )}
        </svg>
      </div>
      <Legend />
    </div>
  );
}

// ── Donut Chart ───────────────────────────────────────────────────
function DonutChart() {
  const size = 160;
  const r = 54;
  const strokeW = 22;
  const circ = 2 * Math.PI * r;

  let offset = 0;
  const slices = DONUT_SLICES.map((s) => {
    const dash = (s.pct / 100) * circ;
    const slice = { ...s, dash, gap: circ - dash, offset };
    offset += dash;
    return slice;
  });

  return (
    <div className="flex flex-col h-full gap-4">
      <p className="text-xs font-semibold">Distribution</p>
      <div className="flex-1 flex items-center justify-between">
        <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth={strokeW} />
            {slices.map((s, i) => (
              <circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth={strokeW}
                strokeDasharray={`${s.dash} ${s.gap}`}
                strokeDashoffset={-s.offset}
                strokeLinecap="round"
              />
            ))}
          </svg>
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ color: "var(--p-accent)" }}
          >
            <span className="text-2xl font-bold">45%</span>
            <span className="text-[10px] text-muted-foreground">Primary</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-xs">
          {slices.map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: s.color }} />
              <span className="text-muted-foreground">{s.label}</span>
              <span className="font-semibold ml-1">{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Stacked Bar Chart ─────────────────────────────────────────────
function StackedBarChart() {
  const colors = ["var(--p-accent)", "var(--s-accent, var(--p-300))", "var(--t-accent, var(--p-200))"];

  return (
    <div className="flex flex-col h-full">
      <p className="text-xs font-semibold mb-3">Composition</p>
      <div className="flex-1 flex items-end gap-3 justify-center">
        {STACKED_DATA.map((group, gi) => {
          const total = group.reduce((a, b) => a + b, 0);
          return (
            <div key={gi} className="flex flex-col rounded-t-sm overflow-hidden" style={{ height: "100%", width: 32 }}>
              {group.map((v, bi) => (
                <div
                  key={bi}
                  style={{ height: `${(v / total) * 100}%`, backgroundColor: colors[bi] }}
                />
              ))}
            </div>
          );
        })}
      </div>
      <div className="h-px bg-border mt-1" />
      <Legend />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────
export function ChartsTab() {
  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      {/* Top: Multi Bar — spans 2 columns */}
      <div className="col-span-2 rounded-xl border p-4" style={{ backgroundColor: "var(--p-surface-1)", height: 240 }}>
        <MultiBarChart />
      </div>

      {/* Top right: Reserved space — can be empty or another chart */}
      <div className="rounded-xl border p-4" style={{ backgroundColor: "var(--p-surface-1)", height: 240 }}>
        <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
          Additional metrics
        </div>
      </div>

      {/* Bottom: Line + Donut + Stacked */}
      <div className="rounded-xl border p-4" style={{ backgroundColor: "var(--p-surface-1)", height: 240 }}>
        <LineChartSvg />
      </div>
      <div className="rounded-xl border p-4" style={{ backgroundColor: "var(--p-surface-1)", height: 240 }}>
        <DonutChart />
      </div>
      <div className="rounded-xl border p-4" style={{ backgroundColor: "var(--p-surface-1)", height: 240 }}>
        <StackedBarChart />
      </div>
    </div>
  );
}
