"use client";

import { useQuery } from "@tanstack/react-query";
import { searchUsersService } from "../../services";

interface UseSearchUsersOptions {
  q: string;
  page?: number;
  limit?: number;
  enabled?: boolean;
}

export function useSearchUsers({
  q,
  page = 1,
  limit = 20,
  enabled = true,
}: UseSearchUsersOptions) {
  return useQuery({
    queryKey: ["users", "search", q, page, limit],
    queryFn: () => searchUsersService({ q, page, limit }),
    enabled: enabled && q.length > 0,
    staleTime: 1000 * 60 * 2,
  });
}
