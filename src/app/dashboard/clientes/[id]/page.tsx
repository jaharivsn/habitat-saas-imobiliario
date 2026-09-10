"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { mockClients, mockProperties } from "@/data/mockData";
import { formatPrice } from "@/lib/utils";
import {
  ArrowLeft,
  Phone,
  Mail,
  Heart,
  Calendar,
  DollarSign,
  MapPin,
  Clock,
  Building,
} from "lucide-react";
import PropertyCard from "@/components/property/PropertyCard";

export default function ClienteDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const client = mockClients.find((c) => c.id === id) || mockClients[0];

  const favorites = mockProperties.filter((p) =>
    client.favoritePropertyIds.includes(p.id)
  );

  const visited = mockProperties.filter((p) =>
    client.visitedPropertyIds?.includes(p.id)
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link
        href="/dashboard/clientes"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-navy-900"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar para Clientes</span>
      </Link>

      {/* Profile Header */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200/90 shadow-subtle space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold text-navy-950">
                {client.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-sm text-[9px] font-semibold uppercase tracking-wider bg-gold-50/70 border border-gold-200/60 text-gold-800">
                {client.type}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 mt-1">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                {client.phone}
              </span>
              <span className="text-stone-300">•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                {client.email}
              </span>
              <span className="text-stone-300">•</span>
              <span className="text-stone-400">
                Cliente desde {client.createdAt}
              </span>
            </div>
          </div>

          <a
            href={`https://wa.me/${client.phone.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1D7F54] hover:bg-[#166543] text-white font-semibold text-[11px] uppercase tracking-wider px-4 py-2.5 rounded-sm shadow-sm transition text-center"
          >
            Falar no WhatsApp
          </a>
        </div>

        {/* Investment & Search Profile (Requirement 15) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-stone-100 text-xs">
          <div className="p-4 bg-stone-50/80 rounded-lg border border-stone-200/60 space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-stone-400 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-gold-600" />
              Faixa de Preço Desejada
            </span>
            <p className="font-bold text-navy-950 text-sm">
              {formatPrice(client.budgetMin)} a {formatPrice(client.budgetMax)}
            </p>
            <p className="text-[10px] text-stone-400">
              Interesse principal: Compra e Investimento
            </p>
          </div>

          <div className="p-4 bg-stone-50/80 rounded-lg border border-stone-200/60 space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-stone-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gold-600" />
              Regiões Desejadas
            </span>
            <p className="font-bold text-navy-950 text-sm">
              {client.desiredRegions.join(", ")}
            </p>
            <p className="text-[10px] text-stone-400">
              Preferência por condomínio fechado ou postos nobres
            </p>
          </div>

          <div className="p-4 bg-stone-50/80 rounded-lg border border-stone-200/60 space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-stone-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gold-600" />
              Status do Atendimento
            </span>
            <p className="font-bold text-emerald-700 text-sm">
              Ativo • Qualificado
            </p>
            <p className="text-[10px] text-stone-400">
              {favorites.length} favoritos • {visited.length} visitas realizadas
            </p>
          </div>
        </div>

        {/* Observations / Notes */}
        <div className="p-4 bg-stone-50/80 rounded-lg border border-stone-200/60 space-y-2 text-xs">
          <h4 className="font-bold text-navy-950">Observações & Perfil Comportamental</h4>
          <p className="text-stone-600 leading-relaxed">{client.notes}</p>
        </div>

        {/* Histórico de Interações (Requirement 15) */}
        <div className="space-y-3 pt-2">
          <h4 className="font-serif font-bold text-sm text-navy-950 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-gold-600" />
            Histórico de Interações & Timeline
          </h4>
          <div className="space-y-2 text-xs">
            {[
              {
                date: "14/03/2024",
                text: "Cliente confirmou interesse na Mansão Boa Vista e solicitou certidões do imóvel.",
              },
              {
                date: "09/03/2024",
                text: "Visita presencial conduzida com a família na Fazenda Boa Vista (Alameda dos Jacarandás).",
              },
              {
                date: "02/03/2024",
                text: "Primeiro contato originado via anúncio no portal Habitat.",
              },
            ].map((hist, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 flex items-start gap-3"
              >
                <span className="text-[10px] font-mono text-slate-400 shrink-0 pt-0.5">
                  {hist.date}
                </span>
                <span className="text-slate-700">{hist.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Favorites of this client */}
      <div>
        <h3 className="font-serif font-bold text-xl text-navy-950 mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
          Imóveis Salvos como Favoritos por este Cliente ({favorites.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favorites.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </div>

      {/* Visited properties of this client */}
      {visited.length > 0 && (
        <div className="pt-6">
          <h3 className="font-serif font-bold text-xl text-navy-950 mb-4 flex items-center gap-2">
            <Building className="w-5 h-5 text-gold-600" />
            Imóveis Visitados Presencialmente ({visited.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visited.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
