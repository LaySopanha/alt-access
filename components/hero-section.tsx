"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="min-h-screen bg-lima-blue relative overflow-hidden flex items-center">
      <div className="container mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 items-center pt-20">
        <div className="space-y-6 max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">{t.hero.title}</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-lg leading-relaxed">{t.hero.description}</p>
          <div className="pt-4">
            <Link href="/experience">
              <Button
                size="lg"
                className="bg-lima-orange hover:bg-orange-600 text-white rounded-full px-8 py-6 text-lg font-medium transition-transform hover:scale-105 border-none cursor-pointer"
              >
                {t.hero.cta}
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center md:justify-end">
          <div className="relative w-full max-w-[500px] aspect-square">
            <Image
              src="/diverse-cartoon-faces-illustration-group-art-style.jpg"
              alt="Diverse group of people illustration"
              fill
              className="object-contain rounded-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
