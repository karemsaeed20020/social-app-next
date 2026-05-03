"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getNotificationsService } from "../services";

export function useGetNotifications(unread: boolean = false) {
  return useInfiniteQuery({
    queryKey: ["notifications", "list", { unread }],
    queryFn: ({ pageParam }) =>
      getNotificationsService({ unread, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return (
        lastPage?.metadata?.nextPage ||
        lastPage?.meta?.pagination?.nextPage ||
        undefined
      );
    },
    select: (data) => ({
      pages: data.pages.flatMap((page) => page?.data?.notifications || []),
      pageParams: data.pageParams,
      metadata: data.pages[0]?.metadata || data.pages[0]?.meta?.pagination,
    }),
  });
}
