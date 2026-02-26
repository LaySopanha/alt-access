"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const CAREGORY_COLORS = ['#D97736', '#F2E86D', '#64A073', '#71B2DF', '#3B73A8']

// Abstract SVG Backgrounds for each card
const SpectrumBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 group-hover/card:opacity-40 transition-opacity duration-700">
        <svg viewBox="0 0 400 300" className="w-full h-full">
            <defs>
                <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#F2E86D" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#F2E86D" stopOpacity="0" />
                </radialGradient>
            </defs>
            <circle cx="300" cy="50" r="100" fill="url(#grad1)" className="animate-pulse" />
            <circle cx="50" cy="250" r="120" fill="url(#grad1)" style={{ animationDelay: '1s' }} className="animate-pulse" />
            <path d="M-50,150 Q200,50 450,150" fill="none" stroke="#F2E86D" strokeWidth="2" strokeDasharray="10 10" />
        </svg>
    </div>
);

const InclusiveBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 group-hover/card:opacity-40 transition-opacity duration-700">
        <svg viewBox="0 0 400 300" className="w-full h-full">
            <path d="M100,0 L300,300 M0,100 L400,200" stroke="#64A073" strokeWidth="40" strokeOpacity="0.1" />
            <circle cx="200" cy="150" r="100" stroke="#64A073" strokeWidth="2" fill="none" className="animate-ping" style={{ animationDuration: '4s' }} />
            <rect x="50" y="50" width="300" height="200" rx="40" stroke="#64A073" strokeWidth="1" fill="none" opacity="0.3" />
        </svg>
    </div>
);

const StandardBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 group-hover/card:opacity-40 transition-opacity duration-700">
        <svg viewBox="0 0 400 300" className="w-full h-full">
            <g opacity="0.1">
                <rect x="0" y="0" width="400" height="40" fill="#71B2DF" />
                <rect x="0" y="80" width="400" height="40" fill="#71B2DF" />
                <rect x="0" y="160" width="400" height="40" fill="#71B2DF" />
                <rect x="0" y="240" width="400" height="40" fill="#71B2DF" />
            </g>
            <path d="M200,50 V250 M50,150 H350" stroke="#71B2DF" strokeWidth="1" opacity="0.4" />
            <circle cx="200" cy="150" r="5" fill="#71B2DF" />
        </svg>
    </div>
);

const DefaultBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <svg viewBox="0 0 400 300" className="w-full h-full">
            <path d="M0,0 L400,300 M400,0 L0,300" stroke="currentColor" strokeWidth="1" />
        </svg>
    </div>
);

export function ReportSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400 // Approximate card width + gap
            const currentScroll = scrollContainerRef.current.scrollLeft
            scrollContainerRef.current.scrollTo({
                left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    return (
        <section className="bg-[#FDFCF8] text-black py-32 overflow-hidden border-t border-black/5">
            <div className="max-w-[1008px] mx-auto px-6 md:px-12 lg:px-24 xl:px-0">
                {/* Header */}
                <div className="mb-20">
                    <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-3xl leading-[1.1]">
                        Explore our accessibility reports and learning.
                    </h2>
                </div>
            </div>

            {/* Slider Container - Moved outside max-w for edge-to-edge scrolling */}
            <div className="relative group px-6 md:px-12 lg:px-24 xl:px-[calc((100vw-1008px)/2)]">
                <div
                    ref={scrollContainerRef}
                    className="flex gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-32 pt-12 -mx-4 px-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {/* 4 Report Cards */}
                    {[0, 1, 2, 3].map((index) => {
                        const isSpectrumCard = index === 1; // Card 2 is now The Spectrum
                        const isCurbCutCard = index === 2;  // Card 3 is now Inclusive Design (Curb Cut)
                        const isStandardCard = index === 3; // Card 4 is now The Standard (WCAG)
                        const isFirstCard = index === 0;    // Card 1 is now blank for future content

                        const stripeColor = CAREGORY_COLORS[index] || '#000';

                        let title = isFirstCard ? "New Insights." : `Report Title ${index + 1}`;
                        let description = isFirstCard ? "Coming soon: more deep dives into digital equity." : "Detailed findings and methodology from our latest test run.";

                        if (isSpectrumCard) {
                            title = "The Spectrum.";
                            description = "Visual impairment is a wide range of human experiences affecting how people perceive your work.";
                        } else if (isCurbCutCard) {
                            title = "Inclusive Design.";
                            description = "Solving for one extends benefits to many. The curb cut effect in digital spaces.";
                        } else if (isStandardCard) {
                            title = "The Standard.";
                            description = "WCAG compliance ensures that users can perceive, navigate, and understand content.";
                        }

                        const CardInner = (
                            <div className="absolute inset-0 bg-[#FDFCF8] flex flex-col pt-12 pl-10 pr-10 overflow-hidden group/card-content">
                                {/* Abstract Background */}
                                {isSpectrumCard ? <SpectrumBackground /> :
                                    isCurbCutCard ? <InclusiveBackground /> :
                                        isStandardCard ? <StandardBackground /> :
                                            <DefaultBackground />}

                                {/* Top Left Number Icon */}
                                <div className="mb-8 relative z-10">
                                    <div className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center font-mono text-sm font-bold bg-white/50 backdrop-blur-sm transition-all duration-500 group-hover/card:scale-110 group-hover/card:border-black group-hover/card:shadow-lg">
                                        {index + 1}
                                    </div>
                                </div>

                                <div className="relative z-10 transition-transform duration-500 group-hover/card:-translate-y-2 flex-grow">
                                    <h3 className="text-black text-3xl md:text-4xl font-bold mb-6 leading-tight tracking-tight">
                                        {title}
                                    </h3>
                                    <p className="text-stone-600 font-medium max-w-[22ch] text-base md:text-lg leading-relaxed opacity-80 group-hover/card:opacity-100 transition-opacity duration-500">
                                        {description}
                                    </p>
                                </div>

                                {/* Integrated Color Block (Personality) */}
                                <div
                                    className="absolute bottom-0 left-0 right-0 h-2 transition-all duration-700 group-hover/card:h-4 group-hover/card:opacity-100 opacity-60"
                                    style={{ backgroundColor: stripeColor }}
                                />

                                {/* Arrow CTA Container */}
                                <div className="absolute bottom-10 right-10 flex justify-end z-20">
                                    <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center transition-all duration-500 group-hover/card:bg-black group-hover/card:scale-110 shadow-xl group-hover/card:shadow-black/20 translate-y-4 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100">
                                        <ChevronRight className="w-7 h-7 text-white" />
                                    </div>
                                </div>

                                {/* Overlay Gradient for Depth */}
                                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
                            </div>
                        );

                        return (
                            <div
                                key={index}
                                className="snap-start shrink-0 w-[85vw] md:w-[440px] lg:w-[460px] aspect-[4/3] rounded-[40px] relative overflow-hidden group/card cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-black/5 bg-white transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]"
                            >
                                {isSpectrumCard ? (
                                    <Link href="/the-spectrum" className="absolute inset-0 z-10 w-full h-full block">
                                        {CardInner}
                                    </Link>
                                ) : isCurbCutCard ? (
                                    <Link href="/inclusive-design" className="absolute inset-0 z-10 w-full h-full block">
                                        {CardInner}
                                    </Link>
                                ) : isStandardCard ? (
                                    <Link href="/the-standard" className="absolute inset-0 z-10 w-full h-full block">
                                        {CardInner}
                                    </Link>
                                ) : (
                                    <div className="absolute inset-0 z-10">
                                        {CardInner}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Navigation Arrows - Kept aligned with header */}
                <div className="max-w-[1008px] mx-auto px-6 md:px-12 lg:px-24 xl:px-0 flex justify-end gap-4 mt-4">
                    <button
                        onClick={() => scroll('left')}
                        className="w-12 h-12 rounded-full bg-black hover:bg-black/80 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-black"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="w-12 h-12 rounded-full bg-black hover:bg-black/80 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-black"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .hide-scrollbar::-webkit-scrollbar { display: none; }
            `}} />
        </section >
    )
}


function Users(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    )
}
