import { StateScreen } from "@/shared";
import { BellOff } from "lucide-react";
import { useTranslations } from "next-intl";

export function NotificationsEmpty() {
  const t = useTranslations("pages.notifications");
  return (
    <StateScreen
      icon={BellOff}
      msg={t("no_notifications")}
      desc={t("your_all_caught_up")}
    />
  );
}
