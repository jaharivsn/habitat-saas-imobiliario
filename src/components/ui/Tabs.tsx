"use client";

import { ReactNode } from "react";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ComponentType<{ className?: string }>;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: "pills" | "underlined";
  className?: string;
}

export default function Tabs({
  tabs,
  activeTab,
  onChange,
  variant = "pills",
  className = "",
}: TabsProps) {
  if (variant === "underlined") {
    return (
      <div className={`flex items-center gap-6 border-b border-slate-200 overflow-x-auto ${className}`}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`flex items-center gap-2 pb-3 text-xs font-bold transition whitespace-nowrap border-b-2 -mb-px ${
                isActive
                  ? "border-navy-900 text-navy-900"
                  : "border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300"
              }`}
            >
              {Icon && <Icon className="w-4 h-4" />}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive ? "bg-navy-900 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1.5 overflow-x-auto ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-sm text-[11px] font-semibold uppercase tracking-wider transition whitespace-nowrap ${
              isActive
                ? "bg-navy-950 text-gold-300 shadow-subtle border border-navy-950"
                : "bg-white border border-stone-200/90 text-slate-600 hover:bg-stone-50 hover:text-navy-950"
            }`}
          >
            {Icon && <Icon className="w-3.5 h-3.5" />}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`px-1.5 py-0.5 rounded-sm text-[9px] font-semibold tracking-wider ${
                  isActive ? "bg-gold-500 text-navy-950" : "bg-stone-100 text-slate-600"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
