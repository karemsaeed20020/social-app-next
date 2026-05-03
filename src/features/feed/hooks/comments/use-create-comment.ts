"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCommentService } from "../../services";

export function useCreateComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ content, image }: { content: string; image?: File }) =>
      createCommentService(postId, content, image),
    onSuccess: (data) => {
      toast.success(data.message);
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["comments", postId] }),
        queryClient.invalidateQueries({ queryKey: ["posts"] }),
      ]);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
