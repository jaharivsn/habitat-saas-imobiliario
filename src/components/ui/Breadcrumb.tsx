import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center gap-1.5 text-xs text-slate-400 ${className}`}>
      <Link
        href="/"
        className="hover:text-slate-700 transition flex items-center gap-1"
      >
        <Home className="w-3.5 h-3.5" />
        <span className="sr-only">Início</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3 text-slate-300" />
            {isLast || !item.href ? (
              <span className="text-slate-800 font-semibold truncate max-w-xs sm:max-w-md">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-slate-800 transition truncate max-w-xs"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
