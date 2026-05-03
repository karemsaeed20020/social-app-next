import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";

export const getUserPostsService = async ({
  userId,
  page,
}: {
  userId: string;
  page: number;
}) => {
  const data = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.USERS.GET_USER_POSTS(userId, page, 20)}`,
  );

  return data;
};
