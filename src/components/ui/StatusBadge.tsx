import React from "react";
import { ListingStatus, LeadStatus } from "@/types";

type BadgeStatus = ListingStatus | LeadStatus | "active" | "inactive" | "pending";

interface StatusBadgeProps {
  status: BadgeStatus;
  className?: string;
}

const statusConfig: Record<string, { label: string; bg: string; text: string; border: string }> = {
  // Listing statuses
  published: { label: "Publicado", bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-200" },
  draft: { label: "Rascunho", bg: "bg-stone-100", text: "text-stone-600", border: "border-stone-200" },
  review: { label: "Em Revisão", bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200" },
  paused: { label: "Pausado", bg: "bg-stone-100", text: "text-stone-700", border: "border-stone-300" },
  sold: { label: "Vendido", bg: "bg-stone-100", text: "text-stone-800", border: "border-stone-300" },
  rented: { label: "Alugado", bg: "bg-navy-50", text: "text-navy-800", border: "border-navy-200" },
  archived: { label: "Arquivado", bg: "bg-stone-50", text: "text-stone-400", border: "border-stone-200" },

  // Lead statuses
  novo: { label: "Novo Lead", bg: "bg-stone-100", text: "text-navy-950", border: "border-stone-300" },
  contatado: { label: "Contatado", bg: "bg-stone-50", text: "text-stone-700", border: "border-stone-200" },
  qualificado: { label: "Qualificado", bg: "bg-amber-50", text: "text-amber-900", border: "border-amber-300/80" },
  visita_agendada: { label: "Visita Agendada", bg: "bg-stone-100", text: "text-gold-900", border: "border-gold-300" },
  negociacao: { label: "Em Negociação", bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200" },
  proposta: { label: "Proposta", bg: "bg-navy-50", text: "text-navy-900", border: "border-navy-200" },
  fechado: { label: "Fechado", bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-200" },
  perdido: { label: "Perdido", bg: "bg-rose-50", text: "text-rose-800", border: "border-rose-200" },

  // Generic
  active: { label: "Ativo", bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-200" },
  inactive: { label: "Inativo", bg: "bg-stone-100", text: "text-stone-500", border: "border-stone-200" },
  pending: { label: "Pendente", bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200" },
};

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const config = statusConfig[status] || {
    label: status,
    bg: "bg-stone-100",
    text: "text-stone-700",
    border: "border-stone-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-sm text-[9px] font-semibold uppercase tracking-[0.16em] border shadow-subtle ${config.bg} ${config.text} ${config.border} ${className}`}
    >
      {config.label}
    </span>
  );
}
