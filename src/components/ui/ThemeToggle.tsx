"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid a hydration mismatch: the real theme is only known on the client.
  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme !== "light" : true;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-fg transition-colors hover:border-primary hover:text-primary-text"
    >
      {mounted ? (
        isDark ? (
          <LuSun className="h-5 w-5" aria-hidden="true" />
        ) : (
          <LuMoon className="h-5 w-5" aria-hidden="true" />
        )
      ) : (
        <span className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}
