"use client";

import { cn } from "@/core";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-muted-foreground/20",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
