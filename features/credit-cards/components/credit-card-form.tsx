"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
interface CreditCardFormProps {
  card?: {
    id: string
    name: string
    limit_amount: number
    current_spent: number
    billing_cycle_day: number
  }
  onSuccess?: () => void
}

export function CreditCardForm({ card, onSuccess }: CreditCardFormProps) {
  const [name, setName] = useState(card?.name || "")
  const [limitAmount, setLimitAmount] = useState(card?.limit_amount?.toString() || "")
  const [currentSpent, setCurrentSpent] = useState(card?.current_spent?.toString() || "0")
  const [billingCycleDay, setBillingCycleDay] = useState(card?.billing_cycle_day?.toString() || "1")
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

      const limit = Number.parseFloat(limitAmount)
      const spent = Number.parseFloat(currentSpent)
      const cycleDay = Number.parseInt(billingCycleDay)

      if (cycleDay < 1 || cycleDay > 31) {
        throw new Error("El día de corte debe estar entre 1 y 31")
      }

      if (card) {
        // Update existing card
        const { error } = await supabase
          .from("credit_cards")
          .update({
            name,
            limit_amount: limit,
            current_spent: spent,
            billing_cycle_day: cycleDay,
          })
          .eq("id", card.id)

        if (error) throw error
        toast.success("Tarjeta actualizada correctamente")
      } else {
        // Create new card
        const { error } = await supabase.from("credit_cards").insert({
          user_id: user.id,
          name,
          limit_amount: limit,
          current_spent: spent,
          billing_cycle_day: cycleDay,
        })

        if (error) throw error
        toast.success("Tarjeta creada correctamente")
      }

      router.refresh()
      if (onSuccess) onSuccess()
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Error al guardar la tarjeta")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre de la tarjeta</Label>
        <Input
          id="name"
          type="text"
          placeholder="Ej: Visa Platinum"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="limit">Límite de crédito</Label>
        <Input
          id="limit"
          type="number"
          step="0.01"
          placeholder="0.00"
          required
          value={limitAmount}
          onChange={(e) => setLimitAmount(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="spent">Gasto actual</Label>
        <Input
          id="spent"
          type="number"
          step="0.01"
          placeholder="0.00"
          required
          value={currentSpent}
          onChange={(e) => setCurrentSpent(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cycle">Día de corte (1-31)</Label>
        <Input
          id="cycle"
          type="number"
          min="1"
          max="31"
          placeholder="1"
          required
          value={billingCycleDay}
          onChange={(e) => setBillingCycleDay(e.target.value)}
          disabled={isLoading}
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Guardando..." : card ? "Actualizar Tarjeta" : "Crear Tarjeta"}
      </Button>
    </form>
  )
}
