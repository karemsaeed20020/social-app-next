import {
  UserProfileHeader,
  UserProfileInfo,
  UserProfileTabs,
} from "@/features";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.profile");
  return {
    title: t("title"),
  };
}

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col gap-6 overflow-x-hidden">
      <div className="flex flex-col gap-4">
        <UserProfileHeader userId={id} />

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4">
            <UserProfileInfo userId={id} />
            <UserProfileTabs userId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
