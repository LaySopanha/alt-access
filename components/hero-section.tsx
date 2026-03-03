

"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MousePointer2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"

export function HeroSection() {
  const { t } = useLanguage()
  const [scrollY, setScrollY] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)

  useEffect(() => {
    setViewportHeight(window.innerHeight)
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate displacement: Only start pushing after scrolling ~40% of the screen height
  const startPushAt = viewportHeight * 0.4
  const displacement = Math.max(0, (scrollY - startPushAt) * 1.2)

  return (
    <section className="sticky top-0 z-0 min-h-[100dvh] flex flex-col justify-between bg-[#FDFCF8] overflow-hidden font-sans">
      {/* 
          Aesthetic: "The Poster" 
          Reference: User Image (Top Color Bar, Grid Background, Footer Logos)
      */}

      {/* Color bar is now part of the navbar */}

      {/* 2. BACKGROUND GRID (Graph Paper) */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>


      {/* 3. HERO LOGO - Removed, now always shown in navbar */}

      {/* 4. MAIN CONTENT (Centered but Grounded) */}
      <div className="container mx-auto px-6 md:px-24 flex-1 flex flex-col items-center justify-center relative z-10 pt-20">

        <div className="relative">
          {/* Title Block */}
          <div className="text-center max-w-5xl flex flex-col items-center">
            {/* Removed Centered Logo */}
            <Image
              src="/images/alt-access-black-logo.png"
              alt="Alt Access"
              width={600}
              height={150}
              quality={85}
              className="h-48 md:h-72 w-auto object-contain mb-6"
              priority
            />
            <p className="text-2xl md:text-4xl font-bold text-black mb-12">
              {t.hero.subtitle}
            </p>

            {/* Scroll Indicator (Instead of Button) */}
            <div className="flex flex-col items-center gap-4 animate-bounce mt-12 opacity-50">
              <span className="font-mono text-sm uppercase tracking-widest text-black">{t.hero.scrollToRead}</span>
              <ArrowRight className="w-6 h-6 rotate-90 text-black" />
            </div>
          </div>

        </div>
      </div>



    </section>
  )
}
