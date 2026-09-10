import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PropertyCard from "@/components/property/PropertyCard";
import BrokerCard from "@/components/broker/BrokerCard";
import CommunityCard from "@/components/community/CommunityCard";
import { mockCities, mockProperties, mockBrokers, mockCommunities } from "@/data/mockData";
import { ArrowRight } from "lucide-react";

interface CityPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CityDetailPage({ params }: CityPageProps) {
  const { slug } = await params;
  const city = mockCities.find((c) => c.slug === slug);

  if (!city) {
    const fallback = mockCities[0];
    if (!fallback) notFound();
  }

  const currentCity = city || mockCities[0];

  // Properties in this city
  const cityProperties = mockProperties.filter((p) =>
    p.city.toLowerCase().includes(currentCity.name.toLowerCase())
  );

  // Brokers serving this city
  const cityBrokers = mockBrokers.filter((b) =>
    b.regions.some((r) =>
      currentCity.topNeighborhoods.includes(r) || r.toLowerCase().includes(currentCity.name.toLowerCase())
    )
  );

  // Communities in this city
  const cityCommunities = mockCommunities.filter(
    (c) => c.city.toLowerCase() === currentCity.name.toLowerCase()
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Header />

      <main className="flex-1 pb-20">
        {/* Hero */}
        <div className="relative h-[420px] bg-navy-950 overflow-hidden">
          <img
            src={currentCity.photo}
            alt={currentCity.name}
            className="w-full h-full object-cover opacity-45 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

          <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-400">
              Guia Imobiliário • {currentCity.state}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-1">
              Imóveis de Alto Padrão em {currentCity.name}
            </h1>
            <p className="text-stone-300 text-sm mt-2 max-w-2xl">
              {currentCity.lifestyle}
            </p>
          </div>
        </div>

        {/* Overview Stats Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <div className="bg-white rounded-xl p-6 shadow-subtle border border-stone-200/90 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <span className="text-[10px] text-stone-400 uppercase tracking-[0.16em] font-semibold block">
                Média do m² na Região Nobre
              </span>
              <span className="font-serif text-2xl font-bold text-navy-950 mt-1 block">
                R$ {currentCity.avgPriceM2.toLocaleString("pt-BR")}
              </span>
            </div>
            <div className="sm:border-l border-stone-200/80">
              <span className="text-[10px] text-stone-400 uppercase tracking-[0.16em] font-semibold block">
                Imóveis Disponíveis
              </span>
              <span className="font-serif text-2xl font-bold text-navy-950 mt-1 block">
                {currentCity.availableCount} Ativos
              </span>
            </div>
            <div className="sm:border-l border-stone-200/80">
              <span className="text-[10px] text-stone-400 uppercase tracking-[0.16em] font-semibold block">
                Bairros em Alta
              </span>
              <span className="text-xs font-bold text-stone-800 block mt-2">
                {currentCity.topNeighborhoods.slice(0, 3).join(", ")}
              </span>
            </div>
          </div>
        </div>

        {/* City Description & Lifestyle */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="bg-white rounded-xl p-8 border border-stone-200/90 shadow-subtle space-y-4">
            <h2 className="font-serif font-bold text-2xl text-navy-950">
              Panorama da Região & Qualidade de Vida
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              {currentCity.description}
            </p>
          </div>

          {/* Available Properties in City */}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-600">
                  Portfólio Local
                </span>
                <h3 className="font-serif text-2xl font-bold text-navy-950 mt-1">
                  Imóveis em {currentCity.name}
                </h3>
              </div>

              <Link
                href={`/imoveis?q=${encodeURIComponent(currentCity.name)}`}
                className="text-xs font-bold text-navy-950 hover:text-gold-600 transition flex items-center gap-1 uppercase tracking-wider"
              >
                <span>Ver busca completa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cityProperties.length > 0 ? (
                cityProperties.map((prop) => (
                  <PropertyCard key={prop.id} property={prop} />
                ))
              ) : (
                <div className="col-span-3 py-10 text-center text-stone-500 bg-white rounded-xl border border-stone-200/90 shadow-subtle">
                  Imóveis nesta cidade disponíveis sob consulta com nossa equipe off-market.
                </div>
              )}
            </div>
          </div>

          {/* Communities in City */}
          {cityCommunities.length > 0 && (
            <div className="mt-16">
              <h3 className="font-serif text-2xl font-bold text-navy-950 mb-6">
                Condomínios em {currentCity.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cityCommunities.map((comm) => (
                  <CommunityCard key={comm.id} community={comm} />
                ))}
              </div>
            </div>
          )}

          {/* Specialized Brokers */}
          {cityBrokers.length > 0 && (
            <div className="mt-16">
              <h3 className="font-serif text-2xl font-bold text-navy-950 mb-6">
                Corretores Especializados em {currentCity.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cityBrokers.map((broker) => (
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
