"use client";

import { Card } from "@/shared";
import { useState } from "react";
import { useEditPost, useLikePost } from "../../hooks";
import { Post } from "../../models";
import { CardActions, CardContent, CardHeader, CardStats } from "./card";
import { PostComments } from "./post-comments";
import { ShareDialog } from "./share-dialog";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const {
    _id,
    id,
    user: postUser,
    createdAt,
    privacy,
    body,
    image,
    bookmarked,
    likes,
    likesCount: initialLikesCount,
    sharesCount,
    commentsCount,
    topComment,
    isShare,
    sharedPost,
  } = post;

  const postId = _id || id;

  const { handleLike, liked, likesCount } = useLikePost({
    initialLikes: likes,
    initialLikesCount: initialLikesCount,
    postId,
  });
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(body || "");

  const { mutate: editPost, isPending: isSavingEdit } = useEditPost();

  const handleShare = () => {
    setIsShareDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editValue.trim() || editValue === body) {
      setIsEditing(false);
      return;
    }

    editPost(
      { postId, body: editValue },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      },
    );
  };

  const handleCancelEdit = () => {
    setEditValue(body || "");
    setIsEditing(false);
  };

  return (
    <Card className="overflow-visible py-0 gap-0 transition-all hover:border-primary/30">
      <CardHeader
        postId={postId}
        postUser={postUser}
        createdAt={createdAt}
        privacy={privacy}
        initialBookmarked={bookmarked ?? false}
        onEdit={() => setIsEditing(true)}
      />

      <CardContent
        body={body}
        image={image}
        isEditing={isEditing}
        editValue={editValue}
        onEditChange={setEditValue}
        onEditSave={handleSaveEdit}
        onEditCancel={handleCancelEdit}
        isSavingEdit={isSavingEdit}
        isShare={isShare}
        sharedPost={sharedPost}
      />

      <CardStats
        postId={postId}
        likesCount={likesCount}
        commentsCount={commentsCount}
        sharesCount={sharesCount}
      />

      <CardActions
        liked={liked}
        onLike={handleLike}
        onComment={() => setIsCommentBoxOpen(true)}
        onShare={handleShare}
      />

      <PostComments
        postId={postId}
        topComment={topComment}
        commentsCount={commentsCount}
        isCommentBoxOpen={isCommentBoxOpen}
      />

      <ShareDialog
        isOpen={isShareDialogOpen}
        onClose={() => setIsShareDialogOpen(false)}
        post={post}
      />
    </Card>
  );
}
