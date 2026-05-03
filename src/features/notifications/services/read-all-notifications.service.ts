import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";

export const readAllNotificationsService = async () => {
  const data = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.NOTIFICATIONS.READ_ALL_NOTIFICATIONS}`,
    {
      method: "PATCH",
    },
  );

  return data;
};
