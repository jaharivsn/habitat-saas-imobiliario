"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  User,
  Building,
  Users,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  Check,
} from "lucide-react";

export default function CadastroSaaSPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Account
    name: "",
    email: "",
    password: "",
    // Step 2: Account Type
    accountType: "individual", // individual, imobiliaria, equipe
    // Step 3: Professional Profile
    creci: "",
    companyName: "",
    bio: "",
    // Step 4: Contact
    phone: "",
    whatsapp: "",
    // Step 5: Photo / Logo
    photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    // Step 6: Regions
    regions: ["Jardins", "Itaim Bibi"],
    // Step 7: Plan
    plan: "pro", // individual, pro, imobiliaria, enterprise
    // Step 8: Public page
    publicSlug: "meu-nome-imoveis",
    primaryColor: "#0A192F",
    // Step 9: Published first property
  });

  const steps = [
    { num: 1, label: "Conta" },
    { num: 2, label: "Perfil" },
    { num: 3, label: "Profissional" },
    { num: 4, label: "Contato" },
    { num: 5, label: "Identidade" },
    { num: 6, label: "Regiões" },
    { num: 7, label: "Plano" },
    { num: 8, label: "Vitrine" },
    { num: 9, label: "Conclusão" },
  ];

  const handleNext = () => {
    if (currentStep < 9) {
      setCurrentStep((prev) => prev + 1);
    } else {
      router.push("/dashboard");
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Stepper Progress Header */}
          <div className="mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-600 block text-center mb-1">
              Onboarding de Novos Parceiros
            </span>
            <h1 className="font-serif text-3xl font-bold text-navy-950 text-center">
              Criar Conta no SaaS Habitat
            </h1>

            {/* Steps Progress Bar */}
            <div className="mt-8 flex items-center justify-between relative">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-stone-200 -z-0" />
              {steps.map((s) => {
                const isCompleted = s.num < currentStep;
                const isCurrent = s.num === currentStep;
                return (
                  <div key={s.num} className="flex flex-col items-center relative z-10">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isCompleted
                          ? "bg-navy-900 text-white shadow"
                          : isCurrent
                          ? "bg-gold-500 text-navy-950 ring-4 ring-gold-100 shadow-md font-bold"
                          : "bg-white text-stone-400 border border-stone-200"
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                    </div>
                    <span className="hidden sm:block text-[10px] text-stone-500 mt-1 font-medium">
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Form Box */}
          <div className="bg-white rounded-xl p-6 sm:p-10 border border-stone-200/90 shadow-luxury">
            {/* ETAPA 1: CRIAR CONTA */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div>
                  <h2 className="font-serif font-bold text-2xl text-navy-950">
                    1. Dados de Acesso
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Insira seu nome e crie as credenciais de acesso seguro.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Alexandre Vasconcelos"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-navy-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      E-mail Profissional
                    </label>
                    <input
                      type="email"
                      placeholder="seu@habitatprime.com.br"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-navy-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Crie uma Senha Segura
                    </label>
                    <input
                      type="password"
                      placeholder="No mínimo 8 caracteres"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-navy-900"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 2: TIPO DE PERFIL */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div>
                  <h2 className="font-serif font-bold text-2xl text-navy-950">
                    2. Escolha o Tipo de Perfil
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Como você atuará dentro da plataforma SaaS?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      id: "individual",
                      title: "Corretor Solo",
                      desc: "Atuação individual independente com CRM e vitrine própria.",
                      icon: User,
                    },
                    {
                      id: "equipe",
                      title: "Equipe / Time",
                      desc: "Grupo de corretores compartilhando carteira e leads.",
                      icon: Users,
                    },
                    {
                      id: "imobiliaria",
                      title: "Imobiliária",
                      desc: "Empresa completa com múltiplos corretores, secretária e gestão.",
                      icon: Building,
                    },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, accountType: item.id })
                      }
                      className={`p-5 rounded-xl border text-left flex flex-col justify-between transition ${
                        formData.accountType === item.id
                          ? "border-navy-900 bg-navy-50/70 shadow-sm"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <item.icon className="w-6 h-6 text-navy-900 mb-3" />
                      <div>
                        <h3 className="font-bold text-navy-950 text-sm">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ETAPA 3: PERFIL PROFISSIONAL */}
            {currentStep === 3 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div>
                  <h2 className="font-serif font-bold text-2xl text-navy-950">
                    3. Perfil Profissional & CRECI
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Garantia de segurança jurídica para os clientes da curadoria.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Registro CRECI
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 189420-F"
                      value={formData.creci}
                      onChange={(e) =>
                        setFormData({ ...formData, creci: e.target.value })
                      }
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-navy-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Nome Fantasia ou Imobiliária Vinculada
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Habitat Prime Realty"
                      value={formData.companyName}
                      onChange={(e) =>
                        setFormData({ ...formData, companyName: e.target.value })
                      }
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-navy-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Biografia / Apresentação Resumida
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Conte sobre sua trajetória e nicho de atuação..."
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-navy-900 resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 4: DADOS DE CONTATO */}
            {currentStep === 4 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div>
                  <h2 className="font-serif font-bold text-2xl text-navy-950">
                    4. Canais de Atendimento
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Onde você receberá os alertas de leads qualificados.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Telefone Principal
                    </label>
                    <input
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-navy-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      WhatsApp Direto (para botões no anúncio)
                    </label>
                    <input
                      type="tel"
                      placeholder="5511999999999"
                      value={formData.whatsapp}
                      onChange={(e) =>
                        setFormData({ ...formData, whatsapp: e.target.value })
                      }
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-navy-900"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 5: FOTO OU LOGO */}
            {currentStep === 5 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div>
                  <h2 className="font-serif font-bold text-2xl text-navy-950">
                    5. Imagem de Perfil ou Logotipo
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Sua foto de alta resolução passará credibilidade imediata.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 p-6 border-2 border-dashed border-stone-200 rounded-xl bg-stone-50/60">
                  <img
                    src={formData.photoUrl}
                    alt="Preview"
                    className="w-24 h-24 rounded-full object-cover border-2 border-navy-900 shadow"
                  />
                  <div className="text-center sm:text-left space-y-2">
                    <p className="text-xs font-semibold text-slate-700">
                      Foto profissional em alta resolução recomendada
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="px-4 py-2 bg-navy-900 text-white rounded-xl text-xs font-semibold shadow hover:bg-navy-800 transition flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Fazer Upload</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 6: SELECIONAR ÁREAS DE ATUAÇÃO */}
            {currentStep === 6 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div>
                  <h2 className="font-serif font-bold text-2xl text-navy-950">
                    6. Regiões de Atuação
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Selecione onde você possui imóveis ou carteira prioritária.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  {[
                    "Jardins (SP)",
                    "Itaim Bibi (SP)",
                    "Fazenda Boa Vista",
                    "Alphaville (Barueri)",
                    "Leblon / Ipanema (RJ)",
                    "Barra da Tijuca (RJ)",
                    "Jurerê Internacional (SC)",
                    "Winter Garden (Flórida)",
                  ].map((region) => {
                    const isSelected = formData.regions.includes(region);
                    return (
                      <button
                        key={region}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setFormData({
                              ...formData,
                              regions: formData.regions.filter((r) => r !== region),
                            });
                          } else {
                            setFormData({
                              ...formData,
                              regions: [...formData.regions, region],
                            });
                          }
                        }}
                        className={`p-3 rounded-xl border font-semibold text-left transition ${
                          isSelected
                            ? "bg-navy-900 text-white border-navy-900 shadow-sm"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {region}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ETAPA 7: ESCOLHER PLANO */}
            {currentStep === 7 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div>
                  <h2 className="font-serif font-bold text-2xl text-navy-950">
                    7. Escolha seu Plano SaaS
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    14 dias grátis para testar todas as funcionalidades do ecossistema.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      id: "individual",
                      name: "Solo",
                      price: "R$ 149/mês",
                      limit: "Até 15 imóveis",
                    },
                    {
                      id: "pro",
                      name: "Pro",
                      price: "R$ 299/mês",
                      limit: "Até 50 imóveis + 8 destaques",
                      popular: true,
                    },
                    {
                      id: "imobiliaria",
                      name: "Imobiliária",
                      price: "R$ 599/mês",
                      limit: "Até 200 imóveis + 15 corretores",
                    },
                  ].map((plan) => (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, plan: plan.id })}
                      className={`p-5 rounded-xl border text-left flex flex-col justify-between transition relative ${
                        formData.plan === plan.id
                          ? "border-navy-950 bg-navy-50/60 ring-1 ring-navy-950 shadow-sm"
                          : "border-stone-200 bg-white"
                      }`}
                    >
                      {plan.popular && (
                        <span className="absolute -top-2.5 right-3 bg-gold-500 text-navy-950 text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                          Mais Escolhido
                        </span>
                      )}
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          {plan.name}
                        </span>
                        <div className="font-serif font-bold text-xl text-navy-950 mt-1">
                          {plan.price}
                        </div>
                        <p className="text-xs text-slate-500 mt-2">{plan.limit}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ETAPA 8: CONFIGURAR PÁGINA PÚBLICA */}
            {currentStep === 8 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div>
                  <h2 className="font-serif font-bold text-2xl text-navy-950">
                    8. Configuração da sua Vitrine Pública
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Sua mini página própria pronta para compartilhar no Instagram e WhatsApp.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      URL Personalizada
                    </label>
                    <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
                      <span className="px-3 text-slate-400 font-mono text-xs">
                        habitat.com.br/corretor/
                      </span>
                      <input
                        type="text"
                        value={formData.publicSlug}
                        onChange={(e) =>
                          setFormData({ ...formData, publicSlug: e.target.value })
                        }
                        className="flex-1 p-2.5 bg-white text-slate-900 font-mono focus:outline-none text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 9: PUBLICAR PRIMEIRO IMÓVEL / CONCLUSÃO */}
            {currentStep === 9 && (
              <div className="space-y-6 text-center py-6 animate-in fade-in duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <h2 className="font-serif font-bold text-2xl text-navy-950">
                    Conta Criada com Sucesso!
                  </h2>
                  <p className="text-xs text-slate-500 max-w-md mx-auto mt-2">
                    Sua conta está ativa no Plano Pro (14 dias grátis). Agora você pode cadastrar seu primeiro imóvel pelo assistente em 10 etapas ou explorar o painel geral.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/dashboard/imoveis/novo"
                    className="w-full sm:w-auto bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs py-3.5 px-6 rounded-xl shadow transition"
                  >
                    Cadastrar Primeiro Imóvel Agora
                  </Link>
                  <Link
                    href="/dashboard"
                    className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-3.5 px-6 rounded-xl border border-slate-200 transition"
                  >
                    Ir para o Painel Geral (Dashboard)
                  </Link>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            {currentStep < 9 && (
              <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl transition ${
                    currentStep === 1
                      ? "opacity-0 pointer-events-none"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold px-6 py-3 rounded-xl shadow transition"
                >
                  <span>Avançar</span>
                  <ArrowRight className="w-4 h-4 text-gold-400" />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
