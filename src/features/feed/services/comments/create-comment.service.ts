import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";

export const createCommentService = async (
  postId: string,
  content: string,
  image?: File,
) => {
  const body = new FormData();
  body.append("content", content);
  if (image) {
    body.append("image", image);
  }

  const data = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.POSTS.CREATE_COMMENT(postId)}`,
    {
      method: "POST",
      body,
    },
  );
  return data;
};
