"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface TransactionFormProps {
  accounts: Array<{ id: string; name: string }>
  categories: Array<{ id: string; name: string; type: string }>
  transaction?: {
    id: string
    account_id: string
    category_id: string | null
    date: string
    amount: number
    description: string | null
    type: string
  }
  onSuccess?: () => void
}

export function TransactionForm({ accounts, categories, transaction, onSuccess }: TransactionFormProps) {
  const [accountId, setAccountId] = useState(transaction?.account_id || "")
  const [categoryId, setCategoryId] = useState(transaction?.category_id || "")
  const [date, setDate] = useState(transaction?.date || new Date().toISOString().split("T")[0])
  const [amount, setAmount] = useState(transaction?.amount?.toString() || "")
  const [description, setDescription] = useState(transaction?.description || "")
  const [type, setType] = useState(transaction?.type || "expense")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const filteredCategories = categories.filter((cat) => cat.type === type)

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

      const transactionAmount = Number.parseFloat(amount)

      if (transaction) {
        // Update existing transaction
        const { error } = await supabase
          .from("transactions")
          .update({
            account_id: accountId,
            category_id: categoryId || null,
            date,
            amount: transactionAmount,
            description: description || null,
            type,
          })
          .eq("id", transaction.id)

        if (error) throw error

        // Update account balance
        const { data: account } = await supabase.from("accounts").select("current_balance").eq("id", accountId).single()

        if (account) {
          const oldAmount = transaction.type === "income" ? -transaction.amount : transaction.amount
          const newAmount = type === "income" ? transactionAmount : -transactionAmount
          const newBalance = Number(account.current_balance) + oldAmount + newAmount

          await supabase.from("accounts").update({ current_balance: newBalance }).eq("id", accountId)
        }
      } else {
        // Create new transaction
        const { error } = await supabase.from("transactions").insert({
          user_id: user.id,
          account_id: accountId,
          category_id: categoryId || null,
          date,
          amount: transactionAmount,
          description: description || null,
          type,
        })

        if (error) throw error

        // Update account balance
        const { data: account } = await supabase.from("accounts").select("current_balance").eq("id", accountId).single()

        if (account) {
          const balanceChange = type === "income" ? transactionAmount : -transactionAmount
          const newBalance = Number(account.current_balance) + balanceChange

          await supabase.from("accounts").update({ current_balance: newBalance }).eq("id", accountId)
        }
      }

      router.refresh()
      if (onSuccess) onSuccess()
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Error al guardar la transacción")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="type">Tipo</Label>
        <Select value={type} onValueChange={setType} disabled={isLoading}>
          <SelectTrigger id="type">
            <SelectValue placeholder="Selecciona un tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="income">Ingreso</SelectItem>
            <SelectItem value="expense">Gasto</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="account">Cuenta</Label>
        <Select value={accountId} onValueChange={setAccountId} disabled={isLoading} required>
          <SelectTrigger id="account">
            <SelectValue placeholder="Selecciona una cuenta" />
          </SelectTrigger>
          <SelectContent>
            {accounts.map((account) => (
              <SelectItem key={account.id} value={account.id}>
                {account.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Categoría</Label>
        <Select value={categoryId} onValueChange={setCategoryId} disabled={isLoading}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            {filteredCategories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Monto</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          placeholder="0.00"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Fecha</Label>
        <Input
          id="date"
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          placeholder="Descripción de la transacción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Guardando..." : transaction ? "Actualizar Transacción" : "Crear Transacción"}
      </Button>
    </form>
  )
}
