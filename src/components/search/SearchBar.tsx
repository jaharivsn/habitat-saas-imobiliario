"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";

interface SearchBarProps {
  initialQuery?: string;
  initialOperation?: "venda" | "aluguel" | "todos";
  onOpenAdvancedFilters?: () => void;
  variant?: "hero" | "compact";
}

export default function SearchBar({
  initialQuery = "",
  initialOperation = "venda",
  onOpenAdvancedFilters,
  variant = "hero",
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [operation, setOperation] = useState<"venda" | "aluguel" | "todos">(
    initialOperation === "aluguel" ? "aluguel" : initialOperation === "todos" ? "todos" : "venda"
  );
  const [propertyType, setPropertyType] = useState<string>("todos");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (operation !== "todos") params.set("operacao", operation);
    if (propertyType !== "todos") params.set("tipo", propertyType);

    router.push(`/imoveis?${params.toString()}`);
  };

  if (variant === "compact") {
    return (
      <form onSubmit={handleSearch} className="flex items-center gap-2 w-full">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cidade, condomínio, bairro ou código..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 transition-colors"
          />
        </div>

        {onOpenAdvancedFilters && (
          <button
            type="button"
            onClick={onOpenAdvancedFilters}
            className="p-2.5 bg-white border border-stone-200 hover:border-stone-900 text-stone-700 flex items-center justify-center transition-colors"
            title="Filtros detalhados"
            aria-label="Filtros detalhados"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        )}

        <button
          type="submit"
          className="bg-stone-950 hover:bg-stone-800 text-white text-[11px] font-medium uppercase tracking-[0.18em] px-5 py-2.5 transition-colors"
        >
          Buscar
        </button>
      </form>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white/95 backdrop-blur-md border border-stone-200 shadow-luxury p-5 sm:p-6">
      {/* Abas Simples: Comprar | Alugar */}
      <div className="flex items-center gap-8 mb-5 border-b border-stone-200">
        <button
          type="button"
          onClick={() => setOperation("venda")}
          className={`pb-3 text-xs uppercase tracking-[0.2em] transition-colors border-b-2 -mb-px ${
            operation === "venda"
              ? "border-stone-950 text-stone-950 font-semibold"
              : "border-transparent text-stone-400 hover:text-stone-700 font-medium"
          }`}
        >
          Comprar
        </button>
        <button
          type="button"
          onClick={() => setOperation("aluguel")}
          className={`pb-3 text-xs uppercase tracking-[0.2em] transition-colors border-b-2 -mb-px ${
            operation === "aluguel"
              ? "border-stone-950 text-stone-950 font-semibold"
              : "border-transparent text-stone-400 hover:text-stone-700 font-medium"
          }`}
        >
          Alugar
        </button>
      </div>

      {/* Input minimalista em linha */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Input Textual */}
        <div className="md:col-span-7 relative">
          <input
            type="text"
            placeholder="Localização, condomínio ou estilo..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-3.5 py-3 bg-stone-50/70 border border-stone-200 focus:bg-white focus:border-stone-950 text-sm text-stone-900 placeholder:text-stone-400 transition-colors focus:outline-none"
          />
        </div>

        {/* Tipologia Dropdown */}
        <div className="md:col-span-3">
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full px-3.5 py-3 bg-stone-50/70 border border-stone-200 focus:bg-white focus:border-stone-950 text-sm text-stone-700 transition-colors focus:outline-none"
          >
            <option value="todos">Tipologias</option>
            <option value="casa">Casas & Mansões</option>
            <option value="apartamento">Apartamentos</option>
            <option value="cobertura">Coberturas</option>
            <option value="condominio">Condomínios</option>
            <option value="comercial">Corporativo</option>
          </select>
        </div>

        {/* Botão de Busca */}
        <div className="md:col-span-2 flex items-center gap-2">
          {onOpenAdvancedFilters && (
            <button
              type="button"
              onClick={onOpenAdvancedFilters}
              className="p-3 bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors border border-stone-200"
              title="Filtros detalhados"
              aria-label="Filtros detalhados"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          )}

          <button
            type="submit"
            className="w-full bg-stone-950 hover:bg-stone-800 text-white text-xs font-medium uppercase tracking-[0.2em] py-3.5 px-4 transition-colors"
          >
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
}
