"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Edit, ExternalLink } from "lucide-react";
import { mockCommunities } from "@/data/mockData";
import { Community } from "@/types";

export default function AdminCondominiosPage() {
  const [communities] = useState<Community[]>(mockCommunities);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-400">
            Empreendimentos & Loteamentos Fechados
          </span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">
            Gestão de Condomínios de Alto Padrão
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Curadoria de residenciais fechados, amenidades hípicas/golfe e cotas de anúncios vinculados.
          </p>
        </div>

        <button className="bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-semibold uppercase tracking-wider px-4 py-2.5 rounded-sm shadow-subtle flex items-center gap-1.5 transition">
          <Plus className="w-4 h-4" />
          <span>Cadastrar Condomínio</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map((comm) => (
          <div
            key={comm.id}
            className="bg-[#121826] rounded-xl border border-slate-800 overflow-hidden flex flex-col justify-between shadow-subtle"
          >
            <div>
              <div className="relative h-44 overflow-hidden">
                <img
                  src={comm.photo}
                  alt={comm.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#0A0E17]/90 backdrop-blur-md px-2 py-0.5 rounded-sm text-[9px] font-semibold text-white uppercase tracking-wider border border-white/10">
                  {comm.city} - {comm.state}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="font-serif font-bold text-lg text-white">
                  {comm.name}
                </h3>
                <p className="font-mono text-gold-400 text-xs font-semibold">
                  Ticket de {comm.priceRange}
                </p>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {comm.description}
                </p>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>{comm.availableCount} Imóveis disponíveis</span>
                  <span className="text-emerald-400 font-semibold">Ativo no Portal</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between text-xs">
              <Link
                href={`/condominio/${comm.slug}`}
                target="_blank"
                className="text-slate-400 hover:text-white flex items-center gap-1"
              >
                <span>Ver Página Pública</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button className="text-rose-400 hover:underline font-semibold flex items-center gap-1">
                <Edit className="w-3 h-3" />
                <span>Editar Ficha</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
