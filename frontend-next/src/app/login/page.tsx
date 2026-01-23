"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [role, setRole] = useState<'client' | 'barber'>('client')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Mock Login
        localStorage.setItem('authToken', 'demo-token-' + Math.random())
        localStorage.setItem('userRole', role)

        toast({
            title: "Login realizado com sucesso!",
            description: `Bem-vindo de volta, ${role === 'client' ? 'Cliente' : 'Barbeiro'}.`
        })

        if (role === 'client') {
            router.push('/dashboard')
        } else {
            router.push('/barber')
        }
    }

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-between px-6 py-12 bg-[#000000] text-white font-sans antialiased">
            {/* Header / Logo */}
            <div className="mt-4 flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0d59f2]">
                    <span className="text-2xl font-black tracking-tighter text-white">J</span>
                </div>
                <h1 className="text-2xl font-bold tracking-[0.2em] uppercase mt-2">Jump</h1>
            </div>

            {/* Form Section */}
            <div className="w-full max-w-[400px] flex flex-col gap-6 mt-6">

                {/* Role Segmented Control */}
                <div className="flex flex-col gap-2">
                    <label className="px-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tipo de Perfil</label>
                    <div className="segmented-control flex items-center">
                        <button
                            type="button"
                            onClick={() => setRole('client')}
                            className={`segmented-item cursor-pointer ${role === 'client' ? 'active' : 'inactive'}`}
                        >
                            Sou Cliente
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('barber')}
                            className={`segmented-item cursor-pointer ${role === 'barber' ? 'active' : 'inactive'}`}
                        >
                            Sou Barbeiro
                        </button>
                    </div>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    {/* Email Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="px-1 text-sm font-medium text-gray-400">E-mail</label>
                        <input
                            className="w-full h-14 bg-[#1c1c1e] border border-gray-800 focus:border-[#0d59f2] focus:ring-1 focus:ring-[#0d59f2] text-white squircle-radius px-4 placeholder:text-gray-600 transition-all outline-none"
                            placeholder="seu@email.com"
                            type="email"
                            required
                        />
                    </div>
                    {/* Password Field */}
                    <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-sm font-medium text-gray-400">Senha</label>
                            <button type="button" className="text-xs text-[#0d59f2] font-medium hover:underline">Esqueceu?</button>
                        </div>
                        <div className="relative">
                            <input
                                className="w-full h-14 bg-[#1c1c1e] border border-gray-800 focus:border-[#0d59f2] focus:ring-1 focus:ring-[#0d59f2] text-white squircle-radius px-4 pr-12 placeholder:text-gray-600 transition-all outline-none"
                                placeholder="••••••••"
                                type={showPassword ? "text" : "password"}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                            >
                                {/* Using user's Material Symbols equivalent or Lucide */}
                                <span className="material-symbols-outlined">{showPassword ? <EyeOff size={24} /> : <Eye size={24} />}</span>
                            </button>
                        </div>
                    </div>

                    {/* Main CTA */}
                    <button
                        disabled={isLoading}
                        className="w-full h-14 bg-[#0d59f2] text-white font-semibold text-lg rounded-full mt-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {isLoading ? "Entrando..." : "Entrar"}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-2">
                    <div className="h-[1px] flex-1 bg-gray-800"></div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">ou continue com</span>
                    <div className="h-[1px] flex-1 bg-gray-800"></div>
                </div>

                {/* Social Auth Grid */}
                <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-3 gap-3">
                        <button className="flex h-14 items-center justify-center rounded-full bg-white text-black hover:bg-gray-200 transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.702z"></path>
                            </svg>
                        </button>
                        <button className="flex h-14 items-center justify-center rounded-full bg-[#1c1c1e] border border-gray-800 hover:bg-[#2c2c2e] transition-colors">
                            <svg className="w-6 h-6" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                            </svg>
                        </button>
                        <button className="flex h-14 items-center justify-center rounded-full bg-[#1877F2] hover:opacity-90 transition-colors">
                            <svg className="w-7 h-7" fill="white" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                            </svg>
                        </button>
                    </div>
                    <button className="w-full h-14 bg-[#1c1c1e] border border-gray-800 text-white font-medium squircle-radius flex items-center justify-center hover:bg-[#2c2c2e] transition-colors gap-2">
                        Entrar com Telefone
                    </button>
                </div>

            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                    Não tem uma conta? <Link className="text-[#0d59f2] font-semibold ml-1 hover:underline" href="/register">Cadastre-se</Link>
                </p>
            </div>

            {/* Background (Optional based on HTML hidden block) - kept simple for now per React component structure */}
        </div>
    )
}
