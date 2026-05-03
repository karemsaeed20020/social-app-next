import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ChangePasswordInput } from "../schemas";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (data: Omit<ChangePasswordInput, "confirmPassword">) => {
      return clientApiFetch(
        `${API_BASE_URL}${API_ENDPOINTS.AUTH.CHANGE_PASSWORD}`,
        {
          method: "PATCH",
          body: JSON.stringify(data),
        },
      );
    },
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to change password");
    },
  });
};
