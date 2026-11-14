import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="border-y border-border bg-surface/50 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="02 / skills"
          title="My technical toolkit"
          description="Grouped by what I use them for, centred on TypeScript and the MERN ecosystem with Next.js."
        />

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <li key={group.name}>
              <Reveal delay={(i % 3) * 0.07} className="h-full">
                <div className="group h-full rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 motion-safe:hover:-translate-y-1">
                  <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-accent-text transition-colors group-hover:text-primary-text">
                    {group.name}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Tag className="text-fg transition-colors group-hover:border-primary/40">
                          {item}
                        </Tag>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
