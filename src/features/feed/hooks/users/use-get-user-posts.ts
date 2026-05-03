import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserPostsService } from "../../services";

export function useGetUserPosts(userId: string) {
  return useInfiniteQuery({
    queryKey: ["posts", "user", userId],
    queryFn: ({ pageParam }) =>
      getUserPostsService({ userId, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage?.meta?.pagination?.nextPage || undefined;
    },
    select: (data) => ({
      pages: data.pages.flatMap((page) => page.data?.posts || []),
      pageParams: data.pageParams,
      total: data.pages[0]?.meta?.pagination?.total ?? 0,
    }),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });
}
