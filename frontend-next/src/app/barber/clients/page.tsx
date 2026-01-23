"use client"

import { UserPlus, Filter, Search, MessageSquare } from "lucide-react"
import { CapsuleNav } from "@/components/barber/capsule-nav"
import { cn } from "@/lib/utils"

const clients = [
    {
        letter: "A",
        list: [
            {
                name: "Alexandre Silva",
                lastCut: "12 Out",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLdD7DV0eQIErUzr0geLC9xZ6NYv3CPvMjA6Ph_QbExjAIubQR4egVkmuZEeVi4fokDlEC_hwenZqBIHCTHFCNKyugaeCHYrcmpdztumhTK3MCBnUG_AHe3urrM2fMaW9htbaO3Uuf1chgdWWDDvH-ys-8Hx-ksljfsXXvspx2nyXPC40XbIi2oRGflw9RCnkk5kEWES_keox9A-4dCjsc1_4dtAoVSbZ-zTwY8ZFdi2i3gANf8nBm_Kj6cp65kvlx-CO_utql_H4"
            }
        ]
    },
    {
        letter: "B",
        list: [
            {
                name: "Bruno Oliveira",
                lastCut: "05 Out",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBI5wUEsb4wPbJvumraPmP_7Bcub7DR3xb_NgJH1AK9nWnU5-6KfxjeTxpJal4FgblstuOfO5W3Y6FOkc0fyfh0l2pExBKLMR3LvkOqGA7wTuiYYJZ-0iEP6CVSahF7FaA94O53I3PcWzL7frS0pl1LbtJxucbw8eQk5oTTQ_BF9O5nL75V9mPEFRk7FezOKrv4Kykd16BginLt4KPfeFuYLc-cF-swCqV3lu0lHkrKQwVHt6XH1H1STC4kNeOaX6zrA-sjR7y8b5U"
            }
        ]
    },
    {
        letter: "C",
        list: [
            {
                name: "Carlos Eduardo",
                lastCut: "28 Set",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-ZWbc6ohIGXDdNsAZkm-w0PnzOeUq_ewDO8LFm5PHmtQ3ZixDHrgezfb0yOz1viUoPv_5wHudWFAYhJ9IbfXizIKN0aavqNlRtehLu5v_YGFkapTTnnwMb7TgQR_Qd2DJo6ZgLPIIhAUB_fcle9WzAKZVr9tp1r1Qy0OLi4ciprQkBnL3tWGItcAMlcnLs7lZZzczAkzJ4qxa8GfQcabOI6icJBTh96-e6nUu1zrangp6AJCuExe-mFy55tYN32rkUSx6PD1JRCM"
            },
            {
                name: "Cristiano Ronaldo",
                lastCut: "25 Set",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJXyigRLl7g22k1hEUPQbB9ErG3r0EVYcikLwW3gVF2uM0aarFAhfrcygnxWvshvx-GmPU_AsVrc0qrKu64SYSmYczK8hHciBlaiPN7Bbhq57hzopd41ZMuU4ba-DmfXVsz4rTLTE3zQsFIrbVRhm81ExORSWIjlWvcT0mVwGNUkFLKfqj1QbmsJeFHRL387di-gw5x4JHfTG7I5GmHbn3GKhX0lA5zyhrx2sD4ENijjrF97BtJPKHpC2XwhsauSIs69nV3G48umM"
            }
        ]
    },
    {
        letter: "D",
        list: [
            {
                name: "Daniel Souza",
                lastCut: "15 Set",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ1gM6E8YKoVvwfQP6CZruOSKG-6FE4xh8ieATBPNKdKomKYanqQY2y1zfslmbwqu7YdK4yQoIB_5Tg9K8Fus_QKr0o2zgw7SAuFf5ZjFCgDoVWVfO-_8OqYiil3TAymubTnf9h942vrgs5l-ElIg7iDMzYpF9AS4wj2g6uN0lO9A7VLXkNagH-l-6OQzOa2s3STDKolWUE9R3101S-lxt7E86Z_t2PzAwV2mfAoHfTTbgvBfneZesks8qxaQ7GjuWWCEcIoDuNhE"
            }
        ]
    }
]

export default function ClientsPage() {
    return (
        <div className="relative min-h-screen bg-background text-foreground pb-32 max-w-[480px] mx-auto overflow-x-hidden">
            {/* Top Navigation Bar */}
            <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg px-4 pt-6 pb-2 border-b border-white/5">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold tracking-tight">Clientes</h1>
                    <div className="flex gap-3">
                        <button className="flex items-center justify-center size-10 rounded-full bg-muted text-foreground hover:bg-muted/80 transition-colors">
                            <UserPlus size={20} />
                        </button>
                        <button className="flex items-center justify-center size-10 rounded-full bg-muted text-foreground hover:bg-muted/80 transition-colors">
                            <Filter size={20} />
                        </button>
                    </div>
                </div>
                {/* Search Bar */}
                <div className="pb-2">
                    <label className="flex items-center h-12 w-full bg-muted/50 rounded-[1.5rem] px-4 focus-within:ring-1 focus-within:ring-primary/50 transition-all border border-white/5">
                        <Search className="text-muted-foreground mr-3" size={20} />
                        <input
                            className="bg-transparent border-none focus:ring-0 text-foreground placeholder:text-muted-foreground w-full text-base font-normal p-0 outline-none"
                            placeholder="Buscar por nome ou data..."
                            type="text"
                        />
                    </label>
                </div>
            </div>

            {/* Client List */}
            <main className="px-4 pt-4 pb-32 space-y-3">
                {clients.map((section) => (
                    <div key={section.letter} className="pt-2">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 ml-1">{section.letter}</p>
                        {section.list.map((client, index) => (
                            <div key={index} className={cn("glass-card flex items-center justify-between p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10", index !== section.list.length - 1 && "mb-3")}>
                                <div className="flex items-center gap-4">
                                    <div
                                        className="size-14 rounded-full border-2 border-primary/20 bg-center bg-no-repeat bg-cover"
                                        style={{ backgroundImage: `url("${client.image}")` }}
                                    />
                                    <div>
                                        <p className="text-base font-bold leading-tight">{client.name}</p>
                                        <p className="text-muted-foreground text-sm mt-0.5">Último corte: {client.lastCut}</p>
                                    </div>
                                </div>
                                <a
                                    className="flex items-center justify-center size-10 rounded-full bg-primary/20 text-primary hover:bg-primary hover:text-white transition-colors"
                                    href="#"
                                >
                                    <MessageSquare size={20} />
                                </a>
                            </div>
                        ))}
                    </div>
                ))}
            </main>

            <CapsuleNav />
        </div>
    )
}
