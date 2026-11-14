"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Header gets a background once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link of the section currently in view (home page only)
  useEffect(() => {
    if (!isHome) {
      setActive("");
      return;
    }
    const sections = profile.nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    sections.forEach((s) => observer.observe(s));

    const hero = document.getElementById("home");
    const onScroll = () => {
      if (hero && window.scrollY < hero.offsetHeight * 0.4) setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHome]);

  // Close the mobile menu with Escape and return focus to its button
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = (id: string) =>
    cn(
      "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
      active === id
        ? "bg-primary/10 text-primary-text"
        : "text-muted hover:text-fg",
    );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-border bg-bg/70 shadow-lg shadow-black/5 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold"
          aria-label={`${profile.name}, home`}
          onClick={() => setOpen(false)}
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-accent font-mono text-sm font-bold text-white shadow-md shadow-primary/25">
            FH
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {profile.nav.map((item) => (
            <Link
              key={item.id}
              href={`/#${item.id}`}
              className={linkClass(item.id)}
              aria-current={active === item.id ? "location" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <LuX className="h-5 w-5" aria-hidden="true" />
            ) : (
              <LuMenu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      {open ? (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t border-border md:hidden"
        >
          <Container className="flex flex-col gap-1 py-3">
            {profile.nav.map((item) => (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                className={cn(linkClass(item.id), "py-3 text-base")}
                aria-current={active === item.id ? "location" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
