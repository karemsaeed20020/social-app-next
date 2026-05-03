import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";
import { PrivacyType } from "@/shared";

interface GetPostsServiceParams {
  only?: PrivacyType;
  limit?: number;
  page?: number;
}

export const getPostsService = async ({
  only = "following",
  limit = 10,
  page = 1,
}: GetPostsServiceParams = {}) => {
  const data = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.POSTS.GET_POSTS(only, limit, page)}`,
  );

  return data;
};
