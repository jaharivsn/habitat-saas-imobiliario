"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BrokerCard from "@/components/broker/BrokerCard";
import { mockBrokers } from "@/data/mockData";
import { ShieldCheck } from "lucide-react";

export default function CorretoresPage() {
  const [nameQuery, setNameQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("todas");
  const [specialtyQuery, setSpecialtyQuery] = useState("todas");
  const [languageQuery, setLanguageQuery] = useState("todos");

  const filteredBrokers = mockBrokers.filter((b) => {
    if (nameQuery.trim() && !b.name.toLowerCase().includes(nameQuery.toLowerCase())) {
      return false;
    }
    if (
      cityQuery !== "todas" &&
      !b.regions.some((r) => r.toLowerCase().includes(cityQuery.toLowerCase()))
    ) {
      return false;
    }
    if (
      specialtyQuery !== "todas" &&
      !b.specialties.some((s) => s.toLowerCase().includes(specialtyQuery.toLowerCase()))
    ) {
      return false;
    }
    if (
      languageQuery !== "todos" &&
      !b.languages.some((l) => l.toLowerCase().includes(languageQuery.toLowerCase()))
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Header />

      <main className="flex-1 pb-20">
        {/* Header Hero */}
        <div className="bg-navy-950 text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-white/10 border border-white/15 text-gold-300 text-[10px] font-semibold uppercase tracking-[0.2em] mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Profissionais Credenciados</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              Encontre um Corretor de Elite
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
              Conselheiros imobiliários com rigor ético, discrição absoluta e profundo conhecimento dos mercados mais sofisticados.
            </p>

            {/* Filter Bar */}
            <div className="mt-8 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-subtle grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nome do corretor..."
                  value={nameQuery}
                  onChange={(e) => setNameQuery(e.target.value)}
                  className="w-full p-2.5 bg-white text-slate-900 rounded-sm focus:outline-none border border-stone-200"
                />
              </div>

              <div>
                <select
                  value={cityQuery}
                  onChange={(e) => setCityQuery(e.target.value)}
                  className="w-full p-2.5 bg-white text-slate-900 rounded-sm focus:outline-none border border-stone-200"
                >
                  <option value="todas">Região de Atuação</option>
                  <option value="Jardins">Jardins / Itaim Bibi (SP)</option>
                  <option value="Leblon">Leblon / Ipanema (RJ)</option>
                  <option value="Boa Vista">Fazenda Boa Vista</option>
                  <option value="Alphaville">Alphaville</option>
                  <option value="Jurerê">Jurerê Internacional</option>
                  <option value="Winter Garden">Winter Garden (Flórida)</option>
                </select>
              </div>

              <div>
                <select
                  value={specialtyQuery}
                  onChange={(e) => setSpecialtyQuery(e.target.value)}
                  className="w-full p-2.5 bg-white text-slate-900 rounded-sm focus:outline-none border border-stone-200"
                >
                  <option value="todas">Especialidade</option>
                  <option value="Condomínios de Luxo">Condomínios de Luxo</option>
                  <option value="Coberturas">Coberturas / Penthouses</option>
                  <option value="Frente Mar">Frente Mar / Náutico</option>
                  <option value="Imóveis Comerciais">Imóveis Corporativos</option>
                  <option value="Investimentos Internacionais">Investimento em Dólar</option>
                </select>
              </div>

              <div>
                <select
                  value={languageQuery}
                  onChange={(e) => setLanguageQuery(e.target.value)}
                  className="w-full p-2.5 bg-white text-slate-900 rounded-sm focus:outline-none border border-stone-200"
                >
                  <option value="todos">Idiomas Falados</option>
                  <option value="Português">Português</option>
                  <option value="English">English</option>
                  <option value="Español">Español</option>
                  <option value="Français">Français</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Brokers Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200">
            <p className="text-sm font-bold text-navy-950">
              {filteredBrokers.length} corretores certificados disponíveis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBrokers.map((broker) => (
              <BrokerCard key={broker.id} broker={broker} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
