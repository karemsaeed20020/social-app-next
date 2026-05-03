"use client";

import { useQuery } from "@tanstack/react-query";
import { getRepliesService } from "../../services";

export function useGetReplies(
  postId: string,
  commentId: string,
  enabled = true,
) {
  return useQuery({
    queryKey: ["replies", postId, commentId],
    queryFn: () => getRepliesService(postId, commentId),
    enabled: !!postId && !!commentId && enabled,
  });
}
