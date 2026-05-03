import { WhyJoinUsBackground } from "./why-join-us-background";
import { WhyJoinUsFeatures } from "./why-join-us-features";
import { WhyJoinUsHeader } from "./why-join-us-header";
import { WhyJoinUsHero, WhyJoinUsHeroProps } from "./why-join-us-hero";
import { WhyJoinUsStats } from "./why-join-us-stats";
import { WhyJoinUsTestimonial } from "./why-join-us-testimonial";

export function WhyJoinUsSection({
  title,
  description,
  titleGradient,
}: WhyJoinUsHeroProps) {
  return (
    <div className="relative flex flex-col justify-between overflow-hidden min-h-screen p-10">
      <WhyJoinUsBackground />
      <WhyJoinUsHeader />
      <div className="content relative z-10 space-y-8 my-auto">
        <WhyJoinUsHero
          title={title}
          description={description}
          titleGradient={titleGradient}
        />
        <WhyJoinUsFeatures />
        <WhyJoinUsStats />
      </div>
      <WhyJoinUsTestimonial />
    </div>
  );
}
