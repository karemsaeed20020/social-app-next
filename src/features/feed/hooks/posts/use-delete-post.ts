"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deletePostService } from "../../services";

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => deletePostService(postId),
    onSuccess: (data) => {
      toast.success(data.message);
      return queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
