'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
import { Footer } from '@/components/landing/footer'
import { Header } from '@/components/landing/header'

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
    <>
      <Header />
      <div className='flex min-h-screen w-full items-center justify-center p-6 bg-background'>
        <div className='w-full max-w-sm'>
          <Card>
            <CardHeader className='space-y-1'>
              <CardTitle className='text-2xl font-bold'>
                Iniciar Sesión
              </CardTitle>
              <CardDescription>
                Ingresa tu correo y contraseña para acceder
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='email'>Correo electrónico</Label>
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
                        className={errors.email ? 'border-destructive' : ''}
                      />
                    )}
                  />
                  {errors.email && (
                    <p className='text-sm text-destructive'>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='password'>Contraseña</Label>
                  <Controller
                    name='password'
                    control={control}
                    render={({ field }) => (
                      <Input
                        id='password'
                        type='password'
                        {...field}
                        disabled={isSubmitting}
                        className={errors.password ? 'border-destructive' : ''}
                      />
                    )}
                  />
                  {errors.password && (
                    <p className='text-sm text-destructive'>
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {error && (
                  <div className='p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md'>
                    {error}
                  </div>
                )}

                <Button
                  type='submit'
                  className='w-full'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </Button>
              </form>

              <div className='relative my-4'>
                <div className='absolute inset-0 flex items-center'>
                  <span className='w-full border-t' />
                </div>
                <div className='relative flex justify-center text-xs uppercase'>
                  <span className='bg-card px-2 text-muted-foreground'>
                    O continuar con
                  </span>
                </div>
              </div>

              {/* <Button
              type="button"
              variant="outline"
              className="w-full bg-transparent"
              onClick={handleGoogleLogin}
              disabled={isSubmitting}
              >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
                />
                <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
                />
                <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
                />
                <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
                />
                </svg>
                Google
                </Button> */}

              {!isLimitReached && (
                <div className='mt-4 text-center text-sm'>
                  ¿No tienes una cuenta?{' '}
                  <Link
                    href='/auth/sign-up'
                    className='underline underline-offset-4 hover:text-primary'
                  >
                    Regístrate
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  )
}
