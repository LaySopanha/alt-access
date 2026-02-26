"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import {
    ArrowLeft,
    ChevronRight,
    Info,
    CheckCircle2,
    AlertTriangle,
    Smartphone,
    Trophy,
    X
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { cn } from "@/lib/utils"

interface Flaw {
    id: string;
    name: string;
    explanation: string;
    wcag: string;
    top: string;
    left: string;
    width: string;
    height: string;
}

const FLAWS: Flaw[] = [
    {
        id: "contrast",
        name: "Low Text Contrast",
        explanation: "The text color is too light against the background, making it unreadable for users with low vision.",
        wcag: "WCAG 1.4.3 (Contrast Minimum)",
        top: "160px",
        left: "40px",
        width: "200px",
        height: "40px"
    },
    {
        id: "touch",
        name: "Tiny Touch Target",
        explanation: "This button is too small (less than 44x44px), making it difficult for users with motor impairments to activate.",
        wcag: "WCAG 2.5.5 (Target Size)",
        top: "320px",
        left: "240px",
        width: "24px",
        height: "24px"
    },
    {
        id: "ambiguous",
        name: "Ambiguous Link",
        explanation: "'Click Here' provides no context about the link's destination for screen reader users.",
        wcag: "WCAG 2.4.4 (Link Purpose)",
        top: "400px",
        left: "40px",
        width: "120px",
        height: "30px"
    },
    {
        id: "color",
        name: "Color-only Meaning",
        explanation: "Information is conveyed only via color (the red dot). Colorblind users won't know this field is required.",
        wcag: "WCAG 1.4.1 (Use of Color)",
        top: "220px",
        left: "20px",
        width: "20px",
        height: "20px"
    },
    {
        id: "font",
        name: "Small Font Size",
        explanation: "The font size here is 10px, which is below the recommended 12-16px for readability.",
        wcag: "General Accessibility Best Practice",
        top: "480px",
        left: "40px",
        width: "250px",
        height: "20px"
    },
    {
        id: "non-text",
        name: "Missing Text Alternative",
        explanation: "This icon has no label or alt text, so screen readers will skip it or read a cryptic filename.",
        wcag: "WCAG 1.1.1 (Non-text Content)",
        top: "100px",
        left: "280px",
        width: "40px",
        height: "40px"
    },
    {
        id: "focus",
        name: "No Focus Indicator",
        explanation: "This interactive element has no visible change when focused, leaving keyboard users lost.",
        wcag: "WCAG 2.4.7 (Focus Visible)",
        top: "550px",
        left: "40px",
        width: "280px",
        height: "50px"
    }
];

export default function WCAGAuditExperience() {
    const router = useRouter()
    const [started, setStarted] = useState(false)
    const [foundFlaws, setFoundFlaws] = useState<string[]>([])
    const [selectedFlaw, setSelectedFlaw] = useState<Flaw | null>(null)
    const [gameFinished, setGameFinished] = useState(false)
    const [scale, setScale] = useState(1)

    // Handle scaling for mobile responsiveness
    useEffect(() => {
        const handleResize = () => {
            const vh = window.innerHeight
            const vw = window.innerWidth
            const phoneHeight = 820 // mockup + padding
            const phoneWidth = 380

            const scaleH = (vh - 100) / phoneHeight
            const scaleW = (vw - 40) / phoneWidth
            setScale(Math.min(scaleH, scaleW, 1))
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleFlawClick = (flaw: Flaw) => {
        setSelectedFlaw(flaw)
        if (!foundFlaws.includes(flaw.id)) {
            setFoundFlaws(prev => [...prev, flaw.id])
        }
    }

    useEffect(() => {
        if (foundFlaws.length === FLAWS.length) {
            setTimeout(() => setGameFinished(true), 1500)
        }
    }, [foundFlaws])

    return (
        <div className="min-h-screen relative font-sans select-none overflow-hidden bg-stone-50">
            <Navbar theme="light" showLogo={false} gameMode={true} />

            {/* BACK BUTTON */}
            <button
                onClick={() => {
                    if (window.history.length > 2) {
                        router.back()
                    } else {
                        router.push('/#chapter-5')
                    }
                }}
                className="absolute top-6 left-6 z-50 inline-flex items-center gap-2 group px-5 py-2.5 bg-white text-black hover:bg-stone-200 rounded-full font-mono text-lg uppercase tracking-widest font-bold transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.4)] cursor-pointer"
                title="Go Back"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>BACK</span>
            </button>

            {/* START OVERLAY */}
            {!started && (
                <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
                    <div className="max-w-2xl w-full bg-white rounded-[40px] p-10 md:p-16 text-center shadow-2xl animate-in fade-in zoom-in duration-500 mx-4">
                        <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
                            <Smartphone className="w-10 h-10 text-blue-600" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-stone-900 mb-6 tracking-tight">WCAG Audit</h1>
                        <p className="text-lg md:text-xl text-stone-600 mb-10 leading-relaxed max-w-lg mx-auto">
                            Design is more than how it looks. It's how it works for everyone.
                            <br /><br />
                            <span className="font-bold text-blue-600">Your Objective:</span> Spot the 7 accessibility violations hidden in this mobile app.
                        </p>
                        <button
                            onClick={() => setStarted(true)}
                            className="px-10 py-4 md:px-12 md:py-5 bg-black text-white rounded-full text-lg md:text-xl font-bold hover:bg-stone-800 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto shadow-xl"
                        >
                            Start Audit
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            )}

            {/* SUCCESS OVERLAY */}
            {gameFinished && (
                <div className="absolute inset-0 z-[60] flex items-center justify-center p-6 bg-blue-600/95 backdrop-blur-xl">
                    <div className="max-w-2xl w-full text-center text-white animate-in fade-in zoom-in duration-700">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-10">
                            <Trophy className="w-10 h-10 md:w-12 md:h-12 text-white" />
                        </div>
                        <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tighter">Certified Auditor!</h2>
                        <p className="text-lg md:text-2xl mb-12 opacity-90 leading-relaxed font-medium px-4">
                            You found all 7 WCAG violations. You're now ready to build interfaces that don't exclude anyone.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center px-4">
                            <button
                                onClick={() => router.push('/#chapter-5')}
                                className="px-10 py-4 md:py-5 bg-white text-blue-600 rounded-full text-lg md:text-xl font-bold hover:bg-stone-100 transition-all shadow-2xl"
                            >
                                Return to Curriculum
                            </button>
                            <button
                                onClick={() => {
                                    setFoundFlaws([])
                                    setGameFinished(false)
                                    setSelectedFlaw(null)
                                }}
                                className="px-10 py-4 md:py-5 bg-blue-500 text-white border-2 border-white/30 rounded-full text-lg md:text-xl font-bold hover:bg-blue-400 transition-all"
                            >
                                Retry Audit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MAIN EXPERIENCE AREA */}
            <main className="h-screen w-full flex items-center justify-center bg-stone-100 relative">

                {/* PROGRESS HUD */}
                {started && (
                    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 md:top-10 md:bottom-auto md:right-10 md:left-auto md:translate-x-0 z-40 bg-white/90 backdrop-blur-md px-6 py-4 rounded-3xl border border-stone-200 shadow-xl flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-black tracking-widest text-stone-400">Audit Progress</span>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl md:text-3xl font-black text-stone-900">{foundFlaws.length}</span>
                                <span className="text-lg md:text-xl font-bold text-stone-300">/ {FLAWS.length}</span>
                            </div>
                        </div>
                        <div className="h-10 w-[2px] bg-stone-200" />
                        <div className="flex gap-1.5">
                            {FLAWS.map((flaw) => (
                                <div
                                    key={flaw.id}
                                    className={cn(
                                        "w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-500",
                                        foundFlaws.includes(flaw.id) ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-stone-200"
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* IPHONE 17 PRO MAX MOCKUP */}
                <div
                    className="relative transition-transform duration-500 ease-out"
                    style={{ transform: `scale(${scale})` }}
                >
                    {/* Phone Shell */}
                    <div className="w-[360px] h-[780px] bg-[#111] rounded-[60px] p-[10px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[3px] border-[#333] relative">
                        {/* Dynamic Island */}
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-8 bg-black rounded-full z-30" />

                        {/* Screen Content */}
                        <div className="w-full h-full bg-white rounded-[50px] overflow-hidden relative">
                            {/* App Header */}
                            <div className="h-20 bg-blue-600 flex items-center px-8 pt-6">
                                <div className="w-8 h-8 rounded-lg bg-white/20" />
                                <div className="ml-4 h-4 w-32 bg-white/40 rounded-full" />
                                <div className="ml-auto w-8 h-8 rounded-full bg-white/20" />
                            </div>

                            {/* App Body (with flaws) */}
                            <div className="p-8 space-y-8">
                                {/* 1. Contrast Flaw */}
                                <div className="transition-opacity duration-300">
                                    <div className="h-6 w-40 bg-stone-200 rounded-full mb-4" />
                                    <p className="text-[14px] text-stone-200 font-medium leading-relaxed">
                                        This is a critical disclaimer about your privacy and terms of service that everyone should read.
                                    </p>
                                </div>

                                {/* 2. Color Meaning Flaw */}
                                <div className="flex items-center gap-3 bg-stone-50 p-4 rounded-2xl">
                                    <div className="w-4 h-4 rounded-full bg-red-500 transition-transform active:scale-90" />
                                    <div className="h-4 w-48 bg-stone-200 rounded-full" />
                                </div>

                                {/* 3. Missing Alt Text Placeholder */}
                                <div className="flex justify-between items-center bg-stone-50/50 p-3 rounded-2xl">
                                    <div className="space-y-2">
                                        <div className="h-5 w-32 bg-stone-200 rounded-full" />
                                        <div className="h-3 w-48 bg-stone-100 rounded-full" />
                                    </div>
                                    <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center">
                                        <AlertTriangle className="w-6 h-6 text-stone-300" />
                                    </div>
                                </div>

                                {/* 4. Touch Target & Ambiguous Link */}
                                <div className="pt-4 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-stone-300 font-bold underline decoration-stone-200 underline-offset-4 decoration-2">Click Here</span>
                                        <button className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center active:bg-blue-700">
                                            <CheckCircle2 className="w-3 h-3 text-white" />
                                        </button>
                                    </div>
                                </div>

                                {/* 5. Small Font */}
                                <div className="bg-stone-50/30 p-2 rounded-lg">
                                    <p className="text-[9px] text-stone-300 font-bold uppercase tracking-wide">
                                        Transaction ID: 04X-9922-LPN | Date: Feb 2026 | Server: AP-SOUTH
                                    </p>
                                </div>

                                {/* 6. No Focus Indicator Item */}
                                <div className="p-5 border-2 border-stone-100 rounded-3xl bg-white active:bg-stone-50 transition-colors">
                                    <div className="h-4 w-24 bg-stone-200 rounded-full mb-3" />
                                    <div className="h-3 w-full bg-stone-100 rounded-full" />
                                </div>
                            </div>

                            {/* Hotspots Container */}
                            <div className="absolute inset-0 z-20 pointer-events-auto">
                                {FLAWS.map((flaw) => (
                                    <button
                                        key={flaw.id}
                                        onClick={() => handleFlawClick(flaw)}
                                        style={{
                                            top: flaw.top,
                                            left: flaw.left,
                                            width: flaw.width,
                                            height: flaw.height
                                        }}
                                        className={cn(
                                            "absolute group/hotspot transition-all duration-300",
                                            "hover:bg-blue-500/10 rounded-lg border-2 border-transparent",
                                            foundFlaws.includes(flaw.id) && "border-green-500 bg-green-500/5 cursor-default"
                                        )}
                                    >
                                        {!foundFlaws.includes(flaw.id) && (
                                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover/hotspot:opacity-100 animate-pulse" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Explanation Pop-up (Responsive positioning) */}
                    {selectedFlaw && (
                        <div
                            className={cn(
                                "fixed inset-x-4 bottom-32 md:absolute md:inset-auto z-[70] bg-white p-6 rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-stone-100 animate-in fade-in slide-in-from-bottom-6 duration-500",
                                "md:w-80 md:left-[calc(100%+40px)]"
                            )}
                            style={scale > 0.8 ? {
                                top: parseInt(selectedFlaw.top) > 400 ? 'auto' : selectedFlaw.top,
                                bottom: parseInt(selectedFlaw.top) > 400 ? `calc(100% - ${selectedFlaw.top} - 100px)` : 'auto',
                            } : {}}
                        >
                            <button
                                onClick={() => setSelectedFlaw(null)}
                                className="absolute top-5 right-5 text-stone-400 hover:text-stone-900 bg-stone-50 p-1.5 rounded-full"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-3 mb-4 pr-6">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                </div>
                                <h4 className="font-bold text-lg text-stone-900 leading-tight">{selectedFlaw.name}</h4>
                            </div>
                            <p className="text-stone-600 text-sm leading-relaxed mb-5">
                                {selectedFlaw.explanation}
                            </p>
                            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                                <span className="text-[10px] uppercase font-black text-stone-400 block mb-1.5 tracking-wider">WCAG Standard</span>
                                <span className="text-sm font-bold text-stone-900">{selectedFlaw.wcag}</span>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
