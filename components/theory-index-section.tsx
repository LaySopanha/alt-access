"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { VisualImpairmentSection } from "./visual-impairment-section"
import { InclusiveDesignSection } from "./inclusive-design-section"
import { MotivationSection } from "./motivation-section"
import { WcagSection } from "./wcag-section"

export function TheoryIndexSection() {
    const [activeTab, setActiveTab] = useState<number>(1)

    const tabs = [
        { id: 1, label: "01. The Spectrum", title: "Visual Impairment" },
        { id: 2, label: "02. Inclusive Design", title: "Methodology" },
        { id: 3, label: "03. The Motivation", title: "Why Care?" },
        { id: 4, label: "04. The Standard", title: "WCAG" }
    ]

    return (
        <section id="theory-index" className="bg-[#FDFCF8] text-black border-y-8 border-black">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[800px]">

                {/* Left Col: The Navigation Index */}
                <div className="lg:col-span-4 bg-[#FDFCF8] border-b-4 lg:border-b-0 lg:border-r-8 border-black p-8 md:p-16 flex flex-col justify-between">
                    <div>
                        <span className="font-mono text-sm uppercase tracking-widest text-stone-500 mb-8 block">
                            The Theory Index
                        </span>
                        <h2 className="text-5xl md:text-6xl font-black mb-12 tracking-tight leading-[0.9] uppercase">
                            Foundation
                        </h2>

                        <nav className="flex flex-col space-y-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "text-left p-6 font-bold text-2xl md:text-3xl border-2 transition-all duration-300",
                                        activeTab === tab.id
                                            ? "bg-black text-white border-black translate-x-4 shadow-[-8px_8px_0px_0px_rgba(255,117,31,1)]"
                                            : "bg-white text-stone-400 border-transparent hover:border-black hover:text-black hover:translate-x-2"
                                    )}
                                >
                                    <span className="block font-mono text-sm tracking-widest uppercase mb-2 opacity-80">
                                        {tab.label}
                                    </span>
                                    {tab.title}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="mt-16 font-mono text-xs uppercase tracking-widest text-stone-400 border-t-2 border-stone-200 pt-4">
                        Select a chapter to read
                    </div>
                </div>

                {/* Right Col: The Content Area */}
                <div className="lg:col-span-8 bg-white relative overflow-y-auto max-h-[1000px] custom-scrollbar">
                    {/* We wrap the existing sections but remove their massive vertical padding */}
                    <div className="transform transition-opacity duration-500">
                        {activeTab === 1 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 [&>section]:py-16 [&>section]:px-8 [&>section]:md:px-16">
                                <VisualImpairmentSection />
                            </div>
                        )}
                        {activeTab === 2 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 [&>section]:py-16 [&>section]:px-8 [&>section]:md:px-16">
                                <InclusiveDesignSection />
                            </div>
                        )}
                        {activeTab === 3 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 [&>section]:py-16 [&>section]:px-8 [&>section]:md:px-16">
                                <MotivationSection />
                            </div>
                        )}
                        {activeTab === 4 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 [&>section]:py-16 [&>section]:px-8 [&>section]:md:px-16">
                                <WcagSection />
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </section>
    )
}
