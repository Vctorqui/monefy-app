import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/dashboard/header"
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

export default async function AccountsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: profile } = await supabase.from("profiles").select("currency").eq("id", user?.id).single()
  const userCurrency: Currency = profile?.currency || "USD"

  const { data: accounts } = await supabase
    .from("accounts")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })

  return (
    <div className="flex flex-col">
      <Header title="Cuentas" description="Gestiona tus cuentas bancarias y efectivo" />

      <div className="flex-1 space-y-6 p-4 md:p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Mis Cuentas</h2>
            <p className="text-muted-foreground">Total: {accounts?.length || 0} cuentas</p>
          </div>
          <Dialog>
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
              <AccountForm />
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
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Crear tu primera cuenta
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Crear Nueva Cuenta</DialogTitle>
                  <DialogDescription>Agrega una nueva cuenta para gestionar tus finanzas</DialogDescription>
                </DialogHeader>
                <AccountForm />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  )
}
