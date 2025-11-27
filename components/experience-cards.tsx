"use client"

import { ArrowRight, Eye, EyeOff, Palette } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import { cn } from "@/lib/utils"

export function ExperienceCards() {
  const { t } = useLanguage()

  const experiences = [
    {
      id: "01",
      icon: EyeOff,
      href: "/experience/total-blindness",
      key: "totalBlindness",
      // Blindness: Fades to black, text vanishes
      className: "group hover:bg-black transition-colors duration-700",
      contentClass: "group-hover:opacity-0 transition-opacity duration-500",
      overlay: (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="border-2 border-white/50 w-full h-12 bg-white/10 rounded animate-pulse" />
          <span className="absolute text-white font-mono text-xs tracking-widest uppercase opacity-70">
            VoiceOver Active
          </span>
        </div>
      )
    },
    {
      id: "02",
      icon: Eye,
      href: "/experience/low-vision",
      key: "lowVision",
      // Low Vision: Blurs + "Smear" spots
      className: "group",
      contentClass: "group-hover:blur-[3px] transition-all duration-700",
      overlay: (
        // Floaters / Smear Effect
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-black/10 rounded-full blur-xl animate-float-delayed" />
          <div className="absolute bottom-1/3 right-1/4 w-32 h-20 bg-black/15 rounded-[100%] blur-2xl animate-float" />
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-black/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
        </div>
      )
    },
    {
      id: "03",
      icon: Palette,
      href: "/experience/color-blindness",
      key: "colorBlindness",
      // Color Blind: Applies Deuteranopia filter
      className: "group hover:bg-slate-50",
      contentClass: "group-hover:[filter:url('#deuteranopia')] transition-all duration-500",
      overlay: null
    },
  ]

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      
      {/* SVG Filters Definition (Hidden) */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          {/* Deuteranopia Filter (Red-Green Color Blindness) */}
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

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#ff751f] font-bold tracking-widest uppercase text-xs mb-2 block">
            Interactive Simulations
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1351aa]">
            Experience the Barrier
          </h2>
          <p className="text-slate-500 mt-4">
            Select a card to toggle the simulation. Understand the web through a different lens.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {experiences.map((exp) => {
            // @ts-ignore
            const content = t.experiences[exp.key]
            const Icon = exp.icon

            return (
              <Link
                key={exp.id}
                href={exp.href}
                className={cn(
                  "relative flex flex-col p-8 rounded-2xl border border-slate-200 shadow-sm transition-all duration-500 hover:shadow-2xl hover:border-[#1351aa]/30 hover:-translate-y-1 overflow-hidden bg-white",
                  exp.className
                )}
              >
                {/* Specific Simulation Overlay */}
                {exp.overlay}

                {/* Main Content */}
                <div className={cn("relative z-10 flex flex-col h-full", exp.contentClass)}>
                  
                  {/* Top Row */}
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-4xl font-serif font-bold text-slate-100 group-hover:text-slate-200 transition-colors">
                      {exp.id}
                    </span>
                    <div className="p-3 bg-[#1351aa]/5 rounded-xl group-hover:bg-[#1351aa] transition-colors duration-500">
                      <Icon className="w-6 h-6 text-[#1351aa] group-hover:text-white transition-colors duration-500" />
                    </div>
                  </div>

                  {/* Text */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#1351aa] transition-colors">
                    {content.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                    {content.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center text-sm font-bold text-[#ff751f] mt-auto">
                    <span className="group-hover:mr-2 transition-all duration-300">
                      {content.cta}
                    </span>
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
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
