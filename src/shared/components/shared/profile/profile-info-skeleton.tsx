import { Skeleton } from "../../ui";

export function ProfileInfoSkeleton({
  hasExtraCards = true,
}: {
  hasExtraCards?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* About Card Skeleton */}
      <div
        className={`${hasExtraCards ? "md:col-span-8" : "md:col-span-12"} p-10 border border-border bg-card rounded-lg flex flex-col gap-6 shadow-xs`}
      >
        <Skeleton className="h-5 w-20" />
        <div className="flex flex-col gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="size-10 rounded-lg shrink-0" />
              <div className="flex flex-col gap-2 w-full">
                <Skeleton className="h-2 w-12 rounded-full" />
                <Skeleton className="h-4 w-3/4 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Side Cards Skeleton */}
      {hasExtraCards && (
        <div className="md:col-span-4 flex flex-col gap-4 h-full">
          <div className="h-full p-6 border border-border bg-card rounded-lg flex flex-col gap-2 shadow-xs">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-10 w-12" />
          </div>
          <div className="h-full p-6 border border-border bg-card rounded-lg flex flex-col gap-2 shadow-xs">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-10 w-12" />
          </div>
        </div>
      )}
    </div>
  );
}
