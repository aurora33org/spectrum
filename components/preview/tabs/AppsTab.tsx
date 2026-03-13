"use client";

// ── Phone component ──────────────────────────────────────────────────
interface PhoneProps {
  accentColor: string;
  headerGradient: string;
  label: string;
}

function PhoneFrame({ accentColor, headerGradient, label }: PhoneProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* Phone device */}
      <div
        className="relative flex flex-col overflow-hidden flex-shrink-0"
        style={{
          width: 200,
          height: 400,
          borderRadius: "2rem",
          backgroundColor: "var(--p-surface-1)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          border: "1px solid var(--p-border)",
        }}
      >
        {/* Notch */}
        <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
          <div className="w-16 h-4 rounded-full" style={{ backgroundColor: "var(--p-surface-3)" }} />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col px-3 py-2 gap-3 overflow-hidden">
          {/* Header with gradient */}
          <div
            className="rounded-lg p-3"
            style={{ backgroundColor: accentColor }}
          >
            <p className="text-[9px] font-semibold" style={{ color: "var(--p-text-2)" }}>Welcome</p>
            <p className="text-sm font-bold mt-1" style={{ color: "var(--p-text-1)" }}>Dashboard</p>
          </div>

          {/* Hero card */}
          <div
            className="rounded-lg p-2.5 flex-1"
            style={{ backgroundColor: accentColor }}
          >
            <p className="text-[8px] font-semibold" style={{ color: "var(--p-text-2)" }}>Today's Stats</p>
            <p className="text-lg font-bold mt-1" style={{ color: "var(--p-text-1)" }}>8,592</p>
            <p className="text-[8px] mt-0.5" style={{ color: "var(--p-text-2)" }}>+12% from yesterday</p>
          </div>

          {/* Badges row */}
          <div className="flex gap-1.5">
            {["Primary", "Secondary", "Tertiary"].map((tag, i) => (
              <div
                key={tag}
                className="flex-1 rounded px-2 py-1.5 text-center text-[7px] font-semibold text-white"
                style={{
                  backgroundColor:
                    i === 0 ? accentColor :
                    i === 1 ? "var(--s-accent, var(--p-400))" :
                    "var(--t-accent, var(--p-300))"
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          {/* Nav */}
          <div className="flex justify-around pt-2" style={{ borderTop: "1px solid var(--p-border)" }}>
            {["⊕", "♡", "◎"].map((icon, i) => (
              <div key={i} className="text-center">
                <span
                  className="text-base"
                  style={{ color: i === 0 ? accentColor : "var(--p-text-2)" }}
                >
                  {icon}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Label below phone */}
      <p className="text-xs font-semibold text-center" style={{ color: accentColor }}>
        {label}
      </p>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────
export function AppsTab() {
  return (
    <div className="flex justify-center items-center gap-8 py-6">
      <PhoneFrame
        accentColor="var(--p-accent)"
        headerGradient="linear-gradient(135deg, var(--p-600), var(--p-500))"
        label="Primary"
      />
      <PhoneFrame
        accentColor="var(--s-accent, var(--p-400))"
        headerGradient="linear-gradient(135deg, var(--s-600, var(--p-500)), var(--s-400, var(--p-400)))"
        label="Secondary"
      />
      <PhoneFrame
        accentColor="var(--t-accent, var(--p-300))"
        headerGradient="linear-gradient(135deg, var(--t-600, var(--p-500)), var(--t-400, var(--p-300)))"
        label="Tertiary"
      />
    </div>
  );
}
