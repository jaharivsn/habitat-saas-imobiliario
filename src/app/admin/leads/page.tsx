"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { mockLeads } from "@/data/mockData";
import { Lead } from "@/types";

export default function AdminLeadsPage() {
  const [leads] = useState<Lead[]>(mockLeads);
  const [search, setSearch] = useState("");

  const filtered = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.propertyTitle.toLowerCase().includes(search.toLowerCase()) ||
      l.brokerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-400">
          Tráfego & Geração de Demanda
        </span>
        <h1 className="font-serif text-3xl font-bold text-white mt-1">
          Monitoramento Geral de Leads
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Auditoria de todos os contatos gerados no portal e tempo de resposta pelos corretores associados.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-white">
        <div className="bg-[#121826] p-5 rounded-xl border border-slate-800 shadow-subtle">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Total de Leads (Mês)</span>
          <div className="font-serif font-bold text-2xl mt-1">1.048</div>
          <span className="text-[10px] text-emerald-500 font-semibold">+24% vs mês anterior</span>
        </div>

        <div className="bg-[#121826] p-5 rounded-xl border border-slate-800 shadow-subtle">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Tempo Médio 1º Contato</span>
          <div className="font-serif font-bold text-2xl text-gold-400 mt-1">18 min</div>
          <span className="text-[10px] text-slate-400">SLA contratual: &lt; 30 min</span>
        </div>

        <div className="bg-[#121826] p-5 rounded-xl border border-slate-800 shadow-subtle">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Canal Predominante</span>
          <div className="font-serif font-bold text-2xl text-emerald-400 mt-1">78% WhatsApp</div>
          <span className="text-[10px] text-slate-400">22% Formulário Portal</span>
        </div>

        <div className="bg-[#121826] p-5 rounded-xl border border-slate-800 shadow-subtle">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Conversão em Visita</span>
          <div className="font-serif font-bold text-2xl mt-1">19.6%</div>
          <span className="text-[10px] text-emerald-500 font-semibold">Excelente padrão</span>
        </div>
      </div>

      {/* Leads Global Table */}
      <div className="bg-[#121826] rounded-xl border border-slate-800 overflow-hidden shadow-subtle">
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por lead, imóvel ou corretor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {filtered.length} leads listados
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0F1420] border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-4 pl-6">Nome do Lead</th>
                <th className="p-4">Imóvel de Interesse</th>
                <th className="p-4">Origem</th>
                <th className="p-4">Corretor Responsável</th>
                <th className="p-4">Status no CRM</th>
                <th className="p-4 pr-6 text-right">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((l) => (
                <tr key={l.id} className="hover:bg-slate-900/40 transition">
                  <td className="p-4 pl-6 font-bold text-white">
                    <div>{l.name}</div>
                    <span className="text-[10px] text-slate-500 font-normal">{l.email}</span>
                  </td>
                  <td className="p-4 text-slate-300 truncate max-w-xs">{l.propertyTitle}</td>
                  <td className="p-4 text-gold-400 font-semibold uppercase text-[10px]">{l.source}</td>
                  <td className="p-4 text-white font-medium">{l.brokerName}</td>
                  <td className="p-4">
                    <span className="bg-slate-800 text-slate-200 text-[9px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded-sm capitalize border border-slate-700/60">
                      {l.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right text-slate-400">{l.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
