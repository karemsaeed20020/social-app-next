"use client";

import {
  Comment,
  useDeleteComment,
  useToggleLikeComment,
  useUpdateComment,
} from "@/features";
import { DeleteDialog, ImageLightbox, useUserData } from "@/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CommentReplies } from "./comment-replies";
import {
  CommentActions,
  CommentAvatar,
  CommentContent,
  CommentOptions,
} from "./item";

const editSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty"),
});

type EditFormValues = z.infer<typeof editSchema>;

export function CommentItem({
  postId,
  comment,
  onReply,
  hideReplies = false,
  hideActions = false,
}: {
  postId: string;
  comment: Comment;
  onReply: (comment: Comment) => void;
  hideReplies?: boolean;
  hideActions?: boolean;
}) {
  const t = useTranslations("pages.feed.post_card");
  const {
    _id,
    commentCreator,
    content,
    image,
    createdAt,
    likes,
    parentComment,
    repliesCount,
  } = comment;

  const { user } = useUserData();
  const isOwner = user?._id === commentCreator._id;

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const closeDeleteDialog = () => setIsDeleteDialogOpen(false);

  const { mutate: toggleLike } = useToggleLikeComment(postId);
  const { mutate: deleteComment, isPending: isDeleting } =
    useDeleteComment(postId);
  const { mutate: updateComment, isPending: updating } =
    useUpdateComment(postId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditFormValues>({
    resolver: zodResolver(editSchema),
    defaultValues: { content: content || "" },
  });

  const isLiked = user ? likes.includes(user._id) : false;

  const handleLike = () => toggleLike(_id);

  const handleDelete = () => {
    deleteComment(_id, {
      onSuccess: () => closeDeleteDialog(),
    });
  };

  const onEditSubmit = (values: EditFormValues) => {
    updateComment(
      { commentId: _id, content: values.content },
      {
        onSuccess: () => setIsEditing(false),
      },
    );
  };

  const handleReplyClick = () => {
    if (parentComment || hideReplies) {
      onReply(comment);
    } else {
      setIsInputOpen(true);
    }
  };

  return (
    <div className="flex gap-2.5 group">
      <CommentAvatar photo={commentCreator.photo} name={commentCreator.name} />

      <div className="flex-1 min-w-0">
        <CommentContent
          creatorName={commentCreator.name}
          content={content}
          isEditing={isEditing}
          updating={updating}
          register={register}
          errors={errors}
          onCancelEdit={() => setIsEditing(false)}
          onSubmitEdit={handleSubmit}
          onEditSubmit={onEditSubmit}
        >
          {isOwner && !isEditing && !hideActions && (
            <CommentOptions
              onEdit={() => setIsEditing(true)}
              onDelete={() => setIsDeleteDialogOpen(true)}
            />
          )}
        </CommentContent>

        {image && (
          <>
            <div
              className="mt-1.5 relative h-48 w-full max-w-sm overflow-hidden rounded-lg border border-border cursor-pointer group/comment-image hover:brightness-80"
              onClick={() => setIsLightboxOpen(true)}
            >
              <Image
                src={image}
                alt="comment image"
                width={670}
                height={380}
                className="object-cover"
              />
            </div>
            <ImageLightbox
              images={image}
              open={isLightboxOpen}
              onClose={() => setIsLightboxOpen(false)}
            />
          </>
        )}

        <CommentActions
          createdAt={createdAt}
          likesCount={likes.length}
          isLiked={isLiked}
          onLike={handleLike}
          onReply={handleReplyClick}
          hideActions={hideActions}
          hideReplyButton={!!parentComment}
        />

        {!parentComment && !hideReplies && !hideActions && (
          <CommentReplies
            postId={postId}
            commentId={_id}
            commentCreatorName={commentCreator.name}
            initialRepliesCount={repliesCount || 0}
            forceShowInput={isInputOpen}
            onInputClose={() => setIsInputOpen(false)}
          />
        )}
      </div>

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={handleDelete}
        isPending={isDeleting}
        title={t("options.delete_comment")}
        description={t("options.delete_comment_confirm")}
        cancelText={t("options.cancel")}
        confirmText={t("options.confirm_delete")}
      />
    </div>
  );
}
