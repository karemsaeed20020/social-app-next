import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";
import { ProfileResponse } from "../models";

export const getProfileService = async (): Promise<ProfileResponse> => {
  const data = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.USERS.GET_PROFILE()}`,
  );

  return data;
};
