"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, UserCheck, Building2, Globe, ChevronUp, ChevronDown, ExternalLink } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { USER_ROLES } from "@/lib/constants";
import { UserRole } from "@/types";

export default function RoleSwitcherBar() {
  const { role, setRole, user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  const getRoleIcon = (roleId: UserRole) => {
    switch (roleId) {
      case "public":
        return <Globe className="w-3.5 h-3.5" />;
      case "agent":
        return <UserCheck className="w-3.5 h-3.5" />;
      case "agency_owner":
        return <Building2 className="w-3.5 h-3.5" />;
      case "platform_admin":
        return <ShieldCheck className="w-3.5 h-3.5" />;
    }
  };

  const activeRoleData = USER_ROLES.find((r) => r.id === role) || USER_ROLES[0];

  return (
    <div className="fixed bottom-4 right-4 z-50 select-none">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 450, damping: 30 }}
        className="bg-navy-950/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.35)] text-white overflow-hidden text-xs"
      >
        {/* Top Mini Bar (Always visible) */}
        <div className="flex items-center gap-3 px-3.5 py-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400">
              Perfil:
            </span>
            <span className="font-medium text-white tracking-wide flex items-center gap-1.5">
              {getRoleIcon(role)}
              {activeRoleData.badge}
            </span>
          </div>

          <div className="h-3 w-px bg-white/10" />

          {/* Direct jump button */}
          <Link
            href={activeRoleData.destination}
            className="inline-flex items-center gap-1 text-[11px] text-gold-300 hover:text-gold-200 transition-colors py-0.5 px-2 rounded bg-white/5 hover:bg-white/10"
          >
            <span>Acessar</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          {/* Toggle Expand/Collapse */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-stone-400 hover:text-white transition-colors rounded hover:bg-white/5 ml-1"
            title={isExpanded ? "Recolher seletor" : "Alternar papéis"}
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronUp className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Expanded Drawer for Switching Roles */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="border-t border-white/10 p-3 max-w-xs space-y-1.5 bg-navy-950/80"
            >
              <div className="text-[10px] uppercase font-mono tracking-widest text-stone-400 mb-2 px-1">
                Simular Papel no Ecossistema:
              </div>

              {USER_ROLES.map((r) => {
                const isCurrent = r.id === role;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      setRole(r.id);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 border ${
                      isCurrent
                        ? "bg-white/15 border-gold-400/40 text-white"
                        : "bg-white/5 border-transparent text-stone-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-lg mt-0.5 ${
                        isCurrent
                          ? "bg-gold-500 text-navy-950"
                          : "bg-white/10 text-stone-300"
                      }`}
                    >
                      {getRoleIcon(r.id)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-xs">{r.label}</span>
                        {isCurrent && (
                          <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 bg-gold-400/20 text-gold-300 rounded">
                            Ativo
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-stone-400 leading-tight mt-0.5 line-clamp-2">
                        {r.description}
                      </p>
                    </div>
                  </button>
                );
              })}

              {user && (
                <div className="pt-2 mt-2 border-t border-white/10 px-1 text-[10px] text-stone-400 flex items-center justify-between">
                  <span>Logado como: <strong className="text-white">{user.name}</strong></span>
                  <button
                    type="button"
                    onClick={() => setRole("public")}
                    className="text-stone-300 hover:text-white underline underline-offset-2"
                  >
                    Sair
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
