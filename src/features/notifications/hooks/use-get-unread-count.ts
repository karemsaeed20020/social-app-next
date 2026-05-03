"use client";
import { useQuery } from "@tanstack/react-query";
import { getUnreadCountService } from "../services";

export function useGetUnreadCount() {
  return useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: getUnreadCountService,
  });
}
