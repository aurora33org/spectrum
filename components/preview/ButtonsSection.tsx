export function ButtonsSection() {
  return (
    <div className="flex flex-col gap-4">
      {/* Size variants */}
      <div className="flex items-center gap-2 flex-wrap">
        {(["sm", "md", "lg"] as const).map((size) => (
          <button
            key={size}
            className={`rounded-md font-medium text-white ${
              size === "sm"
                ? "px-3 py-1.5 text-xs"
                : size === "lg"
                ? "px-6 py-3 text-sm"
                : "px-4 py-2 text-sm"
            }`}
            style={{ backgroundColor: "var(--p-accent)" }}
          >
            {size === "sm" ? "Small" : size === "lg" ? "Large" : "Default"}
          </button>
        ))}
      </div>

      {/* Style variants */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          className="px-4 py-2 rounded-md text-sm font-medium text-white"
          style={{ backgroundColor: "var(--p-accent)" }}
        >
          Primary
        </button>
        <button
          className="px-4 py-2 rounded-md text-sm font-medium"
          style={{ backgroundColor: "var(--p-surface-2)", color: "var(--p-text-1)" }}
        >
          Secondary
        </button>
        <button
          className="px-4 py-2 rounded-md text-sm font-medium border"
          style={{
            borderColor: "var(--p-border)",
            color: "var(--p-accent)",
            backgroundColor: "transparent",
          }}
        >
          Outline
        </button>
        <button
          className="px-4 py-2 rounded-md text-sm font-medium"
          style={{ color: "var(--p-accent)", backgroundColor: "transparent" }}
        >
          Ghost
        </button>
        <button
          className="px-4 py-2 rounded-md text-sm font-medium cursor-not-allowed opacity-40 text-white"
          style={{ backgroundColor: "var(--p-accent)" }}
          disabled
        >
          Disabled
        </button>
      </div>

      {/* Color strip */}
      <div className="flex gap-1.5 flex-wrap">
        {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((stop) => (
          <div
            key={stop}
            className="h-6 flex-1 rounded-sm min-w-5"
            title={`p-${stop}`}
            style={{ backgroundColor: `var(--p-${stop})` }}
          />
        ))}
      </div>
    </div>
  );
}
