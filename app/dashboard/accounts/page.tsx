"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { AccountCard } from "@/features/accounts/components/account-card"
import { AccountForm } from "@/features/accounts/components/account-form"
import type { Currency } from "@/lib/utils/currency"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userCurrency, setUserCurrency] = useState<Currency>("USD")
  const supabase = createClient()

  useEffect(() => {
    fetchAccounts()
  }, [])

  const fetchAccounts = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const { data: profile } = await supabase.from("profiles").select("currency").eq("id", user.id).single()
        setUserCurrency(profile?.currency || "USD")

        const { data: accountsData } = await supabase
          .from("accounts")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        setAccounts(accountsData || [])
      }
    } catch (error) {
      console.error("Error fetching accounts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAccountCreated = () => {
    setIsModalOpen(false)
    fetchAccounts() // Recargar las cuentas
  }

  return (
    <div className="flex flex-col">

      <div className="flex-1 space-y-6 p-4 md:p-6">
        <div className="flex justify-center md:justify-between items-center md:flex-row flex-col gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">Mis Cuentas</h2>
            <p className="text-muted-foreground">Total: {accounts?.length || 0} cuentas</p>
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Cuenta
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crear Nueva Cuenta</DialogTitle>
                <DialogDescription>Agrega una nueva cuenta para gestionar tus finanzas</DialogDescription>
              </DialogHeader>
              <AccountForm onSuccess={handleAccountCreated} />
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">Cargando cuentas...</p>
          </div>
        ) : accounts && accounts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {accounts.map((account) => (
              <AccountCard key={account.id} account={account} currency={userCurrency} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-4">No tienes cuentas aún</p>
          </div>
        )}
      </div>
    </div>
  )
}
