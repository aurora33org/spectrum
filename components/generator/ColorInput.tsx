"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";

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

// Convert RGB to HSV
function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const v = max;
  const d = max - min;
  const s = max === 0 ? 0 : d / max;

  let h = 0;
  if (max !== min) {
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

  return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
}

// Convert HSV to RGB
function hsvToRgb(h: number, s: number, v: number): { r: number; g: number; b: number } {
  h = h / 360;
  s = s / 100;
  v = v / 100;

  const c = v * s;
  const x = c * (1 - Math.abs(((h * 6) % 2) - 1));
  const m = v - c;

  let r = 0,
    g = 0,
    b = 0;

  if (h < 1 / 6) {
    r = c;
    g = x;
  } else if (h < 2 / 6) {
    r = x;
    g = c;
  } else if (h < 3 / 6) {
    g = c;
    b = x;
  } else if (h < 4 / 6) {
    g = x;
    b = c;
  } else if (h < 5 / 6) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

function ColorPicker({ hex, onChange }: { hex: string; onChange: (hex: string) => void }) {
  const { isDark } = useDarkMode();
  const [h, setH] = useState(0);
  const [s, setS] = useState(0);
  const [v, setV] = useState(100);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDraggingRef = useRef(false);

  // Initialize HSV from hex
  useEffect(() => {
    const rgb = hexToRgb(hex);
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
    setH(hsv.h);
    setS(hsv.s);
    setV(hsv.v);
  }, [hex]);

  // Draw canvas gradient
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Create horizontal gradient: left=white (S=0), right=pure color (S=100)
    const horizontalGrad = ctx.createLinearGradient(0, 0, width, 0);
    horizontalGrad.addColorStop(0, "white");
    horizontalGrad.addColorStop(1, `hsl(${h}, 100%, 50%)`);

    ctx.fillStyle = horizontalGrad;
    ctx.fillRect(0, 0, width, height);

    // Create vertical gradient: top=full brightness (V=100), bottom=black (V=0)
    const verticalGrad = ctx.createLinearGradient(0, 0, 0, height);
    verticalGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
    verticalGrad.addColorStop(1, "rgba(0, 0, 0, 1)");

    ctx.fillStyle = verticalGrad;
    ctx.fillRect(0, 0, width, height);
  }, [h]);

  const updateColor = useCallback(
    (newH?: number, newS?: number, newV?: number) => {
      const finalH = newH !== undefined ? newH : h;
      const finalS = newS !== undefined ? newS : s;
      const finalV = newV !== undefined ? newV : v;

      const rgb = hsvToRgb(finalH, finalS, finalV);
      const newHex = rgbToHex(rgb.r, rgb.g, rgb.b);
      onChange(newHex);
    },
    [h, s, v, onChange]
  );

  const updateFromPosition = useCallback(
    (x: number, y: number) => {
      // X maps to saturation: 0% left → 100% right
      const newS = Math.max(0, Math.min(100, x));
      // Y maps to value: 100% top → 0% bottom (inverted)
      const newV = Math.max(0, Math.min(100, 100 - y));

      setS(newS);
      setV(newV);
      updateColor(h, newS, newV);
    },
    [h, updateColor]
  );

  const handleCanvasInteraction = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      let clientX: number, clientY: number;

      if (e instanceof TouchEvent) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;

      updateFromPosition(x, y);
    },
    [updateFromPosition]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      isDraggingRef.current = true;
      handleCanvasInteraction(e.nativeEvent);

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!isDraggingRef.current) return;
        handleCanvasInteraction(moveEvent);
      };

      const handleMouseUp = () => {
        isDraggingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [handleCanvasInteraction]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      isDraggingRef.current = true;
      handleCanvasInteraction(e.nativeEvent);

      const handleTouchMove = (moveEvent: TouchEvent) => {
        if (!isDraggingRef.current) return;
        handleCanvasInteraction(moveEvent);
      };

      const handleTouchEnd = () => {
        isDraggingRef.current = false;
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };

      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    },
    [handleCanvasInteraction]
  );

  const bgClass = isDark ? "bg-[#1a1a1a]" : "bg-white";
  const textClass = isDark ? "text-white" : "text-gray-900";
  const labelClass = isDark ? "text-gray-300" : "text-gray-600";
  const borderClass = isDark ? "border-gray-700" : "border-gray-300";

  return (
    <div
      className={`flex flex-col gap-3 p-3 rounded-lg shadow-lg border w-64 ${bgClass} ${borderClass}`}
    >
      {/* Saturation/Value canvas container */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={220}
          height={200}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className="w-full rounded-md border cursor-crosshair block"
          style={{
            borderColor: isDark ? "rgb(55, 65, 81)" : "rgb(209, 213, 219)",
          }}
        />

        {/* Crosshair indicator - positioned relative to canvas */}
        <div
          className="absolute w-4 h-4 border-2 border-white rounded-full pointer-events-none"
          style={{
            left: `${s}%`,
            top: `${100 - v}%`,
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.5), 0 0 4px rgba(0, 0, 0, 0.3)",
          }}
        />
      </div>

      {/* Hue slider */}
      <div className="flex flex-col gap-1">
        <label className={`text-xs font-medium ${labelClass}`}>Hue</label>
        <input
          type="range"
          min="0"
          max="360"
          value={h}
          onChange={(e) => {
            const newH = Number(e.target.value);
            setH(newH);
            updateColor(newH, s, v);
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
          const rgb = hsvToRgb(h, s, v);
          const values = [rgb.r, rgb.g, rgb.b];
          const value = values[idx];

          return (
            <div key={label} className="flex flex-col gap-1">
              <label className={`text-xs font-medium ${labelClass}`}>{label}</label>
              <Input
                type="number"
                min="0"
                max="255"
                value={value}
                onChange={(e) => {
                  const newVal = Math.max(0, Math.min(255, Number(e.target.value)));
                  const newRgb = { ...rgb, [["r", "g", "b"][idx]]: newVal };
                  const newHsv = rgbToHsv(newRgb.r, newRgb.g, newRgb.b);
                  setH(newHsv.h);
                  setS(newHsv.s);
                  setV(newHsv.v);
                  const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
                  onChange(newHex);
                }}
                className={`h-8 text-xs px-2 ${textClass}`}
              />
            </div>
          );
        })}
      </div>

      {/* HEX Input */}
      <div className="flex flex-col gap-1">
        <label className={`text-xs font-medium ${labelClass}`}>HEX</label>
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
          className={`h-8 text-xs font-mono px-2 ${textClass}`}
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
