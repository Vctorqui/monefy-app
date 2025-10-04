import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"

export function useActiveUser() {
  const supabase = createClient()
  const [activeUsers, setActiveUsers] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getActiveUsers = async () => {  
    try {
      setLoading(true)
      setError(null)
      
      const { count, error } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
      
      if (error) {
        console.error('Error getting active users:', error)
        setError(error.message)
        return
      }
      
      setActiveUsers(count || 0)
    } catch (err) {
      console.error('Unexpected error:', err)
      setError('Error inesperado al obtener usuarios')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getActiveUsers()
  }, [])

  return {
    activeUsers,
    loading,
    error,
    refetch: getActiveUsers
  }
}