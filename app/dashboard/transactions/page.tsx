import { createClient } from "@/lib/supabase/server"
import { TransactionsClientPage } from "./transactions-client"

// Cache revalidation configuration
export const revalidate = 60 // Revalidate every 60 seconds

export default async function TransactionsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return <div>Usuario no encontrado</div>
  }

  // Fetch user's currency from profile with cache tag
  const { data: profile } = await supabase
    .from("profiles")
    .select("currency")
    .eq("id", user.id)
    .single()

  const userCurrency = profile?.currency || "USD"

  // Fetch all data in parallel with cache optimization
  const [
    { data: transactions },
    { data: accounts },
    { data: creditCards },
    { data: categories }
  ] = await Promise.all([
    supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false }),
    supabase
      .from("accounts")
      .select("id, name")
      .eq("user_id", user.id),
    supabase
      .from("credit_cards")
      .select("id, name, limit_amount, current_spent")
      .eq("user_id", user.id),
    supabase
      .from("categories")
      .select("id, name, type")
      .eq("user_id", user.id)
  ])

  return (
    <TransactionsClientPage
      initialTransactions={transactions || []}
      initialAccounts={accounts || []}
      initialCreditCards={creditCards || []}
      initialCategories={categories || []}
      userCurrency={userCurrency}
    />
  )
}