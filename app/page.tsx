import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ExperienceCards } from "@/components/experience-cards"
import { VideoSeriesSection } from "@/components/video-series-section"
import { Footer } from "@/components/footer"
import { WcagChecklist } from "@/components/wcag-checklist"
import { PrefaceSection } from "@/components/preface-section"
import { ReportSection } from "@/components/report-section"
import { MotivationSection } from "@/components/motivation-section"

export default function Home() {
  return (
    <main className="relative isolate min-h-screen flex flex-col">

      <div className="relative flex flex-col flex-1">
        <Navbar theme="light" showLogo={true} />

        {/* THE COVER */}
        <HeroSection />

        <div className="relative z-10 bg-[#FDFCF8]">
          {/* PROLOGUE: Introduction & Mission */}
          <PrefaceSection />

          {/* ACCESSIBILITY REPORTS SLIDER */}
          <ReportSection />

          {/* CHAPTER 3: THE MOTIVATION (Why Care?) */}
          <MotivationSection />

          {/* CHAPTER 6: THE CURRICULUM (Videos) */}
          <VideoSeriesSection />

          {/* WCAG CHECKLIST */}
          <WcagChecklist />

          <Footer />
        </div>
      </div>
    </main>
  )
}
