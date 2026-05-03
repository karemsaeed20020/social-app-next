"use client";

import { SharedPostType } from "@/features";
import {
  Button,
  CardContent as CardContentPrimitive,
  ImageLightbox,
  Textarea,
} from "@/shared";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { SharedPost } from "./shared-post";

interface CardContentProps {
  body?: string;
  image?: string;
  isEditing?: boolean;
  editValue?: string;
  onEditChange?: (value: string) => void;
  onEditSave?: () => void;
  onEditCancel?: () => void;
  isSavingEdit?: boolean;
  isShare?: boolean;
  sharedPost?: SharedPostType | null;
}

export function CardContent({
  body,
  image,
  isEditing = false,
  editValue = "",
  onEditChange,
  onEditSave,
  onEditCancel,
  isSavingEdit = false,
  isShare = false,
  sharedPost = null,
}: CardContentProps) {
  const t = useTranslations("pages.feed");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [src, setSrc] = useState<string | null>(image || null);

  return (
    <CardContentPrimitive className="p-0">
      {isEditing ? (
        <div className="px-4 pb-3 flex flex-col gap-2">
          <Textarea
            value={editValue}
            onChange={(e) => onEditChange?.(e.target.value)}
            className="min-h-20 resize-none text-sm leading-relaxed"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onEditCancel}
              disabled={isSavingEdit}
            >
              {t("post_card.options.cancel")}
            </Button>
            <Button
              size="sm"
              onClick={onEditSave}
              disabled={isSavingEdit || !editValue.trim()}
            >
              {t("post_card.options.save")}
            </Button>
          </div>
        </div>
      ) : (
        body && (
          <div className="px-4 pb-3">
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
              {body}
            </p>
          </div>
        )
      )}

      {isShare && sharedPost && <SharedPost post={sharedPost} />}

      {image && !isShare && src && (
        <>
          <div
            className="relative aspect-video w-full overflow-hidden group/image cursor-pointer"
            onClick={() => setIsLightboxOpen(true)}
          >
            <Image
              src={src}
              alt={t("post_card.photo")}
              fill
              onError={() => setSrc("/image-broken.png")}
              className="object-cover blur-2xl transition opacity-60 duration-500 group-hover/image:opacity-70 scale-125"
            />
            <Image
              src={src}
              alt={t("post_card.photo")}
              fill
              onError={() => setSrc("/image-broken.png")}
              className="object-contain relative z-10"
            />
          </div>

          <ImageLightbox
            images={image}
            open={isLightboxOpen}
            onClose={() => setIsLightboxOpen(false)}
          />
        </>
      )}
    </CardContentPrimitive>
  );
}
