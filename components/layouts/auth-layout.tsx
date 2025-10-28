'use client'

import { ReactNode } from 'react'
import { GlassHeader } from '@/components/shared/glass-header'
import { Footer } from '@/components/landing/footer'
import '@/components/shared/glassmorphism.css'

interface AuthLayoutProps {
  children: ReactNode
  showAppInfo?: boolean
  appInfoContent?: ReactNode
}

export function AuthLayout({ 
  children, 
  showAppInfo = true, 
  appInfoContent 
}: AuthLayoutProps) {
  return (
    <>
      <GlassHeader />
      <div className='min-h-screen flex'>
        {/* Sección izquierda - Información de la app con fondo de color */}
        {showAppInfo && (
          <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/60 to-primary/40 relative overflow-hidden justify-center'>
            <div className='absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/40'></div>
            <div className='relative z-10 flex flex-col justify-center h-full p-8 lg:p-12 pt-20 lg:pt-24'>
              {appInfoContent}
            </div>
          </div>
        )}

        {/* Sección derecha - Contenido principal con fondo del tema */}
        <div className={`flex-1 flex items-center justify-center p-6 pt-20 lg:pt-24 bg-neutral-950 ${showAppInfo ? 'lg:w-1/2' : 'w-full'}`}>
          <div className='w-full max-w-md'>
            {children}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  )
}
