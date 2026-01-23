"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Calendar, Users, DollarSign, Clock, Settings } from "lucide-react"
import { CapsuleNav } from "@/components/barber/capsule-nav"
import { useRouter } from "next/navigation"

export default function BarberDashboard() {
    const router = useRouter()
    return (
        <div className="min-h-screen bg-background p-6">
            <header className="flex items-center justify-between mb-8 max-w-6xl mx-auto">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Painel do Profissional</h1>
                    <p className="text-muted-foreground">Gerencie seus horários e clientes.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                        <Settings size={18} />
                    </Button>
                    <Button>
                        Ver Agenda Completa
                    </Button>
                </div>
            </header>

            <main className="max-w-6xl mx-auto space-y-8">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-primary/5 border-primary/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Faturamento do Dia</CardTitle>
                            <DollarSign className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">R$ 450,00</div>
                            <p className="text-xs text-muted-foreground">+20.1% que ontem</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Agendamentos</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-muted-foreground">4 Pendentes</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Novos Clientes</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+3</div>
                            <p className="text-xs text-muted-foreground">Essa semana</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Agenda e Próximos */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-lg font-semibold">Próximos Clientes</h2>
                        {[1, 2, 3, 4].map((i) => (
                            <Card key={i} className="hover:bg-muted/50 transition-colors">
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-bold">
                                            LC
                                        </div>
                                        <div>
                                            <p className="font-semibold">Lucas Cliente</p>
                                            <p className="text-sm text-muted-foreground">Corte + Barba</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 font-medium">
                                            <Clock size={14} className="text-primary" /> 15:30
                                        </div>
                                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Confirmado</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-4">Acesso Rápido</h2>
                        <Card>
                            <CardContent className="p-4 flex flex-col gap-2">
                                <Button variant="ghost" className="justify-start" onClick={() => router.push("/barber/services")}>
                                    Configurar Serviços
                                </Button>
                                <Button variant="ghost" className="justify-start" onClick={() => router.push("/barber/availability")}>
                                    Horários de Funcionamento
                                </Button>
                                <Button variant="ghost" className="justify-start" onClick={() => router.push("/barber/reports")}>
                                    Relatórios
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <CapsuleNav />
        </div>
    )
}
