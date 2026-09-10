"use client";

import { useEffect, ReactNode } from "react";
import { X } from "lucide-react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  position?: "left" | "right";
  width?: string;
}

export default function Drawer({
  isOpen,
  onClose,
  title,
  children,
  position = "right",
  width = "max-w-md",
}: DrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-navy-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`fixed inset-y-0 ${
          position === "right" ? "right-0" : "left-0"
        } w-full ${width} bg-white shadow-2xl flex flex-col animate-in ${
          position === "right" ? "slide-in-from-right" : "slide-in-from-left"
        } duration-300`}
      >
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          {title && (
            <h3 className="font-serif font-bold text-lg text-navy-950">
              {title}
            </h3>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
