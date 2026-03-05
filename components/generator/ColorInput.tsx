"use client";

import { HexColorPicker } from "react-colorful";
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

export function ColorInput({ hex, onChange, label, onRemove }: ColorInputProps) {
  const [inputValue, setInputValue] = useState(hex);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync when hex prop changes externally (e.g. history navigation)
  useEffect(() => {
    setInputValue(hex);
  }, [hex]);

  const handlePickerChange = useCallback(
    (color: string) => {
      // react-colorful returns #rrggbb
      const bare = color.replace("#", "");
      setInputValue(bare);
      onChange(bare);  // call immediately — no debounce for picker
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
            <HexColorPicker
              color={`#${hex}`}
              onChange={handlePickerChange}
              style={{ width: "100%" }}
            />
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
