import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";

export const getRepliesService = async (
  postId: string,
  commentId: string,
  page = 1,
  limit = 10,
) => {
  const data = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.POSTS.GET_REPLIES(postId, commentId, page, limit)}`,
  );
  return data;
};
