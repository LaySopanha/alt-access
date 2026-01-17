"use client"

import { Check, Info, AlertTriangle, Maximize2, Type, MousePointer2 } from "lucide-react"

export function WcagSection() {
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

    const wcagList = [
        { code: "1.1.1", label: "Text Alternatives for non-text content" },
        { code: "1.4.3", label: "Sufficient Contrast (AA Level)" },
        { code: "1.4.1", label: "Don't rely on Color alone" },
        { code: "1.4.4", label: "Resize text up to 200%" },
        { code: "1.4.10", label: "Reflow without horizontal scroll" },
        { code: "2.1.1", label: "Full Keyboard Accessibility" },
        { code: "2.4.7", label: "Visible Focus Indicators" },
        { code: "1.3.1", label: "Clear Page Structure (Headings)" },
        { code: "4.1.2", label: "Screen Reader Compatibility" },
        { code: "2.3.1", label: "No Flashing Content" }
    ]

    return (
        <section id="chapter-4" className="py-40 px-8 md:px-32 lg:px-48 bg-white">
            <div className="max-w-5xl mx-auto">

                {/* Chapter Header */}
                <div className="mb-20 border-b-2 border-black pb-8">
                    <span className="font-mono text-sm uppercase tracking-widest text-stone-500 mb-2 block">Chapter 04</span>
                    <h2 className="font-serif text-5xl md:text-7xl font-bold text-black">The Standard.</h2>
                    <p className="font-sans text-xl text-stone-600 mt-6 max-w-2xl leading-relaxed">
                        WCAG compliance ensures that users can <span className="font-bold text-black">perceive, navigate, and understand</span> content without relying on sight.
                    </p>
                </div>

                {/* Essentials Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-24">
                    {essentials.map((item, i) => (
                        <div key={i} className="flex gap-6 p-8 bg-stone-50 border border-stone-200 rounded-xl hover:border-black transition-colors group">
                            <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
                                <item.icon className="w-6 h-6 text-black" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                                <p className="text-stone-600 leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* The Checklist (Paper Style) */}
                <div className="bg-[#FFFFF0] p-10 md:p-16 border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                    {/* "Binding" Holes decoration */}
                    <div className="absolute top-0 left-0 bottom-0 w-12 border-r-2 border-black/10 bg-black/5 flex flex-col justify-evenly py-8 items-center">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="w-4 h-4 rounded-full bg-stone-300 shadow-inner" />
                        ))}
                    </div>

                    <div className="pl-8 md:pl-16">
                        <h3 className="font-serif text-3xl font-bold mb-10 flex items-center gap-4">
                            <Check className="w-8 h-8 text-wong-blue" />
                            WCAG 2.1 Checklist (Visual)
                        </h3>

                        <div className="space-y-6">
                            {wcagList.map((rule, i) => (
                                <div key={i} className="flex items-center justify-between border-b border-black/10 pb-4">
                                    <span className="font-mono text-stone-400 text-sm mr-4">{rule.code}</span>
                                    <span className="font-medium text-lg flex-1">{rule.label}</span>
                                    <div className="w-6 h-6 border-2 border-black rounded flex items-center justify-center">
                                        {/* Empty checkbox for effect */}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 pt-8 border-t-2 border-black flex items-start gap-4">
                            <Info className="w-6 h-6 text-wong-vermilion flex-shrink-0 mt-1" />
                            <p className="font-mono text-sm text-stone-600">
                                <strong>NOTE:</strong> Designing for accessibility is not a "special feature". It is a core requirement for quality software.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
