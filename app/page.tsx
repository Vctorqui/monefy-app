import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, TrendingUp, CreditCard, PieChart } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">FinanzasApp</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Iniciar Sesión</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button>Comenzar</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 text-balance">
            Gestiona tus finanzas personales de forma simple
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Controla tus gastos, ingresos y tarjetas de crédito en un solo lugar. Toma decisiones financieras
            inteligentes.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/sign-up">
              <Button size="lg" className="gap-2">
                Comenzar gratis <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline">
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Múltiples Cuentas</h3>
              <p className="text-muted-foreground">Gestiona todas tus cuentas bancarias y efectivo en un solo lugar</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Control de Tarjetas</h3>
              <p className="text-muted-foreground">Monitorea el uso de tus tarjetas de crédito y evita sobregiros</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <PieChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Categorías Personalizadas</h3>
              <p className="text-muted-foreground">Organiza tus transacciones con categorías que se adaptan a ti</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 FinanzasApp. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
