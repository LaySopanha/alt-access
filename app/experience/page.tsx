"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Globe, Eye, EyeOff, Palette } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export default function ExperiencePage() {
  const { language, setLanguage, t } = useLanguage()

  const experiences = [
    {
      id: "01",
      key: "totalBlindness",
      icon: EyeOff,
      href: "/experience/total-blindness",
      image: "/screen-reader-accessibility-blind-user.jpg",
      // Hover: Fade to black to simulate blindness
      imageClass: "group-hover:opacity-0 transition-opacity duration-700",
      overlay: (
        <div className="absolute inset-0 bg-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <span className="text-white font-mono text-sm tracking-widest uppercase animate-pulse border border-white/30 px-3 py-1 rounded-full">
            Audio Only Mode
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
      // Hover: Deuteranopia filter (using SVG filter defined below)
      imageClass: "group-hover:[filter:url('#deuteranopia')] transition-all duration-700",
      overlay: null
    },
  ] as const

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-[#ff751f] selection:text-white overflow-hidden relative">
      
      {/* Global SVG Filters for Simulations */}
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

      {/* Header - Transparent absolute */}
      <header className="w-full px-6 md:px-10 py-8 flex justify-between items-center absolute top-0 left-0 right-0 z-20">
        <Link href="/" className="text-[#1351aa] font-bold text-xl tracking-wider font-mono hover:opacity-80 transition-opacity">
          {t.nav.logo}
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xs md:text-sm font-medium text-slate-600 hover:text-[#1351aa] transition-colors"
          >
            {t.nav.backHome}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-600 hover:bg-[#1351aa]/10 hover:text-[#1351aa]">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={language} onValueChange={(val) => setLanguage(val as "en" | "km")}>
                <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="km">ភាសាខ្មែរ (Khmer)</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Page Title Area */}
      <div className="pt-32 pb-16 px-6 text-center z-10 relative">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1351aa] mb-4 drop-shadow-sm">
          Choose Your Perspective
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          Select a simulation below to experience the digital world through a different lens.
        </p>
      </div>

      {/* Cards Container */}
      <div className="flex-1 container mx-auto px-6 md:px-10 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1400px] mx-auto h-full items-stretch">
          {experiences.map((exp, index) => {
            // @ts-ignore
            const content = t.experiences[exp.key]
            const Icon = exp.icon

            return (
              <Link
                key={exp.id}
                href={exp.href}
                className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#1351aa]/10 border border-slate-200 hover:border-[#1351aa]/30 transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Image Section */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <Image
                    src={exp.image}
                    alt={content.title}
                    fill
                    className={cn(
                      "object-cover transition-all duration-700 transform group-hover:scale-105",
                      exp.imageClass
                    )}
                  />
                  {/* Overlay for effects (like blindness black screen) */}
                  {exp.overlay}
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#1351aa] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2 border border-[#1351aa]/10">
                    <span className="font-mono">{exp.id}</span>
                    <span className="w-px h-3 bg-slate-300" />
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-1">
                  <h2 className="text-2xl font-serif font-bold text-slate-900 mb-3 group-hover:text-[#1351aa] transition-colors">
                    {content.title}
                  </h2>
                  
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                    {content.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100 group-hover:border-[#1351aa]/10 transition-colors">
                    <span className="text-[#ff751f] font-bold text-sm uppercase tracking-wide group-hover:text-[#e06519] transition-colors">
                      {content.cta}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#ff751f]/10 flex items-center justify-center text-[#ff751f] group-hover:bg-[#ff751f] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#1351aa]/5 to-transparent -z-10" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#ff751f]/5 rounded-full blur-[120px] pointer-events-none -z-10" />
    </main>
  )
}
