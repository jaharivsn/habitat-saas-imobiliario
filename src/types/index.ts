// Canonical System Types (Specification Next.js 16)
export type PropertyOperation = "sale" | "rent" | "development";
export type PropertyStatus =
  | "draft"
  | "under_review"
  | "published"
  | "paused"
  | "sold"
  | "rented"
  | "archived";
export type UserRole = "public" | "agent" | "agency_owner" | "platform_admin";

export type OperationType = "venda" | "aluguel" | PropertyOperation;

export type PropertyType =
  | "casa"
  | "apartamento"
  | "cobertura"
  | "terreno"
  | "comercial"
  | "condominio"
  | "rural";

export type ListingStatus =
  | PropertyStatus
  | "review";

export interface Agent {
  id: string;
  slug: string;
  name: string;
  creci: string;
  email: string;
  phone: string;
  whatsapp: string;
  avatarUrl: string;
  bio: string;
  agencyId?: string;
  agencyName?: string;
  specialties: string[];
  activePropertiesCount: number;
  soldVolumeTotal: number;
  rating: number;
  reviewsCount: number;
}

export interface Broker {
  id: string;
  slug: string;
  name: string;
  creci: string;
  photo: string;
  avatarUrl?: string;
  banner?: string;
  bio: string;
  phone: string;
  whatsapp: string;
  email: string;
  languages: string[];
  specialties: string[];
  regions: string[];
  agencyId?: string;
  agencyName?: string;
  rating: number;
  reviewsCount: number;
  activeListingsCount: number;
  soldCount: number;
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    website?: string;
  };
  themeColor?: string;
  featuredListings?: string[];
  testimonials?: {
    id: string;
    author: string;
    role: string;
    text: string;
    rating: number;
  }[];
}

export interface Agency {
  id: string;
  slug: string;
  name: string;
  logo: string;
  logoUrl?: string;
  banner?: string;
  description: string;
  address: string;
  city?: string;
  state?: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  teamCount?: number;
  agentCount?: number;
  listingsCount?: number;
  activePropertiesCount?: number;
  regions: string[];
  verified?: boolean;
}

export interface PropertyAddress {
  city: string;
  neighborhood: string;
  condominium?: string;
  approximateLocation: string;
}

export interface PropertySpecs {
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parkingSpaces: number;
  builtArea: number; // m²
  totalArea: number; // m²
  constructionYear?: number;
}

export interface PropertyMedia {
  coverUrl: string;
  gallery: string[];
  videoUrl?: string;
  virtualTourUrl?: string;
}

export interface PropertyFinancials {
  condoFee?: number;
  iptuMonthly?: number;
}

export interface CanonicalProperty {
  id: string;
  slug: string;
  title: string;
  price: number;
  operation: PropertyOperation;
  status: PropertyStatus;
  isFeatured: boolean;
  isLuxury: boolean;
  address: PropertyAddress;
  specs: PropertySpecs;
  amenities: string[];
  media: PropertyMedia;
  financials: PropertyFinancials;
  agentId: string;
  agencyId?: string;
}

export interface Property {
  id: string;
  slug: string;
  code: string;
  title: string;
  price: number;
  operation: PropertyOperation | OperationType;
  status: PropertyStatus | ListingStatus;
  isFeatured: boolean;
  isLuxury?: boolean;
  address: string;
  approximateLocation?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode?: string;
  specs?: PropertySpecs;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parkingSpots: number;
  builtArea: number; // m²
  landArea?: number; // m²
  yearBuilt?: number;
  propertyType: PropertyType;
  rentalPeriod?: "mensal" | "anual" | "temporada";
  condoFee?: number;
  iptu?: number;
  financials?: PropertyFinancials;
  description: string;
  highlights: string[];
  features: string[];
  amenities: string[];
  media?: PropertyMedia;
  photos: string[];
  videoUrl?: string;
  virtualTourUrl?: string;
  isNew?: boolean;
  isLaunch?: boolean;
  isWaterfront?: boolean;
  isGatedCommunity?: boolean;
  isFurnished?: boolean;
  allowsPets?: boolean;
  isCommercial?: boolean;
  hasPool?: boolean;
  viewsCount: number;
  leadsCount: number;
  agentId?: string;
  agencyId?: string;
  broker: Broker;
  agency?: {
    id: string;
    name: string;
    logo: string;
  };
  communityName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Community {
  id: string;
  slug: string;
  name: string;
  photo: string;
  gallery: string[];
  city: string;
  state?: string;
  neighborhood: string;
  priceRange: string;
  availableCount: number;
  description: string;
  amenities: string[];
  profile: string;
  nearbySchools: string[];
  nearbyShopping: string[];
  lifestyle: string;
  latitude?: number;
  longitude?: number;
}

export interface CityInfo {
  slug: string;
  name: string;
  state: string;
  photo: string;
  description: string;
  lifestyle: string;
  avgPriceM2: number;
  availableCount: number;
  topNeighborhoods: string[];
}

export interface NeighborhoodInfo {
  slug: string;
  name: string;
  cityName: string;
  state: string;
  photo: string;
  description: string;
  lifestyle: string;
  avgPriceM2: number;
  availableCount: number;
}

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "visit_scheduled"
  | "negotiation"
  | "proposal"
  | "won"
  | "lost"
  | "novo"
  | "contatado"
  | "qualificado"
  | "visita_agendada"
  | "negociacao"
  | "proposta"
  | "fechado"
  | "perdido";

export interface LeadNote {
  id: string;
  content: string;
  timestamp: string;
}

export interface CanonicalLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  propertyId: string;
  agentId: string;
  status: LeadStatus;
  source: "whatsapp" | "portal_form" | "direct_phone";
  createdAt: string;
  notes: Array<{ id: string; content: string; timestamp: string }>;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  whatsapp?: string;
  email: string;
  propertyId: string;
  propertyTitle: string;
  propertyPrice: number;
  agentId?: string;
  brokerId: string;
  brokerName: string;
  status: LeadStatus;
  source: "whatsapp" | "portal_form" | "direct_phone" | "WhatsApp" | "Site" | "Instagram" | "Indicação" | "Portal";
  createdAt: string;
  lastInteraction?: string;
  notes: string[];
  notesTimeline?: LeadNote[];
  tasks?: {
    id: string;
    title: string;
    dueDate: string;
    completed: boolean;
  }[];
  scheduledFollowUp?: string;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  type: "comprador" | "locatario" | "investidor";
  budgetMin: number;
  budgetMax: number;
  desiredRegions: string[];
  desiredBedrooms: number;
  favoritePropertyIds: string[];
  visitedPropertyIds: string[];
  notes: string;
  createdAt: string;
}

export type EventType =
  | "visita"
  | "reuniao"
  | "ligacao"
  | "followup"
  | "tour_virtual"
  | "assinatura"
  | "interno";

export interface CalendarEvent {
  id: string;
  title: string;
  type: EventType;
  date: string;
  time: string;
  clientName: string;
  clientPhone: string;
  propertyTitle?: string;
  address?: string;
  status: "confirmado" | "pendente" | "concluido" | "cancelado";
  notes?: string;
}

export interface Message {
  id: string;
  sender: "client" | "broker";
  text: string;
  time: string;
  attachmentType?: "property" | "document";
  attachmentData?: any;
}

export interface MessageThread {
  id: string;
  contactName: string;
  contactRole: "Lead" | "Cliente" | "Corretor Parcerias";
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  propertyId?: string;
  propertyTitle?: string;
  phone: string;
  messages: Message[];
}

export type TeamRole = "proprietario" | "admin" | "gerente" | "corretor" | "assistente";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: TeamRole;
  avatar: string;
  activeListings: number;
  totalLeads: number;
  conversionRate: string;
  joinedDate: string;
}

export interface Plan {
  id: string;
  name: string;
  slug: string;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  listingLimit: number | "Ilimitado";
  userLimit: number | "Ilimitado";
  featuredMonthly: number;
  features: string[];
  recommended?: boolean;
}

export interface SearchAlert {
  id: string;
  title: string;
  criteria: {
    operation?: OperationType;
    propertyType?: PropertyType;
    city?: string;
    maxPrice?: number;
    bedrooms?: number;
    hasPool?: boolean;
  };
  frequency: "imediato" | "diario" | "semanal";
  matchesCount: number;
  createdAt: string;
  active: boolean;
}
