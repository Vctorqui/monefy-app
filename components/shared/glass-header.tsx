'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useActiveUser } from '@/hooks/use-active-user'
import { useBetaLimit } from '@/hooks/use-beta-limit'
import { FinanzasAppIcon } from '../icon'
import { useState } from 'react'
import { LogIn, MenuIcon, UserPlus } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import './glassmorphism.css'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '#features', label: 'Funcionalidades' },
]

export function GlassHeader() {
  const { activeUsers, loading } = useActiveUser()
  const { isLimitReached } = useBetaLimit()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <header 
      id="header" 
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-10 py-4"
    >
      <div className="glass-container mx-auto max-w-7xl">
        <div className="glass-header flex items-center justify-between whitespace-nowrap px-6 py-4">
          {/* Logo */}
          <div className='flex items-center gap-3 cursor-pointer' onClick={() => router.push('/')}>
            <div className='size-8 text-white'>
              <FinanzasAppIcon />
            </div>
            <h2 className='text-lg md:text-xl font-bold text-white'>Monefy</h2>
          </div>

          {/* Desktop Navigation & Buttons */}
          <div className='hidden md:flex flex-1 items-center justify-end gap-6'>
            <nav className='flex items-center gap-6'>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className='text-sm font-medium text-white/80 hover:text-white transition-colors'
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            
            <div className='flex items-center gap-2'>
              <Link href='/auth/login'>
                <Button
                  variant='outline'
                  className='glass-button-outline flex h-10 min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-lg px-4 text-sm font-bold text-white border-white/30 hover:border-white/50 hover:bg-white/10'
                >
                  <span className='truncate'>Acceder</span>
                </Button>
              </Link>
              {!isLimitReached && (
                <Link href='/auth/sign-up'>
                  <Button className='glass-button-primary flex h-10 min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-lg px-4 text-sm font-bold text-white bg-white/20 hover:bg-white/30 border border-white/30'>
                    <span className='truncate'>Registrarse</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <div className='md:hidden'>
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className="text-white hover:bg-white/20">
                  <MenuIcon className='h-6 w-6' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-56 bg-black/80 backdrop-blur-md border-white/20'>
                {/* Navigation Links */}
                {navLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href} onClick={() => setOpen(false)}>
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                
                <DropdownMenuSeparator className="bg-white/20" />
                
                {/* Auth Buttons */}
                <DropdownMenuItem asChild>
                  <Link href='/auth/login' onClick={() => setOpen(false)}>
                    <div className="flex items-center w-full px-2 py-1.5 text-sm hover:bg-white/10 rounded-sm">
                      <LogIn className="h-5 w-5 shrink-0" />
                      Acceder
                    </div>
                  </Link>
                </DropdownMenuItem>
                
                {!isLimitReached && (
                  <DropdownMenuItem asChild>
                    <Link href='/auth/sign-up' onClick={() => setOpen(false)}>
                      <div className="flex items-center w-full px-2 py-1.5 text-sm hover:bg-white/10 rounded-sm">
                        <UserPlus className="h-5 w-5 shrink-0" />
                        Registrarse
                      </div>
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
