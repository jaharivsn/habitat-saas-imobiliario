"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { mockLeads, mockProperties } from "@/data/mockData";
import {
  ArrowLeft,
  MessageCircle,
  CheckCircle2,
  Plus,
  Save,
} from "lucide-react";
import { LeadStatus } from "@/types";

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const lead = mockLeads.find((l) => l.id === id) || mockLeads[0];

  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [notes, setNotes] = useState<string[]>(lead.notes || []);
  const [newNote, setNewNote] = useState("");
  const [scheduledReturn, setScheduledReturn] = useState(lead.scheduledFollowUp || "");
  const [tasks, setTasks] = useState(lead.tasks || []);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [savedToast, setSavedToast] = useState(false);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes([...notes, newNote.trim()]);
    setNewNote("");
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    setTasks([
      ...tasks,
      {
        id: `task-${Date.now()}`,
        title: newTaskTitle.trim(),
        dueDate: new Date().toISOString().split("T")[0],
        completed: false,
      },
    ]);
    setNewTaskTitle("");
  };

  const toggleTask = (taskId: string) => {
    setTasks(
      tasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {savedToast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-700 text-white px-4 py-2.5 rounded-md shadow-lg text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Ficha do lead atualizada com sucesso!</span>
        </div>
      )}

      {/* Top Breadcrumb & Return */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/leads"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-navy-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para o Funil de Leads</span>
        </Link>

        <button
          onClick={handleSave}
          className="bg-navy-950 hover:bg-gold-600 hover:text-navy-950 text-white text-[11px] font-semibold uppercase tracking-wider px-4 py-2 rounded-sm shadow-subtle flex items-center gap-1.5 transition-all duration-300"
        >
          <Save className="w-3.5 h-3.5 text-gold-400 group-hover:text-navy-950" />
          <span>Salvar Alterações</span>
        </button>
      </div>

      {/* Lead Header Card */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200/90 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif font-semibold text-2xl sm:text-3xl text-navy-950">
              {lead.name}
            </h1>
            <span className="px-2.5 py-0.5 rounded-sm text-[9px] font-semibold uppercase tracking-widest bg-stone-100 text-stone-700 border border-stone-200">
              Origem: {lead.source}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2 font-mono">
            <span>{lead.phone}</span>
            <span>•</span>
            <span>{lead.email}</span>
            <span>•</span>
            <span className="font-sans">Corretor: {lead.brokerName}</span>
          </div>
        </div>

        {/* Quick WhatsApp & Call CTAs */}
        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${lead.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1D7F54] hover:bg-[#166B44] text-white text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-sm shadow-subtle flex items-center gap-1.5 transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar no WhatsApp</span>
          </a>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as LeadStatus)}
            className="p-2.5 bg-stone-50 border border-stone-200 rounded-sm text-xs font-semibold text-navy-950 focus:outline-none focus:border-navy-950"
          >
            <option value="novo">Status: Novo Lead</option>
            <option value="contatado">Status: Contatado</option>
            <option value="qualificado">Status: Qualificado</option>
            <option value="visita_agendada">Status: Visita Agendada</option>
            <option value="negociacao">Status: Negociação</option>
            <option value="proposta">Status: Proposta</option>
            <option value="fechado">Status: Fechado</option>
            <option value="perdido">Status: Perdido</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Notes, Timeline, Tasks */}
        <div className="lg:col-span-8 space-y-6">
          {/* Notes & Observations */}
          <div className="bg-white rounded-xl p-6 border border-stone-200/90 shadow-subtle space-y-4">
            <h3 className="font-serif font-semibold text-lg text-navy-950">
              Observações & Histórico de Interações
            </h3>

            <div className="space-y-2">
              {notes.map((n, i) => (
                <div key={i} className="p-3 bg-stone-50/80 rounded-lg border border-stone-200/70 text-xs text-slate-700 font-light leading-relaxed">
                  {n}
                </div>
              ))}
            </div>

            <form onSubmit={handleAddNote} className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Adicionar nova observação interna..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="flex-1 p-2.5 bg-stone-50 border border-stone-200 rounded-md text-xs focus:outline-none focus:border-navy-950 transition"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-navy-950 hover:bg-gold-600 hover:text-navy-950 text-white rounded-sm text-[11px] font-semibold uppercase tracking-wider transition-all duration-300"
              >
                Adicionar
              </button>
            </form>
          </div>

          {/* CRM Tasks / Follow-ups */}
          <div className="bg-white rounded-xl p-6 border border-stone-200/90 shadow-subtle space-y-4">
            <h3 className="font-serif font-semibold text-lg text-navy-950">
              Tarefas & Acompanhamento
            </h3>

            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3 rounded-lg border flex items-center justify-between text-xs cursor-pointer transition ${
                    task.completed
                      ? "bg-stone-50 border-stone-200 text-slate-400 line-through"
                      : "bg-white border-stone-200/80 text-slate-800 hover:bg-stone-50/70"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => {}}
                      className="rounded text-navy-950"
                    />
                    <span>{task.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {task.dueDate}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddTask} className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Criar nova tarefa (ex: Enviar certidões)..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="flex-1 p-2.5 bg-stone-50 border border-stone-200 rounded-md text-xs focus:outline-none focus:border-navy-950 transition"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-navy-950 hover:bg-gold-600 hover:text-navy-950 text-white rounded-sm text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tarefa</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Associated Property & Return Scheduler */}
        <div className="lg:col-span-4 space-y-6">
          {/* Associated Property */}
          <div className="bg-white rounded-xl p-6 border border-stone-200/90 shadow-subtle space-y-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gold-700 block">
              Imóvel de Interesse
            </span>
            <h4 className="font-serif font-semibold text-base text-navy-950">
              {lead.propertyTitle}
            </h4>
            <div className="p-3 bg-stone-50/70 rounded-lg border border-stone-200/70 flex items-center justify-between text-xs">
              <span className="text-slate-500">Valor do Imóvel:</span>
              <span className="font-serif font-bold text-navy-950 text-sm">
                R$ {lead.propertyPrice?.toLocaleString("pt-BR")}
              </span>
            </div>
          </div>

          {/* Follow-up Return Schedule */}
          <div className="bg-white rounded-xl p-6 border border-stone-200/90 shadow-subtle space-y-3 text-xs">
            <h4 className="font-serif font-semibold text-base text-navy-950">
              Agendar Próximo Retorno
            </h4>
            <div>
              <label className="text-slate-600 block mb-1">Data & Hora do Contato</label>
              <input
                type="datetime-local"
                value={scheduledReturn}
                onChange={(e) => setScheduledReturn(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-md text-xs focus:outline-none focus:border-navy-950"
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Você receberá uma notificação no painel no horário marcado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
