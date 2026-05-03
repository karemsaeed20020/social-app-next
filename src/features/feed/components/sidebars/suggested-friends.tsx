"use client";

import { Link, ROUTES } from "@/core";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  StateScreen,
} from "@/shared";
import { Ghost, Loader2, UserPlus, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm, useWatch } from "react-hook-form";
import {
  useFollowUser,
  useGetSuggestedUsers,
  useSearchUsers,
} from "../../hooks";
import { SuggestedFriend } from "../../models";
import { UsersSearchInput } from "../users/users-search-input";
import { SuggestedCardSkeleton } from "./suggested-card-skeleton";
import { SuggestedFriendCard } from "./suggested-friend-card";

export function SuggestedFriends() {
  const t = useTranslations("pages.feed.sidebar");

  const { control, setValue } = useForm<{ search: string }>({
    defaultValues: { search: "" },
  });
  const searchValue = useWatch({
    control,
    name: "search",
  });

  const { data: usersData, isLoading: isSuggestionsLoading } =
    useGetSuggestedUsers({
      limit: 5,
    });
  const { data: searchData, isLoading: isSearchLoading } = useSearchUsers({
    q: searchValue,
    enabled: searchValue.length > 0,
    limit: 5,
  });
  const {
    mutate: follow,
    isPending: isFollowing,
    variables: targetUserId,
  } = useFollowUser();

  const isSearching = searchValue.length > 0;
  const isLoading = isSearchLoading || isSuggestionsLoading;

  const users: SuggestedFriend[] =
    (isSearching ? searchData?.users : usersData?.suggestions) ?? [];

  return (
    <div className="rounded-lg border border-border bg-card shadow-sm ">
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <div className="flex items-center gap-2">
          <Users className="size-4 text-primary" />
          <p className="text-sm font-bold text-card-foreground xl:text-base">
            {isSearching ? t("search_results") : t("suggested_friends")}
          </p>
        </div>
        <Button variant="ghost" size="sm" className="sm:hidden" asChild>
          <Link href={ROUTES.SUGGESTED_FRIENDS}>{t("view_more")}</Link>
        </Button>
      </div>

      <UsersSearchInput
        value={searchValue}
        onChange={(val) => setValue("search", val)}
        className="hidden xl:block px-4 mb-4"
      />

      {isLoading ? (
        <SuggestedCardSkeleton isSidebar />
      ) : users?.length === 0 ? (
        <StateScreen
          size="compact"
          icon={Ghost}
          msg={isSearching ? t("no_results") : t("no_suggestions")}
          className="mx-4 mb-4"
        />
      ) : (
        <>
          <div className="flex items-center gap-3 px-4 pb-3 pt-0.5 xl:hidden overflow-x-scroll">
            {users.map((friend) => (
              <div
                key={friend._id}
                className="flex flex-col items-center gap-2 shrink-0"
              >
                <div className="relative">
                  <Avatar className="h-8 w-8 border border-border shadow-sm">
                    <AvatarImage src={friend.photo} alt={friend.name} />
                    <AvatarFallback className="text-[10px]">
                      {friend.name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    onClick={() => follow(friend._id)}
                    disabled={isFollowing && targetUserId === friend._id}
                    className="absolute -bottom-1 -right-1"
                    size="icon-xs"
                    variant="secondary"
                  >
                    {isFollowing && targetUserId === friend._id ? (
                      <Loader2 className="w-2 h-2 animate-spin" />
                    ) : (
                      <UserPlus className="w-2 h-2" />
                    )}
                  </Button>
                </div>
                <p className="max-w-15 truncate text-center text-xs font-semibold text-foreground">
                  {friend.name}
                </p>
              </div>
            ))}
          </div>

          <div className="hidden xl:block px-4 space-y-2 mb-3">
            {users.map((friend) => (
              <SuggestedFriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        </>
      )}

      <div className="px-4 pb-3 hidden xl:flex">
        <Button variant="outline" className="w-full" size="sm" asChild>
          <Link href={ROUTES.SUGGESTED_FRIENDS}>{t("view_more")}</Link>
        </Button>
      </div>
    </div>
  );
}
