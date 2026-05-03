"use client";

import { InfiniteList, StateScreen } from "@/shared";
import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useGetNotifications } from "../hooks";
import { NotificationItem } from "./notification-item";
import { NotificationSkeleton } from "./notification-skeleton";
import { NotificationsEmpty } from "./notifications-empty";

interface NotificationListProps {
  unreadOnly?: boolean;
}

export function NotificationList({
  unreadOnly = false,
}: NotificationListProps) {
  const t = useTranslations("pages.notifications");
  const queryResult = useGetNotifications(unreadOnly);

  return (
    <InfiniteList
      queryResult={queryResult}
      renderItem={(notification) => (
        <NotificationItem notification={notification} />
      )}
      skeleton={<NotificationSkeleton />}
      emptyComponent={<NotificationsEmpty />}
      endComponent={
        <div className="flex justify-center p-8 bg-card rounded-lg border border-border/50 w-full mt-4">
          <p className="text-muted-foreground font-medium text-sm">
            {t("no_more_notifications")}
          </p>
        </div>
      }
      errorComponent={
        <StateScreen
          icon={AlertCircle}
          msg={t("error")}
          className="border-destructive/40 bg-destructive/5"
        />
      }
      className="flex flex-col"
    />
  );
}
