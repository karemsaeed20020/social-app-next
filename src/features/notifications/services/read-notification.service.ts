import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";

export const readNotificationService = async (notificationId: string) => {
  const data = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.NOTIFICATIONS.READ_NOTIFICATION(notificationId)}`,
    {
      method: "PATCH",
    },
  );

  return data;
};
