"use client";

// ── Data ─────────────────────────────────────────────────────────
const BAR_DATA = [
  [60, 45, 30], [80, 60, 40], [50, 70, 55], [90, 40, 65],
  [70, 85, 45], [40, 55, 75], [65, 50, 60], [85, 75, 35],
];

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
  { pct: 30, color: "var(--s-accent, #888)", label: "Secondary" },
  { pct: 25, color: "var(--t-accent, #555)", label: "Tertiary" },
];

const LEGEND = [
  { label: "Primary",   color: "var(--p-accent)" },
  { label: "Secondary", color: "var(--s-accent, #888)" },
  { label: "Tertiary",  color: "var(--t-accent, #555)" },
];

function Legend() {
  return (
    <div className="flex gap-4 mt-2">
      {LEGEND.map(({ label, color }) => (
        <div key={label} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: color }} />
          {label}
        </div>
      ))}
    </div>
  );
}

// ── Multi Bar Chart ───────────────────────────────────────────────
function MultiBarChart() {
  const barColors = ["var(--p-accent)", "var(--s-accent, #888)", "var(--t-accent, #555)"];

  return (
    <div className="flex flex-col h-full">
      <p className="text-xs font-semibold mb-3">Multi Bar</p>
      <div className="flex-1 flex items-end gap-2">
        {BAR_DATA.map((group, gi) => (
          <div key={gi} className="flex-1 flex items-end gap-0.5">
            {group.map((h, bi) => (
              <div
                key={bi}
                className="flex-1 rounded-t-sm"
                style={{ height: `${h}%`, backgroundColor: barColors[bi], minWidth: 2 }}
              />
            ))}
          </div>
        ))}
      </div>
      {/* x-axis line */}
      <div className="h-px bg-border mt-1" />
      <Legend />
    </div>
  );
}

// ── Line Chart ────────────────────────────────────────────────────
function LineChartSvg() {
  const w = 300;
  const h = 100;
  const colors = ["var(--p-accent)", "var(--s-accent, #888)", "var(--t-accent, #555)"];
  const gridLines = [0, 25, 50, 75, 100];

  const toPoints = (data: number[]) =>
    data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / 100) * h}`).join(" ");

  return (
    <div className="flex flex-col h-full">
      <p className="text-xs font-semibold mb-3">Line Chart</p>
      <div className="flex-1">
        <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
          {/* Gridlines */}
          {gridLines.map((y) => (
            <line
              key={y}
              x1={0} y1={h - (y / 100) * h}
              x2={w} y2={h - (y / 100) * h}
              stroke="currentColor" strokeOpacity="0.07" strokeWidth="1"
            />
          ))}
          {/* Lines */}
          {LINE_DATA.map((data, i) => (
            <polyline
              key={i}
              points={toPoints(data)}
              fill="none"
              stroke={colors[i]}
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              opacity="0.9"
            />
          ))}
        </svg>
      </div>
      <Legend />
    </div>
  );
}

// ── Donut Chart ───────────────────────────────────────────────────
function DonutChart() {
  const size = 100;
  const r = 36;
  const strokeW = 14;
  const circ = 2 * Math.PI * r;

  let offset = 0;
  const slices = DONUT_SLICES.map((s) => {
    const dash = (s.pct / 100) * circ;
    const slice = { ...s, dash, gap: circ - dash, offset };
    offset += dash;
    return slice;
  });

  return (
    <div className="flex flex-col h-full">
      <p className="text-xs font-semibold mb-3">Donut Chart</p>
      <div className="flex-1 flex items-center justify-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeOpacity="0.07" strokeWidth={strokeW} />
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
              strokeLinecap="butt"
            />
          ))}
        </svg>
      </div>
      <Legend />
    </div>
  );
}

// ── Stacked Bar Chart ─────────────────────────────────────────────
function StackedBarChart() {
  const colors = ["var(--p-accent)", "var(--s-accent, #888)", "var(--t-accent, #555)"];

  return (
    <div className="flex flex-col h-full">
      <p className="text-xs font-semibold mb-3">Stacked Bar</p>
      <div className="flex-1 flex items-end gap-2">
        {STACKED_DATA.map((group, gi) => {
          const total = group.reduce((a, b) => a + b, 0);
          return (
            <div key={gi} className="flex-1 flex flex-col-reverse rounded-t-sm overflow-hidden" style={{ height: "100%" }}>
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
    <div className="grid grid-cols-2 gap-4 h-full">
      <div className="rounded-xl border p-4" style={{ backgroundColor: "var(--p-surface-1)", minHeight: 220 }}>
        <MultiBarChart />
      </div>
      <div className="rounded-xl border p-4" style={{ backgroundColor: "var(--p-surface-1)", minHeight: 220 }}>
        <LineChartSvg />
      </div>
      <div className="rounded-xl border p-4" style={{ backgroundColor: "var(--p-surface-1)", minHeight: 220 }}>
        <DonutChart />
      </div>
      <div className="rounded-xl border p-4" style={{ backgroundColor: "var(--p-surface-1)", minHeight: 220 }}>
        <StackedBarChart />
      </div>
    </div>
  );
}
