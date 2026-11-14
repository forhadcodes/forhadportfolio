import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div role="status" aria-label="Loading" className="pb-20 pt-32 sm:pt-40">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          <Skeleton className="h-8 w-64 rounded-full" />
          <Skeleton className="h-16 w-full max-w-lg" />
          <Skeleton className="h-8 w-72" />
          <Skeleton className="h-20 w-full max-w-xl" />
          <div className="flex gap-3">
            <Skeleton className="h-12 w-40 rounded-xl" />
            <Skeleton className="h-12 w-32 rounded-xl" />
          </div>
        </div>
        <Skeleton className="mx-auto h-64 w-64 rounded-full sm:h-80 sm:w-80" />
      </Container>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
