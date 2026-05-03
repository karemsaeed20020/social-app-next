"use client";

import { ProfileStats as ProfileStatsView } from "@/shared";
import { useTranslations } from "next-intl";
import { useProfile } from "../hooks";

export function ProfileStats() {
  const { data: profileData } = useProfile();
  const t = useTranslations("pages.profile");

  const user = profileData?.data.user;

  const stats = [
    {
      label: t("followers"),
      count: user?.followersCount ?? 0,
    },
    {
      label: t("following"),
      count: user?.followingCount ?? 0,
    },
    {
      label: t("bookmarks"),
      count: user?.bookmarksCount ?? 0,
    },
  ];

  return <ProfileStatsView stats={stats} />;
}
