"use client";

import { usePathname, useRouter } from "@/core";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Locale,
  Skeleton,
} from "@/shared";
import { Check, Languages, Moon, Settings, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useSyncExternalStore } from "react";

export function SettingsCard() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const t = useTranslations("pages.feed.sidebar");
  const { setTheme, theme, resolvedTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams();

  const toggleLanguage = (newLocale: Locale) => {
    router.push(pathname, { locale: newLocale });
  };

  if (!mounted) {
    return (
      <Card className="rounded-lg border border-border bg-card shadow-sm flex flex-col p-4 gap-3">
        <Skeleton className="h-32" />
      </Card>
    );
  }

  return (
    <Card className="rounded-lg border border-border bg-card shadow-sm flex flex-col p-4 gap-3">
      <CardHeader className="space-y-2 px-0 py-0 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <Settings className="size-4" />
          <CardTitle className="text-base font-bold">{t("settings")}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            {t("theme")}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 min-w-25 justify-between"
              >
                <div className="flex items-center gap-2">
                  {resolvedTheme === "dark" ? (
                    <Moon className="w-3.5 h-3.5" />
                  ) : (
                    <Sun className="w-3.5 h-3.5" />
                  )}
                  <span className="capitalize text-xs">
                    {theme === "system"
                      ? t("system")
                      : theme === "dark"
                        ? t("dark")
                        : t("light")}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                className="justify-between"
              >
                <div className="flex items-center">
                  <Sun className="mr-2 h-3.5 w-3.5" />
                  <span className="text-xs">{t("light")}</span>
                </div>
                {theme === "light" && (
                  <Check className="h-3.5 w-3.5 text-primary" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                className="justify-between"
              >
                <div className="flex items-center">
                  <Moon className="mr-2 h-3.5 w-3.5" />
                  <span className="text-xs">{t("dark")}</span>
                </div>
                {theme === "dark" && (
                  <Check className="h-3.5 w-3.5 text-primary" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("system")}
                className="justify-between"
              >
                <div className="flex items-center">
                  <Settings className="mr-2 h-3.5 w-3.5" />
                  <span className="text-xs">{t("system")}</span>
                </div>
                {theme === "system" && (
                  <Check className="h-3.5 w-3.5 text-primary" />
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            {t("language")}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 min-w-25 justify-between"
              >
                <div className="flex items-center gap-2">
                  <Languages className="w-3.5 h-3.5" />
                  <span className="text-xs uppercase">{locale}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem
                onClick={() => toggleLanguage("en")}
                className="justify-between"
              >
                <span>{t("english")}</span>
                {locale === "en" && (
                  <Check className="h-3.5 w-3.5 text-primary" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => toggleLanguage("ar")}
                className="justify-between"
              >
                <span>{t("arabic")}</span>
                {locale === "ar" && (
                  <Check className="h-3.5 w-3.5 text-primary" />
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
