import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ExperienceCards } from "@/components/experience-cards"
import { VideoSeriesSection } from "@/components/video-series-section"
import { VisualImpairmentSection } from "@/components/visual-impairment-section"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"

export default function Home() {
  return (
    <main className="relative isolate min-h-screen flex flex-col overflow-hidden">

      <div className="relative z-10 flex flex-col flex-1">
        <Navbar theme="light" />
        <HeroSection />
        <ExperienceCards />
        <VideoSeriesSection />
        <VisualImpairmentSection />

        <Footer />
      </div>
    </main>
  )
}
