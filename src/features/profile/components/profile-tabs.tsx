"use client";

import { PostList, useGetPosts } from "@/features";
import {
  ProfileTabs as ProfileTabsView,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared";
import { Bookmark, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useProfile } from "../hooks";

export function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("my_posts");
  const { data: profileData, isLoading: isProfileLoading } = useProfile();

  const { data: myPostsData } = useGetPosts("my_posts");
  const { data: savedPostsData } = useGetPosts("saved");

  const t = useTranslations("pages.profile");

  if (isProfileLoading) {
    return <Skeleton className="h-96 w-full rounded-lg" />;
  }

  const user = profileData?.data.user;
  const myPostsCount = myPostsData?.total ?? 0;
  const savedPostsCount = savedPostsData?.total ?? user?.bookmarksCount ?? 0;

  if (!user) return null;

  return (
    <Tabs
      defaultValue="my_posts"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <ProfileTabsView
        title={t("content_feed")}
        tabsList={
          <TabsList className="bg-muted/30 p-1.5 rounded-lg border border-white/5">
            <TabsTrigger
              value="my_posts"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg flex gap-2 px-6 py-2.5 rounded-lg transition-all duration-300 font-bold text-sm"
            >
              <FileText className="size-4" />
              {t("my_posts")}
              <span className="ml-1 opacity-60 text-xs font-black">
                {myPostsCount}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="saved"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg flex gap-2 px-6 py-2.5 rounded-lg transition-all duration-300 font-bold text-sm"
            >
              <Bookmark className="size-4" />
              {t("bookmarks")}
              <span className="ml-1 opacity-60 text-xs font-black">
                {savedPostsCount}
              </span>
            </TabsTrigger>
          </TabsList>
        }
      >
        <TabsContent
          value="my_posts"
          className="mt-0 focus-visible:outline-hidden"
        >
          <PostList filter="my_posts" emptyMessage={t("no_posts")} />
        </TabsContent>
        <TabsContent
          value="saved"
          className="mt-0 focus-visible:outline-hidden"
        >
          <PostList filter="saved" emptyMessage={t("no_saved")} />
        </TabsContent>
      </ProfileTabsView>
    </Tabs>
  );
}
