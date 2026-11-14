import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      <span
        aria-hidden="true"
        className="bar-grow mt-3 block h-1 w-16 rounded-full bg-linear-to-r from-primary to-accent"
      />
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
