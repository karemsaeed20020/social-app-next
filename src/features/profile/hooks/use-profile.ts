import { useQuery } from "@tanstack/react-query";
import { getProfileService } from "../services";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfileService(),
    staleTime: 1000 * 60 * 5,
  });
};
