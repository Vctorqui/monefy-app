"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { List, Table as TableIcon } from "lucide-react"
import { TransactionList } from "./transaction-list"
import { TransactionTable } from "./transaction-table"
import type { Currency } from "@/lib/utils/currency"

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

interface TransactionViewProps {
  transactions: Transaction[]
  accounts: Array<{ id: string; name: string }>
  creditCards: Array<{ id: string; name: string; limit_amount: number; current_spent: number }>
  categories: Array<{ id: string; name: string; type: string }>
  currency?: Currency
}

export function TransactionView({ transactions, accounts, creditCards, categories, currency = "USD" }: TransactionViewProps) {
  const [viewMode, setViewMode] = useState<"list" | "table">("list")

  return (
    <div className="space-y-4">
      {/* Toggle de vista */}
      <div className="flex items-center justify-end gap-2">
        <Button
          variant={viewMode === "list" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("list")}
          className="flex items-center gap-2"
        >
          <List className="h-4 w-4" />
          Lista
        </Button>
        <Button
          variant={viewMode === "table" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("table")}
          className="flex items-center gap-2"
        >
          <TableIcon className="h-4 w-4" />
          Tabla
        </Button>
      </div>

      {/* Contenido según la vista seleccionada */}
      {viewMode === "list" ? (
        <TransactionList
          transactions={transactions}
          accounts={accounts}
          creditCards={creditCards}
          categories={categories}
          currency={currency}
        />
      ) : (
        <TransactionTable
          transactions={transactions}
          accounts={accounts}
          creditCards={creditCards}
          categories={categories}
          currency={currency}
        />
      )}
    </div>
  )
}
