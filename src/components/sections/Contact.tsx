import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { LuDownload, LuMail } from "react-icons/lu";
import type { IconType } from "react-icons";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/ui/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { mailtoUrl, profile, whatsappUrl } from "@/data/profile";
import { hasResume } from "@/lib/resume";

interface Channel {
  label: string;
  value: string;
  href: string;
  Icon: IconType;
}

const channels: Channel[] = [
  { label: "Email", value: profile.contact.email, href: mailtoUrl, Icon: LuMail },
  { label: "WhatsApp", value: "Message me on WhatsApp", href: whatsappUrl, Icon: FaWhatsapp },
  { label: "LinkedIn", value: "md-forhad-hussain", href: profile.contact.linkedin, Icon: FaLinkedinIn },
  { label: "GitHub", value: "forhadcodes", href: profile.contact.github, Icon: FaGithub },
];

export function Contact() {
  const resume = hasResume();

  return (
    <section id="contact" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="05 / contact"
          title="Let's connect"
          description="I'm looking to join a collaborative tech team. Whether you have a role, a project or just a question, send me a message."
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <ul className="space-y-3">
              {channels.map(({ label, value, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 transition-all hover:border-primary/60 motion-safe:hover:-translate-y-0.5"
                  >
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary-text">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-xs uppercase tracking-wider text-muted">
                        {label}
                      </span>
                      <span className="block truncate font-medium">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {resume ? (
              <ButtonLink href={profile.resumePath} variant="secondary" download className="mt-6">
                <LuDownload className="h-4 w-4" aria-hidden="true" />
                Download Resume
              </ButtonLink>
            ) : null}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <ContactForm />
              <p className="mt-5 text-sm text-muted">
                Prefer email? Write to{" "}
                <a className="font-medium text-primary-text underline underline-offset-4" href={mailtoUrl}>
                  {profile.contact.email}
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
