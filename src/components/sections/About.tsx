import { LuCode, LuSparkles, LuUsers } from "react-icons/lu";
import type { IconType } from "react-icons";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";

const icons: Record<(typeof profile.focusAreas)[number]["icon"], IconType> = {
  code: LuCode,
  sparkles: LuSparkles,
  users: LuUsers,
};

export function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="01 / about" title="A bit about me" />

        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            {profile.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="font-semibold text-fg">Let&apos;s connect!</p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="divide-y divide-border rounded-2xl border border-border bg-surface">
              {profile.quickFacts.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:justify-between sm:gap-6">
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                    {fact.label}
                  </dt>
                  <dd className="text-sm font-medium sm:text-right">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {profile.focusAreas.map((area, i) => {
            const Icon = icons[area.icon];
            return (
              <li key={area.title}>
                <Reveal delay={i * 0.08} className="h-full">
                  <div className="h-full rounded-2xl border border-border bg-surface p-6 transition-all hover:border-primary/60 motion-safe:hover:-translate-y-1">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary-text">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold">{area.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {area.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
