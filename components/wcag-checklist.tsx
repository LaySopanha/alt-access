"use client"

import React, { useState } from "react"
import { Check, Info, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function WcagChecklist() {
    const [openItems, setOpenItems] = useState<Record<number, boolean>>({})
    const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({})

    const toggleAccordion = (index: number, e: React.MouseEvent) => {
        // Prevent toggle if clicking exactly on the checkbox area to separate concerns
        if ((e.target as HTMLElement).closest('.checkbox-area')) {
            return;
        }
        setOpenItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    const toggleCheck = (index: number, e: React.MouseEvent) => {
        e.stopPropagation(); // Don't trigger accordion when checking
        setCheckedItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    const wcagList = [
        { code: "1.1.1", label: "Text Alternatives for non-text content", desc: "Provide text alternatives for any non-text content so that it can be changed into other forms people need, such as large print, braille, speech, symbols or simpler language." },
        { code: "1.4.3", label: "Sufficient Contrast (AA Level)", desc: "The visual presentation of text and images of text has a contrast ratio of at least 4.5:1, except for large text, incidental text, and logotypes." },
        { code: "1.4.1", label: "Don't rely on Color alone", desc: "Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element." },
        { code: "1.4.4", label: "Resize text up to 200%", desc: "Except for captions and images of text, text can be resized without assistive technology up to 200 percent without loss of content or functionality." },
        { code: "1.4.10", label: "Reflow without horizontal scroll", desc: "Content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions." },
        { code: "2.1.1", label: "Full Keyboard Accessibility", desc: "All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes." },
        { code: "2.4.7", label: "Visible Focus Indicators", desc: "Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible." },
        { code: "1.3.1", label: "Clear Page Structure (Headings)", desc: "Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text." },
        { code: "4.1.2", label: "Screen Reader Compatibility", desc: "For all user interface components, the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically set." },
        { code: "2.3.1", label: "No Flashing Content", desc: "Web pages do not contain anything that flashes more than three times in any one second period, or the flash is below the general flash and red flash thresholds." }
    ]

    return (
        <section className="pt-[125px] pb-24 px-8 md:px-32 lg:px-48 bg-[#FDFCF8]">
            <div className="max-w-5xl mx-auto">
                <div className="bg-[#FFFFF0] p-10 md:p-16 border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                    {/* "Binding" Holes decoration */}
                    <div className="absolute top-0 left-0 bottom-0 w-12 border-r-2 border-black/10 bg-black/5 flex flex-col justify-evenly py-8 items-center pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="w-4 h-4 rounded-full bg-stone-300 shadow-inner" />
                        ))}
                    </div>

                    <div className="pl-12 md:pl-20">
                        <h3 className="font-serif text-3xl font-bold mb-10 flex items-center gap-4">
                            <Check className="w-8 h-8 text-black" />
                            WCAG 2.1 Universal Checklist
                        </h3>

                        <div className="space-y-2">
                            {wcagList.map((rule, i) => {
                                const isOpen = !!openItems[i];
                                const isChecked = !!checkedItems[i];

                                return (
                                    <div
                                        key={i}
                                        className={cn(
                                            "border-b border-black/10 transition-all duration-300 overflow-hidden",
                                            isOpen ? "bg-black/5 rounded-lg border-transparent pb-4" : "hover:bg-black-[0.02]"
                                        )}
                                    >
                                        <button
                                            onClick={(e) => toggleAccordion(i, e)}
                                            className="w-full flex items-center justify-between text-left py-4 px-2 group/item focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded"
                                            aria-expanded={isOpen}
                                        >
                                            <div className="flex items-center gap-4 flex-1">
                                                <ChevronRight
                                                    className={cn(
                                                        "w-4 h-4 text-stone-400 transition-transform duration-300",
                                                        isOpen && "rotate-90 text-black"
                                                    )}
                                                />
                                                <span className="font-mono text-stone-400 text-sm whitespace-nowrap min-w-[5ch]">
                                                    {rule.code}
                                                </span>
                                                <span className={cn(
                                                    "font-medium text-[17px] transition-all",
                                                    isChecked ? "text-stone-400 line-through" : "text-black font-semibold"
                                                )}>
                                                    {rule.label}
                                                </span>
                                            </div>

                                            {/* Native SVG Checkbox */}
                                            <div
                                                className="checkbox-area p-2 cursor-pointer ml-4 rounded hover:bg-black/10 transition-colors"
                                                onClick={(e) => toggleCheck(i, e)}
                                                role="checkbox"
                                                aria-checked={isChecked}
                                                tabIndex={0}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        e.preventDefault();
                                                        toggleCheck(i, e as any);
                                                    }
                                                }}
                                            >
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="2" y="2" width="20" height="20" rx="4" stroke="black" strokeWidth="2" fill={isChecked ? "black" : "transparent"} className="transition-all duration-200" />
                                                    {isChecked && (
                                                        <path d="M7 12L10.5 15.5L18 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-[dash_0.3s_ease-out_forwards]" style={{ strokeDasharray: 20, strokeDashoffset: 0 }} />
                                                    )}
                                                </svg>
                                            </div>
                                        </button>

                                        {/* Dropdown Content */}
                                        <div
                                            className={cn(
                                                "grid transition-all duration-300 ease-in-out px-12",
                                                isOpen ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
                                            )}
                                        >
                                            <div className="overflow-hidden">
                                                <p className="text-stone-600 leading-relaxed text-[15px] border-l-2 border-black/20 pl-4 py-1">
                                                    {rule.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="mt-12 pt-8 border-t-2 border-black flex items-start gap-4">
                            <Info className="w-6 h-6 text-[#E85D3A] flex-shrink-0 mt-1" />
                            <p className="font-mono text-sm text-stone-600">
                                <strong className="text-black">NOTE:</strong> Designing for accessibility is not a "special feature". It is a core requirement for quality software.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
