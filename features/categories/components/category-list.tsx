'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
} from '@/components/ui/alert-dialog'
import { Pencil, Trash2, Tag } from 'lucide-react'
import { CategoryForm } from './category-form'

interface Category {
  id: string
  name: string
  type: string
}

interface CategoryListProps {
  categories: Category[]
}

export function CategoryList({ categories }: CategoryListProps) {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const router = useRouter()

  const incomeCategories = categories.filter((cat) => cat.type === 'income')
  const expenseCategories = categories.filter((cat) => cat.type === 'expense')

  const handleDelete = async (categoryId: string) => {
    const supabase = createClient()
    setDeletingId(categoryId)

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId)

      if (error) throw error

      router.refresh()
    } catch (error: unknown) {
      console.error('Error deleting category:', error)
    } finally {
      setDeletingId(null)
    }
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setIsEditOpen(true)
  }

  const CategoryItem = ({ category }: { category: Category }) => (
    <div className='flex items-center justify-between p-4 border rounded-lg bg-neutral-950/80 backdrop-blur-md border-neutral-800/50 shadow-2xl hover:bg-neutral-950/90 hover:border-sherwood-green-500/30 hover:shadow-sherwood-green-200/20 transition-all duration-300 group'>
      <div className='flex items-center gap-3'>
        <div className='h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center'>
          <Tag className='h-5 w-5 text-primary' />
        </div>
        <div>
          <p className='font-medium text-primary group-hover:text-primary/80 transition-colors duration-300'>{category.name}</p>
          <Badge
            variant={category.type === 'income' ? 'default' : 'secondary'}
            className='mt-1'
          >
            {category.type === 'income' ? 'Ingreso' : 'Gasto'}
          </Badge>
        </div>
      </div>
      <div className='flex gap-2'>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => handleEdit(category)}
        >
          <Pencil className='h-4 w-4' />
          <span className='sr-only'>Editar</span>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='ghost' size='icon' className='text-destructive group-hover:text-destructive/80 duration-300'>
              <Trash2 className='h-4 w-4' />
              <span className='sr-only'>Eliminar</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Las transacciones asociadas a
                esta categoría quedarán sin categoría.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                className='bg-destructive text-destructive-foreground group-hover:bg-destructive/80 hover:text-destructive-foreground/80 duration-300'
                onClick={() => handleDelete(category.id)}
                disabled={deletingId === category.id}
              >
                {deletingId === category.id ? 'Eliminando...' : 'Eliminar'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )

  return (
    <>
      <div className='space-y-6'>
        <div>
          <div className='mb-4'>
            <h3 className='text-lg font-semibold flex items-center gap-2 text-primary group-hover:text-primary/80 transition-colors duration-300'>
              <span className='h-2 w-2 rounded-full bg-green-500'></span>
              Categorías de Ingresos ({incomeCategories.length})
            </h3>
            <p className='text-muted-foreground text-sm  group-hover:text-neutral-300 transition-colors duration-300'>
              Crea categorías para organizar sus ingresos.
            </p>
          </div>
          {incomeCategories.length > 0 ? (
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {incomeCategories.map((category) => (
                <CategoryItem key={category.id} category={category} />
              ))}
            </div>
          ) : (
            <p className='text-muted-foreground text-sm  group-hover:text-neutral-300 transition-colors duration-300'>
              No hay categorías de ingresos
            </p>
          )}
        </div>

        <div>
          <div className='mb-4'>
            <h3 className='text-lg font-semibold flex items-center gap-2 text-primary group-hover:text-primary/80 transition-colors duration-300'>
              <span className='h-2 w-2 rounded-full bg-red-500'></span>
              Categorías de Gastos ({expenseCategories.length})
            </h3>
            <p className='text-muted-foreground text-sm  group-hover:text-neutral-300 transition-colors duration-300'>
              Crea categorías para organizar sus gastos.
            </p>
          </div>
          {expenseCategories.length > 0 ? (
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {expenseCategories.map((category) => (
                <CategoryItem key={category.id} category={category} />
              ))}
            </div>
          ) : (
            <p className='text-muted-foreground text-sm group-hover:text-neutral-300 transition-colors duration-300'>
              No hay categorías de gastos
            </p>
          )}
        </div>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Categoría</DialogTitle>
            <DialogDescription>
              Actualiza la información de tu categoría
            </DialogDescription>
          </DialogHeader>
          {editingCategory && (
            <CategoryForm
              category={editingCategory}
              onSuccess={() => setIsEditOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
