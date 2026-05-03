"use client";

import { Link, ROUTES, timeAgo } from "@/core";
import { SharedPostType } from "@/features";
import { Avatar, AvatarFallback, AvatarImage, ImageLightbox } from "@/shared";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

interface SharedPostProps {
  post: SharedPostType;
}

export function SharedPost({ post }: SharedPostProps) {
  const t = useTranslations("pages.feed");
  const { user, body, image, createdAt, id, _id } = post;
  const postId = _id || id;
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <div className="mx-4 mb-4 overflow-hidden rounded-lg border border-border/50 bg-accent/20 transition-colors hover:border-border">
      <div className="flex items-center justify-between p-3 pb-2">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 border border-border shadow-sm">
            <AvatarImage src={user?.photo} alt={user?.name} />
            <AvatarFallback className="text-[10px]">
              {user?.name?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h5 className="text-xs font-bold leading-tight text-foreground hover:underline">
              <Link href={`${ROUTES.USER}/${user?._id}`}>{user?.name}</Link>
            </h5>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              {user?.username && <span>@{user.username}</span>}
              <span>·</span>
              <span>{timeAgo(createdAt)}</span>
            </div>
          </div>
        </div>

        <Link
          href={`/posts/${postId}`}
          className="flex items-center gap-2 text-[10px] font-medium text-primary hover:underline"
        >
          <span>{t("original_post")}</span>
          <ExternalLink className="h-3 w-3" />
        </Link>
      </div>

      {body && (
        <div className="px-3 pb-3">
          <p className="whitespace-pre-wrap text-xs leading-normal text-muted-foreground">
            {body}
          </p>
        </div>
      )}

      {image && (
        <>
          <div
            className="group/image relative aspect-video w-full overflow-hidden border-t border-border/50 cursor-pointer"
            onClick={() => setIsLightboxOpen(true)}
          >
            <Image
              src={image}
              alt="Shared post content background"
              fill
              className="scale-125 object-cover opacity-50 blur-2xl transition-opacity duration-500 group-hover/image:opacity-70"
            />
            <Image
              src={image}
              alt="Shared post content"
              fill
              className="relative z-10 object-contain"
            />
          </div>

          <ImageLightbox
            images={image}
            open={isLightboxOpen}
            onClose={() => setIsLightboxOpen(false)}
          />
        </>
      )}
    </div>
  );
}
