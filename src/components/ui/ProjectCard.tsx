import Link from "next/link";
import { LuArrowRight, LuExternalLink } from "react-icons/lu";
import { FaGithub } from "react-icons/fa6";
import { ButtonLink } from "@/components/ui/Button";
import { ScreenshotFrame } from "@/components/ui/ScreenshotFrame";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/types";

const MAX_TAGS = 5;

export function ProjectCard({ project }: { project: Project }) {
  const cover = project.screenshots[0];
  const github = project.githubLinks[0];
  const extraTags = project.techStack.length - MAX_TAGS;

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-border bg-surface p-4 transition-all duration-300 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/10 motion-safe:hover:-translate-y-1 sm:p-5">
      {cover ? (
        <div className="relative">
          <ScreenshotFrame
            src={cover.src}
            alt={cover.alt}
            sizes="(min-width: 1024px) 560px, (min-width: 640px) 90vw, 100vw"
            imageClassName="transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center rounded-b-xl bg-linear-to-t from-primary/85 via-primary/40 to-transparent pb-4 pt-12 opacity-0 transition-opacity duration-300 motion-safe:group-hover:opacity-100"
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
              View case study <LuArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
        </div>
      ) : null}

      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-xl font-bold">
            {/* Stretched link makes the whole card clickable */}
            <Link
              href={`/projects/${project.slug}`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {project.title}
              {project.localizedTitle ? (
                <span lang="bn" className="ml-2 font-normal text-muted">
                  {project.localizedTitle}
                </span>
              ) : null}
            </Link>
          </h3>
          {project.featured ? (
            <span className="rounded-full bg-accent/15 px-2.5 py-0.5 font-mono text-xs font-medium text-accent-text">
              Featured
            </span>
          ) : null}
        </div>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
          {project.tagline}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
          {project.techStack.slice(0, MAX_TAGS).map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
          {extraTags > 0 ? (
            <li>
              <Tag>+{extraTags} more</Tag>
            </li>
          ) : null}
        </ul>

        <div className="relative z-10 mt-6 flex flex-wrap items-center gap-2 pt-1">
          {project.liveUrl ? (
            <ButtonLink href={project.liveUrl} size="sm">
              Live Demo <LuExternalLink className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          ) : null}
          {github ? (
            <ButtonLink href={github.url} variant="secondary" size="sm">
              <FaGithub className="h-4 w-4" aria-hidden="true" /> GitHub
            </ButtonLink>
          ) : null}
          <ButtonLink
            href={`/projects/${project.slug}`}
            variant="ghost"
            size="sm"
            className="ml-auto"
            ariaLabel={`Read the ${project.title} case study`}
          >
            Case study <LuArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
