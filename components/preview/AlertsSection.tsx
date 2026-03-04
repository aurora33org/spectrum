const ALERTS = [
  {
    label: "Info",
    icon: "ℹ",
    message: "Your export is ready to download.",
    bg: "var(--p-surface-1)",
    text: "var(--p-text-1)",
    border: "var(--p-border)",
    accentBar: true,
  },
  {
    label: "Neutral",
    icon: "◌",
    message: "Processing your request...",
    bg: "var(--p-surface-2)",
    text: "var(--p-text-2)",
    border: "var(--p-border)",
    accentBar: false,
  },
  {
    label: "Toast",
    icon: "✓",
    message: "Palette saved to history.",
    bg: "var(--p-accent)",
    text: "#ffffff",
    border: "transparent",
    accentBar: false,
  },
  {
    label: "Badge",
    icon: "★",
    message: "3 items updated this session",
    bg: "var(--p-badge)",
    text: "var(--p-badge-text)",
    border: "var(--p-badge)",
    accentBar: false,
  },
];

export function AlertsSection() {
  return (
    <div className="flex flex-col gap-2">
      {ALERTS.map((a) => (
        <div
          key={a.label}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 border text-xs"
          style={{
            backgroundColor: a.bg,
            color: a.text,
            borderColor: a.border,
            borderLeft: a.accentBar ? "3px solid var(--p-accent)" : undefined,
          }}
        >
          <span className="text-sm font-bold flex-shrink-0">{a.icon}</span>
          <div className="flex-1">
            <span className="font-semibold">{a.label}: </span>
            {a.message}
          </div>
        </div>
      ))}
    </div>
  );
}
