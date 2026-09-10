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

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-stone-500 font-mono">
                    {currentProp.operation === "aluguel" ? "Locação Residencial" : "Venda Patrimonial"}
                  </span>
                  <span className="text-stone-300">•</span>
                  <span className="text-[11px] text-stone-400 font-mono tracking-wider">
                    REF {currentProp.code}
                  </span>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-stone-950 max-w-4xl leading-[1.08] tracking-normal">
                  {currentProp.title}
                </h1>

                <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-500 font-light">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>
                    {currentProp.address} — {currentProp.neighborhood}, {currentProp.city} - {currentProp.state}
                  </span>
                </div>
              </div>

              {/* Price Display */}
              <div className="lg:text-right shrink-0">
                <span className="text-[10px] uppercase text-stone-400 tracking-[0.2em] font-medium block mb-1">
                  Valor {currentProp.operation === "aluguel" ? "Mensal" : "de Aquisição"}
                </span>
                <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-stone-950 tracking-tight tabular-nums">
                  {formatPrice(currentProp.price, currentProp.operation)}
                </div>

                <div className="flex flex-wrap lg:justify-end gap-3 mt-2 text-xs text-stone-400 font-light tabular-nums">
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
            <div className="lg:col-span-8 space-y-16">
              {/* Architectural Specs Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 py-8 border-y border-stone-200 text-center">
                <div>
                  <span className="font-display text-3xl sm:text-4xl text-stone-950 font-normal block tabular-nums">
                    {currentProp.bedrooms}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mt-1 block font-medium">
                    Quartos ({currentProp.suites} suítes)
                  </span>
                </div>

                <div className="border-l border-stone-200">
                  <span className="font-display text-3xl sm:text-4xl text-stone-950 font-normal block tabular-nums">
                    {currentProp.bathrooms}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mt-1 block font-medium">
                    Banheiros
                  </span>
                </div>

                <div className="border-l border-stone-200">
                  <span className="font-display text-3xl sm:text-4xl text-stone-950 font-normal block tabular-nums">
                    {currentProp.parkingSpots}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mt-1 block font-medium">
                    Vagas
                  </span>
                </div>

                <div className="border-l border-stone-200">
                  <span className="font-display text-3xl sm:text-4xl text-stone-950 font-normal block tabular-nums">
                    {currentProp.builtArea}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mt-1 block font-medium">
                    m² Úteis {currentProp.landArea ? `• ${currentProp.landArea}m² tot.` : ""}
                  </span>
                </div>

                <div className="border-l border-stone-200 col-span-2 sm:col-span-1">
                  <span className="font-display text-3xl sm:text-4xl text-stone-950 font-normal block tabular-nums">
                    {currentProp.yearBuilt || "2023"}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mt-1 block font-medium">
                    Construção
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-6">
                <h2 className="font-display text-3xl sm:text-4xl font-normal text-stone-950 tracking-normal">
                  Sobre a Residência
                </h2>
                <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed whitespace-pre-line">
                  {currentProp.description}
                </p>

                {/* Highlights */}
                {currentProp.highlights && currentProp.highlights.length > 0 && (
                  <div className="pt-8 border-t border-stone-200/80">
                    <h3 className="font-serif text-lg font-normal text-stone-950 mb-4">
                      Diferenciais Arquitetônicos
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700 font-light">
                      {currentProp.highlights.map((hl, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-stone-900 shrink-0 mt-1.5" />
                          <span className="leading-relaxed">{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Features & Amenities */}
              <div className="space-y-8 pt-8 border-t border-stone-200/80">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal text-stone-950 tracking-tight mb-4">
                    Comodidades & Lazer
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {currentProp.amenities.map((amenity, i) => (
                      <div
                        key={i}
                        className="py-2.5 px-3 border border-stone-200/80 text-xs font-light text-stone-800 flex items-center gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-stone-400" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <h3 className="font-serif text-lg font-normal text-stone-950 mb-4">
                    Especificações Técnicas
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700 font-light">
                    {currentProp.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2.5 py-2 border-b border-stone-100">
                        <span className="w-1 h-1 rounded-full bg-stone-900 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Condominium details if applicable */}
              {currentProp.communityName && (
                <div className="p-8 border border-stone-200 bg-white space-y-4">
                  <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-stone-400 block">
                    Condomínio Fechado
                  </span>
                  <h3 className="font-serif text-2xl text-stone-950 font-normal tracking-tight">
                    {currentProp.communityName}
                  </h3>
                  <p className="text-sm text-stone-600 font-light leading-relaxed">
                    Infraestrutura de segurança perimetral, monitoramento contínuo, áreas verdes preservadas, clube privativo e máxima discrição para os residentes.
                  </p>
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs text-stone-500 font-light">
                      Taxa Condominial: R$ {currentProp.condoFee?.toLocaleString("pt-BR")}/mês
                    </span>
                    <Link
                      href="/condominios"
                      className="text-xs font-medium text-stone-950 hover:text-stone-600 transition-colors inline-flex items-center gap-1.5 uppercase tracking-[0.16em]"
                    >
                      <span>Guia do Condomínio</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Informações do Bairro */}
              <div className="space-y-4 pt-8 border-t border-stone-200/80">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal text-stone-950 tracking-tight">
                    Bairro: {currentProp.neighborhood}
                  </h2>
                  <Link
                    href={`/bairro/${currentProp.neighborhood.toLowerCase().replace(/ /g, '-')}`}
                    className="text-xs font-medium text-stone-950 hover:text-stone-600 transition-colors inline-flex items-center gap-1.5 uppercase tracking-[0.16em]"
                  >
                    <span>Explorar Bairro</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <p className="text-sm text-stone-600 font-light leading-relaxed">
                  {neighborhoodData?.description ||
                    `O bairro ${currentProp.neighborhood} em ${currentProp.city} é reconhecido pelo perfil residencial nobre, arborização densa e conveniência com renomadas instituições de ensino e gastronomia.`}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-stone-100 text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-medium block">Valor Médio do m²</span>
                    <span className="font-serif text-xl text-stone-950 mt-1 block">
                      R$ {neighborhoodData?.avgPriceM2.toLocaleString("pt-BR") || "32.000"}/m²
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-medium block">Perfil Urbanístico</span>
                    <span className="font-serif text-xl text-stone-950 mt-1 block">
                      Residencial Nobre
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-medium block">Segurança</span>
                    <span className="font-serif text-xl text-stone-950 mt-1 block">
                      Patrulha Privada
                    </span>
                  </div>
                </div>
              </div>

              {/* Location & Map */}
              <div className="space-y-4 pt-8 border-t border-stone-200/80">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal text-stone-950 tracking-tight">
                    Localização Aproximada
                  </h2>
                  <p className="text-xs text-stone-500 font-light mt-1">
                    {currentProp.address}, {currentProp.neighborhood}, {currentProp.city} - {currentProp.state}
                  </p>
                </div>

                <div className="h-80 overflow-hidden border border-stone-200/80">
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
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-16 border-t border-stone-200">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-stone-950 tracking-tight">
                Imóveis Semelhantes
              </h2>

              <Link
                href="/imoveis"
                className="text-xs font-medium text-stone-950 hover:text-stone-600 transition-colors inline-flex items-center gap-1.5 uppercase tracking-[0.16em]"
              >
                <span>Ver Coleção Completa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
              {similarProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </section>
        )}

        {/* BROKER'S OTHER PROPERTIES SECTION */}
        {brokerProperties.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-16 border-t border-stone-200">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-stone-950 tracking-tight">
                Do Mesmo Consultor: {currentProp.broker.name}
              </h2>

              <Link
                href={`/corretor/${currentProp.broker.slug}`}
                className="text-xs font-medium text-stone-950 hover:text-stone-600 transition-colors inline-flex items-center gap-1.5 uppercase tracking-[0.16em]"
              >
                <span>Vitrine do Consultor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
              {brokerProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </section>
        )}

        {/* NEARBY PROPERTIES IN SAME REGION */}
        {nearbyProperties.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-16 border-t border-stone-200">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-stone-950 tracking-tight">
                Na Mesma Região: {currentProp.city}
              </h2>

              <Link
                href={`/cidade/${currentProp.city.toLowerCase().replace(/ /g, '-')}`}
                className="text-xs font-medium text-stone-950 hover:text-stone-600 transition-colors inline-flex items-center gap-1.5 uppercase tracking-[0.16em]"
              >
                <span>Explorar Região</span>
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
