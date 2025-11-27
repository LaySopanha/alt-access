"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Globe } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ExperiencePage() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <main className="min-h-screen bg-[#0044CC] text-white flex flex-col font-sans selection:bg-white selection:text-black overflow-hidden">
      {/* Header */}
      <header className="w-full px-6 md:px-10 py-8 flex justify-between items-start absolute top-0 left-0 right-0 z-10 animate-in fade-in slide-in-from-top-4 duration-700">
        {/* Logo Area */}
        <Link href="/" className="text-white font-bold text-xl tracking-wider font-mono">
          {t.nav.logo}
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xs md:text-sm underline underline-offset-4 hover:no-underline hover:opacity-70 transition-all"
          >
            {t.nav.backHome}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
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

      {/* Main Content - 3 Columns */}
      <div className="flex-1 flex items-center justify-center w-full px-6 py-24 md:py-0 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-[1400px] mx-auto pt-20">
          {/* Experience 01 */}
          <Link
            href="/experience/total-blindness"
            className="group flex flex-col text-left cursor-pointer relative animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
            style={{ animationDelay: "100ms" }}
          >
            <div className="relative aspect-[4/3] w-full mb-8 overflow-hidden rounded-lg shadow-xl">
              <Image
                src="/screen-reader-accessibility-blind-user.jpg"
                alt="Total Blindness Simulation"
                width={800}
                height={600}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                <span className="text-sm font-light tracking-widest">01</span>
              </div>
            </div>

            <h2 className="text-3xl lg:text-4xl font-serif mb-4 group-hover:text-[#FFA500] transition-colors">
              {t.experiencePage.totalBlindness}
            </h2>

            <p className="text-blue-100 text-sm md:text-base leading-relaxed mb-8 max-w-sm group-hover:text-white transition-colors">
              {t.experiences.totalBlindness.description}
            </p>

            <div className="mt-auto flex items-center text-[#FFA500] font-medium tracking-wide text-sm uppercase group-hover:translate-x-2 transition-transform">
              {t.experiences.totalBlindness.cta}
              <ArrowRight className="ml-2 w-4 h-4" />
            </div>
          </Link>

          {/* Experience 02 */}
          <Link
            href="/experience/low-vision"
            className="group flex flex-col text-left cursor-pointer relative animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
            style={{ animationDelay: "300ms" }}
          >
            <div className="relative aspect-[4/3] w-full mb-8 overflow-hidden rounded-lg shadow-xl">
              <Image
                src="/blurred-vision-accessibility-simulation.jpg"
                alt="Low Vision Simulation"
                width={800}
                height={600}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                <span className="text-sm font-light tracking-widest">02</span>
              </div>
            </div>

            <h2 className="text-3xl lg:text-4xl font-serif mb-4 group-hover:text-[#FFA500] transition-colors">
              {t.experiencePage.lowVision}
            </h2>

            <p className="text-blue-100 text-sm md:text-base leading-relaxed mb-8 max-w-sm group-hover:text-white transition-colors">
              {t.experiences.lowVision.description}
            </p>

            <div className="mt-auto flex items-center text-[#FFA500] font-medium tracking-wide text-sm uppercase group-hover:translate-x-2 transition-transform">
              {t.experiences.lowVision.cta}
              <ArrowRight className="ml-2 w-4 h-4" />
            </div>
          </Link>

          {/* Experience 03 */}
          <Link
            href="/experience/color-blindness"
            className="group flex flex-col text-left cursor-pointer relative animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
            style={{ animationDelay: "500ms" }}
          >
            <div className="relative aspect-[4/3] w-full mb-8 overflow-hidden rounded-lg shadow-xl">
              <Image
                src="/color-blindness-spectrum-visual.jpg"
                alt="Color Blindness Simulation"
                width={800}
                height={600}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                <span className="text-sm font-light tracking-widest">03</span>
              </div>
            </div>

            <h2 className="text-3xl lg:text-4xl font-serif mb-4 group-hover:text-[#FFA500] transition-colors">
              {t.experiencePage.colorBlindness}
            </h2>

            <p className="text-blue-100 text-sm md:text-base leading-relaxed mb-8 max-w-sm group-hover:text-white transition-colors">
              {t.experiences.colorBlindness.description}
            </p>

            <div className="mt-auto flex items-center text-[#FFA500] font-medium tracking-wide text-sm uppercase group-hover:translate-x-2 transition-transform">
              {t.experiences.colorBlindness.cta}
              <ArrowRight className="ml-2 w-4 h-4" />
            </div>
          </Link>
        </div>
      </div>
    </main>
  )
}
