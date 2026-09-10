"use client";

import { useState } from "react";
import { Bell, Lock, CheckCircle2 } from "lucide-react";

export default function ConfiguracoesPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {saved && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-800 text-white px-5 py-3 rounded-sm shadow-luxury border border-emerald-600/40 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Preferências atualizadas com sucesso!</span>
        </div>
      )}

      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-600">
          Preferências do Sistema
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 mt-0.5">
          Configurações da Conta
        </h1>
      </div>

      <div className="bg-white rounded-xl p-6 sm:p-10 border border-stone-200/90 shadow-subtle space-y-6 text-xs">
        <div>
          <h3 className="font-bold text-sm text-navy-950 mb-3 flex items-center gap-2">
            <Bell className="w-4 h-4 text-gold-600" />
            Notificações de Novos Leads
          </h3>
          <div className="space-y-3">
            {[
              "Notificar instantaneamente por WhatsApp ao receber nova mensagem",
              "Enviar resumo matinal diário de visitas agendadas por e-mail",
              "Alerta de vencimento de prazo de exclusividade de imóveis",
            ].map((pref, i) => (
              <label key={i} className="flex items-center gap-2.5 cursor-pointer text-stone-700">
                <input type="checkbox" defaultChecked className="rounded-sm text-navy-950 accent-navy-950" />
                <span>{pref}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-stone-100">
          <h3 className="font-bold text-sm text-navy-950 mb-3 flex items-center gap-2">
            <Lock className="w-4 h-4 text-gold-600" />
            Segurança & Autenticação
          </h3>
          <div className="space-y-3">
            <button
              type="button"
              className="px-4 py-2 bg-stone-100 text-stone-800 border border-stone-200/80 rounded-sm text-[11px] uppercase tracking-wider font-semibold hover:bg-stone-200 transition"
            >
              Alterar Senha de Acesso
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-100 flex justify-end">
          <button
            type="button"
            onClick={() => {
              setSaved(true);
              setTimeout(() => setSaved(false), 2500);
            }}
            className="px-6 py-2.5 bg-navy-950 hover:bg-navy-900 text-white font-semibold text-[11px] uppercase tracking-wider rounded-sm shadow-sm transition"
          >
            Salvar Preferências
          </button>
        </div>
      </div>
    </div>
  );
}
