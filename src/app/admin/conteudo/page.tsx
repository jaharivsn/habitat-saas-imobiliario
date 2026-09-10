"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  status: "publicado" | "rascunho";
}

export default function AdminConteudoPage() {
  const [articles] = useState<ArticleItem[]>([
    {
      id: "art-1",
      slug: "tendencias-arquitetura-campo-2025",
      title: "A ascensão das residências de campo contemporâneas com caixilhos minimalistas",
      category: "Arquitetura",
      date: "08/03/2024",
      author: "Curadoria Habitat",
      status: "publicado",
    },
    {
      id: "art-2",
      slug: "investir-winter-garden-florida",
      title: "Por que Winter Garden se consolidou como o polo imobiliário de maior liquidez na Flórida",
      category: "Investimentos",
      date: "02/03/2024",
      author: "Alexandre Vasconcelos",
      status: "publicado",
    },
    {
      id: "art-3",
      slug: "metro-quadrado-leblon-historico",
      title: "Análise histórica do metro quadrado no Leblon e a escassez crônica de novos lançamentos",
      category: "Mercado Nobre",
      date: "24/02/2024",
      author: "Apex Realty",
      status: "publicado",
    },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-400">
            Editorial & SEO Insights
          </span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">
            Gestão de Conteúdo & Blog
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Publique análises de mercado, guias arquitetônicos e notícias para atração orgânica de investidores.
          </p>
        </div>

        <button className="bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-semibold uppercase tracking-wider px-4 py-2.5 rounded-sm shadow-subtle flex items-center gap-1.5 transition">
          <Plus className="w-4 h-4" />
          <span>Escrever Novo Artigo</span>
        </button>
      </div>

      <div className="bg-[#121826] rounded-xl border border-slate-800 overflow-hidden shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0F1420] border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-4 pl-6">Artigo</th>
                <th className="p-4">Categoria</th>
                <th className="p-4">Autor</th>
                <th className="p-4">Data</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {articles.map((art) => (
                <tr key={art.id} className="hover:bg-slate-900/40 transition">
                  <td className="p-4 pl-6 font-bold text-white max-w-md">
                    {art.title}
                  </td>
                  <td className="p-4 text-gold-400 font-semibold">{art.category}</td>
                  <td className="p-4 text-slate-300">{art.author}</td>
                  <td className="p-4 text-slate-400">{art.date}</td>
                  <td className="p-4">
                    <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-sm font-semibold">
                      {art.status}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right space-x-2">
                    <Link
                      href="/blog"
                      target="_blank"
                      className="text-slate-400 hover:text-white"
                    >
                      Ver no Blog
                    </Link>
                    <button className="text-rose-400 hover:underline font-semibold">
                      Editar
                    </button>
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
