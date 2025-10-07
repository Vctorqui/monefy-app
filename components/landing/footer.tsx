'use client'

import Link from 'next/link'
import { Github, Linkedin, Mail, Heart } from "lucide-react"

export function Footer() {

  const getCurrentYear = () => {
    return new Date().getFullYear()
  }

  return (
    <footer className="relative w-full py-16">
      <div className="mx-auto max-w-6xl px-5">
        {/* Main Footer Content */}
        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
            {/* Navigation Links */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              <Link href="/privacy-policy" className="text-gray-300 hover:text-primary transition-colors duration-300 font-medium">
                Política de privacidad
              </Link>
              <Link href="/terms-of-service" className="text-gray-300 hover:text-primary transition-colors duration-300 font-medium">
                Términos de servicio
              </Link>
              <Link href="mailto:victor.quinones.ch@gmail.com" className="text-gray-300 hover:text-primary transition-colors duration-300 font-medium">
                Contacto
              </Link>
            </div>
            
            {/* Copyright */}
            <p className="text-gray-300 font-medium">
              © {getCurrentYear()} Monefy. Todos los derechos reservados.
            </p>
          </div>
        </div>
        
        {/* Developer Section */}
        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-300 font-medium">
                Desarrollado con <Heart className="inline h-4 w-4 text-red-400 mx-1" /> por{" "}
                <span className="font-bold text-white">Victor</span>
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Frontend Developer & Creator of Monefy
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/Vctorqui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-300 hover:scale-110 transform"
                title="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              
              <a
                href="https://linkedin.com/in/victorqui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-300 hover:scale-110 transform"
                title="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              
              <a
                href="mailto:victor.quinones.ch@gmail.com"
                className="text-gray-400 hover:text-primary transition-colors duration-300 hover:scale-110 transform"
                title="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
