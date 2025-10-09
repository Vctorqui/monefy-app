"use client"

import { useState } from "react"
import { User, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface UserProfileProps {
  user: {
    id: string
    email?: string
  }
  profile: {
    username: string
    avatar_url?: string
  }
}

export function UserProfile({ user, profile }: UserProfileProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const supabase = createClient()
  
  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await supabase.auth.signOut()
      toast.success("Sesión cerrada correctamente")
      router.push("/auth/login")
    } catch (error) {
      console.error("Error signing out:", error)
      toast.error("Error al cerrar sesión")
    } finally {
      setIsLoading(false)
    }
  }
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }
  
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-10 w-auto px-3 hover:bg-primary/10 focus:bg-primary/10 transition-all duration-300 hover:scale-105 transform hover:shadow-lg hover:shadow-primary/20"
          disabled={isLoading}
        >
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8 border border-sherwood-green-500/30 shadow-lg">
              <AvatarImage src={profile.avatar_url} alt={profile.username} />
              <AvatarFallback className="bg-sherwood-green-500 text-white text-sm font-semibold">
                {getInitials(profile.username)}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-neutral-50">{profile.username}</p>
              <p className="text-xs text-neutral-400 truncate max-w-32">
                {user.email}
              </p>
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-neutral-950/90 backdrop-blur-md border border-neutral-800/50 shadow-2xl"
      >
        <DropdownMenuLabel className="text-neutral-50">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{profile.username}</p>
            <p className="text-xs text-neutral-400">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-neutral-800/50" />
        <DropdownMenuItem 
          className="text-neutral-300 hover:bg-neutral-800/50 hover:text-neutral-50 cursor-pointer"
          onClick={() => router.push('/dashboard/settings')}
        >
          <Settings className="mr-2 h-4 w-4" />
          Configuración
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-neutral-800/50" />
        <DropdownMenuItem 
          className="text-red-400 hover:bg-red-500/20 hover:text-red-300 cursor-pointer"
          onClick={handleSignOut}
          disabled={isLoading}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {isLoading ? "Cerrando..." : "Cerrar Sesión"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
