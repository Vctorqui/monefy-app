'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import './glassmorphism.css'

interface GlassButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  variant?: 'primary' | 'secondary'
}

export function GlassButton({ 
  children, 
  onClick, 
  disabled = false, 
  className,
  variant = 'primary'
}: GlassButtonProps) {
  return (
    <div className="relative inline-block">
      <div className="glass-button-container">
        <Button
          onClick={onClick}
          disabled={disabled}
          className={cn(
            "glass-button relative z-10 px-6 py-3 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:opacity-50 mt-0",
            variant === 'primary' 
              ? "bg-white/20 hover:bg-white/30" 
              : "bg-black/20 hover:bg-black/30",
            className
          )}
        >
          {children}
        </Button>
      </div>
    </div>
  )
}
