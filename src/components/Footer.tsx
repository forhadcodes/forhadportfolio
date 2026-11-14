import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center text-sm text-muted sm:text-left">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="mt-1">
            Built with Next.js, Tailwind CSS and Framer Motion.
          </p>
        </div>
        <SocialLinks />
      </Container>
    </footer>
  );
}
