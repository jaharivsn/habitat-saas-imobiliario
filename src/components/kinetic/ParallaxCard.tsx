"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart, ArrowUpRight } from "lucide-react";
import { Property } from "@/types";
import { formatPrice } from "@/lib/utils";
import FloatingBadge from "./FloatingBadge";

interface ParallaxCardProps {
  property: Property;
  priority?: boolean;
}

export default function ParallaxCard({ property, priority = false }: ParallaxCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFavorited, setIsFavorited] = useState(false);

  // Kinetic tilt values
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 30, stiffness: 260, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D rotation bounds (-6 to 6 deg for subtle architectural feel)
  const rotateX = useTransform(smoothY, [0, 1], [4, -4]);
  const rotateY = useTransform(smoothX, [0, 1], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const coverImage =
    property.media?.coverUrl ||
    (property.photos && property.photos[0]) ||
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85";

  const neighborhood = property.neighborhood;
  const city = property.city;

  const builtArea = property.specs?.builtArea ?? property.builtArea;
  const suites = property.specs?.suites ?? property.suites;
  const bedrooms = property.specs?.bedrooms ?? property.bedrooms;
  const parking = property.specs?.parkingSpaces ?? property.parkingSpots;

  const operationLabel =
    property.operation === "rent" || property.operation === "aluguel"
      ? "Locação"
      : property.operation === "development"
      ? "Lançamento"
      : "Venda";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className="group relative flex flex-col bg-white rounded-xl border border-stone-200/70 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(10,17,40,0.06)] hover:border-stone-300 transition-shadow duration-500"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full"
      >
        {/* Aspect Ratio 4:3 Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
          <Image
            src={coverImage}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />

          {/* Quiet luxury dark gradient at bottom of photo */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent pointer-events-none" />

          {/* Badges Bar (Floating layer with kinetic spring) */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-1.5">
              <FloatingBadge variant="operation" size="sm">
                {operationLabel}
              </FloatingBadge>
              {property.isLuxury && (
                <FloatingBadge variant="luxury" size="sm">
                  Private Collection
                </FloatingBadge>
              )}
            </div>

            {/* Favorite Button */}
            <motion.button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsFavorited(!isFavorited);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 450, damping: 20 }}
              aria-label={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              className={`p-2 rounded-full backdrop-blur-md transition-all border ${
                isFavorited
                  ? "bg-rose-50 border-rose-200 text-rose-600 shadow-sm"
                  : "bg-white/80 border-white/40 text-stone-700 hover:bg-white hover:text-stone-950"
              }`}
            >
              <Heart
                className={`w-3.5 h-3.5 transition-colors ${
                  isFavorited ? "fill-rose-600" : ""
                }`}
              />
            </motion.button>
          </div>

          {/* Quick Code Badge bottom right */}
          {property.code && (
            <div className="absolute bottom-3 right-3 text-[10px] uppercase font-mono tracking-widest text-white/80 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded">
              REF {property.code}
            </div>
          )}
        </div>
      </motion.div>

      {/* Card Content Pane */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Location line */}
          <div className="text-[11px] font-medium tracking-[0.16em] uppercase text-stone-500 mb-1.5 line-clamp-1">
            {neighborhood} • {city}
          </div>

          {/* Editorial Title */}
          <Link href={`/imovel/${property.slug}`} className="block group/title">
            <h3 className="font-display text-xl text-stone-950 font-normal leading-snug group-hover/title:text-stone-700 transition-colors line-clamp-1">
              {property.title}
            </h3>
          </Link>

          {/* Hairline specs bar */}
          <div className="mt-3 pt-3 border-t border-stone-100 flex items-center text-xs text-stone-600 tracking-tight gap-2 tabular-nums">
            <span>{builtArea} m²</span>
            <span className="text-stone-300">•</span>
            <span>{suites > 0 ? `${suites} suítes` : `${bedrooms} dorms`}</span>
            <span className="text-stone-300">•</span>
            <span>{parking} vagas</span>
          </div>
        </div>

        {/* Footer: Price & Direct Link */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] tracking-wider uppercase text-stone-400 block leading-none font-medium">
              Valor
            </span>
            <span className="text-base font-medium text-stone-950 tracking-tight tabular-nums">
              {formatPrice(property.price, property.operation as any)}
            </span>
          </div>

          <Link
            href={`/imovel/${property.slug}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-navy-950 hover:text-navy-700 transition-colors group/link py-1 px-2.5 rounded hover:bg-stone-50"
          >
            <span>Ver detalhes</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
