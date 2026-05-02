import { useRouter } from "@/core";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { saveSession } from "../../shared";
import { LoginSchema } from "../schemas";
import { loginService } from "../services";

export function useLogin() {
  const { replace } = useRouter();

  return useMutation({
    mutationFn: (data: LoginSchema) => loginService(data),
    onSuccess: (data) => {
      if (data?.data?.token && data?.data?.user) {
        saveSession(data?.data?.token, data?.data?.user);
      }
      replace("/");
      toast.success(data.message);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
