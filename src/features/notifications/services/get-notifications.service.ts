import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";

interface GetNotificationsParams {
  unread?: boolean;
  limit?: number;
  page?: number;
}

export const getNotificationsService = async ({
  unread = false,
  limit = 10,
  page = 1,
}: GetNotificationsParams = {}) => {
  const data = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.NOTIFICATIONS.GET_NOTIFICATIONS(unread, page, limit)}`,
  );

  return data;
};
