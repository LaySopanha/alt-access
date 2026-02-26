"use client"

import React from "react"
import Link from "next/link"
import {
    ArrowRight,
    Clock,
    BookOpen,
    CheckCircle2,
    Globe,
    Type,
    Palette,
    Keyboard,
    Lightbulb,
    GraduationCap,
} from "lucide-react"
import { AccessibilityGraphic } from "@/components/accessibility-graphic"

const modules = [
    {
        number: "01",
        title: "Introduction",
        desc: "What is web accessibility and why it matters.",
        icon: Globe,
    },
    {
        number: "02",
        title: "WCAG Standard",
        desc: "The global rulebook — A, AA, and AAA conformance.",
        icon: BookOpen,
    },
    {
        number: "03",
        title: "Alternative Text",
        desc: "Writing meaningful alt text that gives context.",
        icon: Type,
    },
    {
        number: "04",
        title: "Color & Contrast",
        desc: "The 4.5:1 ratio rule and color independence.",
        icon: Palette,
    },
    {
        number: "05",
        title: "Keyboard Navigation",
        desc: "Logical tab order and visible focus indicators.",
        icon: Keyboard,
    },
    {
        number: "06",
        title: "Conclusion",
        desc: "Inclusion by design, not by afterthought.",
        icon: Lightbulb,
    },
]

export function LearningCenterSection() {
    return (
        <section id="chapter-7" className="bg-[#FDFCF8] text-black pt-24 pb-16">

            {/* Chapter Header */}
            <div className="px-8 md:px-24 mb-16">
                <div className="max-w-7xl mx-auto border-b-2 border-stone-200 pb-10">
                    <span className="font-mono text-xs uppercase tracking-widest text-stone-400 mb-4 block">Chapter 07</span>
                    <h2 className="text-5xl md:text-7xl font-bold text-black leading-[0.9] tracking-tight uppercase mb-6">
                        The<br />Learning Center
                    </h2>
                    <p className="text-xl md:text-2xl max-w-3xl leading-relaxed text-stone-600">
                        A structured, self-paced course for developers and designers. Master the
                        principles that <span className="bg-wong-blue/20 px-1 text-stone-800">make the web work for everyone</span>.
                    </p>
                </div>
            </div>

            <div className="px-8 md:px-24">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Left Column: Course Info (Sticky) */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-32">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-0.5 w-10 bg-wong-vermilion"></div>
                                <span className="font-mono text-xs uppercase tracking-widest text-stone-500">Course Overview</span>
                            </div>

                            {/* Billboard Graphic */}
                            <div className="bg-stone-50 border border-stone-200 p-12 mb-6 flex items-center justify-center min-h-[280px] relative overflow-hidden">
                                <AccessibilityGraphic className="w-full h-full max-w-[400px]" />
                                <div className="absolute bottom-4 left-4">
                                    <span className="font-mono text-[10px] uppercase tracking-widest bg-black text-white px-3 py-1.5 font-bold">WCAG 2.2</span>
                                </div>
                            </div>

                            {/* Course Meta */}
                            <div className="bg-white border border-stone-200 p-6">
                                <h3 className="text-lg font-bold mb-1 uppercase tracking-tight">Web Accessibility</h3>
                                <p className="text-stone-500 text-sm leading-relaxed mb-6">Building for Visual Impairment</p>

                                <div className="grid grid-cols-2 gap-4 border-t border-stone-100 pt-4 mb-6">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-stone-400" />
                                        <span className="text-sm font-bold text-stone-800">30 Minutes</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="w-4 h-4 text-stone-400" />
                                        <span className="text-sm font-bold text-stone-800">6 Modules</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400 font-bold block">What you'll master</span>
                                    <div className="grid grid-cols-1 gap-1.5">
                                        {[
                                            "Semantic Structure",
                                            "Alt-Text Context",
                                            "Color Independence",
                                            "Keyboard Navigation",
                                        ].map((item) => (
                                            <div key={item} className="flex items-center gap-2 text-sm text-stone-700">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-wong-teal shrink-0" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Module List */}
                    <div className="lg:col-span-7">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="h-0.5 w-10 bg-wong-blue"></div>
                            <span className="font-mono text-xs uppercase tracking-widest text-stone-500">Curriculum</span>
                        </div>

                        <div className="flex flex-col gap-4">
                            {modules.map((mod) => (
                                <div key={mod.number} className="bg-white p-6 border border-stone-200 flex gap-6 items-start hover:border-stone-400 transition-all group">
                                    <div className="w-12 h-12 shrink-0 bg-stone-50 text-stone-700 border border-stone-200 flex items-center justify-center group-hover:border-stone-400 transition-all">
                                        <mod.icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="font-mono text-xs text-stone-300 font-bold">{mod.number}</span>
                                            <h3 className="text-lg font-bold uppercase tracking-tight group-hover:text-wong-vermilion transition-colors">{mod.title}</h3>
                                        </div>
                                        <p className="text-stone-500 text-sm leading-relaxed">{mod.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Block */}
                        <div className="mt-12 bg-stone-900 text-white p-6 md:p-8">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-lg font-bold mb-1 uppercase">Ready to Learn?</h3>
                                    <p className="text-sm text-stone-400 leading-relaxed">
                                        Complete all 6 modules in about 30 minutes. Self-paced, interactive, and built for developers.
                                    </p>
                                </div>
                                <Link
                                    href="/learning-center"
                                    className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-stone-100 transition-colors whitespace-nowrap group shrink-0"
                                >
                                    <span>Start Training</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
