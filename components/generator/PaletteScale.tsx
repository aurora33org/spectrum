"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { type PaletteStop, wcagLevel } from "@/lib/color-engine";
import { cn } from "@/lib/utils";

interface PaletteScaleProps {
  palette: PaletteStop[];
  label?: string;
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

export function PaletteScale({ palette, label = "Scale — 11 stops" }: PaletteScaleProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
  };

  return (
    <div className="w-full relative">
      {label && (
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          {label}
        </h3>
      )}
      {/* Horizontal color swatches - fixed width, full row */}
      <div className="flex gap-1 w-full">
        {palette.map((stop) => (
          <div
            key={stop.stop}
            className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer min-w-0"
            title={`${stop.stop}: ${stop.hex}`}
            onClick={() => handleCopy(stop.hex)}
          >
            {/* Color swatch */}
            <div
              className="w-full aspect-square rounded-md border border-black/10 hover:shadow-lg transition-shadow"
              style={{ backgroundColor: stop.hex }}
            />
            {/* Stop number */}
            <span className="text-xs font-mono text-muted-foreground">
              {stop.stop}
            </span>
            {/* HEX */}
            <span className="text-xs font-mono uppercase text-muted-foreground truncate w-full text-center px-0.5">
              {stop.hex.slice(1)}
            </span>
          </div>
        ))}
      </div>

      {/* Centered tooltip */}
      {copied && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white px-4 py-2 rounded-md text-sm font-medium pointer-events-none z-50">
          Copied!
        </div>
      )}
    </div>
  );
}
