"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { sharePostService } from "../../services";

export function useSharePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sharePostService,
    onSuccess: (data) => {
      toast.success(data.message);
      return queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
