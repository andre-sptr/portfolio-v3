"use client";
import { useMediaQuery } from "./useMediaQuery";
export function useReducedMotionPreference() { return useMediaQuery("(prefers-reduced-motion: reduce)"); }
