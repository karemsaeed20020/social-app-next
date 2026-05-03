"use client";

import { formatDate, timeAgo } from "@/core";
import { useGetPosts } from "@/features";
import {
  Card,
  ProfileInfoItem,
  ProfileInfoSkeleton,
  ProfileInfo as ProfileInfoView,
} from "@/shared";
import {
  Bookmark,
  Cake,
  Calendar,
  FileText,
  Mail as LucideMail,
  User as LucideUser,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useProfile } from "../hooks";

export function ProfileInfo() {
  const { data: profileData, isLoading: isProfileLoading } = useProfile();
  const { data: myPostsData } = useGetPosts("my_posts");
  const t = useTranslations("pages.profile");

  if (isProfileLoading) {
    return <ProfileInfoSkeleton />;
  }

  const user = profileData?.data.user;
  const myPostsCount = myPostsData?.total ?? 0;

  if (!user) return null;

  return (
    <ProfileInfoView
      aboutItems={
        <>
          {user.email && (
            <ProfileInfoItem
              icon={LucideMail}
              label={t("email")}
              value={user.email}
            />
          )}

          {user.dateOfBirth && (
            <ProfileInfoItem
              icon={Cake}
              label={t("date_of_birth")}
              value={formatDate(user.dateOfBirth)}
            />
          )}

          {user.gender && (
            <ProfileInfoItem
              icon={LucideUser}
              label={t("gender")}
              value={t(user.gender as never)}
            />
          )}

          {user.createdAt && (
            <ProfileInfoItem
              icon={Calendar}
              label={t("joined")}
              value={timeAgo(user.createdAt)}
            />
          )}
        </>
      }
      extraContent={
        <>
          <Card className="relative overflow-hidden h-full p-4 flex flex-col gap-2">
            <h4 className="relative z-10 text-xs uppercase tracking-widest text-primary font-bold">
              {t("my_posts")}
            </h4>
            <span className="relative z-10 text-4xl font-black text-foreground">
              {myPostsCount}
            </span>
            <FileText className="absolute -bottom-6 -inset-e-4 text-primary/10 size-32 -rotate-12 hidden md:block select-none pointer-events-none" />
          </Card>

          <Card className="relative overflow-hidden h-full p-4 flex flex-col gap-2">
            <h4 className="relative z-10 text-xs uppercase tracking-widest text-primary font-bold">
              {t("saved_posts")}
            </h4>
            <span className="relative z-10 text-4xl font-black text-foreground">
              {user.bookmarksCount ?? 0}
            </span>
            <Bookmark className="absolute -bottom-6 -inset-e-4 text-primary/10 size-32 -rotate-12 hidden md:block select-none pointer-events-none" />
          </Card>
        </>
      }
    />
  );
}
