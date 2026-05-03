import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";

export const toggleLikeCommentService = async (
  postId: string,
  commentId: string,
) => {
  const data = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.POSTS.TOGGLE_LIKE_COMMENT(postId, commentId)}`,
    {
      method: "PUT",
    },
  );
  return data;
};
