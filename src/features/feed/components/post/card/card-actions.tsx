"use client";

import { cn } from "@/core";
import { Button, CardFooter } from "@/shared";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface CardActionsProps {
  liked: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
}

export function CardActions({
  liked,
  onLike,
  onComment,
  onShare,
}: CardActionsProps) {
  const t = useTranslations("pages.feed");

  return (
    <CardFooter className="grid grid-cols-3 gap-1 p-1">
      <Button
        variant="ghost"
        onClick={onLike}
        className={cn(
          "flex items-center justify-center gap-2 rounded-lg p-2 text-xs font-semibold transition-colors sm:gap-2 sm:text-sm",
          liked
            ? "text-primary hover:text-primary bg-primary/10 hover:bg-primary/15"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        )}
      >
        <Heart className={cn("size-4", liked && "fill-current text-primary")} />
        <span>{t("post_card.like")}</span>
      </Button>

      <Button
        variant="ghost"
        onClick={onComment}
        className="flex items-center justify-center gap-2 rounded-lg p-2 text-xs font-semibold transition-colors sm:gap-2 sm:text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      >
        <MessageCircle className="size-4" />
        <span>{t("post_card.comment")}</span>
      </Button>

      <Button
        variant="ghost"
        onClick={onShare}
        className="flex items-center justify-center gap-2 rounded-lg p-2 text-xs font-semibold transition-colors sm:gap-2 sm:text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      >
        <Share2 className="size-4" />
        <span>{t("post_card.share")}</span>
      </Button>
    </CardFooter>
  );
}
