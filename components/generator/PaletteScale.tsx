"use client";

import { Badge } from "@/components/ui/badge";
import { type PaletteStop, wcagLevel } from "@/lib/color-engine";
import { cn } from "@/lib/utils";

interface PaletteScaleProps {
  palette: PaletteStop[];
}

function WcagBadge({ ratio, bg }: { ratio: number; bg: "white" | "black" }) {
  const level = wcagLevel(ratio);
  const label = bg === "white" ? "W" : "B";
  const variant =
    level === "AAA"
      ? "default"
      : level === "AA"
      ? "secondary"
      : "outline";
  return (
    <Badge
      variant={variant}
      className={cn(
        "text-[9px] px-1 py-0 h-4 font-mono",
        level === "fail" && "opacity-40"
      )}
      title={`On ${bg === "white" ? "white" : "black"}: ${ratio}:1 (${level})`}
    >
      {label} {level === "fail" ? "✗" : level}
    </Badge>
  );
}

export function PaletteScale({ palette }: PaletteScaleProps) {
  return (
    <div className="flex flex-col gap-1">
      {palette.map((stop) => (
        <div key={stop.stop} className="flex items-center gap-3">
          {/* Swatch */}
          <div
            className="w-12 h-10 rounded-md flex-shrink-0 border border-black/10"
            style={{ backgroundColor: stop.hex }}
          />
          {/* Stop number */}
          <span className="w-10 text-sm font-mono text-muted-foreground text-right flex-shrink-0">
            {stop.stop}
          </span>
          {/* HEX */}
          <span className="text-sm font-mono uppercase flex-1">{stop.hex}</span>
          {/* WCAG badges */}
          <div className="flex gap-1 flex-shrink-0">
            <WcagBadge ratio={stop.wcagOnWhite} bg="white" />
            <WcagBadge ratio={stop.wcagOnBlack} bg="black" />
          </div>
        </div>
      ))}
    </div>
  );
}
