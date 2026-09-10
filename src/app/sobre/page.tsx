import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Shield, Sparkles, Building } from "lucide-react";

export default function SobrePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Header />

      <main className="flex-1 pb-20">
        <div className="bg-navy-950 text-white py-20 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-400">
              Sobre a Habitat
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight">
              Redefinindo o Ecossistema Imobiliário de Alto Padrão
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
              Unimos a sofisticação da melhor curadoria arquitetônica com a infraestrutura de software mais avançada para corretores e imobiliárias.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 space-y-12">
          <div className="bg-white rounded-xl p-8 sm:p-12 border border-stone-200/90 shadow-subtle space-y-6">
            <h2 className="font-serif font-semibold text-2xl text-navy-950">
              Nossa Missão
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-light">
              O mercado imobiliário de alto padrão sempre exigiu confiança, sigilo e excelência estética. No entanto, os portais tradicionais tornaram-se ruidosos, poluídos e lentos. Criamos o Habitat para oferecer uma experiência limpa, rápida e visualmente deslumbrante, capacitando os melhores corretores com um SaaS profissional integrado.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-stone-100">
              <div className="space-y-2">
                <Shield className="w-6 h-6 text-gold-700" />
                <h3 className="font-serif font-semibold text-sm text-navy-950">Curadoria Rigorosa</h3>
                <p className="text-xs text-slate-500 font-light">
                  Apenas imóveis autênticos com documentação preliminar e fotos reais.
                </p>
              </div>

              <div className="space-y-2">
                <Building className="w-6 h-6 text-gold-700" />
                <h3 className="font-serif font-semibold text-sm text-navy-950">Tecnologia SaaS</h3>
                <p className="text-xs text-slate-500 font-light">
                  CRM com WhatsApp integrado, esteira de leads e gestão de comissões.
                </p>
              </div>

              <div className="space-y-2">
                <Sparkles className="w-6 h-6 text-gold-700" />
                <h3 className="font-serif font-semibold text-sm text-navy-950">Design Minimalista</h3>
                <p className="text-xs text-slate-500 font-light">
                  Interface limpa com foco total na fotografia e na facilidade de contato.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
