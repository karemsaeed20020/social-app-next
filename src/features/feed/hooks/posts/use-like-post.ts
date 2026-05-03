"use client";

import { useUserData } from "@/shared";
import { useEffect, useState } from "react";
import { toggleLikePostService } from "../../services";

interface UseLikePostProps {
  initialLikes: string[];
  initialLikesCount: number;
  postId: string;
}

export function useLikePost({
  initialLikes,
  initialLikesCount,
  postId,
}: UseLikePostProps) {
  const { user } = useUserData();

  const [liked, setLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState(initialLikesCount);

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLiked(initialLikes.includes(user._id));
    }
  }, [user, initialLikes]);

  const handleLike = async () => {
    // Optimistic update
    const newLiked = !liked;
    const newLikesCount = newLiked ? likesCount + 1 : likesCount - 1;

    setLiked(newLiked);
    setLikesCount(newLikesCount);

    await toggleLikePostService(postId).catch(() => {
      setLiked(liked);
      setLikesCount(likesCount);
    });
  };

  return {
    liked,
    likesCount,
    handleLike,
  };
}
