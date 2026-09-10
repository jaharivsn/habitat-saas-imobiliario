export default function AdminConfiguracoesPage() {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-400">
          Parâmetros Globais
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-0.5">
          Configurações da Plataforma
        </h1>
      </div>

      <div className="bg-[#121826] rounded-xl border border-slate-800 p-8 space-y-6 text-xs max-w-3xl shadow-subtle">
        <div>
          <h3 className="font-bold text-sm text-white mb-2">Parâmetros de Moderação</h3>
          <label className="flex items-center gap-2 text-slate-300">
            <input type="checkbox" defaultChecked className="rounded" />
            <span>Exigir aprovação manual obrigatória antes de publicar qualquer imóvel na home</span>
          </label>
        </div>

        <div className="pt-4 border-t border-slate-800">
          <h3 className="font-bold text-sm text-white mb-2">Taxas de Destaques Extras</h3>
          <p className="text-slate-400">Destaque avulso na homepage: R$ 89,00 por 15 dias.</p>
        </div>
      </div>
    </div>
  );
}
