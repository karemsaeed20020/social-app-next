import { timeAgo } from "@/core";
import { Button } from "@/shared";
import { useTranslations } from "next-intl";

interface CommentActionsProps {
  createdAt: string;
  likesCount: number;
  isLiked: boolean;
  onLike: () => void;
  onReply: () => void;
  hideActions?: boolean;
  hideReplyButton?: boolean;
}

export function CommentActions({
  createdAt,
  likesCount,
  isLiked,
  onLike,
  onReply,
  hideActions,
  hideReplyButton,
}: CommentActionsProps) {
  const t = useTranslations("pages.feed.post_card");

  if (hideActions) {
    return (
      <div className="mt-1 flex items-center px-2 text-xs font-bold text-muted-foreground">
        <span>{timeAgo(createdAt)}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 px-1 text-xs font-bold text-muted-foreground">
      <span className="px-1">{timeAgo(createdAt)}</span>
      <Button
        variant="link"
        size="sm"
        onClick={onLike}
        className={`${isLiked ? "text-primary" : "text-muted-foreground"}`}
      >
        {t("like")}
        {likesCount > 0 && ` (${likesCount})`}
      </Button>

      {!hideReplyButton && (
        <Button
          variant="link"
          className="text-muted-foreground px-0"
          size="sm"
          onClick={onReply}
        >
          {t("reply")}
        </Button>
      )}
    </div>
  );
}
