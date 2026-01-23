"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Calendar, Plus, Scissors, Clock, MapPin } from "lucide-react"

export default function ClientDashboard() {
    return (
        <div className="min-h-screen bg-background p-6">
            <header className="flex items-center justify-between mb-8 max-w-5xl mx-auto">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Olá, Lucas 👋</h1>
                    <p className="text-muted-foreground">Aqui está sua agenda de cortes.</p>
                </div>
                <Button className="rounded-full shadow-lg gap-2">
                    <Plus size={18} /> Novo Agendamento
                </Button>
            </header>

            <main className="max-w-5xl mx-auto space-y-8">
                {/* Próximo Agendamento - Destaque */}
                <section>
                    <h2 className="text-lg font-semibold mb-4">Próximo Agendamento</h2>
                    <Card className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-card to-card border-primary/20">
                        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                                    <Calendar size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Corte + Barba</h3>
                                    <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                        <Clock size={14} /> <span>Hoje, 15:30</span>
                                        <span className="text-border">|</span>
                                        <Scissors size={14} /> <span>Com Marcos Barber</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 w-full md:w-auto">
                                <Button variant="outline" className="flex-1 bg-background/50">Reagendar</Button>
                                <Button variant="destructive" className="flex-1">Cancelar</Button>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Histórico */}
                <section>
                    <h2 className="text-lg font-semibold mb-4">Histórico Recente</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <Card key={i} className="bg-card/40 hover:bg-card/60 transition-colors">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <div className="p-2 rounded-xl bg-muted w-fit mb-2">
                                            <Scissors size={20} className="text-muted-foreground" />
                                        </div>
                                        <span className="text-xs font-medium bg-green-500/10 text-green-500 px-2 py-1 rounded-full">Concluído</span>
                                    </div>
                                    <CardTitle className="text-base">Corte Degradê</CardTitle>
                                    <CardDescription>15 Jan, 2024</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <MapPin size={14} /> <span>JUMP Barbershop</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}
