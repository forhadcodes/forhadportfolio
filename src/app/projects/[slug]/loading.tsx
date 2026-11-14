import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div role="status" aria-label="Loading project" className="pb-24 pt-28 sm:pt-32">
      <Container>
        <Skeleton className="h-5 w-28" />
        <Skeleton className="mt-6 h-12 w-80 max-w-full" />
        <Skeleton className="mt-4 h-6 w-full max-w-2xl" />
        <div className="mt-6 flex gap-3">
          <Skeleton className="h-12 w-36 rounded-xl" />
          <Skeleton className="h-12 w-44 rounded-xl" />
        </div>
        <Skeleton className="mt-12 aspect-[16/10] w-full rounded-xl" />
      </Container>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
