"use client";

import { Button, ProfileHeader as ProfileView } from "@/shared";
import { Loader2, UserMinus, UserPlus } from "lucide-react";
import { useFollowUser } from "../../feed";
import { useUserProfile } from "../hooks";
import { CoverSection } from "./cover-section";
import { UserProfileStats } from "./user-profile-stats";

export function UserProfileHeader({ userId }: { userId: string }) {
  const { data: profileData, isLoading, refetch } = useUserProfile(userId);
  const { mutate: followUser, isPending: isFollowingAction } = useFollowUser();

  const user = profileData?.data.user;

  if (!user && !isLoading) return null;

  return (
    <ProfileView
      user={{
        name: user?.name ?? "",
        username: user?.username,
        photo: user?.photo,
        cover: user?.cover,
      }}
      cover={<CoverSection coverUrl={user?.cover} readOnly />}
      isLoading={isLoading}
      isOwnProfile={false}
      actions={
        <Button
          variant={profileData?.data?.isFollowing ? "outline" : "default"}
          size="sm"
          className="mt-2"
          disabled={isFollowingAction}
          onClick={() => {
            followUser(userId, {
              onSuccess: () => refetch(),
            });
          }}
        >
          {isFollowingAction ? (
            <Loader2 className="size-4 animate-spin" />
          ) : profileData?.data?.isFollowing ? (
            <>
              <UserMinus className="size-4 mr-2" /> Unfollow
            </>
          ) : (
            <>
              <UserPlus className="size-4 mr-2" /> Follow
            </>
          )}
        </Button>
      }
      stats={<UserProfileStats userId={userId} />}
    />
  );
}
