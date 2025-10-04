import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"

export function useBetaLimit() {
  const [isLimitReached, setIsLimitReached] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const MAX_USERS = Number(process.env.NEXT_PUBLIC_MAX_USERS) // O puedes usar process.env.NEXT_PUBLIC_MAX_USERS

  useEffect(() => {
    const checkUserLimit = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const supabase = createClient()
        const { count, error } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
        
        if (error) {
          console.error('Error checking user limit:', error)
          setError(error.message)
          return
        }
        
        setIsLimitReached((count || 0) >= MAX_USERS)
      } catch (err) {
        console.error('Unexpected error:', err)
        setError('Error checking user limit')
      } finally {
        setLoading(false)
      }
    }

    checkUserLimit()
  }, [])

  return {
    isLimitReached,
    loading,
    error,
    maxUsers: MAX_USERS
  }
}
