"use client"

import { ChevronLeft, PlusCircle } from "lucide-react"
import { CapsuleNav } from "@/components/barber/capsule-nav"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function AvailabilityPage() {
    const [days, setDays] = useState([
        { id: 1, name: "Segunda-feira", active: true, intervals: [{ start: "09:00", end: "18:00", label: "Expediente" }] },
        {
            id: 2, name: "Terça-feira", active: true, intervals: [
                { start: "08:00", end: "12:00", label: "Manhã" },
                { start: "12:00", end: "13:30", label: "Intervalo Almoço", type: "break" },
                { start: "13:30", end: "19:00", label: "Tarde" }
            ]
        },
        { id: 3, name: "Quarta-feira", active: false, intervals: [] },
        { id: 4, name: "Quinta-feira", active: true, short: "09:00 - 18:00", intervals: [{ start: "09:00", end: "18:00" }] },
        { id: 5, name: "Sexta-feira", active: true, short: "09:00 - 18:00", intervals: [{ start: "09:00", end: "18:00" }] },
        { id: 6, name: "Sábado", active: true, short: "08:00 - 14:00", intervals: [{ start: "08:00", end: "14:00" }] },
        { id: 0, name: "Domingo", active: false, short: "Fechado", intervals: [] },
    ])

    const toggleDay = (id: number) => {
        setDays(days.map(day => day.id === id ? { ...day, active: !day.active } : day))
    }

    return (
        <div className="relative min-h-screen bg-background text-foreground pb-32 max-w-[480px] mx-auto overflow-x-hidden">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-4">
                    <Link href="/barber" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                        <ChevronLeft size={20} />
                    </Link>
                    <h1 className="text-lg font-bold tracking-tight">Horários de Funcionamento</h1>
                </div>
                <button className="text-primary font-semibold text-sm hover:text-primary/80 transition-colors">Salvar</button>
            </header>

            {/* Main Content */}
            <main className="flex-1 px-4 mt-6 space-y-6">

                {/* Expanded Sections (Mon, Tue, Wed) */}
                {days.slice(0, 3).map((day) => (
                    <div key={day.id} className={cn("bg-card rounded-xl overflow-hidden border border-border", !day.active && "opacity-60")}>
                        <div className="flex items-center justify-between px-4 py-4 border-b border-border/50">
                            <span className="font-medium text-base">{day.name}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={day.active}
                                    onChange={() => toggleDay(day.id)}
                                    className="sr-only peer"
                                />
                                <div className="w-12 h-7 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>

                        {day.active ? (
                            <div className="p-4 space-y-4">
                                {day.intervals.map((interval, idx) => (
                                    <div key={idx} className={cn("flex items-center justify-between bg-muted/50 rounded-lg px-4 py-3", interval.type === 'break' && "border border-primary/20")}>
                                        <span className={cn("text-sm", interval.type === 'break' ? "text-primary/80 font-medium" : "text-muted-foreground")}>
                                            {interval.label}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">{interval.start}</span>
                                            <span className="text-muted-foreground">—</span>
                                            <span className="text-sm font-medium">{interval.end}</span>
                                        </div>
                                    </div>
                                ))}
                                <button className="flex items-center gap-2 text-primary text-sm font-medium pt-1 hover:text-primary/80 transition-colors">
                                    <PlusCircle size={18} />
                                    Adicionar Intervalo
                                </button>
                            </div>
                        ) : (
                            <div className="px-4 pb-4 pt-2">
                                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Fechado</p>
                            </div>
                        )}
                    </div>
                ))}

                {/* Summary List (Thu - Sun) */}
                <div className="bg-card rounded-xl overflow-hidden border border-border">
                    <div className="divide-y divide-border/50">
                        {days.slice(3).map((day) => (
                            <div key={day.id} className="flex items-center justify-between px-4 py-4">
                                <span className="font-medium">{day.name}</span>
                                <div className="flex items-center gap-3">
                                    <span className={cn("text-xs", day.active ? "text-muted-foreground" : "text-muted-foreground")}>
                                        {day.active ? day.short : "Fechado"}
                                    </span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={day.active}
                                            onChange={() => toggleDay(day.id)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-12 h-7 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </main>

            <CapsuleNav />
        </div>
    )
}
