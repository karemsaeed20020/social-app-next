import { ProfileHeader, ProfileInfo, ProfileTabs } from "@/features";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.profile");
  return {
    title: t("title"),
  };
}

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-4">
      <ProfileHeader />

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4">
          <ProfileInfo />
          <ProfileTabs />
        </div>
      </div>
    </div>
  );
}
