"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PropertyCard from "@/components/property/PropertyCard";
import { mockProperties } from "@/data/mockData";
import { Property } from "@/types";
import { Heart, ArrowRight, GitCompare, Trash2 } from "lucide-react";

export default function FavoritosPage() {
  const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("habitat_favorites");
      if (saved) {
        const ids = JSON.parse(saved) as string[];
        const matches = mockProperties.filter((p) => ids.includes(p.id));
        setFavoriteProperties(matches);
      } else {
        // Provide 2 defaults for instant rich visual preview if empty
        setFavoriteProperties(mockProperties.slice(0, 2));
      }
    } catch {
      setFavoriteProperties(mockProperties.slice(0, 2));
    }
  }, []);

  const clearAllFavorites = () => {
    localStorage.removeItem("habitat_favorites");
    setFavoriteProperties([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Header />

      <main className="flex-1 pb-20">
        <div className="bg-white border-b border-stone-200/80 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-700">
                  Sua Curadoria Pessoal
                </span>
                <h1 className="font-serif text-3xl font-semibold text-navy-950 mt-1 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-rose-600 fill-rose-600" />
                  Imóveis Favoritos
                </h1>
                <p className="text-xs text-slate-500 mt-1 font-light">
                  Gerencie suas opções salvas e compare especificações lado a lado
                </p>
              </div>

              {favoriteProperties.length > 0 && (
                <div className="flex items-center gap-3">
                  <Link
                    href="/comparar"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-navy-950 hover:bg-gold-600 hover:text-navy-950 text-white rounded-sm text-xs font-semibold uppercase tracking-wider shadow-subtle hover:shadow-luxury transition-all duration-300"
                  >
                    <GitCompare className="w-3.5 h-3.5" />
                    <span>Comparar Lado a Lado</span>
                  </Link>

                  <button
                    onClick={clearAllFavorites}
                    className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-rose-600 p-2 transition"
                    title="Limpar todos"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Limpar</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          {favoriteProperties.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-stone-200/90 shadow-subtle max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto mb-4 border border-rose-100">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-semibold text-xl text-slate-900">
                Nenhum imóvel salvo
              </h3>
              <p className="text-xs text-slate-500 mt-2 font-light leading-relaxed">
                Navegue pelas nossas residências e clique no ícone de coração para guardar suas opções preferidas.
              </p>
              <Link
                href="/imoveis"
                className="mt-6 inline-flex items-center gap-1.5 bg-navy-950 hover:bg-gold-600 hover:text-navy-950 text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-sm shadow-subtle hover:shadow-luxury transition-all duration-300"
              >
                <span>Explorar Imóveis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favoriteProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
