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
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex h-full flex-col gap-y-5 bg-card px-6 py-4">
          <div className="flex h-16 items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">FinanzasApp</span>
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
                        "group flex gap-x-3 rounded-md p-3 text-sm font-medium leading-6 transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
              <li className="mt-auto">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-x-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
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
