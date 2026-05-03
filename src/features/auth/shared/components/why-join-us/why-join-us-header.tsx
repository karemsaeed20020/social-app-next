import { Link, ROUTES } from "@/core";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function WhyJoinUsHeader() {
  const t = useTranslations("app");

  return (
    <header className="relative z-10">
      <Link
        href={ROUTES.FEED}
        className="group flex items-center gap-3 transition-all duration-300 hover:opacity-90 w-fit"
      >
        <Image src="/logo.png" alt="Logo" width={24} height={24} />
        <span className="text-xl font-bold tracking-tight text-white">
          {t("title")}
        </span>
      </Link>
    </header>
  );
}
