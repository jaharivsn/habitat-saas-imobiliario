import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  iconColor?: string;
  className?: string;
}

export default function DashboardCard({
  title,
  value,
  subtitle,
  change,
  isPositive = true,
  icon: Icon,
  iconColor = "text-gold-700",
  className = "",
}: DashboardCardProps) {
  return (
    <div
      className={`bg-white p-5 rounded-xl border border-stone-200/90 shadow-subtle hover:shadow-luxury transition-all duration-300 space-y-2.5 ${className}`}
    >
      <div className="flex items-center justify-between text-slate-400">
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
          {title}
        </span>
        <Icon className={`w-4 h-4 ${iconColor}`} />
      </div>

      <div className="font-serif font-semibold text-2xl sm:text-3xl text-navy-950 tracking-tight">
        {value}
      </div>

      {(change || subtitle) && (
        <div className="text-[11px] flex items-center gap-1.5 pt-0.5">
          {change && (
            <span
              className={`font-semibold ${
                isPositive ? "text-emerald-700" : "text-rose-700"
              }`}
            >
              {change}
            </span>
          )}
          {subtitle && <span className="text-slate-400 font-light">{subtitle}</span>}
        </div>
      )}
    </div>
  );
}
