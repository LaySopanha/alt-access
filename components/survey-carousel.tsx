"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, BarChart3, PieChart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const slides = [
    {
        id: "purpose",
        title: "The Purpose",
        desc: "Why we needed to ask.",
        src: "/images/survey/survey-purpose.png",
        icon: Users
    },
    {
        id: "status",
        title: "Who Responded?",
        desc: "92% Undergraduate Students.",
        src: "/images/survey/survey-status.png",
        icon: Users
    },
    {
        id: "major",
        title: "The Field",
        desc: "Future CS & IT Professionals.",
        src: "/images/survey/survey-major.png",
        icon: PieChart
    },
    {
        id: "exposure",
        title: "The Reality",
        desc: "69% Have Zero Training.",
        src: "/images/survey/survey-results.png",
        icon: BarChart3
    },
    {
        id: "questions",
        title: "The Methodology",
        desc: "Targeted Discovery.",
        src: "/images/survey/survey-questions.png",
        icon: Users
    }
]

export function SurveyCarousel() {
    const [current, setCurrent] = useState(0)

    const next = () => setCurrent((prev) => (prev + 1) % slides.length)
    const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)

    return (
        <div className="w-full max-w-6xl mx-auto bg-white border border-stone-200 p-6 md:p-10 relative">

            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-stone-200 pb-5">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-1">The Reality Check</h2>
                    <p className="font-mono text-sm text-stone-500">Survey Data: 120+ IT Students</p>
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
                            const Icon = slides[current].icon;
                            return <Icon className="w-3.5 h-3.5" />
                        })()}
                        Step {current + 1} / {slides.length}
                    </div>

                    <h3 className="text-2xl font-bold leading-tight">{slides[current].title}</h3>
                    <p className="text-lg text-stone-500">{slides[current].desc}</p>

                    <div className="flex flex-col gap-1 mt-6">
                        {slides.map((s, idx) => (
                            <button
                                key={s.id}
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
                            src={slides[current].src}
                            alt={slides[current].title}
                            fill
                            className="object-contain"
                        />
                    </div>
                    <p className="absolute bottom-2 right-2 text-xs font-mono text-stone-400 bg-white px-2 py-1 border border-stone-100">
                        Source: Alt Access Survey 2025
                    </p>
                </div>

            </div>

        </div>
    )
}
