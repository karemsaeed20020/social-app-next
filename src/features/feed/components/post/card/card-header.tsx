"use client";

import { cn, Link, ROUTES, timeAgo } from "@/core";
import { useDeletePost, User, useToggleBookmarkPost } from "@/features";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  CardHeader as CardHeaderPrimitive,
  DeleteDialog,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useUserData,
} from "@/shared";
import {
  Bookmark,
  Copy,
  Globe,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface CardHeaderProps {
  postId: string;
  postUser: User;
  createdAt: string;
  privacy: string;
  initialBookmarked: boolean;
  onEdit: () => void;
}
export function CardHeader({
  postId,
  postUser,
  createdAt,
  privacy,
  initialBookmarked,
  onEdit,
}: CardHeaderProps) {
  const t = useTranslations("pages.feed");
  const { user } = useUserData();
  const isOwner = user?._id === postUser?._id;

  const { isBookmarked, toggleBookmark } = useToggleBookmarkPost({
    postId,
    initialBookmarked,
  });

  const { mutate: deletePost, isPending } = useDeletePost();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/posts/${postId}`;
    navigator.clipboard.writeText(url);
  };

  const handleDelete = () => {
    deletePost(postId, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
      },
    });
  };

  return (
    <>
      <CardHeaderPrimitive className="p-4 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-3">
          <Link
            href={isOwner ? ROUTES.PROFILE : `${ROUTES.USER}/${postUser?._id}`}
          >
            <Avatar className="w-11 h-11 border border-border shadow-sm shrink-0">
              <AvatarImage src={postUser?.photo} alt={postUser?.name} />
              <AvatarFallback>{postUser?.name?.[0]}</AvatarFallback>
            </Avatar>
          </Link>

          <div className="min-w-0 flex-1 flex flex-col gap-1">
            <Link
              href={
                isOwner ? ROUTES.PROFILE : `${ROUTES.USER}/${postUser?._id}`
              }
            >
              <h4 className="truncate text-sm font-bold text-card-foreground hover:underline cursor-pointer">
                {postUser?.name}
              </h4>
            </Link>

            <div className="flex flex-wrap gap-1 text-xs text-muted-foreground items-center">
              {postUser?.username && (
                <>
                  <span>{postUser.username}</span>
                  <span>·</span>
                </>
              )}
              <span>{timeAgo(createdAt)}</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Globe className="size-3" />
                {t(`privacy.${privacy}` as never)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleBookmark()}
            className={cn(
              "h-9 w-9 rounded-lg",
              isBookmarked ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Bookmark
              className={cn("size-4", isBookmarked && "fill-current")}
            />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:bg-accent rounded-lg shrink-0"
              >
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleCopyLink}>
                <Copy className="size-4" />
                {t("post_card.options.copy_link")}
              </DropdownMenuItem>

              {isOwner && (
                <>
                  <DropdownMenuItem onClick={onEdit}>
                    <Pencil className="size-4" />
                    {t("post_card.options.edit")}
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => setIsDeleteDialogOpen(true)}
                  >
                    <Trash2 className="size-4" />
                    {t("post_card.options.delete")}
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeaderPrimitive>

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        isPending={isPending}
        title={t("post_card.options.delete")}
        description={t("post_card.options.delete_confirm")}
        cancelText={t("post_card.options.cancel")}
        confirmText={t("post_card.options.delete")}
      />
    </>
  );
}
