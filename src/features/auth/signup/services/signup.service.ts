import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";
import { AuthResponse } from "../../shared";
import { SignupSchema } from "../schemas";

export const signupService = async (
  dataBody: SignupSchema,
): Promise<AuthResponse> => {
  const data = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.AUTH.SIGNUP}`,
    {
      method: "POST",
      body: JSON.stringify(dataBody),
    },
  );

  return data;
};
