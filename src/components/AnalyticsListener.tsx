"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function AnalyticsListener() {
  const pathname = usePathname();
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-PVY0TN3160";

  useEffect(() => {
    // ochrana proti SSR + jistota, že je GA načtené
    if (typeof window === "undefined") return;
    if (!GA_ID || !window.gtag) return;

    window.gtag("config", GA_ID, {
      page_path: pathname,
    });
  }, [pathname, GA_ID]);

  return null;
}