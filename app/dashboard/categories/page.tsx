import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/dashboard/header"
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

export default async function CategoriesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .eq("user_id", user?.id)
    .order("type", { ascending: false })
    .order("name", { ascending: true })

  return (
    <div className="flex flex-col">
      <Header title="Categorías" description="Organiza tus transacciones con categorías personalizadas" />

      <div className="flex-1 space-y-6 p-4 md:p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Mis Categorías</h2>
            <p className="text-muted-foreground">Total: {categories?.length || 0} categorías</p>
          </div>
          <Dialog>
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
              <CategoryForm />
            </DialogContent>
          </Dialog>
        </div>

        {categories && categories.length > 0 ? (
          <CategoryList categories={categories} />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-4">No tienes categorías aún</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Crear tu primera categoría
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Crear Nueva Categoría</DialogTitle>
                  <DialogDescription>Agrega una nueva categoría para organizar tus transacciones</DialogDescription>
                </DialogHeader>
                <CategoryForm />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  )
}
