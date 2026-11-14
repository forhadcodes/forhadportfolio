import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { LuMail } from "react-icons/lu";
import { mailtoUrl, profile, whatsappUrl } from "@/data/profile";
import { cn } from "@/lib/utils";

const links = [
  { label: "GitHub", href: profile.contact.github, Icon: FaGithub, external: true },
  { label: "LinkedIn", href: profile.contact.linkedin, Icon: FaLinkedinIn, external: true },
  { label: "WhatsApp", href: whatsappUrl, Icon: FaWhatsapp, external: true },
  { label: "Email", href: mailtoUrl, Icon: LuMail, external: false },
];

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {links.map(({ label, href, Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            title={label}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-muted transition-all hover:border-primary hover:text-primary-text motion-safe:hover:-translate-y-0.5"
          >
            <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
