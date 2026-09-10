import { ReactNode } from "react";

export interface Column<T> {
  header: string;
  accessor?: keyof T;
  render?: (item: T) => ReactNode;
  align?: "left" | "center" | "right";
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  emptyMessage?: string;
  className?: string;
}

export default function DataTable<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage = "Nenhum dado encontrado.",
  className = "",
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 text-center text-xs text-slate-500 border border-stone-200/90 shadow-subtle">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto bg-white rounded-xl border border-stone-200/90 shadow-subtle ${className}`}>
      <table className="w-full text-left text-xs border-collapse">
        <thead className="bg-stone-50 border-b border-stone-200 text-slate-500 font-semibold uppercase text-[10px] tracking-[0.16em]">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`p-4 ${idx === 0 ? "pl-6" : ""} ${
                  idx === columns.length - 1 ? "pr-6" : ""
                } ${
                  col.align === "right"
                    ? "text-right"
                    : col.align === "center"
                    ? "text-center"
                    : "text-left"
                }`}
                style={{ width: col.width }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100">
          {data.map((item) => (
            <tr key={keyExtractor(item)} className="hover:bg-stone-50/70 transition">
              {columns.map((col, idx) => (
                <td
                  key={idx}
                  className={`p-4 ${idx === 0 ? "pl-6" : ""} ${
                    idx === columns.length - 1 ? "pr-6" : ""
                  } ${
                    col.align === "right"
                      ? "text-right"
                      : col.align === "center"
                      ? "text-center"
                      : "text-left"
                  }`}
                >
                  {col.render
                    ? col.render(item)
                    : col.accessor
                    ? (item[col.accessor] as ReactNode)
                    : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
