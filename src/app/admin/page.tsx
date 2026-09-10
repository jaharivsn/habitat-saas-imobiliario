import Link from "next/link";
import { CheckSquare, AlertTriangle, ArrowRight } from "lucide-react";
import { mockProperties } from "@/data/mockData";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-rose-400">
            Habitat Ecosystem Governance
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Painel de Controle & Moderação Master
        </h1>
        <p className="text-xs text-slate-400 mt-1 font-light">
          Supervisão fiduciária de carteira, conformidade de anúncios e integridade operacional.
        </p>
      </div>

      {/* Global Macro KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-white">
        <div className="bg-[#121826] p-5 rounded-xl border border-slate-800/80 shadow-subtle space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
            GMV em Carteira Ativa
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-amber-300 tabular-nums">
            R$ 480M
          </div>
          <span className="text-[10px] text-stone-400 font-mono">148 ativos cadastrados</span>
        </div>

        <div className="bg-[#121826] p-5 rounded-xl border border-slate-800/80 shadow-subtle space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
            MRR Estimado (SaaS)
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-400 tabular-nums">
            R$ 84.900
          </div>
          <span className="text-[10px] text-emerald-500 font-mono">+14.2% este mês</span>
        </div>

        <div className="bg-[#121826] p-5 rounded-xl border border-slate-800/80 shadow-subtle space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
            Corretores & Boutiques
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">452 / 68</div>
          <span className="text-[10px] text-slate-400 font-mono">89% no Plano Pro</span>
        </div>

        <div className="bg-[#121826] p-5 rounded-xl border border-rose-900/60 shadow-subtle space-y-1">
          <span className="text-[10px] font-mono text-rose-400 uppercase tracking-wider block flex items-center gap-1.5">
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            Fila de Análise
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-rose-300 tabular-nums">3</div>
          <Link href="/admin/moderacao" className="text-[10px] text-rose-400 hover:underline uppercase font-mono tracking-wider inline-flex items-center gap-1">
            <span>Revisar pendências</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Quick Moderation Queue Preview */}
      <div className="bg-[#121826] rounded-xl border border-slate-800 p-6 space-y-4 shadow-subtle">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="font-serif font-bold text-base text-white flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-rose-400" />
            Anúncios Recém-Submetidos para Aprovação
          </h3>
          <Link href="/admin/moderacao" className="text-xs font-bold text-rose-400 hover:underline">
            Ver Todos
          </Link>
        </div>

        <div className="divide-y divide-slate-800 text-xs">
          {mockProperties.slice(0, 3).map((p) => (
            <div key={p.id} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={p.photos[0]}
                  alt={p.title}
                  className="w-12 h-10 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-bold text-white truncate max-w-sm">{p.title}</h4>
                  <span className="text-slate-400 text-[10px]">
                    Submetido por: {p.broker.name} ({p.broker.agencyName || "Solo"})
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/admin/moderacao"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition"
                >
                  Revisar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
