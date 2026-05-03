import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";

export const deletePostService = async (postId: string) => {
  const data = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.POSTS.DELETE_POST(postId)}`,
    {
      method: "DELETE",
    },
  );

  return data;
};
