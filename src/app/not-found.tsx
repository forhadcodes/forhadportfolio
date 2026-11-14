import type { Metadata } from "next";
import { LuArrowLeft } from "react-icons/lu";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center pt-24">
      <Container className="text-center">
        <p className="font-mono text-sm text-accent-text">404</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
          This page doesn&apos;t exist
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          The link may be broken or the page may have moved. Let&apos;s get you
          back on track.
        </p>
        <ButtonLink href="/" className="mt-8">
          <LuArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to home
        </ButtonLink>
      </Container>
    </section>
  );
}
