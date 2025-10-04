'use client'

import Link from 'next/link'

export function Footer() {

  const getCurrentYear = () => {
    return new Date().getFullYear()
  }

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-5xl px-5 py-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Política de privacidad
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Términos de servicio
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Contacto
            </Link>
          </div>
          
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {getCurrentYear()} Monefy. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
