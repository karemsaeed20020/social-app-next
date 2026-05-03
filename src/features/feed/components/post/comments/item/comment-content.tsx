import { Button, Textarea } from "@/shared";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

interface EditFormValues {
  content: string;
}

interface CommentContentProps {
  creatorName: string;
  content?: string;
  isEditing: boolean;
  updating: boolean;
  register: UseFormRegister<EditFormValues>;
  errors: FieldErrors<EditFormValues>;
  onCancelEdit: () => void;
  onSubmitEdit: UseFormHandleSubmit<EditFormValues>;
  onEditSubmit: (values: EditFormValues) => void;
  children?: React.ReactNode;
}

export function CommentContent({
  creatorName,
  content,
  isEditing,
  updating,
  register,
  errors,
  onCancelEdit,
  onSubmitEdit,
  onEditSubmit,
  children,
}: CommentContentProps) {
  const t = useTranslations("pages.feed.post_card");

  return (
    <div className="relative inline-block rounded-lg bg-muted/50 px-3 py-2 max-w-full">
      <p className="text-[13px] font-bold text-foreground leading-tight mb-0.5">
        {creatorName}
      </p>

      {isEditing ? (
        <div className="mt-2 min-w-50 sm:min-w-75 rounded-lg border border-border bg-background px-3 py-2 shadow-sm transition-all focus-within:ring-1 focus-within:ring-primary/20">
          <Textarea
            {...register("content")}
            autoFocus
            rows={2}
            placeholder={t("edit_comment_placeholder")}
          />
          {errors.content && (
            <p className="text-xs text-destructive mt-0.5">
              {errors.content.message}
            </p>
          )}
          <div className="flex justify-end gap-3 mt-2 pt-2 border-t border-border/50">
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancelEdit}
              className="h-auto px-2 py-1 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("options.cancel")}
            </Button>
            <Button
              variant="default"
              size="sm"
              disabled={updating}
              onClick={onSubmitEdit(onEditSubmit)}
              className="h-7 px-3 text-xs font-bold"
            >
              {updating ? (
                <span className="flex items-center gap-1">
                  <Loader2 className="size-3 animate-spin" /> {t("saving")}
                </span>
              ) : (
                t("save_changes")
              )}
            </Button>
          </div>
        </div>
      ) : (
        <>
          {content && (
            <p className="text-[13px] text-foreground/90 whitespace-pre-wrap wrap-break-word">
              {content}
            </p>
          )}
        </>
      )}

      {children}
    </div>
  );
}
