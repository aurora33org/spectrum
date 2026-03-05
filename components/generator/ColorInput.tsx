"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface ColorInputProps {
  hex: string;
  onChange: (hex: string) => void;
  label?: string;
  onRemove?: () => void;
}

function isValidHex(value: string) {
  return /^[0-9a-fA-F]{6}$/.test(value);
}

// Convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

// Convert RGB to hex
function rgbToHex(r: number, g: number, b: number): string {
  return [r, g, b]
    .map((x) => {
      const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("")
    .toUpperCase();
}

// Convert RGB to HSL
function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

// Convert HSL to RGB
function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h = h / 360;
  s = s / 100;
  l = l / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function ColorPicker({ hex, onChange }: { hex: string; onChange: (hex: string) => void }) {
  const [h, setH] = useState(0);
  const [s, setS] = useState(0);
  const [l, setL] = useState(50);
  const svRef = useRef<HTMLDivElement>(null);

  // Initialize HSL from hex
  useEffect(() => {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    setH(hsl.h);
    setS(hsl.s);
    setL(hsl.l);
  }, [hex]);

  const updateColor = useCallback(
    (newH?: number, newS?: number, newL?: number) => {
      const finalH = newH !== undefined ? newH : h;
      const finalS = newS !== undefined ? newS : s;
      const finalL = newL !== undefined ? newL : l;

      const rgb = hslToRgb(finalH, finalS, finalL);
      const newHex = rgbToHex(rgb.r, rgb.g, rgb.b);
      onChange(newHex);
    },
    [h, s, l, onChange]
  );

  const handleSVClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!svRef.current) return;
    const rect = svRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const newS = Math.max(0, Math.min(100, x));
    const newL = Math.max(0, Math.min(100, 100 - y));
    setS(newS);
    setL(newL);
    updateColor(h, newS, newL);
  };

  return (
    <div className="flex flex-col gap-3 p-3 bg-white rounded-lg shadow-lg border border-gray-200 w-64">
      {/* Saturation/Lightness square */}
      <div
        ref={svRef}
        onClick={handleSVClick}
        className="relative w-full h-48 rounded-md border border-gray-300 cursor-crosshair"
        style={{
          background: `linear-gradient(to right, hsl(${h}, 0%, 50%), hsl(${h}, 100%, 50%)), linear-gradient(to top, black, transparent)`,
        }}
      >
        {/* Crosshair indicator */}
        <div
          className="absolute w-4 h-4 border-2 border-white rounded-full shadow-md pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${s}%`,
            top: `${100 - l}%`,
            boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.3), 0 0 4px rgba(0, 0, 0, 0.2)",
          }}
        />
      </div>

      {/* Hue slider */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Hue</label>
        <input
          type="range"
          min="0"
          max="360"
          value={h}
          onChange={(e) => {
            const newH = Number(e.target.value);
            setH(newH);
            updateColor(newH, s, l);
          }}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%))`,
            WebkitAppearance: "slider-horizontal",
          } as React.CSSProperties}
        />
      </div>

      {/* RGB Inputs */}
      <div className="grid grid-cols-3 gap-2">
        {["R", "G", "B"].map((label, idx) => {
          const rgb = hslToRgb(h, s, l);
          const values = [rgb.r, rgb.g, rgb.b];
          const value = values[idx];

          return (
            <div key={label} className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">{label}</label>
              <Input
                type="number"
                min="0"
                max="255"
                value={value}
                onChange={(e) => {
                  const newVal = Math.max(0, Math.min(255, Number(e.target.value)));
                  const newRgb = { ...rgb, [["r", "g", "b"][idx]]: newVal };
                  const newHsl = rgbToHsl(newRgb.r, newRgb.g, newRgb.b);
                  setH(newHsl.h);
                  setS(newHsl.s);
                  setL(newHsl.l);
                  const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
                  onChange(newHex);
                }}
                className="h-8 text-xs px-2"
              />
            </div>
          );
        })}
      </div>

      {/* HEX Input */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">HEX</label>
        <Input
          type="text"
          value={hex}
          onChange={(e) => {
            const val = e.target.value.replace("#", "").toUpperCase();
            if (isValidHex(val)) {
              onChange(val);
            }
          }}
          maxLength={6}
          className="h-8 text-xs font-mono px-2"
          placeholder="3B82F6"
        />
      </div>
    </div>
  );
}

export function ColorInput({ hex, onChange, label, onRemove }: ColorInputProps) {
  const [inputValue, setInputValue] = useState(hex);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync when hex prop changes externally (e.g. history navigation)
  useEffect(() => {
    setInputValue(hex);
  }, [hex]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.replace("#", "");
      setInputValue(val);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (isValidHex(val)) {
        debounceRef.current = setTimeout(() => onChange(val), 150);
      }
    },
    [onChange]
  );

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">{label}</h3>
          {onRemove && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemove}
              className="h-6 w-6"
              aria-label={`Remove ${label}`}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}

      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="h-10 w-10 rounded-full border border-input shadow-sm hover:shadow-md transition-shadow cursor-pointer flex-shrink-0"
              style={{ backgroundColor: `#${hex}` }}
              aria-label="Open color picker"
              title={`#${hex}`}
            />
          </PopoverTrigger>
          <PopoverContent side="bottom" align="start" className="w-auto p-0">
            <ColorPicker hex={hex} onChange={onChange} />
          </PopoverContent>
        </Popover>

        <span className="text-muted-foreground text-sm select-none">#</span>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          maxLength={6}
          className="font-mono uppercase"
          placeholder="3B82F6"
        />
      </div>
    </div>
  );
}
