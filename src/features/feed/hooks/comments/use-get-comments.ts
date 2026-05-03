"use client";

import { useQuery } from "@tanstack/react-query";
import { getCommentsService } from "../../services";

export function useGetComments(postId: string, enabled = true) {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getCommentsService(postId),
    enabled: !!postId && enabled,
  });
}
