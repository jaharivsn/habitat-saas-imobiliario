"use client";

import { useState, useEffect } from "react";
import { Heart, Share2, Check } from "lucide-react";

interface PropertyHeaderActionsProps {
  propertyId: string;
  propertyTitle: string;
}

export default function PropertyHeaderActions({
  propertyId,
  propertyTitle,
}: PropertyHeaderActionsProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("habitat_favorites");
      if (saved) {
        const favs = JSON.parse(saved) as string[];
        setIsFavorited(favs.includes(propertyId));
      }
    } catch {}
  }, [propertyId]);

  const toggleFavorite = () => {
    try {
      const saved = localStorage.getItem("habitat_favorites");
      let favs: string[] = saved ? JSON.parse(saved) : [];
      if (favs.includes(propertyId)) {
        favs = favs.filter((id) => id !== propertyId);
        setIsFavorited(false);
      } else {
        favs.push(propertyId);
        setIsFavorited(true);
      }
      localStorage.setItem("habitat_favorites", JSON.stringify(favs));
    } catch {}
  };

  const handleShare = async () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: propertyTitle,
          text: `Confira este imóvel no Habitat: ${propertyTitle}`,
          url,
        });
        return;
      } catch {}
    }
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleShare}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700">Link Copiado!</span>
          </>
        ) : (
          <>
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Compartilhar</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={toggleFavorite}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
          isFavorited
            ? "border-rose-200 bg-rose-50 text-rose-600 font-bold"
            : "border-slate-200 hover:bg-slate-50 text-slate-700"
        }`}
      >
        <Heart
          className={`w-3.5 h-3.5 ${
            isFavorited ? "fill-rose-600 text-rose-600" : "text-slate-500"
          }`}
        />
        <span>{isFavorited ? "Salvo" : "Favoritar"}</span>
      </button>
    </div>
  );
}
