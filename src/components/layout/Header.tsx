"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"PT" | "EN">("PT");
  const pathname = usePathname();

  // Links essenciais no desktop (enxuto, zero poluição visual)
  const primaryLinks = [
    { label: "Comprar", href: "/comprar" },
    { label: "Alugar", href: "/alugar" },
    { label: "Lançamentos", href: "/lancamentos" },
    { label: "Condomínios", href: "/condominios" },
    { label: "Corretores", href: "/corretores" },
  ];

  // Todos os links para o menu completo
  const allNavLinks = [
    { label: "Comprar", href: "/comprar" },
    { label: "Alugar", href: "/alugar" },
    { label: "Lançamentos", href: "/lancamentos" },
    { label: "Condomínios", href: "/condominios" },
    { label: "Corretores", href: "/corretores" },
    { label: "Imóveis Comerciais", href: "/comercial" },
    { label: "Imobiliárias", href: "/imobiliarias" },
    { label: "Sobre o Habitat", href: "/sobre" },
    { label: "Contato & Concierge", href: "/contato" },
    { label: "Favoritos", href: "/favoritos" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-stone-200/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo Minimalista & Slim */}
          <Link href="/" className="group flex items-baseline gap-2 shrink-0">
            <span className="font-serif tracking-[0.22em] text-lg font-normal text-stone-950 group-hover:text-stone-600 transition-colors">
              HABITAT
            </span>
          </Link>

          {/* Links Principais Enxutos (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {primaryLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[11px] uppercase tracking-[0.18em] transition-colors py-1 ${
                    isActive
                      ? "text-stone-950 font-semibold border-b border-stone-950"
                      : "text-stone-500 hover:text-stone-950 font-medium"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Ações Direitas Ultra-Limpos */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Seletor de Idioma Discreto */}
            <div className="flex items-center text-[10px] tracking-widest font-mono text-stone-400">
              <button
                type="button"
                onClick={() => setLanguage("PT")}
                className={`transition-colors ${language === "PT" ? "text-stone-950 font-bold" : "hover:text-stone-800"}`}
                aria-label="Português"
                title="Português"
              >
                PT
              </button>
              <span className="mx-1 text-stone-300">/</span>
              <button
                type="button"
                onClick={() => setLanguage("EN")}
                className={`transition-colors ${language === "EN" ? "text-stone-950 font-bold" : "hover:text-stone-800"}`}
                aria-label="English"
                title="English"
              >
                EN
              </button>
            </div>

            {/* Link Entrar (discreto no desktop) */}
            <Link
              href="/entrar"
              className="hidden sm:inline-block text-[11px] uppercase tracking-[0.16em] text-stone-500 hover:text-stone-950 font-medium transition-colors"
            >
              Entrar
            </Link>

            {/* Botão Anunciar Fino */}
            <Link
              href="/anunciar"
              className="text-[10px] uppercase tracking-[0.18em] font-medium px-3.5 py-1.5 border border-stone-950 text-stone-950 hover:bg-stone-950 hover:text-white transition-colors"
            >
              Anunciar
            </Link>

            {/* Menu Hamburger para abrir opções completas */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-stone-700 hover:text-stone-950 transition-colors flex items-center justify-center min-h-[40px] min-w-[40px]"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Drawer com Menu Completo */}
      {mobileMenuOpen && (
        <div className="border-t border-stone-200 bg-[#FAF9F6] px-6 py-8 space-y-6 shadow-xl animate-in fade-in duration-150 max-h-[85vh] overflow-y-auto">
          <div className="max-w-md mx-auto space-y-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-semibold block">
              Menu Completo
            </span>
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {allNavLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xs uppercase tracking-[0.18em] py-2 border-b border-stone-100 transition-colors ${
                    pathname === item.href
                      ? "text-stone-950 font-bold"
                      : "text-stone-600 hover:text-stone-950"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs">
              <Link
                href="/entrar"
                onClick={() => setMobileMenuOpen(false)}
                className="uppercase tracking-[0.18em] text-stone-600 hover:text-stone-950 font-medium"
              >
                Acessar Conta
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="uppercase tracking-[0.18em] text-stone-950 font-semibold"
              >
                Painel do Corretor &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
