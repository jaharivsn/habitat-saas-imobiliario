import { Star } from "lucide-react";
import { mockProperties, mockBrokers } from "@/data/mockData";
import { formatPrice } from "@/lib/utils";

export default function PerformancePage() {
  const topProperties = [...mockProperties]
    .sort((a, b) => b.viewsCount - a.viewsCount)
    .slice(0, 4);

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
          Relatórios & Inteligência
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 mt-0.5">
          Analytics & Performance
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Métricas consolidadas de visualizações, cliques no WhatsApp, conversão por corretor, cidade e imóvel.
        </p>
      </div>

      {/* KPI Overview (Requirement 21) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
        <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-subtle space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-stone-400 block">Visualizações</span>
          <div className="font-serif font-bold text-2xl text-navy-950">21.840</div>
          <span className="text-[10px] text-emerald-700 font-semibold">+18% este mês</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-subtle space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-stone-400 block">Cliques WhatsApp</span>
          <div className="font-serif font-bold text-2xl text-navy-950">1.048</div>
          <span className="text-[10px] text-emerald-700 font-semibold">Taxa 4.8%</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-subtle space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-stone-400 block">Leads Gerados</span>
          <div className="font-serif font-bold text-2xl text-navy-950">214</div>
          <span className="text-[10px] text-stone-400">Qualificados</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-subtle space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-stone-400 block">Visitas Agendadas</span>
          <div className="font-serif font-bold text-2xl text-navy-950">42</div>
          <span className="text-[10px] text-stone-400">Últimos 90 dias</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-subtle space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-stone-400 block">Em Negociação</span>
          <div className="font-serif font-bold text-2xl text-gold-700">16</div>
          <span className="text-[10px] text-stone-400">Propostas ativas</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-subtle space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-stone-400 block">Imóveis Vendidos</span>
          <div className="font-serif font-bold text-2xl text-emerald-700">6</div>
          <span className="text-[10px] text-emerald-700 font-semibold">R$ 84.5M VGV</span>
        </div>
      </div>

      {/* Regional Share & Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Performance por Cidade */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-xl border border-stone-200/90 shadow-subtle space-y-4">
          <h3 className="font-serif font-bold text-lg text-navy-950">
            Performance por Região & Cidade
          </h3>
          <div className="space-y-3 text-xs">
            {[
              { name: "São Paulo (Jardins & Itaim)", share: "45%", leads: 48 },
              { name: "Porto Feliz (Fazenda Boa Vista)", share: "30%", leads: 32 },
              { name: "Rio de Janeiro (Leblon)", share: "15%", leads: 16 },
              { name: "Winter Garden (Flórida)", share: "10%", leads: 11 },
            ].map((reg, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between font-semibold text-stone-700">
                  <span>{reg.name}</span>
                  <span className="font-bold text-navy-950">{reg.leads} leads ({reg.share})</span>
                </div>
                <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                  <div style={{ width: reg.share }} className="h-full bg-navy-950 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Funil de Conversão de Leads */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-xl border border-stone-200/90 shadow-subtle space-y-4">
          <h3 className="font-serif font-bold text-lg text-navy-950">
            Funil de Conversão de Vendas
          </h3>
          <div className="space-y-2 text-xs">
            {[
              { step: "Visualização do Anúncio", count: 21840, pct: "100%" },
              { step: "Lead Capturado (WhatsApp/Form)", count: 1048, pct: "4.8%" },
              { step: "Lead Qualificado", count: 214, pct: "20.4%" },
              { step: "Visita Presencial Realizada", count: 42, pct: "19.6%" },
              { step: "Proposta Formal Apresentada", count: 16, pct: "38.0%" },
              { step: "Escritura Fechada", count: 6, pct: "37.5%" },
            ].map((f, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 bg-stone-50/80 rounded-md border border-stone-100">
                <span className="font-medium text-stone-700">{f.step}</span>
                <span className="font-bold text-navy-950">{f.count} ({f.pct})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance por Imóvel & Performance por Corretor (Requirement 21) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Performance por Imóvel / Mais Vistos */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-stone-200/90 shadow-subtle space-y-4">
          <h3 className="font-serif font-bold text-lg text-navy-950">
            Performance por Imóvel (Mais Visualizados)
          </h3>
          <div className="divide-y divide-stone-100 text-xs">
            {topProperties.map((p) => (
              <div key={p.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={p.photos[0]}
                    alt={p.title}
                    className="w-12 h-10 rounded-md object-cover shrink-0 border border-stone-200/60"
                  />
                  <div className="min-w-0">
                    <h4 className="font-serif font-bold text-navy-950 truncate">{p.title}</h4>
                    <span className="text-[10px] text-stone-400">
                      {p.city} • {formatPrice(p.price, p.operation)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6 shrink-0 text-right">
                  <div>
                    <span className="font-mono font-bold text-navy-950 block">
                      {p.viewsCount.toLocaleString("pt-BR")}
                    </span>
                    <span className="text-[9px] text-stone-400 uppercase tracking-wider">Views</span>
                  </div>
                  <div>
                    <span className="font-mono font-bold text-gold-700 block">
                      {p.leadsCount}
                    </span>
                    <span className="text-[9px] text-stone-400 uppercase tracking-wider">Leads</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance por Corretor */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl border border-stone-200/90 shadow-subtle space-y-4">
          <h3 className="font-serif font-bold text-lg text-navy-950">
            Performance por Corretor
          </h3>
          <div className="divide-y divide-stone-100 text-xs">
            {mockBrokers.map((b) => (
              <div key={b.id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={b.photo}
                    alt={b.name}
                    className="w-9 h-9 rounded-md object-cover border border-stone-200/60"
                  />
                  <div>
                    <h4 className="font-bold text-navy-950">{b.name}</h4>
                    <span className="text-[10px] text-stone-400">{b.regions[0]}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono font-bold text-navy-950 block">
                    {b.soldCount} vendas
                  </span>
                  <span className="text-[10px] text-stone-600 font-medium inline-flex items-center gap-1">
                    {b.rating} <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> ({b.reviewsCount})
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
