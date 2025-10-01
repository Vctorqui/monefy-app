# 💰 Finance App

Una aplicación web moderna para gestión de finanzas personales construida con Next.js 14, Supabase y TypeScript.

## 🚀 Características

- **Autenticación completa** con Supabase Auth (email/password y Google OAuth)
- **Gestión de cuentas** bancarias y de efectivo
- **Registro de transacciones** con categorías personalizables
- **Gestión de tarjetas de crédito** con seguimiento de límites
- **Dashboard intuitivo** con resumen financiero
- **Configuración de perfil** con preferencias de moneda
- **Diseño responsive** optimizado para móviles y desktop
- **Tema oscuro/claro** con soporte completo

## 🛠️ Tecnologías

- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **UI**: Tailwind CSS, shadcn/ui
- **Autenticación**: Supabase Auth
- **Base de datos**: PostgreSQL con Row Level Security (RLS)
- **Deployment**: Vercel (recomendado)

## 📁 Estructura del Proyecto

```
finance-app/
├── app/                          # App Router de Next.js 14
│   ├── auth/                     # Páginas de autenticación
│   │   ├── login/               # Página de inicio de sesión
│   │   ├── sign-up/             # Página de registro
│   │   └── verify-email/        # Verificación de email
│   ├── dashboard/               # Panel principal
│   │   ├── accounts/            # Gestión de cuentas
│   │   ├── cards/               # Gestión de tarjetas
│   │   ├── categories/          # Gestión de categorías
│   │   ├── settings/           # Configuración del perfil
│   │   ├── transactions/       # Gestión de transacciones
│   │   ├── layout.tsx          # Layout del dashboard
│   │   └── page.tsx            # Página principal del dashboard
│   ├── globals.css             # Estilos globales
│   ├── layout.tsx              # Layout raíz
│   └── page.tsx                # Página de inicio
├── components/                  # Componentes reutilizables
│   ├── dashboard/              # Componentes específicos del dashboard
│   │   ├── header.tsx          # Header del dashboard
│   │   ├── mobile-nav.tsx      # Navegación móvil
│   │   └── sidebar.tsx         # Barra lateral
│   ├── theme-provider.tsx      # Proveedor de tema
│   └── ui/                     # Componentes de UI (shadcn/ui)
├── features/                   # Funcionalidades por dominio
│   ├── accounts/               # Lógica de cuentas
│   │   └── components/
│   │       ├── account-card.tsx
│   │       └── account-form.tsx
│   ├── categories/             # Lógica de categorías
│   │   └── components/
│   │       ├── category-form.tsx
│   │       └── category-list.tsx
│   ├── credit-cards/           # Lógica de tarjetas
│   │   └── components/
│   │       ├── credit-card-form.tsx
│   │       └── credit-card-item.tsx
│   ├── settings/               # Lógica de configuración
│   │   └── components/
│   │       └── profile-form.tsx
│   └── transactions/           # Lógica de transacciones
│       └── components/
│           ├── transaction-form.tsx
│           └── transaction-list.tsx
├── hooks/                      # Hooks personalizados
│   ├── use-auth.ts            # Hook de autenticación
│   ├── use-mobile.ts          # Hook para detectar móvil
│   └── use-toast.ts           # Hook para notificaciones
├── lib/                       # Utilidades y configuración
│   ├── supabase/              # Configuración de Supabase
│   │   ├── client.ts          # Cliente del navegador
│   │   ├── middleware.ts      # Middleware de autenticación
│   │   └── server.ts          # Cliente del servidor
│   ├── utils/                 # Utilidades generales
│   │   ├── currency.ts        # Utilidades de moneda
│   │   └── profile.ts         # Utilidades de perfil
│   └── utils.ts               # Utilidades de shadcn/ui
├── scripts/                   # Scripts de base de datos
│   ├── 001_create_tables.sql  # Creación de tablas
│   ├── 002_enable_rls.sql     # Configuración de RLS
│   ├── 003_create_triggers.sql # Triggers automáticos
│   ├── 004_seed_default_categories.sql # Categorías por defecto
│   └── 005_add_profile_fields.sql # Campos adicionales de perfil
├── styles/                    # Archivos de estilos
│   └── globals.css            # Estilos globales adicionales
├── middleware.ts              # Middleware de Next.js
├── next.config.mjs           # Configuración de Next.js
├── package.json              # Dependencias del proyecto
└── tsconfig.json             # Configuración de TypeScript
```

## 🗄️ Estructura de la Base de Datos

### Tablas Principales

- **`profiles`**: Información del usuario (username, currency, avatar_url)
- **`accounts`**: Cuentas bancarias y de efectivo del usuario
- **`categories`**: Categorías personalizadas para transacciones
- **`transactions`**: Registro de todas las transacciones
- **`credit_cards`**: Tarjetas de crédito con límites y gastos

### Seguridad

- **Row Level Security (RLS)** habilitado en todas las tablas
- **Políticas de acceso** que garantizan que los usuarios solo vean sus propios datos
- **Triggers automáticos** para crear perfiles al registrarse

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+ 
- npm, yarn o pnpm
- Cuenta de Supabase

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio>
cd finance-app
```

### 2. Instalar dependencias

```bash
npm install
# o
yarn install
# o
pnpm install
```

### 3. Configurar variables de entorno

1. Copia el archivo de ejemplo:
   ```bash
   cp .env.example .env.local
   ```

2. Edita el archivo `.env.local` con tus credenciales de Supabase:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
   NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/dashboard
   ```

   **⚠️ Importante**: El archivo `.env.local` está en `.gitignore` y no se subirá al repositorio por seguridad.

### 4. Configurar Supabase

1. Crea un nuevo proyecto en [Supabase](https://supabase.com)
2. Ejecuta los scripts SQL en orden:
   ```sql
   -- Ejecuta cada archivo en scripts/ en orden numérico
   ```

### 5. Ejecutar el proyecto

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Visita [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## 📱 Funcionalidades Principales

### Dashboard
- Resumen financiero general
- Gráficos de ingresos y gastos
- Acceso rápido a todas las funcionalidades

### Gestión de Cuentas
- Crear cuentas bancarias, de ahorro, efectivo o inversión
- Establecer saldos iniciales
- Seguimiento automático de saldos

### Transacciones
- Registrar ingresos y gastos
- Asignar categorías personalizadas
- Filtrar por fecha, cuenta o categoría
- Historial completo de movimientos

### Tarjetas de Crédito
- Registrar tarjetas con límites
- Seguimiento de gastos mensuales
- Alertas de límites

### Configuración
- Personalizar perfil de usuario
- Seleccionar moneda base (USD/CLP)
- Configurar avatar

## 🔧 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Construir para producción
npm run start        # Servidor de producción
npm run lint         # Ejecutar ESLint
npm run type-check   # Verificar tipos de TypeScript
```

## 🔒 Seguridad y Mejores Prácticas

### Variables de Entorno
- **Nunca** subas archivos `.env*` al repositorio
- Usa `.env.example` como plantilla para otros desarrolladores
- Configura variables de entorno en tu plataforma de deployment

### Base de Datos
- Row Level Security (RLS) está habilitado por defecto
- Cada usuario solo puede acceder a sus propios datos
- Los triggers automáticos crean perfiles de usuario

### Autenticación
- Supabase Auth maneja la seguridad de autenticación
- Soporte para OAuth con Google
- Verificación de email obligatoria

## 🚀 Deployment

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en el dashboard de Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL`
3. Deploy automático en cada push


## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la documentación de [Next.js](https://nextjs.org/docs)
2. Consulta la documentación de [Supabase](https://supabase.com/docs)
3. Abre un issue en el repositorio

## 🎯 Roadmap

- [ ] Exportar datos a Excel/CSV
- [ ] Notificaciones push
- [ ] Integración con APIs bancarias
- [ ] Análisis avanzado de gastos
- [ ] Objetivos de ahorro
- [ ] App móvil nativa

---

¡Gracias por usar Finance App! 💰✨
