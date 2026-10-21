"use client";
import { useMediaQuery } from "./useMediaQuery";
export function useResponsiveScene() {
  const compact = useMediaQuery("(max-width: 767px)");
  const wide = useMediaQuery("(min-width: 1360px)");
  return { compact, wide, nodeCount: compact ? 9 : 16, particleCount: compact ? 5 : 9, dpr: (compact ? [1, 1.15] : [1, 1.5]) as [number, number] };
}
