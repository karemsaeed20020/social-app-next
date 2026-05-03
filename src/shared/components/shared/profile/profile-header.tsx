"use client";

import { Camera, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage, Button, Card } from "../../ui";
import { ImageLightbox } from "../image-lightbox";
import { ProfileHeaderSkeleton } from "./profile-header-skeleton";

interface ProfileHeaderProps {
  user: {
    name: string;
    username?: string;
    photo?: string;
    cover?: string;
  };
  cover?: React.ReactNode;
  isLoading?: boolean;
  isOwnProfile?: boolean;
  isUpdatingPhoto?: boolean;
  onPhotoClick?: () => void;
  actions?: React.ReactNode;
  stats?: React.ReactNode;
}

export function ProfileHeader({
  user,
  cover,
  isLoading,
  isOwnProfile,
  isUpdatingPhoto,
  onPhotoClick,
  actions,
  stats,
}: ProfileHeaderProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (isLoading) {
    return <ProfileHeaderSkeleton />;
  }

  return (
    <div className="w-full">
      {cover}

      <div className="-mt-16 relative z-10 w-full">
        <Card className="p-4 flex flex-col lg:flex-row flex-wrap items-center justify-between gap-6 md:gap-10 border-border/60 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 w-full lg:w-auto">
            {/* Avatar Section */}
            <div className="relative -mt-20">
              <div
                className="rounded-lg bg-card p-1.5 shadow-xl ring-2 ring-border/60 overflow-hidden cursor-pointer transition-transform hover:brightness-80"
                onClick={() => user.photo && setIsLightboxOpen(true)}
              >
                <Avatar className="h-28 w-28 md:h-36 md:w-36 rounded-lg overflow-hidden">
                  <AvatarImage
                    src={user.photo}
                    alt={user.name}
                    className="object-cover rounded-lg"
                  />
                  <AvatarFallback className="text-3xl font-bold bg-muted text-foreground rounded-lg">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>

              {isOwnProfile && (
                <Button
                  onClick={onPhotoClick}
                  disabled={isUpdatingPhoto}
                  className="absolute bottom-1 right-1"
                  variant="secondary"
                  size="sm"
                >
                  {isUpdatingPhoto ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Camera className="size-4" />
                  )}
                </Button>
              )}
            </div>

            {/* Info Section */}
            <div className="flex flex-col items-center lg:items-start gap-2">
              <h1 className="text-xl font-black text-foreground tracking-tight">
                {user.name}
              </h1>
              <p className="text-base md:text-lg font-semibold text-muted-foreground">
                @{user.username || user.name.toLowerCase().replace(/ /g, "")}
              </p>
              {actions}
            </div>
          </div>

          {/* Stats Section */}
          <div className="w-full lg:w-auto mt-2 lg:mt-0 shrink-0 flex-1">
            {stats}
          </div>
        </Card>
      </div>

      {user.photo && (
        <ImageLightbox
          images={user.photo}
          open={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </div>
  );
}
