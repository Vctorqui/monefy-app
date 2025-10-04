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

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/features', label: 'Funcionalidades' },
  { href: '/contact', label: 'Contacto' },
]

export function Header() {
  const { activeUsers, loading } = useActiveUser()
  const { isLimitReached } = useBetaLimit()
  const [open, setOpen] = useState(false)

  return (
    <header className='flex items-center justify-between whitespace-nowrap border-b px-4 md:px-10 py-4 bg-background'>
      {/* Logo */}
      <div className='flex items-center gap-3'>
        <div className='size-8 text-primary'>
          <FinanzasAppIcon />
        </div>
        <h2 className='text-lg md:text-xl font-bold text-foreground'>Monefy</h2>
      </div>

      {/* Desktop Navigation & Buttons */}
      <div className='hidden md:flex flex-1 items-center justify-end gap-6'>
        <nav className='flex items-center gap-6'>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className='text-sm font-medium text-muted-foreground hover:text-primary transition-colors'
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className='flex items-center gap-2'>
          <Link href='/auth/login'>
            <Button
              variant='outline'
              className='flex h-10 min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-lg px-4 text-sm font-bold'
            >
              <span className='truncate'>Acceder</span>
            </Button>
          </Link>
          {!isLimitReached && (
            <Link href='/auth/sign-up'>
              <Button className='flex h-10 min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-lg px-4 text-sm font-bold'>
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
            <Button variant='ghost' size='icon'>
              <MenuIcon className='h-6 w-6' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-56'>
            {/* Navigation Links */}
            {navLinks.map((link) => (
              <DropdownMenuItem key={link.href} asChild>
                <Link href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </DropdownMenuItem>
            ))}
            
            <DropdownMenuSeparator />
            
            {/* Auth Buttons */}
            <DropdownMenuItem asChild>
              <Link href='/auth/login' onClick={() => setOpen(false)}>
                <div className="flex items-center w-full px-2 py-1.5 text-sm hover:bg-accent rounded-sm">
                  <LogIn className="h-5 w-5 shrink-0" />
                  Acceder
                </div>
              </Link>
            </DropdownMenuItem>
            
            {!isLimitReached && (
              <DropdownMenuItem asChild>
                <Link href='/auth/sign-up' onClick={() => setOpen(false)}>
                  <div className="flex items-center w-full px-2 py-1.5 text-sm hover:bg-accent rounded-sm">
                    <UserPlus className="h-5 w-5 shrink-0" />
                    Registrarse
                  </div>
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
