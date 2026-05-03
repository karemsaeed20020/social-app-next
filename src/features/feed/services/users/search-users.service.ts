import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";

export interface SearchUsersParams {
  q: string;
  page?: number;
  limit?: number;
}

export const searchUsersService = async ({
  q,
  page = 1,
  limit = 20,
}: SearchUsersParams) => {
  const data = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.USERS.SEARCH_USER(q, page, limit)}`,
  );

  return data?.data;
};
