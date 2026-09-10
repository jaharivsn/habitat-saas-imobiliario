import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PropertySearchHub from "@/components/search/PropertySearchHub";

export default function ImoveisPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="p-12 text-center text-slate-400">Carregando imóveis...</div>}>
          <PropertySearchHub
            pageTitle="Busca de Imóveis"
            pageSubtitle="Explore imóveis residenciais, comerciais e condomínios fechados de alto padrão"
          />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
