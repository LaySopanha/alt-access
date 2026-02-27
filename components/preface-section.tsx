"use client"

import Image from "next/image"
import { ArrowDown } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function PrefaceSection() {
    const { t } = useLanguage()

    return (
        <section className="relative bg-white text-black py-24 px-8 md:px-24 border-t-4 border-stone-900 shadow-[0_-20px_40px_rgba(0,0,0,0.08)]">
            <div className="max-w-7xl mx-auto">

                {/* Two-column intro */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left: The Hook */}
                    <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-stone-400 mb-6 block">{t.preface.label}</span>
                        <h2 className="text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight mb-8">
                            {t.preface.title1}<br />{t.preface.title2}
                        </h2>
                        <p className="text-xl text-stone-500 leading-relaxed max-w-md mb-12">
                            {t.preface.description}
                        </p>

                        {/* Partner Logos */}
                        <div className="border-t border-stone-200 pt-8">
                            <span className="font-mono text-xs uppercase tracking-widest text-stone-400 block mb-6">{t.preface.supportedBy}</span>
                            <div className="flex items-center gap-10 flex-wrap">
                                <Image
                                    src="/images/EU-logo.png"
                                    alt="European Union"
                                    width={160}
                                    height={60}
                                    className="h-14 w-auto object-contain"
                                />
                                <Image
                                    src="/images/impacthub-pp-logo.png"
                                    alt="Impact Hub Phnom Penh"
                                    width={160}
                                    height={60}
                                    className="h-14 w-auto object-contain"
                                />
                                <Image
                                    src="/images/prosob.jpg"
                                    alt="Prosob"
                                    width={160}
                                    height={60}
                                    className="h-14 w-auto object-contain"
                                />
                                <Image
                                    src="/images/IMS-logo.png"
                                    alt="IMS"
                                    width={160}
                                    height={60}
                                    className="h-14 w-auto object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right: The Context */}
                    <div className="flex flex-col gap-8 lg:pt-12">
                        <div className="border-l-2 border-wong-vermilion pl-6">
                            <p className="text-base text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.preface.context1 }} />
                        </div>

                        <div className="border-l-2 border-wong-blue pl-6">
                            <p className="text-base text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.preface.context2 }} />
                        </div>

                        <div className="border-l-2 border-stone-300 pl-6">
                            <p className="text-base text-stone-800 font-semibold italic">
                                {t.preface.quote}
                            </p>
                        </div>
                    </div>

                </div>

                {/* Scroll cue */}
                <div className="flex items-center gap-3 mt-20 text-stone-400">
                    <div className="h-px flex-1 bg-stone-200"></div>
                    <span className="font-mono text-xs uppercase tracking-widest">{t.preface.scrollToExplore}</span>
                    <ArrowDown className="w-3 h-3 animate-bounce" />
                    <div className="h-px flex-1 bg-stone-200"></div>
                </div>

            </div>
        </section>
    )
}
