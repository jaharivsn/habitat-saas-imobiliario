"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Edit, ExternalLink } from "lucide-react";
import { mockNeighborhoods } from "@/data/mockData";
import { NeighborhoodInfo } from "@/types";

export default function AdminBairrosPage() {
  const [neighborhoods] = useState<NeighborhoodInfo[]>(mockNeighborhoods);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-400">
            Microlocalizações & Bairros Nobres
          </span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">
            Gestão de Bairros
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Controle de valor de metro quadrado por região e páginas de índice para SEO geolocalizado.
          </p>
        </div>

        <button className="bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-semibold uppercase tracking-wider px-4 py-2.5 rounded-sm shadow-subtle flex items-center gap-1.5 transition">
          <Plus className="w-4 h-4" />
          <span>Cadastrar Novo Bairro</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {neighborhoods.map((n) => (
          <div
            key={n.slug}
            className="bg-[#121826] rounded-xl border border-slate-800 overflow-hidden flex flex-col justify-between shadow-subtle"
          >
            <div>
              <div className="relative h-36 overflow-hidden">
                <img
                  src={n.photo}
                  alt={n.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#0A0E17]/90 backdrop-blur-md px-2 py-0.5 rounded-sm text-[9px] font-semibold text-white uppercase tracking-wider border border-white/10">
                  {n.cityName} - {n.state}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-lg text-white">
                    {n.name}
                  </h3>
                  <span className="font-mono text-emerald-400 text-xs font-bold">
                    R$ {n.avgPriceM2.toLocaleString("pt-BR")}/m²
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2">
                  {n.description}
                </p>

                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>{n.availableCount} Imóveis cadastrados</span>
                  <span className="text-rose-400 font-semibold">Publicado</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between text-xs">
              <Link
                href={`/bairro/${n.slug}`}
                target="_blank"
                className="text-slate-400 hover:text-white flex items-center gap-1"
              >
                <span>Ver Landing Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button className="text-rose-400 hover:underline font-semibold flex items-center gap-1">
                <Edit className="w-3 h-3" />
                <span>Editar</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
