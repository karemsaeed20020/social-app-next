"use client";

import { Comment } from "@/features";
import { Button } from "@/shared";
import { useTranslations } from "next-intl";
import { CommentItem } from "../comment-item";

interface TopCommentPreviewProps {
  comment: Comment;
  postId: string;
  commentsCount: number;
  onViewAll: () => void;
  label: string;
}

export function TopCommentPreview({
  comment,
  postId,
  commentsCount,
  onViewAll,
  label,
}: TopCommentPreviewProps) {
  const t = useTranslations("pages.feed.post_card");

  return (
    <div className="p-4">
      <div className="px-4 py-3 space-y-2 rounded-lg bg-background">
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <CommentItem
          postId={postId}
          comment={comment}
          onReply={onViewAll}
          hideActions={true}
        />
      </div>
      {commentsCount > 0 && (
        <Button
          variant="link"
          onClick={onViewAll}
          className="h-auto p-0 text-xs font-semibold text-primary hover:no-underline mt-2"
        >
          {t("view_all_comments_plain")}
        </Button>
      )}
    </div>
  );
}
