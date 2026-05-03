"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { toggleBookmarkService } from "../../services";

interface UseToggleBookmarkPostProps {
  postId: string;
  initialBookmarked: boolean;
}

export function useToggleBookmarkPost({
  postId,
  initialBookmarked,
}: UseToggleBookmarkPostProps) {
  const queryClient = useQueryClient();
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  useEffect(() => {
    setIsBookmarked(initialBookmarked);
  }, [initialBookmarked]);

  const mutation = useMutation({
    mutationFn: () => toggleBookmarkService(postId),
    onMutate: async () => {
      const previousBookmarked = isBookmarked;
      setIsBookmarked(!isBookmarked);

      await queryClient.cancelQueries({
        queryKey: ["bookmark-post", postId],
      });

      const previousData = queryClient.getQueryData<{
        bookmarked: boolean;
      }>(["bookmark-post", postId]);

      queryClient.setQueryData(
        ["bookmark-post", postId],
        (old: { bookmarked: boolean }) => ({
          bookmarked: !old?.bookmarked,
        }),
      );

      return { previousData, previousBookmarked };
    },
    onError: (error, _vars, context) => {
      toast.error(error.message);
      if (context?.previousData) {
        queryClient.setQueryData(
          ["bookmark-post", postId],
          context.previousData,
        );
      }
      if (context?.previousBookmarked !== undefined) {
        setIsBookmarked(context.previousBookmarked);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookmark-post", postId],
      });
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  return {
    isBookmarked,
    toggleBookmark: mutation.mutate,
    isPending: mutation.isPending,
  };
}
