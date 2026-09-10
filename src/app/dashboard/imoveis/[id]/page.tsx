"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { mockProperties } from "@/data/mockData";
import { formatPrice } from "@/lib/utils";
import {
  ArrowLeft,
  Save,
  Trash2,
  ExternalLink,
  Eye,
  Users2,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function EditarImovelPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const property = mockProperties.find((p) => p.id === id) || mockProperties[0];

  const [title, setTitle] = useState(property.title);
  const [price, setPrice] = useState(property.price);
  const [status, setStatus] = useState(property.status);
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {savedToast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-700 text-white px-4 py-2.5 rounded-md shadow-lg text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Alterações salvas com sucesso!</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/imoveis"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-navy-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Lista de Imóveis</span>
        </Link>

        <Link
          href={`/imovel/${property.slug}`}
          target="_blank"
          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-navy-950 bg-white border border-stone-200 px-3 py-1.5 rounded-sm hover:bg-stone-50 transition shadow-xs"
        >
          <span>Ver Anúncio no Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Edit Card */}
      <div className="bg-white rounded-xl p-6 sm:p-10 border border-stone-200/90 shadow-subtle space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-100 gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold text-stone-400">
              Código: {property.code}
            </span>
            <h1 className="font-serif text-2xl font-bold text-navy-950 mt-0.5">
              Editar Imóvel
            </h1>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 text-xs font-semibold">
            <div className="flex items-center gap-1.5 text-stone-700 bg-[#FAF9F6] border border-stone-200/90 px-3 py-1.5 rounded-sm text-[11px]">
              <Eye className="w-4 h-4 text-gold-700" />
              <span>{property.viewsCount.toLocaleString("pt-BR")} visualizações</span>
            </div>
            <div className="flex items-center gap-1.5 text-stone-700 bg-[#FAF9F6] border border-stone-200/90 px-3 py-1.5 rounded-sm text-[11px]">
              <Users2 className="w-4 h-4 text-navy-950" />
              <span>{property.leadsCount} leads capturados</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-stone-700 block mb-1">
              Título do Anúncio
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-sm text-sm focus:outline-none focus:border-navy-950"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-stone-700 block mb-1">
                Preço Atual (R$)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-sm text-sm font-bold text-navy-950 focus:outline-none focus:border-navy-950"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">
                Status da Publicação
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-sm text-sm focus:outline-none focus:border-navy-950"
              >
                <option value="published">Publicado</option>
                <option value="draft">Rascunho</option>
                <option value="paused">Pausado</option>
                <option value="sold">Vendido</option>
                <option value="rented">Alugado</option>
              </select>
            </div>
          </div>

          <div className="pt-6 flex items-center justify-between border-t border-stone-100">
            <button
              type="button"
              onClick={() => router.push("/dashboard/imoveis")}
              className="px-4 py-2.5 rounded-sm text-stone-500 hover:text-rose-600 text-[11px] uppercase tracking-wider font-semibold transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-navy-950 hover:bg-navy-900 text-white rounded-sm text-[11px] uppercase tracking-wider font-semibold shadow-sm flex items-center gap-1.5 transition"
            >
              <Save className="w-4 h-4 text-gold-400" />
              <span>Salvar Alterações</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
