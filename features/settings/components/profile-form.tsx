"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createBrowserClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

interface ProfileFormProps {
  profile: {
    id: string
    username: string
    currency: "USD" | "CLP"
    avatar_url: string | null
  }
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const router = useRouter()
  const supabase = createBrowserClient()
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState(profile.username)
  const [currency, setCurrency] = useState<"USD" | "CLP">(profile.currency)
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url || "")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          username,
          currency,
          avatar_url: avatarUrl || null,
        })
        .eq("id", profile.id)

      if (error) throw error

      router.refresh()
      alert("Perfil actualizado correctamente")
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Error al actualizar el perfil")
    } finally {
      setIsLoading(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información del Perfil</CardTitle>
        <CardDescription>Actualiza tu información personal y preferencias</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Preview */}
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={username} />
              <AvatarFallback className="text-lg">{getInitials(username)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Label htmlFor="avatar_url">URL de Imagen de Perfil</Label>
              <Input
                id="avatar_url"
                type="url"
                placeholder="https://ejemplo.com/avatar.jpg"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="mt-1.5"
              />
              <p className="mt-1 text-xs text-muted-foreground">Ingresa la URL de tu imagen de perfil</p>
            </div>
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username">Nombre a Previsualizar</Label>
            <Input
              id="username"
              type="text"
              placeholder="Tu nombre"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">Este nombre se mostrará en tu perfil</p>
          </div>

          {/* Currency */}
          <div className="space-y-2">
            <Label htmlFor="currency">Moneda Base</Label>
            <Select value={currency} onValueChange={(value: "USD" | "CLP") => setCurrency(value)}>
              <SelectTrigger id="currency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD - Dólar Estadounidense</SelectItem>
                <SelectItem value="CLP">CLP - Peso Chileno</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Todos los montos se mostrarán en esta moneda</p>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Guardar Cambios
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
