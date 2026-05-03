"use client";

import {
  NotificationList,
  useGetUnreadCount,
  useReadAllNotifications,
} from "@/features";
import {
  Button,
  Card,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared";
import { Bell, CheckCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NotificationsPage() {
  const t = useTranslations("pages.notifications");
  const { data: unreadData } = useGetUnreadCount();
  const { mutate: markAllAsRead, isPending } = useReadAllNotifications();

  const unreadCount = unreadData?.data?.unreadCount ?? 0;
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-2">
          <Bell className="size-10 text-primary bg-primary/10 p-2 rounded-lg" />
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
            <p className="text-sm text-muted-foreground">{t("description")}</p>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => markAllAsRead()}
          disabled={isPending || unreadCount === 0}
        >
          <CheckCheck />
          {t("mark_as_read")}
        </Button>
      </div>

      <Card className="overflow-hidden shadow-sm py-0">
        <Tabs defaultValue="all">
          <div className="flex items-center border-b px-4 py-2">
            <TabsList className="w-full">
              <TabsTrigger value="all">{t("all")}</TabsTrigger>
              <TabsTrigger value="unread">
                {t("unread")}
                <span className="ml-1 opacity-60 text-xs font-black">
                  {unreadCount}
                </span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            <NotificationList unreadOnly={false} />
          </TabsContent>
          <TabsContent value="unread">
            <NotificationList unreadOnly={true} />
          </TabsContent>
        </Tabs>
      </Card>
    </>
  );
}
