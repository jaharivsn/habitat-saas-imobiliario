export type OperationType = "venda" | "aluguel";

export type PropertyType =
  | "casa"
  | "apartamento"
  | "cobertura"
  | "terreno"
  | "comercial"
  | "condominio"
  | "rural";

export type ListingStatus =
  | "draft"
  | "review"
  | "published"
  | "paused"
  | "sold"
  | "rented"
  | "archived";

export interface Broker {
  id: string;
  slug: string;
  name: string;
  creci: string;
  photo: string;
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
  socialLinks: {
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
  banner: string;
  description: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  whatsapp: string;
  website: string;
  teamCount: number;
  listingsCount: number;
  regions: string[];
  verified: boolean;
}

export interface Property {
  id: string;
  slug: string;
  code: string;
  title: string;
  operation: OperationType;
  propertyType: PropertyType;
  price: number;
  rentalPeriod?: "mensal" | "anual" | "temporada";
  condoFee?: number;
  iptu?: number;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode?: string;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parkingSpots: number;
  builtArea: number; // m²
  landArea?: number; // m²
  yearBuilt?: number;
  description: string;
  highlights: string[];
  features: string[];
  amenities: string[];
  photos: string[];
  videoUrl?: string;
  virtualTourUrl?: string;
  isFeatured: boolean;
  isNew: boolean;
  isLaunch: boolean;
  isWaterfront: boolean;
  isGatedCommunity: boolean;
  isFurnished: boolean;
  allowsPets: boolean;
  isCommercial: boolean;
  hasPool: boolean;
  status: ListingStatus;
  viewsCount: number;
  leadsCount: number;
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
  | "novo"
  | "contatado"
  | "qualificado"
  | "visita_agendada"
  | "negociacao"
  | "proposta"
  | "fechado"
  | "perdido";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  propertyId: string;
  propertyTitle: string;
  propertyPrice: number;
  source: "WhatsApp" | "Site" | "Instagram" | "Indicação" | "Portal";
  brokerId: string;
  brokerName: string;
  status: LeadStatus;
  createdAt: string;
  lastInteraction: string;
  notes: string[];
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
