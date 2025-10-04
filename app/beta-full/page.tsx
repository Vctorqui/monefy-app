"use client"


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, Clock, Mail } from "lucide-react"
import { useActiveUser } from "@/hooks/use-active-user"

export default function BetaFullPage() {
  const { activeUsers } = useActiveUser()
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-background">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <CardTitle className="text-2xl">Beta Completa</CardTitle>
            <CardDescription>
              Hemos alcanzado el límite de usuarios para la versión beta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-orange-600">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">{activeUsers}/{Number(process.env.NEXT_PUBLIC_MAX_USERS)} usuarios registrados</span>
              </div>
              
              <p className="text-sm text-muted-foreground text-center">
                ¡Gracias por tu interés en Monefy! Hemos alcanzado el límite de usuarios para nuestra versión beta gratuita.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900">¿Quieres ser notificado?</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Déjanos tu email y te avisaremos cuando tengamos más cupos disponibles o cuando lancemos la versión completa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-4 text-center space-y-2">
              <Link href="/" className="text-sm text-primary hover:underline underline-offset-4">
                ← Volver al inicio
              </Link>
              <div className="text-xs text-muted-foreground">
                O explora nuestras funcionalidades disponibles
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
