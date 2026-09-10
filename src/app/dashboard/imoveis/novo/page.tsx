"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Upload,
  Plus,
  Trash2,
  Eye,
  Sparkles,
  CheckCircle2,
  MapPin,
  Building,
  Video,
  DollarSign,
  UserCheck,
  ExternalLink,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function NovoImovelStepperPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form states for all 10 stages
  const [basic, setBasic] = useState({
    propertyType: "casa",
    operation: "venda",
    title: "Nova Mansão Contemporânea com Piscina Suspensa",
    description: "Arquitetura arrojada em concreto aparente e vidro com total integração com a natureza...",
    price: 18500000,
  });

  const [location, setLocation] = useState({
    address: "Alameda dos Jacarandás, 450",
    city: "Porto Feliz",
    neighborhood: "Fazenda Boa Vista",
    condominium: "Fazenda Boa Vista",
    zipCode: "18540-000",
  });

  const [specs, setSpecs] = useState({
    bedrooms: 5,
    suites: 5,
    bathrooms: 7,
    parkingSpots: 6,
    builtArea: 920,
    landArea: 2500,
    yearBuilt: 2024,
  });

  const [amenities, setAmenities] = useState<string[]>([
    "Piscina Aquecida",
    "Spa & Sauna",
    "Espaço Gourmet",
    "Condomínio Fechado",
    "Ar Condicionado Central",
  ]);

  const [photos, setPhotos] = useState<string[]>([
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  ]);

  const [media, setMedia] = useState({
    videoUrl: "https://youtube.com/watch?v=sample",
    virtualTourUrl: "https://my.matterport.com/show/?m=sample",
  });

  const [financial, setFinancial] = useState({
    condoFee: 3800,
    iptu: 1900,
    acceptsFinancing: true,
    acceptsTradeIn: false,
  });

  const [brokerResponsible, setBrokerResponsible] = useState("Alexandre Vasconcelos");
  const [featuredListing, setFeaturedListing] = useState(true);

  const stepTitles = [
    "Básicas",
    "Localização",
    "Características",
    "Comodidades",
    "Fotos",
    "Vídeo & Tour",
    "Financeiro",
    "Corretor",
    "Pré-visualização",
    "Publicação",
  ];

  const handleNext = () => {
    if (step < 10) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
          <Link href="/dashboard/imoveis" className="hover:text-slate-700">Imóveis</Link>
          <span>/</span>
          <span className="text-slate-700 font-semibold">Novo Anúncio</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-navy-950">
          Cadastro de Imóvel
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Preencha as 10 etapas para publicar um anúncio de alto padrão no ecossistema
        </p>
      </div>

      {/* Stepper Progress Indicator */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-subtle overflow-x-auto">
        <div className="flex items-center justify-between min-w-[650px] relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 -z-0" />
          {stepTitles.map((title, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < step;
            const isCurrent = stepNum === step;
            return (
              <button
                key={title}
                onClick={() => setStep(stepNum)}
                className="relative z-10 flex flex-col items-center group cursor-pointer"
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCompleted
                      ? "bg-navy-900 text-white shadow"
                      : isCurrent
                      ? "bg-gold-500 text-navy-950 ring-4 ring-gold-100 font-bold shadow"
                      : "bg-white text-slate-400 border border-slate-200"
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : stepNum}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 font-semibold whitespace-nowrap">
                  {title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-xl p-6 sm:p-10 border border-slate-200/90 shadow-subtle text-xs space-y-6">
        {/* ETAPA 1: BÁSICAS */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <h2 className="font-serif font-bold text-xl text-navy-950">
                1. Informações Básicas
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Defina o tipo de operação, categoria e título chamativo.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Operação
                </label>
                <select
                  value={basic.operation}
                  onChange={(e) => setBasic({ ...basic, operation: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="venda">Venda</option>
                  <option value="aluguel">Aluguel (Locação)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Tipo de Imóvel
                </label>
                <select
                  value={basic.propertyType}
                  onChange={(e) => setBasic({ ...basic, propertyType: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="casa">Casa</option>
                  <option value="apartamento">Apartamento</option>
                  <option value="cobertura">Cobertura</option>
                  <option value="condominio">Condomínio Fechado</option>
                  <option value="comercial">Comercial</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Título do Anúncio
              </label>
              <input
                type="text"
                value={basic.title}
                onChange={(e) => setBasic({ ...basic, title: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Preço Pretendido (R$)
              </label>
              <input
                type="number"
                value={basic.price}
                onChange={(e) => setBasic({ ...basic, price: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Descrição Completa
              </label>
              <textarea
                rows={4}
                value={basic.description}
                onChange={(e) => setBasic({ ...basic, description: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm resize-none"
              />
            </div>
          </div>
        )}

        {/* ETAPA 2: LOCALIZAÇÃO */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <h2 className="font-serif font-bold text-xl text-navy-950">
                2. Localização & Endereço
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Defina o endereço e vizinhança do imóvel.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Cidade</label>
                <input
                  type="text"
                  value={location.city}
                  onChange={(e) => setLocation({ ...location, city: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Bairro</label>
                <input
                  type="text"
                  value={location.neighborhood}
                  onChange={(e) => setLocation({ ...location, neighborhood: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Condomínio (se aplicável)
                </label>
                <input
                  type="text"
                  value={location.condominium}
                  onChange={(e) => setLocation({ ...location, condominium: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">CEP</label>
                <input
                  type="text"
                  value={location.zipCode}
                  onChange={(e) => setLocation({ ...location, zipCode: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Logradouro e Número
              </label>
              <input
                type="text"
                value={location.address}
                onChange={(e) => setLocation({ ...location, address: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>
          </div>
        )}

        {/* ETAPA 3: CARACTERÍSTICAS */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <h2 className="font-serif font-bold text-xl text-navy-950">
                3. Dimensões & Características
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Quartos</label>
                <input
                  type="number"
                  value={specs.bedrooms}
                  onChange={(e) => setSpecs({ ...specs, bedrooms: Number(e.target.value) })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Suítes</label>
                <input
                  type="number"
                  value={specs.suites}
                  onChange={(e) => setSpecs({ ...specs, suites: Number(e.target.value) })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Banheiros</label>
                <input
                  type="number"
                  value={specs.bathrooms}
                  onChange={(e) => setSpecs({ ...specs, bathrooms: Number(e.target.value) })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Vagas</label>
                <input
                  type="number"
                  value={specs.parkingSpots}
                  onChange={(e) => setSpecs({ ...specs, parkingSpots: Number(e.target.value) })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Área Útil (m²)</label>
                <input
                  type="number"
                  value={specs.builtArea}
                  onChange={(e) => setSpecs({ ...specs, builtArea: Number(e.target.value) })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Área Terreno (m²)</label>
                <input
                  type="number"
                  value={specs.landArea}
                  onChange={(e) => setSpecs({ ...specs, landArea: Number(e.target.value) })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* ETAPA 4: COMODIDADES */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <h2 className="font-serif font-bold text-xl text-navy-950">
                4. Comodidades & Lazer
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Marque todos os itens disponíveis neste imóvel.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                "Piscina Aquecida",
                "Spa & Sauna",
                "Espaço Gourmet",
                "Condomínio Fechado",
                "Ar Condicionado Central",
                "Adega Climatizada",
                "Home Theater",
                "Academia Privativa",
                "Vista Panorâmica",
                "Heliponto Próximo",
                "Mobiliado",
                "Aceita Pets",
              ].map((item) => {
                const checked = amenities.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      if (checked) {
                        setAmenities(amenities.filter((a) => a !== item));
                      } else {
                        setAmenities([...amenities, item]);
                      }
                    }}
                    className={`p-3 rounded-xl border text-left font-medium flex items-center justify-between transition ${
                      checked
                        ? "bg-navy-900 text-white border-navy-900"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <span>{item}</span>
                    {checked && <Check className="w-4 h-4 text-gold-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ETAPA 5: FOTOS */}
        {step === 5 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <h2 className="font-serif font-bold text-xl text-navy-950">
                5. Galeria Fotográfica
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                A primeira foto será a capa principal nos resultados de busca.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {photos.map((url, i) => (
                <div key={i} className="relative rounded-lg overflow-hidden group aspect-[4/3] bg-slate-100 border border-slate-200/90">
                  <img src={url} alt={`Foto ${i}`} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-navy-900 text-white text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-sm font-semibold">
                    {i === 0 ? "Capa Principal" : `#${i + 1}`}
                  </div>
                </div>
              ))}

              <div className="border-2 border-dashed border-slate-200 rounded-lg aspect-[4/3] flex flex-col items-center justify-center text-slate-400 hover:border-navy-900 hover:text-navy-900 cursor-pointer transition p-4 text-center">
                <Upload className="w-6 h-6 mb-1 text-gold-600" />
                <span className="font-semibold text-xs">Adicionar mais fotos</span>
                <span className="text-[10px] text-slate-400">JPG, PNG até 20MB</span>
              </div>
            </div>
          </div>
        )}

        {/* ETAPA 6: VÍDEO & TOUR */}
        {step === 6 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <h2 className="font-serif font-bold text-xl text-navy-950">
                6. Vídeo & Tour Virtual 360°
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Imóveis com tour 360 recebem 4x mais visualizações qualificadas.
              </p>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Link do Vídeo (YouTube ou Vimeo)
              </label>
              <input
                type="url"
                value={media.videoUrl}
                onChange={(e) => setMedia({ ...media, videoUrl: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Link do Tour Virtual 360° (Matterport ou similar)
              </label>
              <input
                type="url"
                value={media.virtualTourUrl}
                onChange={(e) => setMedia({ ...media, virtualTourUrl: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>
          </div>
        )}

        {/* ETAPA 7: FINANCEIRO */}
        {step === 7 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <h2 className="font-serif font-bold text-xl text-navy-950">
                7. Informações Financeiras & Taxas
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Taxa de Condomínio Mensal (R$)
                </label>
                <input
                  type="number"
                  value={financial.condoFee}
                  onChange={(e) => setFinancial({ ...financial, condoFee: Number(e.target.value) })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  IPTU Mensal (R$)
                </label>
                <input
                  type="number"
                  value={financial.iptu}
                  onChange={(e) => setFinancial({ ...financial, iptu: Number(e.target.value) })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={financial.acceptsFinancing}
                  onChange={(e) => setFinancial({ ...financial, acceptsFinancing: e.target.checked })}
                  className="rounded text-navy-900"
                />
                <span>Aceita Financiamento Bancário</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={financial.acceptsTradeIn}
                  onChange={(e) => setFinancial({ ...financial, acceptsTradeIn: e.target.checked })}
                  className="rounded text-navy-900"
                />
                <span>Aceita Permuta de Menor Valor</span>
              </label>
            </div>
          </div>
        )}

        {/* ETAPA 8: CORRETOR RESPONSÁVEL */}
        {step === 8 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <h2 className="font-serif font-bold text-xl text-navy-950">
                8. Atribuição de Corretor
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Quem atenderá os leads e mensagens recebidas deste imóvel.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {["Alexandre Vasconcelos", "Beatriz Monteiro"].map((broker) => (
                <button
                  key={broker}
                  type="button"
                  onClick={() => setBrokerResponsible(broker)}
                  className={`p-4 rounded-xl border text-left flex items-center gap-3 transition ${
                    brokerResponsible === broker
                      ? "bg-navy-50/70 border-navy-900 ring-1 ring-navy-900"
                      : "bg-white border-slate-200/90 hover:border-slate-300"
                  }`}
                >
                  <UserCheck className="w-5 h-5 text-navy-900" />
                  <div>
                    <span className="font-bold text-slate-900 block">{broker}</span>
                    <span className="text-[10px] text-slate-500">CRECI Ativo</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ETAPA 9: PRÉ-VISUALIZAÇÃO */}
        {step === 9 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <h2 className="font-serif font-bold text-xl text-navy-950">
                9. Pré-visualização do Anúncio
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Confira como o imóvel aparecerá para os compradores no portal.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200/90 shadow-subtle space-y-4">
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden max-h-72">
                <img src={photos[0]} alt="Preview" className="w-full h-full object-cover" />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700">
                  {location.neighborhood}, {location.city}
                </span>
                <h3 className="font-serif font-bold text-xl text-navy-950 mt-1">
                  {basic.title}
                </h3>
                <div className="font-serif font-bold text-2xl text-navy-950 mt-2">
                  {formatPrice(basic.price, basic.operation as any)}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-slate-600 pt-2 border-t border-slate-200 text-xs">
                <span>{specs.bedrooms} Quartos</span>
                <span>•</span>
                <span>{specs.bathrooms} Banheiros</span>
                <span>•</span>
                <span>{specs.parkingSpots} Vagas</span>
                <span>•</span>
                <span>{specs.builtArea} m²</span>
              </div>
            </div>
          </div>
        )}

        {/* ETAPA 10: PUBLICAÇÃO */}
        {step === 10 && (
          <div className="space-y-6 text-center py-6 animate-in fade-in duration-150">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h2 className="font-serif font-bold text-2xl text-navy-950">
                Pronto para Publicar!
              </h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                Seu imóvel foi revisado com sucesso e será indexado instantaneamente no portal público e na sua vitrine de corretor.
              </p>
            </div>

            <div className="max-w-sm mx-auto p-4 rounded-xl border border-slate-200/90 bg-slate-50 text-left">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featuredListing}
                  onChange={(e) => setFeaturedListing(e.target.checked)}
                  className="rounded text-navy-900"
                />
                <div>
                  <span className="font-bold text-slate-900 block text-xs">
                    Destaque Gold na Página Principal
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    Garante posicionamento no topo das buscas da região
                  </span>
                </div>
              </label>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => router.push("/dashboard/imoveis")}
                className="w-full sm:w-auto bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs tracking-wider uppercase py-3.5 px-8 rounded-sm shadow-subtle transition"
              >
                Concluir & Publicar Imóvel
              </button>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        {step < 10 && (
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrev}
              disabled={step === 1}
              className={`flex items-center gap-1.5 font-semibold text-xs transition ${
                step === 1 ? "opacity-0 pointer-events-none" : "text-slate-600 hover:text-navy-900"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Etapa Anterior</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 bg-navy-950 hover:bg-navy-900 text-white font-semibold text-[11px] tracking-wider uppercase px-6 py-3 rounded-sm shadow-subtle transition"
            >
              <span>Avançar para Etapa {step + 1}</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
