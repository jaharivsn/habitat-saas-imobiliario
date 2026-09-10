"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";

interface SubscriptionRecord {
  id: string;
  userName: string;
  userType: "Corretor" | "Imobiliária";
  planName: string;
  amount: number;
  billingCycle: "Mensal" | "Anual";
  status: "active" | "past_due" | "canceled";
  renewalDate: string;
}

export default function AdminAssinaturasPage() {
  const [subscriptions] = useState<SubscriptionRecord[]>([
    {
      id: "sub-101",
      userName: "Alexandre Vasconcelos",
      userType: "Corretor",
      planName: "Plano Pro",
      amount: 489,
      billingCycle: "Mensal",
      status: "active",
      renewalDate: "15/04/2025",
    },
    {
      id: "sub-102",
      userName: "Habitat Prime Realty",
      userType: "Imobiliária",
      planName: "Plano Imobiliária",
      amount: 1290,
      billingCycle: "Mensal",
      status: "active",
      renewalDate: "22/04/2025",
    },
    {
      id: "sub-103",
      userName: "Beatriz Monteiro",
      userType: "Corretor",
      planName: "Plano Pro",
      amount: 489,
      billingCycle: "Mensal",
      status: "active",
      renewalDate: "05/05/2025",
    },
    {
      id: "sub-104",
      userName: "Apex Realty Boutique",
      userType: "Imobiliária",
      planName: "Plano Enterprise",
      amount: 2890,
      billingCycle: "Anual",
      status: "active",
      renewalDate: "10/12/2025",
    },
    {
      id: "sub-105",
      userName: "Marcio Lins",
      userType: "Corretor",
      planName: "Plano Individual",
      amount: 199,
      billingCycle: "Mensal",
      status: "past_due",
      renewalDate: "01/03/2025",
    },
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-400">
          Receita Recorrente SaaS
        </span>
        <h1 className="font-serif text-3xl font-bold text-white mt-1">
          Gestão Global de Assinaturas & Faturamento
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Auditoria de planos ativos, ciclo de cobrança, inadimplência e projeção de MRR/ARR.
        </p>
      </div>

      {/* Macro Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-white">
        <div className="bg-[#121826] p-5 rounded-xl border border-slate-800 shadow-subtle">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">
            MRR Total
          </span>
          <div className="font-serif font-bold text-2xl text-emerald-400 mt-1">
            R$ 84.900
          </div>
          <span className="text-[10px] text-emerald-500 font-semibold">+14% vs mês anterior</span>
        </div>

        <div className="bg-[#121826] p-5 rounded-xl border border-slate-800 shadow-subtle">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">
            Assinaturas Ativas
          </span>
          <div className="font-serif font-bold text-2xl mt-1">520</div>
          <span className="text-[10px] text-slate-400">452 corretores • 68 imobiliárias</span>
        </div>

        <div className="bg-[#121826] p-5 rounded-xl border border-slate-800 shadow-subtle">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">
            Ticket Médio (ARPU)
          </span>
          <div className="font-serif font-bold text-2xl mt-1">R$ 163</div>
          <span className="text-[10px] text-slate-400">Média ponderada por cota</span>
        </div>

        <div className="bg-[#121826] p-5 rounded-xl border border-slate-800 shadow-subtle">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">
            Inadimplência
          </span>
          <div className="font-serif font-bold text-2xl text-amber-400 mt-1">1.1%</div>
          <span className="text-[10px] text-slate-400">6 contas em renegociação</span>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-[#121826] rounded-xl border border-slate-800 overflow-hidden shadow-subtle">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-serif font-bold text-base text-white flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-rose-400" />
            Assinaturas Monitoradas
          </h3>
          <span className="text-xs text-slate-400 font-mono">520 registros ativos</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0F1420] border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-4 pl-6">Assinante</th>
                <th className="p-4">Tipo</th>
                <th className="p-4">Plano</th>
                <th className="p-4">Valor</th>
                <th className="p-4">Ciclo</th>
                <th className="p-4">Renovação</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {subscriptions.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-900/40 transition">
                  <td className="p-4 pl-6 font-bold text-white">{sub.userName}</td>
                  <td className="p-4 text-slate-300">{sub.userType}</td>
                  <td className="p-4 font-semibold text-gold-400">{sub.planName}</td>
                  <td className="p-4 font-mono font-bold text-white">R$ {sub.amount}/mês</td>
                  <td className="p-4 text-slate-400">{sub.billingCycle}</td>
                  <td className="p-4 text-slate-400">{sub.renewalDate}</td>
                  <td className="p-4">
                    {sub.status === "active" ? (
                      <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-sm font-semibold">
                        Adimplente
                      </span>
                    ) : (
                      <span className="bg-rose-950/80 text-rose-400 border border-rose-800/60 text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-sm font-semibold">
                        Pendente
                      </span>
                    )}
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <button className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-sm text-[11px] font-semibold tracking-wider uppercase transition">
                      Detalhes
                    </button>
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
