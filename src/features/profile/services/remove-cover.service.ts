import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";

export const removeCoverService = async () => {
  const data = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.AUTH.DELETE_COVER}`,
    {
      method: "DELETE",
    },
  );

  return data;
};
