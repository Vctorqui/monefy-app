'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Pencil, Trash2 } from 'lucide-react'
import { AccountForm } from './account-form'
import { formatCurrency, type Currency } from '@/lib/utils/currency'

interface AccountCardProps {
  account: {
    id: string
    name: string
    type: string
    initial_balance: number
    current_balance: number
  }
  currency?: Currency
}

const accountTypeLabels: Record<string, string> = {
  checking: 'Cuenta corriente',
  savings: 'Cuenta de ahorros',
  cash: 'Efectivo',
  investment: 'Inversión',
}

export function AccountCard({ account, currency = 'USD' }: AccountCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    const supabase = createClient()
    setIsDeleting(true)

    try {
      const { error } = await supabase
        .from('accounts')
        .delete()
        .eq('id', account.id)

      if (error) throw error

      router.refresh()
    } catch (error: unknown) {
      console.error('Error deleting account:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div>
      <Card className='bg-neutral-950/80 backdrop-blur-md border border-neutral-800/50 shadow-2xl hover:bg-neutral-950/90 hover:border-sherwood-green-500/30 hover:shadow-sherwood-green-200/20 transition-all duration-300 group'>
        <CardHeader className='border-b border-neutral-800/50'>
          <div className='flex items-start justify-between'>
            <div>
              <CardTitle className='text-primary group-hover:text-primary/80 transition-colors duration-300'>{account.name}</CardTitle>
              <CardDescription className='text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300'>
                {accountTypeLabels[account.type] || account.type}
              </CardDescription>
            </div>
            <div className='flex gap-2'>
              <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogTrigger asChild>
                  <Button variant='ghost' size='icon' className='text-primary group-hover:text-primary/80 transition-colors duration-300'>
                    <Pencil className='h-4 w-4' />
                    <span className='sr-only'>Editar</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Editar Cuenta</DialogTitle>
                    <DialogDescription>
                      Actualiza la información de tu cuenta
                    </DialogDescription>
                  </DialogHeader>
                  <AccountForm
                    account={account}
                    onSuccess={() => setIsEditOpen(false)}
                  />
                </DialogContent>
              </Dialog>

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
                      Esta acción no se puede deshacer. Esto eliminará
                      permanentemente la cuenta y todas sus transacciones
                      asociadas.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                    className='bg-destructive text-destructive-foreground group-hover:bg-destructive/80 hover:text-destructive-foreground/80 duration-300'
                      onClick={handleDelete}
                      disabled={isDeleting}
                    >
                      {isDeleting ? 'Eliminando...' : 'Eliminar'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='space-y-2'>
            <div className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>Balance actual:</span>
              <span className='font-semibold text-lg text-primary group-hover:text-primary/80 transition-colors duration-300'>
                {formatCurrency(Number(account.current_balance), currency)}
              </span>
            </div>
            <div className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>Balance inicial:</span>
              <span className='text-primary group-hover:text-primary/80 transition-colors duration-300'>
                {formatCurrency(Number(account.initial_balance), currency)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
