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
        <div className="w-full max-w-6xl mx-auto my-24 bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 relative">

            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-2 border-black/10 pb-6">
                <div>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold mb-2">The Reality Check</h2>
                    <p className="font-mono text-stone-600">Survey Data: 120+ IT Students</p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={prev} variant="outline" size="icon" className="border-2 border-black rounded-none hover:bg-wong-yellow hover:text-black">
                        <ChevronLeft className="w-6 h-6" />
                    </Button>
                    <Button onClick={next} variant="outline" size="icon" className="border-2 border-black rounded-none hover:bg-wong-yellow hover:text-black">
                        <ChevronRight className="w-6 h-6" />
                    </Button>
                </div>
            </div>

            {/* Slide Content */}
            <div className="grid md:grid-cols-12 gap-12 items-center">

                {/* Text Side */}
                <div className="md:col-span-4 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white font-mono text-sm font-bold uppercase tracking-widest">
                        {(() => {
                            const Icon = slides[current].icon;
                            return <Icon className="w-4 h-4" />
                        })()}
                        Step {current + 1} / {slides.length}
                    </div>

                    <h3 className="text-3xl font-bold leading-tight">{slides[current].title}</h3>
                    <p className="text-xl text-stone-600">{slides[current].desc}</p>

                    <div className="flex flex-col gap-2 mt-8">
                        {slides.map((s, idx) => (
                            <button
                                key={s.id}
                                onClick={() => setCurrent(idx)}
                                className={cn(
                                    "text-left px-4 py-3 font-medium transition-all border-l-4",
                                    current === idx
                                        ? "border-wong-vermilion bg-stone-100 text-black"
                                        : "border-transparent text-stone-400 hover:text-black"
                                )}
                            >
                                {s.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Image Side */}
                <div className="md:col-span-8 bg-stone-100 p-4 border-2 border-black overflow-hidden relative group">
                    <div className="relative aspect-video w-full">
                        <Image
                            src={slides[current].src}
                            alt={slides[current].title}
                            fill
                            className="object-contain"
                        />
                    </div>
                    <p className="absolute bottom-2 right-2 text-xs font-mono text-stone-400 bg-white px-2 py-1 border border-stone-200">
                        Source: Alt Access Survey 2025
                    </p>
                </div>

            </div>

        </div>
    )
}
