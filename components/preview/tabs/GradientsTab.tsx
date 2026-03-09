"use client";

const GRADIENTS = [
  { label: "P-100 → P-600",         bg: "linear-gradient(135deg, var(--p-100), var(--p-600))" },
  { label: "P-400 → P-800",         bg: "linear-gradient(135deg, var(--p-400), var(--p-800))" },
  { label: "S-200 → S-700",         bg: "linear-gradient(135deg, var(--s-200, var(--p-200)), var(--s-700, var(--p-700)))" },
  { label: "T-200 → T-700",         bg: "linear-gradient(135deg, var(--t-200, var(--p-200)), var(--t-700, var(--p-700)))" },
  { label: "P → S accent",          bg: "linear-gradient(135deg, var(--p-accent), var(--s-accent, var(--p-700)))" },
  { label: "P → T accent",          bg: "linear-gradient(135deg, var(--p-accent), var(--t-accent, var(--p-300)))" },
  { label: "S-300 → T-600",         bg: "linear-gradient(135deg, var(--s-300, var(--p-300)), var(--t-600, var(--p-600)))" },
  { label: "P-200 → S-400 → T-700", bg: "linear-gradient(135deg, var(--p-200), var(--s-400, var(--p-400)), var(--t-700, var(--p-700)))" },
  { label: "P accent 135°",         bg: "var(--p-accent)" },
  { label: "S-100 → T-100",         bg: "linear-gradient(135deg, var(--s-100, var(--p-100)), var(--t-100, var(--p-100)))" },
  { label: "P-800 → S-800",         bg: "linear-gradient(135deg, var(--p-800), var(--s-800, var(--p-700)))" },
  { label: "P-300 → S-300 → T-300", bg: "linear-gradient(135deg, var(--p-300), var(--s-300, var(--p-400)), var(--t-300, var(--p-500)))" },
];

export function GradientsTab() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {GRADIENTS.map(({ label, bg }) => (
        <div
          key={label}
          className="rounded-xl flex flex-col justify-end p-3"
          style={{ background: bg, height: 160 }}
        >
          <span
            className="text-[10px] font-medium px-2 py-1 rounded"
            style={{ backgroundColor: "rgba(0,0,0,0.35)", color: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)" }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
