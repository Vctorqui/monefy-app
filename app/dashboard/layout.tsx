import type React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { FloatingCalculator } from "@/components/floating-calculator"	

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Ensure profile exists
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (error || !profile) {
    // Try to create profile if it doesn't exist
    const { error: createError } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        username: user.email?.split("@")[0] || "Usuario",
        currency: "USD",
      })

    if (createError) {
      console.error("Error creating profile in layout:", createError)
      // Don't redirect, let the individual pages handle this
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header con breadcrumb y perfil */}
        <Header 
          user={user}
          profile={profile}
        />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
      
      {/* Floating Calculator - Available in all dashboard pages */}
      <FloatingCalculator />
    </div>
  )
}
