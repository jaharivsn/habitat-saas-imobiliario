import { PropertyOperation, PropertyStatus, UserRole, LeadStatus } from "@/types";

export const USER_ROLES: {
  id: UserRole;
  label: string;
  description: string;
  badge: string;
  destination: string;
}[] = [
  {
    id: "public",
    label: "Comprador / Investidor",
    description: "Navegação editorial pública, busca curada e agendamento privativo.",
    badge: "Public Client",
    destination: "/",
  },
  {
    id: "agent",
    label: "Corretor Associado",
    description: "CRM de leads, pipeline Kanban, gestão de imóveis e vitrine pública autoral.",
    badge: "Agent Pro",
    destination: "/dashboard",
  },
  {
    id: "agency_owner",
    label: "Imobiliária / Boutique",
    description: "Gestão multi-corretores, distribuição de carteira e métricas consolidadas.",
    badge: "Agency Owner",
    destination: "/dashboard/equipe",
  },
  {
    id: "platform_admin",
    label: "Governança Master",
    description: "Moderação de acervo, auditoria de anúncios, planos SaaS e métricas do ecossistema.",
    badge: "Admin Master",
    destination: "/admin",
  },
];

export const PROPERTY_OPERATIONS: {
  id: PropertyOperation;
  label: string;
  badgeText: string;
}[] = [
  { id: "sale", label: "Comprar", badgeText: "Venda" },
  { id: "rent", label: "Alugar", badgeText: "Locação" },
  { id: "development", label: "Lançamentos", badgeText: "Lançamento" },
];

export const PROPERTY_STATUSES: {
  id: PropertyStatus;
  label: string;
  colorClass: string;
}[] = [
  { id: "draft", label: "Rascunho", colorClass: "bg-stone-100 text-stone-600 border-stone-200" },
  { id: "under_review", label: "Em Análise", colorClass: "bg-amber-50 text-amber-700 border-amber-200" },
  { id: "published", label: "Publicado", colorClass: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { id: "paused", label: "Pausado", colorClass: "bg-slate-100 text-slate-600 border-slate-200" },
  { id: "sold", label: "Vendido", colorClass: "bg-navy-900 text-gold-300 border-navy-800" },
  { id: "rented", label: "Alugado", colorClass: "bg-navy-800 text-slate-200 border-navy-700" },
  { id: "archived", label: "Arquivado", colorClass: "bg-stone-200 text-stone-700 border-stone-300" },
];

export const CRM_LEAD_COLUMNS: {
  id: LeadStatus;
  title: string;
  description: string;
}[] = [
  { id: "new", title: "Novos", description: "Contatos recém-capturados" },
  { id: "contacted", title: "Contatados", description: "Primeira abordagem realizada" },
  { id: "qualified", title: "Qualificados", description: "Perfil e liquidez validados" },
  { id: "visit_scheduled", title: "Visita Agendada", description: "Visitas marcadas na agenda" },
  { id: "negotiation", title: "Negociação", description: "Em rodadas de contraproposta" },
  { id: "proposal", title: "Proposta", description: "Minuta ou proposta formal" },
  { id: "won", title: "Ganhos", description: "Negócio concluído e formalizado" },
  { id: "lost", title: "Perdidos", description: "Desistência ou desqualificado" },
];

export const LIFESTYLE_COLLECTIONS = [
  {
    slug: "condominios-fechados",
    title: "Condomínios Fechados",
    subtitle: "Privacidade absoluta e segurança de padrão internacional",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "frente-para-agua",
    title: "Frente para a Água",
    subtitle: "Pé na areia, represas cinematográficas e marinas privadas",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "penthouses-coberturas",
    title: "Penthouses & Coberturas",
    subtitle: "Vistas panorâmicas e arquitetura suspensa sobre a metrópole",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "fazendas-haras",
    title: "Casas de Campo & Haras",
    subtitle: "Refúgios rurais sofisticados com infraestrutura hípica e heliponto",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
  },
];
