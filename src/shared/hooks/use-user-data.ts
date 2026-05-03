"use client";

import { getUserData } from "@/core";
import { useQuery } from "@tanstack/react-query";

export const useUserData = () => {
  const { data } = useQuery({
    queryKey: ["user-data"],
    queryFn: () => getUserData(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return {
    token: data?.token ?? null,
    user: data?.user ?? null,
    isLoading: !data,
  };
};
