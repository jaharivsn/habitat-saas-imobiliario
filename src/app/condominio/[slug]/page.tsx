import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PropertyCard from "@/components/property/PropertyCard";
import { mockCommunities, mockProperties } from "@/data/mockData";
import {
  MapPin,
  CheckCircle2,
  GraduationCap,
  ShoppingBag,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface CommunityPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CommunityDetailPage({ params }: CommunityPageProps) {
  const { slug } = await params;
  const community = mockCommunities.find((c) => c.slug === slug);

  if (!community) {
    const fallback = mockCommunities[0];
    if (!fallback) notFound();
  }

  const currentComm = community || mockCommunities[0];

  // Available properties in this community
  const availableProperties = mockProperties.filter(
    (p) =>
      p.communityName?.toLowerCase() === currentComm.name.toLowerCase() ||
      p.neighborhood.toLowerCase() === currentComm.neighborhood.toLowerCase()
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Header />

      <main className="flex-1 pb-20">
        {/* Hero with full imagery */}
        <div className="relative h-[450px] bg-navy-950 overflow-hidden">
          <img
            src={currentComm.photo}
            alt={currentComm.name}
            className="w-full h-full object-cover opacity-50 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

          <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-gold-500/10 border border-gold-400/30 text-gold-300 text-[10px] font-semibold uppercase tracking-[0.18em] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Condomínio Fechado de Prestígio</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              {currentComm.name}
            </h1>
            <div className="flex items-center gap-2 text-sm text-stone-300 mt-2">
              <MapPin className="w-4 h-4 text-gold-400" />
              <span>
                {currentComm.neighborhood}, {currentComm.city}
              </span>
              <span className="text-stone-500">•</span>
              <span className="text-gold-300 font-semibold">
                Valores de {currentComm.priceRange}
              </span>
            </div>
          </div>
        </div>

        {/* Content sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-10">
              {/* Description */}
              <div className="bg-white rounded-xl p-8 border border-stone-200/90 shadow-subtle space-y-4">
                <h2 className="font-serif font-bold text-2xl text-navy-950">
                  Sobre o Empreendimento
                </h2>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {currentComm.description}
                </p>

                <div className="pt-4 border-t border-stone-100">
                  <h3 className="font-serif font-bold text-base text-navy-950 mb-2">
                    Perfil da Comunidade
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {currentComm.profile}
                  </p>
                </div>
              </div>

              {/* Amenities */}
              <div className="bg-white rounded-xl p-8 border border-stone-200/90 shadow-subtle space-y-4">
                <h2 className="font-serif font-bold text-2xl text-navy-950">
                  Infraestrutura & Amenidades
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
                  {currentComm.amenities.map((amenity, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-3 bg-stone-50/80 rounded-md border border-stone-200/60 font-medium text-stone-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lifestyle & Surroundings */}
              <div className="bg-white rounded-xl p-8 border border-stone-200/90 shadow-subtle space-y-6">
                <div>
                  <h2 className="font-serif font-bold text-2xl text-navy-950 mb-2">
                    Estilo de Vida & Conveniência
                  </h2>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {currentComm.lifestyle}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-stone-100">
                  <div className="space-y-2">
                    <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-navy-950">
                      <GraduationCap className="w-4 h-4 text-gold-600" />
                      Escolas & Educação
                    </h4>
                    <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside">
                      {currentComm.nearbySchools.map((school, i) => (
                        <li key={i}>{school}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-navy-950">
                      <ShoppingBag className="w-4 h-4 text-gold-600" />
                      Comércio & Gastronomia
                    </h4>
                    <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside">
                      {currentComm.nearbyShopping.map((shop, i) => (
                        <li key={i}>{shop}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-navy-950 text-white p-6 sm:p-8 rounded-xl border border-navy-800/80 shadow-luxury">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-400">
                  Disponibilidade
                </span>
                <div className="font-serif text-3xl font-bold mt-1">
                  {currentComm.availableCount} Imóveis
                </div>
                <p className="text-xs text-stone-300 mt-1">
                  Casas e lotes ativos neste condomínio
                </p>

                <div className="mt-6 pt-4 border-t border-navy-800 space-y-3">
                  <Link
                    href={`/imoveis?q=${encodeURIComponent(currentComm.name)}`}
                    className="w-full bg-gold-500 hover:bg-gold-600 text-navy-950 font-semibold text-[11px] uppercase tracking-wider py-3 px-4 rounded-sm flex items-center justify-center gap-1.5 transition"
                  >
                    <span>Ver Imóveis no Condomínio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/corretores"
                    className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold text-[11px] uppercase tracking-wider py-3 px-4 rounded-sm border border-white/10 flex items-center justify-center gap-1.5 transition"
                  >
                    <span>Falar com Corretor Especialista</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Properties Available in this Community */}
          {availableProperties.length > 0 && (
            <div className="mt-16 pt-12 border-t border-stone-200">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-600">
                    Oportunidades no Local
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-navy-950 mt-1">
                    Imóveis Disponíveis em {currentComm.name}
                  </h3>
                </div>

                <Link
                  href={`/imoveis?q=${encodeURIComponent(currentComm.name)}`}
                  className="text-xs font-bold text-navy-950 hover:text-gold-600 transition flex items-center gap-1 uppercase tracking-wider"
                >
                  <span>Ver todas ({availableProperties.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {availableProperties.map((prop) => (
                  <PropertyCard key={prop.id} property={prop} />
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
