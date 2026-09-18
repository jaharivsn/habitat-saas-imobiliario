"use client";

import { useState } from "react";
import { X, RotateCcw, Check } from "lucide-react";

interface FilterState {
  operation: string;
  propertyType: string;
  city: string;
  neighborhood: string;
  condominium: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
  parkingSpots: string;
  minArea: string;
  maxArea: string;
  yearBuilt: string;
  hasPool: boolean;
  isGatedCommunity: boolean;
  isFurnished: boolean;
  isWaterfront: boolean;
  isNew: boolean;
  isLaunch: boolean;
  allowsPets: boolean;
  isCommercial: boolean;
}

const initialFilters: FilterState = {
  operation: "todos",
  propertyType: "todos",
  city: "todas",
  neighborhood: "",
  condominium: "",
  minPrice: "",
  maxPrice: "",
  bedrooms: "qualquer",
  bathrooms: "qualquer",
  parkingSpots: "qualquer",
  minArea: "",
  maxArea: "",
  yearBuilt: "",
  hasPool: false,
  isGatedCommunity: false,
  isFurnished: false,
  isWaterfront: false,
  isNew: false,
  isLaunch: false,
  allowsPets: false,
  isCommercial: false,
};

interface AdvancedFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
}

export default function AdvancedFilterModal({
  isOpen,
  onClose,
  onApplyFilters,
}: AdvancedFilterModalProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  if (!isOpen) return null;

  const handleReset = () => {
    setFilters(initialFilters);
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-luxury border border-stone-200/90 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200/90 flex items-center justify-between">
          <div>
            <h2 className="font-serif font-bold text-xl text-navy-950 tracking-tight">
              Filtros Avançados
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Refine os critérios exatos para encontrar a residência ideal
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200/80 text-stone-600 flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
            aria-label="Fechar modal de filtros"
            title="Fechar filtros avançados"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Operation & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-stone-700 uppercase tracking-[0.16em] mb-2">
                Operação
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["todos", "venda", "aluguel"].map((op) => (
                  <button
                    key={op}
                    type="button"
                    onClick={() => setFilters({ ...filters, operation: op })}
                    className={`py-2 text-xs font-semibold rounded-lg border capitalize transition-colors ${
                      filters.operation === op
                        ? "bg-navy-950 text-white border-navy-950 shadow-sm"
                        : "bg-[#FAF9F6] text-stone-700 border-stone-200/90 hover:bg-stone-100"
                    }`}
                  >
                    {op === "todos" ? "Todas" : op}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-stone-700 uppercase tracking-[0.16em] mb-2">
                Tipo de Imóvel
              </label>
              <select
                value={filters.propertyType}
                onChange={(e) =>
                  setFilters({ ...filters, propertyType: e.target.value })
                }
                className="w-full py-2.5 px-3 bg-[#FAF9F6] border border-stone-200/90 rounded-lg text-xs text-stone-800 focus:outline-none cursor-pointer"
              >
                <option value="todos">Todos os tipos</option>
                <option value="casa">Casa</option>
                <option value="apartamento">Apartamento</option>
                <option value="cobertura">Cobertura / Penthouse</option>
                <option value="condominio">Condomínio Fechado</option>
                <option value="comercial">Comercial</option>
              </select>
            </div>
          </div>

          {/* Location details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Cidade
              </label>
              <select
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="w-full p-2.5 bg-[#FAF9F6] border border-stone-200/90 rounded-lg text-xs text-stone-800 focus:outline-none cursor-pointer"
              >
                <option value="todas">Todas as cidades</option>
                <option value="São Paulo">São Paulo</option>
                <option value="Rio de Janeiro">Rio de Janeiro</option>
                <option value="Porto Feliz">Porto Feliz (Boa Vista)</option>
                <option value="Barueri">Barueri (Alphaville)</option>
                <option value="Florianópolis">Florianópolis</option>
                <option value="Winter Garden">Winter Garden (Flórida)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Bairro
              </label>
              <input
                type="text"
                placeholder="Ex: Jardins, Leblon..."
                value={filters.neighborhood}
                onChange={(e) =>
                  setFilters({ ...filters, neighborhood: e.target.value })
                }
                className="w-full p-2.5 bg-[#FAF9F6] border border-stone-200/90 rounded-lg text-xs text-stone-900 focus:outline-none placeholder:text-stone-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Condomínio
              </label>
              <input
                type="text"
                placeholder="Ex: Boa Vista, Alphaville..."
                value={filters.condominium}
                onChange={(e) =>
                  setFilters({ ...filters, condominium: e.target.value })
                }
                className="w-full p-2.5 bg-[#FAF9F6] border border-stone-200/90 rounded-lg text-xs text-stone-900 focus:outline-none placeholder:text-stone-400"
              />
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-[10px] font-bold text-stone-700 uppercase tracking-[0.16em] mb-2">
              Faixa de Preço (R$)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Preço Mínimo"
                value={filters.minPrice}
                onChange={(e) =>
                  setFilters({ ...filters, minPrice: e.target.value })
                }
                className="w-full p-2.5 bg-[#FAF9F6] border border-stone-200/90 rounded-lg text-xs text-stone-900 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Preço Máximo"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters({ ...filters, maxPrice: e.target.value })
                }
                className="w-full p-2.5 bg-[#FAF9F6] border border-stone-200/90 rounded-lg text-xs text-stone-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Rooms, Baths, Parking */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Quartos
              </label>
              <select
                value={filters.bedrooms}
                onChange={(e) =>
                  setFilters({ ...filters, bedrooms: e.target.value })
                }
                className="w-full p-2.5 bg-[#FAF9F6] border border-stone-200/90 rounded-lg text-xs text-stone-800 focus:outline-none cursor-pointer"
              >
                <option value="qualquer">Qualquer</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5 ou mais</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Banheiros
              </label>
              <select
                value={filters.bathrooms}
                onChange={(e) =>
                  setFilters({ ...filters, bathrooms: e.target.value })
                }
                className="w-full p-2.5 bg-[#FAF9F6] border border-stone-200/90 rounded-lg text-xs text-stone-800 focus:outline-none cursor-pointer"
              >
                <option value="qualquer">Qualquer</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="6">6 ou mais</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Vagas de Garagem
              </label>
              <select
                value={filters.parkingSpots}
                onChange={(e) =>
                  setFilters({ ...filters, parkingSpots: e.target.value })
                }
                className="w-full p-2.5 bg-[#FAF9F6] border border-stone-200/90 rounded-lg text-xs text-stone-800 focus:outline-none cursor-pointer"
              >
                <option value="qualquer">Qualquer</option>
                <option value="2">2+</option>
                <option value="4">4+</option>
                <option value="6">6 ou mais</option>
              </select>
            </div>
          </div>

          {/* Area (m²) */}
          <div>
            <label className="block text-[10px] font-bold text-stone-700 uppercase tracking-[0.16em] mb-2">
              Área Construída (m²)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Área mínima (m²)"
                value={filters.minArea}
                onChange={(e) =>
                  setFilters({ ...filters, minArea: e.target.value })
                }
                className="w-full p-2.5 bg-[#FAF9F6] border border-stone-200/90 rounded-lg text-xs text-stone-900 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Área máxima (m²)"
                value={filters.maxArea}
                onChange={(e) =>
                  setFilters({ ...filters, maxArea: e.target.value })
                }
                className="w-full p-2.5 bg-[#FAF9F6] border border-stone-200/90 rounded-lg text-xs text-stone-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Checkbox Amenities */}
          <div>
            <label className="block text-[10px] font-bold text-stone-700 uppercase tracking-[0.16em] mb-3">
              Comodidades & Características
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              {[
                { key: "hasPool", label: "Piscina Privativa" },
                { key: "isGatedCommunity", label: "Condomínio Fechado" },
                { key: "isFurnished", label: "Mobiliado" },
                { key: "isWaterfront", label: "Frente para Água / Mar" },
                { key: "isNew", label: "Imóvel Novo" },
                { key: "isLaunch", label: "Lançamento na Planta" },
                { key: "allowsPets", label: "Aceita Animais (Pets)" },
                { key: "isCommercial", label: "Imóvel Comercial" },
              ].map(({ key, label }) => {
                const checked = (filters as any)[key] as boolean;
                return (
                  <label
                    key={key}
                    className={`flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition-colors ${
                      checked
                        ? "bg-[#FAF9F6] border-navy-950 text-navy-950 font-semibold"
                        : "bg-white border-stone-200/90 text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) =>
                        setFilters({ ...filters, [key]: e.target.checked })
                      }
                      className="rounded text-navy-950 focus:ring-navy-950 border-stone-300"
                    />
                    <span>{label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#FAF9F6] border-t border-stone-200/90 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-wider"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Limpar filtros</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded-lg transition-colors uppercase tracking-wider"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="px-6 py-2.5 bg-navy-950 hover:bg-navy-900 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-subtle transition-colors"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
