"use client"

import {
    ChevronLeft,
    Calendar,
    TrendingUp,
    Scissors,
    UserPlus,
    DollarSign,
    ChevronRight,
    Lightbulb
} from "lucide-react"
import { CapsuleNav } from "@/components/barber/capsule-nav"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function ReportsPage() {
    return (
        <div className="relative min-h-screen bg-background text-foreground pb-32 max-w-[480px] mx-auto overflow-x-hidden">
            {/* Top App Bar */}
            <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md px-4 pt-12 pb-4 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-4">
                    <Link href="/barber" className="cursor-pointer">
                        <ChevronLeft size={24} />
                    </Link>
                    <h2 className="text-lg font-semibold tracking-tight">Relatórios</h2>
                </div>
                <div className="bg-muted rounded-full p-2">
                    <Calendar className="text-primary" size={20} />
                </div>
            </div>

            {/* Main Content Container */}
            <main className="px-4">
                {/* Headline Section: Total Revenue */}
                <section className="mt-6 flex flex-col items-center">
                    <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest mb-1">Faturamento Total</p>
                    <h1 className="text-5xl font-extrabold tracking-tighter">R$ 4.250,00</h1>
                    <div className="mt-2 flex items-center gap-1 bg-green-500/10 px-3 py-1 rounded-full">
                        <TrendingUp className="text-green-500" size={14} />
                        <span className="text-green-500 text-xs font-bold">+12.5% este mês</span>
                    </div>
                </section>

                {/* Segmented Control */}
                <div className="mt-8 flex bg-muted p-1 rounded-full">
                    <button className="flex-1 py-2 text-sm font-semibold rounded-full bg-background text-foreground shadow-sm">Semana</button>
                    <button className="flex-1 py-2 text-sm font-semibold rounded-full text-muted-foreground hover:text-foreground transition-colors">Mês</button>
                    <button className="flex-1 py-2 text-sm font-semibold rounded-full text-muted-foreground hover:text-foreground transition-colors">Ano</button>
                </div>

                {/* Charts Section: Appointments */}
                <section className="mt-10 bg-card rounded-3xl p-6 border border-border">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <p className="text-muted-foreground text-xs font-bold uppercase tracking-wider">Agendamentos</p>
                            <h3 className="text-3xl font-bold">142</h3>
                        </div>
                        <div className="text-right">
                            <p className="text-primary text-xs font-bold">Média: 20/dia</p>
                        </div>
                    </div>
                    <div className="flex items-end justify-between h-40 gap-2">
                        {/* Bars */}
                        {[
                            { day: "SEG", height: "40%" },
                            { day: "TER", height: "55%" },
                            { day: "QUA", height: "35%" },
                            { day: "QUI", height: "85%" },
                            { day: "SEX", height: "100%" },
                            { day: "SAB", height: "90%" },
                            { day: "DOM", height: "15%", muted: true }
                        ].map((bar, i) => (
                            <div key={i} className="flex flex-col items-center flex-1 gap-2">
                                <div
                                    className={cn("w-full rounded-t-lg transition-all duration-500 hover:opacity-80", bar.muted ? "bg-primary/30" : "bg-primary")}
                                    style={{ height: bar.height }}
                                ></div>
                                <span className="text-[10px] font-bold text-muted-foreground">{bar.day}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Stats Grid */}
                <section className="mt-6 grid grid-cols-2 gap-4">
                    {/* Card 1 */}
                    <div className="bg-card rounded-3xl p-5 flex flex-col justify-between h-36 border border-border">
                        <div className="flex justify-between items-start">
                            <Scissors className="text-primary" size={24} />
                            <span className="text-green-500 text-[10px] font-bold">+8%</span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold">186</p>
                            <p className="text-muted-foreground text-xs font-medium">Total de Cortes</p>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="bg-card rounded-3xl p-5 flex flex-col justify-between h-36 border border-border">
                        <div className="flex justify-between items-start">
                            <UserPlus className="text-primary" size={24} />
                            <span className="text-green-500 text-[10px] font-bold">+24</span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold">42</p>
                            <p className="text-muted-foreground text-xs font-medium">Novos Clientes</p>
                        </div>
                    </div>
                    {/* Card 3: Wide */}
                    <div className="col-span-2 bg-card rounded-3xl p-5 flex items-center justify-between border border-border group cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="bg-primary/20 p-3 rounded-2xl text-primary">
                                <DollarSign size={24} />
                            </div>
                            <div>
                                <p className="font-bold text-lg">R$ 1.840,00</p>
                                <p className="text-muted-foreground text-xs font-medium">Faturamento Semanal</p>
                            </div>
                        </div>
                        <ChevronRight className="text-muted-foreground group-hover:text-foreground transition-colors" size={24} />
                    </div>
                </section>

                {/* Insights */}
                <section className="mt-8 mb-10">
                    <h4 className="text-lg font-bold mb-4">Destaques da Semana</h4>
                    <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex gap-4">
                        <Lightbulb className="text-primary shrink-0" size={24} />
                        <p className="text-sm text-primary/90 leading-relaxed font-medium">
                            Sua maior demanda ocorre às sextas-feiras. Considere abrir horários extras das 18h às 20h.
                        </p>
                    </div>
                </section>
            </main>

            <CapsuleNav />
        </div>
    )
}
