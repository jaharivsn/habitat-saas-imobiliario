import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminHeader from "@/components/layout/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
