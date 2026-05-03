"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteCommentService } from "../../services";

export function useDeleteComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => deleteCommentService(postId, commentId),
    onSuccess: (data) => {
      toast.success(data.message);
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
