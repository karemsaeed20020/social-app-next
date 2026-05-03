"use client";

import { cn, usePathname, useRouter } from "@/core";
import { Button } from "@/shared";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { FEED_FILTER_DEFAULT, SIDEBAR_NAV_ITEMS } from "../../constants";

export function PostsFilters() {
  const t = useTranslations("pages.feed.sidebar");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isFeedPage = pathname.startsWith("/feed");
  const activeFilter = isFeedPage
    ? searchParams.get("filter") || FEED_FILTER_DEFAULT
    : null;

  const handleFilterChange = useCallback(
    (filterId: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (filterId === FEED_FILTER_DEFAULT) {
        params.delete("filter");
      } else {
        params.set("filter", filterId);
      }

      const query = params.toString();
      router.push(`/feed?${query ? `${query}` : ""}`, { scroll: true });
    },
    [searchParams, router],
  );

  return (
    <div className="rounded-lg border border-border bg-card p-2 xl:p-3 shadow-sm">
      <div className="grid grid-cols-2 gap-2 xl:flex xl:flex-col xl:gap-0">
        {SIDEBAR_NAV_ITEMS.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeFilter === item.id;
          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => handleFilterChange(item.id)}
              className={cn(
                "flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-bold transition h-auto",
                "xl:w-full xl:justify-start xl:px-3 xl:py-2",
                index > 0 && "xl:mt-1",
                isActive
                  ? "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary"
                  : "text-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {Icon && <Icon className="size-4 shrink-0" />}
              <span>{t(item.id as never)}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
