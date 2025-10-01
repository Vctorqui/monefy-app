"use client"

import { MobileNav } from "./mobile-nav"

interface HeaderProps {
  title: string
  description?: string
}

export function Header({ title, description }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <MobileNav />
      <div className="flex-1">
        <h1 className="text-xl font-semibold md:text-2xl">{title}</h1>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
    </header>
  )
}
