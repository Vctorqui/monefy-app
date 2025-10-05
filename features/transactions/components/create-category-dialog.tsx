"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { toast } from "sonner"

interface CreateCategoryDialogProps {
  onCategoryCreated: (category: { id: string; name: string; type: string }) => void
  currentType: string
  isOpen?: boolean
  onClose?: () => void
}

export function CreateCategoryDialog({ 
  onCategoryCreated, 
  currentType, 
  isOpen: externalIsOpen, 
  onClose: externalOnClose 
}: CreateCategoryDialogProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [type, setType] = useState(currentType)
  const [isLoading, setIsLoading] = useState(false)

  // Usar el estado externo si está disponible, sino usar el interno
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen
  const setIsOpen = externalOnClose ? externalOnClose : setInternalIsOpen

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) {
      toast.error("El nombre de la categoría es requerido")
      return
    }

    setIsLoading(true)
    
    try {
      const supabase = createClient()
      
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Usuario no autenticado")

      const { data, error } = await supabase
        .from("categories")
        .insert({
          name: name.trim(),
          type,
          user_id: user.id
        })
        .select()
        .single()

      if (error) throw error

      toast.success("Categoría creada exitosamente")
      onCategoryCreated(data)
      setName("")
      setIsOpen(false)
    } catch (error) {
      console.error("Error creating category:", error)
      toast.error("Error al crear la categoría")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {externalIsOpen === undefined && (
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Crear Nueva Categoría
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Nueva Categoría</DialogTitle>
          <DialogDescription>
            Añade una nueva categoría para organizar mejor tus transacciones.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category-name">Nombre de la categoría</Label>
            <Input
              id="category-name"
              placeholder="Ej: Comida, Transporte, Entretenimiento..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category-type">Tipo</Label>
            <Select value={type} onValueChange={setType} disabled={isLoading}>
              <SelectTrigger id="category-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Ingreso</SelectItem>
                <SelectItem value="expense">Gasto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creando..." : "Crear Categoría"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
