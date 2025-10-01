"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Pencil, Trash2, CreditCard } from "lucide-react"
import { CreditCardForm } from "./credit-card-form"
import { formatCurrency, type Currency } from "@/lib/utils/currency"

interface CreditCardItemProps {
  card: {
    id: string
    name: string
    limit_amount: number
    current_spent: number
    billing_cycle_day: number
  }
  currency?: Currency
}

export function CreditCardItem({ card, currency = "USD" }: CreditCardItemProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const usagePercentage = (card.current_spent / card.limit_amount) * 100
  const availableCredit = card.limit_amount - card.current_spent

  const getProgressColor = () => {
    if (usagePercentage >= 90) return "bg-red-500"
    if (usagePercentage >= 70) return "bg-yellow-500"
    return "bg-green-500"
  }

  const handleDelete = async () => {
    const supabase = createClient()
    setIsDeleting(true)

    try {
      const { error } = await supabase.from("credit_cards").delete().eq("id", card.id)

      if (error) throw error

      router.refresh()
    } catch (error: unknown) {
      console.error("Error deleting card:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>{card.name}</CardTitle>
              <CardDescription>Corte día {card.billing_cycle_day}</CardDescription>
            </div>
          </div>
          <div className="flex gap-2">
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Editar</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Editar Tarjeta</DialogTitle>
                  <DialogDescription>Actualiza la información de tu tarjeta de crédito</DialogDescription>
                </DialogHeader>
                <CreditCardForm card={card} onSuccess={() => setIsEditOpen(false)} />
              </DialogContent>
            </Dialog>

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
                    Esta acción no se puede deshacer. Esto eliminará permanentemente la tarjeta de crédito.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                    {isDeleting ? "Eliminando..." : "Eliminar"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Gastado</span>
            <span className="font-medium">{formatCurrency(card.current_spent, currency)}</span>
          </div>
          <Progress value={usagePercentage} className="h-2" indicatorClassName={getProgressColor()} />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Límite</span>
            <span className="font-medium">{formatCurrency(card.limit_amount, currency)}</span>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Crédito disponible</span>
            <span className="text-xl font-bold">{formatCurrency(availableCredit, currency)}</span>
          </div>
          <div className="mt-2">
            <span className="text-xs text-muted-foreground">Uso: {usagePercentage.toFixed(1)}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
