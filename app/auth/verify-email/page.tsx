import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"
import Link from "next/link"

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-background">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Verifica tu correo</CardTitle>
            <CardDescription>Te hemos enviado un correo de confirmación</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Por favor revisa tu bandeja de entrada y haz clic en el enlace de verificación para activar tu cuenta.
            </p>
            <p className="text-sm text-muted-foreground text-center">Si no ves el correo, revisa tu carpeta de spam.</p>
            <div className="pt-4 text-center">
              <Link href="/auth/login" className="text-sm text-primary hover:underline underline-offset-4">
                Volver al inicio de sesión
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
