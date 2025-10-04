import { createClient } from "@/lib/supabase/server"
import { CategoriesClientPage } from "./categories-client"

// Cache revalidation configuration  
export const revalidate = 600 // Revalidate every 10 minutes (categories change rarely)

export default async function CategoriesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return <div>Usuario no encontrado</div>
  }

  // Fetch categories data
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .eq("user_id", user.id)
    .order("type", { ascending: false })
    .order("name", { ascending: true })

  return (
    <CategoriesClientPage
      initialCategories={categories || []}
    />
  )
}