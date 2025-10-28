'use client'

import { Button } from '@/components/ui/button'
import { GlassButton } from '@/components/shared/glass-button'
import { useActiveUser } from '@/hooks/use-active-user'
import { Rocket, UserIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Aurora from '../aurora/aurora'
import RotatingText from '../rotating-text/rotating-text'

export function HeroSection() {
  const MAX_USERS = Number(process.env.NEXT_PUBLIC_MAX_USERS)
  console.log(MAX_USERS)
  const { activeUsers, loading } = useActiveUser()
  const router = useRouter()

  return (
    <div
      style={{
        // background: '#060010',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        display: 'flex',
        position: 'relative',
        height: '600px',
        overflow: 'hidden',
      }}
    >
      <Aurora
        colorStops={['#00d7af', '#00856c', '#00d7af']}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      <>
        <section
          id='hero'
          className='absolute flex min-h-[60vh] items-center justify-center p-4 md:p-10'
        >
          {/* Background Image */}
          <div className='absolute inset-0  bg-center' />

          {/* Content */}
          <div className='relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 text-center text-white pt-20'>
            {/* Beta Banner */}
            <GlassButton
              onClick={() => router.push('/auth/sign-up')}
              disabled={loading || activeUsers >= MAX_USERS}
              className='text-sm font-semibold'
            >
              Versión Beta Gratuita
            </GlassButton>

            {/* Main Heading */}
            <h1 className='text-4xl font-extrabold leading-tight tracking-tighter md:text-6xl'>
              Gestiona tus finanzas personales de forma {' '}
              <span className='text-primary'>simple.</span>
   {/*   
                <RotatingText
                  texts={['simple.', 'inteligente.', 'automática.']}
                  mainClassName='px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 rounded-lg inline'   
                  staggerFrom={'last'}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-120%' }}
                  staggerDuration={0.025}
                  splitLevelClassName='overflow-hidden pb-0.5 sm:pb-1 md:pb-1'
                  transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                /> */}
      
            </h1>

            {/* Description */}
            <p className='max-w-2xl text-lg text-gray-300'>
              Controla tus gastos, ingresos y tarjetas de crédito en un solo
              lugar. Toma decisiones financieras inteligentes con facilidad.
            </p>

            {/* CTA Button */}
            {activeUsers < MAX_USERS ? (
              <>
                <GlassButton
                  onClick={() => {
                    router.push('/auth/sign-up')
                  }}
                  disabled={loading}
                  className='h-12 px-6 text-base font-bold'
                >
                  {loading
                    ? 'Cargando...'
                    : `¡Solicitar acceso a la beta ahora! (${
                        MAX_USERS - activeUsers
                      } cupos restantes)`}
                  <Rocket className='h-4 w-4 ml-2' />
                </GlassButton>
                <div className='text-sm text-primary font-bold flex items-center gap-2'>
                  <UserIcon className='h-4 w-4 text-primary' />
                  <p>{`${activeUsers} usuarios activos`}</p>
                </div>
              </>
            ) : (
              <GlassButton
                onClick={() => {
                  router.push('/auth/login')
                }}
                disabled={loading}
                className='h-12 px-6 text-base font-bold'
              >
                Acceder
              </GlassButton>
            )}
          </div>
        </section>
      </>
    </div>
  )
}
