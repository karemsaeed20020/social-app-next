import { cn } from "@/core";
import { Skeleton } from "@/shared";

interface SuggestedCardSkeletonProps {
  count?: number;
  className?: string;
  isSidebar?: boolean;
}

export function SuggestedCardSkeleton({
  count = 5,
  className,
  isSidebar = false,
}: SuggestedCardSkeletonProps) {
  if (isSidebar) {
    return (
      <>
        {/* Mobile Sidebar Skeleton */}
        <div className="flex items-center gap-3 px-4 pb-3 pt-0.5 xl:hidden overflow-hidden">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 shrink-0">
              <Skeleton className="size-12 rounded-lg" />
              <Skeleton className="h-3 w-14 rounded-lg" />
            </div>
          ))}
        </div>

        {/* Desktop Sidebar Skeleton */}
        <div className="hidden xl:block px-4 space-y-2 mb-3">
          {Array.from({ length: count }).map((_, i) => (
            <SingleCardSkeleton key={i} />
          ))}
        </div>
      </>
    );
  }

  // Page Grid Skeleton
  return (
    <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-2", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SingleCardSkeleton key={i} />
      ))}
    </div>
  );
}

function SingleCardSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-24 rounded-lg" />
            <Skeleton className="h-3 w-20 rounded-lg" />
          </div>
        </div>
        <Skeleton className="h-8 w-20 rounded-lg" />
      </div>
      <div className="mt-3 flex gap-2">
        <Skeleton className="h-5 w-16 rounded-lg" />
        <Skeleton className="h-5 w-24 rounded-lg" />
      </div>
    </div>
  );
}
