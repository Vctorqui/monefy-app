"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Wallet, CreditCard, Tag, LogOut, TrendingUp, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { FinanzasAppIcon } from "../icon"

const navigation = [
  { name: "Inicio", href: "/dashboard", icon: Home },
  { name: "Cuentas y Tarjetas", href: "/dashboard/accounts", icon: Wallet },
  { name: "Transacciones", href: "/dashboard/transactions", icon: TrendingUp },
  // { name: "Tarjetas", href: "/dashboard/cards", icon: CreditCard },
  { name: "Categorías", href: "/dashboard/categories", icon: Tag },
  { name: "Configuración", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
    router.refresh()
  }

  return (
    <div className="flex h-full flex-col gap-y-5 bg-neutral-950/80 backdrop-blur-md border-r border-neutral-800/50 px-6 py-4 shadow-2xl">
      <div className="flex h-16 items-center gap-2">
        <FinanzasAppIcon className="h-6 w-6 text-primary" />
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
  )
}
