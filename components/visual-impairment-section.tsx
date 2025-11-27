"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"

export function VisualImpairmentSection() {
  const { t } = useLanguage()

  return (
    <section className="bg-lima-blue text-white py-24 overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="relative z-10">
            {/* Top Text with Arrow */}
            <div className="relative mb-16">
              <p className="text-sm md:text-base font-light mb-2">{t.visualImpairment.wonderText}</p>
              <h2 className="text-5xl md:text-7xl font-serif leading-none whitespace-pre-line">
                {t.visualImpairment.mainTitle}
              </h2>

              {/* Hand drawn arrow pointing to content */}
              <div className="absolute left-[200px] top-full mt-2 hidden md:block">
                <svg
                  width="100"
                  height="80"
                  viewBox="0 0 100 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transform rotate-12"
                >
                  <path d="M10 10 C 30 50, 80 20, 80 60" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M70 55 L 80 60 L 85 50" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Main Content Block */}
            <div className="mt-8 space-y-6 max-w-lg">
              <div className="flex items-baseline gap-4">
                <span className="text-2xl font-mono opacity-80">{t.visualImpairment.number}</span>
                <h3 className="text-4xl font-serif">{t.visualImpairment.subtitle}</h3>
              </div>

              <p className="text-lg opacity-90 leading-relaxed">{t.visualImpairment.description}</p>

              <div className="pt-4">
                <Link
                  href="/experience"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white hover:bg-white hover:text-lima-blue transition-colors duration-300 group"
                >
                  {t.visualImpairment.exploreCta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Image/Illustration */}
          <div className="relative">
            {/* Purple stylized background/card */}
            <div className="bg-[#8B8BAC] rounded-lg overflow-hidden aspect-[4/3] relative group border-2 border-white/20">
              {/* Illustration Placeholder - Using the blurred vision image as a base since it fits the theme */}
              <img
                src="/blurred-vision-accessibility-simulation.jpg"
                alt="Visual Impairment Illustration"
                className="w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Overlay Graphics (Simulating the sketch style) */}
              <div className="absolute inset-0 pointer-events-none opacity-40">
                <svg className="w-full h-full" viewBox="0 0 400 300">
                  <circle cx="50" cy="50" r="20" stroke="white" fill="none" />
                  <circle cx="350" cy="250" r="30" stroke="white" fill="none" />
                  <path d="M50 150 C 100 100, 300 200, 350 150" stroke="white" fill="none" strokeDasharray="5,5" />
                </svg>
              </div>

              {/* Center Figure (using placeholder accessible icon/text if image generic) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 text-center">
                  <span className="block text-4xl mb-2">👁️</span>
                  <span className="font-serif italic text-xl">Simulation Mode</span>
                </div>
              </div>
            </div>

            {/* "Try a simulation" floating badge */}
            <div className="absolute -top-6 -right-6 hidden md:flex">
              <Link
                href="/experience"
                className="bg-[#9D66CC] hover:bg-[#8A55BB] text-white px-6 py-2 rounded-lg font-medium shadow-lg flex items-center gap-2 transition-transform hover:-translate-y-1"
              >
                <span>👾</span> {t.visualImpairment.trySimulation}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Right Mailing List (Optional based on design) */}
        <div className="absolute bottom-10 right-10 hidden md:block">
          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors border border-white/10">
            {t.visualImpairment.joinMailingList}
          </button>
        </div>
      </div>
    </section>
  )
}
