"use client"

import { BookOpen, Briefcase, Heart } from "lucide-react"
import { SurveyCarousel } from "@/components/survey-carousel"

export function MotivationSection() {
    return (
        <section id="chapter-3" className="bg-[#FDFCF8] text-black py-40 px-8 md:px-32 lg:px-48">
            <div className="max-w-6xl mx-auto">

                <div className="mb-20 text-center max-w-3xl mx-auto">
                    <span className="font-mono text-sm uppercase tracking-widest text-stone-500 mb-2 block">Chapter 03</span>
                    <h2 className="font-serif text-5xl md:text-7xl font-bold mb-8">Why You Should Care.</h2>
                    <p className="font-sans text-xl text-stone-600">
                        Beyond empathy, there are three critical reasons why accessibility is a non-negotiable skill for modern developers.
                    </p>
                </div>

                {/* The Reality Check (Survey Data) */}
                <SurveyCarousel />

                <div className="grid md:grid-cols-3 gap-8 mt-24">
                    {/* 1. Legal */}
                    <div className="bg-white p-8 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                        <div className="w-16 h-16 bg-wong-vermilion text-white flex items-center justify-center rounded-full mb-6 border-2 border-black">
                            <BookOpen className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 uppercase">It's The Law</h3>
                        <p className="text-stone-600 leading-relaxed mb-4">
                            Governments worldwide (ADA, European Accessibility Act) require strict standards.
                        </p>
                        <div className="bg-stone-100 p-3 text-sm font-mono border-l-4 border-wong-vermilion">
                            Non-compliance leads to lawsuits and fines.
                        </div>
                    </div>

                    {/* 2. Career */}
                    <div className="bg-white p-8 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                        <div className="w-16 h-16 bg-wong-yellow text-black flex items-center justify-center rounded-full mb-6 border-2 border-black">
                            <Briefcase className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 uppercase">Career Growth</h3>
                        <p className="text-stone-600 leading-relaxed mb-4">
                            Job postings for "universal design" are skyrocketing. Teams that practice inclusive design outperform in innovation.
                        </p>
                        <div className="bg-stone-100 p-3 text-sm font-mono border-l-4 border-wong-yellow">
                            Future-proof your skillset.
                        </div>
                    </div>

                    {/* 3. Reach */}
                    <div className="bg-white p-8 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                        <div className="w-16 h-16 bg-wong-blue text-white flex items-center justify-center rounded-full mb-6 border-2 border-black">
                            <Heart className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 uppercase">Expand Reach</h3>
                        <p className="text-stone-600 leading-relaxed mb-4">
                            1.3 billion people globally have a disability. Accessibility improves market reach and brand reputation significantly.
                        </p>
                        <div className="bg-stone-100 p-3 text-sm font-mono border-l-4 border-wong-blue">
                            Don't exclude 15% of users.
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
