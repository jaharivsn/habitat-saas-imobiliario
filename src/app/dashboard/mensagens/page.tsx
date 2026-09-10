"use client";

import { useState } from "react";
import {
  Search,
  Send,
  Phone,
  MessageCircle,
} from "lucide-react";
import { mockMessageThreads } from "@/data/mockData";
import { MessageThread } from "@/types";

export default function MensagensPage() {
  const [threads, setThreads] = useState<MessageThread[]>(mockMessageThreads);
  const [activeThreadId, setActiveThreadId] = useState<string>(threads[0]?.id || "");
  const [replyText, setReplyText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"todos" | "lead" | "cliente" | "imovel" | "corretor">("todos");

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeThread) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: "broker" as const,
      text: replyText.trim(),
      time: "Agora",
    };

    setThreads(
      threads.map((t) =>
        t.id === activeThread.id
          ? {
              ...t,
              lastMessage: replyText.trim(),
              lastMessageTime: "Agora",
              messages: [...t.messages, newMsg],
            }
          : t
      )
    );
    setReplyText("");
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
          Comunicação Centralizada
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 mt-0.5">
          Central de Mensagens
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Histórico unificado de conversas organizado por Leads, Clientes, Imóveis e Corretores.
        </p>
      </div>

      {/* Organization Tabs (Requirement 17) */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-bold">
        {[
          { id: "todos", label: "Todas as Conversas" },
          { id: "lead", label: "Por Lead" },
          { id: "cliente", label: "Por Cliente" },
          { id: "imovel", label: "Por Imóvel" },
          { id: "corretor", label: "Entre Corretores" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCategoryFilter(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl transition whitespace-nowrap ${
              categoryFilter === tab.id
                ? "bg-navy-900 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Chat Window: 2 Columns */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-subtle overflow-hidden grid grid-cols-1 md:grid-cols-12 h-[680px]">
        {/* Left: Thread List */}
        <div className="md:col-span-4 border-r border-slate-200 flex flex-col h-full bg-slate-50/50">
          <div className="p-4 border-b border-slate-200 bg-white">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar conversas..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
              />
            </div>
          </div>

          {/* Threads */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {threads.map((t) => {
              const isActive = t.id === activeThread?.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setActiveThreadId(t.id)}
                  className={`p-4 flex items-start gap-3 cursor-pointer transition ${
                    isActive ? "bg-white shadow-xs border-l-4 border-navy-900" : "hover:bg-slate-100/60"
                  }`}
                >
                  <img
                    src={t.avatar}
                    alt={t.contactName}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-navy-950 truncate">
                        {t.contactName}
                      </h4>
                      <span className="text-[10px] text-slate-400">{t.lastMessageTime}</span>
                    </div>

                    <span className="text-[10px] font-bold text-gold-700 block truncate">
                      {t.propertyTitle}
                    </span>

                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {t.lastMessage}
                    </p>

                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                        Ativa
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Chat Conversation */}
        <div className="md:col-span-8 flex flex-col h-full">
          {activeThread ? (
            <>
              {/* Chat Top Header with contact shortcuts */}
              <div className="p-4 px-6 border-b border-slate-200 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <img
                    src={activeThread.avatar}
                    alt={activeThread.contactName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-navy-950">
                      {activeThread.contactName}
                    </h3>
                    <span className="text-xs text-slate-500">
                      Imóvel de interesse: {activeThread.propertyTitle}
                    </span>
                  </div>
                </div>

                {/* Shortcuts */}
                <div className="flex items-center gap-2">
                  <a
                    href="https://wa.me/5511999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition"
                    title="Falar no WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                  <a
                    href="tel:5511999999999"
                    className="p-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                    title="Ligar"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/30">
                {activeThread.messages.map((m) => {
                  const isMe = m.sender === "broker";
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`max-w-md p-3.5 rounded-lg text-xs leading-relaxed shadow-xs ${
                          isMe
                            ? "bg-navy-900 text-white rounded-br-none"
                            : "bg-white text-slate-800 border border-slate-200/90 rounded-bl-none"
                        }`}
                      >
                        {m.text}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 px-1">
                        {m.time}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Input Box */}
              <form
                onSubmit={handleSendReply}
                className="p-4 border-t border-slate-200 bg-white flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Escreva sua mensagem aqui..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-navy-900"
                />
                <button
                  type="submit"
                  className="bg-navy-900 hover:bg-navy-800 text-white p-3 rounded-lg transition shadow-subtle"
                  title="Enviar mensagem"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-slate-400">
              Selecione uma conversa ao lado para responder.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
