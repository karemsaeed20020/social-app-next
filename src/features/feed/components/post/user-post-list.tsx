"use client";

import { InfiniteList, StateScreen } from "@/shared";
import { Ghost } from "lucide-react";
import { useTranslations } from "next-intl";
import { useGetUserPosts } from "../../hooks";
import { Post } from "../../models";
import { PostCardSkeleton } from "./card";
import { PostCard } from "./post-card";

interface UserPostListProps {
  userId: string;
  emptyMessage?: string;
}

export function UserPostList({ userId, emptyMessage }: UserPostListProps) {
  const t = useTranslations("pages.feed");
  const queryResult = useGetUserPosts(userId);

  return (
    <InfiniteList<Post>
      queryResult={queryResult as never}
      renderItem={(post) => <PostCard post={post} />}
      skeleton={
        <div className="flex flex-col gap-4 pb-8">
          <PostCardSkeleton />
          <PostCardSkeleton showImage />
        </div>
      }
      emptyComponent={
        <StateScreen
          icon={Ghost}
          msg={emptyMessage || t("post_list.no_more_posts")}
        />
      }
      endComponent={
        <div className="flex justify-center p-8 bg-card/30 backdrop-blur-sm rounded-lg border border-dashed border-border/40 w-full hover:bg-card/40 transition-colors duration-300">
          <p className="text-muted-foreground font-medium flex items-center gap-2">
            <Ghost
              className="w-5 h-5 text-muted-foreground/50"
              strokeWidth={1.5}
            />
            {emptyMessage || t("post_list.no_more_posts")}
          </p>
        </div>
      }
      errorComponent={
        <StateScreen
          icon={Ghost}
          msg={t("post_list.error")}
          className="border-destructive/30 bg-destructive/5"
        />
      }
    />
  );
}
