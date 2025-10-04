'use client'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  label?: string
}

function FeatureCard({ icon, title, description, label }: FeatureCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl relative border bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:border-primary/40">
      {label && (
        <div className="absolute top-0 right-0 text-primary px-2 py-1 rounded-lg border border-primary/40 rounded-br-none rounded-tl-none text-sm">
          {label}
        </div>
      )}
      <div className="flex size-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold text-card-foreground">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
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
    <section className="py-16 px-4 md:px-10 lg:py-24">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Funcionalidades principales
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            FinanzasApp te ofrece herramientas poderosas para gestionar tus finanzas de manera eficiente.
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
