"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  LucideIcon,
  PrivacyType,
} from "@/shared";
import { Check, Globe, Lock, Users } from "lucide-react";
import { useTranslations } from "next-intl";

interface PrivacySelectorProps {
  privacy: PrivacyType;
  onChange: (value: PrivacyType) => void;
}

export function PrivacySelector({ privacy, onChange }: PrivacySelectorProps) {
  const t = useTranslations("pages.feed.privacy");

  const options: { value: PrivacyType; icon: LucideIcon }[] = [
    { value: "public", icon: Globe },
    { value: "following", icon: Users },
    { value: "only_me", icon: Lock },
  ];

  const CurrentIcon =
    options.find((opt) => opt.value === privacy)?.icon || Globe;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mt-1" asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 h-6 px-2 text-xs font-semibold rounded-lg bg-muted/50 hover:bg-muted border-border transition-all"
        >
          <CurrentIcon className="size-3 text-primary" />
          {t(privacy as never)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {options.map((option) => {
          const Icon = option.icon;
          const isSelected = privacy === option.value;

          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onChange(option.value as PrivacyType)}
              className="justify-between"
            >
              <div className="flex items-center gap-2.5">
                <Icon className="text-muted-foreground" />
                <span>{t(option.value as never)}</span>
              </div>
              {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
