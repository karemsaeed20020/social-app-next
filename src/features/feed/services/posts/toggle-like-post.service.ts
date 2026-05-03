import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";

export const toggleLikePostService = async (postId: string) => {
  const data = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.POSTS.TOGGLE_LIKE_POST(postId)}`,
    {
      method: "PUT",
    },
  );

  return data;
};
