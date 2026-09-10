import { AlertTriangle } from "lucide-react";

export default function AdminSuportePage() {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-400">
          Atendimento & Compliance
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-0.5">
          Chamados de Suporte & Denúncias
        </h1>
      </div>

      <div className="bg-[#121826] rounded-xl border border-slate-800 p-6 space-y-4 shadow-subtle">
        <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <div>
              <h4 className="font-bold text-white">Denúncia de Anúncio Duplicado (#DEN-402)</h4>
              <p className="text-slate-400">Corretor alega exclusividade contratual sobre imóvel no Itaim Bibi.</p>
            </div>
          </div>
          <button className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-sm font-semibold text-[11px] uppercase tracking-wider shadow-subtle transition">
            Auditar Documento
          </button>
        </div>
      </div>
    </div>
  );
}
