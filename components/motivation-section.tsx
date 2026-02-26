"use client"

import { BookOpen, Briefcase, Heart } from "lucide-react"
import { SurveyCarousel } from "@/components/survey-carousel"

export function MotivationSection() {
    return (
        <section id="chapter-3" className="bg-[#FDFCF8] text-black pt-24 pb-16">

            {/* Chapter Header */}
            <div className="px-8 md:px-24 mb-16">
                <div className="max-w-7xl mx-auto border-b-2 border-stone-200 pb-10">
                    <span className="font-mono text-xs uppercase tracking-widest text-stone-400 mb-4 block">Chapter 03</span>
                    <h2 className="text-5xl md:text-7xl font-bold text-black leading-[0.9] tracking-tight uppercase mb-6">
                        The<br />Motivation
                    </h2>
                    <p className="text-xl md:text-2xl max-w-3xl leading-relaxed text-stone-600">
                        Beyond empathy, there are three critical reasons why accessibility requires <span className="bg-wong-blue/20 px-1 text-stone-800">immediate action</span> from modern developers.
                    </p>
                </div>
            </div>

            {/* Survey Carousel - FULL WIDTH, not inside the grid */}
            <div className="px-8 md:px-24 mb-16">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-0.5 w-10 bg-wong-yellow"></div>
                        <span className="font-mono text-xs uppercase tracking-widest text-stone-500">Survey Data</span>
                    </div>
                    <SurveyCarousel />
                </div>
            </div>

            {/* Two-column grid for the rest */}
            <div className="px-8 md:px-24">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Left Column: The Why */}
                    <div className="lg:col-span-5">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-0.5 w-10 bg-black"></div>
                            <span className="font-mono text-xs uppercase tracking-widest text-stone-500">Why You Should Care</span>
                        </div>

                        <p className="text-xl md:text-2xl leading-snug mb-8 text-stone-800">
                            It isn't just about doing the right thing. It's about building robust software for the real world.
                        </p>

                        <div className="bg-stone-900 text-white p-6 border border-stone-700 text-base leading-relaxed">
                            <strong>The Reality Check:</strong> We surveyed over 50 local developers. Most agree it's important, but almost none actually implement it. Here is why you must.
                        </div>
                    </div>

                    {/* Right Column: The 3 Pillars */}
                    <div className="lg:col-span-7">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-0.5 w-10 bg-wong-blue"></div>
                            <span className="font-mono text-xs uppercase tracking-widest text-stone-500">The Three Pillars</span>
                        </div>

                        <div className="flex flex-col gap-4">
                            {/* 1. Legal */}
                            <div className="bg-white p-6 border border-stone-200 flex gap-6 items-start hover:border-stone-400 transition-all">
                                <div className="w-12 h-12 shrink-0 bg-wong-vermilion/10 text-wong-vermilion flex items-center justify-center rounded">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold mb-1 uppercase tracking-tight">It's The Law</h3>
                                    <p className="text-stone-500 text-base leading-relaxed">
                                        Governments worldwide (ADA, European Accessibility Act) require strict standards. Non-compliance limits global reach and risks lawsuits.
                                    </p>
                                </div>
                            </div>

                            {/* 2. Career */}
                            <div className="bg-white p-6 border border-stone-200 flex gap-6 items-start hover:border-stone-400 transition-all">
                                <div className="w-12 h-12 shrink-0 bg-wong-yellow/10 text-wong-yellow flex items-center justify-center rounded">
                                    <Briefcase className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold mb-1 uppercase tracking-tight">Career Growth</h3>
                                    <p className="text-stone-500 text-base leading-relaxed">
                                        Teams that practice inclusive design outperform in innovation. Expertise in "universal design" future-proofs your engineering skillset.
                                    </p>
                                </div>
                            </div>

                            {/* 3. Reach */}
                            <div className="bg-white p-6 border border-stone-200 flex gap-6 items-start hover:border-stone-400 transition-all">
                                <div className="w-12 h-12 shrink-0 bg-wong-blue/10 text-wong-blue flex items-center justify-center rounded">
                                    <Heart className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold mb-1 uppercase tracking-tight">Expand Reach</h3>
                                    <p className="text-stone-500 text-base leading-relaxed">
                                        1.3 billion people globally have a disability. Building inaccessible products arbitrarily excludes 15% of your potential user base.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
