import Link from "next/link";
import {
  Building,
  Users2,
  Calendar,
  Eye,
  MessageCircle,
  PlusCircle,
  Clock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { mockProperties, mockLeads, mockCalendarEvents } from "@/data/mockData";
import { formatPrice } from "@/lib/utils";

export default function DashboardOverviewPage() {
  const activeListings = mockProperties.filter((p) => p.status === "published");
  const recentLeads = mockLeads.slice(0, 4);
  const upcomingVisits = mockCalendarEvents.slice(0, 3);
  const mostViewedProperties = [...mockProperties].sort(
    (a, b) => b.viewsCount - a.viewsCount
  ).slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
            Painel Executivo do Corretor
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 mt-0.5">
            Olá, Alexandre Vasconcelos
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Aqui está o panorama atualizado dos seus ativos, leads e visitas nesta semana.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/imoveis/novo"
            className="bg-navy-950 hover:bg-gold-600 hover:text-navy-950 text-white text-[11px] font-semibold uppercase tracking-wider px-4 py-2.5 rounded-sm shadow-subtle hover:shadow-luxury transition-all duration-300 flex items-center gap-2"
          >
            <PlusCircle className="w-3.5 h-3.5 text-gold-400 group-hover:text-navy-950" />
            <span>Cadastrar Imóvel</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Imóveis Ativos */}
        <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em]">Ativos</span>
            <Building className="w-4 h-4 text-navy-950" />
          </div>
          <div className="font-serif font-bold text-2xl text-navy-950">14</div>
          <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-0.5">
            +2 adicionados este mês
          </span>
        </div>

        {/* Em Revisão / Pendentes */}
        <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em]">Pendentes</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="font-serif font-bold text-2xl text-navy-950">2</div>
          <span className="text-[10px] text-stone-400 font-mono">Em moderação</span>
        </div>

        {/* Imóveis Vendidos / Alugados */}
        <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em]">Negociados</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="font-serif font-bold text-2xl text-navy-950">37</div>
          <span className="text-[10px] text-stone-400 font-mono">32 vendas • 5 locações</span>
        </div>

        {/* Leads Recebidos */}
        <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em]">Leads Novos</span>
            <Users2 className="w-4 h-4 text-stone-700" />
          </div>
          <div className="font-serif font-bold text-2xl text-navy-950">8</div>
          <span className="text-[10px] text-emerald-700 font-semibold">
            +3 aguardando contato
          </span>
        </div>

        {/* Visitas Agendadas */}
        <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em]">Visitas</span>
            <Calendar className="w-4 h-4 text-gold-600" />
          </div>
          <div className="font-serif font-bold text-2xl text-navy-950">5</div>
          <span className="text-[10px] text-stone-400 font-mono">Próximos 7 dias</span>
        </div>

        {/* Visualizações Totais */}
        <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-subtle space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em]">Visualizações</span>
            <Eye className="w-4 h-4 text-gold-700" />
          </div>
          <div className="font-serif font-bold text-2xl text-navy-950">21.8k</div>
          <span className="text-[10px] text-emerald-700 font-semibold font-mono">
            +18% vs mês anterior
          </span>
        </div>
      </div>

      {/* Analytics Graph & Pipeline Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Visual Analytics Chart */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-xl border border-stone-200/90 shadow-subtle space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-navy-950">
                Tráfego & Conversão de Leads (Últimas 6 Semanas)
              </h3>
              <p className="text-xs text-slate-500">
                Visualizações de anúncios vs. cliques diretos no botão WhatsApp
              </p>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-200">
              Taxa de Conversão: 4.8%
            </span>
          </div>

          {/* CSS-based Bar Graph */}
          <div className="h-56 flex items-end justify-between gap-3 sm:gap-6 pt-6 border-b border-stone-100 px-2">
            {[
              { week: "Sem 1", views: 2400, leads: 12, height: "45%" },
              { week: "Sem 2", views: 3100, leads: 18, height: "60%" },
              { week: "Sem 3", views: 2800, leads: 14, height: "52%" },
              { week: "Sem 4", views: 4200, leads: 26, height: "80%" },
              { week: "Sem 5", views: 3900, leads: 22, height: "74%" },
              { week: "Sem 6 (Atual)", views: 4890, leads: 31, height: "95%" },
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition">
                  {col.views}
                </div>
                <div
                  style={{ height: col.height }}
                  className="w-full max-w-[42px] bg-navy-900 rounded-t-lg group-hover:bg-gold-500 transition-all duration-300 relative"
                >
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/40" />
                </div>
                <span className="text-[10px] font-semibold text-slate-500">
                  {col.week}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-navy-900" />
                Visualizações de Anúncios
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-gold-500" />
                Destaques Patrocinados
              </span>
            </div>
            <Link href="/dashboard/performance" className="text-xs font-semibold uppercase tracking-wider text-navy-950 hover:text-gold-700 transition inline-flex items-center gap-1.5">
              <span>Ver Relatório Detalhado</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Upcoming Visits / Agenda Widget */}
        <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-stone-200/90 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <h3 className="font-serif font-semibold text-base text-navy-950">
              Próximas Visitas
            </h3>
            <Link href="/dashboard/agenda" className="text-xs font-semibold uppercase tracking-wider text-gold-700 hover:text-navy-950 transition">
              Ver Agenda
            </Link>
          </div>

          <div className="space-y-3">
            {upcomingVisits.map((vis) => (
              <div
                key={vis.id}
                className="p-3.5 bg-stone-50/70 rounded-lg border border-stone-200/70 space-y-1"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-navy-950">
                  <span>{vis.clientName}</span>
                  <span className="text-gold-800 bg-gold-50/80 px-2 py-0.5 rounded-sm text-[10px] font-mono border border-gold-200/60">
                    {vis.time}
                  </span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-1">{vis.propertyTitle}</p>
                <span className="text-[10px] text-slate-400 block">{vis.address}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Leads & Most Viewed Properties */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Leads */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-stone-200/90 shadow-subtle space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-semibold text-lg text-navy-950">
              Últimos Contatos & Oportunidades (CRM)
            </h3>
            <Link href="/dashboard/leads" className="text-xs font-semibold uppercase tracking-wider text-navy-950 hover:text-gold-700 transition inline-flex items-center gap-1.5">
              <span>Abrir Funil Kanban</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentLeads.map((lead) => (
              <div
                key={lead.id}
                className="p-3.5 rounded-lg border border-stone-200/70 bg-stone-50/60 hover:bg-white hover:shadow-subtle transition flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-navy-950 truncate">
                      {lead.name}
                    </span>
                    <span className="text-[9px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-sm bg-stone-100 text-stone-700 border border-stone-200">
                      {lead.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {lead.propertyTitle}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`https://wa.me/${lead.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-[#1D7F54] hover:bg-[#166B44] text-white rounded-sm text-xs transition shadow-subtle"
                    title="Responder no WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                  <Link
                    href={`/dashboard/leads/${lead.id}`}
                    className="text-xs font-semibold uppercase tracking-wider text-navy-950 hover:text-gold-700 p-2"
                  >
                    Detalhes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Viewed Properties */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl border border-stone-200/90 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <h3 className="font-serif font-semibold text-base text-navy-950">
              Imóveis Mais Visualizados
            </h3>
            <Link href="/dashboard/imoveis" className="text-xs font-semibold uppercase tracking-wider text-navy-950 hover:text-gold-700 transition">
              Gerenciar
            </Link>
          </div>

          <div className="space-y-3">
            {mostViewedProperties.map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-stone-50/80 transition">
                <img
                  src={p.photos[0]}
                  alt={p.title}
                  className="w-14 h-14 rounded-lg object-cover shrink-0 border border-stone-200"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-serif font-semibold text-xs text-navy-950 truncate">
                    {p.title}
                  </h4>
                  <span className="font-serif text-xs font-bold text-navy-950 block">
                    {formatPrice(p.price, p.operation)}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {p.viewsCount.toLocaleString("pt-BR")} views • {p.leadsCount} leads
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
