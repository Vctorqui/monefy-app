"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
interface AccountFormProps {
  account?: {
    id: string
    name: string
    type: string
    initial_balance: number
    current_balance: number
  }
  onSuccess?: () => void
}

export function AccountForm({ account, onSuccess }: AccountFormProps) {
  const [name, setName] = useState(account?.name || "")
  const [type, setType] = useState(account?.type || "checking")
  const [initialBalance, setInitialBalance] = useState(account?.initial_balance?.toString() || "0")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) throw new Error("No autenticado")

      const balance = Number.parseFloat(initialBalance)

      if (account) {
        // Update existing account
        const { error } = await supabase
          .from("accounts")
          .update({
            name,
            type,
            initial_balance: balance,
            current_balance: balance,
          })
          .eq("id", account.id)

        if (error) throw error
        toast.success("Cuenta actualizada correctamente")
      } else {
        // Create new account
        const { error } = await supabase.from("accounts").insert({
          user_id: user.id,
          name,
          type,
          initial_balance: balance,
          current_balance: balance,
        })

        if (error) throw error
        toast.success("Cuenta creada correctamente")
      }

      router.refresh()
      if (onSuccess) onSuccess()
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Error al guardar la cuenta")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre de la cuenta</Label>
        <Input
          id="name"
          type="text"
          placeholder="Ej: Cuenta de ahorros"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Tipo de cuenta</Label>
        <Select value={type} onValueChange={setType} disabled={isLoading}>
          <SelectTrigger id="type">
            <SelectValue placeholder="Selecciona un tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="checking">Cuenta corriente</SelectItem>
            <SelectItem value="savings">Cuenta de ahorros</SelectItem>
            <SelectItem value="cash">Efectivo</SelectItem>
            <SelectItem value="investment">Inversión</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="balance">Balance inicial</Label>
        <Input
          id="balance"
          type="number"
          step="0.01"
          placeholder="0.00"
          required
          value={initialBalance}
          onChange={(e) => setInitialBalance(e.target.value)}
          disabled={isLoading}
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Guardando..." : account ? "Actualizar Cuenta" : "Crear Cuenta"}
      </Button>
    </form>
  )
}
