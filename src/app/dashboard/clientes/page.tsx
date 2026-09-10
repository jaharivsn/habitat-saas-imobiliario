"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import { mockClients } from "@/data/mockData";
import { Client } from "@/types";
import { formatPrice } from "@/lib/utils";

export default function ClientesPage() {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [search, setSearch] = useState("");

  const filtered = clients.filter((c) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
            Base de Contatos & Investidores
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 mt-0.5">
            Clientes Cadastrados
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Histórico completo de perfil de compra, ticket médio e imóveis visitados.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border border-stone-200/90 shadow-subtle">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nome, e-mail ou telefone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-stone-50/60 border border-stone-200 rounded-sm text-xs focus:outline-none focus:border-navy-950"
          />
        </div>
      </div>

      {/* Clients Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((client) => (
          <div
            key={client.id}
            className="bg-white rounded-xl p-6 border border-stone-200/90 shadow-subtle flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-navy-950">
                    {client.name}
                  </h3>
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-gold-800 bg-gold-50/70 border border-gold-200/60 px-2 py-0.5 rounded-sm">
                    {client.type}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-stone-500 mt-3">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <span className="truncate">{client.email}</span>
                </div>
              </div>

              {/* Preferences */}
              <div className="p-3 bg-stone-50/80 rounded-md border border-stone-100 mt-4 space-y-1 text-xs">
                <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-stone-400 block">
                  Perfil de Busca
                </span>
                <p className="font-semibold text-stone-900">
                  {formatPrice(client.budgetMin)} a {formatPrice(client.budgetMax)}
                </p>
                <p className="text-[11px] text-stone-500">
                  Regiões: {client.desiredRegions.join(", ")}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-400">
                {client.favoritePropertyIds.length} favoritos • {client.visitedPropertyIds.length} visitas
              </span>
              <Link
                href={`/dashboard/clientes/${client.id}`}
                className="text-[11px] font-bold uppercase tracking-wider text-navy-950 hover:text-gold-600 flex items-center gap-1"
              >
                <span>Ficha</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
