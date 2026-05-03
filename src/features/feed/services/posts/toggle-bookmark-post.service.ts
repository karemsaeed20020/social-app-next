import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";

export const toggleBookmarkService = async (postId: string) => {
  const data = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.POSTS.TOGGLE_BOOKMARK_POST(postId)}`,
    {
      method: "PUT",
    },
  );

  return data;
};
