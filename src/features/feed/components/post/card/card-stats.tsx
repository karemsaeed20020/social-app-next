import { Link } from "@/core";
import { ThumbsUp } from "lucide-react";
import { useTranslations } from "next-intl";

interface CardStatsProps {
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  postId: string;
}

export function CardStats({
  likesCount,
  commentsCount,
  sharesCount,
  postId,
}: CardStatsProps) {
  const t = useTranslations("pages.feed");

  return (
    <>
      <div className="px-4 pb-2 pt-3 text-sm text-muted-foreground">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ThumbsUp className="size-3" />
            </span>
            <span className="font-semibold">
              {likesCount} {t("post_card.likes")}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs sm:gap-3 sm:text-sm">
            <span>
              {commentsCount} {t("post_card.comments")}
            </span>
            <span>
              {sharesCount} {t("post_card.shares")}
            </span>
            <Link className="hover:underline" href={`/posts/${postId}`}>
              {t("post_card.view_details")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
