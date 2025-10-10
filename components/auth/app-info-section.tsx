'use client'

import { FinanzasAppIcon } from '@/components/icon'
import { CheckCircle, CreditCard, Shield, TrendingUp } from 'lucide-react'

interface AppInfoSectionProps {
  isLogin?: boolean
}

export function AppInfoSection({ isLogin = false }: AppInfoSectionProps) {
  const features = [
    {
      icon: <TrendingUp className="h-4 w-4" />,
      title: "Control Total",
      description: "Gestiona tus finanzas personales con herramientas avanzadas de análisis y seguimiento."
    },
    {
      icon: <CreditCard className="h-4 w-4" />,
      title: "Gestión de tarjetas de crédito",
      description: "Controla tus límites, fechas de pago y movimientos de tus tarjetas en un solo lugar."
    },
  ]

  return (
    <div className="max-w-lg mx-auto w-full">
      {/* Logo y título */}
      <div className="mb-8">
       
        <h2 className="text-4xl font-bold text-white mb-4">
          {isLogin ? '¡Bienvenido de vuelta!' : '¡Comienza tu viaje financiero!'}
        </h2>
        <p className="text-white/90 text-lg leading-relaxed">
          {isLogin 
            ? 'Accede a tu cuenta y continúa gestionando tus finanzas de manera inteligente.'
            : 'Regístrate y toma el control de tus finanzas personales con la mejor herramienta del mercado.'
          }
        </p>
      </div>

      {/* Características */}
      <div className="space-y-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white backdrop-blur-sm">
              {feature.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/80 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonial o estadística */}
      {/* <div className="mt-8 p-6 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle className="h-5 w-5 text-white" />
          <span className="text-white font-semibold text-lg">Más de 10,000 usuarios activos</span>
        </div>
        <p className="text-white/90 text-sm leading-relaxed mb-3">
          "Monefy me ayudó a ahorrar un 30% más este año. La interfaz es intuitiva y las herramientas de análisis son increíbles."
        </p>
        <p className="text-white/70 text-xs">- María González, Usuario Premium</p>
      </div> */}
    </div>
  )
}
