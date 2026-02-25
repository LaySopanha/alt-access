"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    ExternalLink,
    ChevronRight,
    ChevronLeft,
    BookOpen,
    Info,
    Lightbulb,
    Target,
    Globe,
    Clock,
    Menu,
    X
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AccessibilityGraphic } from "@/components/accessibility-graphic"

// Strict Content Data Structure
const curriculum = [
    {
        id: "intro",
        title: "1. Introduction: Welcome to Web Accessibility",
        content: (
            <div className="space-y-12">
                <div className="relative aspect-video overflow-hidden border border-stone-100 bg-stone-50 flex items-center justify-center">
                    <AccessibilityGraphic className="w-full h-full max-h-[400px]" />
                    <div className="absolute bottom-6 left-6 bg-black text-white px-6 py-2 text-[10px] font-mono font-bold uppercase tracking-widest">
                        Interactive Overview
                    </div>
                </div>

                <div className="space-y-8">
                    <p className="text-xl text-stone-800 leading-relaxed font-normal">
                        Web accessibility is about ensuring that anyone, regardless of their hardware, software, language, location, or ability, can perceive, understand, navigate, and interact with the Web.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                        <div className="space-y-4">
                            <h4 className="text-2xl font-bold text-black border-l-4 border-wong-vermilion pl-6 uppercase tracking-tighter">Our Core Mission</h4>
                            <p className="text-stone-600 leading-relaxed">
                                This platform specifically focuses on **Visual Impairment**. We aim to equip developers with the tools to build systems that work for those who cannot rely on standard visual cues.
                            </p>
                        </div>
                        <div className="bg-stone-50 border-l border-stone-200 p-8">
                            <h4 className="text-lg font-bold text-black mb-4">The Impact</h4>
                            <p className="text-sm text-stone-500 leading-relaxed italic">
                                "When we design for disability, we design for everyone. Accessibility is a human right, not a feature request."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ),
        image: "/images/anime_accessible_tech_usage.png"
    },
    {
        id: "standard",
        title: "2. The Standard: Understanding WCAG",
        content: (
            <div className="space-y-12">
                <div className="space-y-8">
                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        <div className="md:w-1/2 space-y-6">
                            <h4 className="text-3xl font-bold text-black tracking-tighter uppercase">The Global Language</h4>
                            <p className="text-stone-700 leading-relaxed text-lg">
                                **WCAG (Web Content Accessibility Guidelines)** is the gold standard for accessibility. It provides a shared set of rules for making web content more accessible to people with disabilities.
                            </p>
                            <p className="text-stone-600 leading-relaxed">
                                Think of it as the building code for the internet. Just as physical buildings must have ramps and fire exits, websites must have structure and contrast.
                            </p>
                        </div>
                        <div className="md:w-1/2 bg-black text-white p-10 space-y-6 flex flex-col justify-center">
                            <span className="font-mono text-[10px] text-white/50 tracking-[0.5em] uppercase">Core Versions</span>
                            <div className="space-y-4">
                                <div className="border-b border-white/10 pb-4">
                                    <span className="text-wong-yellow font-black block text-2xl">2.0</span>
                                    <span className="text-xs text-white/40 uppercase">The Foundation (2008)</span>
                                </div>
                                <div className="border-b border-white/10 pb-4">
                                    <span className="text-wong-vermilion font-black block text-2xl">2.1</span>
                                    <span className="text-xs text-white/40 uppercase">Mobile & Low Vision (2018)</span>
                                </div>
                                <div className="pb-4">
                                    <span className="text-white font-black block text-2xl">2.2</span>
                                    <span className="text-xs text-white/40 uppercase">Modern Interactions (2023)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#FDFCF8] border border-stone-200 p-10">
                    <h5 className="font-bold text-black mb-8 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-mono text-xs">A</span>
                        Comparison of Requirements
                    </h5>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-stone-200">
                                <tr className="text-[10px] uppercase tracking-widest text-stone-400">
                                    <th className="py-4 font-bold">Standard</th>
                                    <th className="py-4 font-bold text-center">Rules</th>
                                    <th className="py-4 font-bold">Primary Focus</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100 font-medium">
                                <tr>
                                    <td className="py-6 text-black">Common Standard (AA)</td>
                                    <td className="py-6 text-center">80+</td>
                                    <td className="py-6 text-stone-600">Legal requirement for most organizations.</td>
                                </tr>
                                <tr>
                                    <td className="py-6 text-black">Advanced (AAA)</td>
                                    <td className="py-6 text-center">100+</td>
                                    <td className="py-6 text-stone-600">Maximum accessibility for specialized tools.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        ),
        image: "/images/anime_accessible_tech_usage.png"
    },
    {
        id: "lesson-1",
        title: "3. Alternative Text (Alt Text)",
        content: (
            <div className="space-y-12">
                <div className="relative aspect-[16/6] overflow-hidden border border-stone-200">
                    <img
                        src="/images/alt_text_example_puppy_1771853299653.png"
                        alt="Golden retriever puppy"
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute top-6 left-6 bg-wong-yellow text-black px-4 py-1 text-[10px] font-bold uppercase tracking-widest">
                        Example Subject
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="space-y-6">
                        <h4 className="text-2xl font-bold text-black uppercase tracking-tighter">The "Telephone" Concept</h4>
                        <p className="text-stone-700 leading-relaxed italic border-l-4 border-black pl-8 py-2">
                            "If you were describing this image to a friend over the phone, what would you say?"
                        </p>
                        <p className="text-stone-600 leading-relaxed">
                            Alt text provides a text alternative for images. It is read by screen readers and displayed if an image fails to load.
                        </p>
                    </div>
                    <div className="space-y-8">
                        <div className="p-6 bg-red-50 border-l-4 border-red-500">
                            <span className="text-[10px] font-bold text-red-500 uppercase block mb-1">Bad Example</span>
                            <p className="text-stone-800 font-bold">Alt="Image"</p>
                        </div>
                        <div className="p-6 bg-green-50 border-l-4 border-green-600">
                            <span className="text-[10px] font-bold text-green-600 uppercase block mb-1">Good Example</span>
                            <p className="text-stone-800 font-bold italic">Alt="A golden retriever puppy sleeping on a blue rug."</p>
                        </div>
                    </div>
                </div>
            </div>
        ),
        image: "/images/alt_text_example_puppy_1771853299653.png"
    },
    {
        id: "lesson-2",
        title: "4. Color and Contrast",
        content: (
            <div className="space-y-12">
                <div className="relative aspect-video overflow-hidden border border-stone-200">
                    <img
                        src="/images/color_contrast_ui_example_retry_1771853493581.png"
                        alt="UI with high versus low contrast"
                        className="object-cover w-full h-full"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <h4 className="text-3xl font-bold text-black uppercase tracking-tight">The Contrast Test</h4>
                        <p className="text-stone-700 leading-relaxed text-lg">
                            Visual information must be distinguishable. Low contrast makes it impossible for users with low vision or color blindness to read content.
                        </p>
                        <div className="p-8 bg-stone-900 text-white space-y-4">
                            <h5 className="font-bold text-wong-yellow uppercase tracking-widest text-xs">The AA Rule</h5>
                            <p className="text-2xl font-bold leading-tight">Minimum contrast ratio of **4.5:1** for normal text.</p>
                            <p className="text-white/50 text-sm italic pt-4">This ensures readability even in sub-optimal environments.</p>
                        </div>
                    </div>
                    <div className="bg-wong-vermilion text-white p-8 flex flex-col justify-between">
                        <h5 className="font-black text-2xl uppercase tracking-tighter leading-none mb-12">Beyond <br /> Color.</h5>
                        <p className="text-sm leading-relaxed">
                            Never use color as the **only** way to convey information. Use icons, labels, or patterns to help those who cannot see color.
                        </p>
                    </div>
                </div>
            </div>
        ),
        image: "/images/color_contrast_ui_example_retry_1771853493581.png"
    },
    {
        id: "lesson-4",
        title: "5. Keyboard Navigation",
        content: (
            <div className="space-y-12">
                <div className="relative aspect-video overflow-hidden border border-stone-200 bg-stone-50 flex items-center justify-center">
                    <img
                        src="/images/keyboard_tab_key_focus_retry_1771853398093.png"
                        alt="Keyboard tab key focus illustration"
                        className="object-contain w-3/4 h-3/4"
                    />
                </div>

                <div className="max-w-3xl mx-auto space-y-8">
                    <div className="text-center space-y-4">
                        <h4 className="text-4xl font-bold text-black tracking-tighter">THE TAB KEY IS THE MOUSE.</h4>
                        <p className="text-stone-600 text-xl leading-relaxed">
                            For many users, navigating with a mouse is impossible. They rely on the Tab key to jump between interactive elements.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-200 border border-stone-200 mt-12">
                        <div className="bg-white p-10 space-y-4">
                            <span className="font-mono text-[10px] font-bold text-stone-400 uppercase tracking-widest">Requirement 01</span>
                            <h5 className="font-bold text-black">Logical Order</h5>
                            <p className="text-sm text-stone-500 leading-relaxed">The tab sequence must follow the visual flow of the page, usually left-to-right and top-to-bottom.</p>
                        </div>
                        <div className="bg-white p-10 space-y-4">
                            <span className="font-mono text-[10px] font-bold text-stone-400 uppercase tracking-widest">Requirement 02</span>
                            <h5 className="font-bold text-black">Visible Focus</h5>
                            <p className="text-sm text-stone-500 leading-relaxed">Users must always see where they are "located" on the page via a clear focus ring or indicator.</p>
                        </div>
                    </div>
                </div>
            </div>
        ),
        image: "/images/keyboard_tab_key_focus_retry_1771853398093.png"
    },
    {
        id: "conclusion",
        title: "Conclusion: Empathy is the Key",
        content: (
            <div className="space-y-12 py-12">
                <div className="text-center space-y-8">
                    <h4 className="text-6xl md:text-8xl font-black text-black tracking-tighter uppercase leading-none">Inclusion <br /> by Design.</h4>
                    <p className="text-2xl text-stone-600 leading-relaxed max-w-2xl mx-auto font-medium">
                        Accessibility is not a checklist; it's a commitment to making the digital world available to everyone.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
                    {[
                        { title: "Universal", desc: "Build for every ability level." },
                        { title: "Standardized", desc: "Follow WCAG 2.2 guidelines." },
                        { title: "Impactful", desc: "Open doors for 2.2B+ people." }
                    ].map((item, i) => (
                        <div key={i} className="border-t-2 border-black pt-6">
                            <span className="font-mono text-[10px] font-bold text-wong-vermilion uppercase tracking-widest block mb-2">Principle {i + 1}</span>
                            <h5 className="text-2xl font-bold text-black mb-3">{item.title}</h5>
                            <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        ),
        image: "/images/anime_accessible_tech_usage.png"
    }
]

export default function LearningCenterPage() {
    const [activeLesson, setActiveLesson] = useState(0)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const currentLesson = curriculum[activeLesson]
    const progress = ((activeLesson + 1) / curriculum.length) * 100

    // Handle anchor scrolling from homepage or external
    useEffect(() => {
        const hash = window.location.hash
        if (hash) {
            const index = curriculum.findIndex(c => `#${c.id}` === hash)
            if (index !== -1) setActiveLesson(index)
        }
    }, [])

    return (
        <main className="bg-white min-h-screen text-[#1A1A1A] selection:bg-wong-vermilion/20 font-sans">
            <Navbar theme="light" showLogo={true} />

            <section className="pt-24 pb-20 relative">
                <div className="container mx-auto px-4 md:px-8 max-w-7xl">

                    <div className="flex flex-col lg:flex-row gap-12 items-start mt-12">

                        {/* THE NAVIGATION SIDEBAR */}
                        <aside className={cn(
                            "lg:w-1/4 w-full lg:sticky lg:top-32 space-y-8",
                            isSidebarOpen ? "block" : "hidden lg:block"
                        )}>
                            <div className="space-y-2 border-b-2 border-black pb-6">
                                <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400 font-bold">Course Curriculum</span>
                                <h2 className="text-3xl font-black leading-none uppercase tracking-tighter">Web <br /> Accessibility</h2>
                            </div>

                            <nav className="flex flex-col border-l border-stone-100">
                                {curriculum.map((item, i) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setActiveLesson(i)
                                            setIsSidebarOpen(false)
                                            window.scrollTo({ top: 0, behavior: 'smooth' })
                                        }}
                                        className={cn(
                                            "w-full text-left py-4 px-6 border-l-4 transition-all flex items-center gap-4 group",
                                            activeLesson === i
                                                ? "border-wong-vermilion bg-stone-50 font-bold"
                                                : "border-transparent hover:border-stone-200 hover:bg-stone-50"
                                        )}
                                    >
                                        <span className={cn(
                                            "font-mono text-xs",
                                            activeLesson === i ? "text-wong-vermilion" : "text-stone-300"
                                        )}>
                                            {(i + 1).toString().padStart(2, '0')}
                                        </span>
                                        <span className={cn(
                                            "text-sm uppercase tracking-tight",
                                            activeLesson === i ? "text-black" : "text-stone-400 group-hover:text-stone-600"
                                        )}>
                                            {item.title.split('.').length > 1 ? item.title.split('.')[1].trim() : item.title}
                                        </span>
                                    </button>
                                ))}
                            </nav>

                            <div className="pt-8">
                                <div className="bg-black p-6 text-white space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-mono text-white/50 uppercase">Your Progress</span>
                                        <span className="text-[10px] font-mono text-wong-yellow font-bold">{Math.round(progress)}%</span>
                                    </div>
                                    <div className="h-1 bg-white/10 w-full overflow-hidden">
                                        <div className="h-full bg-wong-vermilion transition-all duration-500" style={{ width: `${progress}%` }} />
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* MOBILE SELECTOR */}
                        <div className="lg:hidden w-full sticky top-20 z-30 bg-white border-b border-stone-200 pb-4">
                            <Button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                variant="outline"
                                className="w-full justify-between h-12 rounded-none border-black text-xs font-bold uppercase tracking-widest"
                            >
                                <span>Module {activeLesson + 1}: {currentLesson.title}</span>
                                <Menu className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* MAIN CONTENT AREA */}
                        <div className="lg:w-3/4 w-full flex flex-col space-y-12">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentLesson.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="min-h-[800px]"
                                >
                                    {/* Content Header */}
                                    <div className="mb-12 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <span className="font-mono text-[10px] uppercase font-bold text-wong-vermilion">Current Module</span>
                                            <div className="h-px flex-1 bg-stone-100" />
                                        </div>
                                        <h1 className="text-4xl md:text-6xl font-black text-black tracking-tighter uppercase leading-[0.9]">
                                            {currentLesson.title}
                                        </h1>
                                    </div>

                                    {/* Actual Lesson Data */}
                                    <div className="prose prose-stone max-w-none">
                                        {currentLesson.content}
                                    </div>

                                    {/* Internal Page Nav */}
                                    <div className="mt-24 pt-12 border-t-2 border-black flex flex-col md:flex-row justify-between items-center gap-8">
                                        <div className="flex items-center gap-6">
                                            <button
                                                onClick={() => setActiveLesson(Math.max(0, activeLesson - 1))}
                                                disabled={activeLesson === 0}
                                                className="group flex flex-col items-start disabled:opacity-20"
                                            >
                                                <span className="font-mono text-[10px] uppercase font-bold text-stone-400 mb-2">Previous Lesson</span>
                                                <div className="flex items-center gap-2 group-hover:-translate-x-1 transition-transform">
                                                    <ArrowLeft className="w-4 h-4" />
                                                    <span className="font-bold uppercase tracking-tight text-sm">Back</span>
                                                </div>
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            {curriculum.map((_, i) => (
                                                <div key={i} className={cn("h-1 transition-all", activeLesson === i ? "bg-black w-8" : "bg-stone-100 w-2")} />
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <button
                                                onClick={() => setActiveLesson(Math.min(curriculum.length - 1, activeLesson + 1))}
                                                disabled={activeLesson === curriculum.length - 1}
                                                className="group flex flex-col items-end disabled:opacity-20"
                                            >
                                                <span className="font-mono text-[10px] uppercase font-bold text-stone-400 mb-2">Next Lesson</span>
                                                <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform font-bold uppercase tracking-tight text-sm">
                                                    <span>{activeLesson === curriculum.length - 1 ? "End" : "Continue"}</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
