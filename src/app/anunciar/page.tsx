"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { mockPlans } from "@/data/mockData";
import { Check, ArrowRight } from "lucide-react";

export default function AnunciarPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Header />

      <main className="flex-1 pb-20">
        {/* Hero Section */}
        <div className="bg-navy-950 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 text-center border-b border-navy-800">
          <div className="max-w-4xl mx-auto space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-400">
              Plataforma SaaS para Profissionais
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              Acelere suas Vendas no Mercado de Alto Padrão
            </h1>
            <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              O ecossistema definitivo unindo portal exclusivo, CRM integrado, páginas públicas personalizadas e gestão de leads direto no WhatsApp.
            </p>

            {/* Toggle Monthly / Yearly */}
            <div className="pt-6 inline-flex items-center gap-2 bg-white/10 p-1.5 rounded-md border border-white/20">
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-2 rounded-sm text-[11px] uppercase tracking-wider font-semibold transition ${
                  billingCycle === "monthly"
                    ? "bg-white text-navy-950 shadow-sm"
                    : "text-stone-300 hover:text-white"
                }`}
              >
                Cobrança Mensal
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle("yearly")}
                className={`px-4 py-2 rounded-sm text-[11px] uppercase tracking-wider font-semibold transition flex items-center gap-1.5 ${
                  billingCycle === "yearly"
                    ? "bg-gold-500 text-navy-950 shadow-sm"
                    : "text-stone-300 hover:text-white"
                }`}
              >
                <span>Cobrança Anual</span>
                <span className="bg-emerald-600 text-white text-[9px] px-1.5 py-0.5 rounded-sm font-bold uppercase tracking-wider">
                  -20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockPlans.map((plan) => {
              const price =
                billingCycle === "monthly"
                  ? plan.priceMonthly
                  : plan.priceYearly;

              return (
                <div
                  key={plan.id}
                  className={`bg-white rounded-xl p-6 sm:p-8 flex flex-col justify-between border transition-all duration-300 ${
                    plan.recommended
                      ? "border-gold-500 shadow-luxury ring-1 ring-gold-500 relative"
                      : "border-stone-200/90 shadow-subtle hover:shadow-luxury-hover"
                  }`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-500 text-navy-950 text-[9px] font-bold px-3 py-1 rounded-sm uppercase tracking-[0.18em] shadow-sm">
                      Mais Recomendado
                    </div>
                  )}

                  <div>
                    <h3 className="font-serif font-bold text-xl text-navy-950">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1.5 min-h-[2.5rem]">
                      {plan.description}
                    </p>

                    <div className="my-6 pb-6 border-b border-stone-100">
                      <span className="font-serif text-3xl sm:text-4xl font-bold text-navy-950">
                        R$ {price}
                      </span>
                      <span className="text-xs text-stone-400">/mês</span>
                      {billingCycle === "yearly" && (
                        <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                          Faturado anualmente com economia
                        </p>
                      )}
                    </div>

                    <div className="space-y-3 text-xs">
                      <span className="font-bold uppercase tracking-[0.16em] text-stone-400 text-[10px] block mb-2">
                        O que está incluso:
                      </span>
                      {plan.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                          <span className="text-stone-700">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-stone-100">
                    <Link
                      href={`/cadastro?plano=${plan.slug}`}
                      className={`w-full py-3 px-4 rounded-sm text-[11px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 shadow-sm transition ${
                        plan.recommended
                          ? "bg-navy-950 hover:bg-navy-900 text-white"
                          : "bg-stone-100 hover:bg-navy-950 hover:text-white text-stone-800 border border-stone-200/80"
                      }`}
                    >
                      <span>Começar 14 Dias Grátis</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits Section */}
        <section className="py-24 bg-white border-y border-stone-200/70 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950">Por que escolher a Habitat?</h2>
              <p className="mt-4 text-slate-500 text-sm max-w-2xl mx-auto">Tudo que você precisa para escalar sua operação no mercado imobiliário de alto padrão.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="text-center">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                  <Check className="w-6 h-6 text-gold-600" />
                </div>
                <h3 className="font-semibold text-navy-950 mb-2">Publicação Rápida</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Cadastre imóveis em minutos com nossa interface otimizada e distribua para o portal público automaticamente.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                  <Check className="w-6 h-6 text-gold-600" />
                </div>
                <h3 className="font-semibold text-navy-950 mb-2">CRM e Gestão de Leads</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Receba contatos diretamente no WhatsApp e acompanhe o funil de vendas em um painel unificado.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                  <Check className="w-6 h-6 text-gold-600" />
                </div>
                <h3 className="font-semibold text-navy-950 mb-2">Vitrine Própria</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Página exclusiva do corretor ou imobiliária com sua marca, portfólio e formulários de contato customizados.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-center text-navy-950 mb-16">O que dizem os profissionais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100">
                <p className="text-sm text-slate-600 italic mb-6">"Desde que migrei para a Habitat, minha taxa de conversão aumentou 40%. A facilidade de gerenciar leads e a vitrine elegante fazem toda a diferença para o meu público de alto padrão."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" alt="Mariana Silva" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-navy-950">Mariana Silva</h4>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Corretora Autônoma</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100">
                <p className="text-sm text-slate-600 italic mb-6">"O painel SaaS é incrivelmente intuitivo. Conseguimos unificar a gestão de toda a equipe e paramos de perder leads por falta de organização. O investimento se pagou no primeiro mês."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80" alt="Roberto Almeida" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-navy-950">Roberto Almeida</h4>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Sócio-Diretor, Prime Imóveis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-navy-950 text-white text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6">Pronto para elevar seu negócio?</h2>
            <p className="text-stone-300 text-sm mb-10">Junte-se à rede de profissionais que estão redefinindo o mercado de alto padrão.</p>
            <Link href="/cadastro" className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 px-8 py-4 rounded-sm text-xs font-bold uppercase tracking-wider transition">
              <span>Criar Conta Gratuita</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
