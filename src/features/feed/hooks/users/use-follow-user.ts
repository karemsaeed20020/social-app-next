"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { followUserService } from "../../services";

export const useFollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => followUserService(userId),
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["profile"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["users"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["posts"],
        }),
      ]);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
