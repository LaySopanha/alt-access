"use client"

import { Check, AlertTriangle, Maximize2, Type, MousePointer2 } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function WcagSection() {
    const { t } = useLanguage()

    const essentials = [
        { icon: Maximize2, ...t.wcag.essentials[0] },
        { icon: MousePointer2, ...t.wcag.essentials[1] },
        { icon: Type, ...t.wcag.essentials[2] },
        { icon: AlertTriangle, ...t.wcag.essentials[3] },
    ]

    return (
        <section id="chapter-4" className="bg-white text-black pt-24 pb-16">

            {/* Chapter Header */}
            <div className="px-8 md:px-24 mb-16">
                <div className="max-w-7xl mx-auto border-b-2 border-stone-200 pb-10">
                    <span className="font-mono text-xs uppercase tracking-widest text-stone-400 mb-4 block">{t.wcag.chapterLabel}</span>
                    <h2 className="text-5xl md:text-7xl font-bold text-black leading-[0.9] tracking-tight uppercase mb-6">
                        {t.wcag.title1}<br />{t.wcag.title2}
                    </h2>
                    <p className="text-xl md:text-2xl max-w-3xl leading-relaxed text-stone-600" dangerouslySetInnerHTML={{ __html: t.wcag.subtitle }} />
                </div>
            </div>

            <div className="px-8 md:px-24">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Left Column: The Checklist (Sticky) */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-32">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-0.5 w-10 bg-wong-blue"></div>
                                <span className="font-mono text-xs uppercase tracking-widest text-stone-500">{t.wcag.checklistLabel}</span>
                            </div>

                            <div className="bg-[#FFFFF0] p-6 md:p-8 border border-stone-200 relative overflow-hidden">
                                {/* "Binding" Holes decoration */}
                                <div className="absolute top-0 left-0 bottom-0 w-6 border-r border-stone-200 bg-stone-50 flex flex-col justify-evenly py-6 items-center">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="w-3 h-3 rounded-full bg-stone-200" />
                                    ))}
                                </div>

                                <div className="pl-5">
                                    <h3 className="text-lg font-bold mb-6">{t.wcag.visualReqs}</h3>

                                    <div className="space-y-3">
                                        {t.wcag.wcagList.map((rule: { code: string; label: string }, i: number) => (
                                            <div key={i} className="flex items-center justify-between border-b border-stone-100 pb-2 group">
                                                <span className="font-mono text-xs text-wong-blue mr-3">{rule.code}</span>
                                                <span className="text-sm flex-1 text-stone-700 group-hover:text-wong-vermilion transition-colors">{rule.label}</span>
                                                <div className="w-4 h-4 border border-stone-300 rounded-sm bg-white group-hover:bg-wong-vermilion/10 transition-colors"></div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-stone-200">
                                        <p className="font-mono text-xs text-stone-400 uppercase tracking-widest">
                                            {t.wcag.checklistFooter}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right Column: Key Essentials */}
                    <div className="lg:col-span-7">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="h-0.5 w-10 bg-wong-vermilion"></div>
                            <span className="font-mono text-xs uppercase tracking-widest text-stone-500">{t.wcag.corePrinciples}</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {essentials.map((item, i) => (
                                <div key={i} className="bg-stone-50 p-6 border border-stone-200 hover:border-stone-400 transition-all group">
                                    <div className="w-12 h-12 bg-white border border-stone-200 flex items-center justify-center mb-5 rounded group-hover:border-stone-400 transition-all">
                                        <item.icon className="w-6 h-6 text-stone-700" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-3 tracking-tight uppercase group-hover:text-wong-vermilion transition-colors">{item.title}</h3>
                                    <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 bg-stone-900 text-white p-6 md:p-8">
                            <div className="flex items-start gap-5">
                                <AlertTriangle className="w-8 h-8 text-wong-yellow shrink-0" />
                                <div>
                                    <h3 className="text-lg font-bold mb-2 uppercase">{t.wcag.retrofitTitle}</h3>
                                    <p className="text-sm text-stone-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.wcag.retrofitDesc }} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}
