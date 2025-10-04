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
import { TransactionForm } from "@/features/transactions/components/transaction-form"
import { TransactionList } from "@/features/transactions/components/transaction-list"
import type { Currency } from "@/lib/utils/currency"

interface TransactionsClientPageProps {
  initialTransactions: any[]
  initialAccounts: any[]
  initialCreditCards: any[]
  initialCategories: any[]
  userCurrency: Currency
}

export function TransactionsClientPage({
  initialTransactions,
  initialAccounts,
  initialCreditCards,
  initialCategories,
  userCurrency
}: TransactionsClientPageProps) {
  const [transactions, setTransactions] = useState(initialTransactions)
  const [accounts, setAccounts] = useState(initialAccounts)
  const [creditCards, setCreditCards] = useState(initialCreditCards)
  const [categories, setCategories] = useState(initialCategories)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleTransactionCreated = () => {
    setIsModalOpen(false)
    // Force refresh page to get updated data from server
    window.location.reload()
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-6 p-4 md:p-6">
        <div className="flex justify-center md:justify-between items-center md:flex-row flex-col gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">Mis Transacciones</h2>
            <p className="text-muted-foreground">Total: {transactions?.length || 0} transacciones</p>
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Transacción
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Crear Nueva Transacción</DialogTitle>
                <DialogDescription>Registra un nuevo ingreso o gasto</DialogDescription>
              </DialogHeader>
              <TransactionForm 
                accounts={accounts || []} 
                creditCards={creditCards || []}
                categories={categories || []}
                onSuccess={handleTransactionCreated}
              />
            </DialogContent>
          </Dialog>
        </div>

        {transactions && transactions.length > 0 ? (
          <TransactionList
            transactions={transactions}
            accounts={accounts || []}
            creditCards={creditCards || []}
            categories={categories || []}
            currency={userCurrency}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-4">No tienes transacciones aún</p>
          </div>
        )}
      </div>
    </div>
  )
}
