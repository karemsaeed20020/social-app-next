import { PostCreator, PostList } from "@/features";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.feed");
  return {
    title: t("title"),
    description: t("description"),
  };
}
export default function FeedPage() {
  return (
    <div className="flex flex-col gap-4">
      <PostCreator />
      <PostList />
    </div>
  );
}
