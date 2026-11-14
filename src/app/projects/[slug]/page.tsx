import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { FaGithub } from "react-icons/fa6";
import {
  LuArrowLeft,
  LuArrowRight,
  LuCheck,
  LuExternalLink,
  LuTriangleAlert,
} from "react-icons/lu";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ScreenshotFrame } from "@/components/ui/ScreenshotFrame";
import { Tag } from "@/components/ui/Tag";
import { getNextProject, getProject, projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} case study`,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} case study`,
      description: project.tagline,
      url: `/projects/${project.slug}`,
      type: "article",
    },
  };
}

function CaseBlock({
  title,
  index,
  children,
}: {
  title: string;
  index?: number;
  children: ReactNode;
}) {
  return (
    <Reveal>
      <div className="relative h-full rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-center gap-3">
          {index !== undefined ? (
            <span
              aria-hidden="true"
              className="z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-primary/60 bg-surface font-mono text-xs font-bold text-primary-text"
            >
              {String(index).padStart(2, "0")}
            </span>
          ) : null}
          <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-accent-text">
            {title}
          </h3>
        </div>
        <div className="mt-3 leading-relaxed text-muted">{children}</div>
      </div>
    </Reveal>
  );
}

/** "01"-style mono number for section headings. */
function SectionNumber({ n }: { n: string }) {
  return (
    <span aria-hidden="true" className="mr-3 font-mono text-lg font-semibold text-accent-text">
      {n}
    </span>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);
  const { caseStudy } = project;
  const [hero, ...rest] = project.screenshots;

  return (
    <article className="pb-24 pt-28 sm:pt-32">
      <Container>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary-text"
        >
          <LuArrowLeft className="h-4 w-4" aria-hidden="true" /> All projects
        </Link>

        <header className="mt-6 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">
            Case study
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {project.title}
            {project.localizedTitle ? (
              <span lang="bn" className="ml-3 font-normal text-muted">
                {project.localizedTitle}
              </span>
            ) : null}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{project.tagline}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.liveUrl ? (
              <ButtonLink href={project.liveUrl}>
                Live Demo <LuExternalLink className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            ) : null}
            {project.githubLinks.map((link) => (
              <ButtonLink key={link.url} href={link.url} variant="secondary">
                <FaGithub className="h-4 w-4" aria-hidden="true" /> {link.label}
              </ButtonLink>
            ))}
          </div>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
            {project.techStack.map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>
        </header>

        {/* Screenshots */}
        {hero ? (
          <Reveal className="mt-12">
            <ScreenshotFrame
              src={hero.src}
              alt={hero.alt}
              priority
              sizes="(min-width: 1152px) 1088px, 100vw"
            />
          </Reveal>
        ) : null}
        {rest.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {rest.map((shot, i) => (
              <Reveal key={shot.src} delay={i * 0.08}>
                <ScreenshotFrame
                  src={shot.src}
                  alt={shot.alt}
                  sizes="(min-width: 1152px) 536px, (min-width: 640px) 50vw, 100vw"
                />
              </Reveal>
            ))}
          </div>
        ) : null}

        {/* Overview + features */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <h2 className="text-2xl font-bold">
              <SectionNumber n="01" />
              Overview
            </h2>
            <p className="mt-4 leading-relaxed text-muted">{project.description}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Highlights">
              {project.highlights.map((h) => (
                <li key={h}>
                  <Tag className="text-fg">{h}</Tag>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="text-2xl font-bold">
              <SectionNumber n="02" />
              Key features
            </h2>
            <ul className="mt-4 space-y-3">
              {project.features.map((feature) => (
                <li key={feature} className="flex gap-3 leading-relaxed text-muted">
                  <LuCheck
                    className="mt-1 h-4 w-4 shrink-0 text-accent-text"
                    aria-hidden="true"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Case study */}
        <section aria-labelledby="case-study-heading" className="mt-20">
          <h2 id="case-study-heading" className="text-2xl font-bold sm:text-3xl">
            <SectionNumber n="03" />
            The story behind it
          </h2>

          <div className="relative mt-8 grid gap-5 md:grid-cols-3">
            {/* Timeline connectors: vertical on mobile, horizontal on desktop */}
            <div
              aria-hidden="true"
              className="absolute bottom-4 left-[38px] top-4 w-px bg-linear-to-b from-primary/50 via-accent/40 to-transparent md:hidden"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-10 top-[38px] hidden h-px bg-linear-to-r from-primary/50 via-accent/40 to-transparent md:block"
            />
            <CaseBlock title="Problem" index={1}>
              {caseStudy.problem}
            </CaseBlock>
            <CaseBlock title="Solution" index={2}>
              {caseStudy.solution}
            </CaseBlock>
            <CaseBlock title="My role" index={3}>
              {caseStudy.role}
            </CaseBlock>
          </div>

          <h3 className="mt-14 text-xl font-bold">
            <SectionNumber n="04" />
            Tech decisions
          </h3>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {caseStudy.techDecisions.map((d) => (
              <CaseBlock key={d.title} title={d.title}>
                {d.body}
              </CaseBlock>
            ))}
          </div>

          <h3 className="mt-14 text-xl font-bold">
            <SectionNumber n="05" />
            Challenges faced &amp; how I solved them
          </h3>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {caseStudy.challenges.map((c) => (
              <Reveal key={c.title} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6">
                  <h4 className="text-base font-bold">{c.title}</h4>
                  <div className="mt-4 flex flex-1 flex-col gap-4">
                    <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                      <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-red-500 dark:text-red-400">
                        <LuTriangleAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
                        Difficulty
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {c.difficulty}
                      </p>
                    </div>
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                      <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        <LuCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                        How I solved it
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {c.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14">
            <div className="rounded-2xl border border-primary/40 bg-primary/5 p-6 sm:p-8">
              <h3 className="text-xl font-bold">
                <SectionNumber n="06" />
                Result &amp; what I learned
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{caseStudy.outcome}</p>
            </div>
          </Reveal>
        </section>

        {next && next.slug !== project.slug ? (
          <nav aria-label="Next project" className="mt-16 border-t border-border pt-10">
            <p className="font-mono text-xs uppercase tracking-wider text-muted">
              Next project
            </p>
            <Link
              href={`/projects/${next.slug}`}
              className="group mt-2 inline-flex items-center gap-3 text-2xl font-bold transition-colors hover:text-primary-text"
            >
              {next.title}
              <LuArrowRight
                className="h-6 w-6 transition-transform motion-safe:group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </nav>
        ) : null}
      </Container>
    </article>
  );
}
