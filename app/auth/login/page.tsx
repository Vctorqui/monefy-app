'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { useActiveUser } from '@/hooks/use-active-user'
import { useBetaLimit } from '@/hooks/use-beta-limit'
import { useAuthErrors } from '@/hooks/use-auth-errors'
import { loginSchema, type LoginFormData } from '@/lib/validations/auth'
import { AuthLayout } from '@/components/layouts/auth-layout'
import { GlassCard, GlassCardContent, GlassCardDescription, GlassCardHeader, GlassCardTitle } from '@/components/shared/glass-card'
import { AppInfoSection } from '@/components/auth/app-info-section'

export default function LoginPage() {
  const { activeUsers } = useActiveUser()
  const { isLimitReached } = useBetaLimit()
  const { error, handleSupabaseError, clearError } = useAuthErrors()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // Verificar errores de URL (callback de verificación)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const urlError = urlParams.get('error')

    if (urlError) {
      switch (urlError) {
        case 'verification_failed':
          handleSupabaseError({
            message:
              'Error al verificar el correo. Intenta registrarte nuevamente.',
          })
          break
        case 'no_code':
          handleSupabaseError({ message: 'Enlace de verificación inválido.' })
          break
        case 'unexpected_error':
          handleSupabaseError({
            message: 'Error inesperado. Intenta nuevamente.',
          })
          break
        default:
          handleSupabaseError({
            message: 'Error en la verificación del correo.',
          })
      }
    }
  }, [handleSupabaseError])

  const onSubmit = async (data: LoginFormData) => {
    clearError()
    const supabase = createClient()

    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) {
        handleSupabaseError(error)
        return
      }

      if (authData.user) {
        toast.success('¡Bienvenido! Has iniciado sesión correctamente', {
          description: 'Redirigiendo al dashboard...',
          duration: 3000,
        })

        setTimeout(() => {
          router.push('/dashboard')
          router.refresh()
        }, 1000)
      }
    } catch (error: unknown) {
      console.error('Login error:', error)
      handleSupabaseError({ message: 'Error inesperado. Intenta nuevamente.' })
    }
  }

  const handleGoogleLogin = async () => {
    const supabase = createClient()
    clearError()

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      })
      if (error) throw error
    } catch (error: unknown) {
      console.error('Google login error:', error)
      handleSupabaseError(error)
    }
  }

  return (
    <AuthLayout appInfoContent={<AppInfoSection isLogin={true} />}>
      <GlassCard>
        <GlassCardHeader>
          <GlassCardTitle>
            Iniciar Sesión
          </GlassCardTitle>
          <GlassCardDescription>
            Ingresa tu correo y contraseña para acceder
          </GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email' className='text-neutral-400'>Correo electrónico</Label>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <Input
                    id='email'
                    type='email'
                    placeholder='tu@correo.com'
                    {...field}
                    disabled={isSubmitting}
                    className={`bg-neutral-900/50 border-neutral-700 text-neutral-50 placeholder:text-neutral-500 focus:border-sherwood-green-500 focus:ring-sherwood-green-500/20 ${errors.email ? 'border-red-400' : ''}`}
                  />
                )}
              />
              {errors.email && (
                <p className='text-sm text-red-400'>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='password' className='text-neutral-400'>Contraseña</Label>
              <Controller
                name='password'
                control={control}
                render={({ field }) => (
                  <Input
                    id='password'
                    type='password'
                    {...field}
                    disabled={isSubmitting}
                    className={`bg-neutral-900/50 border-neutral-700 text-neutral-50 placeholder:text-neutral-500 focus:border-sherwood-green-500 focus:ring-sherwood-green-500/20 ${errors.password ? 'border-red-400' : ''}`}
                  />
                )}
              />
              {errors.password && (
                <p className='text-sm text-red-400'>
                  {errors.password.message}
                </p>
              )}
            </div>

            {error && (
              <div className='p-3 text-sm text-red-400 bg-red-500/20 border border-red-500/30 rounded-md'>
                {error}
              </div>
            )}

            <Button
              type='submit'
              className='w-full bg-sherwood-green-500 hover:bg-sherwood-green-600 text-white border-sherwood-green-500'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>

          <div className='relative my-4'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t border-neutral-700' />
            </div>
          </div>

          {!isLimitReached && (
            <div className='mt-4 text-center text-sm text-neutral-400'>
              ¿No tienes una cuenta?{' '}
              <Link
                href='/auth/sign-up'
                className='underline underline-offset-4 hover:text-sherwood-green-200 text-sherwood-green-200'
              >
                Regístrate
              </Link>
            </div>
          )}
        </GlassCardContent>
      </GlassCard>
    </AuthLayout>
  )
}
