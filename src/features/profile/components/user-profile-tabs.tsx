"use client";

import { useGetUserPosts, UserPostList } from "@/features";
import { ProfileTabs as ProfileTabsView, Skeleton } from "@/shared";
import { FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import { useUserProfile } from "../hooks";

export function UserProfileTabs({ userId }: { userId: string }) {
  const t = useTranslations("pages.profile");
  const { data: profileData, isLoading: isProfileLoading } =
    useUserProfile(userId);
  const { data: userPostsData } = useGetUserPosts(userId);

  if (isProfileLoading) {
    return <Skeleton className="h-96 w-full rounded-lg" />;
  }

  const user = profileData?.data.user;
  const userPostsCount = userPostsData?.total ?? 0;

  if (!user) return null;

  return (
    <ProfileTabsView
      title={t("content_feed")}
      tabsList={
        <div className="bg-muted/30 py-2 px-6 rounded-lg border border-white/5 flex items-center gap-2">
          <FileText className="size-4" />
          {t("posts")}
          <span className="opacity-60 text-xs font-black">
            {userPostsCount}
          </span>
        </div>
      }
    >
      <UserPostList userId={userId} emptyMessage={t("no_posts")} />
    </ProfileTabsView>
  );
}
