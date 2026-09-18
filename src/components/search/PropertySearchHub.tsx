"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  List,
  Map as MapIcon,
  SlidersHorizontal,
  ChevronDown,
  ArrowUpDown,
  Search,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import PropertyCard from "@/components/property/PropertyCard";
import InteractiveMapMock from "@/components/search/InteractiveMapMock";
import AdvancedFilterModal from "@/components/search/AdvancedFilterModal";
import { mockProperties } from "@/data/mockData";
import { Property } from "@/types";

interface PropertySearchHubProps {
  forcedOperation?: "venda" | "aluguel";
  forcedLaunch?: boolean;
  forcedCommercial?: boolean;
  pageTitle?: string;
  pageSubtitle?: string;
}

export default function PropertySearchHub({
  forcedOperation,
  forcedLaunch,
  forcedCommercial,
  pageTitle = "Imóveis Exclusivos",
  pageSubtitle = "Explore nosso portfólio completo de residências e oportunidades imobiliárias",
}: PropertySearchHubProps) {
  const searchParams = useSearchParams();

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [operation, setOperation] = useState<string>(
    forcedOperation || searchParams.get("operacao") || "todos"
  );
  const [propertyType, setPropertyType] = useState<string>(
    searchParams.get("tipo") || (forcedCommercial ? "comercial" : "todos")
  );
  const [city, setCity] = useState<string>("todas");
  const [sortBy, setSortBy] = useState<string>("destaques");
  const [viewMode, setViewMode] = useState<"grid" | "split" | "map">("grid");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedPropertyOnMap, setSelectedPropertyOnMap] = useState<Property | null>(null);

  // Advanced filters state
  const [advancedFilters, setAdvancedFilters] = useState<any>({});

  // Input ref para atalho de teclado "/"
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filtered Properties Logic
  const filteredProperties = useMemo(() => {
    return mockProperties.filter((p) => {
      // Forced route constraints
      if (forcedOperation && p.operation !== forcedOperation) return false;
      if (forcedLaunch && !p.isLaunch) return false;
      if (forcedCommercial && !p.isCommercial) return false;

      // Search term (title, neighborhood, city, communityName, code)
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesTerm =
          p.title.toLowerCase().includes(term) ||
          p.city.toLowerCase().includes(term) ||
          p.neighborhood.toLowerCase().includes(term) ||
          p.code.toLowerCase().includes(term) ||
          (p.communityName && p.communityName.toLowerCase().includes(term));
        if (!matchesTerm) return false;
      }

      // Operation filter
      if (operation !== "todos" && p.operation !== operation) return false;

      // Property type filter
      if (propertyType !== "todos" && p.propertyType !== propertyType) return false;

      // City filter
      if (city !== "todas" && !p.city.toLowerCase().includes(city.toLowerCase()))
        return false;

      // Advanced filters
      if (advancedFilters.minPrice && p.price < Number(advancedFilters.minPrice))
        return false;
      if (advancedFilters.maxPrice && p.price > Number(advancedFilters.maxPrice))
        return false;
      if (
        advancedFilters.bedrooms &&
        advancedFilters.bedrooms !== "qualquer" &&
        p.bedrooms < Number(advancedFilters.bedrooms)
      )
        return false;
      if (
        advancedFilters.bathrooms &&
        advancedFilters.bathrooms !== "qualquer" &&
        p.bathrooms < Number(advancedFilters.bathrooms)
      )
        return false;
      if (
        advancedFilters.parkingSpots &&
        advancedFilters.parkingSpots !== "qualquer" &&
        p.parkingSpots < Number(advancedFilters.parkingSpots)
      )
        return false;
      if (advancedFilters.minArea && p.builtArea < Number(advancedFilters.minArea))
        return false;
      if (advancedFilters.hasPool && !p.hasPool) return false;
      if (advancedFilters.isGatedCommunity && !p.isGatedCommunity) return false;
      if (advancedFilters.isFurnished && !p.isFurnished) return false;
      if (advancedFilters.isWaterfront && !p.isWaterfront) return false;
      if (advancedFilters.isNew && !p.isNew) return false;
      if (advancedFilters.allowsPets && !p.allowsPets) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "destaques") {
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
      if (sortBy === "menor-preco") return a.price - b.price;
      if (sortBy === "maior-preco") return b.price - a.price;
      if (sortBy === "maior-area") return b.builtArea - a.builtArea;
      if (sortBy === "mais-vistos") return b.viewsCount - a.viewsCount;
      if (sortBy === "recentes") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0;
    });
  }, [
    searchTerm,
    operation,
    propertyType,
    city,
    sortBy,
    advancedFilters,
    forcedOperation,
    forcedLaunch,
    forcedCommercial,
  ]);

  const resetFilters = () => {
    setSearchTerm("");
    if (!forcedOperation) setOperation("todos");
    if (!forcedCommercial) setPropertyType("todos");
    setCity("todas");
    setSortBy("destaques");
    setAdvancedFilters({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Top Banner / Breadcrumb */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-stone-400 mb-3 font-medium">
          <span>Início</span>
          <span>/</span>
          <span className="text-stone-800">{pageTitle}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-stone-950 tracking-tight">
          {pageTitle}
        </h1>
        <p className="text-sm text-stone-500 mt-2 max-w-2xl font-light leading-relaxed">{pageSubtitle}</p>
      </div>

      {/* Main Filter Bar */}
      <div className="bg-white p-5 sm:p-6 border border-stone-200 mb-10 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          {/* Keyword Search com atalho de teclado / */}
          <div className="lg:col-span-4 relative flex items-center">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Buscar por cidade, bairro, condomínio ou código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-9 py-3 bg-stone-50/70 border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-stone-950 placeholder:text-stone-400 font-light transition-colors"
            />
            <kbd className="hidden sm:inline-flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-stone-400 bg-stone-200/60 px-1.5 py-0.5 rounded font-mono border border-stone-300/60 pointer-events-none" title="Pressione / para buscar">
              /
            </kbd>
          </div>

          {/* Operation Selector Bespoke */}
          {!forcedOperation && (
            <div className="lg:col-span-2 relative">
              <select
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
                className="w-full py-3 pl-3 pr-8 bg-stone-50/70 border border-stone-200 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-stone-950 appearance-none cursor-pointer font-light transition-colors"
              >
                <option value="todos">Venda & Locação</option>
                <option value="venda">Comprar (Venda)</option>
                <option value="aluguel">Alugar (Locação)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          )}

          {/* Property Type Bespoke */}
          {!forcedCommercial && (
            <div className="lg:col-span-2 relative">
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full py-3 pl-3 pr-8 bg-stone-50/70 border border-stone-200 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-stone-950 appearance-none cursor-pointer font-light transition-colors"
              >
                <option value="todos">Todos os Tipos</option>
                <option value="casa">Casas & Mansões</option>
                <option value="apartamento">Apartamentos</option>
                <option value="cobertura">Coberturas</option>
                <option value="condominio">Condomínio Fechado</option>
                <option value="comercial">Comercial</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          )}

          {/* City Bespoke */}
          <div className="lg:col-span-2 relative">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full py-3 pl-3 pr-8 bg-stone-50/70 border border-stone-200 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-stone-950 appearance-none cursor-pointer font-light transition-colors"
            >
              <option value="todas">Todas as Cidades</option>
              <option value="São Paulo">São Paulo</option>
              <option value="Rio de Janeiro">Rio de Janeiro</option>
              <option value="Porto Feliz">Porto Feliz (Boa Vista)</option>
              <option value="Barueri">Barueri (Alphaville)</option>
              <option value="Florianópolis">Florianópolis</option>
              <option value="Winter Garden">Winter Garden (EUA)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Advanced Filter Button */}
          <div className="lg:col-span-2 flex gap-2">
            <button
              type="button"
              onClick={() => setIsFilterModalOpen(true)}
              className="flex-1 py-3 px-3 bg-stone-100 hover:bg-stone-200 text-stone-900 font-medium text-xs tracking-[0.16em] uppercase flex items-center justify-center gap-2 transition-colors border border-stone-200"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
              <span>Filtros (+12)</span>
            </button>

            {(searchTerm || operation !== "todos" || propertyType !== "todos" || city !== "todas" || Object.keys(advancedFilters).length > 0) && (
              <button
                type="button"
                onClick={resetFilters}
                className="p-3 text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors border border-transparent hover:border-stone-200"
                title="Limpar todos os filtros"
                aria-label="Limpar todos os filtros"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Chips de Filtros Ativos */}
        {(searchTerm || operation !== "todos" || propertyType !== "todos" || city !== "todas" || Object.keys(advancedFilters).length > 0) && (
          <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium">Filtros ativos:</span>
            {searchTerm && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-100 text-stone-800 text-[11px] rounded-sm border border-stone-200">
                "{searchTerm}"
                <button onClick={() => setSearchTerm("")} className="hover:text-stone-950 p-0.5" aria-label="Remover busca">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {operation !== "todos" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-100 text-stone-800 text-[11px] rounded-sm border border-stone-200">
                {operation === "venda" ? "Venda" : "Locação"}
                <button onClick={() => setOperation("todos")} className="hover:text-stone-950 p-0.5" aria-label="Remover operação">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {propertyType !== "todos" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-100 text-stone-800 text-[11px] rounded-sm capitalize border border-stone-200">
                {propertyType}
                <button onClick={() => setPropertyType("todos")} className="hover:text-stone-950 p-0.5" aria-label="Remover tipo">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {city !== "todas" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-100 text-stone-800 text-[11px] rounded-sm border border-stone-200">
                {city}
                <button onClick={() => setCity("todas")} className="hover:text-stone-950 p-0.5" aria-label="Remover cidade">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-[11px] text-stone-500 hover:text-stone-950 underline underline-offset-2 ml-1 cursor-pointer"
            >
              Limpar todos
            </button>
          </div>
        )}
      </div>

      {/* Results Header: Count, Sort, View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-200/90">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-navy-950">
            {filteredProperties.length} imóveis encontrados
          </span>
          {sortBy === "destaques" && (
            <span className="text-[10px] text-gold-800 bg-gold-50/90 border border-gold-300/60 px-2 py-0.5 rounded-sm font-bold uppercase tracking-[0.16em] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-gold-600" />
              Curadoria Exclusiva
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Sort Dropdown Bespoke */}
          <div className="flex items-center gap-1.5 text-xs text-stone-600 relative">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span className="hidden sm:inline">Ordenar:</span>
            <div className="relative inline-flex items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-semibold text-stone-800 focus:outline-none appearance-none pr-5 cursor-pointer"
              >
                <option value="destaques">Destaques da Curadoria</option>
                <option value="recentes">Mais recentes</option>
                <option value="menor-preco">Menor preço</option>
                <option value="maior-preco">Maior preço</option>
                <option value="maior-area">Maior área útil</option>
                <option value="mais-vistos">Mais visualizados</option>
              </select>
              <ChevronDown className="w-3 h-3 text-stone-500 pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-stone-100/90 p-1 rounded-lg border border-stone-200/80">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition ${
                viewMode === "grid"
                  ? "bg-white text-navy-950 shadow-subtle"
                  : "text-stone-500 hover:text-stone-800"
              }`}
              title="Visualização em Grade"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("split")}
              className={`hidden md:block p-1.5 rounded-md transition ${
                viewMode === "split"
                  ? "bg-white text-navy-950 shadow-subtle"
                  : "text-stone-500 hover:text-stone-800"
              }`}
              title="Lista dividida com Mapa"
            >
              <span className="text-[11px] font-bold uppercase tracking-wider px-1">Dividido</span>
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`p-1.5 rounded-md transition ${
                viewMode === "map"
                  ? "bg-white text-navy-950 shadow-subtle"
                  : "text-stone-500 hover:text-stone-800"
              }`}
              title="Visualização em Mapa"
            >
              <MapIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main View Area */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-stone-200/90 shadow-subtle p-8">
          <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-stone-400" />
          </div>
          <h3 className="font-serif font-bold text-xl text-navy-950">
            Nenhum imóvel encontrado
          </h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto mt-2">
            Não encontramos resultados para os filtros selecionados. Tente ampliar os termos de busca ou remover alguns filtros.
          </p>
          <button
            onClick={resetFilters}
            className="mt-6 inline-flex items-center gap-2 bg-navy-950 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg shadow-subtle hover:bg-navy-900 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Redefinir Filtros</span>
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : viewMode === "split" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left properties list */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[850px] overflow-y-auto pr-2">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* Right sticky map */}
          <div className="lg:col-span-6 sticky top-28 h-[850px]">
            <InteractiveMapMock
              properties={filteredProperties}
              selectedProperty={selectedPropertyOnMap}
              onSelectProperty={(p) => setSelectedPropertyOnMap(p)}
            />
          </div>
        </div>
      ) : (
        /* Full Map View */
        <div className="h-[750px] w-full">
          <InteractiveMapMock
            properties={filteredProperties}
            selectedProperty={selectedPropertyOnMap}
            onSelectProperty={(p) => setSelectedPropertyOnMap(p)}
          />
        </div>
      )}

      {/* Advanced Filter Modal */}
      <AdvancedFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={(filters) => setAdvancedFilters(filters)}
      />
    </div>
  );
}
