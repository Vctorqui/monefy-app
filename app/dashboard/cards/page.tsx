"use client"

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
import { formatCurrency, type Currency } from "@/lib/utils/currency"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export default function CreditCardsPage() {
  const [creditCards, setCreditCards] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userCurrency, setUserCurrency] = useState<Currency>("USD")
  const supabase = createClient()

  useEffect(() => {
    fetchCreditCards()
  }, [])

  const fetchCreditCards = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const { data: profile } = await supabase.from("profiles").select("currency").eq("id", user.id).single()
        setUserCurrency(profile?.currency || "USD")

        const { data: creditCardsData } = await supabase
          .from("credit_cards")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        setCreditCards(creditCardsData || [])
      }
    } catch (error) {
      console.error("Error fetching credit cards:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreditCardCreated = () => {
    setIsModalOpen(false)
    fetchCreditCards() // Recargar las tarjetas
  }

  const totalLimit = creditCards?.reduce((sum, card) => sum + Number(card.limit_amount), 0) || 0
  const totalSpent = creditCards?.reduce((sum, card) => sum + Number(card.current_spent), 0) || 0
  const totalAvailable = totalLimit - totalSpent

  return (
    <div className="flex flex-col">
      
      <div className="flex-1 space-y-6 p-4 md:p-6">
        <div className="flex justify-center md:justify-between items-center md:flex-row flex-col gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">Mis Tarjetas</h2>
            <p className="text-muted-foreground">Total: {creditCards?.length || 0} tarjetas</p>
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
                <DialogTitle>Crear Nueva Tarjeta</DialogTitle>
                <DialogDescription>Agrega una nueva tarjeta de crédito para monitorear</DialogDescription>
              </DialogHeader>
              <CreditCardForm onSuccess={handleCreditCardCreated} />
            </DialogContent>
          </Dialog>
        </div>

        {creditCards && creditCards.length > 0 && (
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-card border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Límite Total</p>
              <p className="text-2xl font-bold">{formatCurrency(totalLimit, userCurrency)}</p>
            </div>
            <div className="bg-card border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Total Gastado</p>
              <p className="text-2xl font-bold text-red-500">{formatCurrency(totalSpent, userCurrency)}</p>
            </div>
            <div className="bg-card border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Crédito Disponible</p>
              <p className="text-2xl font-bold text-green-500">{formatCurrency(totalAvailable, userCurrency)}</p>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">Cargando tarjetas...</p>
          </div>
        ) : creditCards && creditCards.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {creditCards.map((card) => (
              <CreditCardItem key={card.id} card={card} currency={userCurrency} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-4">No tienes tarjetas de crédito registradas</p>
          </div>
        )}
      </div>
    </div>
  )
}
