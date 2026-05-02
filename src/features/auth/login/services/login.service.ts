import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";
import { AuthResponse } from "../../shared";
import { LoginSchema } from "../schemas";

export const loginService = async (
  dataBody: LoginSchema,
): Promise<AuthResponse> => {
  const data = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`,
    {
      method: "POST",
      body: JSON.stringify(dataBody),
    },
  );

  return data;
};
