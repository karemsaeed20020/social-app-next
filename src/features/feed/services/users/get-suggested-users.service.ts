import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";

interface GetSuggestedUsersServiceParams {
  limit?: number;
}

export const getSuggestedUsersService = async ({
  limit = 20,
}: GetSuggestedUsersServiceParams = {}) => {
  const data = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.USERS.GET_ALL_USERS(limit)}`,
  );

  return data?.data;
};
