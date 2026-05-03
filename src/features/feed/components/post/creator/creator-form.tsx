"use client";

import { PostFormValues, postSchema, useCreatePost } from "@/features";
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
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { PrivacySelector } from "./privacy-selector";

export function PostCreatorForm() {
  const t = useTranslations("pages.feed");
  const { user } = useUserData();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    mode: "onChange",
    defaultValues: {
      body: "",
      privacy: "public",
      image: null,
    },
  });

  const { mutate: createPost, isPending } = useCreatePost();

  const image = getValues("image");
  const preview = image ? URL.createObjectURL(image) : null;

  const onSubmit = (values: PostFormValues) => {
    createPost(
      {
        body: values.body,
        image: values.image ?? undefined,
        privacy: values.privacy,
      },
      {
        onSuccess: () => {
          reset();
        },
      },
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3 flex items-start gap-3">
        <Avatar className="h-11 w-11 shrink-0 border border-border shadow-sm">
          <AvatarImage src={user?.photo} alt={user?.name} />
        </Avatar>

        <div className="flex-1">
          <p className="text-base font-bold text-card-foreground">
            {user?.name}
          </p>

          <Controller
            control={control}
            name="privacy"
            render={({ field }) => (
              <PrivacySelector
                privacy={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>

      <div className="relative">
        <Textarea
          {...register("body")}
          rows={4}
          onKeyDown={handleKeyDown}
          placeholder={t("post_creator.placeholder", {
            name: user?.name || "",
          })}
        />

        {errors.body && (
          <p className="mt-1 text-xs text-destructive">{errors.body.message}</p>
        )}

        {preview && (
          <div className="relative mt-2 inline-block">
            <Image
              src={preview}
              alt="preview"
              width={670}
              height={380}
              className="max-h-50 w-full rounded-lg border border-border object-cover"
            />

            <Button
              type="button"
              variant="ghost"
              className="absolute right-1 top-1 size-6 rounded-lg bg-muted/50"
              onClick={() => {
                setValue("image", null, { shouldValidate: true });
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
            >
              <X className="size-3" />
            </Button>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
        <div className="flex items-center gap-2">
          <label className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-accent hover:text-accent-foreground">
            <ImageIcon className="size-4 text-green-500" />
            <span className="hidden sm:inline">{t("post_creator.photo")}</span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.webp"
              className="hidden"
              onChange={(e) =>
                setValue("image", e.target.files?.[0] ?? null, {
                  shouldValidate: true,
                })
              }
            />
          </label>

          <EmojiPicker
            side="top"
            align="start"
            onChange={(emoji) =>
              setValue("body", getValues("body") + emoji, {
                shouldValidate: true,
              })
            }
          >
            <Button type="button" variant="ghost">
              <Smile className="text-amber-500" />
              <span className="hidden sm:inline">
                {t("post_creator.feeling")}
              </span>
            </Button>
          </EmojiPicker>
        </div>

        <Button type="submit" disabled={!isValid || isPending}>
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Posting...
            </>
          ) : (
            <>
              {t("post_creator.post")}
              <Send />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
