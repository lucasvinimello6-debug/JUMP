"use client"
import * as React from "react"

const ToastContext = React.createContext<{
    toast: (props: { title: string; description?: string; variant?: "default" | "destructive" }) => void
}>({
    toast: () => { },
})

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = React.useState<{ id: string; title: string; description?: string; variant?: "default" | "destructive" }[]>([])

    const toast = React.useCallback(({ title, description, variant }: { title: string; description?: string; variant?: "default" | "destructive" }) => {
        const id = Math.random().toString(36).substring(2, 9)
        setToasts((prev) => [...prev, { id, title, description, variant }])
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id))
        }, 3000)
    }, [])

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className={`rounded-lg p-4 shadow-lg border text-sm animate-in slide-in-from-right-full ${t.variant === "destructive"
                                ? "bg-destructive text-destructive-foreground border-destructive"
                                : "bg-background border-border text-foreground"
                            }`}
                    >
                        <div className="font-semibold">{t.title}</div>
                        {t.description && <div className="text-muted-foreground">{t.description}</div>}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export function useToast() {
    return React.useContext(ToastContext)
}
