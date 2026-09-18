import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { mockCities } from "@/data/mockData";
import { MapPin, ArrowRight } from "lucide-react";

export default function CidadesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Header />

      <main className="flex-1 pb-20">
        <div className="bg-navy-950 text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Guia Regional
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-2 leading-tight">
              Cidades & Polos Imobiliários Nobres
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl">
              Conheça as regiões com maior valorização patrimonial, estilo de vida sofisticado e segurança no Brasil e no exterior.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockCities.map((city) => (
              <Link
                key={city.slug}
                href={`/cidade/${city.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-stone-200/90 shadow-subtle hover:shadow-md transition flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={city.photo}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400">
                      {city.state}
                    </span>
                    <h3 className="font-serif font-bold text-xl leading-tight">
                      {city.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {city.description}
                    </p>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500">Média m²:</span>
                      <span className="font-bold text-navy-900">
                        R$ {city.avgPriceM2.toLocaleString("pt-BR")}/m²
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-navy-900 group-hover:text-gold-600 transition">
                    <span>{city.availableCount} Imóveis Ativos</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
