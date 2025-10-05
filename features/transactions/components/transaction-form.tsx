'use client'

import type React from 'react'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { CreateCategoryDialog } from './create-category-dialog'

interface TransactionFormProps {
  accounts: Array<{ id: string; name: string }>
  creditCards: Array<{
    id: string
    name: string
    limit_amount: number
    current_spent: number
  }>
  categories: Array<{ id: string; name: string; type: string }>
  transaction?: {
    id: string
    account_id: string
    account_type: string
    category_id: string | null
    date: string
    amount: number
    description: string | null
    type: string
  }
  onSuccess?: () => void
}

export function TransactionForm({
  accounts,
  creditCards,
  categories,
  transaction,
  onSuccess,
}: TransactionFormProps) {
  const [accountId, setAccountId] = useState(transaction?.account_id || '')
  const [categoryId, setCategoryId] = useState(transaction?.category_id || '')
  const [date, setDate] = useState(
    transaction?.date || new Date().toISOString().split('T')[0]
  )
  const [amount, setAmount] = useState(transaction?.amount?.toString() || '')
  const [description, setDescription] = useState(transaction?.description || '')
  const [type, setType] = useState(transaction?.type || 'expense')
  const [accountType, setAccountType] = useState<'account' | 'credit_card'>(
    (transaction?.account_type as 'account' | 'credit_card') || 'account'
  )
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [localCategories, setLocalCategories] = useState(categories)
  const [showCreateCategory, setShowCreateCategory] = useState(false)
  const router = useRouter()

  const filteredCategories = localCategories.filter((cat) => cat.type === type)

  const handleCategoryCreated = (newCategory: {
    id: string
    name: string
    type: string
  }) => {
    setLocalCategories((prev) => [...prev, newCategory])
    setCategoryId(newCategory.id)
    setShowCreateCategory(false)
    toast.success(`Categoría "${newCategory.name}" creada y seleccionada`)
  }

  const handleCategoryChange = (value: string) => {
    if (value === 'create') {
      // Abrir el modal de crear categoría
      // Esto se manejará con un estado para controlar el modal
      setShowCreateCategory(true)
    } else {
      setCategoryId(value)
    }
  }

  // Reset type to expense when credit card is selected
  const handleAccountTypeChange = (value: 'account' | 'credit_card') => {
    setAccountType(value)
    setAccountId('') // Reset selection when changing type
    if (value === 'credit_card') {
      setType('expense') // Credit cards can only have expenses
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) throw new Error('No autenticado')

      const transactionAmount = Number.parseFloat(amount)

      if (transaction) {
        // Update existing transaction
        const { error } = await supabase
          .from('transactions')
          .update({
            account_id: accountId,
            account_type: accountType,
            category_id: categoryId || null,
            date,
            amount: transactionAmount,
            description: description || null,
            type,
          })
          .eq('id', transaction.id)

        if (error) throw error

        // Update balance based on account type
        if (accountType === 'account') {
          const { data: account } = await supabase
            .from('accounts')
            .select('current_balance')
            .eq('id', accountId)
            .single()
          if (account) {
            const oldAmount =
              transaction.type === 'income'
                ? -transaction.amount
                : transaction.amount
            const newAmount =
              type === 'income' ? transactionAmount : -transactionAmount
            const newBalance =
              Number(account.current_balance) + oldAmount + newAmount
            await supabase
              .from('accounts')
              .update({ current_balance: newBalance })
              .eq('id', accountId)
            toast.success('Transacción actualizada correctamente')
          }
        } else {
          const { data: card } = await supabase
            .from('credit_cards')
            .select('current_spent')
            .eq('id', accountId)
            .single()
          if (card) {
            const oldAmount =
              transaction.type === 'expense'
                ? transaction.amount
                : -transaction.amount
            const newAmount =
              type === 'expense' ? transactionAmount : -transactionAmount
            const newSpent = Number(card.current_spent) - oldAmount + newAmount
            await supabase
              .from('credit_cards')
              .update({ current_spent: newSpent })
              .eq('id', accountId)
            toast.success('Transacción actualizada correctamente')
          }
        }
      } else {
        // Create new transaction
        const { error } = await supabase.from('transactions').insert({
          user_id: user.id,
          account_id: accountId,
          account_type: accountType,
          category_id: categoryId || null,
          date,
          amount: transactionAmount,
          description: description || null,
          type,
        })

        if (error) throw error

        // Update balance based on account type
        if (accountType === 'account') {
          const { data: account } = await supabase
            .from('accounts')
            .select('current_balance')
            .eq('id', accountId)
            .single()
          if (account) {
            const balanceChange =
              type === 'income' ? transactionAmount : -transactionAmount
            const newBalance = Number(account.current_balance) + balanceChange
            await supabase
              .from('accounts')
              .update({ current_balance: newBalance })
              .eq('id', accountId)
            toast.success('Transacción creada correctamente')
          }
        } else {
          const { data: card } = await supabase
            .from('credit_cards')
            .select('current_spent')
            .eq('id', accountId)
            .single()
          if (card) {
            const spentChange =
              type === 'expense' ? transactionAmount : -transactionAmount
            const newSpent = Number(card.current_spent) + spentChange
            await supabase
              .from('credit_cards')
              .update({ current_spent: newSpent })
              .eq('id', accountId)
            toast.success('Transacción creada correctamente')
          }
        }
      }

      router.refresh()
      if (onSuccess) onSuccess()
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Error al guardar la transacción'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='type'>Tipo</Label>
        <Select
          value={type}
          onValueChange={setType}
          disabled={isLoading || accountType === 'credit_card'}
        >
          <SelectTrigger id='type'>
            <SelectValue placeholder='Selecciona un tipo' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='income'>Ingreso</SelectItem>
            <SelectItem value='expense'>Gasto</SelectItem>
          </SelectContent>
        </Select>
        {accountType === 'credit_card' && (
          <p className='text-xs text-muted-foreground'>
            Las tarjetas de crédito solo permiten gastos
          </p>
        )}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='accountType'>Tipo de Cuenta</Label>
        <Select
          value={accountType}
          onValueChange={handleAccountTypeChange}
          disabled={isLoading}
        >
          <SelectTrigger id='accountType'>
            <SelectValue placeholder='Selecciona el tipo de cuenta' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='account'>Cuenta Bancaria</SelectItem>
            <SelectItem value='credit_card'>Tarjeta de Crédito</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='account'>
          {accountType === 'account' ? 'Cuenta' : 'Tarjeta de Crédito'}
        </Label>
        <Select
          value={accountId}
          onValueChange={setAccountId}
          disabled={isLoading}
          required
        >
          <SelectTrigger id='account'>
            <SelectValue
              placeholder={`Selecciona una ${
                accountType === 'account' ? 'cuenta' : 'tarjeta'
              }`}
            />
          </SelectTrigger>
          <SelectContent>
            {accountType === 'account'
              ? accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name}
                  </SelectItem>
                ))
              : creditCards.map((card) => (
                  <SelectItem key={card.id} value={card.id}>
                    {card.name} - Disponible: $
                    {(card.limit_amount - card.current_spent).toLocaleString()}
                  </SelectItem>
                ))}
          </SelectContent>
        </Select>
        {accountType === 'credit_card' && accountId && (
          <p className='text-xs text-muted-foreground'>
            Solo se pueden registrar gastos con tarjetas de crédito
          </p>
        )}
      </div>

       <div className='space-y-2'>
         <Label htmlFor='category'>Categoría</Label>
         <Select
           value={categoryId}
           onValueChange={handleCategoryChange}
           disabled={isLoading}
         >
           <SelectTrigger id='category'>
             <SelectValue placeholder='Selecciona una categoría' />
           </SelectTrigger>
           <SelectContent>
             <SelectGroup>
               <SelectItem value='create'>Crear nueva categoría</SelectItem>
               {filteredCategories.map((category) => (
                 <SelectItem key={category.id} value={category.id}>
                   {category.name}
                 </SelectItem>
               ))}
             </SelectGroup>
           </SelectContent>
         </Select>
       </div>

      <div className='space-y-2'>
        <Label htmlFor='amount'>Monto</Label>
        <Input
          id='amount'
          type='number'
          step='0.01'
          placeholder='0.00'
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='date'>Fecha</Label>
        <Input
          id='date'
          type='date'
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='description'>Descripción</Label>
        <Textarea
          id='description'
          placeholder='Descripción de la transacción'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
        />
      </div>

      {error && <p className='text-sm text-destructive'>{error}</p>}

       <Button type='submit' className='w-full' disabled={isLoading}>
         {isLoading
           ? 'Guardando...'
           : transaction
           ? 'Actualizar Transacción'
           : 'Crear Transacción'}
       </Button>
     </form>

     {/* Modal para crear categoría */}
     {showCreateCategory && (
       <CreateCategoryDialog
         onCategoryCreated={handleCategoryCreated}
         currentType={type}
         isOpen={showCreateCategory}
         onClose={() => setShowCreateCategory(false)}
       />
     )}
    </>
  )
}
