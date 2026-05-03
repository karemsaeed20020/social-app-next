import { Skeleton } from "../../ui";

export function ProfileHeaderSkeleton() {
  return (
    <div className="w-full">
      <Skeleton className="h-60 w-full rounded-lg" />

      <div className="max-w-6xl mx-auto -mt-16 relative z-10">
        <div className="bg-card rounded-lg p-4 shadow-sm border border-border/60 flex flex-col gap-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 w-full">
            <div className="relative -mt-20">
              <div className="rounded-lg bg-card p-1.5 shadow-xl ring-2 ring-border/60">
                <Skeleton className="h-28 w-28 md:h-36 md:w-36 rounded-lg" />
              </div>
              <div className="absolute bottom-1 right-1">
                <Skeleton className="h-10 w-10 rounded-lg" />
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-start gap-2 pt-2">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>

          <div className="w-full flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Skeleton className="h-24 rounded-lg" />
              <Skeleton className="h-24 rounded-lg" />
              <Skeleton className="h-24 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
