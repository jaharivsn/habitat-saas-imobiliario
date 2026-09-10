import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  phone: string;
  message?: string;
  label?: string;
  variant?: "solid" | "outline" | "floating";
  className?: string;
}

export default function WhatsAppButton({
  phone,
  message = "Olá, gostaria de saber mais informações.",
  label = "Falar no WhatsApp",
  variant = "solid",
  className = "",
}: WhatsAppButtonProps) {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  if (variant === "floating") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 z-40 bg-[#1D7F54] hover:bg-[#166B44] text-white p-3.5 rounded-full shadow-dropdown hover:scale-105 transition-all duration-300 flex items-center justify-center ${className}`}
        title={label}
        aria-label={label}
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    );
  }

  if (variant === "outline") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`border border-[#1D7F54] text-[#1D7F54] hover:bg-emerald-50/60 px-4 py-2.5 rounded-sm font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition ${className}`}
      >
        <MessageCircle className="w-4 h-4 text-[#1D7F54]" />
        <span>{label}</span>
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`bg-[#1D7F54] hover:bg-[#166B44] text-white font-semibold text-xs tracking-wider uppercase px-5 py-3 rounded-sm flex items-center justify-center gap-2 shadow-subtle transition ${className}`}
    >
      <MessageCircle className="w-4 h-4" />
      <span>{label}</span>
    </a>
  );
}
