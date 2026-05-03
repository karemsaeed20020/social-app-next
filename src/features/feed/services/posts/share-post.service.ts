import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";

interface SharePostParams {
  postId: string;
  body?: string;
}

export const sharePostService = async ({ postId, body }: SharePostParams) => {
  const data = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.POSTS.SHARE_POST(postId)}`,
    {
      method: "POST",
      body: JSON.stringify({ body }),
    },
  );

  return data;
};
