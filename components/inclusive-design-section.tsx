"use client"

import Image from "next/image"
import { Volume2, Type } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function InclusiveDesignSection() {
    const { t } = useLanguage()

    return (
        <section id="chapter-2" className="bg-[#1351aa] text-white pt-24 pb-16">

            {/* Chapter Header */}
            <div className="px-8 md:px-24 mb-16">
                <div className="max-w-7xl mx-auto border-b border-white/20 pb-10">
                    <span className="font-mono text-xs uppercase tracking-widest text-blue-300 mb-4 block">{t.inclusiveDesign.chapterLabel}</span>
                    <h2 className="text-5xl md:text-7xl font-bold text-white leading-[0.9] tracking-tight uppercase mb-6">
                        {t.inclusiveDesign.title1}<br />{t.inclusiveDesign.title2}
                    </h2>
                    <p className="text-xl md:text-2xl max-w-3xl leading-relaxed text-blue-100" dangerouslySetInnerHTML={{ __html: t.inclusiveDesign.subtitle }} />
                </div>
            </div>

            <div className="px-8 md:px-24">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Left Column: Core Concepts (Sticky) */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-32">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-0.5 w-10 bg-[#ff751f]"></div>
                                <span className="font-mono text-xs uppercase tracking-widest text-blue-300">{t.inclusiveDesign.howLabel}</span>
                            </div>

                            <p className="text-xl md:text-2xl leading-snug mb-8 text-blue-50">
                                {t.inclusiveDesign.description}
                            </p>

                            <div className="bg-white/5 p-6 border border-white/15 text-base text-blue-100 leading-relaxed backdrop-blur-sm" dangerouslySetInnerHTML={{ __html: t.inclusiveDesign.context }} />
                        </div>
                    </div>

                    {/* Right Column: The Curb Cut Effect */}
                    <div className="lg:col-span-7">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="h-0.5 w-10 bg-white/50"></div>
                            <span className="font-mono text-xs uppercase tracking-widest text-[#ff751f]">{t.inclusiveDesign.curbCutLabel}</span>
                        </div>

                        <div className="relative bg-white text-black p-8 md:p-10 border-t-4 border-[#ff751f]">
                            {/* Background Illustration */}
                            <div className="absolute top-0 right-0 w-48 h-48 opacity-5 mix-blend-multiply pointer-events-none rotate-6 overflow-hidden">
                                <Image
                                    src="/images/curb-cut.png"
                                    alt=""
                                    fill
                                    quality={60}
                                    sizes="192px"
                                    className="object-cover"
                                />
                            </div>

                            <div className="relative z-10">
                                <p className="text-xl font-semibold leading-relaxed mb-4 max-w-xl text-stone-800" dangerouslySetInnerHTML={{ __html: t.inclusiveDesign.curbCutTitle }} />
                                <p className="text-base text-stone-600 leading-relaxed mb-10 max-w-xl border-l-2 border-stone-200 pl-4">
                                    {t.inclusiveDesign.curbCutDesc}
                                </p>

                                <div className="space-y-4">
                                    <div className="group border-b border-stone-200 pb-4 flex items-start gap-5 hover:translate-x-1 transition-transform">
                                        <div className="w-10 h-10 bg-[#1351aa] text-white flex items-center justify-center rounded shrink-0">
                                            <Volume2 className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-base mb-1 flex items-center gap-2">
                                                {t.inclusiveDesign.screenReaders}
                                                <span className="text-xs font-mono bg-stone-100 px-2 py-0.5 text-stone-400 rounded">{t.inclusiveDesign.screenReadersTag}</span>
                                            </h4>
                                            <p className="text-stone-500 text-sm leading-relaxed">
                                                {t.inclusiveDesign.screenReadersDesc}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="group pb-4 flex items-start gap-5 hover:translate-x-1 transition-transform">
                                        <div className="w-10 h-10 bg-[#1351aa] text-white flex items-center justify-center rounded shrink-0">
                                            <Type className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-base mb-1 flex items-center gap-2">
                                                {t.inclusiveDesign.videoCaptions}
                                                <span className="text-xs font-mono bg-stone-100 px-2 py-0.5 text-stone-400 rounded">{t.inclusiveDesign.videoCaptionsTag}</span>
                                            </h4>
                                            <p className="text-stone-500 text-sm leading-relaxed">
                                                {t.inclusiveDesign.videoCaptionsDesc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 font-mono text-xs uppercase tracking-widest text-right text-blue-300">
                            {t.inclusiveDesign.tagline}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
