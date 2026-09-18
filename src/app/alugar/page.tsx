import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PropertySearchHub from "@/components/search/PropertySearchHub";

export default function AlugarPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="p-12 text-center text-slate-400">Carregando imóveis para locação...</div>}>
          <PropertySearchHub
            forcedOperation="aluguel"
            pageTitle="Imóveis para Aluguel de Alto Padrão"
            pageSubtitle="Apartamentos e casas de luxo mobiliados e prontos para moradia nas melhores localizações"
          />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
