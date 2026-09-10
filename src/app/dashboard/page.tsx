import Link from "next/link";
import {
  Building,
  Users2,
  Calendar,
  Eye,
  MessageCircle,
  Plus,
  Clock,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { mockProperties, mockLeads, mockCalendarEvents } from "@/data/mockData";
import { formatPrice } from "@/lib/utils";

export default function DashboardOverviewPage() {
  const activeListings = mockProperties.filter((p) => p.status === "published");
  const recentLeads = mockLeads.slice(0, 4);
  const upcomingVisits = mockCalendarEvents.slice(0, 3);
  const mostViewedProperties = [...mockProperties]
    .sort((a, b) => b.viewsCount - a.viewsCount)
    .slice(0, 3);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Compass One: Morning Briefing Command Center */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-stone-500">
                Command Center • Compass OS
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl text-stone-950 font-normal tracking-normal">
              Bom dia, Carlos Mendes
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 font-light">
              Panorama executivo consolidado da sua carteira e interações prioritárias hoje.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/dashboard/imoveis/novo"
              className="bg-stone-950 hover:bg-stone-800 text-white text-xs font-medium tracking-wider uppercase px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-2"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Novo Imóvel</span>
            </Link>
            <Link
              href="/dashboard/agenda"
              className="border border-stone-200 hover:border-stone-400 bg-stone-50 text-stone-800 text-xs font-medium tracking-wider uppercase px-4 py-2.5 rounded-xl transition-all"
            >
              Agenda
            </Link>
          </div>
        </div>

        {/* Actionable Morning Priorities (What needs attention today) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-stone-200/70 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-100/80 text-emerald-800 mt-0.5">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                Hoje • 15:30
              </span>
              <span className="font-medium text-xs text-stone-900 block truncate">
                Visita Privada — Mansão Tamboré
              </span>
              <span className="text-[11px] text-stone-500 font-light">
                Com cliente VIP Roberto Junqueira
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-stone-200/70 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-100/80 text-amber-800 mt-0.5">
              <Clock className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                Pendente • Retorno
              </span>
              <span className="font-medium text-xs text-stone-900 block truncate">
                2 Propostas em Análise
              </span>
              <span className="text-[11px] text-stone-500 font-light">
                Aguardando contraproposta do proprietário
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-stone-200/70 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-navy-950 text-gold-300 mt-0.5">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                Carteira Sob Gestão
              </span>
              <span className="font-medium text-xs text-stone-900 block tabular-nums">
                R$ 78.400.000,00
              </span>
              <span className="text-[11px] text-stone-500 font-light">
                14 ativos exclusivos ativos
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Linear-grade KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Imóveis Ativos */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80 space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] font-mono uppercase tracking-wider">Ativos</span>
            <Building className="w-3.5 h-3.5 text-stone-700" />
          </div>
          <div className="font-display text-3xl text-stone-950 tabular-nums">14</div>
          <span className="text-[10px] text-emerald-700 font-mono font-medium block">
            +2 novos este mês
          </span>
        </div>

        {/* Em Moderação */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80 space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] font-mono uppercase tracking-wider">Análise</span>
            <Clock className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="font-display text-3xl text-stone-950 tabular-nums">2</div>
          <span className="text-[10px] text-stone-400 font-mono block">Em governança</span>
        </div>

        {/* Negociados */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80 space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] font-mono uppercase tracking-wider">Concluídos</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
          </div>
          <div className="font-display text-3xl text-stone-950 tabular-nums">37</div>
          <span className="text-[10px] text-stone-400 font-mono block">32 vendas • 5 loc.</span>
        </div>

        {/* Leads Novos */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80 space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] font-mono uppercase tracking-wider">Leads Novos</span>
            <Users2 className="w-3.5 h-3.5 text-stone-700" />
          </div>
          <div className="font-display text-3xl text-stone-950 tabular-nums">8</div>
          <span className="text-[10px] text-emerald-700 font-mono font-medium block">
            +3 sem contato
          </span>
        </div>

        {/* Visitas */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80 space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] font-mono uppercase tracking-wider">Visitas</span>
            <Calendar className="w-3.5 h-3.5 text-stone-700" />
          </div>
          <div className="font-display text-3xl text-stone-950 tabular-nums">5</div>
          <span className="text-[10px] text-stone-400 font-mono block">Próximos 7 dias</span>
        </div>

        {/* Visualizações */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80 space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] font-mono uppercase tracking-wider">Alcance</span>
            <Eye className="w-3.5 h-3.5 text-stone-700" />
          </div>
          <div className="font-display text-3xl text-stone-950 tabular-nums">21.8k</div>
          <span className="text-[10px] text-emerald-700 font-mono font-medium block">
            +18% vs anterior
          </span>
        </div>
      </div>

      {/* Analytics Graph & Pipeline Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Visual Analytics Chart */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-2xl font-normal text-stone-950">
                Tráfego & Conversão de Leads (Últimas 6 Semanas)
              </h3>
              <p className="text-xs text-stone-500 font-light mt-0.5">
                Visualizações de anúncios exclusivos vs. cliques diretos em WhatsApp concierge
              </p>
            </div>
            <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
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
                <div className="text-[10px] text-stone-400 font-mono opacity-0 group-hover:opacity-100 transition tabular-nums">
                  {col.views}
                </div>
                <div
                  style={{ height: col.height }}
                  className="w-full max-w-[42px] bg-stone-900 rounded-t-lg group-hover:bg-stone-700 transition-all duration-300 relative"
                >
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/40" />
                </div>
                <span className="text-[10px] font-mono text-stone-500">
                  {col.week}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-stone-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-light">
                <span className="w-2.5 h-2.5 rounded-sm bg-stone-900" />
                Visualizações de Anúncios
              </span>
              <span className="flex items-center gap-1.5 font-light">
                <span className="w-2.5 h-2.5 rounded-sm bg-stone-400" />
                Interações Qualificadas
              </span>
            </div>
            <Link href="/dashboard/performance" className="text-xs font-medium uppercase tracking-wider text-stone-950 hover:text-stone-600 transition inline-flex items-center gap-1.5">
              <span>Ver Relatório Detalhado</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Upcoming Visits / Agenda Widget */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <h3 className="font-display text-xl font-normal text-stone-950">
              Próximas Visitas
            </h3>
            <Link href="/dashboard/agenda" className="text-xs font-medium uppercase tracking-wider text-stone-500 hover:text-stone-950 transition">
              Ver Agenda
            </Link>
          </div>

          <div className="space-y-3">
            {upcomingVisits.map((vis) => (
              <div
                key={vis.id}
                className="p-3.5 bg-[#FAF9F5] rounded-xl border border-stone-200/70 space-y-1"
              >
                <div className="flex items-center justify-between text-xs font-medium text-stone-950">
                  <span>{vis.clientName}</span>
                  <span className="text-stone-700 bg-white px-2 py-0.5 rounded-full text-[10px] font-mono border border-stone-200">
                    {vis.time}
                  </span>
                </div>
                <p className="text-xs text-stone-600 line-clamp-1 font-light">{vis.propertyTitle}</p>
                <span className="text-[10px] text-stone-400 block font-light">{vis.address}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Leads & Most Viewed Properties */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Leads */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-2xl font-normal text-stone-950">
              Oportunidades Recentes (CRM)
            </h3>
            <Link href="/dashboard/leads" className="text-xs font-medium uppercase tracking-wider text-stone-950 hover:text-stone-600 transition inline-flex items-center gap-1.5">
              <span>Abrir Pipeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentLeads.map((lead) => (
              <div
                key={lead.id}
                className="p-3.5 rounded-xl border border-stone-200/70 bg-[#FAF9F5] hover:bg-white hover:shadow-subtle transition flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-xs text-stone-950 truncate">
                      {lead.name}
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-white text-stone-700 border border-stone-200">
                      {lead.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 truncate mt-0.5 font-light">
                    {lead.propertyTitle}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`https://wa.me/${lead.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-[#1D7F54] hover:bg-[#166B44] text-white rounded-lg text-xs transition shadow-xs"
                    title="Responder no WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                  <Link
                    href={`/dashboard/leads/${lead.id}`}
                    className="text-xs font-medium uppercase tracking-wider text-stone-700 hover:text-stone-950 p-2"
                  >
                    Detalhes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Viewed Properties */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <h3 className="font-display text-xl font-normal text-stone-950">
              Imóveis Mais Visualizados
            </h3>
            <Link href="/dashboard/imoveis" className="text-xs font-medium uppercase tracking-wider text-stone-500 hover:text-stone-950 transition">
              Gerenciar
            </Link>
          </div>

          <div className="space-y-3">
            {mostViewedProperties.map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FAF9F5] transition">
                <img
                  src={p.photos[0]}
                  alt={p.title}
                  className="w-14 h-14 rounded-lg object-cover shrink-0 border border-stone-200"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-display text-sm text-stone-950 truncate font-normal">
                    {p.title}
                  </h4>
                  <span className="text-xs font-medium text-stone-950 block tabular-nums">
                    {formatPrice(p.price, p.operation)}
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono tabular-nums">
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
