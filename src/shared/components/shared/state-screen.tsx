import { cn } from "@/core";
import { LucideIcon } from "lucide-react";

interface StateScreenProps {
  icon?: LucideIcon;
  msg: string;
  desc?: string;
  action?: React.ReactNode;
  size?: "default" | "compact";
  className?: string;
  iconClassName?: string;
}

export function StateScreen({
  icon: Icon,
  msg,
  desc,
  action,
  size = "default",
  className,
  iconClassName,
}: StateScreenProps) {
  const isCompact = size === "compact";

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center",
        "bg-card backdrop-blur-xs rounded-lg border border-border",
        "w-full",
        isCompact ? "min-h-40 p-4" : "min-h-70",
        className,
      )}
    >
      <div
        className={cn(
          "flex flex-col items-center gap-4",
          isCompact ? "max-w-xs gap-3" : "max-w-sm gap-5",
        )}
      >
        {Icon && (
          <div
            className={cn(
              "flex items-center justify-center rounded-lg bg-primary/10 text-primary",
              isCompact ? "p-3 mb-1" : "p-5 mb-2",
              iconClassName,
            )}
          >
            <Icon
              className={cn(isCompact ? "size-6" : "size-12")}
              strokeWidth={1.25}
            />
          </div>
        )}

        <div className={cn("space-y-3", isCompact && "space-y-1")}>
          <h3
            className={cn(
              "font-bold tracking-tight text-foreground/90",
              isCompact ? "text-base" : "text-2xl",
            )}
          >
            {msg}
          </h3>
          {desc && (
            <p
              className={cn(
                "text-muted-foreground leading-relaxed mx-auto",
                isCompact ? "text-xs max-w-50" : "text-base max-w-70",
              )}
            >
              {desc}
            </p>
          )}
        </div>

        {action && <div>{action}</div>}
      </div>
    </div>
  );
}
