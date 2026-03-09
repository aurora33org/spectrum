"use client";

// ── SVG Icons ─────────────────────────────────────────────────────

function ForwardIcon({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <polyline points="6,8 16,16 6,24" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="16,8 26,16 16,24" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GrowthIcon({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="18" width="5" height="10" rx="1" fill={color} />
      <rect x="13.5" y="12" width="5" height="16" rx="1" fill={color} />
      <rect x="23" y="6" width="5" height="22" rx="1" fill={color} />
    </svg>
  );
}

function OctopusIcon({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const r = deg * (Math.PI / 180);
        const x2 = 16 + Math.cos(r) * 12;
        const y2 = 16 + Math.sin(r) * 12;
        return <line key={i} x1="16" y1="16" x2={x2} y2={y2} stroke={color} strokeWidth="2.5" strokeLinecap="round" />;
      })}
      <circle cx="16" cy="16" r="4" fill={color} />
    </svg>
  );
}

function LinkIcon({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="12" width="10" height="8" rx="4" stroke={color} strokeWidth="2.5" fill="none" />
      <rect x="18" y="12" width="10" height="8" rx="4" stroke={color} strokeWidth="2.5" fill="none" />
      <line x1="14" y1="16" x2="18" y2="16" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function BerryIcon({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <polygon points="16,4 27,10 27,22 16,28 5,22 5,10" fill={color} />
    </svg>
  );
}

function VeloIcon({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <polyline points="20,4 12,16 18,16 12,28" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Brands ────────────────────────────────────────────────────────
const BRANDS = [
  {
    name: "Forward",
    bg: "var(--p-accent)",
    textColor: "#ffffff",
    iconColor: "#ffffff",
    Icon: ForwardIcon,
  },
  {
    name: "Growth",
    bg: "var(--p-100)",
    textColor: "var(--p-800)",
    iconColor: "var(--s-accent, var(--p-500))",
    Icon: GrowthIcon,
  },
  {
    name: "Octopus",
    bg: "var(--p-700)",
    textColor: "var(--p-100)",
    iconColor: "var(--p-100)",
    Icon: OctopusIcon,
  },
  {
    name: "Linky",
    bg: "var(--s-100, var(--p-100))",
    textColor: "var(--p-800)",
    iconColor: "var(--p-800)",
    Icon: LinkIcon,
  },
  {
    name: "Berry",
    bg: "var(--t-accent, var(--p-300))",
    textColor: "#ffffff",
    iconColor: "#ffffff",
    Icon: BerryIcon,
  },
  {
    name: "Velo",
    bg: "var(--p-900)",
    textColor: "var(--p-200)",
    iconColor: "var(--p-200)",
    Icon: VeloIcon,
  },
];

export function LogosTab() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {BRANDS.map(({ name, bg, textColor, iconColor, Icon }) => (
        <div
          key={name}
          className="rounded-xl p-6 flex flex-col items-start justify-between"
          style={{ backgroundColor: bg, minHeight: 160 }}
        >
          <Icon color={iconColor} />
          <p className="text-lg font-bold mt-4" style={{ color: textColor }}>
            {name}
          </p>
        </div>
      ))}
    </div>
  );
}
