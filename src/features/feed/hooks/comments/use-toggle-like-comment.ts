"use client";

import { User } from "@/features/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Comment, Post } from "../../models";
import { toggleLikeCommentService } from "../../services";

interface UserDataCache {
  user: User | null;
  token: string | null;
}

interface CommentsCache {
  data?: {
    comments: Comment[];
  };
  comments?: Comment[];
}

interface RepliesCache {
  data?: {
    replies?: Comment[];
    comments?: Comment[];
  };
  replies?: Comment[];
  comments?: Comment[];
}

interface PostsCache {
  data?: {
    posts: Post[];
  };
  posts?: Post[];
}

export function useToggleLikeComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    Error,
    string,
    { previousComments?: CommentsCache }
  >({
    mutationFn: (commentId: string) =>
      toggleLikeCommentService(postId, commentId),
    onMutate: async (commentId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["comments", postId] });
      await queryClient.cancelQueries({
        queryKey: ["replies", postId],
        exact: false,
      });
      await queryClient.cancelQueries({ queryKey: ["posts"], exact: false });

      const currentUser = queryClient.getQueryData<UserDataCache>([
        "user-data",
      ])?.user;
      const currentUserId = currentUser?._id;

      // Optimistic Update Function
      const updateItemLikes = (item: Comment): Comment => {
        if (!item || item._id !== commentId || !currentUserId) return item;
        const isLiked = item.likes?.includes(currentUserId);
        const newLikes = isLiked
          ? item.likes.filter((id) => id !== currentUserId)
          : [...(item.likes || []), currentUserId];
        return { ...item, likes: newLikes };
      };

      // 1. Update Comments Cache
      queryClient.setQueryData<CommentsCache>(["comments", postId], (old) => {
        if (!old) return old;
        const oldComments = old.data?.comments || old.comments || [];
        const comments = oldComments.map(updateItemLikes);

        if (old.data) return { ...old, data: { ...old.data, comments } };
        return { ...old, comments };
      });

      // 2. Update Replies Caches
      const queryCache = queryClient.getQueryCache();
      const repliesQueries = queryCache.findAll({
        queryKey: ["replies", postId],
        exact: false,
      });
      repliesQueries.forEach((query) => {
        queryClient.setQueryData<RepliesCache | Comment[]>(
          query.queryKey,
          (old) => {
            if (!old) return old;

            if (Array.isArray(old)) {
              return old.map(updateItemLikes);
            }

            const oldReplies =
              old.data?.replies ||
              old.data?.comments ||
              old.replies ||
              old.comments ||
              [];
            const replies = oldReplies.map(updateItemLikes);

            if (old.data) {
              const dataKey = old.data.replies ? "replies" : "comments";
              return {
                ...old,
                data: {
                  ...old.data,
                  [dataKey]: replies,
                },
              };
            }

            const rootKey = old.replies ? "replies" : "comments";
            return { ...old, [rootKey]: replies };
          },
        );
      });

      // 3. Update topComment in Posts Cache
      const postsQueries = queryCache.findAll({
        queryKey: ["posts"],
        exact: false,
      });
      postsQueries.forEach((query) => {
        queryClient.setQueryData<PostsCache>(query.queryKey, (old) => {
          if (!old) return old;

          const updatePost = (post: Post): Post => {
            if (post.topComment?._id === commentId) {
              return { ...post, topComment: updateItemLikes(post.topComment) };
            }
            return post;
          };

          if (old.data?.posts) {
            return {
              ...old,
              data: { ...old.data, posts: old.data.posts.map(updatePost) },
            };
          }
          if (old.posts) return { ...old, posts: old.posts.map(updatePost) };
          return old;
        });
      });

      return {
        previousComments: queryClient.getQueryData<CommentsCache>([
          "comments",
          postId,
        ]),
      };
    },
    onError: (error, _commentId, context) => {
      toast.error(error.message);
      if (context?.previousComments) {
        queryClient.setQueryData<CommentsCache>(
          ["comments", postId],
          context.previousComments,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      queryClient.invalidateQueries({
        queryKey: ["replies", postId],
        exact: false,
      });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
