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
import { CustomTable, type Column, type FilterOption } from "@/components/ui/custom-table"
import { Pencil, Trash2, Eye } from "lucide-react"
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

interface TransactionTableProps {
  transactions: Transaction[]
  accounts: Array<{ id: string; name: string }>
  creditCards: Array<{ id: string; name: string; limit_amount: number; current_spent: number }>
  categories: Array<{ id: string; name: string; type: string }>
  currency?: Currency
}

export function TransactionTable({ transactions, accounts, creditCards, categories, currency = "USD" }: TransactionTableProps) {
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [viewingTransaction, setViewingTransaction] = useState<Transaction | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
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

  const handleView = (transaction: Transaction) => {
    setViewingTransaction(transaction)
    setIsViewOpen(true)
  }

  // Configuración de columnas para CustomTable
  const columns: Column<Transaction>[] = [
    {
      key: "description",
      label: "Descripción",
      sortable: true,
      filterable: true,
      render: (value) => value || "Sin descripción"
    },
    {
      key: "type",
      label: "Tipo",
      sortable: true,
      filterable: true,
      render: (value) => (
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            value === "income" 
              ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" 
              : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
          }`}
        >
          {value === "income" ? "Ingreso" : "Gasto"}
        </span>
      )
    },
    {
      key: "account_id",
      label: "Cuenta",
      sortable: true,
      filterable: true,
      render: (value, row) => getAccountName(row)
    },
    {
      key: "category_id",
      label: "Categoría",
      sortable: true,
      filterable: true,
      render: (value, row) => getCategoryName(row)
    },
    {
      key: "date",
      label: "Fecha",
      sortable: true,
      filterable: true,
      render: (value) => new Date(value).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    {
      key: "amount",
      label: "Monto",
      sortable: true,
      className: "text-right",
      render: (value, row) => (
        <span
          className={`font-semibold ${
            row.type === "income" ? "text-green-600" : "text-red-600"
          }`}
        >
          {row.type === "income" ? "+" : "-"}
          {formatCurrency(Number(value), currency)}
        </span>
      )
    }
  ]

  // Opciones de filtro
  const filterOptions: FilterOption[] = [
    {
      key: "type",
      label: "Tipo de Transacción",
      options: [
        { value: "income", label: "Ingreso" },
        { value: "expense", label: "Gasto" }
      ]
    },
    {
      key: "account_type",
      label: "Tipo de Cuenta",
      options: [
        { value: "account", label: "Cuenta Bancaria" },
        { value: "credit_card", label: "Tarjeta de Crédito" }
      ]
    },
    {
      key: "category_id",
      label: "Categoría",
      options: categories.map(cat => ({
        value: cat.id,
        label: cat.name
      }))
    },
    {
      key: "account_id",
      label: "Cuenta/Tarjeta",
      options: [
        ...accounts.map(acc => ({ value: acc.id, label: acc.name })),
        ...creditCards.map(card => ({ value: card.id, label: card.name }))
      ]
    }
  ]

  // Campos de búsqueda
  const searchFields: (keyof Transaction)[] = ["description", "type"]

  // Acciones para cada fila
  const actions = (transaction: Transaction) => (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleView(transaction)}
        className="h-8 w-8"
      >
        <Eye className="h-4 w-4" />
        <span className="sr-only">Ver detalles</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleEdit(transaction)}
        className="h-8 w-8"
      >
        <Pencil className="h-4 w-4" />
        <span className="sr-only">Editar</span>
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
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
              className="bg-red-600 hover:bg-red-700"
            >
              {deletingId === transaction.id ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )

  return (
    <>
      <CustomTable
        data={transactions}
        columns={columns}
        filterOptions={filterOptions}
        searchFields={searchFields}
        pageSize={10}
        actions={actions}
        className="w-full"
      />

      {/* Dialog para ver detalles */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalles de la Transacción</DialogTitle>
            <DialogDescription>Información completa de la transacción</DialogDescription>
          </DialogHeader>
          {viewingTransaction && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Descripción</label>
                  <p className="text-sm">{viewingTransaction.description || "Sin descripción"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Tipo</label>
                  <p className="text-sm">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        viewingTransaction.type === "income" 
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" 
                          : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                      }`}
                    >
                      {viewingTransaction.type === "income" ? "Ingreso" : "Gasto"}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Cuenta</label>
                  <p className="text-sm">{getAccountName(viewingTransaction)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Categoría</label>
                  <p className="text-sm">{getCategoryName(viewingTransaction)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Fecha</label>
                  <p className="text-sm">
                    {new Date(viewingTransaction.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Monto</label>
                  <p className={`text-sm font-semibold ${
                    viewingTransaction.type === "income" ? "text-green-600" : "text-red-600"
                  }`}>
                    {viewingTransaction.type === "income" ? "+" : "-"}
                    {formatCurrency(Number(viewingTransaction.amount), currency)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog para editar */}
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