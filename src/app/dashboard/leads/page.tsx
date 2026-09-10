"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Columns,
  List,
  MessageCircle,
} from "lucide-react";
import { mockLeads } from "@/data/mockData";
import { Lead, LeadStatus } from "@/types";
import { formatDate } from "@/lib/utils";
import StatusBadge from "@/components/ui/StatusBadge";

const KANBAN_STAGES: { id: LeadStatus; label: string; color: string }[] = [
  { id: "novo", label: "Novos Leads", color: "border-navy-800 bg-navy-50/40" },
  { id: "contatado", label: "Contatados", color: "border-stone-500 bg-stone-50/50" },
  { id: "qualificado", label: "Qualificados", color: "border-gold-600 bg-gold-50/30" },
  { id: "visita_agendada", label: "Visita Agendada", color: "border-amber-600 bg-amber-50/40" },
  { id: "negociacao", label: "Negociação", color: "border-stone-700 bg-stone-100/50" },
  { id: "proposta", label: "Proposta", color: "border-navy-900 bg-navy-100/30" },
  { id: "fechado", label: "Fechados", color: "border-emerald-600 bg-emerald-50/40" },
  { id: "perdido", label: "Perdidos", color: "border-rose-600 bg-rose-50/40" },
];

export default function LeadsCRMPage() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");

  const updateLeadStatus = (leadId: string, newStatus: LeadStatus) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
  };

  const filtered = leads.filter((l) => {
    if (statusFilter !== "todos" && l.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        l.propertyTitle.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
            Pipeline Comercial
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 mt-0.5">
            Gestão de Leads (CRM)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Acompanhe o funil completo desde o primeiro clique até a escritura.
          </p>
        </div>

        {/* View Switcher & Action */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-sm text-xs font-semibold">
            <button
              onClick={() => setViewMode("kanban")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                viewMode === "kanban"
                  ? "bg-navy-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-navy-900"
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Funil Kanban</span>
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                viewMode === "table"
                  ? "bg-navy-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-navy-900"
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Tabela</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-subtle flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nome do lead, e-mail ou imóvel de interesse..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-navy-900"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none w-full sm:w-auto"
        >
          <option value="todos">Todos os Status</option>
          {KANBAN_STAGES.map((st) => (
            <option key={st.id} value={st.id}>
              {st.label}
            </option>
          ))}
        </select>
      </div>

      {/* KANBAN VIEW */}
      {viewMode === "kanban" && (
        <div className="overflow-x-auto pb-6">
          <div className="flex items-start gap-4 min-w-[1400px]">
            {KANBAN_STAGES.map((stage) => {
              const stageLeads = filtered.filter((l) => l.status === stage.id);
              return (
                <div
                  key={stage.id}
                  className={`w-72 rounded-xl border-t-4 ${stage.color} bg-slate-100/70 p-3 shrink-0 flex flex-col max-h-[750px] shadow-subtle`}
                >
                  <div className="flex items-center justify-between pb-3 px-1">
                    <span className="font-bold text-xs text-navy-950 uppercase tracking-wide">
                      {stage.label}
                    </span>
                    <span className="w-5 h-5 rounded-full bg-white text-slate-700 font-bold text-[10px] flex items-center justify-center shadow-xs">
                      {stageLeads.length}
                    </span>
                  </div>

                  {/* Cards inside column */}
                  <div className="space-y-3 overflow-y-auto pr-1 flex-1">
                    {stageLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-xs hover:shadow-md transition space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-navy-950 truncate max-w-[150px]">
                            {lead.name}
                          </span>
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                            {lead.source}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-600 line-clamp-2 leading-tight">
                          {lead.propertyTitle}
                        </p>

                        <div className="text-[10px] text-slate-400 bg-slate-50 p-2 rounded-lg leading-tight line-clamp-2">
                          "{lead.lastInteraction}"
                        </div>

                        {/* Card Footer Actions */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <a
                            href={`https://wa.me/${lead.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-lg transition"
                            title="Conversar no WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>

                          <div className="flex items-center gap-1">
                            {/* Quick Stage Mover */}
                            <select
                              value={lead.status}
                              onChange={(e) =>
                                updateLeadStatus(lead.id, e.target.value as LeadStatus)
                              }
                              className="bg-transparent text-[10px] text-slate-500 font-semibold focus:outline-none cursor-pointer"
                            >
                              {KANBAN_STAGES.map((s) => (
                                <option key={s.id} value={s.id}>
                                  Mover: {s.label}
                                </option>
                              ))}
                            </select>

                            <Link
                              href={`/dashboard/leads/${lead.id}`}
                              className="text-[11px] font-bold text-navy-900 hover:text-gold-600 ml-1"
                            >
                              Ver →
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}

                    {stageLeads.length === 0 && (
                      <div className="py-8 text-center text-[11px] text-slate-400 border border-dashed border-slate-200 rounded-xl">
                        Nenhum lead nesta etapa
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === "table" && (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4 pl-6">Nome do Lead</th>
                  <th className="p-4">Imóvel de Interesse</th>
                  <th className="p-4">Origem</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Última Interação</th>
                  <th className="p-4 pr-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4 pl-6">
                      <div className="font-bold text-navy-950">{lead.name}</div>
                      <div className="text-[11px] text-slate-400">{lead.phone}</div>
                    </td>

                    <td className="p-4 max-w-xs truncate text-slate-700 font-medium">
                      {lead.propertyTitle}
                    </td>

                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-sm bg-stone-100 text-stone-700 text-[9px] font-semibold uppercase tracking-wider border border-stone-200">
                        {lead.source}
                      </span>
                    </td>

                    <td className="p-4">
                      <StatusBadge status={lead.status} />
                    </td>

                    <td className="p-4 text-slate-500 max-w-xs truncate font-mono text-[11px]">
                      {lead.lastInteraction}
                    </td>

                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`https://wa.me/${lead.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-white bg-[#1D7F54] hover:bg-[#166B44] rounded-sm transition shadow-subtle"
                          title="WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                        <Link
                          href={`/dashboard/leads/${lead.id}`}
                          className="px-3 py-1 bg-navy-950 hover:bg-gold-600 hover:text-navy-950 text-white rounded-sm text-[11px] font-semibold uppercase tracking-wider transition-all duration-300"
                        >
                          Detalhes
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
