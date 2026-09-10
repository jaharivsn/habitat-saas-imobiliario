import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PropertyCard from "@/components/property/PropertyCard";
import BrokerCard from "@/components/broker/BrokerCard";
import { mockNeighborhoods, mockProperties, mockBrokers } from "@/data/mockData";
import { ArrowRight } from "lucide-react";

interface NeighborhoodPageProps {
  params: Promise<{ slug: string }>;
}

export default async function NeighborhoodDetailPage({ params }: NeighborhoodPageProps) {
  const { slug } = await params;
  const neighborhood = mockNeighborhoods.find((n) => n.slug === slug);

  if (!neighborhood) {
    const fallback = mockNeighborhoods[0];
    if (!fallback) notFound();
  }

  const currentN = neighborhood || mockNeighborhoods[0];

  // Properties in this neighborhood
  const properties = mockProperties.filter((p) =>
    p.neighborhood.toLowerCase().includes(currentN.name.toLowerCase())
  );

  // Brokers serving this neighborhood
  const brokers = mockBrokers.filter((b) =>
    b.regions.some((r) => r.toLowerCase().includes(currentN.name.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Header />

      <main className="flex-1 pb-20">
        <div className="relative h-[380px] bg-navy-950 overflow-hidden">
          <img
            src={currentN.photo}
            alt={currentN.name}
            className="w-full h-full object-cover opacity-45 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

          <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-400">
              {currentN.cityName} • {currentN.state}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-1">
              {currentN.name}
            </h1>
            <p className="text-stone-300 text-sm mt-2 max-w-2xl">
              {currentN.lifestyle}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="bg-white rounded-xl p-8 border border-stone-200/90 shadow-subtle space-y-4">
            <h2 className="font-serif font-bold text-2xl text-navy-950">
              Sobre o Bairro {currentN.name}
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              {currentN.description}
            </p>
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500 font-medium uppercase tracking-wider text-[11px]">Valor Médio do m²:</span>
              <span className="font-serif font-bold text-navy-950 text-base">
                R$ {currentN.avgPriceM2.toLocaleString("pt-BR")}/m²
              </span>
            </div>
          </div>

          {/* Properties in this neighborhood */}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-stone-200">
              <h3 className="font-serif text-2xl font-bold text-navy-950">
                Imóveis Disponíveis em {currentN.name}
              </h3>

              <Link
                href={`/imoveis?q=${encodeURIComponent(currentN.name)}`}
                className="text-xs font-bold text-navy-950 hover:text-gold-600 transition flex items-center gap-1 uppercase tracking-wider"
              >
                <span>Ver busca detalhada</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {properties.length > 0 ? (
                properties.map((prop) => (
                  <PropertyCard key={prop.id} property={prop} />
                ))
              ) : (
                <div className="col-span-3 py-10 text-center text-stone-500 bg-white rounded-xl border border-stone-200/90 shadow-subtle">
                  Novos imóveis neste bairro estão sendo adicionados pela nossa curadoria.
                </div>
              )}
            </div>
          </div>

          {/* Specialized Brokers */}
          {brokers.length > 0 && (
            <div className="mt-16">
              <h3 className="font-serif text-2xl font-bold text-navy-950 mb-6">
                Corretores Especialistas em {currentN.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {brokers.map((broker) => (
                  <BrokerCard key={broker.id} broker={broker} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
