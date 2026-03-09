"use client";

const CARDS = [
  { bg: "var(--p-accent)",                   text: "#ffffff" },
  { bg: "var(--p-100)",                      text: "var(--p-800)" },
  { bg: "var(--p-700)",                      text: "var(--p-100)" },
  { bg: "var(--s-accent, var(--p-400))",     text: "#ffffff" },
  { bg: "var(--s-100, var(--p-100))",        text: "var(--s-800, var(--p-accent))" },
  { bg: "var(--t-accent, var(--p-600))",     text: "#ffffff" },
  { bg: "#ffffff",                            text: "var(--p-accent)" },
  { bg: "var(--p-50)",                       text: "var(--s-accent, var(--p-700))" },
  { bg: "var(--p-900)",                      text: "var(--t-accent, var(--p-300))" },
];

export function HeadingsTab() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {CARDS.map(({ bg, text }, i) => (
        <div
          key={i}
          className="rounded-xl p-5 flex flex-col justify-end"
          style={{ backgroundColor: bg, minHeight: 192 }}
        >
          <p className="text-xl font-bold leading-tight" style={{ color: text }}>
            Great typography<br />begins with<br />readability
          </p>
        </div>
      ))}
    </div>
  );
}
