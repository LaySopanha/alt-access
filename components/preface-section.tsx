"use client"

import Link from "next/link"
import { Eye, EyeOff, Palette, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"



const appleSimulations = [
    {
        label: "Color Blindness",
        title: "See the world through different eyes.",
        href: "/experience/color-blindness",
        bg: "bg-[#FAFAFA]", // White background
        textClass: "text-black",
        visual: (
            <div className="absolute inset-x-0 bottom-0 h-[90%] flex items-end justify-center overflow-hidden pointer-events-none">
                <svg viewBox="0 0 400 300" className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110">
                    <g className="transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-12 group-hover:scale-125 origin-center translate-y-24 group-hover:-translate-y-4">
                        <circle cx="160" cy="120" r="100" fill="#4B9CFA" opacity="0.9" style={{ mixBlendMode: 'multiply' }} className="group-hover:animate-pulse" />
                        <circle cx="260" cy="120" r="100" fill="#FFC107" opacity="0.9" style={{ mixBlendMode: 'multiply' }} className="group-hover:animate-pulse delay-75" />
                        <circle cx="210" cy="210" r="100" fill="#E85D3A" opacity="0.9" style={{ mixBlendMode: 'multiply' }} className="group-hover:animate-pulse delay-150" />
                        {/* Dynamic floating particles */}
                        <circle cx="120" cy="50" r="8" fill="#4B9CFA" className="opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300 group-hover:-translate-y-8" />
                        <circle cx="300" cy="80" r="12" fill="#FFC107" className="opacity-0 group-hover:opacity-100 transition-all duration-700 delay-500 group-hover:-translate-y-12" />
                        <circle cx="180" cy="280" r="10" fill="#E85D3A" className="opacity-0 group-hover:opacity-100 transition-all duration-700 delay-400 group-hover:-translate-y-6" />
                    </g>
                </svg>
            </div>
        ),
    },
    {
        label: "Low Vision",
        title: "Navigate with a limited field of view.",
        href: "/experience/low-vision",
        bg: "bg-[#111111]", // Black background
        textClass: "text-white",
        visual: (
            <div className="absolute inset-x-0 bottom-0 h-[90%] flex items-end justify-center overflow-hidden pointer-events-none">
                <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
                    <defs>
                        <filter id="heavyBlur">
                            <feGaussianBlur stdDeviation="15" />
                        </filter>
                        <radialGradient id="spotlight2" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="30%" stopColor="transparent" />
                            <stop offset="100%" stopColor="#111111" />
                        </radialGradient>
                        <clipPath id="screenClip2">
                            <rect x="50" y="80" width="300" height="200" rx="12" />
                        </clipPath>
                    </defs>

                    <g className="scale-[1.25] origin-bottom translate-y-8">
                        <g clipPath="url(#screenClip2)">
                            {/* Abstract background content */}
                            <rect x="50" y="80" width="300" height="200" fill="#222" />
                            <rect x="70" y="100" width="100" height="20" rx="4" fill="#333" />
                            <rect x="70" y="130" width="200" height="10" rx="2" fill="#333" />
                            <rect x="70" y="150" width="180" height="10" rx="2" fill="#333" />
                            <rect x="70" y="170" width="220" height="10" rx="2" fill="#333" />

                            {/* Blurred overlay that moves on hover */}
                            <g filter="url(#heavyBlur)" className="transition-transform duration-1000 ease-out group-hover:translate-x-12 group-hover:translate-y-8">
                                <circle cx="200" cy="150" r="80" fill="#4A9EFF" opacity="0.3" />
                                <circle cx="150" cy="200" r="100" fill="#E85D3A" opacity="0.2" />
                            </g>

                            {/* Spotlight effect that narrows on hover */}
                            <rect x="50" y="80" width="300" height="200" fill="url(#spotlight2)" className="transition-all duration-1000 ease-out origin-center scale-[2] group-hover:scale-100" />
                        </g>
                    </g>
                </svg>
            </div>
        ),
    },
    {
        label: "Total Blindness",
        title: "Experience the internet through sound.",
        href: "/experience/total-blindness",
        bg: "bg-[#000000]", // True Black
        textClass: "text-white",
        visual: (
            <div className="absolute inset-x-0 bottom-0 h-[90%] flex items-end justify-center overflow-hidden pointer-events-none">
                <svg viewBox="0 0 400 300" className="w-full h-full object-cover origin-bottom">
                    <g className="translate-y-[280px] opacity-60 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-[20px]">
                        {/* Dynamic and numerous audio bars - taller and more animated */}
                        <path d="M 60,0 L 60,-60" stroke="#333336" strokeWidth="16" strokeLinecap="round" className="transition-all duration-500 group-hover:-translate-y-60 group-hover:stroke-[#4A9EFF] group-hover:opacity-80" />
                        <path d="M 100,0 L 100,-120" stroke="#333336" strokeWidth="16" strokeLinecap="round" className="transition-all duration-700 delay-75 group-hover:-translate-y-120 group-hover:stroke-[#E85D3A] group-hover:opacity-90" />
                        <path d="M 140,0 L 140,-80" stroke="#333336" strokeWidth="16" strokeLinecap="round" className="transition-all duration-400 delay-150 group-hover:-translate-y-50 group-hover:stroke-white focus" />
                        <path d="M 180,0 L 180,-180" stroke="#333336" strokeWidth="16" strokeLinecap="round" className="transition-all duration-700 delay-75 group-hover:-translate-y-160 group-hover:stroke-[#FFC107] animate-pulse" />
                        <path d="M 220,0 L 220,-100" stroke="#333336" strokeWidth="16" strokeLinecap="round" className="transition-all duration-500 group-hover:-translate-y-70 group-hover:stroke-white" />
                        <path d="M 260,0 L 260,-140" stroke="#333336" strokeWidth="16" strokeLinecap="round" className="transition-all duration-600 delay-300 group-hover:-translate-y-100 group-hover:stroke-[#4A9EFF] group-hover:opacity-80" />
                        <path d="M 300,0 L 300,-70" stroke="#333336" strokeWidth="16" strokeLinecap="round" className="transition-all duration-400 delay-150 group-hover:-translate-y-50 group-hover:stroke-[#E85D3A] group-hover:opacity-70" />
                        <path d="M 340,0 L 340,-110" stroke="#333336" strokeWidth="16" strokeLinecap="round" className="transition-all duration-500 delay-75 group-hover:-translate-y-80 group-hover:stroke-white" />

                        {/* Echolocation rings */}
                        <circle cx="200" cy="50" r="140" fill="none" stroke="white" strokeWidth="2" strokeOpacity="0" className="group-hover:animate-ping delay-300 origin-center scale-0 group-hover:scale-100 transition-all duration-1000" style={{ animationDuration: '4s' }} />
                        <circle cx="200" cy="50" r="80" fill="none" stroke="#FFC107" strokeWidth="2" strokeOpacity="0" className="group-hover:animate-ping delay-700 origin-center scale-0 group-hover:scale-100 transition-all duration-1000" style={{ animationDuration: '4s' }} />
                    </g>
                </svg>
            </div>
        ),
    },
    {
        label: "WCAG Audit",
        title: "Spot the hidden design flaws.",
        href: "/experience/wcag-audit",
        bg: "bg-[#F0F9FF]", // Soft Blue
        textClass: "text-blue-900",
        visual: (
            <div className="absolute inset-x-0 bottom-0 h-[85%] flex items-end justify-center overflow-hidden pointer-events-none">
                <svg viewBox="0 0 400 300" className="w-full h-full object-cover origin-bottom transition-transform duration-700 group-hover:scale-110">
                    {/* Abstract Phone Mockup */}
                    <rect x="120" y="40" width="160" height="320" rx="30" fill="#111" className="transition-transform duration-500 group-hover:-translate-y-4 shadow-2xl" />
                    <rect x="130" y="50" width="140" height="300" rx="20" fill="white" className="transition-transform duration-500 group-hover:-translate-y-4" />

                    {/* Dynamic warning/success icons popping out */}
                    <g className="transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                        <circle cx="100" cy="120" r="25" fill="#EF4444" className="animate-bounce" style={{ animationDuration: '3s' }} />
                        <path d="M90,120 L110,120 M100,110 L100,130" stroke="white" strokeWidth="4" strokeLinecap="round" className="rotate-45 origin-center" />

                        <circle cx="300" cy="180" r="20" fill="#22C55E" className="animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '2.5s' }} />
                        <path d="M293,180 L298,185 L307,175" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />

                        <circle cx="110" cy="220" r="15" fill="#3B82F6" className="animate-pulse" />
                        <circle cx="280" cy="80" r="18" fill="#F59E0B" className="animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '3.5s' }} />
                    </g>

                    {/* App abstract lines */}
                    <g className="translate-x-[140px] translate-y-[80px]">
                        <rect width="60" height="8" rx="4" fill="#E2E8F0" />
                        <rect y="20" width="120" height="4" rx="2" fill="#F1F5F9" />
                        <rect y="35" width="100" height="4" rx="2" fill="#F1F5F9" />
                        <rect y="80" width="40" height="40" rx="10" fill="#3B82F6" opacity="0.2" />
                    </g>
                </svg>
            </div>
        ),
    },
]

export function PrefaceSection() {
    return (
        <section id="preface-section" className="bg-[#FDFCF8]">
            {/* Text Content (Orange Header Background) */}
            <div id="preface-text" className="bg-wong-vermilion text-black py-40 px-8 md:px-32 lg:px-48">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-serif text-6xl md:text-8xl font-bold mb-10 leading-[1.1]">
                        Accessibility is<br />Not Optional.
                    </h2>
                    <p className="text-2xl font-serif leading-relaxed mb-8">
                        "Imagine yourself browsing the internet. Your screen looks clear. But what if it didn't?"
                    </p>
                    <p className="text-lg leading-relaxed font-sans font-medium text-black/80">
                        Alt Access is a media and learning campaign supported by <strong>Prosob (Impact Hub Phnom Penh)</strong> and funded by the <strong>European Union</strong>. Built for tech students, we help you understand accessibility challenges and apply inclusive principles.
                    </p>
                </div>
            </div>

            {/* Apple-Style Simulation Cards (White Background) */}
            <div className="py-24">
                <div className="w-full max-w-[1008px] mx-auto px-6 md:px-12 lg:px-24 xl:px-0 mb-12 md:mb-16">
                    <h2 className="text-[40px] md:text-[53px] lg:text-[62px] leading-[1.1] font-bold tracking-tight text-black mb-4">
                        Experience how people with visual disability see.
                    </h2>
                    <p className="text-stone-500 text-lg md:text-xl font-medium">
                        Three simulations designed to shift your perspective.
                    </p>
                </div>



                {/* SECOND ROW (Apple-Style) - Robust Full-Bleed Scroller */}
                <div className="w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar transition-all duration-300 py-16">
                    <div className="flex gap-6 px-6 md:px-12 lg:px-24 xl:px-[calc((100vw-1008px)/2)] w-max min-w-full">
                        {appleSimulations.map((sim, index) => (
                            <Link
                                key={sim.href + "-apple"}
                                href={sim.href}
                                className="snap-start shrink-0 group relative min-h-[380px] md:min-h-[420px] flex flex-col transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 w-[70vw] md:w-[45vw] lg:w-[35vw] xl:w-[320px]"
                            >
                                {/* Card Background Plate - handles overflow for background ONLY */}
                                <div className={cn(
                                    "absolute inset-0 rounded-[32px] overflow-hidden shadow-sm transition-all duration-500 group-hover:shadow-2xl",
                                    sim.bg
                                )} />

                                {/* Card Content Container */}
                                <div className="relative z-10 flex flex-col flex-1 h-full p-8 md:p-10">
                                    {/* Top Section: Label & Title */}
                                    <div className="shrink-0 z-20">
                                        <h4 className={`${sim.textClass} text-sm md:text-base font-semibold mb-2`}>
                                            {sim.label}
                                        </h4>
                                        <h3 className={`${sim.textClass} text-2xl md:text-[32px] leading-tight font-bold tracking-tight max-w-[12ch]`}>
                                            {sim.title}
                                        </h3>
                                    </div>

                                    {/* Visual Graphic (allows popping out of bounds on hover) */}
                                    <div className="absolute inset-x-0 bottom-0 top-[30%] z-10 pointer-events-none">
                                        {sim.visual}
                                    </div>

                                    {/* Bottom Right Arrow Button */}
                                    <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-20">
                                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 ${sim.bg === 'bg-[#000000]' || sim.bg === 'bg-[#111111]' ? 'bg-white/20 backdrop-blur-md border border-white/30 text-white' : 'bg-black text-white'}`}>
                                            <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5]" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section >
    )
}
