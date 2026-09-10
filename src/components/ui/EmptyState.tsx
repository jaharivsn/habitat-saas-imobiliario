import { ReactNode } from "react";
import { LucideIcon, HelpCircle } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export default function EmptyState({
  icon: Icon = HelpCircle,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`bg-white rounded-xl p-10 sm:p-14 text-center border border-stone-200/90 shadow-subtle flex flex-col items-center justify-center max-w-md mx-auto ${className}`}
    >
      <div className="w-14 h-14 rounded-xl bg-stone-100 text-stone-400 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="font-serif font-semibold text-lg text-navy-950">{title}</h3>
      <p className="text-xs text-slate-500 mt-1.5 max-w-xs leading-relaxed font-light">
        {description}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
