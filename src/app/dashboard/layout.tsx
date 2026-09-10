"use client";

import { useState } from "react";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { X } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-10 w-64 bg-navy-950 flex flex-col">
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute top-4 right-4 text-white p-2 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
            <DashboardSidebar />
          </div>
        </div>
      )}

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
