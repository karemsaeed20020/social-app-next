import { useTranslations } from "next-intl";
import { STATS } from "../../mocks";
import { WhyJoinUsStatItem } from "./why-join-us-stat-item";

export function WhyJoinUsStats() {
  const t = useTranslations("pages.auth.login.why_join_us");
  return (
    <section className="stats-section">
      <ul className="flex flex-wrap items-center gap-8">
        {STATS.map(({ key, icon: Icon, value }) => (
          <WhyJoinUsStatItem
            key={key}
            icon={<Icon className="size-5 text-white/60" />}
            value={value}
            label={t(`stats.${key}` as never)}
          />
        ))}
      </ul>
    </section>
  );
}
