import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AgencyCard from "@/components/agency/AgencyCard";
import { mockAgencies } from "@/data/mockData";
import { ShieldCheck } from "lucide-react";

export default function ImobiliariasPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Header />

      <main className="flex-1 pb-20">
        <div className="bg-navy-950 text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-white/10 border border-white/15 text-gold-300 text-[10px] font-semibold uppercase tracking-[0.2em] mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Rede Institucional de Alto Padrão</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              Imobiliárias & Boutiques Parceiras
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
              As empresas líderes em consultoria patrimonial, lançamentos icônicos e vendas de grandes propriedades.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mockAgencies.map((agency) => (
              <AgencyCard key={agency.id} agency={agency} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
