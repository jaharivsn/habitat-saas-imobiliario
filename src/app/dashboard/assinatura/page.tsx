"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { mockPlans } from "@/data/mockData";

export default function AssinaturaPage() {
  const currentPlan = mockPlans[1]; // Plano Pro
  const [upgradeModal, setUpgradeModal] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
          Gestão de Conta SaaS
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 mt-0.5">
          Assinatura & Planos
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Acompanhe seu ciclo de cobrança, limites de anúncios e upgrades de recursos.
        </p>
      </div>

      {/* Current Active Plan Status */}
      <div className="bg-navy-950 text-white rounded-xl p-6 sm:p-8 shadow-luxury border border-navy-800/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-[0.18em] text-gold-400">
              Plano Atual
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[9px] px-2 py-0.5 rounded-sm font-semibold uppercase tracking-wider">
              Ativo
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold mt-1">
            {currentPlan.name}
          </h2>
          <p className="text-xs text-stone-300 mt-1">
            R$ {currentPlan.priceMonthly}/mês • Próxima renovação em 15 de Abril de 2024
          </p>
        </div>

        <button
          onClick={() => setUpgradeModal(true)}
          className="bg-gold-500 hover:bg-gold-600 text-navy-950 font-semibold text-[11px] uppercase tracking-wider py-3 px-6 rounded-sm shadow-sm transition flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Fazer Upgrade de Plano</span>
        </button>
      </div>

      {/* Quotas & Usage Progress */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200/90 shadow-subtle space-y-6">
        <h3 className="font-serif font-bold text-lg text-navy-950">
          Uso das Cotas do seu Plano
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          {/* Imóveis Ativos */}
          <div className="p-4 bg-stone-50/80 rounded-lg border border-stone-200/60 space-y-2">
            <div className="flex justify-between font-bold text-stone-700">
              <span>Imóveis Ativos</span>
              <span>14 / 50</span>
            </div>
            <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
              <div style={{ width: "28%" }} className="h-full bg-navy-950 rounded-full" />
            </div>
            <span className="text-[10px] text-stone-400">36 vagas restantes</span>
          </div>

          {/* Destaques Mensais */}
          <div className="p-4 bg-stone-50/80 rounded-lg border border-stone-200/60 space-y-2">
            <div className="flex justify-between font-bold text-stone-700">
              <span>Destaques no Mês</span>
              <span>3 / 8</span>
            </div>
            <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
              <div style={{ width: "37.5%" }} className="h-full bg-gold-500 rounded-full" />
            </div>
            <span className="text-[10px] text-stone-400">5 destaques disponíveis</span>
          </div>

          {/* Usuários da Equipe */}
          <div className="p-4 bg-stone-50/80 rounded-lg border border-stone-200/60 space-y-2">
            <div className="flex justify-between font-bold text-stone-700">
              <span>Usuários / Assentos</span>
              <span>1 / 2</span>
            </div>
            <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
              <div style={{ width: "50%" }} className="h-full bg-navy-950 rounded-full" />
            </div>
            <span className="text-[10px] text-stone-400">1 assento livre para assistente</span>
          </div>
        </div>
      </div>

      {/* Invoice History Simulation */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200/90 shadow-subtle space-y-4">
        <h3 className="font-serif font-bold text-lg text-navy-950">
          Histórico de Faturas
        </h3>

        <div className="divide-y divide-stone-100 text-xs">
          {[
            { id: "INV-2024-03", date: "15/03/2024", val: "R$ 299,00", status: "Pago" },
            { id: "INV-2024-02", date: "15/02/2024", val: "R$ 299,00", status: "Pago" },
            { id: "INV-2024-01", date: "15/01/2024", val: "R$ 299,00", status: "Pago" },
          ].map((inv) => (
            <div key={inv.id} className="py-3 flex items-center justify-between">
              <div>
                <span className="font-bold text-navy-950">{inv.id}</span>
                <span className="text-stone-400 ml-3">{inv.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-stone-700">{inv.val}</span>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                  {inv.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Upgrade */}
      {upgradeModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 shadow-luxury border border-stone-200/90 space-y-4">
            <h3 className="font-serif font-bold text-xl text-navy-950">
              Upgrade para Plano Imobiliária
            </h3>
            <p className="text-xs text-stone-500">
              Desbloqueie até 200 imóveis, 15 usuários e 25 destaques por mês para sua equipe.
            </p>
            <div className="p-4 bg-stone-50/80 rounded-md border border-stone-200 text-xs font-semibold text-stone-800">
              Valor: R$ 599,00/mês
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setUpgradeModal(false)}
                className="flex-1 py-2.5 text-[11px] uppercase tracking-wider font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-sm border border-stone-200/80 transition"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={() => setUpgradeModal(false)}
                className="flex-1 py-2.5 text-[11px] uppercase tracking-wider font-semibold text-white bg-navy-950 hover:bg-navy-900 rounded-sm shadow-sm transition"
              >
                Confirmar Upgrade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
