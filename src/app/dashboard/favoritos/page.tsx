"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { mockProperties } from "@/data/mockData";
import PropertyCard from "@/components/property/PropertyCard";
import { Property } from "@/types";

export default function DashboardFavoritosPage() {
  const [favoriteProperties] = useState<Property[]>(mockProperties.slice(0, 4));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
            Curadoria Selecionada
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 mt-0.5">
            Imóveis Favoritos & Acervo de Apresentação
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Imóveis marcados para compartilhar com clientes compradores ou apresentar em reuniões.
          </p>
        </div>

        <Link
          href="/imoveis"
          className="bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow flex items-center gap-1.5 transition"
        >
          <Plus className="w-4 h-4 text-gold-400" />
          <span>Explorar Mais Imóveis</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteProperties.map((prop) => (
          <PropertyCard key={prop.id} property={prop} />
        ))}
      </div>
    </div>
  );
}
