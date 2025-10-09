'use client'

import Link from 'next/link'
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react'
import { FinanzasAppIcon as AppIcon } from '@/components/icon'

export function Footer() {
  const getCurrentYear = () => {
    return new Date().getFullYear()
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className='relative w-full py-16 overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/50 to-transparent' />

      {/* Decorative Elements */}
      <div className='absolute top-0 left-1/4 w-32 h-32 bg-sherwood-green-500/10 rounded-full blur-3xl' />
      <div className='absolute bottom-0 right-1/4 w-40 h-40 bg-sherwood-green-200/5 rounded-full blur-3xl' />

      <div className='relative mx-auto max-w-6xl px-5'>
        {/* Main Footer Content */}
        <div className='backdrop-blur-md bg-neutral-950/80 border border-neutral-800/50 rounded-3xl p-8 mb-8 shadow-2xl'>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
            {/* Brand Section */}
            <div className='flex flex-col items-center lg:items-start'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='size-10 text-primary'>
                  <AppIcon />
                </div>
                <h3 className='text-2xl font-bold text-neutral-50'>Monefy</h3>
              </div>
              <p className='text-neutral-400 text-center lg:text-left max-w-sm'>
                La herramienta definitiva para gestionar tus finanzas personales
                de manera inteligente y eficiente.
              </p>
            </div>

            {/* Navigation Links */}
            <div className='flex flex-wrap items-center justify-center gap-x-8 gap-y-4'>
              <Link
                href='/privacy-policy'
                className='text-neutral-400 hover:text-primary transition-all duration-300 font-medium hover:scale-105 transform hover:shadow-lg hover:shadow-sherwood-green-500/20'
              >
                Política de privacidad
              </Link>
              <Link
                href='/terms-of-service'
                className='text-neutral-400 hover:text-primary transition-all duration-300 font-medium hover:scale-105 transform hover:shadow-lg hover:shadow-sherwood-green-500/20'
              >
                Términos de servicio
              </Link>
              <Link
                href='mailto:victor.quinones.ch@gmail.com'
                className='text-neutral-400 hover:text-primary transition-all duration-300 font-medium hover:scale-105 transform hover:shadow-lg hover:shadow-sherwood-green-500/20'
              >
                Contacto
              </Link>
            </div>
          </div>
        </div>

        {/* Developer Section */}
        <div className='backdrop-blur-md bg-neutral-900/50 border border-neutral-800/30 rounded-2xl p-6 shadow-xl'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
            <div className='text-center md:text-left'>
              <p className='text-neutral-300 font-medium'>
                Desarrollado con{' '}
                <Heart className='inline h-4 w-4 text-primary mx-1' /> por{' '}
                <span className='font-bold text-primary'>Victor</span>
              </p>
              <p className='text-sm text-neutral-500 mt-1'>
                Frontend Developer & Creator of Monefy
              </p>
            </div>

            <div className='flex items-center gap-6'>
              <a
                href='https://github.com/Vctorqui'
                target='_blank'
                rel='noopener noreferrer'
                className='text-neutral-500 hover:text-primary transition-all duration-300 hover:scale-110 transform p-2 rounded-lg hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/20'
                title='GitHub'
              >
                <Github className='h-6 w-6' />
              </a>

              <a
                href='https://linkedin.com/in/victorqui'
                target='_blank'
                rel='noopener noreferrer'
                className='text-neutral-500 hover:text-primary transition-all duration-300 hover:scale-110 transform p-2 rounded-lg hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/20'
                title='LinkedIn'
              >
                <Linkedin className='h-6 w-6' />
              </a>

              <a
                href='mailto:victor.quinones.ch@gmail.com'
                className='text-neutral-500 hover:text-primary transition-all duration-300 hover:scale-110 transform p-2 rounded-lg hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/20'
                title='Email'
              >
                <Mail className='h-6 w-6' />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright and Back to Top */}
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-8 border-t border-neutral-800/50'>
          <p className='text-neutral-500 text-sm'>
            © {getCurrentYear()} Monefy. Todos los derechos reservados.
          </p>

          <button
            onClick={scrollToTop}
            className='flex items-center gap-2 text-neutral-500 hover:text-primary transition-all duration-300 hover:scale-105 transform group px-3 py-2 rounded-lg hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/20'
          >
            <span className='text-sm font-medium'>Volver arriba</span>
            <ArrowUp className='h-4 w-4 group-hover:translate-y-[-2px] transition-transform duration-300' />
          </button>
        </div>
      </div>
    </footer>
  )
}
