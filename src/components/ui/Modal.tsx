"use client";

import { useEffect, ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
}

const maxWidthMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
};

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = "lg",
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className={`bg-white rounded-xl w-full ${maxWidthMap[maxWidth]} flex flex-col shadow-luxury overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-stone-200/90`}
      >
        {/* Header */}
        {(title || subtitle) && (
          <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
            <div>
              {title && (
                <h3 className="font-serif font-semibold text-xl text-navy-950">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs text-slate-500 mt-0.5 font-light">{subtitle}</p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[80vh]">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
