"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCommentService } from "../../services";

export function useUpdateComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: string;
      content: string;
    }) => updateCommentService(postId, commentId, content),
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["comments", postId] }),
        queryClient.invalidateQueries({
          queryKey: ["replies", postId],
          exact: false,
        }),
        queryClient.invalidateQueries({ queryKey: ["posts"] }),
      ]);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
