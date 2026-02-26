"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { X, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export type SimulationConfig = {
    simLabel: string       // e.g. "Simulation 02 / Field Loss"
    title: string          // e.g. "Low Vision."
    subtitle: string       // e.g. "Experience severe Myopia…"
    steps: string[]        // ordered instruction list
    factIcon: React.ReactNode
    factText: React.ReactNode
    factBg: string         // Tailwind bg class for the fact card
    factBorder: string     // Tailwind border class
    ctaLabel: string       // e.g. "Start Search"
    href: string           // destination page
}

interface SimulationModalProps {
    config: SimulationConfig
    onClose: () => void
}

export function SimulationModal({ config, onClose }: SimulationModalProps) {
    const router = useRouter()
    const dialogRef = useRef<HTMLDivElement>(null)
    const closeBtnRef = useRef<HTMLButtonElement>(null)

    // --- Accessibility: close on Escape, trap focus inside panel ---
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        window.addEventListener("keydown", handleKey)
        closeBtnRef.current?.focus()

        // Prevent body scroll while modal is open
        document.body.style.overflow = "hidden"
        return () => {
            window.removeEventListener("keydown", handleKey)
            document.body.style.overflow = ""
        }
    }, [onClose])

    const handleStart = () => {
        onClose()
        router.push(config.href)
    }

    return (
        /* Backdrop */
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="sim-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => {
                // Close when clicking outside the card
                if (e.target === e.currentTarget) onClose()
            }}
        >
            {/* Blurred colourful backdrop (matches mockup) */}
            <div
                className="absolute inset-0 bg-stone-100 overflow-hidden"
                aria-hidden="true"
            >
                {/* Soft colour blobs */}
                <div className="absolute top-[5%]  left-[15%] w-72 h-72 rounded-full bg-red-300/50    blur-3xl" />
                <div className="absolute top-[10%] right-[10%] w-64 h-64 rounded-full bg-yellow-200/60 blur-3xl" />
                <div className="absolute bottom-[15%] left-[5%]  w-80 h-80 rounded-full bg-green-200/50 blur-3xl" />
                <div className="absolute bottom-[5%]  right-[20%] w-72 h-72 rounded-full bg-blue-200/50  blur-3xl" />
                <div className="absolute top-[40%] left-[40%] w-56 h-56 rounded-full bg-pink-200/40   blur-3xl" />
                <div className="absolute bottom-[30%] right-[5%] w-64 h-64 rounded-full bg-teal-200/50  blur-3xl" />
            </div>

            {/* Card */}
            <div
                ref={dialogRef}
                className={cn(
                    "relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto",
                    "p-8 md:p-10",
                    "animate-in fade-in zoom-in-95 duration-200"
                )}
                // Prevent backdrop-click from firing when clicking inside
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    ref={closeBtnRef}
                    onClick={onClose}
                    aria-label="Close simulation intro"
                    className={cn(
                        "absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-black hover:bg-stone-100",
                        "transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ring)]"
                    )}
                >
                    <X className="w-5 h-5" aria-hidden="true" />
                </button>

                {/* Sim label */}
                <p className="font-mono text-xs uppercase tracking-widest text-stone-400 mb-2">
                    {config.simLabel}
                </p>

                {/* Title */}
                <h2
                    id="sim-modal-title"
                    className="font-serif text-4xl md:text-5xl font-bold text-black mb-2 leading-tight"
                >
                    {config.title}
                </h2>

                {/* Subtitle */}
                <p className="text-stone-600 text-base mb-6 leading-relaxed">
                    {config.subtitle}
                </p>

                {/* Steps */}
                <ol className="space-y-3 mb-6" aria-label="Instructions">
                    {config.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                            <span
                                className="flex-shrink-0 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs"
                                aria-hidden="true"
                            >
                                {i + 1}
                            </span>
                            <span dangerouslySetInnerHTML={{ __html: step }} />
                        </li>
                    ))}
                </ol>

                <hr className="border-stone-200 mb-6" />

                {/* Fun fact */}
                <div
                    className={cn(
                        "rounded-lg p-4 mb-8 text-sm leading-relaxed",
                        config.factBg,
                        `border-l-4 ${config.factBorder}`
                    )}
                >
                    <p className="font-mono text-[10px] uppercase tracking-widest font-bold flex items-center gap-1 mb-1">
                        {config.factIcon}
                        Did you know?
                    </p>
                    <p className="italic text-stone-700">{config.factText}</p>
                </div>

                {/* CTA */}
                <button
                    onClick={handleStart}
                    className={cn(
                        "w-full bg-black text-white font-bold uppercase tracking-widest",
                        "py-4 px-6 rounded-lg flex items-center justify-between group",
                        "hover:bg-stone-800 transition-colors",
                        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ring)]"
                    )}
                >
                    <span>{config.ctaLabel}</span>
                    <ArrowRight
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                        aria-hidden="true"
                    />
                </button>
            </div>
        </div>
    )
}
