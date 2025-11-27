import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ExperienceCards } from "@/components/experience-cards"
import { VideoSeriesSection } from "@/components/video-series-section"
import { VisualImpairmentSection } from "@/components/visual-impairment-section"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navbar />
      <HeroSection />
      <ExperienceCards />
      <VideoSeriesSection />
      <VisualImpairmentSection />

      <Footer />
    </main>
  )
}
