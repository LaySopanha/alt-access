"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { CheckCircle2, ArrowRight, Award, PartyPopper } from "lucide-react"

export default function SuccessPage() {
    return (
        <main className="min-h-screen bg-[#FDFCF8] text-black font-sans selection:bg-wong-orange selection:text-black relative overflow-hidden">
            <Navbar theme="light" showLogo={true} />

            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-wong-yellow/10 rounded-bl-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-wong-teal/10 rounded-tr-full pointer-events-none" />

            <div className="container mx-auto px-6 py-20 min-h-screen flex flex-col justify-center items-center relative z-10">

                <div className="max-w-3xl w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">

                    {/* Icon Badge */}
                    <div className="mx-auto w-24 h-24 bg-black text-white rounded-full flex items-center justify-center shadow-2xl mb-8">
                        <Award className="w-12 h-12" />
                    </div>

                    <div className="space-y-4">
                        <span className="font-mono text-sm uppercase tracking-widest text-stone-500 font-bold">
                            Course Completed
                        </span>
                        <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-black">
                            Certificate of Empathy.
                        </h1>
                        <p className="text-xl md:text-2xl text-stone-600 max-w-2xl mx-auto leading-relaxed font-light">
                            You've experienced the web through different lenses. You now understand why accessibility isn't just a checklist—it's about inclusion.
                        </p>
                    </div>

                    {/* Achievement Cards */}
                    <div className="grid md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto mt-12">
                        {/* Card 1 */}
                        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-black" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Total Blindness</h3>
                                <p className="text-sm text-stone-500">Mastered audio navigation in the Dark Room.</p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-black" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Low Vision</h3>
                                <p className="text-sm text-stone-500">Found 'Project AltAccess' despite the blur.</p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-black" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Color Blindness</h3>
                                <p className="text-sm text-stone-500">Defused the bomb using patterns, not color.</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="pt-12">
                        <Link href="/">
                            <Button size="lg" className="bg-black hover:bg-stone-800 text-white rounded-full px-10 py-8 text-lg font-bold uppercase tracking-wide transition-all shadow-xl hover:shadow-2xl">
                                Back to Homepage
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>
        </main>
    )
}
