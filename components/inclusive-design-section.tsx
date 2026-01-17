"use client"

import { Users, Lightbulb, TrendingUp, Monitor, Volume2, Type } from "lucide-react"

export function InclusiveDesignSection() {
    return (
        <section id="chapter-2" className="bg-[#1351aa] text-white py-40 px-8 md:px-32 lg:px-48">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="mb-20 border-b-2 border-white/20 pb-8">
                    <span className="font-mono text-sm uppercase tracking-widest text-blue-200 mb-2 block">Chapter 02</span>
                    <h2 className="font-serif text-5xl md:text-7xl font-bold text-white">Inclusive Design.</h2>
                    <p className="font-sans text-xl text-blue-100 mt-6 max-w-2xl leading-relaxed">
                        "Accessibility is the standard. Inclusive Design is the mindset that helps achieve it."
                    </p>
                </div>

                {/* 1. Methodology */}
                <div className="mb-24">
                    <h3 className="text-2xl font-bold uppercase mb-8 flex items-center gap-3">
                        <Users className="w-6 h-6 text-[#ff751f]" />
                        4. How Do We Build It?
                    </h3>
                    <div className="bg-white/5 p-8 md:p-12 rounded-lg border border-white/10 mb-8 backdrop-blur-sm">
                        <p className="text-lg leading-relaxed text-blue-50 mb-6">
                            Inclusive Design is a methodology that learns from diverse users and designs with human differences in mind from the start.
                            It considers not just disability, but language barriers, cultural contexts, and situational limitations.
                        </p>
                        <div className="font-mono text-xs uppercase tracking-widest text-[#ff751f]">
                            Explore: Microsoft Inclusive Design Principles
                        </div>
                    </div>
                </div>

                {/* 2. The Curb Cut Effect */}
                <div>
                    <h3 className="text-2xl font-bold uppercase mb-8 flex items-center gap-3">
                        <TrendingUp className="w-6 h-6 text-[#ff751f]" />
                        5. The Curb-Cut Effect
                    </h3>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="text-lg leading-relaxed text-blue-50 mb-6">
                                A feature designed for accessibility often improves the experience for <strong>everyone</strong>.
                                <br /><br />
                                In urban design, sidewalk ramps (curb cuts) were made for wheelchairs but helped parents with strollers, travelers with luggage, and cyclists.
                            </p>
                            <div className="bg-[#ff751f] text-black font-bold p-4 inline-block transform -rotate-1 shadow-lg">
                                One solution. Infinite benefits.
                            </div>
                        </div>

                        {/* Examples Grid */}
                        <div className="space-y-4">
                            <div className="bg-white text-black p-6 rounded shadow-lg flex items-start gap-4 transform hover:translate-x-2 transition-transform">
                                <Volume2 className="w-6 h-6 text-[#1351aa] mt-1" />
                                <div>
                                    <h4 className="font-bold text-lg">Screen Readers</h4>
                                    <p className="text-sm text-stone-600">Built for blind users. Used by commuters listening to articles and people experiencing eye fatigue.</p>
                                </div>
                            </div>

                            <div className="bg-white text-black p-6 rounded shadow-lg flex items-start gap-4 transform hover:translate-x-2 transition-transform delay-100">
                                <Type className="w-6 h-6 text-[#1351aa] mt-1" />
                                <div>
                                    <h4 className="font-bold text-lg">Captions</h4>
                                    <p className="text-sm text-stone-600">Built for hearing impaired. Used by people in noisy environments or non-native speakers.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
