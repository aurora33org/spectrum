"use client";

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { History, Trash2 } from "lucide-react";
import {
  getHistory,
  saveToHistory,
  removeFromHistory,
  type HistoryEntry,
} from "@/lib/storage";

interface HistoryPanelProps {
  currentHex: string;
  onSelect: (hex: string) => void;
}

export function HistoryPanel({ currentHex, onSelect }: HistoryPanelProps) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [open, setOpen] = useState(false);

  // Reload history whenever menu opens
  useEffect(() => {
    if (open) setHistory(getHistory());
  }, [open]);

  const handleSave = () => {
    saveToHistory({ name: `#${currentHex}`, hex: currentHex });
    setHistory(getHistory());
  };

  const handleRemove = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    removeFromHistory(id);
    setHistory(getHistory());
  };

  const handleSelect = (hex: string) => {
    onSelect(hex);
    setOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={handleSave} className="gap-1.5">
        Save palette
      </Button>

      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-1.5">
            <History className="h-4 w-4" />
            History
            {history.length > 0 && (
              <span className="text-xs text-muted-foreground">({history.length})</span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Recent palettes</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {history.length === 0 ? (
            <div className="px-2 py-3 text-xs text-muted-foreground text-center">
              No saved palettes yet
            </div>
          ) : (
            history.map((entry) => (
              <DropdownMenuItem
                key={entry.id}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleSelect(entry.hex)}
              >
                <div
                  className="w-4 h-4 rounded-sm flex-shrink-0 border border-black/10"
                  style={{ backgroundColor: `#${entry.hex}` }}
                />
                <span className="flex-1 font-mono text-xs uppercase">{entry.name}</span>
                <button
                  className="text-muted-foreground hover:text-destructive ml-auto"
                  onClick={(e) => handleRemove(e, entry.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
