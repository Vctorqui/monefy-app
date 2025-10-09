"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useBetaLimit } from "@/hooks/use-beta-limit"
import { useAuthErrors } from "@/hooks/use-auth-errors"
import { signUpSchema, type SignUpFormData } from "@/lib/validations/auth"
import { toast } from "sonner"
import { AuthLayout } from "@/components/layouts/auth-layout"
import { GlassCard, GlassCardContent, GlassCardDescription, GlassCardHeader, GlassCardTitle } from "@/components/shared/glass-card"
import { AppInfoSection } from "@/components/auth/app-info-section"


export default function SignUpPage() {
  const { isLimitReached, loading: limitLoading } = useBetaLimit()
  const { error, handleSupabaseError, clearError } = useAuthErrors()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  })

  const password = watch("password")

  // Redirect if beta limit is reached
  useEffect(() => {
    if (isLimitReached) {
      router.push("/beta-full")
    }
  }, [isLimitReached, router])

  // Show loading state while checking limit
  if (limitLoading) {
    return (
      <AuthLayout showAppInfo={false}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sherwood-green-200 mx-auto"></div>
          <p className="mt-4 text-sm text-neutral-400">Verificando disponibilidad...</p>
        </div>
      </AuthLayout>
    )
  }

  const onSubmit = async (data: SignUpFormData) => {
    clearError()
    const supabase = createClient()

    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
          data: {
            username: data.username,
          },
        },
      })
      
      if (error) {
        handleSupabaseError(error)
        return
      }
      
      // If user was created successfully, ensure profile exists
      if (authData.user) {
        // Wait a moment for the trigger to execute
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Check if profile was created by the trigger
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", authData.user.id)
          .single()
        
        // If profile doesn't exist, create it manually
        if (profileError || !profile) {
          const { error: createError } = await supabase
            .from("profiles")
            .insert({
              id: authData.user.id,
              username: data.username,
              currency: "USD",
            })
          
          if (createError) {
            console.error("Error creating profile:", createError)
            // Don't throw error here, let the user continue
          }
        }

        toast.success("¡Cuenta creada exitosamente!", {
          description: "Revisa tu correo para verificar tu cuenta",
          duration: 5000,
        })
      }
      
      router.push("/auth/verify-email")
    } catch (error: unknown) {
      console.error('Signup error:', error)
      handleSupabaseError({ message: 'Error inesperado. Intenta nuevamente.' })
    }
  }

  const handleGoogleSignUp = async () => {
    const supabase = createClient()
    clearError()

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      })
      if (error) throw error
    } catch (error: unknown) {
      console.error('Google signup error:', error)
      handleSupabaseError(error)
    }
  }

  return (
    <AuthLayout appInfoContent={<AppInfoSection isLogin={false} />}>
      <GlassCard>
        <GlassCardHeader>
          <GlassCardTitle>Crear Cuenta</GlassCardTitle>
          <GlassCardDescription>Ingresa tus datos para crear una cuenta nueva</GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-neutral-400">Nombre de usuario</Label>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <Input
                    id="username"
                    type="text"
                    placeholder="usuario123"
                    {...field}
                    disabled={isSubmitting}
                    className={`bg-neutral-900/50 border-neutral-700 text-neutral-50 placeholder:text-neutral-500 focus:border-sherwood-green-500 focus:ring-sherwood-green-500/20 ${errors.username ? "border-red-400" : ""}`}
                  />
                )}
              />
              {errors.username && (
                <p className="text-sm text-red-400">{errors.username.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-neutral-400">Correo electrónico</Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@correo.com"
                    {...field}
                    disabled={isSubmitting}
                    className={`bg-neutral-900/50 border-neutral-700 text-neutral-50 placeholder:text-neutral-500 focus:border-sherwood-green-500 focus:ring-sherwood-green-500/20 ${errors.email ? "border-red-400" : ""}`}
                  />
                )}
              />
              {errors.email && (
                <p className="text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-neutral-400">Contraseña</Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    id="password"
                    type="password"
                    {...field}
                    disabled={isSubmitting}
                    className={`bg-neutral-900/50 border-neutral-700 text-neutral-50 placeholder:text-neutral-500 focus:border-sherwood-green-500 focus:ring-sherwood-green-500/20 ${errors.password ? "border-red-400" : ""}`}
                  />
                )}
              />
              {errors.password && (
                <p className="text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-neutral-400">Confirmar Contraseña</Label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...field}
                    disabled={isSubmitting}
                    className={`bg-neutral-900/50 border-neutral-700 text-neutral-50 placeholder:text-neutral-500 focus:border-sherwood-green-500 focus:ring-sherwood-green-500/20 ${errors.confirmPassword ? "border-red-400" : ""}`}
                  />
                )}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-400">{errors.confirmPassword.message}</p>
              )}
            </div>

            {error && (
              <div className="p-3 text-sm text-red-400 bg-red-500/20 border border-red-500/30 rounded-md">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full bg-sherwood-green-500 hover:bg-sherwood-green-600 text-white border-sherwood-green-500" disabled={isSubmitting}>
              {isSubmitting ? "Creando cuenta..." : "Crear Cuenta"}
            </Button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-neutral-700" />
            </div>
          </div>

          <div className="mt-4 text-center text-sm text-neutral-400">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/auth/login" className="underline underline-offset-4 hover:text-sherwood-green-200 text-sherwood-green-200">
              Inicia sesión
            </Link>
          </div>
        </GlassCardContent>
      </GlassCard>
    </AuthLayout>
  )
}