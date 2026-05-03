"use client";

import {
  SuggestedCardSkeleton,
  SuggestedFriend,
  SuggestedFriendCard,
  useGetSuggestedUsers,
  UsersSearchInput,
  useSearchUsers,
} from "@/features";
import { StateScreen } from "@/shared";
import { UserPlus2, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm, useWatch } from "react-hook-form";

export default function SuggestedFriendsPage() {
  const t = useTranslations("pages.feed.sidebar");

  const { control, setValue } = useForm<{ search: string }>({
    defaultValues: { search: "" },
  });
  const searchValue = useWatch({ control, name: "search" });

  const { data: suggestionsData, isLoading: isSuggestionsLoading } =
    useGetSuggestedUsers({ limit: 20 });

  const { data: searchData, isLoading: isSearchLoading } = useSearchUsers({
    q: searchValue,
    limit: 20,
    enabled: searchValue.length > 0,
  });

  const isSearching = searchValue.length > 0;
  const isLoading = isSearching ? isSearchLoading : isSuggestionsLoading;
  const users =
    (isSearching ? searchData?.users : suggestionsData?.suggestions) ?? [];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-2">
          <Users className="size-10 text-primary bg-primary/10 p-2 rounded-lg" />
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight">
              {t("suggested_friends")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isSearching
                ? t("search_description", { value: searchValue })
                : t("suggested_description")}
            </p>
          </div>
        </div>

        <UsersSearchInput
          value={searchValue}
          onChange={(val) => setValue("search", val)}
        />
      </div>

      {isLoading ? (
        <SuggestedCardSkeleton count={20} />
      ) : users.length === 0 ? (
        <StateScreen
          icon={isSearching ? Users : UserPlus2}
          msg={isSearching ? t("no_results") : t("no_suggestions")}
          desc={isSearching ? t("no_results_desc") : t("no_suggestions_desc")}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {users.map((friend: SuggestedFriend) => (
            <SuggestedFriendCard key={friend._id} friend={friend} />
          ))}
        </div>
      )}
    </div>
  );
}
