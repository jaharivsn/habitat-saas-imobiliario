"use client";

import { useState } from "react";
import { Save, CheckCircle2 } from "lucide-react";

export default function PerfilCorretorPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {saved && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-800 text-white px-5 py-3 rounded-sm shadow-luxury border border-emerald-600/40 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Perfil atualizado com sucesso!</span>
        </div>
      )}

      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-600">
          Minha Identidade
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 mt-0.5">
          Perfil Profissional
        </h1>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-xl p-6 sm:p-10 border border-stone-200/90 shadow-subtle space-y-6 text-xs">
        <div className="flex items-center gap-6 pb-6 border-b border-stone-100">
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
            alt="Alexandre"
            className="w-20 h-20 rounded-xl object-cover border-2 border-navy-950 shadow-sm"
          />
          <div>
            <h3 className="font-serif font-bold text-lg text-navy-950">
              Alexandre Vasconcelos
            </h3>
            <p className="text-stone-500">Corretor de Imóveis • CRECI 189420-F</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-stone-700 block mb-1">Nome Completo</label>
            <input
              type="text"
              defaultValue="Alexandre Vasconcelos"
              className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-sm focus:outline-none focus:border-navy-950"
            />
          </div>
          <div>
            <label className="font-semibold text-stone-700 block mb-1">CRECI</label>
            <input
              type="text"
              defaultValue="189420-F"
              className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-sm focus:outline-none focus:border-navy-950"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-stone-700 block mb-1">E-mail Profissional</label>
            <input
              type="email"
              defaultValue="alexandre@habitatprime.com.br"
              className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-sm focus:outline-none focus:border-navy-950"
            />
          </div>
          <div>
            <label className="font-semibold text-stone-700 block mb-1">Telefone / WhatsApp</label>
            <input
              type="text"
              defaultValue="+55 (11) 99882-1400"
              className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-sm focus:outline-none focus:border-navy-950"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-stone-100 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-navy-950 hover:bg-navy-900 text-white font-semibold text-[11px] uppercase tracking-wider rounded-sm shadow-sm flex items-center gap-1.5 transition"
          >
            <Save className="w-4 h-4 text-gold-400" />
            <span>Salvar Informações</span>
          </button>
        </div>
      </form>
    </div>
  );
}
