import { mockPlans } from "@/data/mockData";
import { Edit } from "lucide-react";

export default function AdminPlanosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-400">
            Monetização SaaS
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-0.5">
            Planos de Assinatura & Cotas
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockPlans.map((plan) => (
          <div
            key={plan.id}
            className="bg-[#121826] rounded-xl p-6 border border-slate-800 space-y-4 text-xs flex flex-col justify-between shadow-subtle"
          >
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-lg text-white">{plan.name}</h3>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  R$ {plan.priceMonthly}/mês
                </span>
              </div>
              <p className="text-slate-400 mt-1">{plan.description}</p>
              <div className="p-3 bg-slate-900 rounded-lg mt-4 space-y-1 text-slate-300">
                <p>Limite de Imóveis: <span className="font-bold text-white">{plan.listingLimit}</span></p>
                <p>Destaques Mensais: <span className="font-bold text-white">{plan.featuredMonthly}</span></p>
                <p>Usuários da Equipe: <span className="font-bold text-white">{plan.userLimit}</span></p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-sm font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition">
                <Edit className="w-3.5 h-3.5" />
                <span>Editar Valores</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
