import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, Clock, Star, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col pt-16">
      <Navbar />

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center bg-background relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl -z-10 opacity-50 pointer-events-none" />

        <div className="animate-in fade-in zoom-in duration-700 slide-in-from-bottom-10 space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
            ✨ O futuro da sua barbearia
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground">
            Agendamentos inteligentes <br /> <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">para barbearias modernas.</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Organize sua agenda, fidelize clientes e aumente seu faturamento com a plataforma mais completa do mercado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="rounded-full text-lg h-14 px-8 shadow-xl shadow-primary/20">Criar conta grátis</Button>
            <Button size="lg" variant="outline" className="rounded-full text-lg h-14 px-8 bg-background/60 backdrop-blur-xl">Ver demonstração</Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Tudo que você precisa</h2>
            <p className="text-muted-foreground">Gerencie seu negócio como um profissional de verdade.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <Calendar size={24} />
                </div>
                <CardTitle>Agenda Inteligente</CardTitle>
                <CardDescription>Evite conflitos e organize seu dia.</CardDescription>
              </CardHeader>
              <CardContent>
                Controle total sobre seus horários com nossa agenda drag-and-drop intuitiva.
              </CardContent>
            </Card>

            <Card className="hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <Clock size={24} />
                </div>
                <CardTitle>Lembretes Automáticos</CardTitle>
                <CardDescription>Reduza o 'no-show' drasticamente.</CardDescription>
              </CardHeader>
              <CardContent>
                Seus clientes recebem lembretes via WhatsApp automaticamente antes do corte.
              </CardContent>
            </Card>

            <Card className="hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <TrendingUp size={24} />
                </div>
                <CardTitle>Dashboard Financeiro</CardTitle>
                <CardDescription>Acompanhe seus ganhos em tempo real.</CardDescription>
              </CardHeader>
              <CardContent>
                Relatórios detalhados de faturamento, serviços mais pedidos e retenção.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
