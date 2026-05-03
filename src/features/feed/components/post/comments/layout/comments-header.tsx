import { useTranslations } from "next-intl";

interface CommentsHeaderProps {
  count: number;
}

export function CommentsHeader({ count }: CommentsHeaderProps) {
  const t = useTranslations("pages.feed.post_card");

  return (
    <div className="flex items-center justify-between p-4 pb-0">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-bold text-foreground">
          {t("comments_title")}
        </h3>
        {count > 0 && (
          <span className="flex h-5 items-center justify-center rounded-lg bg-primary/10 px-2 text-xs font-bold text-primary">
            {count}
          </span>
        )}
      </div>
    </div>
  );
}
