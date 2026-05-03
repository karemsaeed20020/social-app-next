export interface WhyJoinUsHeroProps {
  title: string;
  description: string;
  titleGradient: string;
}

export function WhyJoinUsHero({
  title,
  description,
  titleGradient,
}: WhyJoinUsHeroProps) {
  return (
    <div className="title space-y-4">
      <h2 className="text-4xl font-bold leading-tight md:text-5xl lg:text-[3.25rem] tracking-tight">
        <span className="text-white">{title}</span>
        <span className="block mt-1 bg-linear-to-r from-pink-400 via-rose-500 to-red-500 bg-clip-text text-transparent">
          {titleGradient}
        </span>
      </h2>

      <p className="max-w-md text-lg leading-relaxed text-white/60">
        {description}
      </p>
    </div>
  );
}
