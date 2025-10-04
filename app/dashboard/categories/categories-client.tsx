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
import { CategoryForm } from "@/features/categories/components/category-form"
import { CategoryList } from "@/features/categories/components/category-list"

interface CategoriesClientPageProps {
  initialCategories: any[]
}

export function CategoriesClientPage({
  initialCategories
}: CategoriesClientPageProps) {
  const [categories, setCategories] = useState(initialCategories)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCategoryCreated = () => {
    setIsModalOpen(false)
    // Force refresh page to get updated data from server
    window.location.reload()
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-6 p-4 md:p-6">
        <div className="flex justify-center md:justify-between items-center md:flex-row flex-col gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">Mis Categorías</h2>
            <p className="text-muted-foreground">Total: {categories?.length || 0} categorías</p>
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Categoría
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crear Nueva Categoría</DialogTitle>
                <DialogDescription>Agrega una nueva categoría para organizar tus transacciones</DialogDescription>
              </DialogHeader>
              <CategoryForm onSuccess={handleCategoryCreated} />
            </DialogContent>
          </Dialog>
        </div>

        {categories && categories.length > 0 ? (
          <CategoryList categories={categories} />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-4">No tienes categorías aún</p>
          </div>
        )}
      </div>
    </div>
  )
}
