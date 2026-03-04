"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { toCssVars, toTailwindConfig, toScss } from "@/lib/export";
import type { PaletteStop } from "@/lib/color-engine";

interface ExportPanelProps {
  palette: PaletteStop[];
  paletteName?: string;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1.5">
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <ScrollArea className="h-52 rounded-md border bg-muted/50">
      <pre className="p-4 text-xs font-mono whitespace-pre">{code}</pre>
    </ScrollArea>
  );
}

export function ExportPanel({ palette, paletteName = "primary" }: ExportPanelProps) {
  const cssCode = toCssVars(palette, paletteName);
  const tailwindCode = toTailwindConfig(palette, paletteName);
  const scssCode = toScss(palette, paletteName);

  return (
    <Tabs defaultValue="css">
      <div className="flex items-center justify-between mb-2">
        <TabsList>
          <TabsTrigger value="css">CSS Vars</TabsTrigger>
          <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
          <TabsTrigger value="scss">SCSS</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="css" className="mt-0">
        <div className="flex justify-end mb-1.5">
          <CopyButton text={cssCode} />
        </div>
        <CodeBlock code={cssCode} />
      </TabsContent>

      <TabsContent value="tailwind" className="mt-0">
        <div className="flex justify-end mb-1.5">
          <CopyButton text={tailwindCode} />
        </div>
        <CodeBlock code={tailwindCode} />
      </TabsContent>

      <TabsContent value="scss" className="mt-0">
        <div className="flex justify-end mb-1.5">
          <CopyButton text={scssCode} />
        </div>
        <CodeBlock code={scssCode} />
      </TabsContent>
    </Tabs>
  );
}
