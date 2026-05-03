"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { editPostService } from "../../services";

interface EditPostParams {
  postId: string;
  body: string;
}

export function useEditPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, body }: EditPostParams) =>
      editPostService({ postId, body }),
    onSuccess: (data) => {
      toast.success(data.message);
      return queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
