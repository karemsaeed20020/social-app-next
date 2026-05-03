import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";
import { ProfileResponse } from "../models";

export const getUserProfileService = async (
  userId: string,
): Promise<ProfileResponse> => {
  const data = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.USERS.GET_USER_PROFILE(userId)}`,
  );

  return data;
};
