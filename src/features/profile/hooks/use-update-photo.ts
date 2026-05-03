import { getUserData } from "@/core";
import { options } from "@/features/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { updatePhotoService } from "../services";

export const useUpdatePhoto = () => {
  const queryClient = useQueryClient();
  const { user } = getUserData();

  return useMutation({
    mutationFn: (file: File) => updatePhotoService(file),
    onSuccess: (data) => {
      toast.success(data.message);

      const updatedUser = { ...user, photo: data.data?.photo || data.data };
      Cookies.set("user", JSON.stringify(updatedUser), options);

      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["profile"] }),
        queryClient.invalidateQueries({ queryKey: ["user-data"] }),
        queryClient.invalidateQueries({ queryKey: ["posts", "feed"] }),
      ]);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
