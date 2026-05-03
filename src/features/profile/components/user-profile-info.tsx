"use client";

import { formatDate, timeAgo } from "@/core";
import {
  ProfileInfoItem,
  ProfileInfoSkeleton,
  ProfileInfo as ProfileInfoView,
} from "@/shared";
import {
  Cake,
  Calendar,
  Mail as LucideMail,
  User as LucideUser,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useUserProfile } from "../hooks";

export function UserProfileInfo({ userId }: { userId: string }) {
  const { data: profileData, isLoading: isProfileLoading } =
    useUserProfile(userId);
  const t = useTranslations("pages.profile");

  if (isProfileLoading) {
    return <ProfileInfoSkeleton hasExtraCards={false} />;
  }

  const user = profileData?.data.user;

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
              value={t(user.gender === "male" ? "male" : "female")}
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
    />
  );
}
