"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

export function Breadcrumb() {
  const pathname = usePathname()
  
  // Generar breadcrumbs basado en la ruta actual
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = []
    
    // Siempre empezar con Dashboard
    breadcrumbs.push({
      label: "Dashboard",
      href: "/dashboard"
    })
    
    // Agregar segmentos adicionales
    let currentPath = "/dashboard"
    
    segments.forEach((segment, index) => {
      if (segment !== "dashboard") {
        currentPath += `/${segment}`
        
        // Capitalizar y traducir labels
        let label = segment
        switch (segment) {
          case "accounts":
            label = "Cuentas"
            break
          case "transactions":
            label = "Transacciones"
            break
          case "categories":
            label = "Categorías"
            break
          case "settings":
            label = "Configuración"
            break
          case "credit-cards":
            label = "Tarjetas de Crédito"
            break
          default:
            label = segment.charAt(0).toUpperCase() + segment.slice(1)
        }
        
        // El último segmento no tiene href (es la página actual)
        breadcrumbs.push({
          label,
          href: index === segments.length - 1 ? undefined : currentPath
        })
      }
    })
    
    return breadcrumbs
  }
  
  const breadcrumbs = generateBreadcrumbs()
  
  return (
    <nav className="flex items-center space-x-1 text-sm">
      <Link 
        href="/dashboard" 
        className="flex items-center text-neutral-400 hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>
      
      {breadcrumbs.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          <ChevronRight className="h-4 w-4 text-neutral-500" />
          {item.href ? (
            <Link 
              href={item.href}
              className="text-neutral-400 hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
