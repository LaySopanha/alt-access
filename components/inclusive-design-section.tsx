"use client"

import Image from "next/image"
import { Users, Lightbulb, TrendingUp, Monitor, Volume2, Type } from "lucide-react"

export function InclusiveDesignSection() {
    return (
        <section id="chapter-2" className="bg-[#1351aa] text-white pt-24 pb-16">

            {/* Chapter Header */}
            <div className="px-8 md:px-24 mb-16">
                <div className="max-w-7xl mx-auto border-b border-white/20 pb-10">
                    <span className="font-mono text-xs uppercase tracking-widest text-blue-300 mb-4 block">Chapter 02</span>
                    <h2 className="text-5xl md:text-7xl font-bold text-white leading-[0.9] tracking-tight uppercase mb-6">
                        Inclusive<br />Design
                    </h2>
                    <p className="text-xl md:text-2xl max-w-3xl leading-relaxed text-blue-100">
                        "Accessibility is the baseline standard. Inclusive Design is the <span className="bg-[#ff751f]/80 text-white px-1">methodology</span> that helps achieve it."
                    </p>
                </div>
            </div>

            <div className="px-8 md:px-24">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Left Column: Core Concepts (Sticky) */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-32">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-0.5 w-10 bg-[#ff751f]"></div>
                                <span className="font-mono text-xs uppercase tracking-widest text-blue-300">How Do We Build It?</span>
                            </div>

                            <p className="text-xl md:text-2xl leading-snug mb-8 text-blue-50">
                                Inclusive Design is a methodology that learns from diverse users and designs with human differences in mind from the start.
                            </p>

                            <div className="bg-white/5 p-6 border border-white/15 text-base text-blue-100 leading-relaxed backdrop-blur-sm">
                                It considers not just permanent disability, but <strong className="text-white">temporary</strong> injuries, <strong className="text-white">situational</strong> limitations, language barriers, and cultural contexts.
                            </div>
                        </div>
                    </div>

                    {/* Right Column: The Curb Cut Effect */}
                    <div className="lg:col-span-7">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="h-0.5 w-10 bg-white/50"></div>
                            <span className="font-mono text-xs uppercase tracking-widest text-[#ff751f]">The Curb-Cut Effect</span>
                        </div>

                        <div className="relative bg-white text-black p-8 md:p-10 border-t-4 border-[#ff751f]">
                            {/* Background Illustration */}
                            <div className="absolute top-0 right-0 w-48 h-48 opacity-5 mix-blend-multiply pointer-events-none rotate-6 overflow-hidden">
                                <Image
                                    src="/images/curb-cut.png"
                                    alt=""
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="relative z-10">
                                <p className="text-xl font-semibold leading-relaxed mb-4 max-w-xl text-stone-800">
                                    A feature designed for accessibility often improves the experience for <span className="underline decoration-[#ff751f] decoration-2">everyone</span>.
                                </p>
                                <p className="text-base text-stone-600 leading-relaxed mb-10 max-w-xl border-l-2 border-stone-200 pl-4">
                                    In urban design, sidewalk ramps (curb cuts) were specifically made for wheelchairs but fundamentally helped parents with strollers, travelers with heavy luggage, and cyclists.
                                </p>

                                <div className="space-y-4">
                                    <div className="group border-b border-stone-200 pb-4 flex items-start gap-5 hover:translate-x-1 transition-transform">
                                        <div className="w-10 h-10 bg-[#1351aa] text-white flex items-center justify-center rounded shrink-0">
                                            <Volume2 className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-base mb-1 flex items-center gap-2">
                                                Screen Readers
                                                <span className="text-xs font-mono bg-stone-100 px-2 py-0.5 text-stone-400 rounded">Blind</span>
                                            </h4>
                                            <p className="text-stone-500 text-sm leading-relaxed">
                                                Used heavily by commuters listening to articles while driving, and people experiencing severe eye fatigue.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="group pb-4 flex items-start gap-5 hover:translate-x-1 transition-transform">
                                        <div className="w-10 h-10 bg-[#1351aa] text-white flex items-center justify-center rounded shrink-0">
                                            <Type className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-base mb-1 flex items-center gap-2">
                                                Video Captions
                                                <span className="text-xs font-mono bg-stone-100 px-2 py-0.5 text-stone-400 rounded">Deaf</span>
                                            </h4>
                                            <p className="text-stone-500 text-sm leading-relaxed">
                                                Essential for people watching videos in noisy public places, quiet libraries, or those learning a non-native language.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 font-mono text-xs uppercase tracking-widest text-right text-blue-300">
                            One Solution. Infinite Benefits.
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
