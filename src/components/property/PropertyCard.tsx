"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ChevronLeft, ChevronRight, Share2 } from "lucide-react";
import { Property } from "@/types";
import { formatPrice } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  priority?: boolean;
}

export default function PropertyCard({ property, priority = false }: PropertyCardProps) {
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("habitat_favorites");
      if (saved) {
        const favs = JSON.parse(saved) as string[];
        setIsFavorited(favs.includes(property.id));
      }
    } catch {}
  }, [property.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const saved = localStorage.getItem("habitat_favorites");
      let favs: string[] = saved ? JSON.parse(saved) : [];
      if (favs.includes(property.id)) {
        favs = favs.filter((id) => id !== property.id);
        setIsFavorited(false);
      } else {
        favs.push(property.id);
        setIsFavorited(true);
      }
      localStorage.setItem("habitat_favorites", JSON.stringify(favs));
    } catch {}
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/imovel/${property.slug}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentPhotoIdx((prev) => (prev + 1) % property.photos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentPhotoIdx((prev) => (prev - 1 + property.photos.length) % property.photos.length);
  };

  // Specs em linha única refinada com banheiros incluídos
  const specsParts: string[] = [];
  if (property.builtArea) {
    specsParts.push(`${property.builtArea} m²`);
  }
  if (property.suites > 0 && property.bedrooms > property.suites) {
    specsParts.push(`${property.bedrooms} quartos (${property.suites} ${property.suites === 1 ? "suíte" : "suítes"})`);
  } else if (property.suites > 0) {
    specsParts.push(`${property.suites} ${property.suites === 1 ? "suíte" : "suítes"}`);
  } else if (property.bedrooms > 0) {
    specsParts.push(`${property.bedrooms} ${property.bedrooms === 1 ? "quarto" : "quartos"}`);
  }
  if (property.bathrooms > 0) {
    specsParts.push(`${property.bathrooms} ${property.bathrooms === 1 ? "banheiro" : "banheiros"}`);
  }
  if (property.parkingSpots > 0) {
    specsParts.push(`${property.parkingSpots} ${property.parkingSpots === 1 ? "vaga" : "vagas"}`);
  }
  const specs = specsParts.join(" • ");

  return (
    <article className="group bg-white border border-stone-200/80 hover:border-stone-400 transition-colors duration-400 flex flex-col">
      {/* Media Box: Proporção áurea e overlay imperceptível */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <Link href={`/imovel/${property.slug}`} tabIndex={-1} className="block w-full h-full">
          <img
            src={property.photos[currentPhotoIdx] || property.photos[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
            loading={priority ? "eager" : "lazy"}
          />
        </Link>

        {/* Overlay imperceptível */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

        {/* Badges de Operação e Status */}
        <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-1.5 pointer-events-none">
          <span className="bg-white/95 backdrop-blur-md text-stone-900 text-[9px] font-medium uppercase tracking-[0.2em] px-2 py-1 shadow-xs">
            {property.operation === "aluguel" ? "Locação" : "Venda"}
          </span>
          {property.isFeatured && (
            <span className="bg-stone-950 text-white text-[9px] font-semibold uppercase tracking-[0.16em] px-2 py-1 shadow-xs">
              Destaque
            </span>
          )}
          {property.isLaunch && (
            <span className="bg-amber-800 text-white text-[9px] font-semibold uppercase tracking-[0.16em] px-2 py-1 shadow-xs">
              Lançamento
            </span>
          )}
          {property.isNew && !property.isLaunch && (
            <span className="bg-stone-800 text-stone-100 text-[9px] font-semibold uppercase tracking-[0.16em] px-2 py-1 shadow-xs">
              Novo
            </span>
          )}
        </div>

        {/* Botões de Ação no Topo Direito (Favoritar & Compartilhar) */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
          {/* Compartilhar 1-clique */}
          <div className="relative">
            <button
              onClick={handleShare}
              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-stone-700 hover:text-stone-950 transition-colors flex items-center justify-center shadow-xs"
              title="Compartilhar imóvel"
              aria-label="Compartilhar imóvel"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
            {copied && (
              <span className="absolute -bottom-7 right-0 bg-stone-950 text-white text-[9px] px-2 py-0.5 rounded shadow-sm whitespace-nowrap animate-in fade-in duration-150">
                Link copiado!
              </span>
            )}
          </div>

          {/* Favoritar */}
          <button
            onClick={toggleFavorite}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-stone-700 hover:text-rose-600 transition-colors flex items-center justify-center shadow-xs"
            title={isFavorited ? "Remover dos favoritos" : "Salvar nos favoritos"}
            aria-label={isFavorited ? "Remover dos favoritos" : "Salvar nos favoritos"}
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${
                isFavorited ? "fill-rose-600 text-rose-600" : ""
              }`}
            />
          </button>
        </div>

        {/* Indicador sutil de fotos */}
        {property.photos.length > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10 pointer-events-none">
            {property.photos.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === currentPhotoIdx ? "w-3 bg-white" : "w-1 bg-white/45"
                }`}
              />
            ))}
          </div>
        )}

        {/* Foto anterior / próxima se houver múltiplas */}
        {property.photos.length > 1 && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={prevPhoto}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-md text-stone-800 hover:bg-white flex items-center justify-center shadow-sm transition-all"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-md text-stone-800 hover:bg-white flex items-center justify-center shadow-sm transition-all"
              aria-label="Próxima foto"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Conteúdo Editorial */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          {/* Localização em caixa alta elegante */}
          <p className="text-[10px] font-medium tracking-[0.22em] text-stone-500 uppercase truncate">
            {property.neighborhood} • {property.city}
          </p>

          {/* Título editorial com tipografia refinada */}
          <Link href={`/imovel/${property.slug}`} className="block group-hover:text-slate-600 transition-colors">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug line-clamp-1 group-hover:text-slate-700 transition-colors">
              {property.title}
            </h3>
          </Link>

          {/* Especificações completas em linha única refinada */}
          {specs && (
            <p className="text-xs text-stone-500 font-light tracking-wide pt-0.5 tabular-nums">
              {specs}
            </p>
          )}

          {/* Curadoria Corretor/Imobiliária */}
          {property.broker && (
            <div className="pt-1 text-[11px] text-stone-400 truncate">
              Curadoria por{" "}
              <Link
                href={`/corretor/${property.broker.slug}`}
                className="text-stone-700 hover:text-stone-950 font-medium transition-colors"
              >
                {property.broker.name}
              </Link>
            </div>
          )}
        </div>

        {/* Preço limpo em destaque */}
        <div className="pt-3 border-t border-stone-100 flex items-baseline justify-between">
          <div className="text-lg sm:text-xl font-medium text-stone-950 tracking-tight tabular-nums">
            {formatPrice(property.price, property.operation)}
          </div>
          <Link
            href={`/imovel/${property.slug}`}
            className="text-[10px] font-medium uppercase tracking-[0.2em] text-stone-400 group-hover:text-stone-950 transition-colors"
          >
            Ver Imóvel
          </Link>
        </div>
      </div>
    </article>
  );
}
