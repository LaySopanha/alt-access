"use client"

import { ArrowRight, Eye, EyeOff, Palette } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"

const experiences = [
  {
    id: "01",
    icon: EyeOff,
    href: "/experience/total-blindness",
    key: "totalBlindness" as const,
  },
  {
    id: "02",
    icon: Eye,
    href: "/experience/low-vision",
    key: "lowVision" as const,
  },
  {
    id: "03",
    icon: Palette,
    href: "/experience/color-blindness",
    key: "colorBlindness" as const,
  },
]

export function ExperienceCards() {
  const { t } = useLanguage()

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-3 gap-8">
          {experiences.map((exp) => {
            const content = t.experiences[exp.key]
            return (
              <Link
                key={exp.id}
                href={exp.href}
                className="group block p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-lima-blue/30 hover:shadow-xl hover:shadow-lima-blue/5 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-8">
                  <span className="text-4xl font-mono font-bold text-lima-blue/20 group-hover:text-lima-blue transition-colors">
                    {exp.id}
                  </span>
                  <div className="p-3 bg-white rounded-full shadow-sm group-hover:bg-lima-orange group-hover:text-white transition-colors">
                    <exp.icon className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-lima-blue transition-colors">
                  {content.title}
                </h3>
                <p className="text-slate-600 mb-8 leading-relaxed">{content.description}</p>

                <div className="flex items-center text-lima-blue font-medium group-hover:translate-x-2 transition-transform">
                  {content.cta} <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
