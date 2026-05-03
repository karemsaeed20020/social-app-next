"use client";

import { useGetUserPosts } from "@/features";
import { ProfileStats as ProfileStatsView } from "@/shared";
import { useTranslations } from "next-intl";
import { useUserProfile } from "../hooks";

export function UserProfileStats({ userId }: { userId: string }) {
  const { data: profileData } = useUserProfile(userId);
  const { data: userPostsData } = useGetUserPosts(userId);
  const t = useTranslations("pages.profile");

  const user = profileData?.data.user;
  const userPostsCount = userPostsData?.total ?? 0;

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
      label: t("posts"),
      count: userPostsCount,
    },
  ];

  return <ProfileStatsView stats={stats} />;
}
