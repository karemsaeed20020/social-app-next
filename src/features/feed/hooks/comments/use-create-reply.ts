"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createReplyService } from "../../services";

export function useCreateReply(postId: string, commentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ content, image }: { content: string; image?: File }) =>
      createReplyService(postId, commentId, content, image),
    onSuccess: (data) => {
      toast.success(data.message);
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["replies", postId, commentId],
        }),
        queryClient.invalidateQueries({ queryKey: ["comments", postId] }),
        queryClient.invalidateQueries({ queryKey: ["posts"] }),
      ]);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
