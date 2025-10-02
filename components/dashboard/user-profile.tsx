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
  const router = useRouter()
  const supabase = createClient()
  
  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await supabase.auth.signOut()
      router.push("/auth/login")
    } catch (error) {
      console.error("Error signing out:", error)
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-10 w-auto px-3 hover:bg-neutral-800"
          disabled={isLoading}
        >
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8 border border-neutral-800">
              <AvatarImage src={profile.avatar_url} alt={profile.username} />
              <AvatarFallback className="bg-sherwood-green-500 text-white text-sm">
                {getInitials(profile.username)}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-foreground">{profile.username}</p>
              <p className="text-xs text-neutral-400 truncate max-w-32">
                {user.email}
              </p>
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56 bg-card border-neutral-800" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-card-foreground">
              {profile.username}
            </p>
            <p className="text-xs leading-none text-neutral-400">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-neutral-800" />
        
        <DropdownMenuItem 
          className="text-card-foreground hover:bg-neutral-800 cursor-pointer"
          onClick={() => router.push("/dashboard/settings")}
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Configuración</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-neutral-800" />
        
        <DropdownMenuItem 
          className="text-card-foreground hover:bg-neutral-800 cursor-pointer"
          onClick={handleSignOut}
          disabled={isLoading}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isLoading ? "Cerrando..." : "Cerrar Sesión"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
