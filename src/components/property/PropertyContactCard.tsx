"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  MessageCircle,
  Mail,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  X,
  Send,
  Clock,
} from "lucide-react";
import { Broker, Property } from "@/types";

interface PropertyContactCardProps {
  broker: Broker;
  property: Property;
}

export default function PropertyContactCard({
  broker,
  property,
}: PropertyContactCardProps) {
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [visitModalOpen, setVisitModalOpen] = useState(false);

  // Form states
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadMessage, setLeadMessage] = useState(
    `Olá ${broker.name}, tenho interesse no imóvel "${property.title}" (Cód. ${property.code}). Gostaria de mais informações.`
  );
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("10:00");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(
      `Mensagem enviada com sucesso! ${broker.name} entrará em contato em breve.`
    );
    setTimeout(() => {
      setMessageModalOpen(false);
      setSuccessMessage(null);
    }, 2500);
  };

  const handleScheduleVisit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(
      `Visita pré-agendada para ${visitDate} às ${visitTime}. Enviamos uma confirmação no seu WhatsApp!`
    );
    setTimeout(() => {
      setVisitModalOpen(false);
      setSuccessMessage(null);
    }, 2500);
  };

  const whatsappUrl = `https://wa.me/${broker.whatsapp}?text=Olá%20${encodeURIComponent(
    broker.name
  )},%20estou%20vendo%20o%20imóvel%20"${encodeURIComponent(
    property.title
  )}"%20(Cód.%20${property.code})%20no%20Habitat%20e%20gostaria%20de%20mais%20detalhes.`;

  return (
    <>
      <div className="bg-white p-7 sm:p-8 border border-stone-200 lg:sticky lg:top-28 space-y-6">
        {/* Header Corretor */}
        <div className="flex items-start gap-4 pb-6 border-b border-stone-100">
          <Link href={`/corretor/${broker.slug}`} className="shrink-0">
            <img
              src={broker.photo}
              alt={broker.name}
              className="w-16 h-16 object-cover border border-stone-200"
            />
          </Link>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <Link
                href={`/corretor/${broker.slug}`}
                className="font-serif font-normal text-stone-950 text-xl leading-tight hover:text-stone-600 transition truncate"
              >
                {broker.name}
              </Link>
              <span title="Verificado" className="inline-flex">
                <ShieldCheck className="w-4 h-4 text-stone-400 shrink-0" />
              </span>
            </div>

            <p className="text-[11px] font-mono text-stone-400 mt-0.5">CRECI {broker.creci}</p>

            {broker.agencyName && (
              <p className="text-xs font-light text-stone-500 truncate mt-0.5 tracking-wide">
                {broker.agencyName}
              </p>
            )}
          </div>
        </div>

        {/* Contact direct contacts */}
        <div className="space-y-2.5 text-xs text-stone-600 font-light">
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-stone-400 shrink-0" />
            <span className="font-mono text-[11px]">{broker.phone}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-stone-400 shrink-0" />
            <span className="truncate text-[11px]">{broker.email}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          {/* WhatsApp Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#1D7F54] hover:bg-[#166B44] text-white font-medium text-xs uppercase tracking-[0.18em] py-3.5 px-4 flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar no WhatsApp</span>
          </a>

          {/* Enviar Mensagem */}
          <button
            type="button"
            onClick={() => setMessageModalOpen(true)}
            className="w-full bg-stone-950 hover:bg-stone-800 text-white font-medium text-xs uppercase tracking-[0.18em] py-3.5 px-4 flex items-center justify-center gap-2 transition-colors"
          >
            <Send className="w-4 h-4 text-stone-300" />
            <span>Enviar Mensagem</span>
          </button>

          {/* Agendar Visita */}
          <button
            type="button"
            onClick={() => setVisitModalOpen(true)}
            className="w-full border border-stone-300 hover:border-stone-900 text-stone-900 font-medium text-xs uppercase tracking-[0.18em] py-3 px-4 flex items-center justify-center gap-2 transition-colors"
          >
            <Calendar className="w-4 h-4 text-stone-400" />
            <span>Agendar Visita</span>
          </button>
        </div>

        {/* Security pledge */}
        <div className="pt-4 border-t border-stone-100 text-center">
          <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 flex items-center justify-center gap-1.5 font-light">
            <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
            Atendimento confidencial & sem intermediários
          </span>
        </div>
      </div>

      {/* Message Modal */}
      {messageModalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 sm:p-8 shadow-luxury relative border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setMessageModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-navy-950 rounded-full hover:bg-stone-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif font-semibold text-xl text-navy-950 mb-1">
              Falar com {broker.name}
            </h3>
            <p className="text-xs text-slate-400 mb-6 font-light">
              Ref: {property.title} (Cód. {property.code})
            </p>

            {successMessage ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-4 rounded-md flex items-center gap-3 text-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>{successMessage}</span>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Seu Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Roberto Albuquerque"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-navy-950"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                      Telefone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(11) 99999-9999"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-navy-950"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                      E-mail
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="seu@email.com"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-navy-950"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Mensagem
                  </label>
                  <textarea
                    rows={4}
                    value={leadMessage}
                    onChange={(e) => setLeadMessage(e.target.value)}
                    className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-navy-950 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-navy-950 hover:bg-gold-600 hover:text-navy-950 text-white font-semibold text-xs uppercase tracking-wider rounded-sm shadow-subtle transition-all duration-300"
                >
                  Enviar Mensagem
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Schedule Visit Modal */}
      {visitModalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 sm:p-8 shadow-luxury relative border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setVisitModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-navy-950 rounded-full hover:bg-stone-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif font-semibold text-xl text-navy-950 mb-1">
              Agendar Visita Exclusiva
            </h3>
            <p className="text-xs text-slate-400 mb-6 font-light">
              Coordenação de visita confidencial para o imóvel {property.title}
            </p>

            {successMessage ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-4 rounded-md flex items-center gap-3 text-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>{successMessage}</span>
              </div>
            ) : (
              <form onSubmit={handleScheduleVisit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Seu Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Seu nome completo"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-navy-950"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    WhatsApp para confirmação
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(11) 99999-9999"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-navy-950"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                      Data Desejada
                    </label>
                    <input
                      type="date"
                      required
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-navy-950"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                      Horário Sugerido
                    </label>
                    <select
                      value={visitTime}
                      onChange={(e) => setVisitTime(e.target.value)}
                      className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-navy-950"
                    >
                      <option value="09:00">09:00</option>
                      <option value="10:30">10:30</option>
                      <option value="14:00">14:00</option>
                      <option value="15:30">15:30</option>
                      <option value="17:00">17:00</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 rounded-md border border-stone-200/80 text-xs text-slate-600 flex items-start gap-2">
                  <Clock className="w-4 h-4 text-gold-700 mt-0.5 shrink-0" />
                  <span className="text-[11px] text-slate-500 font-light leading-relaxed">
                    Visitas em condomínios fechados necessitam de autorização prévia da portaria e conferência documental.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-navy-950 hover:bg-gold-600 hover:text-navy-950 text-white font-semibold text-xs uppercase tracking-wider rounded-sm shadow-subtle transition-all duration-300"
                >
                  Confirmar Solicitação de Visita
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
