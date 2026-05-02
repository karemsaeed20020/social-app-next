import { AuthLayout, SignupForm, WhyJoinUsSection } from "@/features";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.auth.signup");
  return {
    title: t("title"),
    description: t("description"),
  };
}
export default async function SignupPage() {
  const t = await getTranslations("pages.auth.signup.why_join_us");

  return (
    <AuthLayout
      left={
        <WhyJoinUsSection
          title={t("title_signup")}
          description={t("description_signup")}
          titleGradient={t("title_gradient_signup")}
        />
      }
      right={<SignupForm />}
    />
  );
}
