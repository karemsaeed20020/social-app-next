import { LucideIcon } from "lucide-react";

interface ProfileInfoItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function ProfileInfoItem({
  icon: Icon,
  label,
  value,
}: ProfileInfoItemProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="p-2 rounded-lg bg-primary/5">
        <Icon className="size-4 text-primary" />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
          {label}
        </span>
        <span className="text-sm font-semibold text-foreground">{value}</span>
      </div>
    </div>
  );
}
