import { AuthLayout, LoginForm, WhyJoinUsSection } from "@/features";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.auth.login");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LoginPage() {
  const t = await getTranslations("pages.auth.login.why_join_us");

  return (
    <AuthLayout
      left={
        <WhyJoinUsSection
          title={t("title_login")}
          description={t("description_login")}
          titleGradient={t("title_gradient_login")}
        />
      }
      right={<LoginForm />}
    />
  );
}
