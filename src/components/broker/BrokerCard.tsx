import Link from "next/link";
import { Star, MapPin, Award, Phone, MessageCircle, ExternalLink, ShieldCheck } from "lucide-react";
import { Broker } from "@/types";

interface BrokerCardProps {
  broker: Broker;
}

export default function BrokerCard({ broker }: BrokerCardProps) {
  return (
    <div className="bg-white rounded-xl border border-stone-200/90 shadow-subtle hover:shadow-luxury-hover hover:border-navy-950/25 transition-all duration-500 p-6 flex flex-col justify-between">
      <div>
        {/* Header with Avatar and Basic Info */}
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={broker.photo}
              alt={broker.name}
              className="w-16 h-16 rounded-full object-cover border border-stone-200 shadow-subtle"
            />
            <span
              className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white"
              title="Online para atendimento"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-serif font-semibold text-slate-900 text-lg leading-tight truncate">
                {broker.name}
              </h3>
              <span title="Corretor Verificado Habitat" className="inline-flex">
                <ShieldCheck className="w-4 h-4 text-gold-700 shrink-0" />
              </span>
            </div>

            <p className="text-[11px] font-mono text-slate-400 mt-0.5">CRECI {broker.creci}</p>

            {broker.agencyName && (
              <p className="text-xs text-gold-700 font-semibold mt-0.5 truncate tracking-wide">
                {broker.agencyName}
              </p>
            )}

            {/* Rating */}
            <div className="flex items-center gap-1 mt-1 text-xs text-slate-600">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="font-semibold text-slate-900">{broker.rating.toFixed(1)}</span>
              <span className="text-slate-400 text-[11px]">({broker.reviewsCount} avaliações)</span>
            </div>
          </div>
        </div>

        {/* Bio excerpt */}
        <p className="text-xs text-slate-600 mt-4 line-clamp-2 leading-relaxed font-light">
          {broker.bio}
        </p>

        {/* Specialties Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3.5">
          {broker.specialties.slice(0, 3).map((spec, i) => (
            <span
              key={i}
              className="bg-stone-100 text-slate-700 text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-sm border border-stone-200/60"
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-stone-100 text-center text-xs">
          <div className="bg-stone-50/70 p-2.5 rounded-md border border-stone-100">
            <span className="block font-serif font-bold text-navy-950 text-lg">
              {broker.activeListingsCount}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5 block">Imóveis Ativos</span>
          </div>
          <div className="bg-stone-50/70 p-2.5 rounded-md border border-stone-100">
            <span className="block font-serif font-bold text-navy-950 text-lg">
              {broker.soldCount}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5 block">Transações</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-2">
        <a
          href={`https://wa.me/${broker.whatsapp}?text=Olá%20${encodeURIComponent(broker.name)},%20encontrei%20seu%20perfil%20no%20Habitat%20e%20gostaria%20de%20conversar.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#1D7F54] hover:bg-[#166B44] text-white text-xs font-semibold uppercase tracking-wider py-2.5 px-3 rounded-sm flex items-center justify-center gap-1.5 shadow-subtle transition-all duration-300"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        <Link
          href={`/corretor/${broker.slug}`}
          className="flex-1 bg-navy-950 hover:bg-gold-600 hover:text-navy-950 text-white text-xs font-semibold uppercase tracking-wider py-2.5 px-3 rounded-sm flex items-center justify-center gap-1.5 shadow-subtle transition-all duration-300"
        >
          <span>Vitrine</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
