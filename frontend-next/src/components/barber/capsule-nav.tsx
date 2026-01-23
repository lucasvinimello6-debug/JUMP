"use client"

import { Calendar, Users, Scissors, Activity, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function CapsuleNav() {
    const pathname = usePathname()

    const navItems = [
        {
            icon: Calendar,
            label: "Agenda",
            href: "/barber",
            active: pathname === "/barber"
        },
        {
            icon: Users,
            label: "Clientes",
            href: "/barber/clients",
            active: pathname === "/barber/clients"
        },
        {
            icon: Scissors,
            label: "Serviços",
            href: "/barber/services",
            active: pathname === "/barber/services"
        },
        {
            icon: Activity,
            label: "Relatórios",
            href: "/barber/reports",
            active: pathname === "/barber/reports"
        },
        {
            icon: Settings,
            label: "Ajustes",
            href: "/barber/settings",
            active: pathname === "/barber/settings"
        }
    ]

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[85%] max-w-[340px] z-40">
            <div className="bg-[#1b1f27]/90 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-2xl">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex flex-col items-center gap-1 group relative"
                    >
                        <item.icon
                            size={24}
                            className={cn(
                                "transition-colors duration-200",
                                item.active ? "text-primary fill-current" : "text-[#9ca6ba]"
                            )}
                        />
                        {item.active && (
                            <div className="absolute -bottom-2 w-1 h-1 bg-primary rounded-full" />
                        )}
                    </Link>
                ))}
            </div>
        </div>
    )
}
