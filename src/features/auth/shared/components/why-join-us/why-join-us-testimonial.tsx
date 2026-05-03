import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function WhyJoinUsTestimonial() {
  const t = useTranslations("pages.auth.login.why_join_us");
  return (
    <figure className="relative z-10 space-y-4 rounded-lg border border-white/8 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:bg-white/8 hover:border-white/12">
      <div className="rating-average flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="size-4 fill-amber-400 text-amber-400 transition-transform duration-200 hover:scale-110"
          />
        ))}
      </div>
      <blockquote className="text-base font-medium italic leading-relaxed text-white/75">
        &quot;{t("testimonial.quote")}&quot;
      </blockquote>
      <figcaption className="flex items-center gap-3 pt-1">
        <div className="relative">
          <Image
            className="rounded-lg border border-white/15 object-cover shadow-md"
            src="/auth-bg.webp"
            alt="Alex Johnson"
            width={44}
            height={44}
          />
          <div className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full border-2 border-black bg-emerald-400" />
        </div>
        <div className="flex flex-col">
          <cite className="not-italic text-sm font-semibold text-white">
            {t("testimonial.author")}
          </cite>
          <span className="text-xs font-medium text-white/40">
            {t("testimonial.role")}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}
