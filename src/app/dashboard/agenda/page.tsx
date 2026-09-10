"use client";

import { useState } from "react";
import {
  Plus,
  MapPin,
  X,
} from "lucide-react";
import { mockCalendarEvents } from "@/data/mockData";
import { CalendarEvent, EventType } from "@/types";

export default function AgendaPage() {
  const [events, setEvents] = useState<CalendarEvent[]>(mockCalendarEvents);
  const [typeFilter, setTypeFilter] = useState<string>("todos");
  const [showNewEventModal, setShowNewEventModal] = useState(false);

  // New Event Form
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<EventType>("visita");
  const [newDate, setNewDate] = useState("2024-03-20");
  const [newTime, setNewTime] = useState("10:00 - 11:30");
  const [newClient, setNewClient] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newAddress, setNewAddress] = useState("");

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const evt: CalendarEvent = {
      id: `evt-${Date.now()}`,
      title: newTitle.trim(),
      type: newType,
      date: newDate,
      time: newTime,
      clientName: newClient || "Cliente Interessado",
      clientPhone: newPhone || "+55 (11) 99999-9999",
      address: newAddress || "Local a definir",
      status: "confirmado",
    };
    setEvents([evt, ...events]);
    setShowNewEventModal(false);
    setNewTitle("");
    setNewClient("");
    setNewAddress("");
  };

  const filtered = events.filter((e) =>
    typeFilter === "todos" ? true : e.type === typeFilter
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
            Compromissos & Atendimentos
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 mt-0.5">
            Agenda do Corretor
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Visitas presenciais, reuniões, ligações de follow-up, tours virtuais, assinaturas e eventos internos.
          </p>
        </div>

        <button
          onClick={() => setShowNewEventModal(true)}
          className="bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow flex items-center justify-center gap-1.5 transition"
        >
          <Plus className="w-4 h-4 text-gold-400" />
          <span>Novo Agendamento</span>
        </button>
      </div>

      {/* Filter Tabs (All 7 types + Todos from Requirement 16) */}
      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-slate-200 pb-2 text-xs font-bold">
        {[
          { id: "todos", label: "Todos os Eventos" },
          { id: "visita", label: "Visitas a Imóveis" },
          { id: "reuniao", label: "Reuniões" },
          { id: "ligacao", label: "Ligações" },
          { id: "followup", label: "Follow-up" },
          { id: "tour_virtual", label: "Tour Virtual" },
          { id: "assinatura", label: "Assinaturas" },
          { id: "interno", label: "Evento Interno" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setTypeFilter(tab.id)}
            className={`px-3.5 py-2 rounded-xl transition whitespace-nowrap ${
              typeFilter === tab.id
                ? "bg-navy-900 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Events List Grid */}
      <div className="space-y-3">
        {filtered.map((evt) => (
          <div
            key={evt.id}
            className="bg-white rounded-xl p-5 border border-stone-200/90 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-stone-50 text-navy-950 rounded-md text-center min-w-[70px] border border-stone-200/80">
                <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-gold-700 block">
                  {evt.date.split("-")[2] || "20"} Mar
                </span>
                <span className="text-xs font-mono font-bold">{evt.time.split(" - ")[0]}</span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-bold text-base text-navy-950">
                    {evt.title}
                  </h3>
                  <span className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-stone-100 text-stone-700 border border-stone-200/80">
                    {evt.type.replace("_", " ")}
                  </span>
                </div>

                <p className="text-xs text-stone-600 mt-1">
                  Cliente: <span className="font-semibold text-stone-900">{evt.clientName}</span> ({evt.clientPhone})
                </p>

                {evt.address && (
                  <div className="flex items-center gap-1.5 text-xs text-stone-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-gold-600" />
                    <span>{evt.address}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <a
                href={`https://wa.me/${evt.clientPhone.replace(/[^0-9]/g, "")}?text=Olá%20${encodeURIComponent(
                  evt.clientName
                )},%20confirmando%20nosso%20compromisso:%20${encodeURIComponent(evt.title)}%20às%20${encodeURIComponent(evt.time)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1D7F54] hover:bg-[#166543] text-white text-[11px] uppercase tracking-wider font-semibold px-3.5 py-2 rounded-sm flex items-center gap-1 shadow-sm transition"
              >
                <span>Confirmar no WhatsApp</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add Event */}
      {showNewEventModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-luxury border border-stone-200/90 space-y-4 text-xs animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-serif font-bold text-lg text-navy-950">
                Novo Compromisso
              </h3>
              <button
                onClick={() => setShowNewEventModal(false)}
                className="w-7 h-7 rounded-sm bg-stone-100 flex items-center justify-center text-stone-500 hover:text-navy-950"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-3">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Título do Evento</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Visita Residência Fazenda Boa Vista..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-sm focus:outline-none focus:border-navy-950"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Tipo de Evento</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as EventType)}
                    className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-sm focus:outline-none focus:border-navy-950"
                  >
                    <option value="visita">Visita</option>
                    <option value="reuniao">Reunião</option>
                    <option value="ligacao">Ligação</option>
                    <option value="followup">Follow-up</option>
                    <option value="tour_virtual">Tour Virtual</option>
                    <option value="assinatura">Assinatura</option>
                    <option value="interno">Evento Interno</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Horário</label>
                  <input
                    type="text"
                    placeholder="10:00 - 11:30"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-sm focus:outline-none focus:border-navy-950"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Nome do Cliente</label>
                <input
                  type="text"
                  placeholder="Nome do cliente"
                  value={newClient}
                  onChange={(e) => setNewClient(e.target.value)}
                  className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-sm focus:outline-none focus:border-navy-950"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Telefone / WhatsApp</label>
                <input
                  type="text"
                  placeholder="+55 (11) 98888-7777"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-sm focus:outline-none focus:border-navy-950"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Local / Endereço</label>
                <input
                  type="text"
                  placeholder="Endereço do imóvel ou link da sala virtual"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-sm focus:outline-none focus:border-navy-950"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewEventModal(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200/80 rounded-sm text-[11px] uppercase tracking-wider font-semibold transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-navy-950 hover:bg-navy-900 text-white rounded-sm text-[11px] uppercase tracking-wider font-semibold shadow-sm transition"
                >
                  Agendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
