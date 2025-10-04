'use client'

import { Button } from '@/components/ui/button'
import { useActiveUser } from '@/hooks/use-active-user'
import { useRouter } from 'next/navigation'

export function HeroSection() {
  const MAX_USERS = 50
  const { activeUsers, loading } = useActiveUser()
  const router = useRouter()

  return (
    <section className='relative flex min-h-[60vh] items-center justify-center p-4 md:p-10'>
      {/* Background Image */}
      <div className='absolute inset-0 bg-cover bg-center' />

      {/* Content */}
      <div className='relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 text-center text-white'>
        {/* Beta Banner */}
        <div className='rounded-full bg-primary/20 px-4 py-1.5 text-sm font-semibold text-primary'>
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
              } slots restantes)`}
        </Button>
      </div>
    </section>
  )
}
