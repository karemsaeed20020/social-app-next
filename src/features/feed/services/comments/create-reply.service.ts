import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";

export const createReplyService = async (
  postId: string,
  commentId: string,
  content: string,
  image?: File,
) => {
  const body = new FormData();
  body.append("content", content);
  if (image) {
    body.append("image", image);
  }

  const data = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.POSTS.CREATE_REPLY(postId, commentId)}`,
    {
      method: "POST",
      body,
    },
  );
  return data;
};
