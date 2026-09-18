"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { UserCheck, Building, Sliders, ArrowRight, Lock, Mail } from "lucide-react";

export default function EntrarPage() {
  const router = useRouter();
  const [role, setRole] = useState<"corretor" | "comprador" | "admin">("corretor");
  const [email, setEmail] = useState("alexandre@habitatprime.com.br");
  const [password, setPassword] = useState("••••••••");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const nextUrl = new URLSearchParams(window.location.search).get('next');
    
    if (role === "admin") {
      document.cookie = "habitat_session=demo; path=/; max-age=86400";
      router.push(nextUrl || "/admin");
    } else if (role === "comprador") {
      router.push("/conta");
    } else {
      document.cookie = "habitat_session=demo; path=/; max-age=86400";
      router.push(nextUrl || "/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Header />

      <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white rounded-xl p-8 border border-stone-200/90 shadow-luxury space-y-6">
          {/* Header */}
          <div className="text-center">
            <span className="font-serif tracking-[0.25em] text-xl font-bold text-navy-950 block">
              HABITAT
            </span>
            <h1 className="font-serif text-2xl font-semibold text-slate-900 mt-2">
              Acesse sua conta
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-light">
              Selecione o perfil de acesso à plataforma
            </p>
          </div>

          {/* Profile Selector Tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-100 rounded-lg text-xs font-semibold border border-stone-200/70">
            <button
              type="button"
              onClick={() => {
                setRole("corretor");
                setEmail("alexandre@habitatprime.com.br");
              }}
              className={`py-2 px-2 rounded-md transition flex flex-col items-center gap-1 text-[11px] font-semibold uppercase tracking-wider ${
                role === "corretor"
                  ? "bg-white text-navy-950 shadow-subtle border border-stone-200/80"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Building className="w-3.5 h-3.5 text-gold-700" />
              <span>Corretor</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setRole("comprador");
                setEmail("comprador@cliente.com.br");
              }}
              className={`py-2 px-2 rounded-md transition flex flex-col items-center gap-1 text-[11px] font-semibold uppercase tracking-wider ${
                role === "comprador"
                  ? "bg-white text-navy-950 shadow-subtle border border-stone-200/80"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-gold-700" />
              <span>Comprador</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setRole("admin");
                setEmail("admin@habitatplatform.com");
              }}
              className={`py-2 px-2 rounded-md transition flex flex-col items-center gap-1 text-[11px] font-semibold uppercase tracking-wider ${
                role === "admin"
                  ? "bg-white text-navy-950 shadow-subtle border border-stone-200/80"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-gold-700" />
              <span>Admin</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-[10px] text-slate-500 mb-1.5">
                E-mail cadastrado
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gold-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-stone-50/70 border border-stone-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-navy-950 focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-semibold uppercase tracking-wider text-[10px] text-slate-500">Senha</label>
                <Link href="/contato?assunto=recuperacao-senha" className="text-[11px] font-medium text-gold-700 hover:text-navy-950 transition">
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gold-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-stone-50/70 border border-stone-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-navy-950 focus:bg-white transition"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200/80 text-slate-600">
              <span className="font-semibold text-[11px] uppercase tracking-wider text-navy-950 block">Demonstração Interativa:</span>
              <p className="text-[11px] text-slate-500 mt-1 font-light leading-relaxed">
                {role === "corretor" && "Você entrará diretamente no Painel SaaS do Corretor (/dashboard)."}
                {role === "comprador" && "Você entrará na Área do Comprador com favoritos e alertas (/conta)."}
                {role === "admin" && "Você entrará no Painel de Moderação & Gestão Geral (/admin)."}
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-navy-950 hover:bg-gold-600 hover:text-navy-950 text-white font-semibold text-xs uppercase tracking-wider rounded-sm shadow-subtle hover:shadow-luxury transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Entrar no {role === "corretor" ? "Painel Corretor" : role === "admin" ? "Painel Admin" : "Portal Comprador"}</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold-400 group-hover:text-navy-950" />
            </button>
          </form>

          {/* Signup link */}
          <div className="pt-4 border-t border-stone-100 text-center text-xs text-slate-500">
            Ainda não tem conta profissional?{" "}
            <Link href="/cadastro" className="font-semibold uppercase tracking-wider text-[11px] text-navy-950 hover:text-gold-700 underline underline-offset-2 ml-1">
              Cadastre-se no SaaS
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
