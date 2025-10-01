"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { ensureUserProfile } from "@/lib/utils/profile"
import type { User } from "@supabase/supabase-js"

interface AuthState {
  user: User | null
  profile: any | null
  loading: boolean
  error: string | null
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const supabase = createClient()

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          setAuthState(prev => ({ ...prev, error: error.message, loading: false }))
          return
        }

        if (session?.user) {
          try {
            const { profile } = await ensureUserProfile(
              session.user.id,
              session.user.user_metadata?.username,
              session.user.email
            )
            setAuthState({
              user: session.user,
              profile,
              loading: false,
              error: null,
            })
          } catch (profileError) {
            console.error("Error ensuring profile:", profileError)
            setAuthState({
              user: session.user,
              profile: null,
              loading: false,
              error: "Error al cargar el perfil del usuario",
            })
          }
        } else {
          setAuthState({
            user: null,
            profile: null,
            loading: false,
            error: null,
          })
        }
      } catch (error) {
        setAuthState(prev => ({
          ...prev,
          error: error instanceof Error ? error.message : "Error desconocido",
          loading: false,
        }))
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          try {
            const { profile } = await ensureUserProfile(
              session.user.id,
              session.user.user_metadata?.username,
              session.user.email
            )
            setAuthState({
              user: session.user,
              profile,
              loading: false,
              error: null,
            })
          } catch (profileError) {
            console.error("Error ensuring profile on sign in:", profileError)
            setAuthState({
              user: session.user,
              profile: null,
              loading: false,
              error: "Error al cargar el perfil del usuario",
            })
          }
        } else if (event === "SIGNED_OUT") {
          setAuthState({
            user: null,
            profile: null,
            loading: false,
            error: null,
          })
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return authState
}
