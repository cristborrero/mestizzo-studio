"use client";

import dynamic from "next/dynamic";

const FluidCanvas = dynamic(() => import("@/components/ui/FluidCanvas"), {
  ssr: false,
  loading: () => null,
});

export default function FluidCanvasClient() {
  return <FluidCanvas />;
}
