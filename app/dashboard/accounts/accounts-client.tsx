"use client"

import { useState } from "react"
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

interface AccountsClientPageProps {
  initialAccounts: any[]
  userCurrency: Currency
}

export function AccountsClientPage({
  initialAccounts,
  userCurrency
}: AccountsClientPageProps) {
  const [accounts, setAccounts] = useState(initialAccounts)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAccountCreated = () => {
    setIsModalOpen(false)
    // Force refresh page to get updated data from server
    window.location.reload()
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

        {accounts && accounts.length > 0 ? (
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