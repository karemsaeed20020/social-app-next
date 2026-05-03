"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { readNotificationService } from "../services";

export function useReadNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) =>
      readNotificationService(notificationId),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
