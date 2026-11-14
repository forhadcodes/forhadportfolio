import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="03 / projects"
          title="Things I've built"
          description="Full-stack applications taken from component design to production. Open a case study for the problem, the decisions and the challenges."
        />

        <ul className="grid gap-8 lg:grid-cols-2">
          {projects.map((project, i) => (
            <li key={project.slug}>
              <Reveal delay={i * 0.1} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
