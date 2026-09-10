import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { mockBrokers } from "@/data/mockData";

export default function AdminCorretoresPage() {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-400">
          Rede de Corretores
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-0.5">
          Corretores Cadastrados na Plataforma
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBrokers.map((b) => (
          <div
            key={b.id}
            className="bg-[#121826] rounded-xl p-6 border border-slate-800 space-y-4 text-xs shadow-subtle"
          >
            <div className="flex items-center gap-3">
              <img
                src={b.photo}
                alt={b.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-bold text-white text-sm">{b.name}</h3>
                <span className="text-slate-400">CRECI {b.creci}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-1 text-slate-400">
              <p>Imóveis Ativos: <span className="text-white font-bold">{b.activeListingsCount}</span></p>
              <p>Imóveis Vendidos: <span className="text-white font-bold">{b.soldCount}</span></p>
              <p className="flex items-center gap-1.5">
                Avaliação Média: <span className="text-amber-400 font-bold inline-flex items-center gap-1">{b.rating} <Star className="w-3 h-3 fill-amber-400 text-amber-400" /></span>
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
              <Link
                href={`/corretor/${b.slug}`}
                target="_blank"
                className="text-rose-400 hover:underline font-semibold inline-flex items-center gap-1.5"
              >
                <span>Ver Vitrine Pública</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <button className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-sm text-[11px] font-semibold uppercase tracking-wider transition">
                Auditar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
