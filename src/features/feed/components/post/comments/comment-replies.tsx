"use client";

import { Comment, useGetReplies } from "@/features";
import { Button } from "@/shared";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { CommentInput } from "./comment-input";
import { CommentItem } from "./comment-item";
import { CommentSkeleton } from "./item";
import { RepliesToggle } from "./layout";

interface CommentRepliesProps {
  postId: string;
  commentId: string;
  commentCreatorName: string;
  initialRepliesCount?: number;
  forceShowInput?: boolean;
  onInputClose?: () => void;
}

export function CommentReplies({
  postId,
  commentId,
  commentCreatorName,
  initialRepliesCount = 0,
  forceShowInput,
  onInputClose,
}: CommentRepliesProps) {
  const t = useTranslations("pages.feed.post_card");
  const [showReplies, setShowReplies] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [prevForceShowInput, setPrevForceShowInput] = useState<
    boolean | undefined
  >(forceShowInput);

  if (forceShowInput !== prevForceShowInput) {
    setPrevForceShowInput(forceShowInput);
    if (forceShowInput) {
      setShowReplies(true);
      setShowInput(true);
    }
  }

  const { data: repliesData, isLoading } = useGetReplies(
    postId,
    commentId,
    showReplies,
  );

  const replies: Comment[] = Array.isArray(repliesData)
    ? repliesData
    : repliesData?.data?.replies || repliesData?.replies || [];

  const openInput = () => setShowInput(true);
  const displayCount = Math.max(initialRepliesCount, replies.length);
  const skeletonCount = Math.min(2, displayCount);

  return (
    <div className="mt-2 pl-4 border-l border-muted-foreground/20 space-y-2">
      <RepliesToggle
        showReplies={showReplies}
        count={displayCount}
        onToggle={setShowReplies}
      />

      {showReplies && (
        <div className="space-y-2">
          {isLoading ? (
            <div className="flex py-2 flex-col gap-3">
              {[...Array(skeletonCount)].map((_, i) => (
                <CommentSkeleton key={i} />
              ))}
            </div>
          ) : replies.length === 0 ? (
            <p className="text-xs text-muted-foreground italic pl-2">
              {t("no_replies_yet")}
            </p>
          ) : (
            replies.map((reply) => (
              <CommentItem
                key={reply._id}
                postId={postId}
                comment={reply}
                hideReplies
                onReply={openInput}
              />
            ))
          )}
        </div>
      )}

      {showInput ? (
        <CommentInput
          commentId={commentId}
          postId={postId}
          onCancel={() => {
            setShowInput(false);
            onInputClose?.();
          }}
          replyingTo={commentCreatorName}
        />
      ) : (
        showReplies && (
          <Button
            variant="link"
            size="sm"
            onClick={() => setShowReplies(false)}
          >
            {t("hide_replies")}
          </Button>
        )
      )}
    </div>
  );
}
