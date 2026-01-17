"use client"

import { Globe, Users } from "lucide-react"

export function PrefaceSection() {
    return (
        <section className="bg-wong-vermilion text-black py-40 px-8 md:px-32 lg:px-48">
            <div className="max-w-4xl mx-auto">
                {/* Intro Block */}
                <div className="mb-24">
                    <span className="font-mono text-sm uppercase tracking-widest font-bold bg-white px-2 py-1 inline-block mb-8">
                        Preface
                    </span>
                    <h2 className="font-serif text-5xl md:text-7xl font-bold mb-10 leading-[1.1]">
                        Accessibility is<br />Not Optional.
                    </h2>
                    <p className="text-2xl font-serif leading-relaxed mb-8">
                        "Imagine yourself browsing the internet. Your screen looks clear. But what if it didn't?"
                    </p>
                    <p className="text-lg leading-relaxed font-sans font-medium text-black/80">
                        Alt Access is a media and learning campaign supported by <strong>Prosob (Impact Hub Phnom Penh)</strong> and funded by the <strong>European Union</strong>. Built for tech students, we help you understand accessibility challenges and apply inclusive principles.
                    </p>
                </div>

                {/* 2-Column Content */}
                <div className="grid md:grid-cols-2 gap-16 border-t-4 border-black pt-16">
                    <div>
                        <h3 className="text-xl font-bold uppercase mb-4 flex items-center gap-2">
                            <Globe className="w-5 h-5" />
                            1. Introduction
                        </h3>
                        <p className="text-lg leading-relaxed font-sans font-medium text-black/80">
                            As we are in the age of digitalization, everything from entertainment to tax payments is going online.
                            In Cambodia, we believe it is time for our tech students to <span className="bg-white px-1 font-bold">catalyze this shift</span> while designing approaches so that everyone, including those with disabilities, can have access to it.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold uppercase mb-4 flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            2. Understanding Access
                        </h3>
                        <p className="text-lg leading-relaxed font-sans font-medium text-black/80">
                            This perspective aligns with the <strong>social model of disability</strong>. Disability does not reside in the individual but in the <span className="underline decoration-white decoration-2">inaccessible environment</span> that hinders their ability.
                            <br /><br />
                            <strong>"Disability is not the problem. Barriers to access are."</strong>
                        </p>
                    </div>
                </div>

            </div>
        </section>
    )
}
