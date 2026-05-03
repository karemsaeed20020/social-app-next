import { Card } from "../../ui";

export interface ProfileStat {
  label: string;
  count: number | string;
}

interface ProfileStatsProps {
  stats: ProfileStat[];
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <div className="flex items-center gap-4 w-full overflow-x-auto">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="bg-card border-border rounded-lg p-5 flex-1 flex flex-col items-center justify-center gap-2 shadow-xs min-w-30"
        >
          <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase text-center">
            {stat.label}
          </span>
          <span className="text-3xl font-black text-foreground">
            {stat.count}
          </span>
        </Card>
      ))}
    </div>
  );
}
