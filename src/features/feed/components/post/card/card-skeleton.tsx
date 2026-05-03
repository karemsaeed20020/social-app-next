import { Card, Skeleton } from "@/shared";

interface PostCardSkeletonProps {
  showImage?: boolean;
}

export function PostCardSkeleton({ showImage }: PostCardSkeletonProps) {
  return (
    <Card className="rounded-lg border border-border bg-card shadow-sm overflow-hidden py-0">
      {/* Header */}
      <div className="flex items-start justify-between p-4 pb-0">
        <div className="flex gap-3 w-full">
          <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
          <div className="space-y-2 w-full max-w-xs">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[80%]" />
        </div>
        {showImage && <Skeleton className="h-50 w-full rounded-lg mt-4" />}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-border/50">
        <Skeleton className="h-4 w-16" />
        <div className="flex gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-2 py-1 border-t border-border">
        <div className="flex-1 flex justify-center py-2 hover:bg-muted/50 rounded-lg">
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="flex-1 flex justify-center py-2 hover:bg-muted/50 rounded-lg">
          <Skeleton className="h-6 w-20" />
        </div>
        <div className="flex-1 flex justify-center py-2 hover:bg-muted/50 rounded-lg">
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    </Card>
  );
}
