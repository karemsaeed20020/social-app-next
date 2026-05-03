import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";

export const followUserService = async (userId: string) => {
  const data = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.USERS.FOLLOW_USER(userId)}`,
    {
      method: "PUT",
    },
  );

  return data;
};
