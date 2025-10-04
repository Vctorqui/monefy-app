import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { Toaster } from "sonner"

export const metadata: Metadata = {
  title: "Monefy - Gestión de Finanzas Personales",
  description: "Controla tus gastos, ingresos y tarjetas de crédito en un solo lugar",
  icons: {
    icon: [
      {
        url: "/monefy.ico",
        sizes: "any",
      },
      {
        url: "/monefy-logo.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    shortcut: "/monefy.ico",
    apple: "/monefy-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Toaster position="top-right" richColors />
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
