import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ZeroGravitySearch from "@/components/kinetic/ZeroGravitySearch";
import ParallaxCard from "@/components/kinetic/ParallaxCard";
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
            {/* Headline canônica do MVP em Sans-serif */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight max-w-4xl">
              Encontre seu próximo imóvel
            </h1>

            {/* Subheadline clean */}
            <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-200 max-w-2xl font-normal leading-relaxed">
              Curadoria de residências de alto padrão, coberturas e oportunidades exclusivas para morar ou investir nas melhores regiões.
            </p>

            {/* Kinetic Zero Gravity Search Bar */}
            <div className="w-full mt-10 sm:mt-12">
              <ZeroGravitySearch />
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* BLOCO 2: CURADORIA SELETA (4 a 6 propriedades icônicas)   */}
        {/* ======================================================== */}
        <section className="py-24 sm:py-32 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block mb-2">
                  Acervo Exclusivo 2026
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
                  Curadoria Seleta
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-xl font-normal leading-relaxed">
                  Uma seleção criteriosa de propriedades singulares que redefinem o morar contemporâneo em localizações privilegiadas.
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

            {/* Grid Elegante com ParallaxCard 4:3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {curatedProperties.map((property, idx) => (
                <ParallaxCard
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
        <section className="py-24 sm:py-32 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-14">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block mb-2">
                Coleções Temáticas
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
                Estilos de Vida
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-3 font-normal leading-relaxed">
                Espaços pensados para acolher diferentes momentos da vida, do sossego do campo à vitalidade dos grandes centros.
              </p>
            </div>

            {/* Grid Editorial de Estilos de Vida */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {lifestyles.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group block overflow-hidden rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-200 font-normal line-clamp-2 max-w-md">
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
        {/* BLOCO 4: DESTAQUE DE CONDOMÍNIO (REVISTA / FULL-BLEED)   */}
        {/* ======================================================== */}
        <section className="py-24 sm:py-32 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Imagem Principal */}
              <div className="lg:col-span-7">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85"
                    alt="Fazenda Boa Vista"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Informações */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block mb-2">
                    Destaque Arquitetônico
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                    Fazenda Boa Vista: A Síntese do Campo Contemporâneo
                  </h2>
                </div>

                <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
                  A apenas uma hora de São Paulo, mais de 12 milhões de metros quadrados de mata nativa preservada acolhem residências assinadas pelos maiores expoentes da arquitetura brasileira.
                </p>

                <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
                  Entre lagos privativos, centro hípico de padrão internacional e dois campos de golfe desenhados por Arnold Palmer, a privacidade, o bem-estar e a segurança encontram sua mais alta expressão.
                </p>

                {/* Métricas com Hairline Dividers */}
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200">
                  <div>
                    <span className="text-2xl sm:text-3xl font-bold text-slate-900 block tabular-nums">
                      12M m²
                    </span>
                    <span className="text-xs uppercase tracking-wider text-slate-500 mt-1 block font-medium">
                      Mata e Lagos
                    </span>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-bold text-slate-900 block">
                      Fasano
                    </span>
                    <span className="text-xs uppercase tracking-wider text-slate-500 mt-1 block font-medium">
                      Hospitalidade
                    </span>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-bold text-slate-900 block tabular-nums">
                      18 min
                    </span>
                    <span className="text-xs uppercase tracking-wider text-slate-500 mt-1 block font-medium">
                      Heliponto de SP
                    </span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/condominio/fazenda-boa-vista"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-slate-900 hover:text-slate-600 transition-colors"
                  >
                    <span>Explorar Condomínio</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* BLOCO 5: MANIFESTO / ADVISORY DISCRETO                   */}
        {/* ======================================================== */}
        <section className="py-24 sm:py-32 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block mb-3">
              Compromisso Fiduciário
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 max-w-3xl mx-auto leading-tight">
              Discrição Absoluta & Diligência Patrimonial
            </h2>
            <p className="mt-6 text-sm sm:text-base text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed">
              A negociação de ativos imobiliários singulares exige rigor ético, profundidade técnica e sigilo irrestrito. A Habitat conecta famílias e investidores a uma rede seleta de consultorias especializadas, viabilizando transações off-market com diligência jurídica integral.
            </p>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
              <div className="p-8 rounded-xl border border-slate-200 bg-slate-50">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Curadoria Off-Market
                </h3>
                <p className="text-sm text-slate-600 font-normal leading-relaxed">
                  Acesso reservado a propriedades que não ingressam em listagens públicas, preservando a intimidade das partes e garantindo negociações diretas entre pares qualificados.
                </p>
              </div>

              <div className="p-8 rounded-xl border border-slate-200 bg-slate-50">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Tecnologia para Boutiques
                </h3>
                <p className="text-sm text-slate-600 font-normal leading-relaxed">
                  Infraestrutura de software e CRM desenhada para consultorias imobiliárias independentes que priorizam excelência de portfólio e atendimento concierge.
                </p>
              </div>
            </div>

            <div className="mt-14 flex flex-wrap items-center justify-center gap-6">
              <Link
                href="/contato"
                className="px-8 py-4 bg-stone-950 text-white hover:bg-stone-800 text-xs font-medium uppercase tracking-[0.2em] transition-colors"
              >
                Solicitar Atendimento Privado
              </Link>
              <Link
                href="/anunciar"
                className="px-8 py-4 border border-stone-300 hover:border-stone-900 text-stone-800 text-xs font-medium uppercase tracking-[0.2em] transition-colors"
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
