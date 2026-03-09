"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColorSlotProps {
  label: string;
  hex: string;
  onChange: (hex: string) => void;
  onRemove?: () => void; // undefined = not removable (primary)
}

function isValidHex(value: string) {
  return /^[0-9a-fA-F]{6}$/.test(value);
}

export function ColorSlot({ label, hex, onChange, onRemove }: ColorSlotProps) {
  const [inputValue, setInputValue] = useState(hex);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setInputValue(hex); }, [hex]);

  const handlePickerChange = useCallback(
    (color: string) => {
      const bare = color.replace("#", "");
      setInputValue(bare);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => onChange(bare), 150);
    },
    [onChange]
  );

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
    <div className="flex items-center gap-2.5 group py-1">
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "w-6 h-6 rounded-full flex-shrink-0",
              "ring-1 ring-black/20 dark:ring-white/20",
              "hover:ring-2 hover:ring-black/40 dark:hover:ring-white/40",
              "transition-all cursor-pointer shadow-sm"
            )}
            style={{ backgroundColor: `#${hex}` }}
            aria-label={`Edit ${label} color`}
          />
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3" side="right" align="start">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2.5">
            {label}
          </p>
          <HexColorPicker
            color={`#${hex}`}
            onChange={handlePickerChange}
            style={{ width: "100%" }}
          />
          <div className="flex items-center gap-2 mt-2.5">
            <span className="text-muted-foreground text-sm select-none">#</span>
            <Input
              value={inputValue}
              onChange={handleInputChange}
              maxLength={6}
              className="font-mono uppercase h-8 text-sm"
              placeholder="3B82F6"
            />
          </div>
        </PopoverContent>
      </Popover>

      <span className="text-xs text-muted-foreground flex-shrink-0 w-16">{label}</span>
      <span className="text-xs font-mono uppercase flex-1 text-foreground">
        #{hex.toUpperCase()}
      </span>

      {onRemove && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="opacity-0 group-hover:opacity-100 transition-opacity h-5 w-5 text-muted-foreground hover:text-destructive"
          aria-label={`Remove ${label}`}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}
