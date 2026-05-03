import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";

export const updateCommentService = async (
  postId: string,
  commentId: string,
  content: string,
) => {
  const data = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.POSTS.UPDATE_COMMENT(postId, commentId)}`,
    {
      method: "PUT",
      body: JSON.stringify({ content }),
    },
  );
  return data;
};
