"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PlusCircle,
  Search,
  MoreVertical,
  Edit,
  Copy,
  PauseCircle,
  PlayCircle,
  CheckCircle2,
  Trash2,
  Share2,
  Sparkles,
  ExternalLink,
  Archive,
} from "lucide-react";
import { mockProperties } from "@/data/mockData";
import { Property, ListingStatus } from "@/types";
import { formatPrice } from "@/lib/utils";
import StatusBadge from "@/components/ui/StatusBadge";

export default function MeusImoveisPage() {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [search, setSearch] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const updateStatus = (id: string, newStatus: ListingStatus) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
    setActiveMenuId(null);
    showToast(`Status do imóvel alterado para "${newStatus}".`);
  };

  const toggleHighlight = (id: string) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p))
    );
    setActiveMenuId(null);
    showToast("Destaque atualizado com sucesso.");
  };

  const duplicateProperty = (prop: Property) => {
    const duplicated: Property = {
      ...prop,
      id: `prop-${Date.now()}`,
      slug: `${prop.slug}-copia`,
      code: `${prop.code}-C`,
      title: `${prop.title} (Cópia)`,
      status: "draft",
      viewsCount: 0,
      leadsCount: 0,
    };
    setProperties([duplicated, ...properties]);
    setActiveMenuId(null);
    showToast("Imóvel duplicado como rascunho com sucesso!");
  };

  const shareProperty = async (prop: Property) => {
    const url = `${window.location.origin}/imovel/${prop.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: prop.title, url });
        setActiveMenuId(null);
        return;
      } catch {}
    }
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      showToast("Link copiado para a área de transferência!");
      setActiveMenuId(null);
    }
  };

  const deleteProperty = (id: string) => {
    setProperties(properties.filter((p) => p.id !== id));
    setActiveMenuId(null);
    showToast("Imóvel excluído com sucesso.");
  };

  const filtered = properties.filter((p) => {
    if (statusFilter !== "todos" && p.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.neighborhood.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const statuses = [
    { id: "todos", label: "Todos", count: properties.length },
    { id: "published", label: "Publicados", count: properties.filter((p) => p.status === "published").length },
    { id: "draft", label: "Rascunhos", count: properties.filter((p) => p.status === "draft").length },
    { id: "review", label: "Em Revisão", count: properties.filter((p) => p.status === "review").length },
    { id: "paused", label: "Pausados", count: properties.filter((p) => p.status === "paused").length },
    { id: "sold", label: "Vendidos", count: properties.filter((p) => p.status === "sold").length },
    { id: "rented", label: "Alugados", count: properties.filter((p) => p.status === "rented").length },
    { id: "archived", label: "Arquivados", count: properties.filter((p) => p.status === "archived").length },
  ];

  return (
    <div className="space-y-6">
      {/* Header Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-navy-950 text-white px-5 py-3 rounded-sm shadow-luxury border border-gold-500/30 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <Sparkles className="w-4 h-4 text-gold-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Title & CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-600">
            Portfólio de Imóveis
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 mt-0.5">
            Meus Imóveis
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Gerencie status, visualizações, destaques na busca e edite seus anúncios.
          </p>
        </div>

        <Link
          href="/dashboard/imoveis/novo"
          className="bg-navy-950 hover:bg-navy-900 text-white text-[11px] uppercase tracking-wider font-semibold px-5 py-3 rounded-sm shadow-sm flex items-center justify-center gap-2 transition"
        >
          <PlusCircle className="w-4 h-4 text-gold-400" />
          <span>Cadastrar Novo Imóvel</span>
        </Link>
      </div>

      {/* Status Filter Tabs (All 7 statuses + Todos) */}
      <div className="flex items-center gap-1.5 border-b border-stone-200 pb-2 overflow-x-auto text-xs font-bold">
        {statuses.map((s) => {
          const isActive = statusFilter === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setStatusFilter(s.id)}
              className={`px-3 py-1.5 rounded-sm whitespace-nowrap transition text-[11px] uppercase tracking-wider ${
                isActive
                  ? "bg-navy-950 text-white shadow-xs"
                  : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200/80"
              }`}
            >
              <span>{s.label}</span>
              <span
                className={`ml-1.5 px-1.5 py-0.2 rounded-sm text-[10px] ${
                  isActive ? "bg-white/20 text-white" : "bg-stone-100 text-stone-500"
                }`}
              >
                {s.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200/90 shadow-subtle flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por título, código ou bairro..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-stone-50/60 border border-stone-200 rounded-sm text-xs focus:outline-none focus:border-navy-950"
          />
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-xl border border-stone-200/90 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-stone-50/80 border-b border-stone-200 text-stone-500 font-semibold uppercase text-[10px] tracking-[0.16em]">
              <tr>
                <th className="p-4 pl-6">Imóvel</th>
                <th className="p-4">Preço</th>
                <th className="p-4">Status</th>
                <th className="p-4">Visualizações</th>
                <th className="p-4">Leads</th>
                <th className="p-4">Destaque</th>
                <th className="p-4 pr-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((prop) => (
                <tr key={prop.id} className="hover:bg-slate-50/70 transition">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={prop.photos[0]}
                        alt={prop.title}
                        className="w-14 h-12 rounded-xl object-cover shadow-sm shrink-0"
                      />
                      <div className="min-w-0 max-w-xs">
                        <span className="font-mono text-[10px] font-bold text-slate-400 block">
                          Cód. {prop.code}
                        </span>
                        <h4 className="font-serif font-bold text-navy-950 truncate">
                          {prop.title}
                        </h4>
                        <span className="text-[10px] text-slate-500">
                          {prop.neighborhood}, {prop.city}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="font-serif font-bold text-navy-950">
                      {formatPrice(prop.price, prop.operation)}
                    </div>
                    <span className="text-[10px] text-slate-400 capitalize">
                      {prop.operation}
                    </span>
                  </td>

                  <td className="p-4">
                    <StatusBadge status={prop.status} />
                  </td>

                  <td className="p-4 font-mono font-bold text-slate-700">
                    {prop.viewsCount.toLocaleString("pt-BR")}
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-navy-950 font-mono">
                      {prop.leadsCount}
                    </span>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => toggleHighlight(prop.id)}
                      className={`p-1.5 rounded-lg border transition ${
                        prop.isFeatured
                          ? "bg-gold-50 border-gold-300 text-gold-700 font-bold"
                          : "bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600"
                      }`}
                      title={prop.isFeatured ? "Remover destaque" : "Destacar anúncio"}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  </td>

                  <td className="p-4 pr-6 text-right relative">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/imovel/${prop.slug}`}
                        target="_blank"
                        className="p-1.5 text-slate-400 hover:text-navy-900 rounded-lg hover:bg-slate-100"
                        title="Ver no Portal Público"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href={`/dashboard/imoveis/${prop.id}`}
                        className="p-1.5 text-slate-400 hover:text-navy-900 rounded-lg hover:bg-slate-100"
                        title="Editar Imóvel"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>

                      <div className="relative">
                        <button
                          onClick={() =>
                            setActiveMenuId(activeMenuId === prop.id ? null : prop.id)
                          }
                          className="p-1.5 text-slate-400 hover:text-navy-900 rounded-lg hover:bg-slate-100"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {activeMenuId === prop.id && (
                          <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-dropdown border border-slate-200/90 p-1.5 z-30 text-left space-y-0.5 animate-in fade-in zoom-in-95 duration-100">
                            <button
                              onClick={() => duplicateProperty(prop)}
                              className="w-full flex items-center gap-2 p-2 hover:bg-slate-50 rounded-md text-slate-700 font-medium text-xs"
                            >
                              <Copy className="w-3.5 h-3.5" />
                              <span>Duplicar Imóvel</span>
                            </button>

                            <button
                              onClick={() => shareProperty(prop)}
                              className="w-full flex items-center gap-2 p-2 hover:bg-slate-50 rounded-xl text-slate-700 font-medium"
                            >
                              <Share2 className="w-3.5 h-3.5" />
                              <span>Compartilhar</span>
                            </button>

                            <button
                              onClick={() => toggleHighlight(prop.id)}
                              className="w-full flex items-center gap-2 p-2 hover:bg-slate-50 rounded-xl text-gold-700 font-medium"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>{prop.isFeatured ? "Remover Destaque" : "Destacar Anúncio"}</span>
                            </button>

                            {prop.status === "published" ? (
                              <button
                                onClick={() => updateStatus(prop.id, "paused")}
                                className="w-full flex items-center gap-2 p-2 hover:bg-slate-50 rounded-xl text-amber-700 font-medium"
                              >
                                <PauseCircle className="w-3.5 h-3.5" />
                                <span>Pausar anúncio</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => updateStatus(prop.id, "published")}
                                className="w-full flex items-center gap-2 p-2 hover:bg-slate-50 rounded-xl text-emerald-700 font-medium"
                              >
                                <PlayCircle className="w-3.5 h-3.5" />
                                <span>Publicar Anúncio</span>
                              </button>
                            )}

                            <button
                              onClick={() => updateStatus(prop.id, "sold")}
                              className="w-full flex items-center gap-2 p-2 hover:bg-stone-50 rounded-md text-stone-800 font-medium transition"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Marcar como Vendido</span>
                            </button>

                            <button
                              onClick={() => updateStatus(prop.id, "rented")}
                              className="w-full flex items-center gap-2 p-2 hover:bg-stone-50 rounded-md text-navy-950 font-medium transition"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Marcar como Alugado</span>
                            </button>

                            <button
                              onClick={() => updateStatus(prop.id, "archived")}
                              className="w-full flex items-center gap-2 p-2 hover:bg-stone-50 rounded-md text-slate-600 font-medium transition"
                            >
                              <Archive className="w-3.5 h-3.5" />
                              <span>Arquivar</span>
                            </button>

                            <div className="h-px bg-stone-100 my-1" />

                            <button
                              onClick={() => deleteProperty(prop.id)}
                              className="w-full flex items-center gap-2 p-2 hover:bg-rose-50 rounded-md text-rose-600 font-medium transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Excluir</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
