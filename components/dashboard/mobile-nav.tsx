"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Wallet, CreditCard, Tag, Menu, LogOut, TrendingUp, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

const navigation = [
  { name: "Inicio", href: "/dashboard", icon: Home },
  { name: "Cuentas", href: "/dashboard/accounts", icon: Wallet },
  { name: "Transacciones", href: "/dashboard/transactions", icon: TrendingUp },
  { name: "Tarjetas", href: "/dashboard/cards", icon: CreditCard },
  { name: "Categorías", href: "/dashboard/categories", icon: Tag },
  { name: "Configuración", href: "/dashboard/settings", icon: Settings },
]

export function MobileNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
    router.refresh()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-neutral-400 hover:text-primary hover:bg-primary/10 hover:scale-110 transform transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0 bg-neutral-950/95 backdrop-blur-md border-r border-neutral-800/50">
        <div className="flex h-full flex-col gap-y-5 bg-neutral-950/80 backdrop-blur-md px-6 py-4">
          <div className="flex h-16 items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-neutral-50">Monefy</span>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "group flex gap-x-3 rounded-lg p-3 text-sm font-medium leading-6 transition-all duration-300",
                        isActive
                          ? "bg-primary/20 text-primary border border-primary/50 shadow-lg shadow-primary/20"
                          : "text-neutral-400 hover:bg-primary/10 hover:text-primary hover:scale-105 transform hover:shadow-lg hover:shadow-primary/10",
                      )}
                    >
                      <item.icon className="h-5 w-5 shrink-0 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
              <li className="mt-auto">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-x-3 text-neutral-400 hover:bg-red-500/20 hover:text-red-400 hover:scale-105 transform transition-all duration-300"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 shrink-0" />
                  Cerrar Sesión
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
