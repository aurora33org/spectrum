"use client";

const GRADIENTS = [
  {
    label: "P → S",
    sublabel: "Primary to Secondary",
    bg: "linear-gradient(135deg, var(--p-accent), var(--s-accent, var(--p-700)))",
  },
  {
    label: "P → T",
    sublabel: "Primary to Tertiary",
    bg: "linear-gradient(135deg, var(--p-accent), var(--t-accent, var(--p-300)))",
  },
  {
    label: "S → T",
    sublabel: "Secondary to Tertiary",
    bg: "linear-gradient(135deg, var(--s-accent, var(--p-300)), var(--t-accent, var(--p-600)))",
  },
  {
    label: "P → S → T",
    sublabel: "Three-stop blend",
    bg: "linear-gradient(135deg, var(--p-200), var(--s-400, var(--p-400)), var(--t-700, var(--p-700)))",
  },
  {
    label: "P-100 → P-600",
    sublabel: "Primary light to mid",
    bg: "linear-gradient(135deg, var(--p-100), var(--p-600))",
  },
  {
    label: "P-400 → P-800",
    sublabel: "Primary mid to dark",
    bg: "linear-gradient(135deg, var(--p-400), var(--p-800))",
  },
  {
    label: "S-200 → S-700",
    sublabel: "Secondary scale",
    bg: "linear-gradient(135deg, var(--s-200, var(--p-200)), var(--s-700, var(--p-700)))",
  },
  {
    label: "T-200 → T-700",
    sublabel: "Tertiary scale",
    bg: "linear-gradient(135deg, var(--t-200, var(--p-200)), var(--t-700, var(--p-700)))",
  },
  {
    label: "Radial P/S",
    sublabel: "Radial P center → S edge",
    bg: "radial-gradient(circle at 40% 40%, var(--p-300), var(--s-700, var(--p-700)))",
  },
  {
    label: "P-800 → S-800",
    sublabel: "Dark contrast",
    bg: "linear-gradient(135deg, var(--p-800), var(--s-800, var(--p-700)))",
  },
  {
    label: "S-100 → T-100",
    sublabel: "Pale blend",
    bg: "linear-gradient(135deg, var(--s-100, var(--p-100)), var(--t-100, var(--p-100)))",
  },
  {
    label: "P-300 → S-300 → T-300",
    sublabel: "Mid-tone trio",
    bg: "linear-gradient(135deg, var(--p-300), var(--s-300, var(--p-400)), var(--t-300, var(--p-500)))",
  },
];

export function GradientsTab() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {GRADIENTS.map(({ label, sublabel, bg }) => (
        <div
          key={label}
          className="rounded-2xl flex flex-col justify-end p-4"
          style={{ background: bg, height: 176 }}
        >
          <div
            className="rounded-lg px-3 py-2"
            style={{ backgroundColor: "rgba(0,0,0,0.3)", backdropFilter: "blur(6px)" }}
          >
            <p className="text-xs font-bold text-white">{label}</p>
            <p className="text-[10px] text-white/70 mt-0.5">{sublabel}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
