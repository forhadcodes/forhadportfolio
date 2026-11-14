"use client";

import { MotionConfig } from "framer-motion";
import { ThemeProvider, useTheme } from "next-themes";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

function ThemedToaster() {
  const { resolvedTheme } = useTheme();
  return (
    <Toaster
      richColors
      position="top-right"
      theme={resolvedTheme === "light" ? "light" : "dark"}
    />
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {/* Respect the visitor's "reduce motion" setting everywhere */}
      <MotionConfig reducedMotion="user">
        {children}
        <ThemedToaster />
      </MotionConfig>
    </ThemeProvider>
  );
}
