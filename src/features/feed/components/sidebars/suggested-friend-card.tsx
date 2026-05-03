"use client";

import { Link, ROUTES } from "@/core";
import { Avatar, AvatarFallback, AvatarImage, Badge, Button } from "@/shared";
import { Loader2, UserPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useFollowUser } from "../../hooks";
import { SuggestedFriend } from "../../models";

interface SuggestedFriendCardProps {
  friend: SuggestedFriend;
}

export function SuggestedFriendCard({ friend }: SuggestedFriendCardProps) {
  const t = useTranslations("pages.feed.sidebar");
  const {
    mutate: follow,
    isPending: isFollowing,
    variables: targetUserId,
  } = useFollowUser();

  const isCurrentFollowing = isFollowing && targetUserId === friend._id;

  return (
    <div className="rounded-lg border border-border bg-background p-3 transition hover:border-primary/30 h-full flex flex-col justify-between">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar className="h-10 w-10 border border-border shadow-sm">
            <AvatarImage src={friend.photo} alt={friend.name} />
            <AvatarFallback className="text-xs">
              {friend.name?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <Link href={`/${ROUTES.USER}/${friend._id}`}>
              <p className="truncate text-sm font-bold text-foreground hover:underline">
                {friend.name}
              </p>
            </Link>
            {friend.username && (
              <p className="truncate text-xs text-muted-foreground">
                @{friend.username}
              </p>
            )}
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="h-9 shrink-0 px-3"
          onClick={() => follow(friend._id)}
          disabled={isCurrentFollowing}
        >
          {isCurrentFollowing ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <UserPlus className="size-4" />
          )}
          <span className="ml-1.5 text-xs font-semibold">{t("follow")}</span>
        </Button>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {friend.followersCount > 0 && (
          <Badge variant="secondary" className="px-2 py-0 h-5 text-[10px]">
            {t("followers", { count: friend.followersCount })}
          </Badge>
        )}
        {friend.mutualFollowersCount > 0 && (
          <Badge variant="default" className="px-2 py-0 h-5 text-[10px]">
            {t("mutual", { count: friend.mutualFollowersCount })}
          </Badge>
        )}
      </div>
    </div>
  );
}
