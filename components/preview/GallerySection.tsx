import type { ReactNode } from "react";

interface GallerySectionProps {
  title: string;
  children: ReactNode;
}

export function GallerySection({ title, children }: GallerySectionProps) {
  return (
    <div className="rounded-xl border bg-background shadow-sm overflow-hidden">
      <div className="px-4 py-2.5 border-b bg-muted/40">
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
