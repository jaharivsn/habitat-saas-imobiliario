"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, ChevronDown, LogOut } from "lucide-react";

export default function AdminHeader() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "habitat_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/");
  };

  return (
    <header className="h-20 bg-[#0B1320] border-b border-slate-800 px-6 flex items-center justify-between text-white select-none">
      <div className="flex items-center gap-6 flex-1 max-w-md">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="font-serif tracking-[0.25em] text-lg font-bold text-white">
            HABITAT
          </span>
          <span className="bg-rose-500/15 text-rose-300 border border-rose-500/30 text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
            Admin Panel
          </span>
        </Link>
        
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
          <span className="text-slate-600">/</span>
          <span>Visão Geral</span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-rose-500/15 text-rose-300 border border-rose-500/30 rounded-sm text-[9px] uppercase tracking-wider font-semibold font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          <span>Ambiente de Moderação Ativo</span>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 hover:bg-slate-800/50 p-1.5 rounded-md transition"
          >
            <div className="w-8 h-8 rounded-sm bg-rose-600 text-white font-bold text-xs flex items-center justify-center">
              AD
            </div>
            <span className="font-semibold hidden sm:inline">Admin Geral</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-slate-900 rounded-xl shadow-dropdown border border-slate-800 py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-400 hover:bg-rose-500/10 hover:text-rose-300"
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
