import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PropertyCard from "@/components/property/PropertyCard";
import PropertyContactCard from "@/components/property/PropertyContactCard";
import PropertyHeaderActions from "@/components/property/PropertyHeaderActions";
import InteractiveMapMock from "@/components/search/InteractiveMapMock";
import { Gallery } from "@/components/ui";
import { mockProperties, mockNeighborhoods } from "@/data/mockData";
import { formatPrice } from "@/lib/utils";
import {
  Bed,
  Bath,
  Car,
  Maximize,
  MapPin,
  Calendar,
  CheckCircle2,
  Video,
  Eye,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = mockProperties.find((p) => p.slug === slug);

  if (!property) {
    const fallback = mockProperties[0];
    if (!fallback) notFound();
  }

  const currentProp = property || mockProperties[0];

  // Similar properties (same type)
  const similarProperties = mockProperties
    .filter((p) => p.id !== currentProp.id && p.propertyType === currentProp.propertyType)
    .slice(0, 3);

  // Broker's other properties
  const brokerProperties = mockProperties
    .filter((p) => p.id !== currentProp.id && p.broker.id === currentProp.broker.id)
    .slice(0, 3);

  // Nearby properties in the same city
  const nearbyProperties = mockProperties
    .filter((p) => p.id !== currentProp.id && p.city === currentProp.city)
    .slice(0, 3);

  // Neighborhood info
  const neighborhoodData = mockNeighborhoods.find(
    (n) => n.name.toLowerCase() === currentProp.neighborhood.toLowerCase()
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Header />

      <main className="flex-1 pb-20">
        {/* Top Header Bar: Title, Location & Price */}
        <div className="bg-white border-b border-stone-200/90 pt-6 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumbs & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-400">
                <Link href="/" className="hover:text-stone-800 transition-colors">Início</Link>
                <span>/</span>
                <Link href={`/${currentProp.operation === 'aluguel' ? 'alugar' : 'comprar'}`} className="hover:text-stone-800 capitalize transition-colors">
                  {currentProp.operation === 'aluguel' ? 'Aluguel' : 'Comprar'}
                </Link>
                <span>/</span>
                <Link href={`/cidade/${currentProp.city.toLowerCase().replace(/ /g, '-')}`} className="hover:text-stone-800 transition-colors">
                  {currentProp.city}
                </Link>
                <span>/</span>
                <span className="text-stone-800 font-semibold truncate max-w-xs">
                  {currentProp.title}
                </span>
              </div>

              {/* Favoritar & Compartilhar Buttons */}
              <PropertyHeaderActions
                propertyId={currentProp.id}
                propertyTitle={currentProp.title}
              />
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 bg-navy-950 text-white rounded-sm text-[10px] font-bold uppercase tracking-[0.16em]">
                    {currentProp.operation === "aluguel" ? "Locação" : "Venda"}
                  </span>
                  {currentProp.isFeatured && (
                    <span className="px-2.5 py-1 bg-gold-500 text-navy-950 rounded-sm text-[10px] font-bold uppercase tracking-[0.16em] flex items-center gap-1 shadow-sm">
                      <Sparkles className="w-3 h-3" />
                      Destaque Exclusivo
                    </span>
                  )}
                  {currentProp.isLaunch && (
                    <span className="px-2.5 py-1 bg-stone-900 text-white rounded-sm text-[10px] font-bold uppercase tracking-[0.16em]">
                      Lançamento
                    </span>
                  )}
                  <span className="text-xs text-stone-400 font-mono tracking-wider ml-1">
                    Cód. {currentProp.code}
                  </span>
                </div>

                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-950 max-w-4xl leading-tight tracking-tight">
                  {currentProp.title}
                </h1>

                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-stone-500 mt-2.5">
                  <MapPin className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>
                    {currentProp.address} — {currentProp.neighborhood}, {currentProp.city} - {currentProp.state}
                  </span>
                </div>
              </div>

              {/* Price Display */}
              <div className="lg:text-right shrink-0">
                <span className="text-[10px] uppercase text-stone-400 tracking-[0.18em] font-semibold block">
                  Valor {currentProp.operation === "aluguel" ? "Mensal" : "de Venda"}
                </span>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-navy-950 tracking-tight">
                  {formatPrice(currentProp.price, currentProp.operation)}
                </div>

                <div className="flex flex-wrap lg:justify-end gap-3 mt-1.5 text-xs text-stone-500 font-medium">
                  {currentProp.condoFee && (
                    <span>Condomínio: R$ {currentProp.condoFee.toLocaleString("pt-BR")}/mês</span>
                  )}
                  {currentProp.iptu && (
                    <span>IPTU: R$ {currentProp.iptu.toLocaleString("pt-BR")}/mês</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PHOTO GALLERY */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Gallery photos={currentProp.photos} title={currentProp.title} />

          {/* Virtual Tour & Video Quick Access Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-4 px-2 text-xs">
            <div className="flex items-center gap-3">
              {currentProp.virtualTourUrl && (
                <a
                  href={currentProp.virtualTourUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-navy-950 border border-navy-900 text-white font-semibold text-xs tracking-wider uppercase shadow-subtle hover:bg-navy-900 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-gold-400" />
                  <span>Tour Virtual 360°</span>
                </a>
              )}

              {currentProp.videoUrl && (
                <a
                  href={currentProp.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-stone-200/90 text-stone-800 font-semibold text-xs tracking-wider uppercase shadow-subtle hover:bg-stone-50 transition-colors"
                >
                  <Video className="w-3.5 h-3.5 text-rose-600" />
                  <span>Vídeo Cinema 4K</span>
                </a>
              )}
            </div>

            <div className="text-stone-400 text-xs font-mono">
              {currentProp.viewsCount.toLocaleString("pt-BR")} visualizações registradas
            </div>
          </div>
        </div>

        {/* MAIN CONTENT & SIDEBAR */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Details, Specs, Description */}
            <div className="lg:col-span-8 space-y-10">
              {/* Quick Specs Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-6 bg-white rounded-xl border border-stone-200/90 shadow-subtle text-center">
                <div className="flex flex-col items-center">
                  <span className="flex items-center gap-1.5 text-navy-950 font-serif font-bold text-xl">
                    <Bed className="w-5 h-5 text-gold-600" />
                    {currentProp.bedrooms}
                  </span>
                  <span className="text-xs text-stone-500 mt-1">
                    Quartos ({currentProp.suites} suítes)
                  </span>
                </div>

                <div className="flex flex-col items-center border-l border-stone-200/60">
                  <span className="flex items-center gap-1.5 text-navy-950 font-serif font-bold text-xl">
                    <Bath className="w-5 h-5 text-gold-600" />
                    {currentProp.bathrooms}
                  </span>
                  <span className="text-xs text-stone-500 mt-1">Banheiros</span>
                </div>

                <div className="flex flex-col items-center border-l border-stone-200/60">
                  <span className="flex items-center gap-1.5 text-navy-950 font-serif font-bold text-xl">
                    <Car className="w-5 h-5 text-gold-600" />
                    {currentProp.parkingSpots}
                  </span>
                  <span className="text-xs text-stone-500 mt-1">Vagas de Garagem</span>
                </div>

                <div className="flex flex-col items-center border-l border-stone-200/60">
                  <span className="flex items-center gap-1.5 text-navy-950 font-serif font-bold text-xl">
                    <Maximize className="w-5 h-5 text-gold-600" />
                    {currentProp.builtArea}
                  </span>
                  <span className="text-xs text-stone-500 mt-1">
                    m² Úteis {currentProp.landArea ? `(${currentProp.landArea}m² Totais)` : ""}
                  </span>
                </div>

                <div className="flex flex-col items-center border-l border-stone-200/60 col-span-2 sm:col-span-1">
                  <span className="flex items-center gap-1.5 text-navy-950 font-serif font-bold text-xl">
                    <Calendar className="w-5 h-5 text-gold-600" />
                    {currentProp.yearBuilt || "2023"}
                  </span>
                  <span className="text-xs text-stone-500 mt-1">Ano de Construção</span>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-xl p-8 border border-stone-200/90 shadow-subtle space-y-4">
                <h3 className="font-serif font-bold text-2xl text-navy-950">
                  Sobre a Residência
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-line">
                  {currentProp.description}
                </p>

                {/* Highlights */}
                {currentProp.highlights && currentProp.highlights.length > 0 && (
                  <div className="pt-6 border-t border-stone-100">
                    <h4 className="font-serif font-bold text-base text-navy-950 mb-3">
                      Diferenciais Marcantes
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-700">
                      {currentProp.highlights.map((hl, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Features & Amenities */}
              <div className="bg-white rounded-xl p-8 border border-stone-200/90 shadow-subtle space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-xl text-navy-950 mb-3">
                    Comodidades & Lazer
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentProp.amenities.map((amenity, i) => (
                      <span
                        key={i}
                        className="px-3.5 py-1.5 bg-[#FAF9F6] border border-stone-200/90 rounded-md text-xs font-medium text-stone-800"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <h3 className="font-serif font-bold text-xl text-navy-950 mb-3">
                    Características Técnicas & Construtivas
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
                    {currentProp.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2.5 p-3 rounded-lg bg-[#FAF9F6] border border-stone-200/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-navy-950 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Condominium details if applicable */}
              {currentProp.communityName && (
                <div className="bg-navy-950 text-white rounded-xl p-8 border border-navy-800/90 shadow-luxury">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">
                    Condomínio Fechado
                  </span>
                  <h3 className="font-serif font-bold text-2xl mt-1 tracking-tight">
                    {currentProp.communityName}
                  </h3>
                  <p className="text-sm text-stone-300 mt-2 leading-relaxed">
                    Infraestrutura completa com portaria blindada, monitoramento perimetral, áreas verdes preservadas, clube de lazer e total privacidade para sua família.
                  </p>
                  <div className="mt-6 pt-4 border-t border-navy-800/80 flex items-center justify-between">
                    <span className="text-xs text-stone-400">Taxa Condominial: R$ {currentProp.condoFee?.toLocaleString("pt-BR")}/mês</span>
                    <Link
                      href="/condominios"
                      className="text-xs font-bold text-gold-400 hover:text-gold-300 transition-colors flex items-center gap-1 uppercase tracking-wider"
                    >
                      <span>Ver guia de condomínios</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Informações do Bairro (Requirement 5) */}
              <div className="bg-white rounded-xl p-8 border border-stone-200/90 shadow-subtle space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-2xl text-navy-950">
                    Informações do Bairro: {currentProp.neighborhood}
                  </h3>
                  <Link
                    href={`/bairro/${currentProp.neighborhood.toLowerCase().replace(/ /g, '-')}`}
                    className="text-xs font-bold text-navy-950 hover:text-gold-600 transition flex items-center gap-1 uppercase tracking-wider"
                  >
                    <span>Ver guia completo</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <p className="text-sm text-stone-600 leading-relaxed">
                  {neighborhoodData?.description ||
                    `O bairro ${currentProp.neighborhood} em ${currentProp.city} é conhecido pela segurança, arborização e proximidade com as melhores opções gastronômicas, escolas internacionais e centros empresariais.`}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-100 text-xs text-stone-700">
                  <div className="p-4 bg-[#FAF9F6] rounded-lg border border-stone-200/80">
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold block">Valor Médio do m²</span>
                    <span className="font-bold text-navy-950 text-sm mt-0.5 block font-serif">
                      R$ {neighborhoodData?.avgPriceM2.toLocaleString("pt-BR") || "32.000"}/m²
                    </span>
                  </div>
                  <div className="p-4 bg-[#FAF9F6] rounded-lg border border-stone-200/80">
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold block">Perfil da Região</span>
                    <span className="font-bold text-navy-950 text-xs mt-0.5 block">
                      Residencial Nobre
                    </span>
                  </div>
                  <div className="p-4 bg-[#FAF9F6] rounded-lg border border-stone-200/80">
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold block">Segurança & Patrulhamento</span>
                    <span className="font-bold text-emerald-800 text-xs mt-0.5 block">
                      Alto Padrão / Monitorado
                    </span>
                  </div>
                </div>
              </div>

              {/* Location & Interactive Map */}
              <div className="bg-white rounded-xl p-8 border border-stone-200/90 shadow-subtle space-y-4">
                <div>
                  <h3 className="font-serif font-bold text-2xl text-navy-950">
                    Localização & Proximidades
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    {currentProp.address}, {currentProp.neighborhood}, {currentProp.city} - {currentProp.state}
                  </p>
                </div>

                <div className="h-80 rounded-lg overflow-hidden border border-stone-200/80">
                  <InteractiveMapMock
                    properties={[currentProp]}
                    selectedProperty={currentProp}
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Contact Card */}
            <div className="lg:col-span-4">
              <PropertyContactCard
                broker={currentProp.broker}
                property={currentProp}
              />
            </div>
          </div>
        </div>

        {/* SIMILAR PROPERTIES SECTION */}
        {similarProperties.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-16 border-t border-stone-200/90">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-600">
                  Opções Relacionadas
                </span>
                <h3 className="font-serif text-2xl font-bold text-navy-950 mt-1">
                  Imóveis Semelhantes
                </h3>
              </div>

              <Link
                href="/imoveis"
                className="text-xs font-bold text-navy-950 hover:text-gold-600 transition flex items-center gap-1 uppercase tracking-wider"
              >
                <span>Ver mais na região</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </section>
        )}

        {/* BROKER'S OTHER PROPERTIES SECTION (Requirement 5) */}
        {brokerProperties.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-16 border-t border-stone-200/90">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-600">
                  Carteira do Especialista
                </span>
                <h3 className="font-serif text-2xl font-bold text-navy-950 mt-1">
                  Outros Imóveis de {currentProp.broker.name}
                </h3>
              </div>

              <Link
                href={`/corretor/${currentProp.broker.slug}`}
                className="text-xs font-bold text-navy-950 hover:text-gold-600 transition flex items-center gap-1 uppercase tracking-wider"
              >
                <span>Ver vitrine completa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {brokerProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </section>
        )}

        {/* NEARBY PROPERTIES IN SAME REGION (Requirement 5) */}
        {nearbyProperties.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-16 border-t border-stone-200/90">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-600">
                  Na Mesma Localidade
                </span>
                <h3 className="font-serif text-2xl font-bold text-navy-950 mt-1">
                  Imóveis Próximos em {currentProp.city}
                </h3>
              </div>

              <Link
                href={`/imoveis?q=${encodeURIComponent(currentProp.city)}`}
                className="text-xs font-bold text-navy-950 hover:text-gold-600 transition flex items-center gap-1 uppercase tracking-wider"
              >
                <span>Ver todos em {currentProp.city}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {nearbyProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </section>
        )}

        {/* SOLICITAR MAIS INFORMAÇÕES BANNER (Requirement 5) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="bg-navy-950 text-white rounded-xl p-8 sm:p-12 border border-navy-800/90 shadow-luxury flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">
                Atendimento Personalizado
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                Deseja mais informações sobre este imóvel?
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
                Agende uma conversa privada com o corretor responsável, tire dúvidas sobre documentação, financiamento e agende uma visita guiada.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${currentProp.broker.whatsapp}?text=Olá%20${encodeURIComponent(
                  currentProp.broker.name
                )},%20gostaria%20de%20solicitar%20mais%20informações%20do%20imóvel%20${encodeURIComponent(
                  currentProp.title
                )}%20(Cód.%20${currentProp.code}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1D7F54] hover:bg-[#186845] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-lg shadow-subtle transition-colors"
              >
                Solicitar via WhatsApp
              </a>

              <Link
                href="/contato"
                className="bg-white/10 hover:bg-white/15 text-white text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-lg border border-white/10 transition-colors"
              >
                Formulário Privado
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
