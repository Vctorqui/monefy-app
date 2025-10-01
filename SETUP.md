# 🚀 Guía de Configuración Rápida

Esta guía te ayudará a configurar Finance App en tu máquina local paso a paso.

## 📋 Checklist de Configuración

- [ ] Node.js 18+ instalado
- [ ] Cuenta de Supabase creada
- [ ] Variables de entorno configuradas
- [ ] Base de datos configurada
- [ ] Aplicación ejecutándose localmente

## 🔧 Configuración Paso a Paso

### 1. Clonar y Instalar

```bash
# Clonar el repositorio
git clone <tu-repositorio>
cd finance-app

# Instalar dependencias
npm install
# o yarn install
# o pnpm install
```

### 2. Configurar Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Ve a Settings > API para obtener tus credenciales

### 3. Configurar Variables de Entorno

```bash
# Copiar archivo de ejemplo
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/dashboard
```

### 4. Configurar Base de Datos

En el SQL Editor de Supabase, ejecuta estos scripts en orden:

1. `scripts/001_create_tables.sql` - Crea las tablas
2. `scripts/002_enable_rls.sql` - Habilita seguridad
3. `scripts/003_create_triggers.sql` - Crea triggers automáticos
4. `scripts/004_seed_default_categories.sql` - Categorías por defecto
5. `scripts/005_add_profile_fields.sql` - Campos adicionales

### 5. Ejecutar la Aplicación

```bash
npm run dev
```

Visita [http://localhost:3000](http://localhost:3000)

## 🔍 Verificar Configuración

### ✅ Checklist de Verificación

- [ ] La aplicación carga sin errores
- [ ] Puedes registrarte con email/password
- [ ] Puedes iniciar sesión
- [ ] El dashboard se carga correctamente
- [ ] Puedes acceder a todas las secciones
- [ ] Las transacciones se guardan correctamente

### 🐛 Solución de Problemas Comunes

#### Error: "Invalid API key"
- Verifica que las variables de entorno estén correctas
- Asegúrate de usar la URL y clave correctas de Supabase

#### Error: "Profile not found"
- Ejecuta el script `005_add_profile_fields.sql`
- Verifica que el trigger de creación de perfil esté activo

#### Error de CORS
- Verifica que `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` esté configurado
- Asegúrate de que la URL sea exacta (incluyendo http://localhost:3000)

## 🚀 Primeros Pasos

1. **Registra una cuenta** usando email/password
2. **Verifica tu email** (revisa spam si no llega)
3. **Inicia sesión** y explora el dashboard
4. **Crea tu primera cuenta** bancaria
5. **Agrega algunas transacciones** para probar la funcionalidad

## 📞 Soporte

Si tienes problemas:

1. Revisa los logs en la consola del navegador
2. Verifica que todos los scripts SQL se ejecutaron correctamente
3. Asegúrate de que las variables de entorno estén configuradas
4. Abre un issue en el repositorio con detalles del error

---

¡Listo! Tu aplicación de finanzas personales debería estar funcionando. 💰✨
