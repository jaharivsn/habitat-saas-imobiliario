import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { mockAgencies } from "@/data/mockData";

export default function AdminImobiliariasPage() {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-400">
          Rede Institucional
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-0.5">
          Imobiliárias & Boutiques Parceiras
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockAgencies.map((a) => (
          <div
            key={a.id}
            className="bg-[#121826] rounded-xl p-6 border border-slate-800 space-y-4 text-xs shadow-subtle"
          >
            <div className="flex items-center gap-4">
              <img
                src={a.logo}
                alt={a.name}
                className="w-14 h-14 rounded-lg object-cover bg-white"
              />
              <div>
                <h3 className="font-bold text-white text-base">{a.name}</h3>
                <span className="text-slate-400">{a.city}, {a.state}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-slate-300">
              <div className="p-3 bg-slate-900 rounded-lg">
                <span className="text-[10px] text-slate-500 uppercase block">Imóveis Ativos</span>
                <span className="font-bold text-base text-white">{a.listingsCount}</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg">
                <span className="text-[10px] text-slate-500 uppercase block">Equipe de Corretores</span>
                <span className="font-bold text-base text-white">{a.teamCount}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
              <Link
                href={`/imobiliaria/${a.slug}`}
                target="_blank"
                className="text-rose-400 hover:underline font-semibold inline-flex items-center gap-1.5"
              >
                <span>Página Institucional</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <button className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-sm text-[11px] font-semibold uppercase tracking-wider transition">
                Gerenciar Acesso
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
