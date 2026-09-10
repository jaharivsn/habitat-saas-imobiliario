"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building,
  Users2,
  MessageSquare,
  Calendar,
  Contact,
  Globe,
  BarChart3,
  CreditCard,
  User,
  Settings,
  PlusCircle,
  ExternalLink,
  LogOut,
  Heart,
} from "lucide-react";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Visão Geral", href: "/dashboard", icon: LayoutDashboard },
    { label: "Meus Imóveis", href: "/dashboard/imoveis", icon: Building },
    { label: "Leads (CRM)", href: "/dashboard/leads", icon: Users2, badge: "8" },
    { label: "Mensagens", href: "/dashboard/mensagens", icon: MessageSquare, badge: "1" },
    { label: "Agenda & Visitas", href: "/dashboard/agenda", icon: Calendar },
    { label: "Clientes", href: "/dashboard/clientes", icon: Contact },
    { label: "Favoritos & Acervo", href: "/dashboard/favoritos", icon: Heart },
    { label: "Gestão de Equipe", href: "/dashboard/equipe", icon: Users2 },
    { label: "Vitrine Pública", href: "/dashboard/pagina-publica", icon: Globe },
    { label: "Performance", href: "/dashboard/performance", icon: BarChart3 },
    { label: "Assinatura & Planos", href: "/dashboard/assinatura", icon: CreditCard },
    { label: "Meu Perfil", href: "/dashboard/perfil", icon: User },
    { label: "Configurações", href: "/dashboard/configuracoes", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-navy-950 text-slate-300 flex flex-col justify-between shrink-0 min-h-screen border-r border-navy-900 select-none">
      <div>
        {/* Logo & Platform Switcher */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-navy-900">
          <Link href="/" className="flex flex-col group">
            <span className="font-serif tracking-widest text-xl font-bold text-white group-hover:text-gold-400 transition">
              HABITAT
            </span>
            <span className="text-[9px] tracking-[0.2em] text-gold-400 uppercase -mt-1">
              Broker SaaS
            </span>
          </Link>

          <span className="px-2 py-0.5 rounded bg-gold-500/20 text-gold-400 text-[10px] font-bold border border-gold-400/30">
            PRO
          </span>
        </div>

        {/* Quick Action: Novo Imóvel */}
        <div className="p-4">
          <Link
            href="/dashboard/imoveis/novo"
            className="w-full bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Cadastrar Imóvel</span>
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="px-3 py-1 space-y-0.5 overflow-y-auto max-h-[calc(100vh-230px)]">
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? "bg-navy-800 text-white font-bold shadow-sm"
                    : "text-slate-400 hover:bg-navy-900/60 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <item.icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? "text-gold-400" : "text-slate-400"
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-gold-500 text-navy-950 shrink-0">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile & Portal Link */}
      <div className="p-4 border-t border-navy-900 space-y-3">
        <Link
          href="/corretor/alexandre-vasconcelos"
          target="_blank"
          className="flex items-center justify-between p-2.5 rounded-xl bg-navy-900/80 hover:bg-navy-900 text-xs text-slate-300 border border-navy-800 transition"
        >
          <div className="flex items-center gap-2 truncate">
            <Globe className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span className="truncate">Ver Minha Vitrine</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        </Link>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2.5">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80"
              alt="Alexandre"
              className="w-8 h-8 rounded-full object-cover border border-gold-400"
            />
            <div className="text-left">
              <span className="block text-xs font-bold text-white leading-tight">
                Alexandre V.
              </span>
              <span className="text-[10px] text-slate-400">CRECI 189420-F</span>
            </div>
          </div>

          <Link href="/entrar" className="text-slate-400 hover:text-white p-1.5" title="Sair">
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
