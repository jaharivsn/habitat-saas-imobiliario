import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PropertySearchHub from "@/components/search/PropertySearchHub";

export default function ComercialPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="p-12 text-center text-slate-400">Carregando imóveis corporativos...</div>}>
          <PropertySearchHub
            forcedCommercial={true}
            pageTitle="Imóveis Comerciais & Corporativos"
            pageSubtitle="Lajes corporativas Triple A, andares inteiros e sedes empresariais nas regiões mais valorizadas"
          />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
