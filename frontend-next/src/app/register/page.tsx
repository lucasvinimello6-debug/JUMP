"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff } from "lucide-react"

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [role, setRole] = useState<'client' | 'barber'>('client')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Mock Login
        localStorage.setItem('authToken', 'demo-token-' + Math.random())
        localStorage.setItem('userRole', role)

        toast({
            title: "Conta criada com sucesso!",
            description: "Redirecionando para o painel..."
        })

        if (role === 'client') {
            router.push('/dashboard')
        } else {
            router.push('/barber')
        }
    }

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-between px-6 py-12 bg-background text-foreground">
            {/* Header / Logo */}
            <div className="mt-4 flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                    <span className="text-2xl font-black tracking-tighter text-white">J</span>
                </div>
                <h1 className="text-2xl font-bold tracking-[0.2em] uppercase mt-2">Jump</h1>
            </div>

            {/* Form Section */}
            <div className="w-full max-w-[400px] flex flex-col gap-4 mt-6">
                <div className="flex flex-col gap-2 mb-6 text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-white">Criar Conta</h2>
                    <p className="text-sm text-gray-400">Junte-se à revolução dos agendamentos</p>
                </div>

                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    {/* Role Toggle (Added to maintain functionality while keeping style) */}
                    <div className="flex p-1 bg-[#1c1c1e] rounded-xl border border-gray-800 mb-2">
                        <button
                            type="button"
                            onClick={() => setRole('client')}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${role === 'client' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            Cliente
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('barber')}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${role === 'barber' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            Barbeiro
                        </button>
                    </div>

                    {/* Name Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="px-1 text-sm font-medium text-gray-400">Nome Completo</label>
                        <input
                            className="w-full h-14 bg-[#1c1c1e] border border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary text-white squircle-radius px-4 placeholder:text-gray-600 transition-all outline-none"
                            placeholder="Seu nome"
                            type="text"
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="px-1 text-sm font-medium text-gray-400">E-mail</label>
                        <input
                            className="w-full h-14 bg-[#1c1c1e] border border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary text-white squircle-radius px-4 placeholder:text-gray-600 transition-all outline-none"
                            placeholder="seu@email.com"
                            type="email"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="px-1 text-sm font-medium text-gray-400">Senha</label>
                        <div className="relative">
                            <input
                                className="w-full h-14 bg-[#1c1c1e] border border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary text-white squircle-radius px-4 pr-12 placeholder:text-gray-600 transition-all outline-none"
                                placeholder="••••••••"
                                type={showPassword ? "text" : "password"}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                            >
                                {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="px-1 text-sm font-medium text-gray-400">Confirmar Senha</label>
                        <div className="relative">
                            <input
                                className="w-full h-14 bg-[#1c1c1e] border border-gray-800 focus:border-primary focus:ring-1 focus:ring-primary text-white squircle-radius px-4 pr-12 placeholder:text-gray-600 transition-all outline-none"
                                placeholder="••••••••"
                                type={showConfirmPassword ? "text" : "password"}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                            >
                                {showConfirmPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Terms */}
                    <div className="flex items-start gap-3 my-2">
                        <input type="checkbox" id="terms" className="w-5 h-5 mt-1 accent-primary cursor-pointer border-gray-800 bg-[#1c1c1e] rounded" required />
                        <label htmlFor="terms" className="text-sm text-gray-400 cursor-pointer">
                            Concordo com os <a href="#" className="text-primary font-medium hover:underline">Termos de Serviço</a> e <a href="#" className="text-primary font-medium hover:underline">Política de Privacidade</a>
                        </label>
                    </div>

                    {/* Main CTA */}
                    <button
                        disabled={isLoading}
                        className="w-full h-14 bg-primary text-white font-semibold text-lg rounded-full mt-4 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {isLoading ? "Criando Conta..." : "Criar Conta"}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                    <div className="h-[1px] flex-1 bg-gray-800"></div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">ou</span>
                    <div className="h-[1px] flex-1 bg-gray-800"></div>
                </div>

                {/* Social Auth */}
                <div className="grid grid-cols-2 gap-3">
                    <button className="flex h-14 items-center justify-center rounded-full bg-white text-black hover:bg-gray-200 transition-colors">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.702z"></path>
                        </svg>
                    </button>
                    <button className="flex h-14 items-center justify-center rounded-full bg-[#1877F2] hover:opacity-90 transition-colors">
                        <svg className="w-7 h-7" fill="white" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                        </svg>
                    </button>
                </div>

            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                    Já tem uma conta? <Link className="text-primary font-semibold ml-1 hover:underline" href="/login">Faça login</Link>
                </p>
            </div>
        </div>
    )
}
