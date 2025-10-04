import { Header } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { Footer } from "@/components/landing/footer"
import Contact from "@/components/landing/contact"
export default function HomePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background text-foreground">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        
        <main className="flex flex-1 flex-col">
          <HeroSection />
          <FeaturesSection />
          {/* <Contact /> */}
        </main>
        
        <Footer />
      </div>
    </div>
  )
}
