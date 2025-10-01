"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CategoryFormProps {
  category?: {
    id: string
    name: string
    type: string
  }
  onSuccess?: () => void
}

export function CategoryForm({ category, onSuccess }: CategoryFormProps) {
  const [name, setName] = useState(category?.name || "")
  const [type, setType] = useState(category?.type || "expense")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) throw new Error("No autenticado")

      if (category) {
        // Update existing category
        const { error } = await supabase
          .from("categories")
          .update({
            name,
            type,
          })
          .eq("id", category.id)

        if (error) throw error
      } else {
        // Create new category
        const { error } = await supabase.from("categories").insert({
          user_id: user.id,
          name,
          type,
        })

        if (error) throw error
      }

      router.refresh()
      if (onSuccess) onSuccess()
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Error al guardar la categoría")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre de la categoría</Label>
        <Input
          id="name"
          type="text"
          placeholder="Ej: Alimentación"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Tipo</Label>
        <Select value={type} onValueChange={setType} disabled={isLoading}>
          <SelectTrigger id="type">
            <SelectValue placeholder="Selecciona un tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="income">Ingreso</SelectItem>
            <SelectItem value="expense">Gasto</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Guardando..." : category ? "Actualizar Categoría" : "Crear Categoría"}
      </Button>
    </form>
  )
}
