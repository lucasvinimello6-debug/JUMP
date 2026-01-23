"use client"

import { ChevronLeft, MoreHorizontal, Edit2, Plus } from "lucide-react"
import { CapsuleNav } from "@/components/barber/capsule-nav"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const services = [
    {
        id: 1,
        name: "Corte",
        duration: "30 min",
        price: "R$ 45,00",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDh6F0eXAFrnpyHuTOmrknK0pceuGZpEZCymqP1YYIkmF5zIgSWcl1wN2RQaUyXV0RQkoBpsF0kmYg1YhtkLgEitv8Q2BqLm7x2k9RMh-Hk22My3wyy92aGfc3O_9PbTuG4NHvpd_DEpcETSm4K9h920E-88xvhq3WTnTn8dXE76uAV8uTY5CViHWw4yC3-pIi5aPiO8k0hM8SLGdiVpb7k44PAUndEQACHWZw_dUjmrvgv1eE5pa6R1kAfm7kwRLV49DPwOKnPPsA"
    },
    {
        id: 2,
        name: "Barba",
        duration: "20 min",
        price: "R$ 30,00",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYff0DswWh3RsuYfO5mO8GKov_jtgitXJQYa_T5h7BxEE3fae7rWk84uTApgJuP52LMkZ2zW9_dMRF013xrhZQjqm6fIwBh_QuUvb6oBEqP28zUKy3obSCN0QvkVpzsyz1JIXweaikkr-ZwwaFGCeeKxGXiMm-NS0L5d3FDA9B5xI48qZ9x52z9-pfG7Y3WgqSjot_gN2OE_T2ba7VNY8KLMUoUTdhPHzuyf_b9RzCw1RDsyMfDcXPZ4OLm-uCnaW0ktFdncXAphs"
    },
    {
        id: 3,
        name: "Combo Premium",
        duration: "60 min",
        price: "R$ 100,00",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBw6xpNlOJqH43w-bGm4XyNWsgH1h5XysRu3Sbfu1W1lWIOV5ONprkTYuQfAvSKwR3byXIY8HB7Si1p1uj-uNNLG7vOpIhs8bY5VA9g_sUunkLg_8ZzqJX7yG8mZj57S8kQoRhNDkzZOoccBTMxZcZrFb9DEvT1UeoiLCWk3mWUeS9S4xyo-U3I6zzVzEtYl9LanS41115ZY3bROLRSL4B9bJr8ajPFczyeMQEHtzMYnTDehnxtF7D7EGW2Ay9uBRoHdz1j3R4shSI"
    },
    {
        id: 4,
        name: "Sobrancelha",
        duration: "15 min",
        price: "R$ 20,00",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAQdWm86xRGVp5YliIMsxybioRZLcpr9rLlOoLON_jUdLKUyU1K2ekyPQ_a7LFIeMmtzPWLByjpOJozukKr53NH1TK24D-zqlfYw1SrAgH4KbmX6Zodvf4Msb2CEMk5QKTL3A_FRmJdysbxWa5b-IzfqKXsDJAITvPjnarGXW4ot9eGZ3_3QHHpCKBfD78Qp6DfBGSIyF4R5Ekctk0zSRp3uUXkbtUARFFk75xKggIJ05qb6tleqEm29mRtV_BhxmMu_NQtuRq8G4"
    }
]

export default function ServicesPage() {
    return (
        <div className="relative min-h-screen bg-background text-foreground pb-32 max-w-[480px] mx-auto overflow-x-hidden">
            {/* TopAppBar */}
            <div className="sticky top-0 z-20 flex items-center bg-background/80 backdrop-blur-md p-4 pb-4 justify-between border-b border-white/5">
                <div className="flex size-12 shrink-0 items-center justify-start">
                    <Link href="/barber" className="cursor-pointer">
                        <ChevronLeft size={24} />
                    </Link>
                </div>
                <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">Configurar Serviços</h2>
                <div className="flex w-12 items-center justify-end">
                    <button className="flex items-center justify-center rounded-full h-12 w-12 bg-transparent">
                        <MoreHorizontal size={24} />
                    </button>
                </div>
            </div>

            {/* SectionHeader */}
            <div className="px-6 pt-6 pb-2">
                <h3 className="text-muted-foreground text-xs font-semibold uppercase tracking-widest">Serviços Cadastrados</h3>
            </div>

            {/* Cards List */}
            <div className="flex flex-col gap-3 px-4">
                {services.map((service) => (
                    <div key={service.id} className="squircle-radius bg-white/5 border border-white/10 p-4 flex items-center justify-between backdrop-blur-md">
                        <div className="flex items-center gap-4 flex-1">
                            <div
                                className="w-16 h-16 rounded-2xl bg-cover bg-center shrink-0 border border-white/5"
                                style={{ backgroundImage: `url("${service.image}")` }}
                            />
                            <div className="flex flex-col">
                                <p className="text-base font-bold">{service.name}</p>
                                <p className="text-muted-foreground text-sm font-normal">{service.duration}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <p className="text-primary text-base font-bold tracking-tight">{service.price}</p>
                            <button className="text-white/40 flex items-center hover:text-white transition-colors">
                                <Edit2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Floating Action Button */}
            <div className="fixed bottom-32 right-6 z-30">
                <button className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 transition-transform duration-200">
                    <Plus size={30} />
                </button>
            </div>

            <CapsuleNav />
        </div>
    )
}
