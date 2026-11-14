import Image from "next/image";
import { cn } from "@/lib/utils";

interface ScreenshotFrameProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}

/** Browser-style frame around a project screenshot (16:10). */
export function ScreenshotFrame({
  src,
  alt,
  sizes,
  priority,
  className,
  imageClassName,
}: ScreenshotFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-surface-2 shadow-lg",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="flex items-center gap-1.5 border-b border-border bg-surface px-3 py-2"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
      </div>
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover object-top", imageClassName)}
        />
      </div>
    </div>
  );
}
