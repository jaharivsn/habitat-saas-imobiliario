import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PropertySearchHub from "@/components/search/PropertySearchHub";

export default function ComprarPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="p-12 text-center text-slate-400">Carregando imóveis à venda...</div>}>
          <PropertySearchHub
            forcedOperation="venda"
            pageTitle="Imóveis para Venda"
            pageSubtitle="Residências exclusivas, mansões e coberturas para aquisição patrimonial definitiva"
          />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
