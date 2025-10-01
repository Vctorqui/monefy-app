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
  category_id: string | null
  date: string
  amount: number
  description: string | null
  type: string
  accounts: { name: string } | null
  categories: { name: string } | null
}

interface TransactionListProps {
  transactions: Transaction[]
  accounts: Array<{ id: string; name: string }>
  categories: Array<{ id: string; name: string; type: string }>
  currency?: Currency
}

export function TransactionList({ transactions, accounts, categories, currency = "USD" }: TransactionListProps) {
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const router = useRouter()

  const handleDelete = async (transaction: Transaction) => {
    const supabase = createClient()
    setDeletingId(transaction.id)

    try {
      // Delete transaction
      const { error } = await supabase.from("transactions").delete().eq("id", transaction.id)

      if (error) throw error

      // Update account balance
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
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between border rounded-lg p-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium">{transaction.description || "Sin descripción"}</p>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${transaction.type === "income" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}
                >
                  {transaction.type === "income" ? "Ingreso" : "Gasto"}
                </span>
              </div>
              <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                <span>{transaction.accounts?.name}</span>
                {transaction.categories && <span>• {transaction.categories.name}</span>}
                <span>• {new Date(transaction.date).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div
                className={`text-lg font-semibold ${transaction.type === "income" ? "text-green-500" : "text-red-500"}`}
              >
                {transaction.type === "income" ? "+" : "-"}
                {formatCurrency(Number(transaction.amount), currency)}
              </div>
              <div className="flex gap-2">
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
