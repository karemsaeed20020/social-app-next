"use client";

import { cn, timeAgo } from "@/core";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@/shared";
import { Check, Heart, MessageCircle, Share2, UserPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useReadNotification } from "../hooks";
import { Notification } from "../models";

interface NotificationItemProps {
  notification: Notification;
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const { mutate: markAsRead, isPending } = useReadNotification();
  const t = useTranslations("pages.notifications");

  const notificationConfig: Record<
    string,
    { icon: React.ReactNode; text: string }
  > = {
    like_post: {
      icon: <Heart className="size-4 fill-primary text-primary" />,
      text: t("types.like_post"),
    },
    comment_post: {
      icon: <MessageCircle className="size-4 text-primary" />,
      text: t("types.comment_post"),
    },
    follow_user: {
      icon: <UserPlus className="size-4 text-primary" />,
      text: t("types.follow_user"),
    },
    default: {
      icon: <Share2 className="size-4 text-primary" />,
      text: t("types.share_post"),
    },
  };

  const { icon, text } =
    notificationConfig[notification.type] ?? notificationConfig.default;

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-muted/40 border-b last:border-0",
        !notification.isRead && "bg-primary/5",
      )}
    >
      <div className="flex items-center gap-4">
        <Avatar className="h-10 w-10 shrink-0 ring-2 ring-border">
          <AvatarImage
            src={notification.actor?.photo ?? "/default-avatar.png"}
            alt={notification.actor?.name ?? t("user")}
          />
          <AvatarFallback>{notification.actor?.name?.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-1 min-w-0">
          <p className="text-sm leading-snug flex-wrap flex gap-1">
            <span className="font-semibold">{notification.actor?.name}</span>{" "}
            <span className="text-muted-foreground truncate">{text}</span>
          </p>

          <div className="flex items-center gap-2">
            {icon}

            {notification.isRead ? (
              <div className="flex items-center gap-1 text-xs text-green-600">
                <Check className="size-3" />
                <span>{t("read")}</span>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="py-0 px-2 "
                onClick={() => markAsRead(notification._id)}
                disabled={isPending}
              >
                {t("mark_as_read")}
              </Button>
            )}
          </div>
        </div>
      </div>

      <span className="text-xs text-muted-foreground whitespace-nowrap">
        {timeAgo(notification.createdAt)}
      </span>
    </div>
  );
}
