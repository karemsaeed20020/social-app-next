import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface CommentOptionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function CommentOptions({ onEdit, onDelete }: CommentOptionsProps) {
  const t = useTranslations("pages.feed.post_card.options");
  return (
    <div className="absolute -right-8 top-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem className="text-xs" onClick={onEdit}>
            <Pencil className="size-3 mr-2" /> {t("edit_comment")}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-xs text-destructive"
            onClick={onDelete}
          >
            <Trash2 className="size-3 mr-2" /> {t("delete_comment_text")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
