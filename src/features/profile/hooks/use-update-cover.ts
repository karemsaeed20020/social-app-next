import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCoverService } from "../services";

export const useUpdateCover = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => updateCoverService(file),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success(data.message);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
