const STATS = [
  { label: "Revenue",      value: "$48,295", delta: "+12.5%", up: true  },
  { label: "Active Users", value: "8,642",   delta: "+3.2%",  up: true  },
  { label: "Bounce Rate",  value: "24.8%",   delta: "-1.4%",  up: false },
];

export function StatsSection() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {STATS.map((s) => (
        <div
          key={s.label}
          className="rounded-lg p-4"
          style={{
            backgroundColor: "var(--p-surface-1)",
            borderLeft: "3px solid var(--p-accent)",
          }}
        >
          <p
            className="text-[11px] uppercase tracking-wide font-medium"
            style={{ color: "var(--p-text-2)" }}
          >
            {s.label}
          </p>
          <p className="text-2xl font-bold mt-1" style={{ color: "var(--p-text-1)" }}>
            {s.value}
          </p>
          <p
            className="text-xs mt-1 font-medium"
            style={{ color: s.up ? "var(--p-accent)" : "var(--p-text-2)" }}
          >
            {s.delta}
          </p>
        </div>
      ))}
    </div>
  );
}
