import { LandingLayout } from "@/components/layouts/landing-layout"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import Contact from "@/components/landing/contact"

export default function HomePage() {
  return (
    <LandingLayout>
      <HeroSection />
      <FeaturesSection />
      {/* <Contact /> */}
    </LandingLayout>
  )
}
