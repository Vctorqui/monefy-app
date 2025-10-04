import { createClient } from "@/lib/supabase/server"
import { AccountsClientPage } from "./accounts-client"

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
    .from("profiles")
    .select("currency")
    .eq("id", user.id)
    .single()

  const userCurrency = profile?.currency || "USD"

  // Fetch accounts data
  const { data: accounts } = await supabase
    .from("accounts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <AccountsClientPage
      initialAccounts={accounts || []}
      userCurrency={userCurrency}
    />
  )
}