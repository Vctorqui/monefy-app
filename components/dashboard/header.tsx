"use client"

import { MobileNav } from "./mobile-nav"
import { Breadcrumb } from "./breadcrumb"
import { UserProfile } from "./user-profile"

interface HeaderProps {
  user?: {
    id: string
    email?: string
  }
  profile?: {
    username: string
    avatar_url?: string
  }
}

export function Header({ user, profile }: HeaderProps) {
  
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-neutral-800 bg-background px-4 md:px-6">
      {/* Lado izquierdo: Mobile nav + Breadcrumb */}
      <div className="flex items-center gap-4">
        <MobileNav />
        <div className="flex flex-col">
          <Breadcrumb />

        </div>
      </div>
      
      {/* Lado derecho: Perfil de usuario */}
      <div className="flex items-center">
        {user && profile && (
          <UserProfile user={user} profile={profile} />
        )}
      </div>
    </header>
  )
}
