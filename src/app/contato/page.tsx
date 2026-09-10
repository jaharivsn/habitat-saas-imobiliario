"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Phone, Mail, MapPin, MessageCircle, CheckCircle2 } from "lucide-react";

export default function ContatoPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Header />

      <main className="flex-1 pb-20">
        <div className="bg-navy-950 text-white py-16 px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-400">
            Canal Direto
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold mt-2">
            Fale com a Curadoria Habitat
          </h1>
          <p className="text-stone-300 text-sm sm:text-base mt-2 max-w-xl mx-auto font-light leading-relaxed">
            Atendimento especializado para proprietários, compradores, investidores institucionais e corretores.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Info Cards */}
            <div className="lg:col-span-5 space-y-4 text-xs">
              <div className="bg-white rounded-xl p-6 border border-stone-200/90 shadow-subtle space-y-4">
                <h3 className="font-serif font-semibold text-lg text-navy-950">
                  Canais Oficiais
                </h3>

                <div className="space-y-3 text-slate-600">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gold-700" />
                    <span>+55 (11) 3040-5000</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>+55 (11) 99882-1400 (WhatsApp Concierge)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gold-700" />
                    <span>contato@habitatplatform.com</span>
                  </div>
                  <div className="flex items-start gap-3 pt-2">
                    <MapPin className="w-4 h-4 text-gold-700 shrink-0 mt-0.5" />
                    <span>Av. Brigadeiro Faria Lima, 3477 - 14º andar - Itaim Bibi, São Paulo - SP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-xl p-8 border border-stone-200/90 shadow-subtle">
              {sent ? (
                <div className="p-8 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="font-serif font-semibold text-xl text-navy-950">
                    Mensagem Recebida com Sucesso
                  </h3>
                  <p className="text-xs text-slate-500 font-light">
                    Nossa equipe de concierge responderá seu contato em até 2 horas úteis.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <h3 className="font-serif font-semibold text-xl text-navy-950 mb-2">
                    Envie uma Mensagem
                  </h3>

                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[10px] text-slate-500 mb-1">Nome Completo</label>
                    <input
                      type="text"
                      required
                      placeholder="Seu nome"
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-navy-950"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold uppercase tracking-wider text-[10px] text-slate-500 mb-1">E-mail</label>
                      <input
                        type="email"
                        required
                        placeholder="seu@email.com"
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-navy-950"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold uppercase tracking-wider text-[10px] text-slate-500 mb-1">Telefone</label>
                      <input
                        type="tel"
                        required
                        placeholder="(11) 99999-9999"
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-navy-950"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[10px] text-slate-500 mb-1">Mensagem ou Demanda</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Como podemos te ajudar hoje?"
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-navy-950 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-navy-950 hover:bg-gold-600 hover:text-navy-950 text-white font-semibold text-xs uppercase tracking-wider rounded-sm shadow-subtle hover:shadow-luxury transition-all duration-300"
                  >
                    Enviar Mensagem
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
