"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Comprar", href: "/comprar" },
    { label: "Alugar", href: "/alugar" },
    { label: "Lançamentos", href: "/lancamentos" },
    { label: "Condomínios", href: "/condominios" },
    { label: "Corretores", href: "/corretores" },
    { label: "Sobre", href: "/sobre" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F6]/92 backdrop-blur-md border-b border-stone-200/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[68px]">
          {/* Logo refinada */}
          <Link href="/" className="group flex flex-col">
            <span className="font-serif tracking-[0.25em] text-xl font-normal text-stone-950 group-hover:text-stone-600 transition-colors">
              HABITAT
            </span>
            <span className="text-[8px] tracking-[0.35em] text-stone-400 uppercase -mt-0.5 font-sans font-light">
              Private Real Estate
            </span>
          </Link>

          {/* Links essenciais bem espaçados */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[11px] uppercase tracking-[0.2em] transition-colors ${
                    isActive
                      ? "text-stone-950 font-semibold"
                      : "text-stone-500 hover:text-stone-950 font-medium"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Ações Sutis à Direita */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/favoritos"
              className="text-[11px] uppercase tracking-[0.18em] text-stone-500 hover:text-stone-950 font-medium transition-colors"
            >
              Favoritos
            </Link>

            <Link
              href="/entrar"
              className="text-[11px] uppercase tracking-[0.18em] text-stone-500 hover:text-stone-950 font-medium transition-colors"
            >
              Entrar
            </Link>

            <Link
              href="/anunciar"
              className="text-[10px] uppercase tracking-[0.2em] font-medium px-4 py-2 border border-stone-950 text-stone-950 hover:bg-stone-950 hover:text-white transition-colors"
            >
              Anunciar
            </Link>
          </div>

          {/* Menu Mobile */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-950 transition-colors"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Drawer Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-[#FAF9F6] px-6 py-8 space-y-6">
          <nav className="space-y-4">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm uppercase tracking-[0.2em] text-stone-700 hover:text-stone-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="pt-6 border-t border-stone-200/80 space-y-4">
            <Link
              href="/favoritos"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs uppercase tracking-[0.18em] text-stone-600"
            >
              Favoritos
            </Link>
            <Link
              href="/entrar"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs uppercase tracking-[0.18em] text-stone-600"
            >
              Entrar na conta
            </Link>
            <Link
              href="/anunciar"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center text-xs uppercase tracking-[0.2em] py-3 bg-stone-950 text-white font-medium"
            >
              Anunciar Imóvel
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
