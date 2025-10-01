import { createClient } from "@/lib/supabase/client"

export async function ensureUserProfile(userId: string, username?: string, email?: string) {
  const supabase = createClient()
  
  // Check if profile exists
  const { data: existingProfile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single()
  
  // If profile exists, return it
  if (existingProfile && !profileError) {
    return { profile: existingProfile, created: false }
  }
  
  // If profile doesn't exist, create it
  const defaultUsername = username || email?.split("@")[0] || "Usuario"
  
  const { data: newProfile, error: createError } = await supabase
    .from("profiles")
    .insert({
      id: userId,
      username: defaultUsername,
      currency: "USD",
    })
    .select()
    .single()
  
  if (createError) {
    console.error("Error creating profile:", createError)
    throw new Error("No se pudo crear el perfil del usuario")
  }
  
  return { profile: newProfile, created: true }
}
