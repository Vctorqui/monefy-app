'use client'

import Link from 'next/link'
import { Github, Linkedin, Mail, Heart } from "lucide-react"

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
        
        {/* Developer Section */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                Desarrollado con <Heart className="inline h-4 w-4 text-red-500" /> por{" "}
                <span className="font-semibold text-foreground">Victor</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Frontend Developer & Creator of Monefy
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Vctorqui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                title="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              
              <a
                href="https://linkedin.com/in/victorqui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              
              <a
                href="mailto:victor.quinones.ch@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                title="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
