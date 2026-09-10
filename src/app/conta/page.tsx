"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PropertyCard from "@/components/property/PropertyCard";
import { mockProperties, mockSearchAlerts } from "@/data/mockData";
import {
  Heart,
  Bell,
  Eye,
  Calendar,
  MessageSquare,
  User,
  Plus,
  Trash2,
  CheckCircle2,
  MapPin,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function ContaCompradorPage() {
  const [activeTab, setActiveTab] = useState<
    "favoritos" | "alertas" | "vistos" | "visitas" | "mensagens" | "perfil"
  >("favoritos");

  const [alerts, setAlerts] = useState(mockSearchAlerts);
  const [newAlertTitle, setNewAlertTitle] = useState("");
  const [newAlertFrequency, setNewAlertFrequency] = useState<"imediato" | "diario" | "semanal">("imediato");
  const [showNewAlertModal, setShowNewAlertModal] = useState(false);

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlertTitle.trim()) return;
    const newAlert = {
      id: `alert-${Date.now()}`,
      title: newAlertTitle.trim(),
      criteria: {
        operation: "venda" as const,
        city: "São Paulo",
      },
      frequency: newAlertFrequency,
      matchesCount: 3,
      createdAt: new Date().toISOString().split("T")[0],
      active: true,
    };
    setAlerts([newAlert, ...alerts]);
    setNewAlertTitle("");
    setShowNewAlertModal(false);
  };

  const removeAlert = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Header />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* User Greeting Bar */}
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200/90 shadow-subtle mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-navy-950 text-white font-serif font-bold text-2xl flex items-center justify-center shadow-sm">
              RM
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-600">
                Conta do Comprador / Investidor
              </span>
              <h1 className="font-serif text-2xl font-bold text-navy-950">
                Dr. Roberto Albuquerque
              </h1>
              <p className="text-xs text-slate-500">
                roberto.albuquerque@invest.com.br • Membro VIP desde Jan 2024
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/imoveis"
              className="px-4 py-2.5 bg-navy-900 text-white rounded-xl text-xs font-semibold shadow hover:bg-navy-800 transition"
            >
              Explorar Mais Imóveis
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-8 overflow-x-auto text-xs font-bold">
          {[
            { id: "favoritos", label: "Meus Favoritos", icon: Heart, count: 3 },
            { id: "alertas", label: "Alertas & Buscas Salvas", icon: Bell, count: alerts.length },
            { id: "vistos", label: "Imóveis Visualizados", icon: Eye, count: 5 },
            { id: "visitas", label: "Visitas Agendadas", icon: Calendar, count: 1 },
            { id: "mensagens", label: "Mensagens com Corretores", icon: MessageSquare, count: 2 },
            { id: "perfil", label: "Meu Perfil", icon: User },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition whitespace-nowrap ${
                  isActive
                    ? "bg-navy-900 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-navy-900"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      isActive ? "bg-gold-500 text-navy-950 font-bold" : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === "favoritos" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-bold text-xl text-navy-950">
                Imóveis Salvos na sua Lista
              </h2>
              <Link href="/comparar" className="text-xs font-bold text-navy-900 hover:underline inline-flex items-center gap-1.5">
                <span>Comparar no Comparador Lado a Lado</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mockProperties.slice(0, 3).map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "alertas" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif font-bold text-xl text-navy-950">
                  Alertas de Novos Imóveis
                </h2>
                <p className="text-xs text-slate-500">
                  Receba avisos instantâneos quando um imóvel compatível com seus critérios for anunciado.
                </p>
              </div>

              <button
                onClick={() => setShowNewAlertModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-navy-900 text-white rounded-xl text-xs font-bold shadow hover:bg-navy-800 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Criar Novo Alerta</span>
              </button>
            </div>

            {/* Alertas List */}
            <div className="space-y-3">
              {alerts.map((al) => (
                <div
                  key={al.id}
                  className="bg-white rounded-xl p-5 border border-stone-200/90 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <h4 className="font-serif font-bold text-base text-navy-950">
                        {al.title}
                      </h4>
                      <span className="bg-stone-100 text-stone-700 text-[10px] px-2 py-0.5 rounded-sm capitalize font-medium border border-stone-200/80">
                        {al.frequency}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400">
                      Criado em {al.createdAt} • {al.matchesCount} imóveis disponíveis agora
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href="/imoveis"
                      className="text-xs font-bold uppercase tracking-wider text-navy-950 bg-stone-100 hover:bg-navy-950 hover:text-white px-3.5 py-2 rounded-sm border border-stone-200/80 transition"
                    >
                      Ver Resultados ({al.matchesCount})
                    </Link>
                    <button
                      onClick={() => removeAlert(al.id)}
                      className="text-stone-400 hover:text-rose-600 p-2 transition"
                      title="Excluir alerta"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Criar Alerta */}
            {showNewAlertModal && (
              <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-luxury border border-stone-200/90 space-y-4">
                  <h3 className="font-serif font-bold text-xl text-navy-950">
                    Criar Alerta de Imóvel
                  </h3>
                  <form onSubmit={handleCreateAlert} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">
                        Descrição do Critério
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Cobertura no Leblon até R$ 35M"
                        value={newAlertTitle}
                        onChange={(e) => setNewAlertTitle(e.target.value)}
                        className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-sm text-sm focus:outline-none focus:border-navy-950"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">
                        Frequência de Notificação
                      </label>
                      <select
                        value={newAlertFrequency}
                        onChange={(e) => setNewAlertFrequency(e.target.value as any)}
                        className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-sm text-sm focus:outline-none focus:border-navy-950"
                      >
                        <option value="imediato">Imediato (ao publicar)</option>
                        <option value="diario">Resumo Diário</option>
                        <option value="semanal">Resumo Semanal</option>
                      </select>
                    </div>

                    <div className="flex gap-2 pt-3">
                      <button
                        type="button"
                        onClick={() => setShowNewAlertModal(false)}
                        className="flex-1 py-2.5 text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-sm text-[11px] uppercase tracking-wider font-semibold border border-stone-200/80 transition"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2.5 text-white bg-navy-950 hover:bg-navy-900 rounded-sm text-[11px] uppercase tracking-wider font-semibold shadow-sm transition"
                      >
                        Salvar Alerta
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "vistos" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <h2 className="font-serif font-bold text-xl text-navy-950">
              Imóveis que Você Visualizou Recentemente
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mockProperties.slice(2, 5).map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "visitas" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <h2 className="font-serif font-bold text-xl text-navy-950">
              Suas Visitas Agendadas
            </h2>
            <div className="bg-white rounded-xl p-6 border border-stone-200/90 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-md bg-gold-50/70 border border-gold-200/60 text-gold-700 font-bold text-center">
                  <span className="block text-xs uppercase">Sáb</span>
                  <span className="text-xl">15</span>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-navy-950">
                    Mansão Contemporânea Fazenda Boa Vista
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    10:00 - 12:30 • Corretor: Alexandre Vasconcelos
                  </p>
                  <span className="inline-block mt-2 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                    Visita Confirmada com Traslado
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://wa.me/5511998821400"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-[#1D7F54] hover:bg-[#166543] text-white rounded-sm text-[11px] uppercase tracking-wider font-semibold shadow-sm transition"
                >
                  Falar com Corretor
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === "mensagens" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <h2 className="font-serif font-bold text-xl text-navy-950">
              Histórico de Mensagens com Corretores
            </h2>
            <div className="bg-white rounded-xl p-6 border border-stone-200/90 shadow-subtle space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80"
                    alt="Alexandre"
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-navy-950">Alexandre Vasconcelos</h4>
                    <p className="text-xs text-stone-500">Ref: Mansão Fazenda Boa Vista</p>
                  </div>
                </div>
                <span className="text-xs text-stone-400">Hoje às 10:14</span>
              </div>
              <p className="text-xs text-stone-700 bg-stone-50/80 border border-stone-200/60 p-4 rounded-md leading-relaxed">
                "Excelente Dr. Roberto! O plano de voo já foi submetido e autorizado pela administração da Fazenda Boa Vista. Estarei aguardando no heliponto às 09h55."
              </p>
            </div>
          </div>
        )}

        {activeTab === "perfil" && (
          <div className="bg-white rounded-xl p-8 border border-stone-200/90 shadow-subtle max-w-2xl space-y-4 text-xs">
            <h2 className="font-serif font-bold text-xl text-navy-950">
              Dados do seu Perfil
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Nome</label>
                <input
                  type="text"
                  defaultValue="Dr. Roberto Albuquerque"
                  className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-sm text-stone-900 focus:outline-none focus:border-navy-950"
                />
              </div>
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Telefone</label>
                <input
                  type="text"
                  defaultValue="+55 (11) 98845-1234"
                  className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-sm text-stone-900 focus:outline-none focus:border-navy-950"
                />
              </div>
            </div>
            <button
              type="button"
              className="mt-4 px-6 py-2.5 bg-navy-950 text-white hover:bg-navy-900 rounded-sm text-[11px] uppercase tracking-wider font-semibold shadow-sm transition"
            >
              Salvar Alterações
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
