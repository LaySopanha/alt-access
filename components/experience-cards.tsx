"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Eye, EyeOff, Palette } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { cn } from "@/lib/utils"

export function ExperienceCards() {
  const { t } = useLanguage()

  const experiences = [
    {
      id: "01",
      key: "totalBlindness",
      icon: EyeOff,
      href: "/experience/total-blindness",
      image: "/screen-reader-accessibility-blind-user.jpg",
      // Hover: Fade to black
      imageClass: "group-hover:opacity-0 transition-opacity duration-700",
      overlay: (
        <div className="absolute inset-0 bg-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <span className="font-mono text-xl tracking-widest uppercase animate-pulse border-2 border-white px-6 py-2 text-white">
            Audio Only
          </span>
        </div>
      )
    },
    {
      id: "02",
      key: "lowVision",
      icon: Eye,
      href: "/experience/low-vision",
      image: "/blurred-vision-accessibility-simulation.jpg",
      // Hover: Blur effect
      imageClass: "group-hover:blur-[6px] transition-all duration-700",
      overlay: null
    },
    {
      id: "03",
      key: "colorBlindness",
      icon: Palette,
      href: "/experience/color-blindness",
      image: "/color-blindness-spectrum-visual.jpg",
      // Hover: Deuteranopia filter
      imageClass: "group-hover:[filter:url('#deuteranopia')] transition-all duration-700",
      overlay: null
    },
  ] as const

  return (
    <section id="simulations" className="bg-[#FDFCF8] pb-32">

      {/* Global SVG Filters */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="deuteranopia">
            <feColorMatrix
              type="matrix"
              values="0.625, 0.375, 0,   0, 0
                      0.7,   0.3,   0,   0, 0
                      0,     0.3,   0.7, 0, 0
                      0,     0,     0,   1, 0"
            />
          </filter>
        </defs>
      </svg>

      {/* Header Section */}
      <div className="pt-24 pb-16 px-8 md:px-24">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-stone-400 mb-6 block">
            The Practice
          </span>
          <h2 className="text-5xl md:text-7xl font-bold text-black mb-6 tracking-tight">
            Feel how the visually impaired experience the web
          </h2>
          <p className="text-xl font-medium max-w-2xl leading-relaxed text-stone-600">
            Theory teaches you "what". Experience teaches you "why".
            Step into the user's perspective to test your assumptions.
          </p>
        </div>
      </div>

      {/* Experience Grid */}
      <div className="px-8 md:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp, index) => {
            // @ts-ignore
            const content = t.experiences[exp.key]
            const Icon = exp.icon

            return (
              <Link
                key={exp.id}
                href={exp.href}
                className="group flex flex-col bg-white border border-stone-200 hover:border-black transition-colors"
              >
                {/* Visual Preview */}
                <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden border-b border-stone-200">
                  <Image
                    src={exp.image}
                    alt={content.title}
                    fill
                    className={cn(
                      "object-cover transition-all duration-700 group-hover:scale-105",
                      exp.imageClass
                    )}
                  />
                  {/* Interaction Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
                  {exp.overlay}
                </div>

                {/* Text Content */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-mono text-sm font-bold uppercase tracking-widest text-stone-500">
                      SIM-{exp.id}
                    </span>
                    <Icon className="w-5 h-5 text-stone-500" />
                  </div>

                  <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tight leading-tight">
                    {content.title}
                  </h3>

                  <p className="text-lg font-medium text-stone-700 mb-8 flex-1 leading-relaxed">
                    {content.description}
                  </p>

                  <div className="flex items-center gap-3 font-mono text-sm uppercase tracking-widest font-bold group-hover:text-wong-vermilion transition-colors">
                    <span>Enter Simulation</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
