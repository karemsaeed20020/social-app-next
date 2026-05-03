import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";

interface CreatePostParams {
  body: string;
  image?: File;
  privacy?: string;
}

export const createPostService = async ({
  body,
  image,
  privacy,
}: CreatePostParams) => {
  const formData = new FormData();
  formData.append("body", body);
  if (image) formData.append("image", image);
  if (privacy) formData.append("privacy", privacy);

  const data = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.POSTS.CREATE_POST()}`,
    {
      method: "POST",
      body: formData,
    },
  );

  return data;
};
