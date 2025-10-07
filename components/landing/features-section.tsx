'use client'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  label?: string
}

function FeatureCard({ icon, title, description, label }: FeatureCardProps) {
  return (
    <div className="glass-card group relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Glass effect */}
      <div className="relative backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 h-full transition-all duration-300 hover:bg-white/10 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10">
        {label && (
          <div className="absolute top-4 right-4 glass-button text-primary px-3 py-1 rounded-full text-xs font-semibold">
            {label}
          </div>
        )}
        
        <div className="flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/30 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-300 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FeaturesSection() {
  const features = [
    {
      icon: (
        <svg fill="currentColor" height="32" viewBox="0 0 256 256" width="32" xmlns="http://www.w3.org/2000/svg">
          <path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z"/>
        </svg>
      ),
      title: "Seguimiento de gastos e ingresos",
      description: "Registra y categoriza tus transacciones para tener una visión clara de tu flujo de caja."
    },
    {
      icon: (
        <svg fill="currentColor" height="32" viewBox="0 0 256 256" width="32" xmlns="http://www.w3.org/2000/svg">
          <path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16V88H32V64Zm0,128H32V104H224v88Zm-16-24a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h32A8,8,0,0,1,208,168Zm-64,0a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h16A8,8,0,0,1,144,168Z"/>
        </svg>
      ),
      title: "Gestión de tarjetas de crédito",
      description: "Controla tus límites, fechas de pago y movimientos de tus tarjetas en un solo lugar."
    },
    {
      icon: (
        <svg fill="currentColor" height="32" viewBox="0 0 256 256" width="32" xmlns="http://www.w3.org/2000/svg">
          <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0v94.37L90.73,98a8,8,0,0,1,10.07-.38l58.81,44.11L218.73,90a8,8,0,1,1,10.54,12l-64,56a8,8,0,0,1-10.07.38L96.39,114.29,40,163.63V200H224A8,8,0,0,1,232,208Z"/>
        </svg>
      ),
      title: "Análisis financiero",
      label: 'Proximamente',
      description: "Visualiza gráficos y reportes detallados para entender tus hábitos financieros."
    }
  ]

  return (
    <section id="features" className="relative w-full py-16 px-4 md:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl mb-6">
            Funcionalidades{' '}
            <span className="text-primary">principales</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Monefy te ofrece herramientas poderosas para gestionar tus finanzas de manera eficiente y moderna.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              label={feature.label}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
