import { useTranslations } from "next-intl";
import { FEATURES } from "../../mocks";
import { WhyJoinUsFeatureItem } from "./why-join-us-feature-item";

export function WhyJoinUsFeatures() {
  const t = useTranslations("pages.auth.login.why_join_us");
  return (
    <section className="feature-section">
      <h3 className="sr-only">Platform Features</h3>
      <ul className="feature-cards grid gap-3 sm:grid-cols-2">
        {FEATURES.map(({ key, icon: Icon, iconColor, iconBg }) => (
          <WhyJoinUsFeatureItem
            key={key}
            icon={<Icon className="size-5" />}
            iconColor={iconColor}
            iconBg={iconBg}
            title={t(`features.${key}.title` as never)}
            description={t(`features.${key}.description` as never)}
          />
        ))}
      </ul>
    </section>
  );
}
