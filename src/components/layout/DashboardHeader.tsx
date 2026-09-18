"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Bell,
  ExternalLink,
  ChevronDown,
  Menu,
  MessageCircle,
  Calendar,
  LogOut,
  LayoutDashboard,
  Home,
  Users,
  CalendarDays,
  MessageSquare
} from "lucide-react";

interface DashboardHeaderProps {
  onToggleMobileSidebar?: () => void;
}

export default function DashboardHeader({ onToggleMobileSidebar }: DashboardHeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "habitat_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/");
  };

  return (
    <header className="h-20 bg-white border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile menu, Logo & Navigation */}
      <div className="flex items-center gap-6 flex-1">
        <div className="flex items-center gap-3">
          {onToggleMobileSidebar && (
            <button
              type="button"
              onClick={onToggleMobileSidebar}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Abrir menu lateral"
              title="Abrir menu lateral"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="font-serif tracking-[0.25em] text-lg font-bold text-navy-950">
              HABITAT
            </span>
            <span className="bg-gold-500 text-navy-950 text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
              Pro
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5">
          <Link href="/dashboard" className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-navy-950 hover:bg-slate-50 transition">
            Visão Geral
          </Link>
          <Link href="/dashboard/imoveis" className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-navy-950 hover:bg-slate-50 transition">
            Imóveis
          </Link>
          <Link href="/dashboard/leads" className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-navy-950 hover:bg-slate-50 transition">
            Leads
          </Link>
          <Link href="/dashboard/agenda" className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-navy-950 hover:bg-slate-50 transition">
            Agenda
          </Link>
          <Link href="/dashboard/mensagens" className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-navy-950 hover:bg-slate-50 transition">
            Mensagens
          </Link>
        </nav>
      </div>

      {/* Right: Quick actions, notifications, user */}
      <div className="flex items-center gap-4">
        {/* Link to public portal */}
        <Link
          href="/"
          target="_blank"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:text-navy-900 hover:bg-slate-50 text-xs font-semibold transition"
        >
          <span>Ver Portal</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </Link>

        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 relative transition"
            title="Notificações"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-dropdown border border-slate-200/90 p-4 space-y-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-bold text-xs text-navy-950">Notificações Recentes</span>
                <span className="text-[10px] text-gold-700 font-semibold cursor-pointer">Marcar como lidas</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between font-bold text-navy-950">
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3 text-emerald-600" />
                      Novo Lead no WhatsApp
                    </span>
                    <span className="text-[10px] text-slate-400">Há 10m</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Dr. Eduardo Meirelles enviou uma mensagem para a Mansão Boa Vista.
                  </p>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between font-bold text-navy-950">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-gold-600" />
                      Visita Confirmada
                    </span>
                    <span className="text-[10px] text-slate-400">Há 1h</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Visita agendada para Sábado às 10h (Fazenda Boa Vista).
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Pill & Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2.5 pl-2 py-1 pr-1.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 transition"
          >
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80"
              alt="Carlos Mendes"
              className="w-7 h-7 rounded-full object-cover"
            />
            <span className="text-xs font-bold text-navy-950 hidden sm:inline">
              Carlos Mendes
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-dropdown border border-slate-200/90 py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
              <Link
                href="/dashboard/perfil"
                className="flex items-center gap-2 px-4 py-2 text-xs text-slate-600 hover:bg-slate-50 hover:text-navy-950"
              >
                Meu Perfil
              </Link>
              <div className="h-px bg-slate-100 my-1" />
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sair</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

