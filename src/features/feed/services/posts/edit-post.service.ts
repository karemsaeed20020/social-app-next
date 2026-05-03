import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";

interface EditPostParams {
  postId: string;
  body: string;
}

export const editPostService = async ({ postId, body }: EditPostParams) => {
  const data = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.POSTS.UPDATE_POST(postId)}`,
    {
      method: "PUT",
      body: JSON.stringify({ body }),
    },
  );

  return data;
};
