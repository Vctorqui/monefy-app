# Layout Components

Este directorio contiene los componentes de layout reutilizables para la aplicación Monefy.

## 🏗️ Componentes Disponibles

### 1. `AuthLayout`
Layout específico para páginas de autenticación (login, registro, etc.)

**Props:**
- `children`: Contenido principal del layout
- `showAppInfo?: boolean`: Mostrar sección informativa de la app (default: true)
- `appInfoContent?: ReactNode`: Contenido personalizado para la sección informativa

**Uso:**
```tsx
import { AuthLayout } from '@/components/layouts/auth-layout'
import { AppInfoSection } from '@/components/auth/app-info-section'

export default function LoginPage() {
  return (
    <AuthLayout appInfoContent={<AppInfoSection isLogin={true} />}>
      <GlassCard>
        {/* Tu formulario aquí */}
      </GlassCard>
    </AuthLayout>
  )
}
```

### 2. `LandingLayout`
Layout para páginas de landing (página principal, etc.)

**Props:**
- `children`: Contenido principal del layout
- `className?: string`: Clases CSS adicionales

**Uso:**
```tsx
import { LandingLayout } from '@/components/layouts/landing-layout'

export default function HomePage() {
  return (
    <LandingLayout>
      <HeroSection />
      <FeaturesSection />
    </LandingLayout>
  )
}
```

## 🎨 Características

### **AuthLayout**
- ✅ Header glass con navegación
- ✅ División de pantalla (info de app + formulario)
- ✅ Responsive (sección info oculta en móvil)
- ✅ Footer mejorado
- ✅ Fondo gradiente con colores de la paleta
- ✅ Efectos glassmorphism

### **LandingLayout**
- ✅ Header glass con navegación
- ✅ Contenido principal centrado
- ✅ Footer mejorado
- ✅ Fondo gradiente con colores de la paleta
- ✅ Efectos glassmorphism

## 🎯 Ventajas

1. **Reutilización**: Un solo componente para múltiples páginas
2. **Consistencia**: Diseño uniforme en toda la aplicación
3. **Mantenibilidad**: Cambios centralizados en un solo lugar
4. **Flexibilidad**: Props para personalizar comportamiento
5. **Responsive**: Adaptable a diferentes tamaños de pantalla

## 🔧 Personalización

### Colores
Los layouts usan automáticamente la paleta de colores definida en `COLORS.md`:
- **Sherwood Green**: Para acentos y elementos destacados
- **Neutral**: Para fondos y texto
- **Glassmorphism**: Efectos de transparencia y blur

### Estilos
Los estilos se importan automáticamente desde:
- `@/components/shared/glassmorphism.css`
- Tailwind CSS con colores personalizados

## 📱 Responsive

- **Desktop**: Diseño completo con todas las secciones
- **Tablet**: Adaptación de espaciado y tamaños
- **Mobile**: Sección informativa oculta, formulario centrado

## 🚀 Ejemplos de Uso

### Página de Login
```tsx
<AuthLayout appInfoContent={<AppInfoSection isLogin={true} />}>
  <GlassCard>
    <GlassCardHeader>
      <GlassCardTitle>Iniciar Sesión</GlassCardTitle>
    </GlassCardHeader>
    <GlassCardContent>
      {/* Formulario */}
    </GlassCardContent>
  </GlassCard>
</AuthLayout>
```

### Página de Registro
```tsx
<AuthLayout appInfoContent={<AppInfoSection isLogin={false} />}>
  <GlassCard>
    <GlassCardHeader>
      <GlassCardTitle>Crear Cuenta</GlassCardTitle>
    </GlassCardHeader>
    <GlassCardContent>
      {/* Formulario */}
    </GlassCardContent>
  </GlassCard>
</AuthLayout>
```

### Página Principal
```tsx
<LandingLayout>
  <HeroSection />
  <FeaturesSection />
  <Contact />
</LandingLayout>
```

### Layout sin sección informativa
```tsx
<AuthLayout showAppInfo={false}>
  <div>Contenido centrado</div>
</AuthLayout>
```
