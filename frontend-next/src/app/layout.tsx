import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastProvider } from "@/hooks/use-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JUMP - Agendamentos de Barbershop",
  description: "SaaS moderno para barbearias.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} antialiased bg-background text-foreground min-h-screen selection:bg-primary selection:text-white`}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
