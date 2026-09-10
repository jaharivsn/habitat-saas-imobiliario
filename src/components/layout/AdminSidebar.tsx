"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldAlert,
  LayoutDashboard,
  Users,
  Building2,
  Building,
  CheckSquare,
  CreditCard,
  BarChart2,
  MapPin,
  FileText,
  LifeBuoy,
  Settings,
  ArrowLeft,
  Sliders,
  Trees,
  Compass,
  Users2,
  Layers,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menu = [
    { label: "Dashboard Geral", href: "/admin", icon: LayoutDashboard },
    { label: "Fila de Moderação", href: "/admin/moderacao", icon: CheckSquare, badge: "3" },
    { label: "Assinaturas & MRR", href: "/admin/assinaturas", icon: CreditCard },
    { label: "Leads Globais", href: "/admin/leads", icon: Users2 },
    { label: "Todos os Imóveis", href: "/admin/imoveis", icon: Building2 },
    { label: "Usuários", href: "/admin/usuarios", icon: Users },
    { label: "Corretores", href: "/admin/corretores", icon: Users },
    { label: "Imobiliárias", href: "/admin/imobiliarias", icon: Building },
    { label: "Cidades", href: "/admin/cidades", icon: MapPin },
    { label: "Bairros", href: "/admin/bairros", icon: Compass },
    { label: "Condomínios", href: "/admin/condominios", icon: Trees },
    { label: "Conteúdo & Blog", href: "/admin/conteudo", icon: FileText },
    { label: "Planos SaaS", href: "/admin/planos", icon: Layers },
    { label: "Métricas Globais", href: "/admin/metricas", icon: BarChart2 },
    { label: "Suporte & Denúncias", href: "/admin/suporte", icon: LifeBuoy, badge: "1" },
    { label: "Configurações", href: "/admin/configuracoes", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0A0E17] text-slate-300 flex flex-col justify-between shrink-0 min-h-screen border-r border-slate-800 select-none">
      <div>
        {/* Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-slate-800">
          <Link href="/admin" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-xl bg-rose-600/20 text-rose-500 border border-rose-500/30 flex items-center justify-center font-bold">
              <ShieldAlert className="w-4 h-4" />
            </span>
            <div>
              <span className="font-serif font-bold text-sm text-white block">
                HABITAT ADMIN
              </span>
              <span className="text-[9px] uppercase font-mono tracking-wider text-rose-400">
                Super Administrador
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-0.5 text-xs font-semibold overflow-y-auto max-h-[calc(100vh-160px)]">
          {menu.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-xl transition ${
                  isActive
                    ? "bg-rose-600 text-white font-bold shadow"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full shrink-0">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Return */}
      <div className="p-4 border-t border-slate-800 space-y-2 text-xs">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Ir para o Painel Corretor</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Ver Portal Público</span>
        </Link>
      </div>
    </aside>
  );
}
