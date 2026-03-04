import { Suspense } from "react";
import { PaletteApp } from "@/components/PaletteApp";

export default function Home() {
  return (
    <Suspense>
      <PaletteApp />
    </Suspense>
  );
}
