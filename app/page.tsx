import type { Metadata } from "next"
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
import { LearningCenterSection } from "@/components/learning-center-section"

export const metadata: Metadata = {
  title: "Alt Access | Web Accessibility Simulations & Learning",
  description:
    "Alt Access helps developers experience, learn, and solve real web accessibility barriers. Simulate blindness, low vision, and color blindness. Discover inclusive design and WCAG standards. Built globally with a focus on Cambodia — available in English and Khmer.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Alt Access | Web Accessibility Simulations & Learning",
    description:
      "Experience real accessibility barriers first-hand. Simulate blindness, low vision, and color blindness. Learn inclusive design and WCAG. Built globally, focused on Cambodia — in English & Khmer.",
    url: "https://altaccess.site/",
    images: [{ url: "/images/resource/what-is-accessability-picture.png", width: 1200, height: 630, alt: "Alt Access" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alt Access | Web Accessibility Simulations & Learning",
    description:
      "Experience real accessibility barriers first-hand. Learn inclusive design and WCAG. Built globally, focused on Cambodia — in English & Khmer.",
    images: ["/images/resource/what-is-accessability-picture.png"],
  },
}

export default function Home() {
  return (
    <main className="relative isolate min-h-screen flex flex-col">
      <Navbar theme="light" />
      <HeroSection />
      <div className="relative z-10 bg-[#FDFCF8]">
        <PrefaceSection />
        <ExperienceCards />
        <VisualImpairmentSection />
        <InclusiveDesignSection />
        <MotivationSection />
        <WcagSection />
        <VideoSeriesSection />
        <LearningCenterSection />
        <Footer />
      </div>
    </main>
  )
}
