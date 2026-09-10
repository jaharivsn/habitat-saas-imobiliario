"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, MapPin, X, ArrowRight } from "lucide-react";
import FloatingBadge from "./FloatingBadge";

const SEARCH_TABS = [
  { id: "sale", label: "Comprar", queryParam: "venda" },
  { id: "rent", label: "Alugar", queryParam: "aluguel" },
  { id: "development", label: "Lançamentos", queryParam: "lancamentos" },
  { id: "investment", label: "Investir", queryParam: "investir" },
] as const;

const QUICK_CURATIONS = [
  { label: "Fazenda Boa Vista", query: "Fazenda Boa Vista", type: "condominio" },
  { label: "Penthouses Jardins", query: "Jardins", type: "bairro" },
  { label: "Alphaville Residencial", query: "Alphaville", type: "condominio" },
  { label: "Frente Mar & Litoral", query: "Litoral", type: "regiao" },
];

export default function ZeroGravitySearch() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"sale" | "rent" | "development" | "investment">("sale");
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState("todos");
  const [priceRange, setPriceRange] = useState("todos");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const activeObj = SEARCH_TABS.find((t) => t.id === activeTab);
    const params = new URLSearchParams();

    if (activeObj) params.set("operacao", activeObj.queryParam);
    if (searchQuery.trim()) params.set("busca", searchQuery.trim());
    if (propertyType !== "todos") params.set("tipo", propertyType);
    if (priceRange !== "todos") params.set("faixaPreco", priceRange);

    router.push(`/imoveis?${params.toString()}`);
  };

  const handleCurationClick = (curation: typeof QUICK_CURATIONS[0]) => {
    setSearchQuery(curation.query);
    const activeObj = SEARCH_TABS.find((t) => t.id === activeTab);
    const params = new URLSearchParams();
    if (activeObj) params.set("operacao", activeObj.queryParam);
    params.set("busca", curation.query);
    router.push(`/imoveis?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Tab Navigation Pill */}
      <div className="flex items-center justify-center mb-4">
        <div className="relative inline-flex p-1 bg-white/90 backdrop-blur-md rounded-full border border-stone-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          {SEARCH_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative z-10 px-6 py-2 text-xs font-medium tracking-wider uppercase transition-colors rounded-full ${
                  isActive ? "text-white" : "text-stone-600 hover:text-stone-950"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSearchTab"
                    className="absolute inset-0 bg-navy-950 rounded-full"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Monolithic Search Card */}
      <form
        onSubmit={handleSearch}
        className="relative bg-white/95 backdrop-blur-md rounded-2xl border border-stone-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-3 md:p-3.5 transition-all focus-within:border-navy-900 focus-within:shadow-[0_12px_40px_rgba(10,17,40,0.08)]"
      >
        <div className="flex flex-col md:flex-row items-stretch gap-2.5">
          {/* Main Query Input */}
          <div className="relative flex-1 flex items-center bg-stone-50/80 rounded-xl px-4 py-3 border border-transparent focus-within:border-stone-300 focus-within:bg-white transition-all">
            <MapPin className="w-4 h-4 text-stone-400 mr-3 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cidade, bairro, condomínio fechado ou código..."
              className="w-full bg-transparent text-sm text-slate-900 placeholder-stone-400 focus:outline-none font-light tracking-wide"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Inline Quick Selects (Hidden on small screens, expanded on md) */}
          <div className="hidden sm:flex items-center gap-2">
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="bg-stone-50/80 border border-stone-200/70 text-xs font-normal text-slate-700 rounded-xl px-3.5 py-3 tracking-wide focus:outline-none focus:border-stone-400 cursor-pointer"
            >
              <option value="todos">Todos os tipos</option>
              <option value="casa">Casas em Condomínio</option>
              <option value="apartamento">Apartamentos</option>
              <option value="cobertura">Coberturas</option>
              <option value="terreno">Terrenos / Lotes</option>
            </select>

            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`flex items-center gap-1.5 px-3.5 py-3 rounded-xl border text-xs font-medium tracking-wide transition-colors ${
                showAdvanced
                  ? "bg-navy-950 text-white border-navy-950"
                  : "bg-stone-50/80 text-stone-600 border-stone-200/70 hover:bg-white hover:text-slate-900"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filtros</span>
            </button>
          </div>

          {/* Submit Action Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 450, damping: 25 }}
            className="flex items-center justify-center gap-2 bg-navy-950 text-white px-7 py-3 rounded-xl text-xs font-medium tracking-wider uppercase hover:bg-navy-900 transition-colors shadow-sm"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Pesquisar</span>
          </motion.button>
        </div>

        {/* Animated Advanced Drawer */}
        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden border-t border-stone-100 mt-3 pt-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-1">
                <div>
                  <label className="block text-[10px] font-medium tracking-wider uppercase text-stone-500 mb-1.5">
                    Faixa de Valor
                  </label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full bg-stone-50 text-xs text-slate-800 border border-stone-200 rounded-lg px-3 py-2 focus:outline-none"
                  >
                    <option value="todos">Qualquer valor</option>
                    <option value="ate-3m">Até R$ 3.000.000</option>
                    <option value="3m-8m">R$ 3M - R$ 8M</option>
                    <option value="8m-15m">R$ 8M - R$ 15M</option>
                    <option value="acima-15m">Acima de R$ 15.000.000</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-medium tracking-wider uppercase text-stone-500 mb-1.5">
                    Quartos / Suítes
                  </label>
                  <select className="w-full bg-stone-50 text-xs text-slate-800 border border-stone-200 rounded-lg px-3 py-2 focus:outline-none">
                    <option value="">Indiferente</option>
                    <option value="3">3+ suítes</option>
                    <option value="4">4+ suítes</option>
                    <option value="5">5+ suítes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-medium tracking-wider uppercase text-stone-500 mb-1.5">
                    Atributos Singulares
                  </label>
                  <div className="flex items-center gap-3 pt-2 text-xs text-stone-600">
                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" className="rounded border-stone-300 text-navy-950 focus:ring-0" />
                      <span>Piscina</span>
                    </label>
                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" className="rounded border-stone-300 text-navy-950 focus:ring-0" />
                      <span>Vista Livre</span>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Floating Micro-chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
        <span className="text-[11px] font-medium tracking-wider uppercase text-stone-400 mr-1">
          Sugestões:
        </span>
        {QUICK_CURATIONS.map((curation) => (
          <FloatingBadge
            key={curation.label}
            variant="mineral"
            size="sm"
            onClick={() => handleCurationClick(curation)}
            className="cursor-pointer hover:border-navy-400"
          >
            <span>{curation.label}</span>
            <ArrowRight className="w-2.5 h-2.5 text-stone-400" />
          </FloatingBadge>
        ))}
      </div>
    </div>
  );
}
