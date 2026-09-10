import Link from "next/link";
import { MapPin, Home, ArrowUpRight } from "lucide-react";
import { Community } from "@/types";

interface CommunityCardProps {
  community: Community;
}

export default function CommunityCard({ community }: CommunityCardProps) {
  return (
    <Link
      href={`/condominio/${community.slug}`}
      className="group bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-subtle hover:shadow-luxury-hover hover:border-navy-950/25 transition-all duration-500 flex flex-col"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={community.photo}
          alt={community.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/30 to-transparent" />

        {/* Top badge */}
        <div className="absolute top-3 left-3 bg-navy-950/85 backdrop-blur-md px-2.5 py-1 rounded-sm text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-100 border border-white/15 shadow-sm flex items-center gap-1.5">
          <Home className="w-3.5 h-3.5 text-gold-400" />
          <span>{community.availableCount} Disponíveis</span>
        </div>

        {/* Bottom overlay title */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
          <h3 className="font-serif font-semibold text-lg leading-tight drop-shadow-sm">
            {community.name}
          </h3>
          <div className="flex items-center gap-1 text-[11px] text-stone-300 mt-1 font-light">
            <MapPin className="w-3 h-3 text-gold-400" />
            <span>{community.city}, {community.neighborhood}</span>
          </div>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-light">
          {community.description}
        </p>

        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
              Faixa de Preço
            </span>
            <span className="text-sm font-serif font-bold text-navy-950">
              {community.priceRange}
            </span>
          </div>

          <span className="w-8 h-8 rounded-full bg-stone-50 group-hover:bg-navy-950 group-hover:text-gold-300 flex items-center justify-center transition-all duration-300 text-slate-600 border border-stone-200/60">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
