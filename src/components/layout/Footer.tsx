"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#0C0E12] text-stone-400 pt-20 pb-12 border-t border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bloco Superior: Marca e Newsletter em Linha Única */}
        <div className="pb-16 border-b border-stone-800/60 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-6 space-y-3">
            <span className="font-serif tracking-[0.28em] text-2xl font-normal text-stone-100 block">
              HABITAT
            </span>
            <p className="text-xs text-stone-400 font-light max-w-md leading-relaxed">
              Curadoria editorial de residências singulares, arquitetura contemporânea e refúgios em condomínios fechados.
            </p>
          </div>

          <div className="lg:col-span-6 lg:flex lg:justify-end">
            <div className="w-full max-w-md">
              <span className="text-[10px] uppercase tracking-[0.22em] text-stone-400 block mb-3 font-medium">
                Mailing Privado • Oportunidades Off-Market
              </span>
              {subscribed ? (
                <p className="text-xs text-stone-300 font-light italic">
                  Inscrição confirmada com sucesso.
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-end gap-4 border-b border-stone-700 focus-within:border-stone-400 pb-2 transition-colors">
                  <input
                    type="email"
                    required
                    aria-label="Endereço de e-mail para newsletter"
                    placeholder="Seu endereço de e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-transparent text-xs text-stone-200 placeholder:text-stone-500 focus:outline-none font-light"
                  />
                  <button
                    type="submit"
                    className="text-[10px] uppercase tracking-[0.22em] text-stone-300 hover:text-white font-medium transition-colors"
                  >
                    Assinar
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bloco Central: Colunas Arejadas */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-10 text-xs">
          {/* Coluna 1: Portfólio */}
          <div className="space-y-4">
            <h5 className="text-stone-200 font-medium tracking-[0.22em] text-[10px] uppercase">
              Portfólio
            </h5>
            <ul className="space-y-2.5 font-light">
              <li>
                <Link href="/comprar" className="hover:text-stone-100 transition-colors">
                  Casas & Vilas
                </Link>
              </li>
              <li>
                <Link href="/alugar" className="hover:text-stone-100 transition-colors">
                  Locação Nobre
                </Link>
              </li>
              <li>
                <Link href="/lancamentos" className="hover:text-stone-100 transition-colors">
                  Lançamentos
                </Link>
              </li>
              <li>
                <Link href="/imoveis?tipo=cobertura" className="hover:text-stone-100 transition-colors">
                  Penthouses
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 2: Regiões */}
          <div className="space-y-4">
            <h5 className="text-stone-200 font-medium tracking-[0.22em] text-[10px] uppercase">
              Destinos
            </h5>
            <ul className="space-y-2.5 font-light">
              <li>
                <Link href="/cidade/sao-paulo" className="hover:text-stone-100 transition-colors">
                  São Paulo
                </Link>
              </li>
              <li>
                <Link href="/cidade/rio-de-janeiro" className="hover:text-stone-100 transition-colors">
                  Rio de Janeiro
                </Link>
              </li>
              <li>
                <Link href="/condominios" className="hover:text-stone-100 transition-colors">
                  Fazenda Boa Vista
                </Link>
              </li>
              <li>
                <Link href="/cidade/winter-garden" className="hover:text-stone-100 transition-colors">
                  Winter Garden, FL
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Profissionais */}
          <div className="space-y-4">
            <h5 className="text-stone-200 font-medium tracking-[0.22em] text-[10px] uppercase">
              Plataforma
            </h5>
            <ul className="space-y-2.5 font-light">
              <li>
                <Link href="/corretores" className="hover:text-stone-100 transition-colors">
                  Assessores Credenciados
                </Link>
              </li>
              <li>
                <Link href="/anunciar" className="hover:text-stone-100 transition-colors">
                  Planos para Boutiques
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-stone-100 transition-colors">
                  Acesso Corporativo
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-stone-100 transition-colors">
                  Governança
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Private Desk */}
          <div className="space-y-4">
            <h5 className="text-stone-200 font-medium tracking-[0.22em] text-[10px] uppercase">
              Private Desk
            </h5>
            <div className="space-y-2.5 font-light text-stone-400">
              <p>Av. Faria Lima, 3477 • Itaim Bibi</p>
              <p>São Paulo • SP</p>
              <p className="text-stone-300 pt-1">+55 (11) 3040-5000</p>
              <p className="text-stone-500 text-[11px] pt-1">
                Atendimento estritamente confidencial com hora marcada.
              </p>
            </div>
          </div>
        </div>

        {/* Bloco Inferior: Copyright & Legal */}
        <div className="pt-8 border-t border-stone-800/60 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-stone-500 font-light">
          <p>
            © {new Date().getFullYear()} Habitat Private Real Estate. CRECI Jurídico 39.412-J.
          </p>

          <div className="flex items-center gap-6">
            <Link href="/sobre" className="hover:text-stone-300 transition-colors">
              Privacidade
            </Link>
            <Link href="/sobre" className="hover:text-stone-300 transition-colors">
              Termos de Uso
            </Link>
            <Link href="/contato" className="hover:text-stone-300 transition-colors">
              Contato
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
