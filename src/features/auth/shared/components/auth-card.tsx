import { Link, ROUTES } from "@/core";
import { Card, Tabs, TabsList, TabsTrigger } from "@/shared";
import { useTranslations } from "next-intl";
import { PropsWithChildren } from "react";

interface AuthCardProps {
  activeTab: "login" | "signup";
}
export function AuthCard({
  activeTab,
  children,
}: PropsWithChildren<AuthCardProps>) {
  const t = useTranslations();

  return (
    <Card className="px-6">
      <Tabs value={activeTab}>
        <TabsList className="size-full">
          <Link className="size-full" href={ROUTES.LOGIN}>
            <TabsTrigger className="size-full" value="login">
              {t("pages.auth.login.title")}
            </TabsTrigger>
          </Link>
          <Link className="size-full" href={ROUTES.SIGNUP}>
            <TabsTrigger className="size-full" value="signup">
              {t("pages.auth.signup.title")}
            </TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">
          {t(`pages.auth.${activeTab}.title`)}
        </h2>
        <p className="text-sm font-medium text-muted-foreground">
          {t(`pages.auth.${activeTab}.subtitle`)}
        </p>
      </div>

      {children}
    </Card>
  );
}
