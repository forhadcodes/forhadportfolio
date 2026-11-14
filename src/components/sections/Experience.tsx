import { LuBriefcase, LuGraduationCap } from "react-icons/lu";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { timeline } from "@/data/timeline";

export function Experience() {
  return (
    <section id="experience" className="border-y border-border bg-surface/50 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="04 / experience & education"
          title="Learning path"
        />

        <ol className="relative ml-4 max-w-3xl space-y-10 border-l border-border">
          {timeline.map((item, i) => {
            const Icon = item.kind === "education" ? LuGraduationCap : LuBriefcase;
            return (
              <li key={item.title} className="relative pl-8">
                <span
                  aria-hidden="true"
                  className="absolute -left-[18px] top-0 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-primary-text"
                >
                  <Icon className="h-4 w-4" />
                </span>
                <Reveal delay={i * 0.08}>
                  <p className="font-mono text-xs uppercase tracking-wider text-accent-text">
                    {item.period}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted">{item.org}</p>
                  <p className="mt-3 leading-relaxed text-muted">{item.description}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
