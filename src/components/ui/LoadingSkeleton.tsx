export function PropertyCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-stone-200/90 shadow-subtle animate-pulse flex flex-col">
      <div className="aspect-[16/10] bg-slate-200" />
      <div className="p-5 space-y-4">
        <div className="h-3 w-1/3 bg-slate-200 rounded" />
        <div className="h-5 w-3/4 bg-slate-200 rounded" />
        <div className="grid grid-cols-4 gap-2 py-3 border-y border-slate-100">
          <div className="h-8 bg-slate-100 rounded" />
          <div className="h-8 bg-slate-100 rounded" />
          <div className="h-8 bg-slate-100 rounded" />
          <div className="h-8 bg-slate-100 rounded" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 w-1/2 bg-slate-200 rounded" />
          <div className="h-9 w-24 bg-slate-200 rounded-sm" />
        </div>
      </div>
    </div>
  );
}

export function TableRowSkeleton({ cols = 5 }: { cols?: number }) {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="p-4">
          <div className="h-4 bg-slate-200 rounded w-3/4" />
        </td>
      ))}
    </tr>
  );
}

export function MetricCardSkeleton() {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-subtle animate-pulse space-y-3">
      <div className="h-3 w-1/3 bg-slate-200 rounded" />
      <div className="h-7 w-1/2 bg-slate-300 rounded" />
      <div className="h-3 w-2/3 bg-slate-100 rounded" />
    </div>
  );
}
