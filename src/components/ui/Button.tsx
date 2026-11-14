import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 motion-safe:hover:-translate-y-0.5";

const variants: Record<Variant, string> = {
  primary:
    "btn-shine bg-primary-strong text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:brightness-110",
  secondary:
    "border border-border bg-surface text-fg hover:border-primary hover:text-primary-text",
  ghost: "text-primary-text hover:bg-primary/10",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-3 text-sm sm:text-base",
  sm: "px-3.5 py-2 text-sm",
};

/** Class names for anything that should look like a button (e.g. <button>). */
export function buttonStyles(
  variant: Variant = "primary",
  size: Size = "md",
  className?: string,
) {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Force the browser to download the file instead of navigating. */
  download?: boolean;
  ariaLabel?: string;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  download,
  ariaLabel,
}: ButtonLinkProps) {
  const cls = buttonStyles(variant, size, className);
  const isWeb = /^https?:\/\//.test(href);

  if (isWeb || download || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: true } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
