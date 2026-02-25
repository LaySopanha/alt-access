"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import {
    ArrowRight,
    Clock,
    BookOpen,
    CheckCircle2,
    Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { AccessibilityGraphic } from "@/components/accessibility-graphic"

export function LearningCenterSection() {
    return (
        <section id="chapter-7" className="bg-[#FDFCF8] py-24 border-t border-stone-200">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">

                <div className="mb-16">
                    <span className="font-mono text-sm uppercase tracking-widest text-stone-500 mb-2 block">Chapter 07</span>
                    <h2 className="font-serif text-5xl md:text-7xl font-bold text-black mb-4">The Learning Center.</h2>
                    <p className="text-xl text-stone-600 max-w-2xl leading-relaxed">
                        Professional training modules for developers and designers to build a more inclusive web for 2.2 billion users worldwide.
                    </p>
                </div>

                <div className="bg-white rounded-[3rem] overflow-hidden border border-stone-200 shadow-xl flex flex-col lg:flex-row">
                    {/* Billboard Graphic */}
                    <div className="lg:w-1/2 relative min-h-[400px] bg-stone-50 flex items-center justify-center p-12 overflow-hidden">
                        <AccessibilityGraphic className="w-full h-full max-w-[500px]" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent lg:hidden" />
                        <div className="absolute bottom-10 left-10 text-white lg:hidden">
                            <span className="font-mono text-xs uppercase tracking-widest bg-wong-vermilion px-2 py-1 rounded">Course Active</span>
                        </div>
                    </div>

                    {/* Course Details Card */}
                    <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center space-y-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-600 font-mono text-[10px] uppercase tracking-wider font-bold">
                                <Globe className="w-3 h-3" /> Industry Standard WCAG 2.2
                            </div>
                            <h3 className="text-3xl md:text-5xl font-serif font-bold text-black leading-tight">
                                Web Accessibility: Building for Visual Impairment
                            </h3>
                        </div>

                        <div className="grid grid-cols-2 gap-6 border-y border-stone-100 py-8">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-stone-400">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Duration</span>
                                </div>
                                <p className="font-bold text-stone-900">30 Minutes</p>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-stone-400">
                                    <BookOpen className="w-4 h-4" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Modules</span>
                                </div>
                                <p className="font-bold text-stone-900">11 Core Lessons</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-stone-500 font-medium italic">What you'll master:</p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
                                {[
                                    "Semantic Structure",
                                    "Alt-Text Context",
                                    "Color Independence",
                                    "Keyboard Navigation Logic"
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-2 text-sm font-bold text-stone-800">
                                        <CheckCircle2 className="w-4 h-4 text-green-500" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="pt-6">
                            <Button asChild className="w-full md:w-auto bg-black text-white hover:bg-stone-800 transition-all rounded-full px-10 py-8 text-lg font-bold h-auto shadow-xl group">
                                <Link href="/learning-center" className="flex items-center gap-3">
                                    Start Training <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
