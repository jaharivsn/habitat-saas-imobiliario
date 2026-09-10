import Link from "next/link";
import { Users, Building, MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import { Agency } from "@/types";

interface AgencyCardProps {
  agency: Agency;
}

export default function AgencyCard({ agency }: AgencyCardProps) {
  return (
    <div className="bg-white rounded-xl border border-stone-200/90 shadow-subtle hover:shadow-luxury-hover hover:border-navy-950/25 transition-all duration-500 overflow-hidden flex flex-col justify-between">
      {/* Banner with Photographic Vignette */}
      <div className="relative h-32 bg-stone-200 overflow-hidden group">
        <img
          src={agency.banner}
          alt={agency.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 pt-0 relative flex-1 flex flex-col justify-between">
        <div>
          {/* Logo overlapping banner */}
          <div className="-mt-10 mb-3.5 flex items-end justify-between">
            <img
              src={agency.logo}
              alt={agency.name}
              className="w-20 h-20 rounded-lg object-cover border-2 border-white shadow-subtle bg-white"
            />
            {agency.verified && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-200 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5" />
                Boutique Verificada
              </span>
            )}
          </div>

          <h3 className="font-serif font-semibold text-slate-900 text-xl leading-tight">
            {agency.name}
          </h3>

          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 mt-1">
            <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
            <span className="truncate">{agency.city}, {agency.state}</span>
          </div>

          <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed font-light">
            {agency.description}
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-medium text-slate-700">
            <div className="flex items-center gap-2 p-2.5 bg-stone-50/70 rounded-md border border-stone-100">
              <Building className="w-4 h-4 text-gold-700 shrink-0" />
              <span className="text-[11px] font-serif font-bold text-navy-950">{agency.listingsCount} <span className="font-sans font-normal text-slate-500">Imóveis</span></span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-stone-50/70 rounded-md border border-stone-100">
              <Users className="w-4 h-4 text-gold-700 shrink-0" />
              <span className="text-[11px] font-serif font-bold text-navy-950">{agency.teamCount} <span className="font-sans font-normal text-slate-500">Corretores</span></span>
            </div>
          </div>
        </div>

        {/* Action Link */}
        <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-light truncate max-w-[180px]">
            {agency.regions.slice(0, 2).join(", ")}
          </span>
          <Link
            href={`/imobiliaria/${agency.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-navy-950 hover:text-gold-700 transition"
          >
            <span>Ver Portfólio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
