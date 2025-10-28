'use client'

import { ReactNode } from 'react'
import { GlassHeader } from '@/components/shared/glass-header'
import { Footer } from '@/components/landing/footer'
import '@/components/shared/glassmorphism.css'

interface LandingLayoutProps {
  children: ReactNode
  className?: string
}

export function LandingLayout({ children, className = '' }: LandingLayoutProps) {
  return (
    <>
      <GlassHeader />
      <main className={`min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 ${className}`}>
        {children}
      </main>
      <Footer />
    </>
  )
}
