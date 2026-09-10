"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  X,
  ArrowRightLeft,
  Shield,
  CheckCircle2,
} from "lucide-react";
import { mockTeamMembers } from "@/data/mockData";
import { TeamMember, TeamRole } from "@/types";

export default function EquipePage() {
  const [members, setMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // New member inputs
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newRole, setNewRole] = useState<TeamRole>("corretor");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newM: TeamMember = {
      id: `team-${Date.now()}`,
      name: newName.trim(),
      email: newEmail.trim(),
      phone: newPhone.trim(),
      role: newRole,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      activeListings: 0,
      totalLeads: 0,
      conversionRate: "0%",
      joinedDate: "Março 2024",
    };

    setMembers([...members, newM]);
    setShowAddModal(false);
    setNewName("");
    setNewEmail("");
    setNewPhone("");
    showToast(`Membro ${newM.name} adicionado com sucesso!`);
  };

  const removeMember = (id: string) => {
    setMembers(members.filter((m) => m.id !== id));
    showToast("Membro removido da equipe.");
  };

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setShowTransferModal(false);
    showToast("Carteira de leads e imóveis transferida com sucesso!");
  };

  const handleSavePermissions = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPermissionsModal(false);
    showToast("Permissões de acesso atualizadas com sucesso!");
  };

  return (
    <div className="space-y-6">
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-800 text-white px-5 py-3 rounded-sm shadow-luxury border border-emerald-600/40 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-600">
            Gestão de Agência & Permissões
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 mt-0.5">
            Equipe de Corretores & Gestão
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Controle de cargos (Proprietário, Administrador, Gerente, Corretor, Assistente), permissões e transferências de carteira.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTransferModal(true)}
            className="bg-white border border-stone-200 hover:bg-stone-50 text-stone-800 text-[11px] uppercase tracking-wider font-semibold px-4 py-2.5 rounded-sm shadow-xs flex items-center gap-1.5 transition"
          >
            <ArrowRightLeft className="w-4 h-4 text-gold-600" />
            <span>Transferir Carteira</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-navy-950 hover:bg-navy-900 text-white text-[11px] uppercase tracking-wider font-semibold px-4 py-2.5 rounded-sm shadow-sm flex items-center justify-center gap-1.5 transition"
          >
            <Plus className="w-4 h-4 text-gold-400" />
            <span>Convidar Membro</span>
          </button>
        </div>
      </div>

      {/* Team Members Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {members.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-xl p-6 border border-stone-200/90 shadow-subtle flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between">
                <img
                  src={m.avatar}
                  alt={m.name}
                  className="w-14 h-14 rounded-md object-cover border border-stone-200/80 shadow-xs"
                />
                <span className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-stone-100 text-stone-700 border border-stone-200/80 capitalize">
                  {m.role}
                </span>
              </div>

              <div className="mt-4">
                <h3 className="font-serif font-bold text-base text-navy-950">
                  {m.name}
                </h3>
                <p className="text-xs text-slate-400 truncate">{m.email}</p>
                <p className="text-xs text-slate-500 mt-0.5">{m.phone}</p>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-1.5 mt-4 pt-4 border-t border-slate-100 text-xs">
                <div className="bg-slate-50 p-2 rounded-xl text-center">
                  <span className="font-bold text-navy-950 block">{m.activeListings}</span>
                  <span className="text-[9px] text-slate-400">Imóveis</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl text-center">
                  <span className="font-bold text-navy-950 block">{m.totalLeads}</span>
                  <span className="text-[9px] text-slate-400">Leads</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl text-center">
                  <span className="font-bold text-emerald-700 block">{m.conversionRate}</span>
                  <span className="text-[9px] text-slate-400">Conversão</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                onClick={() => {
                  setSelectedMember(m);
                  setShowPermissionsModal(true);
                }}
                className="text-navy-900 font-semibold hover:underline flex items-center gap-1 text-[11px]"
              >
                <Shield className="w-3 h-3 text-gold-600" />
                <span>Permissões</span>
              </button>

              {m.role !== "proprietario" && (
                <button
                  onClick={() => removeMember(m.id)}
                  className="text-slate-400 hover:text-rose-600 p-1"
                  title="Remover da equipe"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add Member (All 5 Roles from Requirement 18) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-luxury border border-stone-200/90 relative space-y-4 text-xs animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="font-serif font-bold text-lg text-navy-950">
                Convidar Membro para a Equipe
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 rounded-sm bg-stone-100 flex items-center justify-center text-stone-500 hover:text-navy-950"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-3">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Nome do profissional"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-sm focus:outline-none focus:border-navy-950"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">E-mail Corporativo</label>
                <input
                  type="email"
                  required
                  placeholder="email@imobiliaria.com.br"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
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
                <label className="font-semibold text-stone-700 block mb-1">Função / Cargo</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as TeamRole)}
                  className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-sm font-medium capitalize focus:outline-none focus:border-navy-950"
                >
                  <option value="proprietario">Proprietário (Acesso Total)</option>
                  <option value="administrador">Administrador (Gestão Geral)</option>
                  <option value="gerente">Gerente (Gestão de Vendas & Leads)</option>
                  <option value="corretor">Corretor (Anúncios & Seus Leads)</option>
                  <option value="assistente">Assistente (Secretaria & Agendamentos)</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200/80 rounded-sm text-[11px] uppercase tracking-wider font-semibold transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-navy-950 hover:bg-navy-900 text-white rounded-sm text-[11px] uppercase tracking-wider font-semibold shadow-sm transition"
                >
                  Enviar Convite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Transfer Leads/Properties */}
      {showTransferModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-luxury border border-stone-200/90 space-y-4 text-xs animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="font-serif font-bold text-lg text-navy-950">
                Transferir Carteira de Leads & Imóveis
              </h3>
              <button
                onClick={() => setShowTransferModal(false)}
                className="w-7 h-7 rounded-sm bg-stone-100 flex items-center justify-center text-stone-500 hover:text-navy-950"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleTransfer} className="space-y-3">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Transferir De (Corretor Origem)</label>
                <select className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-sm focus:outline-none focus:border-navy-950">
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>{m.name} ({m.totalLeads} leads ativos)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Transferir Para (Corretor Destino)</label>
                <select className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-sm focus:outline-none focus:border-navy-950">
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">O que transferir?</label>
                <div className="space-y-2 pt-1">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded-sm text-navy-950 accent-navy-950" />
                    <span>Todos os leads em aberto / em negociação</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded-sm text-navy-950 accent-navy-950" />
                    <span>Todos os imóveis ativos cadastrados</span>
                  </label>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowTransferModal(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200/80 rounded-sm text-[11px] uppercase tracking-wider font-semibold transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-navy-950 hover:bg-navy-900 text-white rounded-sm text-[11px] uppercase tracking-wider font-semibold shadow-sm transition"
                >
                  Confirmar Transferência
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Permissions */}
      {showPermissionsModal && selectedMember && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-luxury border border-stone-200/90 space-y-4 text-xs animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div>
                <h3 className="font-serif font-bold text-lg text-navy-950">
                  Permissões de {selectedMember.name}
                </h3>
                <span className="text-[10px] text-stone-400 capitalize">Cargo: {selectedMember.role}</span>
              </div>
              <button
                onClick={() => setShowPermissionsModal(false)}
                className="w-7 h-7 rounded-sm bg-stone-100 flex items-center justify-center text-stone-500 hover:text-navy-950"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePermissions} className="space-y-3">
              <div className="space-y-2">
                {[
                  "Publicar imóveis diretamente sem revisão",
                  "Ver todos os leads da agência",
                  "Editar informações institucionais da agência",
                  "Acessar faturamento e relatórios financeiros",
                  "Exportar base de dados de clientes",
                ].map((perm, i) => (
                  <label key={i} className="flex items-center gap-2 p-2 bg-stone-50/80 border border-stone-100 rounded-md cursor-pointer">
                    <input type="checkbox" defaultChecked={i < 2} className="rounded-sm text-navy-950 accent-navy-950" />
                    <span className="text-stone-700">{perm}</span>
                  </label>
                ))}
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPermissionsModal(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200/80 rounded-sm text-[11px] uppercase tracking-wider font-semibold transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-navy-950 hover:bg-navy-900 text-white rounded-sm text-[11px] uppercase tracking-wider font-semibold shadow-sm transition"
                >
                  Salvar Permissões
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
