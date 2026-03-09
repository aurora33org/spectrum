"use client";

import { useState } from "react";
import type { PaletteStop } from "@/lib/color-engine";
import { cn } from "@/lib/utils";

interface PaletteStripProps {
  palette: PaletteStop[];
  label?: string;
  compact?: boolean; // h-10 sidebar mini-strips vs h-[72px] main strips
}

export function PaletteStrip({ palette, label, compact = false }: PaletteStripProps) {
  const [copiedStop, setCopiedStop] = useState<number | null>(null);

  const handleCopy = async (stop: PaletteStop) => {
    await navigator.clipboard.writeText(stop.hex);
    setCopiedStop(stop.stop);
    setTimeout(() => setCopiedStop(null), 1500);
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
      )}
      <div className="flex rounded-lg overflow-hidden">
        {palette.map((stop) => {
          // wcagOnBlack > wcagOnWhite means the color is light → use dark text
          const useBlack = stop.wcagOnBlack > stop.wcagOnWhite;
          const textColor = useBlack ? "rgba(0,0,0,0.75)" : "rgba(255,255,255,0.85)";
          const isCopied = copiedStop === stop.stop;

          return (
            <button
              key={stop.stop}
              title={`${stop.stop}: #${stop.hex} — click to copy`}
              onClick={() => handleCopy(stop)}
              className={cn(
                "flex-1 flex flex-col items-center justify-center cursor-pointer",
                "transition-transform hover:scale-y-105 hover:z-10 relative",
                compact ? "h-10 gap-0 py-1" : "h-[72px] gap-1 py-2"
              )}
              style={{ backgroundColor: stop.hex }}
            >
              {!compact && (
                <span
                  className="text-[10px] font-bold leading-none tracking-wide"
                  style={{ color: textColor }}
                >
                  {stop.stop}
                </span>
              )}
              <span
                className={cn("font-mono leading-none", compact ? "text-[7px]" : "text-[9px]")}
                style={{ color: textColor, opacity: isCopied ? 1 : 0.7 }}
              >
                {isCopied ? "✓ copied" : stop.hex.replace("#", "").toUpperCase()}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
