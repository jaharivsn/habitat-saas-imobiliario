"use client";

import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  MessageSquare,
  ShieldCheck,
  Sliders,
  AlertOctagon,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface ModerationItem {
  id: string;
  title: string;
  brokerName: string;
  agencyName: string;
  price: number;
  operation: "venda" | "aluguel";
  status: "em_analise" | "aprovado" | "rejeitado" | "suspenso" | "alteracao_solicitada";
  photo: string;
  submittedAt: string;
  rejectionReason?: string;
}

interface BrokerPendingItem {
  id: string;
  name: string;
  creci: string;
  agency: string;
  email: string;
  type: "corretor" | "imobiliaria";
  submittedAt: string;
  status: "pendente" | "aprovado" | "rejeitado";
}

interface ReportItem {
  id: string;
  propertyTitle: string;
  reportedBy: string;
  reason: string;
  details: string;
  date: string;
  status: "aberta" | "resolvida" | "descartada";
}

export default function ModeracaoPage() {
  const [activeTab, setActiveTab] = useState<"anuncios" | "credenciamento" | "denuncias" | "regras">("anuncios");

  // Listings state
  const [items, setItems] = useState<ModerationItem[]>([
    {
      id: "mod-1",
      title: "Mansão Contemporânea com Piscina de Borda Infinita",
      brokerName: "Alexandre Vasconcelos",
      agencyName: "Habitat Prime Realty",
      price: 28500000,
      operation: "venda",
      status: "em_analise",
      photo: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
      submittedAt: "Hoje às 09:30",
    },
    {
      id: "mod-2",
      title: "Penthouse Triplex Exclusiva no Leblon com Rooftop",
      brokerName: "Beatriz Monteiro",
      agencyName: "Apex Realty",
      price: 36000000,
      operation: "venda",
      status: "em_analise",
      photo: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
      submittedAt: "Hoje às 08:15",
    },
    {
      id: "mod-3",
      title: "Laje Corporativa Triple A Faria Lima",
      brokerName: "Rodrigo Castro",
      agencyName: "Castro Properties",
      price: 185000,
      operation: "aluguel",
      status: "em_analise",
      photo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
      submittedAt: "Ontem às 18:40",
    },
  ]);

  // Brokers/Agencies pending
  const [pendingBrokers, setPendingBrokers] = useState<BrokerPendingItem[]>([
    {
      id: "brk-pend-1",
      name: "Marcus Vinicius Cordeiro",
      creci: "201948-F",
      agency: "Independente",
      email: "marcus.cordeiro@corretores.com",
      type: "corretor",
      submittedAt: "Hoje às 10:15",
      status: "pendente",
    },
    {
      id: "brk-pend-2",
      name: "Vanguard Luxury Real Estate",
      creci: "049821-J",
      agency: "Vanguard Matriz",
      email: "contato@vanguardluxury.com.br",
      type: "imobiliaria",
      submittedAt: "Ontem às 16:30",
      status: "pendente",
    },
  ]);

  // Reports state
  const [reports, setReports] = useState<ReportItem[]>([
    {
      id: "rep-1",
      propertyTitle: "Apartamento Jardins Garden com Terraço",
      reportedBy: "Beatriz Monteiro (CRECI 194820)",
      reason: "Duplicidade de anúncio com preço falso",
      details: "O corretor anunciou por valor 30% menor sem autorização do vendedor com o intuito de captar leads.",
      date: "Hoje às 07:45",
      status: "aberta",
    },
    {
      id: "rep-2",
      propertyTitle: "Villa Toscana Quinta da Baroneza",
      reportedBy: "Proprietário Verificado",
      reason: "Anúncio não autorizado",
      details: "Não outorguei autorização de venda para este corretor. Exijo a remoção imediata da plataforma.",
      date: "Ontem às 14:10",
      status: "aberta",
    },
  ]);

  // Modal Solicitar Alterações
  const [selectedItemForFeedback, setSelectedItemForFeedback] = useState<ModerationItem | null>(null);
  const [feedbackNote, setFeedbackNote] = useState("");

  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAction = (id: string, action: ModerationItem["status"]) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, status: action } : it))
    );
    showToast(`Anúncio atualizado para "${action.replace("_", " ")}".`);
  };

  const handleSendFeedback = () => {
    if (!selectedItemForFeedback) return;
    setItems((prev) =>
      prev.map((it) =>
        it.id === selectedItemForFeedback.id
          ? { ...it, status: "alteracao_solicitada", rejectionReason: feedbackNote }
          : it
      )
    );
    showToast(`Alterações solicitadas ao corretor de "${selectedItemForFeedback.title}".`);
    setSelectedItemForFeedback(null);
    setFeedbackNote("");
  };

  const handleBrokerStatus = (id: string, status: "aprovado" | "rejeitado") => {
    setPendingBrokers((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
    showToast(`Credenciamento profissional ${status}.`);
  };

  const handleReportAction = (id: string, status: "resolvida" | "descartada") => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    showToast(`Denúncia marcada como ${status}.`);
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-700 text-white px-5 py-3 rounded-md shadow-lg text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-400">
          Auditoria, Compliance & Governança
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-0.5">
          Moderação & Compliance
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Aprovação de anúncios, validação jurídica de CRECI, denúncias de fraudes e regras automatizadas.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {[
          { id: "anuncios", label: "Aprovação de Anúncios", count: items.filter(i => i.status === "em_analise").length },
          { id: "credenciamento", label: "Credenciamento Profissional", count: pendingBrokers.filter(b => b.status === "pendente").length },
          { id: "denuncias", label: "Denúncias de Fraude", count: reports.filter(r => r.status === "aberta").length },
          { id: "regras", label: "Regras Automáticas", count: null },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-3.5 py-2 rounded-sm text-[11px] font-semibold uppercase tracking-wider transition flex items-center gap-2 ${
              activeTab === tab.id
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== null && (
              <span className="px-1.5 py-0.5 rounded-full bg-rose-950 text-rose-300 text-[10px] font-mono border border-rose-800/40">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: APROVAÇÃO DE ANÚNCIOS */}
      {activeTab === "anuncios" && (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-[#121826] rounded-xl border border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-subtle"
            >
              <div className="flex items-start gap-4">
                <img
                  src={item.photo}
                  alt={item.title}
                  className="w-28 h-24 rounded-lg object-cover shrink-0 shadow-md border border-slate-800"
                />
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-rose-400 uppercase bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/40">
                      {item.status.replace("_", " ")}
                    </span>
                    <span className="text-xs text-slate-400">Submetido: {item.submittedAt}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Responsável: <span className="text-slate-200 font-semibold">{item.brokerName}</span> ({item.agencyName})
                  </p>
                  <div className="font-serif text-sm font-bold text-gold-400">
                    {formatPrice(item.price, item.operation)}
                  </div>
                  {item.rejectionReason && (
                    <p className="text-[11px] text-amber-400 bg-amber-950/40 p-2 rounded-lg border border-amber-800/30">
                      Nota de alteração: {item.rejectionReason}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleAction(item.id, "aprovado")}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-sm text-[11px] font-semibold uppercase tracking-wider shadow-subtle flex items-center gap-1.5 transition"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Aprovar</span>
                </button>

                <button
                  onClick={() => setSelectedItemForFeedback(item)}
                  className="px-3.5 py-2 bg-amber-600/80 hover:bg-amber-600 text-white rounded-sm text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 transition"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Solicitar Ajustes</span>
                </button>

                <button
                  onClick={() => handleAction(item.id, "rejeitado")}
                  className="px-3 py-2 bg-rose-600/80 hover:bg-rose-600 text-white rounded-sm text-[11px] font-semibold uppercase tracking-wider transition flex items-center gap-1.5"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reprovar</span>
                </button>

                <button
                  onClick={() => handleAction(item.id, "suspenso")}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-sm text-[11px] font-semibold uppercase tracking-wider transition"
                >
                  Suspender
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: CREDENCIAMENTO PROFISSIONAL */}
      {activeTab === "credenciamento" && (
        <div className="space-y-4">
          <div className="bg-[#121826] rounded-xl border border-slate-800 p-6 shadow-subtle">
            <h3 className="font-serif font-bold text-lg text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-rose-400" />
              <span>Validação de CRECI & Documentação Cadastral</span>
            </h3>

            <div className="space-y-3">
              {pendingBrokers.map((b) => (
                <div
                  key={b.id}
                  className="p-4 bg-slate-900/80 rounded-lg border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{b.name}</span>
                      <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-sm bg-navy-950 text-gold-300 border border-gold-400/30">
                        {b.type}
                      </span>
                      <span className="text-slate-400 font-mono text-[11px]">{b.submittedAt}</span>
                    </div>
                    <p className="text-slate-300">
                      CRECI: <span className="font-mono font-bold text-gold-400">{b.creci}</span> • Vínculo: {b.agency}
                    </p>
                    <p className="text-slate-400 font-mono text-[11px]">{b.email}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleBrokerStatus(b.id, "aprovado")}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-sm text-xs font-semibold uppercase tracking-wider transition flex items-center gap-1.5 shadow-subtle"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Validar CRECI</span>
                    </button>
                    <button
                      onClick={() => handleBrokerStatus(b.id, "rejeitado")}
                      className="px-3 py-2 bg-rose-600/80 hover:bg-rose-600 text-white rounded-sm text-xs font-semibold uppercase tracking-wider transition"
                    >
                      Rejeitar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DENÚNCIAS DE FRAUDE */}
      {activeTab === "denuncias" && (
        <div className="space-y-4">
          {reports.map((rep) => (
            <div
              key={rep.id}
              className="bg-[#121826] rounded-xl border border-slate-800 p-6 space-y-3 text-xs shadow-subtle"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <AlertOctagon className="w-4 h-4 text-rose-500" />
                  <span className="font-bold text-white text-sm">{rep.propertyTitle}</span>
                  <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-sm bg-rose-950/80 text-rose-400 border border-rose-800/60 font-semibold tracking-wider">
                    {rep.status}
                  </span>
                </div>
                <span className="text-slate-400">{rep.date}</span>
              </div>

              <div className="space-y-1">
                <p className="text-slate-400">
                  Denunciante: <span className="text-slate-200 font-semibold">{rep.reportedBy}</span>
                </p>
                <p className="text-rose-400 font-semibold">Motivo: {rep.reason}</p>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-slate-300">
                  "{rep.details}"
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleReportAction(rep.id, "resolvida")}
                  className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-sm text-[11px] font-semibold uppercase tracking-wider transition flex items-center gap-1.5 shadow-subtle"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Derrubar Anúncio Imediatamente</span>
                </button>
                <button
                  onClick={() => handleReportAction(rep.id, "descartada")}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-sm text-[11px] font-semibold uppercase tracking-wider transition"
                >
                  Descartar Denúncia
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: REGRAS AUTOMÁTICAS */}
      {activeTab === "regras" && (
        <div className="bg-[#121826] rounded-xl border border-slate-800 p-6 space-y-5 text-xs max-w-3xl shadow-subtle">
          <div>
            <h3 className="font-serif font-bold text-lg text-white mb-1 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-rose-400" />
              <span>Gatilhos de Moderação Automatizada (AI & Algoritmos)</span>
            </h3>
            <p className="text-slate-400">
              Parâmetros executados antes de liberar o anúncio na vitrine pública.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {[
              {
                title: "Bloqueio de Fotos com Marcas D'água Concorrentes",
                desc: "Detecta logotipos sobrepostos nas fotos e encaminha para fila manual.",
                active: true,
              },
              {
                title: "Alerta de Discrepância de Preço por m²",
                desc: "Sinaliza automaticamente imóveis com valor 35% divergente da média histórica do bairro.",
                active: true,
              },
              {
                title: "Verificação Obrigatória de CRECI Ativo",
                desc: "Impede publicação caso o CRECI do corretor esteja sob pendência cadastral.",
                active: true,
              },
              {
                title: "Exigência Mínima de 8 Fotografias em Alta Resolução",
                desc: "Rejeita rascunhos que não cumpram o padrão editorial da Habitat.",
                active: true,
              },
            ].map((rule, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between gap-4"
              >
                <div>
                  <h4 className="font-bold text-white text-sm">{rule.title}</h4>
                  <p className="text-slate-400 mt-0.5">{rule.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input type="checkbox" defaultChecked={rule.active} className="sr-only peer" />
                  <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-500" />
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL SOLICITAR ALTERAÇÕES */}
      {selectedItemForFeedback && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121826] border border-slate-800 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-serif font-bold text-lg text-white">
              Solicitar Ajustes no Anúncio
            </h3>
            <p className="text-xs text-slate-400">
              Descreva as pendências para que o corretor responsável faça as devidas correções antes da aprovação final.
            </p>

            <textarea
              rows={4}
              value={feedbackNote}
              onChange={(e) => setFeedbackNote(e.target.value)}
              placeholder="Ex: As primeiras fotos contêm marca d'água de outro portal. Por favor, suba fotos limpas e especifique o condomínio correto."
              className="w-full p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />

            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => setSelectedItemForFeedback(null)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-sm text-[11px] font-semibold uppercase tracking-wider hover:bg-slate-700 transition"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSendFeedback}
                className="px-4 py-2 bg-rose-600 text-white rounded-sm text-[11px] font-semibold uppercase tracking-wider hover:bg-rose-700 transition shadow-subtle"
              >
                Enviar Apontamentos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
