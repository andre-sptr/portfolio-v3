import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { metadata } from "@/lib/metadata";

const manrope = localFont({ src: "../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2", display: "swap", variable: "--font-manrope", weight: "200 800" });
export { metadata };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" className={manrope.variable}><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}
