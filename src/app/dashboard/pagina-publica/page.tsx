"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  CheckCircle2,
  Image as ImageIcon,
  Palette,
} from "lucide-react";
import { mockBrokers } from "@/data/mockData";

export default function PaginaPublicaPage() {
  const broker = mockBrokers[0];

  const [name, setName] = useState(broker.name);
  const [creci, setCreci] = useState(broker.creci);
  const [bio, setBio] = useState(broker.bio);
  const [phone, setPhone] = useState(broker.phone);
  const [whatsapp, setWhatsapp] = useState(broker.whatsapp);
  const [photoUrl, setPhotoUrl] = useState(broker.photo);
  const [bannerUrl, setBannerUrl] = useState(broker.banner || "");
  const [instagram, setInstagram] = useState(broker.socialLinks?.instagram || "https://instagram.com/alexandre.habitat");
  const [linkedin, setLinkedin] = useState(broker.socialLinks?.linkedin || "https://linkedin.com/in/alexandre-vasconcelos");
  const [regions, setRegions] = useState(broker.regions.join(", "));
  const [themeColor, setThemeColor] = useState(broker.themeColor || "#0A192F");
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {savedToast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-800 text-white px-5 py-3 rounded-sm shadow-luxury border border-emerald-600/40 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>Vitrine pública atualizada com sucesso!</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-600">
            Personalização de Marca
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 mt-0.5">
            Minha Vitrine Pública
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Personalize foto, banner, biografia, redes sociais, depoimentos e cores da sua página institucional.
          </p>
        </div>

        <Link
          href={`/corretor/${broker.slug}`}
          target="_blank"
          className="bg-white border border-stone-200 hover:bg-stone-50 text-navy-950 text-[11px] uppercase tracking-wider font-semibold px-4 py-2.5 rounded-sm shadow-xs flex items-center gap-1.5 transition"
        >
          <span>Visualizar Vitrine ao Vivo</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-xl p-6 sm:p-10 border border-stone-200/90 shadow-subtle space-y-6 text-xs">
        {/* URL Banner */}
        <div className="p-4 bg-stone-50/80 rounded-lg border border-stone-200/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-stone-500">Seu Link Exclusivo</span>
            <p className="font-mono font-bold text-xs text-navy-950 mt-0.5">
              habitat.com.br/corretor/{broker.slug}
            </p>
          </div>
          <span className="text-emerald-800 bg-emerald-50 border border-emerald-200 text-[9px] px-2.5 py-1 rounded-sm font-semibold uppercase tracking-wider">
            Página Ativa
          </span>
        </div>

        {/* Basic Professional info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-stone-700 block mb-1">Nome de Exibição</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-sm focus:outline-none focus:border-navy-950"
            />
          </div>
          <div>
            <label className="font-semibold text-stone-700 block mb-1">Registro CRECI</label>
            <input
              type="text"
              value={creci}
              onChange={(e) => setCreci(e.target.value)}
              className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-sm focus:outline-none focus:border-navy-950"
            />
          </div>
        </div>

        {/* Imagery: Photo & Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="font-semibold text-stone-700 block mb-1 flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5 text-gold-600" />
              URL da Foto de Perfil
            </label>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-sm focus:outline-none focus:border-navy-950"
            />
          </div>
          <div>
            <label className="font-semibold text-stone-700 block mb-1 flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5 text-gold-600" />
              URL do Banner de Capa
            </label>
            <input
              type="text"
              value={bannerUrl}
              onChange={(e) => setBannerUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-sm focus:outline-none focus:border-navy-950"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="font-semibold text-stone-700 block mb-1">
            Biografia de Apresentação
          </label>
          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-3 bg-stone-50/60 border border-stone-200 rounded-sm text-xs resize-none focus:outline-none focus:border-navy-950"
          />
        </div>

        {/* Contact info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-stone-700 block mb-1">
              Telefone Exibido
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-sm focus:outline-none focus:border-navy-950"
            />
          </div>
          <div>
            <label className="font-semibold text-stone-700 block mb-1">
              WhatsApp (com DDD)
            </label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-sm focus:outline-none focus:border-navy-950"
            />
          </div>
        </div>

        {/* Social Links (Requirement 19) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-stone-700 block mb-1">Instagram</label>
            <input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-sm focus:outline-none focus:border-navy-950"
            />
          </div>
          <div>
            <label className="font-semibold text-stone-700 block mb-1">LinkedIn</label>
            <input
              type="text"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-sm focus:outline-none focus:border-navy-950"
            />
          </div>
        </div>

        {/* Regions */}
        <div>
          <label className="font-semibold text-stone-700 block mb-1">
            Regiões Atendidas (separadas por vírgula)
          </label>
          <input
            type="text"
            value={regions}
            onChange={(e) => setRegions(e.target.value)}
            className="w-full p-2.5 bg-stone-50/60 border border-stone-200 rounded-sm focus:outline-none focus:border-navy-950"
          />
        </div>

        {/* Theme palette (Requirement 19) */}
        <div>
          <label className="font-semibold text-stone-700 block mb-2 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-gold-600" />
            Paleta / Tema de Cores da Vitrine
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: "#0A192F", label: "Navy Blue Clássico" },
              { id: "#0F2942", label: "Midnight Blue" },
              { id: "#1E293B", label: "Slate Minimal" },
              { id: "#0F172A", label: "Modern Noir" },
            ].map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => setThemeColor(theme.id)}
                className={`p-3 rounded-sm border flex items-center gap-2 transition text-left ${
                  themeColor === theme.id
                    ? "border-navy-950 bg-navy-50/60 ring-1 ring-navy-950 font-bold"
                    : "border-stone-200 bg-white hover:bg-stone-50"
                }`}
              >
                <span
                  style={{ backgroundColor: theme.id }}
                  className="w-4 h-4 rounded-full border border-white shadow-xs shrink-0"
                />
                <span className="text-[11px] truncate">{theme.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-4 border-t border-stone-100 flex justify-end">
          <button
            type="submit"
            className="bg-navy-950 hover:bg-navy-900 text-white font-semibold text-[11px] uppercase tracking-wider py-3 px-8 rounded-sm shadow-sm transition"
          >
            Salvar e Atualizar Vitrine
          </button>
        </div>
      </form>
    </div>
  );
}
