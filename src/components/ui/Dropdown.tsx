"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export interface DropdownOption {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface DropdownProps {
  options: DropdownOption[];
  selectedId: string;
  onChange: (id: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

export default function Dropdown({
  options,
  selectedId,
  onChange,
  label,
  placeholder = "Selecione uma opção",
  className = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.id === selectedId);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative text-xs ${className}`}>
      {label && (
        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 pl-1">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 hover:bg-slate-100 transition focus:outline-none focus:border-navy-900"
      >
        <div className="flex items-center gap-2 truncate">
          {selectedOption?.icon && <selectedOption.icon className="w-4 h-4 text-slate-500 shrink-0" />}
          <span className="truncate">{selectedOption?.label || placeholder}</span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-40 max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
          {options.map((opt) => {
            const isSelected = opt.id === selectedId;
            const Icon = opt.icon;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  onChange(opt.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3.5 py-2 text-left transition ${
                  isSelected
                    ? "bg-navy-50 text-navy-900 font-bold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {Icon && <Icon className="w-4 h-4 text-slate-500 shrink-0" />}
                <span className="truncate">{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
