"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, BarChart3, PieChart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/hooks/use-language"

const slideImages = [
    "/images/survey/survey-purpose.png",
    "/images/survey/survey-status.png",
    "/images/survey/survey-major.png",
    "/images/survey/survey-results.png",
    "/images/survey/survey-questions.png",
]

const slideIcons = [Users, Users, PieChart, BarChart3, Users]

export function SurveyCarousel() {
    const [current, setCurrent] = useState(0)
    const { t } = useLanguage()

    const next = () => setCurrent((prev) => (prev + 1) % t.survey.slides.length)
    const prev = () => setCurrent((prev) => (prev - 1 + t.survey.slides.length) % t.survey.slides.length)

    return (
        <div className="w-full max-w-6xl mx-auto bg-white border border-stone-200 p-6 md:p-10 relative">

            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-stone-200 pb-5">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-1">{t.survey.title}</h2>
                    <p className="font-mono text-sm text-stone-500">{t.survey.subtitle}</p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={prev} variant="outline" size="icon" className="border border-stone-300 rounded-none hover:bg-stone-100">
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <Button onClick={next} variant="outline" size="icon" className="border border-stone-300 rounded-none hover:bg-stone-100">
                        <ChevronRight className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {/* Slide Content */}
            <div className="grid md:grid-cols-12 gap-8 items-center">

                {/* Text Side */}
                <div className="md:col-span-4 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-stone-900 text-white font-mono text-xs uppercase tracking-widest">
                        {(() => {
                            const Icon = slideIcons[current];
                            return <Icon className="w-3.5 h-3.5" />
                        })()}
                        {t.survey.step} {current + 1} / {t.survey.slides.length}
                    </div>

                    <h3 className="text-2xl font-bold leading-tight">{t.survey.slides[current].title}</h3>
                    <p className="text-lg text-stone-500">{t.survey.slides[current].desc}</p>

                    <div className="flex flex-col gap-1 mt-6">
                        {t.survey.slides.map((s: { title: string; desc: string }, idx: number) => (
                            <button
                                key={idx}
                                onClick={() => setCurrent(idx)}
                                className={cn(
                                    "text-left px-3 py-2 text-sm font-medium transition-all border-l-2",
                                    current === idx
                                        ? "border-wong-vermilion bg-stone-50 text-black"
                                        : "border-transparent text-stone-400 hover:text-black"
                                )}
                            >
                                {s.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Image Side */}
                <div className="md:col-span-8 bg-stone-50 p-3 border border-stone-200 overflow-hidden relative group">
                    <div className="relative aspect-video w-full">
                        <Image
                            src={slideImages[current]}
                            alt={t.survey.slides[current].title}
                            fill
                            sizes="(max-width: 768px) 100vw, 66vw"
                            className="object-contain"
                        />
                    </div>
                    <p className="absolute bottom-2 right-2 text-xs font-mono text-stone-400 bg-white px-2 py-1 border border-stone-100">
                        {t.survey.source}
                    </p>
                </div>

            </div>

        </div>
    )
}
