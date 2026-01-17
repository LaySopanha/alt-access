

"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MousePointer2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="sticky top-0 z-0 min-h-[100dvh] flex flex-col justify-between bg-[#FDFCF8] overflow-hidden font-sans">
      {/* 
          Aesthetic: "The Poster" 
          Reference: User Image (Top Color Bar, Grid Background, Footer Logos)
      */}

      {/* 1. TOP COLOR BAR */}
      <div className="absolute top-0 left-0 w-full h-4 md:h-6 flex z-20">
        <div className="flex-1 bg-wong-vermilion" />
        <div className="flex-1 bg-wong-yellow" />
        <div className="flex-1 bg-wong-sky-blue" />
        <div className="flex-1 bg-wong-dark-blue" />
        <div className="flex-1 bg-wong-teal" />
      </div>

      {/* 2. BACKGROUND GRID (Graph Paper) */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* 3. HERO LOGO (Sticky, Top-Left) */}
      <Link href="/" className="absolute top-6 left-6 md:top-10 md:left-10 z-20 hover:scale-105 transition-transform duration-300">
        <Image
          src="/images/alt-access-black-logo.png"
          alt="Alt Access Logo"
          width={300}
          height={80}
          className="h-14 md:h-16 w-auto object-contain"
          priority
        />
      </Link>

      {/* 4. MAIN CONTENT (Centered but Grounded) */}
      <div className="container mx-auto px-6 md:px-24 flex-1 flex flex-col items-center justify-center relative z-10 pt-20">

        <div className="relative">
          {/* Title Block */}
          <div className="text-center max-w-5xl flex flex-col items-center">
            {/* Removed Centered Logo */}
            <h1 className="font-bold text-7xl md:text-9xl mb-6 text-wong-vermilion tracking-tight">
              Alt Access
            </h1>
            <p className="text-2xl md:text-4xl font-bold text-black mb-12">
              The Digital Guide to Accessibility.
            </p>

            {/* Scroll Indicator (Instead of Button) */}
            <div className="flex flex-col items-center gap-4 animate-bounce mt-12 opacity-50">
              <span className="font-mono text-sm uppercase tracking-widest text-black">Scroll to Read</span>
              <ArrowRight className="w-6 h-6 rotate-90 text-black" />
            </div>
          </div>

        </div>
      </div>



    </section>
  )
}
