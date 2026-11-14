import Image from "next/image";
import { LuArrowRight, LuDownload, LuMapPin } from "react-icons/lu";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { profile } from "@/data/profile";
import { hasResume } from "@/lib/resume";

export function Hero() {
  const resume = hasResume();

  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      {/* Decorative glow + grid pattern */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
      </div>

      <Container className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="hero-in">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-muted">
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
              {profile.availability}
            </p>
          </div>

          <div className="hero-in" style={{ animationDelay: "0.08s" }}>
            <p className="mt-8 font-mono text-sm text-accent-text">Hi, I&apos;m</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-6xl">
              {profile.name}
            </h1>
            <p className="mt-4 bg-linear-to-r from-primary to-accent bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
              {profile.title}
            </p>
          </div>

          <div className="hero-in" style={{ animationDelay: "0.16s" }}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {profile.pitch}
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted">
              <LuMapPin className="h-4 w-4 text-primary-text" aria-hidden="true" />
              {profile.location}
            </p>
          </div>

          <div className="hero-in" style={{ animationDelay: "0.24s" }}>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink
                href="/#projects"
                className="group [&>svg]:transition-transform motion-safe:group-hover:[&>svg]:translate-x-0.5"
              >
                View Projects <LuArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/#contact" variant="secondary">
                Contact
              </ButtonLink>
              {resume ? (
                <ButtonLink href={profile.resumePath} variant="ghost" download>
                  <LuDownload className="h-4 w-4" aria-hidden="true" />
                  Download Resume
                </ButtonLink>
              ) : null}
            </div>
            <SocialLinks className="mt-8" />
          </div>

          <div className="hero-in" style={{ animationDelay: "0.32s" }}>
            <dl className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border pt-6">
              {profile.stats.map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-2">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="bg-linear-to-r from-primary to-accent bg-clip-text text-2xl font-extrabold text-transparent">
                    {stat.value}
                  </dd>
                  <dd className="text-sm text-muted">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="hero-in mx-auto" style={{ animationDelay: "0.2s" }}>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-full bg-primary/20 blur-2xl"
            />
            <div className="relative h-64 w-64 sm:h-80 sm:w-80">
              {/* Rotating gradient ring */}
              <div
                aria-hidden="true"
                className="absolute -inset-1.5 rounded-full bg-[conic-gradient(from_0deg,var(--brand-primary),var(--brand-accent),var(--brand-primary))] motion-safe:animate-spin [animation-duration:8s]"
              />
              <div className="absolute inset-0 overflow-hidden rounded-full border-4 border-surface shadow-2xl">
                <Image
                  src={profile.photo}
                  alt={`Portrait of ${profile.name}`}
                  fill
                  priority
                  sizes="(min-width: 640px) 320px, 256px"
                  className="object-cover"
                />
              </div>
              {/* Floating status badge */}
              <div className="float absolute -bottom-3 -right-2 flex items-center gap-2.5 rounded-2xl border border-border bg-surface px-4 py-3 shadow-xl">
                <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                </span>
                <div>
                  <p className="text-sm font-semibold leading-tight">Available for work</p>
                  <p className="text-xs text-muted">{profile.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
