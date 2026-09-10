import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import RoleSwitcherBar from "@/components/shared/RoleSwitcherBar";

export const metadata: Metadata = {
  title: "Habitat | Private Real Estate & Boutique SaaS",
  description:
    "Curadoria editorial de residências singulares, mansões em condomínios fechados e plataforma SaaS completa para corretores e imobiliárias de alta performance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#FAF9F6] text-slate-900 flex flex-col font-sans selection:bg-navy-950 selection:text-gold-300">
        <AuthProvider>
          {children}
          <RoleSwitcherBar />
        </AuthProvider>
      </body>
    </html>
  );
}


