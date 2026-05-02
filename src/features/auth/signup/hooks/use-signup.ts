import { ROUTES, useRouter } from "@/core";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { SignupSchema } from "../schemas";
import { signupService } from "../services";

export function useSignup() {
  const { replace } = useRouter();

  return useMutation({
    mutationFn: (data: SignupSchema) => signupService(data),
    onSuccess: (data) => {
      replace(ROUTES.LOGIN);
      toast.success(data.message);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
