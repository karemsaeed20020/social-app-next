"use client";

import { useTranslations } from "next-intl";
import { Card } from "../../ui";

interface ProfileInfoProps {
  aboutItems: React.ReactNode;
  extraContent?: React.ReactNode;
  isLoading?: boolean;
}

export function ProfileInfo({ aboutItems, extraContent }: ProfileInfoProps) {
  const t = useTranslations("pages.profile");

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
      <Card
        className={`${
          extraContent ? "md:col-span-8" : "md:col-span-12"
        } p-4 flex flex-col gap-6`}
      >
        <h4 className="text-xs uppercase tracking-widest text-primary font-bold">
          {t("about")}
        </h4>
        <div className="flex flex-col gap-5">{aboutItems}</div>
      </Card>

      {extraContent && (
        <div className="md:col-span-4 flex flex-col gap-4 h-full">
          {extraContent}
        </div>
      )}
    </div>
  );
}
