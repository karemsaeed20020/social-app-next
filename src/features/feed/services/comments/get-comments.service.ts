import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";

export const getCommentsService = async (
  postId: string,
  page = 1,
  limit = 10,
) => {
  const data = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.POSTS.GET_COMMENTS(postId, page, limit)}`,
  );
  return data;
};
