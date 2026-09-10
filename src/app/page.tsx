import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/search/SearchBar";
import PropertyCard from "@/components/property/PropertyCard";
import { mockProperties } from "@/data/mockData";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  // 6 propriedades icônicas para curadoria seleta
  const curatedProperties = mockProperties.slice(0, 6);

  const lifestyles = [
    {
      title: "Casas de Campo & Fazendas",
      subtitle: "Privacidade absoluta e conexão com a natureza em condomínios fechados.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      href: "/imoveis?tipo=casa",
    },
    {
      title: "Penthouses & Coberturas",
      subtitle: "Vistas panorâmicas definitivas sobre os skylines mais valorizados.",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      href: "/imoveis?tipo=cobertura",
    },
    {
      title: "Residências Frente Mar",
      subtitle: "Arquitetura litorânea de autor integrada às mais belas orlas e enseadas.",
      image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80",
      href: "/imoveis?frenteMar=true",
    },
    {
      title: "Vilas & Mansões Urbanas",
      subtitle: "Linhas puras, concreto aparente e fluidez espacial nos bairros tradicionais.",
      image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      href: "/imoveis",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Header />

      <main className="flex-1">
        {/* ======================================================== */}
        {/* BLOCO 1: HERO SERENO E CINEMATOGRÁFICO                   */}
        {/* ======================================================== */}
        <section className="relative min-h-[720px] lg:min-h-[820px] flex items-center justify-center overflow-hidden bg-[#070C14]">
          {/* Fundo fotográfico de alto impacto */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=2400&q=90"
              alt="Residência contemporânea com arquitetura autoral"
              className="w-full h-full object-cover object-center opacity-35 scale-102 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070C14] via-[#070C14]/40 to-[#070C14]/60" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center flex flex-col items-center">
            {/* Headline Editorial Pura (Sem sombrancelha) */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-white font-normal tracking-tight leading-[1.08] max-w-4xl">
              Arquitetura Autoral & Residências Singulares
            </h1>

            {/* Subheadline serena */}
            <p className="mt-6 text-base sm:text-lg lg:text-xl text-stone-300 max-w-2xl font-light leading-relaxed">
              Curadoria rigorosa de residências contemporâneas, coberturas icônicas e refúgios em condomínios fechados para quem busca ativos patrimoniais irreplicáveis.
            </p>

            {/* Barra de busca limpa */}
            <div className="w-full mt-10 sm:mt-12">
              <SearchBar variant="hero" />
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* BLOCO 2: CURADORIA SELETA (4 a 6 propriedades icônicas)   */}
        {/* ======================================================== */}
        <section className="py-24 sm:py-32 bg-[#FAF9F6] border-b border-stone-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-stone-950">
                  Curadoria Seleta
                </h2>
                <p className="text-stone-600 text-sm mt-2 max-w-xl font-light leading-relaxed">
                  Uma coleção criteriosa de propriedades singulares que redefinem o morar contemporâneo em localizações exclusivas.
                </p>
              </div>

              <Link
                href="/imoveis"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-stone-900 hover:text-stone-600 transition-colors"
              >
                <span>Ver Coleção Completa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Grid Elegante de 6 Propriedades */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {curatedProperties.map((property, idx) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  priority={idx === 0}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* BLOCO 3: ESTILOS DE VIDA / CATEGORIAS                    */}
        {/* ======================================================== */}
        <section className="py-24 sm:py-32 bg-white border-b border-stone-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-16">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-stone-950">
                Estilos de Vida
              </h2>
              <p className="text-stone-600 text-sm mt-2 font-light leading-relaxed">
                Espaços pensados para acolher diferentes momentos da vida, do sossego do campo à vitalidade dos grandes centros.
              </p>
            </div>

            {/* Grid Editorial de Estilos de Vida */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {lifestyles.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group block overflow-hidden border border-stone-200/70 hover:border-stone-400 transition-colors duration-400"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="font-serif text-2xl font-normal leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-stone-200 font-light mt-1.5 line-clamp-1">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* BLOCO 4: DESTAQUE DE CONDOMÍNIO (Editorial Revista)      */}
        {/* ======================================================== */}
        <section className="py-24 sm:py-32 bg-[#FAF9F6] border-b border-stone-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Imagem Editorial */}
              <div className="lg:col-span-7">
                <div className="relative aspect-[16/11] overflow-hidden bg-stone-100 border border-stone-200/80 shadow-luxury">
                  <img
                    src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85"
                    alt="Fazenda Boa Vista, arquitetura de campo contemporânea"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Texto Revista / Kinfolk */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-stone-950 leading-tight">
                    Fazenda Boa Vista: A Síntese do Campo Contemporâneo
                  </h2>
                </div>

                <p className="text-stone-600 text-sm font-light leading-relaxed">
                  A apenas uma hora de São Paulo, mais de 12 milhões de metros quadrados de mata nativa preservada acolhem residências assinadas pelos maiores expoentes da arquitetura brasileira.
                </p>

                <p className="text-stone-600 text-sm font-light leading-relaxed">
                  Entre lagos privativos, centro hípico de padrão internacional e dois campos de golfe desenhados por Arnold Palmer, a privacidade, o bem-estar e a segurança encontram sua mais alta expressão.
                </p>

                {/* Métricas Editoriais com Hairline Dividers */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-200">
                  <div>
                    <span className="font-serif text-xl sm:text-2xl text-stone-950 block">
                      12M m²
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 mt-0.5 block">
                      Mata e Lagos
                    </span>
                  </div>
                  <div>
                    <span className="font-serif text-xl sm:text-2xl text-stone-950 block">
                      Fasano
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 mt-0.5 block">
                      Hospitalidade
                    </span>
                  </div>
                  <div>
                    <span className="font-serif text-xl sm:text-2xl text-stone-950 block">
                      18 min
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 mt-0.5 block">
                      Heliponto de SP
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/condominio/fazenda-boa-vista"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-stone-950 hover:text-stone-600 transition-colors"
                  >
                    <span>Explorar Condomínio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* BLOCO 5: MANIFESTO PRIVATE WEALTH / ADVISORY DISCRETO    */}
        {/* ======================================================== */}
        <section className="py-24 sm:py-32 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-stone-950 max-w-3xl mx-auto leading-tight">
              Discrição Absoluta & Diligência Patrimonial
            </h2>
            <p className="mt-6 text-sm sm:text-base text-stone-600 font-light max-w-2xl mx-auto leading-relaxed">
              A negociação de ativos imobiliários singulares exige rigor ético, profundidade técnica e sigilo irrestrito. A Habitat conecta famílias e investidores a uma rede seleta de consultorias especializadas, viabilizando transações off-market com diligência jurídica integral.
            </p>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
              <div className="p-8 border border-stone-200/80 bg-[#FAF9F6]">
                <h3 className="font-serif text-xl font-normal text-stone-950 mb-2">
                  Curadoria Off-Market
                </h3>
                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  Acesso reservado a propriedades que não ingressam em listagens públicas, preservando a intimidade das partes e garantindo negociações diretas entre pares qualificados.
                </p>
              </div>

              <div className="p-8 border border-stone-200/80 bg-[#FAF9F6]">
                <h3 className="font-serif text-xl font-normal text-stone-950 mb-2">
                  Tecnologia para Boutiques
                </h3>
                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  Infraestrutura de software e CRM desenhada para consultorias imobiliárias independentes que priorizam excelência de portfólio e atendimento concierge.
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
              <Link
                href="/contato"
                className="px-6 py-3.5 bg-stone-950 text-white hover:bg-stone-800 text-xs font-medium uppercase tracking-[0.2em] transition-colors"
              >
                Solicitar Atendimento Privado
              </Link>
              <Link
                href="/anunciar"
                className="px-6 py-3.5 border border-stone-300 hover:border-stone-900 text-stone-800 text-xs font-medium uppercase tracking-[0.2em] transition-colors"
              >
                Conhecer a Plataforma
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
