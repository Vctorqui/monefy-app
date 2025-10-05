'use client'

import { Button } from '@/components/ui/button'
import { useActiveUser } from '@/hooks/use-active-user'
import { UserIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function HeroSection() {
  const MAX_USERS = Number(process.env.NEXT_PUBLIC_MAX_USERS)
  console.log(MAX_USERS)
  const { activeUsers, loading } = useActiveUser()
  const router = useRouter()

  return (
    <section id="hero" className='relative flex min-h-[60vh] items-center justify-center p-4 md:p-10'>
      {/* Background Image */}
      <div className='absolute inset-0 bg-cover bg-center' />

      {/* Content */}
      <div className='relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 text-center text-white'>
        {/* Beta Banner */}
        <div className='rounded-full bg-primary/20 px-4 py-1.5 text-sm font-semibold animate-bounce text-primary'>
          Versión Beta Gratuita
        </div>

        {/* Main Heading */}
        <h1 className='text-4xl font-extrabold leading-tight tracking-tighter md:text-6xl'>
          Gestiona tus finanzas personales de forma simple.
        </h1>

        {/* Description */}
        <p className='max-w-2xl text-lg text-gray-300'>
          Controla tus gastos, ingresos y tarjetas de crédito en un solo lugar.
          Toma decisiones financieras inteligentes.
        </p>

        {/* CTA Button */}
        {activeUsers < MAX_USERS ? (
          <>
            <Button
              size='lg'
              className='mt-4 h-12 px-6 text-base font-bold shadow-lg transition-transform hover:scale-105'
              disabled={loading}
              onClick={() => {
                router.push('/auth/sign-up')
              }}
            >
              {loading
                ? 'Cargando...'
                : `Solicitar acceso a la beta (${
                    MAX_USERS - activeUsers
                  } cupos restantes)`}
            </Button>
            <div className='text-sm text-muted-foreground flex items-center gap-2'>
              <UserIcon className='h-4 w-4 text-primary' />
              <p>{`${activeUsers} usuarios activos`}</p>
            </div>
          </>
        ) : (
          <Button
            size='lg'
            className='mt-4 h-12 px-6 text-base font-bold shadow-lg transition-transform hover:scale-105'
            disabled={loading}
            onClick={() => {
              router.push('/auth/login')
            }}
          >
            Acceder
          </Button>
        )}
      </div>
    </section>
  )
}
