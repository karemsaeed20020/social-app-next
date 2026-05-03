import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";

export const deleteCommentService = async (
  postId: string,
  commentId: string,
) => {
  const data = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.POSTS.DELETE_COMMENT(postId, commentId)}`,
    {
      method: "DELETE",
    },
  );
  return data;
};
