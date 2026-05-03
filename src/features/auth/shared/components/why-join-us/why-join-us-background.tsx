import { cn } from "@/core";
import Image from "next/image";

export function WhyJoinUsBackground() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Image
        src="/auth-bg.webp"
        alt="Background image"
        fill
        className="grayscale-[0.3] dark:grayscale-[0.5] object-cover object-center scale-105"
        priority
        fetchPriority="high"
        sizes="100vw 100vh"
      />
      <div
        className={cn(
          "absolute inset-0",
          "bg-[linear-gradient(135deg,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.5)_40%,rgba(0,0,0,0.3)_60%,rgba(0,0,0,0.85)_100%)]",
        )}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(198,0,92,0.15)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(198,0,92,0.1)_0%,transparent_50%)]" />
    </div>
  );
}
