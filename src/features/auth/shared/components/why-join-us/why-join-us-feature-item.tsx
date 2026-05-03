import { cn } from "@/core";
import { Card, CardContent } from "@/shared";
import { ReactNode } from "react";

interface FeatureItemProps {
  icon: ReactNode;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
}

export function WhyJoinUsFeatureItem({
  icon,
  iconColor,
  iconBg,
  title,
  description,
}: FeatureItemProps) {
  return (
    <Card className="group border-white/10 bg-white/10 py-3 backdrop-blur-sm">
      <CardContent className="flex items-center gap-4">
        <div
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-lg transition-colors",
            iconBg,
            iconColor,
          )}
        >
          {icon}
        </div>
        <div>
          <h4 className="font-bold tracking-tight text-white">{title}</h4>
          <span className="text-xs font-medium uppercase tracking-wider text-white/60">
            {description}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
