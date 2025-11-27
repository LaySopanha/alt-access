"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MousePointer2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="min-h-[85vh] lg:min-h-screen relative overflow-hidden flex items-center bg-[#1351aa]">
      {/* 1. Background Architecture - Cleaner & Lighter */}
      <div className="absolute inset-0 z-0">
        {/* Primary Brand Gradient - Lighter and Cleaner */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1351aa] via-[#1a5dc0] to-[#2563eb]" />

        {/* Subtle Engineering Grid - Very faint with edge fade */}
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:40px_40px]"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 85%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 85%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskComposite: "source-in",
          }}
        />

        {/* Single Ambient Light Source (Top Right) - Adds depth without darkness */}
        <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-white/10 rounded-full blur-[100px] pointer-events-none mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10 pt-20">
        {/* Left Column: Typography & CTA */}
        <div className="space-y-8 max-w-2xl relative">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
            {t.hero.titlePrefix}{" "}
            <span className="relative inline-block text-white">
              {t.hero.titleHighlight}
              {/* Highlight underline */}
              <div className="absolute -bottom-2 left-0 w-full h-3 bg-[#ff751f]/80 -rotate-1 rounded-full -z-10" />
            </span>
          </h1>

          <p className="text-lg md:text-xl text-blue-100 max-w-lg leading-relaxed font-light">{t.hero.description}</p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/experience">
              <Button
                size="lg"
                className="bg-[#ff751f] hover:bg-[#e66a1b] text-white rounded-full px-8 py-7 text-lg font-semibold shadow-lg shadow-orange-900/10 transition-all hover:-translate-y-1"
              >
                <span className="flex items-center gap-2">
                  {t.hero.cta}
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Button>
            </Link>

            <Link href="/about">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 py-7 text-lg border-white/30 bg-transparent text-white hover:bg-white/10 backdrop-blur-sm"
              >
                {t.hero.learnMore}
              </Button>
            </Link>
          </div>

          {/* Trust Indicators - Clean & Minimal */}
          <div className="pt-8 flex flex-col sm:flex-row gap-6 text-sm text-blue-100/80 border-t border-white/10 mt-8"></div>
        </div>

        {/* Right Column: Visual Composition - Toned Down */}
        <div className="relative flex justify-center lg:justify-end py-10 lg:py-0">
          <div className="relative w-full max-w-[500px] aspect-square animate-float">
            {/* Main Image Container - Clean Rounded Square instead of Blob */}
            <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl bg-white/5 backdrop-blur-sm">
              <Image
                src="/diverse-cartoon-faces-illustration-group-art-style.jpg"
                alt="Inclusive community illustration"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
              />

              {/* Subtle Gradient Overlay for integration */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1351aa]/40 to-transparent mix-blend-multiply" />
            </div>

            {/* Floating Glass Card: Tech Focus */}
            <div className="absolute -bottom-6 -left-6 z-20 hidden md:block">
              <div className="bg-[#0B0F19]/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="bg-green-500/20 p-2.5 rounded-lg text-green-400">
                  <MousePointer2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{t.hero.keyboardNav}</p>
                  <p className="text-blue-200 text-xs">{t.hero.fullyOptimized}</p>
                </div>
              </div>
            </div>

            {/* Background Decorative Ring */}
            <div className="absolute inset-4 border border-white/10 rounded-3xl -z-10 rotate-6 scale-105" />
          </div>
        </div>
      </div>
    </section>
  )
}
