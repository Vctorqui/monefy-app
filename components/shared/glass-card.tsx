'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: ReactNode
  className?: string
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass-card',
        'bg-neutral-950/80 backdrop-blur-md border border-neutral-800/50 rounded-2xl shadow-2xl',
        'hover:bg-neutral-950/90 transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  )
}

// Glass Card Header
interface GlassCardHeaderProps {
  children: ReactNode
  className?: string
}

export function GlassCardHeader({ children, className }: GlassCardHeaderProps) {
  return (
    <div className={cn('p-6 pb-4', className)}>
      {children}
    </div>
  )
}

// Glass Card Content
interface GlassCardContentProps {
  children: ReactNode
  className?: string
}

export function GlassCardContent({ children, className }: GlassCardContentProps) {
  return (
    <div className={cn('p-6 pt-0', className)}>
      {children}
    </div>
  )
}

// Glass Card Title
interface GlassCardTitleProps {
  children: ReactNode
  className?: string
}

export function GlassCardTitle({ children, className }: GlassCardTitleProps) {
  return (
    <h2 className={cn('text-2xl font-bold text-neutral-50 mb-2', className)}>
      {children}
    </h2>
  )
}

// Glass Card Description
interface GlassCardDescriptionProps {
  children: ReactNode
  className?: string
}

export function GlassCardDescription({ children, className }: GlassCardDescriptionProps) {
  return (
    <p className={cn('text-neutral-400 text-sm', className)}>
      {children}
    </p>
  )
}
