import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";

export const getPostService = async (postId: string) => {
  const data = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.POSTS.GET_SINGLE_POST(postId)}`,
  );

  return data;
};
