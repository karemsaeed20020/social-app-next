"use client";

import { useQuery } from "@tanstack/react-query";
import { getPostService } from "../../services";

export function useGetPost(postId: string) {
  return useQuery({
    queryKey: ["posts", postId],
    queryFn: () => getPostService(postId),
    enabled: !!postId,
  });
}
