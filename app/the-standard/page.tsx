"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeft, Maximize2, Type, MousePointer2, AlertTriangle } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function TheStandardPage() {
    const essentials = [
        {
            title: "Responsive",
            desc: "Website must work on all devices (Mobile, Tablet, Desktop).",
            icon: Maximize2
        },
        {
            title: "Keyboard Only",
            desc: "All interactive elements must be accessible without a mouse.",
            icon: MousePointer2
        },
        {
            title: "Text Alternatives",
            desc: "Images must have alt text. Videos must have captions.",
            icon: Type
        },
        {
            title: "Contrast",
            desc: "Text must have sufficient color contrast against backgrounds.",
            icon: AlertTriangle
        }
    ]

    return (
        <main className="relative isolate min-h-screen flex flex-col pt-32 bg-[#FDFCF8]">
            <Navbar theme="light" showLogo={true} forceSolidBg={true} />

            <div className="max-w-[1400px] mx-auto w-full px-6 md:px-10 lg:px-24 mb-16 relative z-20">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 hover:bg-black/5 hover:border-black/20 transition-all text-sm font-semibold tracking-wide text-black bg-white shadow-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>
            </div>

            <div className="relative z-10 flex-1 px-8 md:px-32 lg:px-48 max-w-7xl mx-auto">
                {/* Chapter Header */}
                <div className="mb-20 border-b-2 border-black pb-8">
                    <span className="font-mono text-sm uppercase tracking-widest text-stone-500 mb-2 block">Chapter 04</span>
                    <h2 className="font-serif text-5xl md:text-7xl font-bold text-black">The Standard.</h2>
                    <p className="font-sans text-xl text-stone-600 mt-6 max-w-2xl leading-relaxed">
                        WCAG compliance ensures that users can <span className="font-bold text-black">perceive, navigate, and understand</span> content without relying on sight.
                    </p>
                </div>

                {/* Essentials Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-32">
                    {essentials.map((item, i) => (
                        <div key={i} className="flex gap-6 p-8 bg-white border border-stone-200 rounded-xl hover:border-black transition-colors group shadow-sm">
                            <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
                                <item.icon className="w-6 h-6 text-black" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl mb-2 text-black">{item.title}</h3>
                                <p className="text-stone-600 leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    )
}
