"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Pencil, Trash2 } from "lucide-react"
import { TransactionForm } from "./transaction-form"
import { formatCurrency, type Currency } from "@/lib/utils/currency"

interface Transaction {
  id: string
  account_id: string
  account_type: string
  category_id: string | null
  date: string
  amount: number
  description: string | null
  type: string
}

interface TransactionListProps {
  transactions: Transaction[]
  accounts: Array<{ id: string; name: string }>
  creditCards: Array<{ id: string; name: string; limit_amount: number; current_spent: number }>
  categories: Array<{ id: string; name: string; type: string }>
  currency?: Currency
}

export function TransactionList({ transactions, accounts, creditCards, categories, currency = "USD" }: TransactionListProps) {
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const router = useRouter()


  // Función para obtener el nombre de la cuenta/tarjeta
  const getAccountName = (transaction: Transaction) => {
    if (transaction.account_type === "account") {
      const account = accounts.find(acc => acc.id === transaction.account_id)
      return account?.name || "Cuenta no encontrada"
    } else {
      const card = creditCards.find(card => card.id === transaction.account_id)
      return card?.name || "Tarjeta no encontrada"
    }
  }

  // Función para obtener el nombre de la categoría
  const getCategoryName = (transaction: Transaction) => {
    const category = categories.find(cat => cat.id === transaction.category_id)
    return category?.name || "Sin categoría"
  }

  const handleDelete = async (transaction: Transaction) => {
    const supabase = createClient()
    setDeletingId(transaction.id)

    try {
      // Delete transaction
      const { error } = await supabase.from("transactions").delete().eq("id", transaction.id)

      if (error) throw error

      // Update balance based on account type
      if (transaction.account_type === "account") {
        const { data: account } = await supabase
          .from("accounts")
          .select("current_balance")
          .eq("id", transaction.account_id)
          .single()

        if (account) {
          const balanceChange = transaction.type === "income" ? -transaction.amount : transaction.amount
          const newBalance = Number(account.current_balance) + balanceChange
          await supabase.from("accounts").update({ current_balance: newBalance }).eq("id", transaction.account_id)
        }
      } else if (transaction.account_type === "credit_card") {
        const { data: card } = await supabase
          .from("credit_cards")
          .select("current_spent")
          .eq("id", transaction.account_id)
          .single()

        if (card) {
          const spentChange = transaction.type === "expense" ? -transaction.amount : transaction.amount
          const newSpent = Number(card.current_spent) + spentChange
          await supabase.from("credit_cards").update({ current_spent: newSpent }).eq("id", transaction.account_id)
        }
      }

      router.refresh()
    } catch (error: unknown) {
      console.error("Error deleting transaction:", error)
    } finally {
      setDeletingId(null)
    }
  }

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction)
    setIsEditOpen(true)
  }

  return (
    <>
      <div className="space-y-4 relative">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between border rounded-lg p-4">
            <div className="flex-1">
              <div className="flex md:items-center gap-2 md:flex-row flex-col items-start">
                <p className="font-medium">{transaction.description || "Sin descripción"}</p>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${transaction.type === "income" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}
                >
                  {transaction.type === "income" ? "Ingreso" : "Gasto"}
                </span>
              </div>
              <div className="flex gap-2 md:gap-4 mt-1 text-sm text-muted-foreground md:flex-row flex-col">
                <span>{getAccountName(transaction)}</span>
                {transaction.category_id && <span>• {getCategoryName(transaction)}</span>}
                <span>• {new Date(transaction.date).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-8">
              <div
                className={`text-lg font-semibold ${transaction.type === "income" ? "text-green-500" : "text-red-500"}`}
              >
                {transaction.type === "income" ? "+" : "-"}
                {formatCurrency(Number(transaction.amount), currency)}
              </div>
              <div className="flex gap-2 absolute right-4 top-2">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(transaction)}>
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Editar</span>
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Eliminar</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer. Esto eliminará permanentemente la transacción y actualizará el
                        balance de la cuenta.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(transaction)}
                        disabled={deletingId === transaction.id}
                      >
                        {deletingId === transaction.id ? "Eliminando..." : "Eliminar"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Transacción</DialogTitle>
            <DialogDescription>Actualiza la información de tu transacción</DialogDescription>
          </DialogHeader>
          {editingTransaction && (
            <TransactionForm
              accounts={accounts}
              creditCards={creditCards}
              categories={categories}
              transaction={editingTransaction}
              onSuccess={() => setIsEditOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
