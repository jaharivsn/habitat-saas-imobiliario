"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { mockProperties } from "@/data/mockData";
import { Property } from "@/types";
import { formatPrice } from "@/lib/utils";
import { GitCompare, X, Check, ArrowRight } from "lucide-react";

export default function CompararPage() {
  // Pre-select the first 3 properties for rich instant preview
  const [selectedProps, setSelectedProps] = useState<Property[]>(
    mockProperties.slice(0, 3)
  );

  const removeProperty = (id: string) => {
    setSelectedProps((prev) => prev.filter((p) => p.id !== id));
  };

  const addProperty = (prop: Property) => {
    if (selectedProps.length < 4 && !selectedProps.some((p) => p.id === prop.id)) {
      setSelectedProps((prev) => [...prev, prop]);
    }
  };

  const availableToAdd = mockProperties.filter(
    (p) => !selectedProps.some((sp) => sp.id === p.id)
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 pb-20">
        <div className="bg-white border-b border-slate-200/80 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
              <Link href="/favoritos" className="hover:text-slate-700">Favoritos</Link>
              <span>/</span>
              <span className="text-slate-700 font-semibold">Comparador Lado a Lado</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-navy-950 flex items-center gap-2">
              <GitCompare className="w-6 h-6 text-gold-600" />
              Comparador de Imóveis
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Compare métricas chave, metragens, taxas e custos por m² para tomar a melhor decisão de investimento.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          {selectedProps.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-stone-200/90 shadow-subtle max-w-md mx-auto">
              <p className="text-slate-600 text-sm font-light">Selecione ao menos 1 imóvel para comparar.</p>
              <button
                onClick={() => setSelectedProps(mockProperties.slice(0, 2))}
                className="mt-4 bg-navy-950 hover:bg-gold-600 hover:text-navy-950 text-white text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-sm shadow-subtle transition-all duration-300"
              >
                Carregar exemplos
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto pb-6">
              <div className="min-w-[760px] bg-white rounded-xl border border-stone-200/90 shadow-subtle overflow-hidden">
                {/* Table Header: Photo & Title */}
                <div className="grid grid-cols-4 border-b border-stone-200 bg-stone-50/70 p-6 items-start gap-4">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 pt-4">
                    Imóvel
                  </div>

                  {selectedProps.map((prop) => (
                    <div key={prop.id} className="relative group space-y-2">
                      <button
                        onClick={() => removeProperty(prop.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-stone-200 hover:bg-rose-600 hover:text-white flex items-center justify-center text-xs transition z-10 shadow-sm"
                        title="Remover da comparação"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <img
                        src={prop.photos[0]}
                        alt={prop.title}
                        className="w-full h-36 rounded-lg object-cover shadow-subtle border border-stone-200/80"
                      />

                      <span className="text-[10px] font-semibold uppercase tracking-wider text-gold-700 block">
                        {prop.neighborhood}, {prop.city}
                      </span>
                      <h4 className="font-serif font-bold text-sm text-navy-950 line-clamp-2">
                        {prop.title}
                      </h4>
                      <div className="font-serif font-bold text-base text-navy-950">
                        {formatPrice(prop.price, prop.operation)}
                      </div>
                      <Link
                        href={`/imovel/${prop.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-navy-900 hover:text-gold-600"
                      >
                        <span>Ver anúncio</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  ))}

                  {selectedProps.length < 3 && (
                    <div className="border border-dashed border-stone-300 rounded-xl h-48 flex flex-col items-center justify-center text-center p-4">
                      <span className="text-xs text-slate-400 mb-2">Adicionar outro imóvel</span>
                      {availableToAdd[0] && (
                        <button
                          onClick={() => addProperty(availableToAdd[0])}
                          className="px-3 py-1.5 bg-stone-100 hover:bg-navy-900 hover:text-white rounded-sm text-[11px] font-semibold tracking-wider uppercase text-slate-700 transition"
                        >
                          + {availableToAdd[0].code}
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Comparison Rows */}
                <div className="divide-y divide-slate-100 text-xs">
                  {/* Tipo & Operação */}
                  <div className="grid grid-cols-4 p-4 hover:bg-slate-50 transition">
                    <span className="font-semibold text-slate-500">Operação</span>
                    {selectedProps.map((p) => (
                      <span key={p.id} className="capitalize font-medium text-slate-800">
                        {p.operation} • {p.propertyType}
                      </span>
                    ))}
                  </div>

                  {/* Área Útil */}
                  <div className="grid grid-cols-4 p-4 hover:bg-slate-50 transition">
                    <span className="font-semibold text-slate-500">Área Útil</span>
                    {selectedProps.map((p) => (
                      <span key={p.id} className="font-bold text-slate-900">
                        {p.builtArea} m²
                      </span>
                    ))}
                  </div>

                  {/* Valor por m² */}
                  <div className="grid grid-cols-4 p-4 hover:bg-slate-50 transition">
                    <span className="font-semibold text-slate-500">Preço / m²</span>
                    {selectedProps.map((p) => (
                      <span key={p.id} className="font-bold text-navy-900">
                        R$ {Math.round(p.price / p.builtArea).toLocaleString("pt-BR")}/m²
                      </span>
                    ))}
                  </div>

                  {/* Quartos & Suítes */}
                  <div className="grid grid-cols-4 p-4 hover:bg-slate-50 transition">
                    <span className="font-semibold text-slate-500">Dormitórios</span>
                    {selectedProps.map((p) => (
                      <span key={p.id} className="text-slate-800">
                        {p.bedrooms} quartos ({p.suites} suítes)
                      </span>
                    ))}
                  </div>

                  {/* Vagas */}
                  <div className="grid grid-cols-4 p-4 hover:bg-slate-50 transition">
                    <span className="font-semibold text-slate-500">Vagas de Garagem</span>
                    {selectedProps.map((p) => (
                      <span key={p.id} className="text-slate-800">
                        {p.parkingSpots} veículos
                      </span>
                    ))}
                  </div>

                  {/* Condomínio */}
                  <div className="grid grid-cols-4 p-4 hover:bg-slate-50 transition">
                    <span className="font-semibold text-slate-500">Condomínio Mensal</span>
                    {selectedProps.map((p) => (
                      <span key={p.id} className="text-slate-800">
                        {p.condoFee ? `R$ ${p.condoFee.toLocaleString("pt-BR")}` : "N/A"}
                      </span>
                    ))}
                  </div>

                  {/* Piscina */}
                  <div className="grid grid-cols-4 p-4 hover:bg-slate-50 transition">
                    <span className="font-semibold text-slate-500">Piscina Privativa</span>
                    {selectedProps.map((p) => (
                      <span key={p.id} className="text-slate-800">
                        {p.hasPool ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </span>
                    ))}
                  </div>

                  {/* Condomínio Fechado */}
                  <div className="grid grid-cols-4 p-4 hover:bg-slate-50 transition">
                    <span className="font-semibold text-slate-500">Condomínio Fechado</span>
                    {selectedProps.map((p) => (
                      <span key={p.id} className="text-slate-800">
                        {p.isGatedCommunity ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </span>
                    ))}
                  </div>

                  {/* Corretor */}
                  <div className="grid grid-cols-4 p-4 hover:bg-slate-50 transition">
                    <span className="font-semibold text-slate-500">Corretor Responsável</span>
                    {selectedProps.map((p) => (
                      <span key={p.id} className="font-semibold text-navy-900">
                        {p.broker.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
