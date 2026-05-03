"use client";

import { StateScreen } from "@/shared";
import { AlertCircle, FileQuestion } from "lucide-react";
import { useTranslations } from "next-intl";
import { useGetPost } from "../../hooks";
import { PostCardSkeleton } from "./card";
import { PostCard } from "./post-card";

interface SinglePostProps {
  postId: string;
}

export function SinglePost({ postId }: SinglePostProps) {
  const t = useTranslations("pages.posts");
  const { data, isPending, isError } = useGetPost(postId);

  if (isPending) {
    return (
      <div className="flex flex-col gap-4 pb-8 w-full max-w-2xl mx-auto">
        <PostCardSkeleton showImage />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <StateScreen
          icon={AlertCircle}
          msg={t("error")}
          className="border-destructive/30 bg-destructive/5"
        />
      </div>
    );
  }

  const post = data?.data?.post;

  if (!post) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <StateScreen icon={FileQuestion} msg={t("not_found")} />
      </div>
    );
  }

  return <PostCard post={post} />;
}
