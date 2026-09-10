import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { mockProperties } from "@/data/mockData";
import { formatPrice } from "@/lib/utils";

export default function AdminImoveisPage() {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-400">
          Base Geral de Ativos
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-0.5">
          Todos os Imóveis Cadastrados na Plataforma
        </h1>
      </div>

      <div className="bg-[#121826] rounded-xl border border-slate-800 overflow-hidden shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0F1420] border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-4 pl-6">Código</th>
                <th className="p-4">Título</th>
                <th className="p-4">Valor</th>
                <th className="p-4">Corretor</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {mockProperties.map((p) => (
                <tr key={p.id} className="hover:bg-slate-900/40 transition">
                  <td className="p-4 pl-6 font-mono font-bold text-rose-400">{p.code}</td>
                  <td className="p-4 font-bold text-white truncate max-w-xs">{p.title}</td>
                  <td className="p-4 font-bold text-gold-400">
                    {formatPrice(p.price, p.operation)}
                  </td>
                  <td className="p-4 text-slate-300">{p.broker.name}</td>
                  <td className="p-4">
                    <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-sm font-semibold capitalize">
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <Link
                      href={`/imovel/${p.slug}`}
                      target="_blank"
                      className="text-slate-400 hover:text-white inline-flex items-center gap-1.5"
                    >
                      <span>Ver Anúncio</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
