import { useQuery } from "@tanstack/react-query";
import { getUserProfileService } from "../services";

export const useUserProfile = (userId: string) => {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getUserProfileService(userId),
    staleTime: 1000 * 60 * 5,
  });
};
