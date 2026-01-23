"use client"

import {
    ChevronLeft,
    Camera,
    User,
    ChevronRight,
    Image,
    Star,
    MessageCircle,
    Bell,
    CreditCard,
    Lock,
    Shield,
    LogOut
} from "lucide-react"
import { CapsuleNav } from "@/components/barber/capsule-nav"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
    const router = useRouter()

    return (
        <div className="relative min-h-screen bg-background text-foreground pb-32 max-w-[480px] mx-auto overflow-x-hidden">
            {/* Top Navigation Bar */}
            <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
                <div className="flex items-center p-4 pb-2 justify-between">
                    <Link href="/barber" className="text-primary flex size-10 items-center justify-center rounded-full hover:bg-muted transition-colors">
                        <ChevronLeft size={24} />
                    </Link>
                    <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Ajustes</h2>
                </div>
            </div>

            <main className="px-4 pb-32">
                {/* Profile Header Section */}
                <div className="mt-4 mb-8">
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className="relative group">
                            <div
                                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-24 w-24 border-2 border-primary/20"
                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBDtR-4lLxcR_utAuTKJa1k-fDJmTZOHQ6YwxSR5QxhvXTNRnGDnT0VedcViDXeJ73GRXRLnGcVgtqb1oZqFAvb8B4FJeRpmGTDlyLtH7LCgQZyxKR_fwMNAGLBanSQPyYlEFjRXicxK_-7J52aUX5UU_30aQRHpoUgYDqCBpHaAJlKhvvQbHi38_j6e-2QJoLYlkLW5c5zsvDa5xJrotrwadX_778ODHD650Mzva48qAb5Z-mnzJnMSaXw4BdXK8J_-A8dd0eJwn0")' }}
                            />
                            <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1.5 border-2 border-background">
                                <Camera className="text-white" size={16} />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-bold tracking-tight">Carlos Oliveira</h1>
                            <p className="text-muted-foreground text-sm font-medium">Especialista em Fade & Barba</p>
                            <p className="text-primary text-xs font-semibold mt-1">Barbearia Premium</p>
                        </div>
                    </div>
                </div>

                {/* Section: Perfil Profissional */}
                <div className="mb-6">
                    <h3 className="text-muted-foreground text-[11px] uppercase tracking-wider font-bold px-4 mb-2">Perfil Profissional</h3>
                    <div className="bg-card rounded-xl overflow-hidden divide-y divide-border border border-border/50">
                        <div className="flex items-center gap-4 px-4 py-3.5 active:bg-muted/50 transition-colors cursor-pointer">
                            <div className="text-white flex items-center justify-center rounded-lg bg-blue-500 shrink-0 size-8">
                                <User size={20} />
                            </div>
                            <p className="text-[16px] font-normal flex-1">Editar Informações</p>
                            <ChevronRight className="text-muted-foreground" size={20} />
                        </div>
                        <div className="flex items-center gap-4 px-4 py-3.5 active:bg-muted/50 transition-colors cursor-pointer">
                            <div className="text-white flex items-center justify-center rounded-lg bg-purple-500 shrink-0 size-8">
                                <Image size={20} />
                            </div>
                            <p className="text-[16px] font-normal flex-1">Meu Portfólio</p>
                            <ChevronRight className="text-muted-foreground" size={20} />
                        </div>
                        <div className="flex items-center gap-4 px-4 py-3.5 active:bg-muted/50 transition-colors cursor-pointer">
                            <div className="text-white flex items-center justify-center rounded-lg bg-orange-500 shrink-0 size-8">
                                <Star size={20} />
                            </div>
                            <p className="text-[16px] font-normal flex-1">Avaliações</p>
                            <ChevronRight className="text-muted-foreground" size={20} />
                        </div>
                    </div>
                </div>

                {/* Section: Notificações */}
                <div className="mb-6">
                    <h3 className="text-muted-foreground text-[11px] uppercase tracking-wider font-bold px-4 mb-2">Notificações</h3>
                    <div className="bg-card rounded-xl overflow-hidden divide-y divide-border border border-border/50">
                        <div className="flex items-center gap-4 px-4 py-3.5">
                            <div className="text-white flex items-center justify-center rounded-lg bg-green-500 shrink-0 size-8">
                                <MessageCircle size={20} />
                            </div>
                            <p className="text-[16px] font-normal flex-1">WhatsApp de Agendamento</p>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                        <div className="flex items-center gap-4 px-4 py-3.5">
                            <div className="text-white flex items-center justify-center rounded-lg bg-primary shrink-0 size-8">
                                <Bell size={20} />
                            </div>
                            <p className="text-[16px] font-normal flex-1">Notificações Push</p>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Section: Segurança & Financeiro */}
                <div className="mb-6">
                    <h3 className="text-muted-foreground text-[11px] uppercase tracking-wider font-bold px-4 mb-2">Financeiro & Segurança</h3>
                    <div className="bg-card rounded-xl overflow-hidden divide-y divide-border border border-border/50">
                        <div className="flex items-center gap-4 px-4 py-3.5 active:bg-muted/50 transition-colors cursor-pointer">
                            <div className="text-white flex items-center justify-center rounded-lg bg-emerald-500 shrink-0 size-8">
                                <CreditCard size={20} />
                            </div>
                            <p className="text-[16px] font-normal flex-1">Métodos de Recebimento</p>
                            <ChevronRight className="text-muted-foreground" size={20} />
                        </div>
                        <div className="flex items-center gap-4 px-4 py-3.5 active:bg-muted/50 transition-colors cursor-pointer">
                            <div className="text-white flex items-center justify-center rounded-lg bg-slate-500 shrink-0 size-8">
                                <Lock size={20} />
                            </div>
                            <p className="text-[16px] font-normal flex-1">Alterar Senha</p>
                            <ChevronRight className="text-muted-foreground" size={20} />
                        </div>
                        <div className="flex items-center gap-4 px-4 py-3.5 active:bg-muted/50 transition-colors cursor-pointer">
                            <div className="text-white flex items-center justify-center rounded-lg bg-pink-500 shrink-0 size-8">
                                <Shield size={20} />
                            </div>
                            <p className="text-[16px] font-normal flex-1">Privacidade</p>
                            <ChevronRight className="text-muted-foreground" size={20} />
                        </div>
                    </div>
                </div>

                {/* Exit Button */}
                <button
                    onClick={() => router.push("/login")}
                    className="w-full mt-4 bg-card rounded-xl py-4 flex items-center justify-center gap-2 active:bg-muted/50 transition-colors border border-border/50"
                >
                    <LogOut className="text-destructive" size={20} />
                    <span className="text-destructive font-bold">Sair da Conta</span>
                </button>
                <p className="text-center text-muted-foreground text-xs mt-8 mb-4">Versão 2.4.1 (Build 492)</p>
            </main>

            <CapsuleNav />
        </div>
    )
}
