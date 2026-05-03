"use client";

import { Comment } from "@/features";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { useGetComments } from "../../hooks";
import {
  CommentInput,
  CommentsHeader,
  CommentsList,
  TopCommentPreview,
} from "./comments";

interface Props {
  postId: string;
  topComment: Comment | null;
  commentsCount: number;
  isCommentBoxOpen?: boolean;
}

export function PostComments({ postId, topComment, commentsCount }: Props) {
  const t = useTranslations("pages.feed.post_card");
  const [showAll, setShowAll] = useState(false);

  const { data, isLoading } = useGetComments(postId, showAll);

  const allComments = useMemo(() => {
    if (!data) return [];
    return data.data?.comments ?? data.comments ?? [];
  }, [data]);

  return (
    <div className="border-t border-border">
      {commentsCount > 0 && <CommentsHeader count={commentsCount} />}

      {showAll ? (
        <CommentsList
          onReply={() => setShowAll(false)}
          postId={postId}
          comments={allComments}
          isLoading={isLoading}
        />
      ) : (
        topComment && (
          <TopCommentPreview
            comment={topComment}
            postId={postId}
            commentsCount={commentsCount}
            onViewAll={() => setShowAll(true)}
            label={t("top_comment")}
          />
        )
      )}

      <CommentInput postId={postId} />
    </div>
  );
}
