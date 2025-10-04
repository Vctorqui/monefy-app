import { useState } from "react"

export function useAuthErrors() {
  const [error, setError] = useState<string | null>(null)

  const handleSupabaseError = (error: any) => {
    console.error('Auth error:', error)
    
    // Handle validation errors from Zod
    if (error.message && error.message.includes('expected string, received undefined')) {
      setError('Por favor completa todos los campos requeridos.')
      return
    }
    
    switch (error.message) {
      // Login errors
      case 'Invalid login credentials':
        setError('Credenciales inválidas. Verifica tu correo y contraseña.')
        break
      case 'Email not confirmed':
        setError('Debes confirmar tu correo antes de iniciar sesión.')
        break
      case 'Too many requests':
        setError('Demasiados intentos. Espera unos minutos antes de intentar nuevamente.')
        break
      
      // Signup errors
      case 'User already registered':
        setError('Este correo ya está registrado. Intenta iniciar sesión.')
        break
      case 'Password should be at least 6 characters':
        setError('La contraseña debe tener al menos 6 caracteres')
        break
      case 'Invalid email':
        setError('Formato de correo inválido')
        break
      case 'Signup is disabled':
        setError('El registro está temporalmente deshabilitado')
        break
      
      // Generic errors
      default:
        setError(error.message || 'Error inesperado. Intenta nuevamente.')
    }
  }

  const clearError = () => setError(null)

  return {
    error,
    handleSupabaseError,
    clearError
  }
}
