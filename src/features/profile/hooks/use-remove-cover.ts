import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { removeCoverService } from "../services";

export function useRemoveCover() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeCoverService,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
