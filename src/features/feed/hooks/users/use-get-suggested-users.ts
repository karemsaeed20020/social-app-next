"use client";

import { useQuery } from "@tanstack/react-query";
import { getSuggestedUsersService } from "../../services";

interface UseGetSuggestedUsersOptions {
  limit?: number;
}

export function useGetSuggestedUsers({
  limit = 20,
}: UseGetSuggestedUsersOptions = {}) {
  return useQuery({
    queryKey: ["users", "suggested", limit],
    queryFn: () => getSuggestedUsersService({ limit }),
    staleTime: 1000 * 60 * 5,
  });
}
