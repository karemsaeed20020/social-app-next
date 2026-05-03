import { Button } from "@/shared";
import { MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";

interface RepliesToggleProps {
  showReplies: boolean;
  count: number;
  onToggle: (show: boolean) => void;
}

export function RepliesToggle({
  showReplies,
  count,
  onToggle,
}: RepliesToggleProps) {
  const t = useTranslations("pages.feed.post_card");

  if (showReplies || count <= 0) return null;

  return (
    <Button variant="link" onClick={() => onToggle(true)}>
      <MessageSquare className="w-3.5 h-3.5" />
      <span>{t("view_replies", { count })}</span>
    </Button>
  );
}
