"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminHeader from "@/components/layout/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof document !== "undefined") {
      const hasSession = document.cookie.split(";").some((c) => c.trim().startsWith("habitat_session="));
      if (!hasSession) {
        router.replace(`/entrar?next=${encodeURIComponent(pathname)}`);
      }
    }
  }, [pathname, router]);
  return (
    <div className="min-h-screen bg-[#0A0E17] text-slate-100 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto bg-[#070A10]">
          {children}
        </main>
      </div>
    </div>
  );
}
