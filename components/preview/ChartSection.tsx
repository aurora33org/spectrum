const BARS = [
  { label: "Mon", value: 60, stop: 400 },
  { label: "Tue", value: 85, stop: 500 },
  { label: "Wed", value: 45, stop: 300 },
  { label: "Thu", value: 92, stop: 600 },
  { label: "Fri", value: 70, stop: 500 },
  { label: "Sat", value: 55, stop: 400 },
  { label: "Sun", value: 38, stop: 300 },
];

export function ChartSection() {
  return (
    <div>
      <div className="flex items-end gap-2 h-28">
        {BARS.map((bar) => (
          <div key={bar.label} className="flex flex-col items-center gap-1 flex-1">
            <span className="text-[9px]" style={{ color: "var(--p-text-2)" }}>
              {bar.value}
            </span>
            <div
              className="w-full rounded-t-sm"
              style={{
                height: `${bar.value}%`,
                backgroundColor: `var(--p-${bar.stop})`,
                minHeight: "4px",
              }}
            />
            <span className="text-[9px]" style={{ color: "var(--p-text-2)" }}>
              {bar.label}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-3 justify-center">
        {[300, 400, 500, 600].map((stop) => (
          <div key={stop} className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: `var(--p-${stop})` }}
            />
            <span className="text-[10px]" style={{ color: "var(--p-text-2)" }}>
              p-{stop}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
