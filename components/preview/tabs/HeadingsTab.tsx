"use client";

const CARDS = [
  {
    bg: "var(--p-500)",
    text: "#ffffff",
    size: "text-4xl",
    heading: "Bold vision starts here",
    sub: "Design with purpose and impact",
    span: "col-span-2",
  },
  {
    bg: "var(--p-100)",
    text: "var(--p-800)",
    size: "text-2xl",
    heading: "Clean & readable",
    sub: "Light backgrounds amplify clarity",
    span: "",
  },
  {
    bg: "var(--s-accent, var(--p-600))",
    text: "#ffffff",
    size: "text-2xl",
    heading: "Secondary voice",
    sub: "Contrast through color",
    span: "",
  },
  {
    bg: "var(--p-900)",
    text: "var(--t-accent, var(--p-300))",
    size: "text-2xl",
    heading: "Dark depth",
    sub: "Tertiary accent on dark canvas",
    span: "",
  },
  {
    bg: "var(--t-accent, var(--p-400))",
    text: "#ffffff",
    size: "text-4xl",
    heading: "Great typography begins with readability",
    sub: "Scale, weight, and color in harmony",
    span: "col-span-2",
  },
  {
    bg: "var(--p-50)",
    text: "var(--s-accent, var(--p-700))",
    size: "text-2xl",
    heading: "Minimal & precise",
    sub: "Whitespace is not empty space",
    span: "",
  },
  {
    bg: "#ffffff",
    text: "var(--p-accent)",
    size: "text-xl",
    heading: "Accent on white",
    sub: "Primary on neutral",
    span: "",
  },
  {
    bg: "var(--p-700)",
    text: "var(--p-100)",
    size: "text-xl",
    heading: "Mid-dark energy",
    sub: "700 depth, 100 highlight",
    span: "",
  },
  {
    bg: "var(--s-100, var(--p-100))",
    text: "var(--s-800, var(--p-700))",
    size: "text-xl",
    heading: "Secondary surface",
    sub: "Soft with strong foreground",
    span: "",
  },
];

export function HeadingsTab() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {CARDS.map(({ bg, text, size, heading, sub, span }, i) => (
        <div
          key={i}
          className={`rounded-2xl p-6 flex flex-col justify-end ${span}`}
          style={{ backgroundColor: bg, minHeight: 200 }}
        >
          <p
            className={`${size} font-bold leading-tight`}
            style={{ color: text }}
          >
            {heading}
          </p>
          <p
            className="text-xs mt-2"
            style={{ color: text, opacity: 0.65 }}
          >
            {sub}
          </p>
        </div>
      ))}
    </div>
  );
}
