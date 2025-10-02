import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { ProfileForm } from "@/features/settings/components/profile-form"

export default async function SettingsPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user profile
  const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (error || !profile) {
    // If profile doesn't exist, create it
    const { data: newProfile, error: createError } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        username: user.email?.split("@")[0] || "Usuario",
        currency: "USD",
      })
      .select()
      .single()

    if (createError || !newProfile) {
      console.error("Error creating profile:", createError)
      redirect("/dashboard")
    }

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
          <p className="text-muted-foreground">Administra tu perfil y preferencias de la aplicación</p>
        </div>

        <ProfileForm profile={newProfile} />
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">Administra tu perfil y preferencias de la aplicación</p>
      </div>

      <ProfileForm profile={profile} />
    </div>
  )
}
