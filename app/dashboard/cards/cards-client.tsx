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
import { CreditCardForm } from "@/features/credit-cards/components/credit-card-form"
import { CreditCardItem } from "@/features/credit-cards/components/credit-card-item"
import type { Currency } from "@/lib/utils/currency"

interface CardsClientPageProps {
  initialCreditCards: any[]
  userCurrency: Currency
}

export function CardsClientPage({
  initialCreditCards,
  userCurrency
}: CardsClientPageProps) {
  const [creditCards, setCreditCards] = useState(initialCreditCards)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCreditCardCreated = () => {
    setIsModalOpen(false)
    // Force refresh page to get updated data from server
    window.location.reload()
  }

  const totalLimit = creditCards?.reduce((sum, card) => sum + Number(card.limit_amount), 0) || 0
  const totalSpent = creditCards?.reduce((sum, card) => sum + Number(card.current_spent), 0) || 0
  const totalAvailable = totalLimit - totalSpent

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-6 p-4 md:p-6">
        <div className="flex justify-center md:justify-between items-center md:flex-row flex-col gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">Mis Tarjetas de Crédito</h2>
            <p className="text-muted-foreground">
              Total: {creditCards?.length || 0} tarjetas • Limite disponible: {userCurrency} {(totalAvailable).toLocaleString()}
            </p>
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Tarjeta
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crear Nueva Tarjeta de Crédito</DialogTitle>
                <DialogDescription>Agrega una nueva tarjeta de crédito para gestionar tus gastos</DialogDescription>
              </DialogHeader>
              <CreditCardForm onSuccess={handleCreditCardCreated} />
            </DialogContent>
          </Dialog>
        </div>

        {creditCards && creditCards.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {creditCards.map((card) => (
              <CreditCardItem key={card.id} card={card} currency={userCurrency} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-4">No tienes tarjetas de crédito aún</p>
          </div>
        )}
      </div>
    </div>
  )
}
