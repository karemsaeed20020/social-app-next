import { SinglePost } from "@/features";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.posts");
  return {
    title: `${t("title")}`,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{
    postId: string;
  }>;
}) {
  const resolvedParams = await params;
  return <SinglePost postId={resolvedParams.postId} />;
}
