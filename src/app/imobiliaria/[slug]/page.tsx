import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PropertyCard from "@/components/property/PropertyCard";
import BrokerCard from "@/components/broker/BrokerCard";
import { mockAgencies, mockProperties, mockBrokers } from "@/data/mockData";
import {
  ShieldCheck,
  Phone,
  MessageCircle,
  MapPin,
  Globe,
} from "lucide-react";

interface AgencyPageProps {
  params: Promise<{ slug: string }>;
}

export default async function AgencyDetailPage({ params }: AgencyPageProps) {
  const { slug } = await params;
  const agency = mockAgencies.find((a) => a.slug === slug);

  if (!agency) {
    const fallback = mockAgencies[0];
    if (!fallback) notFound();
  }

  const currentAgency = agency || mockAgencies[0];

  // Properties from this agency
  const agencyProperties = mockProperties.filter(
    (p) => p.agency?.id === currentAgency.id
  );

  // Brokers associated with this agency
  const agencyBrokers = mockBrokers.filter(
    (b) => b.agencyId === currentAgency.id
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Header />

      <main className="flex-1 pb-20">
        {/* Banner */}
        <div className="relative h-64 sm:h-80 bg-navy-950 overflow-hidden">
          <img
            src={currentAgency.banner}
            alt={currentAgency.name}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        </div>

        {/* Agency Header Card */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-subtle border border-stone-200/90 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <img
                src={currentAgency.logo}
                alt={currentAgency.name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl object-cover border-4 border-white shadow-md bg-white"
              />

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-serif font-bold text-2xl sm:text-3xl text-navy-950">
                    {currentAgency.name}
                  </h1>
                  {currentAgency.verified && (
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-200 uppercase tracking-wider">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      Verificada
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                  <span>{currentAgency.address}</span>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-2.5 text-xs text-stone-600 font-medium">
                  <span>{currentAgency.listingsCount} Imóveis no Portfólio</span>
                  <span className="text-stone-300">•</span>
                  <span>{currentAgency.teamCount} Corretores na Equipe</span>
                </div>
              </div>
            </div>

            {/* Direct Contact */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <a
                href={`https://wa.me/${currentAgency.whatsapp}?text=Olá,%20gostaria%20de%20conversar%20com%20a%20equipe%20da%20${encodeURIComponent(currentAgency.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-initial bg-[#1D7F54] hover:bg-[#166543] text-white text-[11px] uppercase tracking-wider font-semibold px-5 py-3 rounded-sm flex items-center justify-center gap-2 shadow-sm transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${currentAgency.phone.replace(/[^0-9+]/g, "")}`}
                className="flex-1 md:flex-initial bg-navy-950 hover:bg-navy-900 text-white text-[11px] uppercase tracking-wider font-semibold px-5 py-3 rounded-sm flex items-center justify-center gap-2 shadow-sm transition"
              >
                <Phone className="w-4 h-4 text-gold-400" />
                <span>Ligar</span>
              </a>
            </div>
          </div>
        </div>

        {/* Agency Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              {/* About */}
              <div className="bg-white rounded-xl p-8 border border-stone-200/90 shadow-subtle space-y-4">
                <h2 className="font-serif font-bold text-xl text-navy-950">
                  Sobre a Imobiliária
                </h2>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {currentAgency.description}
                </p>

                <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold uppercase tracking-[0.16em] text-stone-500 text-[10px] mr-2">Regiões Atendidas:</span>
                  {currentAgency.regions.map((reg, i) => (
                    <span
                      key={i}
                      className="bg-stone-100 text-stone-800 px-3 py-1 rounded-sm text-xs font-medium border border-stone-200/80"
                    >
                      {reg}
                    </span>
                  ))}
                </div>
              </div>

              {/* Team Members */}
              {agencyBrokers.length > 0 && (
                <div>
                  <h2 className="font-serif font-bold text-2xl text-navy-950 mb-6">
                    Equipe de Corretores Associados
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {agencyBrokers.map((broker) => (
                      <BrokerCard key={broker.id} broker={broker} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar info */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200/90 shadow-subtle space-y-4 text-xs">
                <h3 className="font-serif font-bold text-lg text-navy-950">
                  Dados de Contato
                </h3>
                <div className="space-y-3 text-stone-600">
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-stone-400" />
                    <span>{currentAgency.phone}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-stone-400" />
                    <a
                      href={currentAgency.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-navy-950 hover:underline font-semibold truncate"
                    >
                      {currentAgency.website}
                    </a>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
                    <span>{currentAgency.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Properties Published by Agency */}
          <div className="mt-16 pt-12 border-t border-stone-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-600">
                  Carteira da Empresa
                </span>
                <h3 className="font-serif text-2xl font-bold text-navy-950 mt-1">
                  Imóveis de {currentAgency.name}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {agencyProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
