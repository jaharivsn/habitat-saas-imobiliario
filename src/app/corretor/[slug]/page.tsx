import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PropertyCard from "@/components/property/PropertyCard";
import { mockBrokers, mockProperties } from "@/data/mockData";
import {
  ShieldCheck,
  Star,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Globe,
  Share2,
} from "lucide-react";

interface BrokerPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BrokerDetailPage({ params }: BrokerPageProps) {
  const { slug } = await params;
  const broker = mockBrokers.find((b) => b.slug === slug);

  if (!broker) {
    const fallback = mockBrokers[0];
    if (!fallback) notFound();
  }

  const currentBroker = broker || mockBrokers[0];

  // Active properties for this broker
  const activeProperties = mockProperties.filter(
    (p) => p.broker.id === currentBroker.id && p.status === "published"
  );

  // Sold/transacted properties for this broker (Requirement 8)
  const soldProperties = mockProperties.filter(
    (p) => p.broker.id === currentBroker.id && p.status === "sold"
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Header />

      <main className="flex-1 pb-20">
        {/* Profile Banner */}
        <div className="relative h-64 sm:h-80 bg-navy-950 overflow-hidden">
          {currentBroker.banner ? (
            <img
              src={currentBroker.banner}
              alt={currentBroker.name}
              className="w-full h-full object-cover opacity-50"
            />
          ) : (
            <div className="w-full h-full bg-navy-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        </div>

        {/* Profile Header Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-subtle border border-stone-200/90 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative">
                <img
                  src={currentBroker.photo}
                  alt={currentBroker.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl object-cover border-4 border-white shadow-md"
                />
                <span
                  className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white"
                  title="Disponível para atendimento"
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-serif font-bold text-2xl sm:text-3xl text-navy-950">
                    {currentBroker.name}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-sm border border-stone-200/80 uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5 text-stone-600" />
                    CRECI {currentBroker.creci}
                  </span>
                </div>

                {currentBroker.agencyName && (
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold-700 mt-1.5">
                    {currentBroker.agencyName}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 mt-2.5 text-xs text-stone-500">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-stone-900">
                      {currentBroker.rating.toFixed(1)}
                    </span>
                    <span>({currentBroker.reviewsCount} avaliações)</span>
                  </div>
                  <span className="text-stone-300">•</span>
                  <span>{currentBroker.activeListingsCount} Imóveis ativos</span>
                  <span className="text-stone-300">•</span>
                  <span>{currentBroker.soldCount} Negociados</span>
                </div>
              </div>
            </div>

            {/* Direct Contact CTAs */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <a
                href={`https://wa.me/${currentBroker.whatsapp}?text=Olá%20${encodeURIComponent(currentBroker.name)},%20vi%20seu%20perfil%20no%20Habitat%20e%20gostaria%20de%20conversar.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-initial bg-[#1D7F54] hover:bg-[#166543] text-white text-[11px] uppercase tracking-wider font-semibold px-5 py-3 rounded-sm flex items-center justify-center gap-2 shadow-sm transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${currentBroker.phone.replace(/[^0-9+]/g, "")}`}
                className="flex-1 md:flex-initial bg-navy-950 hover:bg-navy-900 text-white text-[11px] uppercase tracking-wider font-semibold px-5 py-3 rounded-sm flex items-center justify-center gap-2 shadow-sm transition"
              >
                <Phone className="w-4 h-4 text-gold-400" />
                <span>Ligar</span>
              </a>
            </div>
          </div>
        </div>

        {/* Profile Content Details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Bio, Areas, Languages */}
            <div className="lg:col-span-8 space-y-8">
              {/* Bio */}
              <div className="bg-white rounded-xl p-8 border border-stone-200/90 shadow-subtle space-y-4">
                <h2 className="font-serif font-bold text-xl text-navy-950">
                  Biografia Profissional
                </h2>
                <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-line">
                  {currentBroker.bio}
                </p>

                <div className="pt-6 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-bold uppercase tracking-[0.16em] text-stone-400 text-[10px] block mb-2">
                      Especialidades
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentBroker.specialties.map((spec, i) => (
                        <span
                          key={i}
                          className="bg-stone-100 text-stone-800 px-2.5 py-1 rounded-sm font-medium text-xs border border-stone-200/60"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold uppercase tracking-[0.16em] text-stone-400 text-[10px] block mb-2">
                      Idiomas Falados
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentBroker.languages.map((lang, i) => (
                        <span
                          key={i}
                          className="bg-stone-100 text-stone-800 px-2.5 py-1 rounded-sm font-medium text-xs border border-stone-200/60"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Depoimentos de Clientes (Requirement 8) */}
              {currentBroker.testimonials && currentBroker.testimonials.length > 0 && (
                <div className="bg-white rounded-xl p-8 border border-stone-200/90 shadow-subtle space-y-6">
                  <h2 className="font-serif font-bold text-xl text-navy-950">
                    Depoimentos de Clientes
                  </h2>
                  <div className="space-y-4">
                    {currentBroker.testimonials.map((t) => (
                      <div
                        key={t.id}
                        className="p-5 bg-stone-50/80 rounded-lg border border-stone-200/60 space-y-2"
                      >
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(t.rating)].map((_, idx) => (
                            <Star key={idx} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                        <p className="text-xs text-stone-700 italic leading-relaxed">
                          "{t.text}"
                        </p>
                        <p className="text-xs font-bold text-navy-950">
                          {t.author}{" "}
                          <span className="font-normal text-stone-400">
                            • {t.role}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar: Contact & Regions */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200/90 shadow-subtle space-y-4">
                <h3 className="font-serif font-bold text-lg text-navy-950">
                  Regiões de Atuação
                </h3>
                <div className="space-y-2 text-xs text-stone-700">
                  {currentBroker.regions.map((reg, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-md border border-stone-100">
                      <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                      <span className="font-medium">{reg}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-stone-100 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-stone-600">
                    <Mail className="w-4 h-4 text-stone-400" />
                    <span className="truncate">{currentBroker.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-600">
                    <Phone className="w-4 h-4 text-stone-400" />
                    <span>{currentBroker.phone}</span>
                  </div>
                </div>

                {/* Social Links */}
                {currentBroker.socialLinks && (
                  <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
                    {currentBroker.socialLinks.instagram && (
                      <a
                        href={currentBroker.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-stone-100 rounded-md text-stone-600 hover:text-navy-900 transition"
                        title="Instagram"
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                    {currentBroker.socialLinks.linkedin && (
                      <a
                        href={currentBroker.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-stone-100 rounded-md text-stone-600 hover:text-navy-900 transition"
                        title="LinkedIn"
                      >
                        <Share2 className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Active Listings Grid */}
          <div className="mt-16 pt-12 border-t border-stone-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-600">
                  Portfólio Ativo
                </span>
                <h3 className="font-serif text-2xl font-bold text-navy-950 mt-1">
                  Imóveis Publicados por {currentBroker.name} ({activeProperties.length})
                </h3>
              </div>
            </div>

            {activeProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {activeProperties.map((prop) => (
                  <PropertyCard key={prop.id} property={prop} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center bg-white rounded-xl border border-stone-200/90 text-stone-500 text-sm shadow-subtle">
                Nenhum imóvel listado publicamente no momento. Entre em contato para opções off-market.
              </div>
            )}
          </div>

          {/* Sold Properties Section (Requirement 8) */}
          <div className="mt-16 pt-12 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                  Histórico de Sucesso
                </span>
                <h3 className="font-serif text-2xl font-bold text-navy-950 mt-1">
                  Imóveis Negociados & Vendidos ({currentBroker.soldCount})
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Histórico comprovado de transações imobiliárias de alto padrão assessoradas com êxito.
                </p>
              </div>
            </div>

            {soldProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {soldProperties.map((prop) => (
                  <PropertyCard key={prop.id} property={prop} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Cobertura Duplex Campo Belo",
                    specs: "4 suítes • 540m² • 5 vagas",
                    closedIn: "Negociado em Dezembro/2023",
                    badge: "Vendido",
                  },
                  {
                    title: "Residência Contemporânea Fazenda da Grama",
                    specs: "5 suítes • 820m² • 6 vagas",
                    closedIn: "Negociado em Outubro/2023",
                    badge: "Vendido",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-5 bg-white rounded-xl border border-stone-200/90 shadow-subtle flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif font-bold text-navy-950 text-sm">
                          {item.title}
                        </h4>
                        <span className="bg-stone-100 text-stone-800 border border-stone-200/90 text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-[0.16em]">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1">{item.specs}</p>
                      <span className="text-[10px] text-stone-400 mt-0.5 block font-mono">{item.closedIn}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
