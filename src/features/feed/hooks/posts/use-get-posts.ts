"use client";

import { PrivacyType } from "@/shared";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { FEED_FILTER_DEFAULT, SIDEBAR_NAV_ITEMS } from "../../constants";
import { getBookmarkPostService, getPostsService } from "../../services";

export function useGetPosts(initialFilter?: string) {
  const searchParams = useSearchParams();
  const filter =
    initialFilter ?? searchParams.get("filter") ?? FEED_FILTER_DEFAULT;
  const apiOnly =
    SIDEBAR_NAV_ITEMS[SIDEBAR_NAV_ITEMS.findIndex((item) => item.id === filter)]
      .value;

  return useInfiniteQuery({
    queryKey: ["posts", "feed", filter],
    queryFn: ({ pageParam }) => {
      if (filter === "saved") {
        return getBookmarkPostService({ page: pageParam });
      }
      return getPostsService({ only: apiOnly as PrivacyType, page: pageParam });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage?.meta?.pagination?.nextPage || undefined;
    },
    select: (data) => ({
      pages: data.pages.flatMap((page) => page.data.posts),
      pageParams: data.pageParams,
      total: data.pages[0]?.meta?.pagination?.total ?? 0,
    }),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });
}
