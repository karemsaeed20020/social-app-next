import { ChangePasswordForm, SettingsCard } from "@/features";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.settings");

  return {
    title: t("title"),
  };
}

export default async function SettingsPage() {
  return (
    <>
      <ChangePasswordForm />
      <SettingsCard />
    </>
  );
}
