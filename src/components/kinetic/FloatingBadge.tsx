"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingBadgeProps {
  children: React.ReactNode;
  variant?: "luxury" | "operation" | "mineral" | "navy" | "gold";
  active?: boolean;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md";
}

export default function FloatingBadge({
  children,
  variant = "mineral",
  active = false,
  onClick,
  className,
  size = "md",
}: FloatingBadgeProps) {
  const variantStyles = {
    mineral: active
      ? "bg-stone-900 text-white border-stone-900 shadow-sm"
      : "bg-stone-50/90 text-stone-700 border-stone-200/80 hover:bg-white hover:border-stone-400 hover:text-stone-950",
    luxury: active
      ? "bg-navy-950 text-gold-300 border-navy-900 shadow-sm"
      : "bg-stone-900/90 text-stone-100 border-stone-800 hover:bg-stone-950 hover:border-gold-500/40",
    operation: active
      ? "bg-navy-900 text-white border-navy-900"
      : "bg-white/95 text-slate-700 border-stone-200/90 hover:border-navy-600 hover:text-navy-950",
    navy: active
      ? "bg-navy-900 text-white border-navy-900"
      : "bg-navy-950/80 text-navy-100 border-navy-800 hover:bg-navy-900 hover:border-navy-700",
    gold: active
      ? "bg-gold-500 text-navy-950 border-gold-400"
      : "bg-gold-50 text-gold-800 border-gold-200 hover:bg-gold-100/80 hover:border-gold-300",
  };

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-[11px] tracking-wider uppercase font-medium",
    md: "px-3.5 py-1.5 text-xs tracking-wide font-normal",
  };

  const Component = onClick ? motion.button : motion.span;

  return (
    <Component
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 450,
        damping: 24,
      }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border backdrop-blur-md transition-colors select-none",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {children}
    </Component>
  );
}
