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
    <section id="chapter-5" className="bg-[#FDFCF8] border-b-8 border-black">

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
      <div className="py-24 px-8 md:px-24 border-b-8 border-black">
        <div className="max-w-7xl mx-auto">
          <span className="font-mono text-sm uppercase tracking-widest text-stone-500 mb-4 block">
            Chapter 05 / The Practice
          </span>
          <h2 className="text-6xl md:text-8xl font-black text-black mb-8 tracking-tighter uppercase leading-none">
            Simulation<br />Laboratory
          </h2>
          <p className="text-xl md:text-2xl font-medium max-w-2xl leading-relaxed text-stone-700">
            Theory teaches you "what". Experience teaches you "why".
            Step into the user's perspective to test your assumptions.
          </p>
        </div>
      </div>

      {/* Experience Grid */}
      <div className="w-full">
        {experiences.map((exp, index) => {
          // @ts-ignore
          const content = t.experiences[exp.key]
          const Icon = exp.icon

          return (
            <Link
              key={exp.id}
              href={exp.href}
              className="group block border-b-4 border-black last:border-b-0"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[400px] lg:min-h-[500px]">

                {/* Text Content */}
                <div className="lg:col-span-5 p-8 md:p-16 flex flex-col justify-between bg-white relative z-10">
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <span className="font-mono text-sm font-bold border-2 border-black px-2 py-1">
                        SIM-{exp.id}
                      </span>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-4xl md:text-6xl font-black uppercase mb-6 leading-[0.9] group-hover:translate-x-2 transition-transform duration-300">
                      {content.title}
                    </h3>
                    <p className="text-lg font-medium text-stone-600 leading-relaxed max-w-md">
                      {content.description}
                    </p>
                  </div>

                  <div className="mt-12 flex items-center gap-4 font-mono text-sm uppercase tracking-widest font-bold group-hover:gap-6 transition-all">
                    <span>Enter Simulation</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Visual Preview */}
                <div className="lg:col-span-7 relative bg-stone-100 overflow-hidden border-t-4 lg:border-t-0 lg:border-l-4 border-black">
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
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
                  {exp.overlay}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
