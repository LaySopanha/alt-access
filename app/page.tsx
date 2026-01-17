import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ExperienceCards } from "@/components/experience-cards"
import { VideoSeriesSection } from "@/components/video-series-section"
import { VisualImpairmentSection } from "@/components/visual-impairment-section"
import { Footer } from "@/components/footer"
import { WcagSection } from "@/components/wcag-section"
import { PrefaceSection } from "@/components/preface-section"
import { InclusiveDesignSection } from "@/components/inclusive-design-section"
import { MotivationSection } from "@/components/motivation-section"
import { AnimatedBackground } from "@/components/animated-background"

export default function Home() {
  return (
    <main className="relative isolate min-h-screen flex flex-col">

      <div className="relative flex flex-col flex-1">
        <Navbar theme="light" />

        {/* THE COVER */}
        <HeroSection />

        <div className="relative z-10 bg-[#FDFCF8]">
          {/* PROLOGUE: Introduction & Mission */}
          <PrefaceSection />

          {/* CHAPTER 1: THE SPECTRUM (Visual Impairment) */}
          <VisualImpairmentSection />

          {/* CHAPTER 2: INCLUSIVE DESIGN (Curb Cut) */}
          <InclusiveDesignSection />

          {/* CHAPTER 3: THE MOTIVATION (Why Care?) */}
          <MotivationSection />

          {/* CHAPTER 4: THE STANDARD (WCAG) */}
          <WcagSection />

          {/* CHAPTER 5: THE PRACTICE (Simulations) */}
          <ExperienceCards />

          {/* CHAPTER 6: THE CURRICULUM (Videos) */}
          <VideoSeriesSection />

          <Footer />
        </div>
      </div>
    </main>
  )
}
