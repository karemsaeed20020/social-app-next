"use client";

import {
  ReplyFormValues,
  replySchema,
  useCreateComment,
  useCreateReply,
} from "@/features";
import {
  Avatar,
  AvatarImage,
  Button,
  EmojiPicker,
  Textarea,
  useUserData,
} from "@/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image as ImageIcon, Loader2, Send, Smile, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

interface CommentInputProps {
  postId: string;
  commentId?: string;
  replyingTo?: string;
  onCancel?: () => void;
}

export function CommentInput({
  postId,
  commentId,
  replyingTo,
  onCancel,
}: CommentInputProps) {
  const t = useTranslations("pages.feed.post_card");
  const { user } = useUserData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ReplyFormValues>({
    resolver: zodResolver(replySchema),
    defaultValues: { content: "", image: null },
  });

  const image = useWatch({ control, name: "image" });
  const [prevImage, setPrevImage] = useState<File | null>(null);

  const { mutate: addComment, isPending: isCommentPending } =
    useCreateComment(postId);
  const { mutate: addReply, isPending: isReplyPending } = useCreateReply(
    postId,
    commentId || "",
  );

  const isPending = commentId ? isReplyPending : isCommentPending;

  if (image !== prevImage) {
    setPrevImage(image);
    setPreview(image ? URL.createObjectURL(image) : null);
  }

  useEffect(() => {
    if (!image && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [image, preview]);

  const onSubmit = (data: ReplyFormValues) => {
    if (isPending) return;

    if (commentId) {
      addReply(
        { content: data.content, image: data.image || undefined },
        {
          onSuccess: () => {
            reset();
            onCancel?.();
          },
        },
      );
    } else {
      addComment(
        { content: data.content, image: data.image || undefined },
        {
          onSuccess: () => reset(),
        },
      );
    }
  };

  return (
    <div className="flex gap-2.5 items-start border-t border-border bg-muted/30 px-4 py-3">
      <Avatar className="w-8 h-8 shrink-0 border border-border mt-0.5">
        <AvatarImage src={user?.photo} alt={user?.name} />
      </Avatar>
      <div className="flex-1 min-w-0 rounded-lg border border-border bg-background px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-primary/20">
        {replyingTo && (
          <div className="mb-2 flex items-center justify-between rounded bg-muted/50 px-2 py-1.5 text-xs">
            <span className="text-muted-foreground">
              {t("replying_to")}{" "}
              <span className="font-semibold text-primary">{replyingTo}</span>
            </span>
            <Button variant="secondary" size="icon" onClick={onCancel}>
              <X size={12} />
            </Button>
          </div>
        )}
        <Textarea
          {...register("content")}
          rows={1}
          placeholder={t("comment_placeholder", { name: user?.name ?? "" })}
        />
        {preview && (
          <div className="relative mt-2 inline-block">
            <Image
              src={preview}
              alt="preview"
              width={670}
              height={380}
              className="max-h-50 w-full rounded-lg border object-cover"
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-1 top-1"
              onClick={() => setValue("image", null)}
            >
              <X size={12} />
            </Button>
          </div>
        )}
        {errors.content && (
          <p className="text-xs text-destructive mt-0.5">
            {errors.content.message}
          </p>
        )}

        <div className="mt-1.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-muted-foreground">
            <EmojiPicker
              side="bottom"
              align="start"
              onChange={(emoji) =>
                setValue("content", getValues("content") + emoji, {
                  shouldValidate: true,
                })
              }
            >
              <Button variant="ghost" size="icon">
                <Smile className="size-4" />
              </Button>
            </EmojiPicker>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon className="size-4" />
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.webp"
              className="hidden"
              onChange={(e) =>
                setValue("image", e.target.files?.[0] || null, {
                  shouldValidate: true,
                })
              }
            />
          </div>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isPending}
            size="icon"
          >
            {isPending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
