"use client";

import { ProfileHeader as ProfileView } from "@/shared";
import { useRef } from "react";
import { useProfile, useUpdatePhoto } from "../hooks";
import { CoverSection } from "./cover-section";
import { ProfileStats } from "./profile-stats";

export function ProfileHeader() {
  const { data: profileData, isLoading } = useProfile();
  const { mutate: updatePhoto, isPending: isUpdatingPhoto } = useUpdatePhoto();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updatePhoto(file);
    }
  };

  const user = profileData?.data.user;

  if (!user && !isLoading) return null;

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".jpg,.jpeg,.webp"
        onChange={handleFileChange}
      />
      <ProfileView
        user={{
          name: user?.name ?? "",
          username: user?.username,
          photo: user?.photo,
          cover: user?.cover,
        }}
        cover={<CoverSection coverUrl={user?.cover} readOnly={!user} />}
        isLoading={isLoading}
        isOwnProfile
        isUpdatingPhoto={isUpdatingPhoto}
        onPhotoClick={handlePhotoClick}
        stats={<ProfileStats />}
      />
    </>
  );
}
