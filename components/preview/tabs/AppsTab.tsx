"use client";

const SLEEP_BARS = [65, 80, 45, 90, 70, 85, 55];

function SleepChart() {
  return (
    <div>
      <p className="text-[9px] text-white/50 mb-1.5">Sleep · 7h 23m avg</p>
      <div className="flex items-end gap-1 h-10">
        {SLEEP_BARS.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${h}%`,
              backgroundColor: i % 2 === 0 ? "var(--p-accent)" : "var(--p-600)",
              minWidth: 4,
              opacity: 0.9,
            }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-1">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i} className="flex-1 text-center text-[8px] text-white/30">{d}</span>
        ))}
      </div>
    </div>
  );
}

function RingChart({
  pct,
  color,
  size = 56,
  label,
  value,
}: {
  pct: number;
  color: string;
  size?: number;
  label: string;
  value: string;
}) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <div className="flex items-center gap-2">
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={6} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeLinecap="round"
        />
      </svg>
      <div>
        <p className="text-[9px] text-white/50">{label}</p>
        <p className="text-xs font-bold text-white">{value}</p>
        <p className="text-[9px]" style={{ color }}>{pct}%</p>
      </div>
    </div>
  );
}

const HR_POINTS = [65, 72, 68, 85, 78, 92, 88, 76, 80, 95, 82, 70];

function HeartRateChart() {
  const w = 200;
  const h = 48;
  const max = 100;
  const pts = HR_POINTS.map((v, i) => `${(i / (HR_POINTS.length - 1)) * w},${h - (v / max) * h}`).join(" ");

  return (
    <div>
      <p className="text-[9px] text-white/50 mb-1">Heart Rate · 78 bpm avg</p>
      <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <polyline
          points={pts}
          fill="none"
          stroke="var(--p-accent)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>
    </div>
  );
}

export function AppsTab() {
  return (
    <div className="flex justify-center py-4">
      {/* Phone frame */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: 256,
          borderRadius: "2.5rem",
          backgroundColor: "#111",
          boxShadow: "0 32px 64px rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Notch */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-20 h-5 rounded-full bg-black" />
        </div>

        {/* App content */}
        <div className="flex-1 px-5 py-4 flex flex-col gap-5 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-white/40">Good morning</p>
              <p className="text-sm font-bold text-white">Summary</p>
            </div>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ backgroundColor: "var(--p-accent)" }}
            >
              EV
            </div>
          </div>

          {/* Rings row */}
          <div className="flex justify-between">
            <RingChart
              pct={86}
              color="var(--s-accent, var(--p-accent))"
              label="Steps"
              value="8,612"
            />
            <RingChart
              pct={60}
              color="var(--t-accent, var(--p-300))"
              label="Distance"
              value="4.8 km"
            />
          </div>

          {/* Sleep */}
          <SleepChart />

          {/* Heart rate */}
          <HeartRateChart />

          {/* Bottom nav */}
          <div className="flex justify-around pt-2 pb-1 border-t border-white/10">
            {[
              { icon: "⊕", label: "Home", active: true },
              { icon: "♡", label: "Health", active: false },
              { icon: "◎", label: "Goals", active: false },
              { icon: "☰", label: "More", active: false },
            ].map(({ icon, label, active }) => (
              <div key={label} className="flex flex-col items-center gap-0.5">
                <span
                  className="text-base"
                  style={{ color: active ? "var(--p-accent)" : "rgba(255,255,255,0.3)" }}
                >
                  {icon}
                </span>
                <span
                  className="text-[8px]"
                  style={{ color: active ? "var(--p-accent)" : "rgba(255,255,255,0.3)" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
