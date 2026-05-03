import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";

export const getUnreadCountService = async () => {
  const data = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.NOTIFICATIONS.GET_UNREAD_COUNT}`,
  );

  return data;
};
