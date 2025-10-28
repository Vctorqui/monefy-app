import { createClient } from '@/lib/supabase/server'
import { AccountsClientPage } from './accounts-client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CardsClientPage } from '../cards/cards-client'

// Cache revalidation configuration
export const revalidate = 120 // Revalidate every 2 minutes (accounts change less frequently)

export default async function AccountsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return <div>Usuario no encontrado</div>
  }

  // Fetch user's currency from profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('currency')
    .eq('id', user.id)
    .single()

  const userCurrency = profile?.currency || 'USD'

  // Fetch accounts data
  const { data: accounts } = await supabase
    .from('accounts')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  // Fetch credit cards data
  const { data: creditCards } = await supabase
    .from('credit_cards')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className='space-y-4'>
      <div>Puede gestionar sus cuentas y tarjetas de crédito</div>
      <Tabs defaultValue='accounts'>
        <TabsList className='bg-neutral-950/80 backdrop-blur-md border border-neutral-800/50 shadow-2xl hover:bg-neutral-950/90 hover:border-sherwood-green-500/30 hover:shadow-sherwood-green-200/20 transition-all duration-300 group'>
          <TabsTrigger value='accounts'>Cuentas</TabsTrigger>
          <TabsTrigger value='credit-cards'>Tarjetas de Crédito</TabsTrigger>
        </TabsList>
        <TabsContent value='accounts'>
          <AccountsClientPage
            initialAccounts={accounts || []}
            userCurrency={userCurrency}
          />
        </TabsContent>
        <TabsContent value='credit-cards'>
          <CardsClientPage
            initialCreditCards={creditCards || []}
            userCurrency={userCurrency}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
