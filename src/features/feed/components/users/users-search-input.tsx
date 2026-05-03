"use client";

import { Input } from "@/shared";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

interface UsersSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function UsersSearchInput({
  value,
  onChange,
  className,
}: UsersSearchInputProps) {
  const t = useTranslations("pages.feed.sidebar");

  return (
    <div className={className}>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("search_placeholder")}
        startIcon={<Search size={18} />}
      />
    </div>
  );
}
