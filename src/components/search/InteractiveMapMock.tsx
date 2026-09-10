"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Navigation, Plus, Minus, Layers, X, Bed, Bath, Maximize, ArrowRight } from "lucide-react";
import { Property } from "@/types";
import { formatPrice } from "@/lib/utils";

interface InteractiveMapMockProps {
  properties: Property[];
  selectedProperty?: Property | null;
  onSelectProperty?: (property: Property) => void;
}

export default function InteractiveMapMock({
  properties,
  selectedProperty: externalSelected,
  onSelectProperty,
}: InteractiveMapMockProps) {
  const [internalSelected, setInternalSelected] = useState<Property | null>(
    properties[0] || null
  );
  const [zoom, setZoom] = useState(13);
  const [mapStyle, setMapStyle] = useState<"dark" | "clean">("dark");

  const activeProperty = externalSelected || internalSelected;

  const handleSelect = (prop: Property) => {
    setInternalSelected(prop);
    if (onSelectProperty) onSelectProperty(prop);
  };

  // Mock coordinates distribution for pins
  const pinPositions = [
    { top: "32%", left: "42%" },
    { top: "54%", left: "68%" },
    { top: "40%", left: "30%" },
    { top: "65%", left: "45%" },
    { top: "25%", left: "55%" },
    { top: "48%", left: "22%" },
    { top: "72%", left: "76%" },
    { top: "38%", left: "60%" },
  ];

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-xl overflow-hidden border border-stone-200/90 shadow-subtle select-none">
      {/* Map Canvas Background */}
      <div
        className={`w-full h-full absolute inset-0 transition-all duration-500 ${
          mapStyle === "dark"
            ? "bg-[#0B1522] bg-[radial-gradient(#1E2D42_1px,transparent_1px)] [background-size:24px_24px]"
            : "bg-[#FAF9F6] bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px]"
        }`}
      >
        {/* Simulated topographic / street contours */}
        <svg className="w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0 100 Q 250 50 400 200 T 800 300 T 1200 150" fill="none" stroke="currentColor" strokeWidth="2" className={mapStyle === "dark" ? "text-slate-400" : "text-stone-500"} />
          <path d="M 100 0 Q 300 400 500 250 T 900 600" fill="none" stroke="currentColor" strokeWidth="1.5" className={mapStyle === "dark" ? "text-slate-600" : "text-stone-400"} />
          <path d="M 400 700 Q 600 350 800 500 T 1200 400" fill="none" stroke="currentColor" strokeWidth="2" className={mapStyle === "dark" ? "text-amber-400" : "text-stone-400"} />
          {/* Simulated river / coastline */}
          <path d="M 0 450 C 300 420 500 550 800 480 C 1000 420 1100 560 1400 500" fill="none" stroke="#0284c7" strokeWidth="18" strokeOpacity="0.4" />
        </svg>

        {/* City Labels */}
        <div className="absolute top-12 left-14 pointer-events-none">
          <span className={`text-xs font-mono uppercase tracking-widest ${mapStyle === "dark" ? "text-slate-600" : "text-stone-400"}`}>
            Área Nobre Metropolitana • Escala 1:{zoom * 1000}
          </span>
        </div>

        {/* Pins */}
        {properties.map((prop, idx) => {
          const pos = pinPositions[idx % pinPositions.length];
          const isSelected = activeProperty?.id === prop.id;

          return (
            <div
              key={prop.id}
              style={{ top: pos.top, left: pos.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
              onClick={() => handleSelect(prop)}
            >
              {/* Pulsing ring for selected pin */}
              {isSelected && (
                <span className="absolute -inset-2 rounded-lg bg-gold-400/30 animate-ping pointer-events-none" />
              )}

              {/* Price Tag Pin */}
              <div
                className={`px-3 py-1.5 rounded-lg shadow-subtle text-xs font-bold font-mono transition-all transform duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                  isSelected
                    ? "bg-gold-500 text-navy-950 ring-1 ring-gold-600 scale-105 z-30"
                    : "bg-navy-950 text-white hover:bg-navy-900 hover:scale-105 border border-white/20"
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? "text-navy-950" : "text-gold-400"}`} />
                <span>
                  {prop.operation === "aluguel"
                    ? `R$ ${(prop.price / 1000).toFixed(0)}k/mês`
                    : `R$ ${(prop.price / 1000000).toFixed(1)}M`}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Controls Top Right */}
      <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
        <button
          onClick={() => setMapStyle(mapStyle === "dark" ? "clean" : "dark")}
          className="p-2.5 rounded-xl bg-white/90 dark:bg-navy-900/90 backdrop-blur-md shadow-md text-slate-700 hover:text-navy-900 transition"
          title="Alternar estilo do mapa"
        >
          <Layers className="w-4 h-4" />
        </button>

        <div className="flex flex-col rounded-xl overflow-hidden bg-white/90 backdrop-blur-md shadow-md border border-slate-200/60">
          <button
            onClick={() => setZoom((z) => Math.min(z + 1, 18))}
            className="p-2 text-slate-700 hover:bg-slate-100 transition"
            title="Aproximar zoom"
          >
            <Plus className="w-4 h-4" />
          </button>
          <div className="h-px bg-slate-200" />
          <button
            onClick={() => setZoom((z) => Math.max(z - 1, 8))}
            className="p-2 text-slate-700 hover:bg-slate-100 transition"
            title="Afastar zoom"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={() => {
            if (properties[0]) handleSelect(properties[0]);
          }}
          className="p-2.5 rounded-xl bg-white/90 backdrop-blur-md shadow-md text-slate-700 hover:text-navy-900 transition"
          title="Centralizar no primeiro imóvel"
        >
          <Navigation className="w-4 h-4" />
        </button>
      </div>

      {/* Selected Property Overlay Card at Bottom */}
      {activeProperty && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-30 animate-in slide-in-from-bottom duration-200">
          <div className="bg-white/95 backdrop-blur-xl rounded-xl p-3 shadow-dropdown border border-stone-200/90 flex gap-3.5 relative">
            <button
              onClick={() => setInternalSelected(null)}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs shadow hover:bg-slate-950 transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <img
              src={activeProperty.photos[0]}
              alt={activeProperty.title}
              className="w-28 h-28 rounded-lg object-cover shrink-0"
            />

            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-600">
                  {activeProperty.neighborhood}, {activeProperty.city}
                </span>
                <h4 className="font-serif font-bold text-sm text-slate-900 truncate">
                  {activeProperty.title}
                </h4>

                <div className="flex items-center gap-3 text-xs text-slate-600 mt-1">
                  <span className="flex items-center gap-1">
                    <Bed className="w-3 h-3 text-slate-400" />
                    {activeProperty.bedrooms} qtos
                  </span>
                  <span className="flex items-center gap-1">
                    <Maximize className="w-3 h-3 text-slate-400" />
                    {activeProperty.builtArea} m²
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="font-serif font-bold text-sm text-navy-950">
                  {formatPrice(activeProperty.price, activeProperty.operation)}
                </span>
                <Link
                  href={`/imovel/${activeProperty.slug}`}
                  className="flex items-center gap-1 text-xs font-semibold text-navy-900 hover:text-gold-600 transition"
                >
                  <span>Ver detalhes</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
