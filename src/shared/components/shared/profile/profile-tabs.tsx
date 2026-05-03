"use client";

import { LayoutGrid } from "lucide-react";
import { Card } from "../../ui";

interface ProfileTabsProps {
  title: string;
  tabsList?: React.ReactNode;
  children: React.ReactNode;
}

export function ProfileTabs({ title, tabsList, children }: ProfileTabsProps) {
  return (
    <Card className="p-4 border-white/10 bg-card/40 backdrop-blur-xl rounded-lg shadow-2xl overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 pb-2 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <LayoutGrid className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-bold tracking-tight">{title}</h2>
        </div>

        {tabsList && <div className="flex items-center gap-2">{tabsList}</div>}
      </div>

      <div className="mt-4">{children}</div>
    </Card>
  );
}
