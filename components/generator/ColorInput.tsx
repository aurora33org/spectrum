"use client";

import { HexColorPicker } from "react-colorful";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useRef, useState } from "react";

interface ColorInputProps {
  hex: string;
  onChange: (hex: string) => void;
}

function isValidHex(value: string) {
  return /^[0-9a-fA-F]{6}$/.test(value);
}

export function ColorInput({ hex, onChange }: ColorInputProps) {
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
      <HexColorPicker
        color={`#${hex}`}
        onChange={handlePickerChange}
        style={{ width: "100%" }}
      />
      <div className="flex items-center gap-2">
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
