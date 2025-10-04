import { createClient } from "@/lib/supabase/server"
import { CardsClientPage } from "./cards-client"

// Cache revalidation configuration
export const revalidate = 90 // Revalidate every 90 seconds (credit cards change less frequently than transactions)

export default async function CreditCardsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return <div>Usuario no encontrado</div>
  }

  // Fetch user's currency from profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("currency")
    .eq("id", user.id)
    .single()

  const userCurrency = profile?.currency || "USD"

  // Fetch credit cards data
  const { data: creditCards } = await supabase
    .from("credit_cards")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <CardsClientPage
      initialCreditCards={creditCards || []}
      userCurrency={userCurrency}
    />
  )
}