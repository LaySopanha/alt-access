"use client"

import { BookOpen, Briefcase, Heart } from "lucide-react"
import { SurveyCarousel } from "@/components/survey-carousel"
import { useLanguage } from "@/hooks/use-language"

export function MotivationSection() {
    const { t } = useLanguage()

    const pillars = [
        { icon: BookOpen, title: t.motivation.legalTitle, desc: t.motivation.legalDesc, color: "bg-wong-vermilion/10 text-wong-vermilion" },
        { icon: Briefcase, title: t.motivation.careerTitle, desc: t.motivation.careerDesc, color: "bg-wong-yellow/10 text-wong-yellow" },
        { icon: Heart, title: t.motivation.reachTitle, desc: t.motivation.reachDesc, color: "bg-wong-blue/10 text-wong-blue" },
    ]

    return (
        <section id="chapter-3" className="bg-[#FDFCF8] text-black pt-24 pb-16">

            {/* Chapter Header */}
            <div className="px-8 md:px-24 mb-16">
                <div className="max-w-7xl mx-auto border-b-2 border-stone-200 pb-10">
                    <span className="font-mono text-xs uppercase tracking-widest text-stone-400 mb-4 block">{t.motivation.chapterLabel}</span>
                    <h2 className="text-5xl md:text-7xl font-bold text-black leading-[0.9] tracking-tight uppercase mb-6">
                        {t.motivation.title1}<br />{t.motivation.title2}
                    </h2>
                    <p className="text-xl md:text-2xl max-w-3xl leading-relaxed text-stone-600" dangerouslySetInnerHTML={{ __html: t.motivation.subtitle }} />
                </div>
            </div>

            {/* Survey Carousel */}
            <div className="px-8 md:px-24 mb-16">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-0.5 w-10 bg-wong-yellow"></div>
                        <span className="font-mono text-xs uppercase tracking-widest text-stone-500">{t.motivation.surveyLabel}</span>
                    </div>
                    <SurveyCarousel />
                </div>
            </div>

            {/* Two-column grid */}
            <div className="px-8 md:px-24">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Left Column: The Why */}
                    <div className="lg:col-span-5">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-0.5 w-10 bg-black"></div>
                            <span className="font-mono text-xs uppercase tracking-widest text-stone-500">{t.motivation.whyLabel}</span>
                        </div>

                        <p className="text-xl md:text-2xl leading-snug mb-8 text-stone-800">
                            {t.motivation.whyDesc}
                        </p>

                        <div className="bg-stone-900 text-white p-6 border border-stone-700 text-base leading-relaxed">
                            <strong>{t.motivation.realityCheck}</strong> {t.motivation.realityCheckDesc}
                        </div>
                    </div>

                    {/* Right Column: The 3 Pillars */}
                    <div className="lg:col-span-7">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-0.5 w-10 bg-wong-blue"></div>
                            <span className="font-mono text-xs uppercase tracking-widest text-stone-500">{t.motivation.pillarsLabel}</span>
                        </div>

                        <div className="flex flex-col gap-4">
                            {pillars.map((pillar, i) => (
                                <div key={i} className="bg-white p-6 border border-stone-200 flex gap-6 items-start hover:border-stone-400 transition-all">
                                    <div className={`w-12 h-12 shrink-0 ${pillar.color} flex items-center justify-center rounded`}>
                                        <pillar.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold mb-1 uppercase tracking-tight">{pillar.title}</h3>
                                        <p className="text-stone-500 text-base leading-relaxed">
                                            {pillar.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
