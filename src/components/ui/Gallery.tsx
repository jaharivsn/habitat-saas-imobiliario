"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

interface GalleryProps {
  photos: string[];
  title: string;
  className?: string;
}

export default function Gallery({ photos, title, className = "" }: GalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
      if (e.key === "ArrowRight") setCurrentIndex((prev) => (prev + 1) % photos.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, photos.length]);

  const openLightbox = (idx: number) => {
    setCurrentIndex(idx);
    setLightboxOpen(true);
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className={className}>
      {/* Mosaic Gallery View */}
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 h-[420px] sm:h-[500px] lg:h-[560px] rounded-xl overflow-hidden shadow-subtle border border-stone-200/90">
        {/* Main Photo */}
        <div
          onClick={() => openLightbox(0)}
          className="md:col-span-2 md:row-span-2 relative group overflow-hidden bg-stone-100 cursor-pointer"
        >
          <img
            src={photos[0]}
            alt={`${title} - Foto Principal`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-navy-950/10 group-hover:bg-navy-950/25 transition-colors" />
          <div className="absolute top-4 left-4 bg-navy-950/85 backdrop-blur-md text-stone-100 text-[10px] font-semibold uppercase tracking-[0.18em] px-3 py-1.5 rounded-sm border border-white/15 shadow-sm flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-gold-400" />
            <span>Ver em tela cheia</span>
          </div>
        </div>

        {/* Other photos */}
        {photos.slice(1, 5).map((photo, i) => (
          <div
            key={i}
            onClick={() => openLightbox(i + 1)}
            className="relative group overflow-hidden bg-slate-200 cursor-pointer hidden md:block"
          >
            <img
              src={photo}
              alt={`${title} - Foto ${i + 2}`}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            {i === 3 && photos.length > 5 && (
              <div className="absolute inset-0 bg-navy-950/75 backdrop-blur-xs flex items-center justify-center text-white font-bold text-base">
                +{photos.length - 4} fotos
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 z-50 text-white/80 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
            aria-label="Fechar galeria"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={prev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 text-white min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center">
            <img
              src={photos[currentIndex]}
              alt={`${title} - Foto ${currentIndex + 1}`}
              className="max-h-[75vh] w-auto object-contain rounded-lg shadow-luxury"
            />
            <div className="mt-4 text-stone-300 text-xs tracking-wider uppercase font-medium">
              Foto {currentIndex + 1} de {photos.length} — {title}
            </div>
          </div>

          <button
            onClick={next}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 text-white min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
            aria-label="Próxima foto"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
