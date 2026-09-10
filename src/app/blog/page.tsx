import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowRight } from "lucide-react";

export default function BlogPage() {
  const posts = [
    {
      slug: "tendencias-arquitetura-campo-2025",
      title: "A ascensão das residências de campo contemporâneas com caixilhos minimalistas",
      excerpt: "Como a fusão entre a biofilia e o concreto aparente remodelou os projetos na Fazenda Boa Vista e Quinta da Baroneza.",
      category: "Arquitetura",
      date: "08 Março 2024",
      readTime: "5 min de leitura",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      slug: "investir-winter-garden-florida",
      title: "Por que Winter Garden se consolidou como o polo imobiliário de maior liquidez na Flórida",
      excerpt: "Distritos escolares nota A, crescimento populacional corporativo e yields sustentáveis atraem famílias e investidores globais.",
      category: "Investimentos",
      date: "02 Março 2024",
      readTime: "7 min de leitura",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    },
    {
      slug: "metro-quadrado-leblon-historico",
      title: "Análise histórica do metro quadrado no Leblon e a escassez crônica de novos lançamentos",
      excerpt: "Com poucos terrenos disponíveis na orla e postos nobres, imóveis reformados atingem patamares recordes de valorização.",
      category: "Mercado Nobre",
      date: "24 Fevereiro 2024",
      readTime: "6 min de leitura",
      image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Header />

      <main className="flex-1 pb-20">
        <div className="bg-navy-950 text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-400">
              Editorial & Inteligência
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold mt-2">
              Habitat Insights
            </h1>
            <p className="text-stone-300 text-sm sm:text-base mt-2 max-w-xl font-light leading-relaxed">
              Análises de mercado, tendências arquitetônicas e inteligência patrimonial para investidores e proprietários.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((p) => (
              <div
                key={p.slug}
                className="group bg-white rounded-xl overflow-hidden border border-stone-200/90 shadow-subtle hover:shadow-luxury-hover transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-stone-100 relative">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                      <span className="text-gold-700 font-semibold uppercase tracking-widest">{p.category}</span>
                      <span className="font-mono">{p.readTime}</span>
                    </div>
                    <h3 className="font-serif font-semibold text-lg text-slate-900 group-hover:text-navy-950 leading-snug transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 font-light leading-relaxed">
                      {p.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-stone-100 flex items-center justify-between mt-4">
                  <span className="text-[11px] text-slate-400 font-mono">{p.date}</span>
                  <a
                    href="#"
                    className="text-[11px] font-semibold uppercase tracking-wider text-navy-950 hover:text-gold-700 flex items-center gap-1 transition"
                  >
                    <span>Ler Artigo</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
