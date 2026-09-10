import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PropertySearchHub from "@/components/search/PropertySearchHub";

export default function LancamentosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="p-12 text-center text-slate-400">Carregando lançamentos...</div>}>
          <PropertySearchHub
            forcedLaunch={true}
            pageTitle="Lançamentos Imobiliários"
            pageSubtitle="Projetos inovadores e condomínios em fase de obras com condições de investimento diferenciadas"
          />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
