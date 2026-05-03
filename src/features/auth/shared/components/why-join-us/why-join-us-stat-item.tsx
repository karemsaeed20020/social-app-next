interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

export function WhyJoinUsStatItem({ icon, value, label }: StatItemProps) {
  return (
    <li className="group flex items-center gap-4 transition-transform duration-300 hover:-translate-y-0.5">
      <div className="flex size-10 items-center justify-center rounded-lg bg-white/8 backdrop-blur-sm border border-white/6 transition-all duration-300 group-hover:bg-white/12">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold tracking-tight text-white">
          {value}
        </span>
        <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
          {label}
        </p>
      </div>
    </li>
  );
}
