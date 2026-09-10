"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CommunityCard from "@/components/community/CommunityCard";
import { mockCommunities } from "@/data/mockData";
import { Search, Shield, Trees, MapPin } from "lucide-react";

export default function CondominiosPage() {
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("todas");

  const filtered = mockCommunities.filter((c) => {
    if (cityFilter !== "todas" && c.city !== cityFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 pb-20">
        {/* Hero Section */}
        <div className="bg-navy-950 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Curadoria Exclusiva
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-2 leading-tight">
              Condomínios Fechados de Alto Padrão
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
              Reserva de privacidade, campos de golfe, hípicas e segurança internacional para sua família viver com total liberdade e qualidade de vida.
            </p>

            {/* Quick Filters */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-12 gap-3 max-w-3xl">
              <div className="sm:col-span-8 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar por nome do condomínio ou cidade..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 rounded-xl text-sm focus:outline-none"
                />
              </div>

              <div className="sm:col-span-4">
                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="w-full py-3 px-3.5 bg-white text-slate-900 rounded-xl text-sm focus:outline-none"
                >
                  <option value="todas">Todas as Regiões</option>
                  <option value="Porto Feliz">Porto Feliz (Boa Vista)</option>
                  <option value="Barueri">Barueri (Alphaville)</option>
                  <option value="Bragança Paulista">Bragança Paulista (Baroneza)</option>
                  <option value="Winter Garden">Winter Garden (Flórida)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Community Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200">
            <p className="text-sm font-bold text-navy-950">
              {filtered.length} condomínios encontrados
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                Segurança 24h
              </span>
              <span className="flex items-center gap-1">
                <Trees className="w-3.5 h-3.5 text-emerald-600" />
                Áreas Preservadas
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
