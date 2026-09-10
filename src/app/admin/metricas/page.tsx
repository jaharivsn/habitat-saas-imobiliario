export default function AdminMetricasPage() {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-400">
          Inteligência Macro
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-0.5">
          Métricas Globais da Plataforma
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#121826] p-6 rounded-xl border border-slate-800 space-y-2 shadow-subtle">
          <span className="text-xs text-slate-400 uppercase font-mono">Volume de Transações Monitoradas</span>
          <div className="font-serif font-bold text-3xl text-white">R$ 1.84 Bilhão</div>
          <p className="text-xs text-emerald-400">+22% vs trimestre anterior</p>
        </div>

        <div className="bg-[#121826] p-6 rounded-xl border border-slate-800 space-y-2 shadow-subtle">
          <span className="text-xs text-slate-400 uppercase font-mono">Total de Leads Transacionados</span>
          <div className="font-serif font-bold text-3xl text-white">8.420</div>
          <p className="text-xs text-slate-400">Média de 18.6 leads por corretor ativo</p>
        </div>

        <div className="bg-[#121826] p-6 rounded-xl border border-slate-800 space-y-2 shadow-subtle">
          <span className="text-xs text-slate-400 uppercase font-mono">Taxa de Churn SaaS</span>
          <div className="font-serif font-bold text-3xl text-emerald-400">1.2%</div>
          <p className="text-xs text-slate-400">Excelente retenção de assinantes</p>
        </div>
      </div>
    </div>
  );
}
