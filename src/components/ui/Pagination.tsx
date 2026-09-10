import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-center gap-1.5 text-xs font-semibold ${className}`}>
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
        aria-label="Página anterior"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {Array.from({ length: totalPages }).map((_, i) => {
        const page = i + 1;
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 rounded-xl transition ${
              isActive
                ? "bg-navy-900 text-white font-bold shadow-sm"
                : "text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
        aria-label="Próxima página"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
