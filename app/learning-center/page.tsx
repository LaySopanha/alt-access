"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    ChevronRight,
    BookOpen,
    Globe,
    Lightbulb,
    Type,
    Palette,
    Keyboard,
    Target,
    Menu,
    X,
    AlertTriangle,
    Info,
    Code,
    Eye,
    EyeOff,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

/* ------------------------------------------------------------------ */
/*  CURRICULUM DATA                                                    */
/* ------------------------------------------------------------------ */

type Lesson = {
    id: string
    title: string
    icon: React.ElementType
    sections: Section[]
}

type Section = {
    heading: string
    body: React.ReactNode
}

const curriculum: Lesson[] = [
    {
        id: "intro",
        title: "Introduction",
        icon: Globe,
        sections: [
            {
                heading: "What Is Web Accessibility?",
                body: (
                    <>
                        <p>
                            Web accessibility means ensuring that websites, tools, and technologies are designed
                            and developed so that <strong>people with disabilities can use them</strong>. More specifically,
                            people can perceive, understand, navigate, and interact with the Web.
                        </p>
                        <p>
                            Accessibility is essential for developers and organizations that want to create
                            high-quality websites and web tools, and not exclude people from using their products and services.
                        </p>
                    </>
                ),
            },
            {
                heading: "Why It Matters",
                body: (
                    <>
                        <div className="bg-stone-900 text-white p-6 md:p-8 my-2">
                            <div className="flex items-start gap-4">
                                <AlertTriangle className="w-6 h-6 text-wong-yellow shrink-0 mt-0.5" />
                                <div>
                                    <h5 className="font-bold uppercase tracking-tight mb-2">The Reality</h5>
                                    <p className="text-stone-300 leading-relaxed text-sm">
                                        Over <strong className="text-white">2.2 billion people</strong> globally have a vision
                                        impairment. Without accessible design, entire populations are shut out of digital services.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p>
                            Accessibility is not just an ethical obligation — it is increasingly a <strong>legal requirement</strong>.
                            Laws such as the Americans with Disabilities Act (ADA) and the European Accessibility Act (EAA) require
                            digital services to be accessible.
                        </p>
                    </>
                ),
            },
            {
                heading: "Our Focus: Visual Impairment",
                body: (
                    <>
                        <p>
                            This course specifically focuses on <strong>visual impairment</strong> — the most
                            common type of disability affecting web usage. We will cover:
                        </p>
                        <ul>
                            <li>Total blindness (screen reader usage)</li>
                            <li>Low vision (magnification, contrast needs)</li>
                            <li>Color blindness (color independence)</li>
                        </ul>
                        <div className="bg-stone-50 border border-stone-200 p-6 my-2">
                            <div className="flex items-start gap-4">
                                <Info className="w-5 h-5 text-wong-blue shrink-0 mt-0.5" />
                                <p className="text-stone-600 text-sm leading-relaxed">
                                    <strong className="text-black">Tip:</strong> Try the interactive simulations on the{" "}
                                    <Link href="/experience" className="text-wong-blue underline hover:text-wong-vermilion transition-colors">
                                        Experience page
                                    </Link>{" "}
                                    to feel these barriers firsthand before continuing this course.
                                </p>
                            </div>
                        </div>
                    </>
                ),
            },
        ],
    },
    {
        id: "wcag",
        title: "The WCAG Standard",
        icon: BookOpen,
        sections: [
            {
                heading: "What Is WCAG?",
                body: (
                    <>
                        <p>
                            <strong>WCAG (Web Content Accessibility Guidelines)</strong> is the international
                            standard for web accessibility, published by the W3C (World Wide Web Consortium).
                        </p>
                        <p>
                            Think of it as the <strong>building code for the internet</strong>. Just as physical
                            buildings must have ramps and fire exits, websites must have structure, contrast, and
                            navigability.
                        </p>
                    </>
                ),
            },
            {
                heading: "WCAG Versions",
                body: (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-200 border border-stone-200 my-2">
                        <div className="bg-white p-6">
                            <span className="text-3xl font-bold text-wong-yellow block mb-1">2.0</span>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">The Foundation (2008)</span>
                            <p className="text-stone-600 text-sm mt-3 leading-relaxed">
                                Established the four core principles: Perceivable, Operable, Understandable, Robust (POUR).
                            </p>
                        </div>
                        <div className="bg-white p-6">
                            <span className="text-3xl font-bold text-wong-vermilion block mb-1">2.1</span>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">Mobile & Low Vision (2018)</span>
                            <p className="text-stone-600 text-sm mt-3 leading-relaxed">
                                Added guidelines for mobile accessibility, people with low vision, and cognitive disabilities.
                            </p>
                        </div>
                        <div className="bg-white p-6">
                            <span className="text-3xl font-bold text-black block mb-1">2.2</span>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">Modern Interactions (2023)</span>
                            <p className="text-stone-600 text-sm mt-3 leading-relaxed">
                                New criteria for dragging, focus appearance, and consistent help across pages.
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                heading: "Conformance Levels",
                body: (
                    <>
                        <p>
                            WCAG defines three levels of conformance. Most organizations target <strong>Level AA</strong> as the legal minimum.
                        </p>
                        <div className="overflow-x-auto my-2">
                            <table className="w-full text-left border border-stone-200">
                                <thead className="bg-stone-50 border-b border-stone-200">
                                    <tr className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">
                                        <th className="py-4 px-6">Level</th>
                                        <th className="py-4 px-6">Rules</th>
                                        <th className="py-4 px-6">Use Case</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-stone-100">
                                    <tr>
                                        <td className="py-4 px-6 font-bold text-black">A</td>
                                        <td className="py-4 px-6">30+</td>
                                        <td className="py-4 px-6 text-stone-600">Bare minimum — removes the worst barriers.</td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 px-6 font-bold text-wong-vermilion">AA</td>
                                        <td className="py-4 px-6">80+</td>
                                        <td className="py-4 px-6 text-stone-600">Legal standard for most organizations.</td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 px-6 font-bold text-wong-teal">AAA</td>
                                        <td className="py-4 px-6">100+</td>
                                        <td className="py-4 px-6 text-stone-600">Maximum accessibility for specialized tools.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                ),
            },
        ],
    },
    {
        id: "alt-text",
        title: "Alternative Text",
        icon: Type,
        sections: [
            {
                heading: "What Is Alt Text?",
                body: (
                    <>
                        <p>
                            Alt text (alternative text) provides a <strong>text description of an image</strong>.
                            It is read aloud by screen readers and displayed if the image fails to load.
                        </p>
                        <p>
                            Every meaningful image on the web should have alt text.
                            Decorative images should have an empty <code>alt=""</code> attribute.
                        </p>
                    </>
                ),
            },
            {
                heading: "The Telephone Concept",
                body: (
                    <>
                        <div className="border-l-4 border-black pl-6 py-2 my-2 italic text-stone-700 text-lg">
                            "If you were describing this image to a friend over the phone, what would you say?"
                        </div>
                        <p>
                            That is the core principle of good alt text. You are transferring visual information into words.
                            The description should be <strong>concise, specific, and contextual</strong>.
                        </p>
                    </>
                ),
            },
            {
                heading: "Example",
                body: (
                    <>
                        <div className="border border-stone-200 overflow-hidden my-2">
                            <div className="aspect-[16/6] relative">
                                <Image
                                    src="/images/alt_text_example_puppy_1771853299653.png"
                                    alt="Golden retriever puppy sleeping on a blue rug"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 800px"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
                            <div className="p-5 bg-red-50 border-l-4 border-red-500">
                                <span className="text-[10px] font-bold text-red-500 uppercase block mb-1">✗ Bad</span>
                                <code className="text-stone-800 font-bold text-sm">alt="Image"</code>
                            </div>
                            <div className="p-5 bg-green-50 border-l-4 border-green-600">
                                <span className="text-[10px] font-bold text-green-600 uppercase block mb-1">✓ Good</span>
                                <code className="text-stone-800 font-bold text-sm">alt="A golden retriever puppy sleeping on a blue rug."</code>
                            </div>
                        </div>
                    </>
                ),
            },
            {
                heading: "HTML Syntax",
                body: (
                    <div className="bg-stone-900 text-white p-6 font-mono text-sm overflow-x-auto my-2">
                        <div className="flex items-center gap-2 mb-4">
                            <Code className="w-4 h-4 text-stone-500" />
                            <span className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">HTML</span>
                        </div>
                        <pre className="whitespace-pre-wrap leading-relaxed">
                            <span className="text-stone-500">{"<!-- Good alt text -->"}</span>{"\n"}
                            <span className="text-wong-yellow">{"<img"}</span>{"\n"}
                            {"  "}src=<span className="text-wong-teal">"puppy.jpg"</span>{"\n"}
                            {"  "}alt=<span className="text-wong-teal">"A golden retriever puppy sleeping on a blue rug."</span>{"\n"}
                            <span className="text-wong-yellow">{"/>"}</span>{"\n\n"}
                            <span className="text-stone-500">{"<!-- Decorative image (skip by screen readers) -->"}</span>{"\n"}
                            <span className="text-wong-yellow">{"<img"}</span> src=<span className="text-wong-teal">"divider.png"</span> alt=<span className="text-wong-teal">""</span> <span className="text-wong-yellow">{"/>"}</span>
                        </pre>
                    </div>
                ),
            },
        ],
    },
    {
        id: "color-contrast",
        title: "Color & Contrast",
        icon: Palette,
        sections: [
            {
                heading: "Why Contrast Matters",
                body: (
                    <>
                        <p>
                            Visual information must be <strong>distinguishable</strong>. Low contrast makes text
                            nearly impossible to read for users with low vision or color blindness — and even
                            for people in bright sunlight.
                        </p>
                        <div className="border border-stone-200 overflow-hidden my-2">
                            <div className="relative aspect-[3/2] w-full">
                                <Image
                                    src="/images/color_contrast_ui_example_retry_1771853493581.png"
                                    alt="UI comparison of high versus low contrast"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 800px"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </>
                ),
            },
            {
                heading: "The AA Rule",
                body: (
                    <div className="bg-stone-900 text-white p-6 md:p-8 my-2">
                        <h5 className="font-bold text-wong-yellow uppercase tracking-widest text-xs mb-4">WCAG 1.4.3</h5>
                        <p className="text-2xl font-bold leading-tight mb-4">
                            Minimum contrast ratio of <span className="text-wong-yellow">4.5:1</span> for normal text.
                        </p>
                        <p className="text-white/50 text-sm italic">
                            Large text (18px bold or 24px regular) only needs 3:1. This ensures readability even in sub-optimal environments.
                        </p>
                    </div>
                ),
            },
            {
                heading: "Interactive Example",
                body: (
                    <>
                        <p>Compare these two buttons. Which one is easier to read?</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                            <div className="p-6 border border-stone-200 text-center">
                                <span className="text-[10px] font-bold text-red-500 uppercase block mb-3">✗ Fails AA (1.9:1)</span>
                                <button className="bg-[#cccccc] text-[#999999] px-8 py-3 font-bold text-lg cursor-default w-full">
                                    Submit Order
                                </button>
                            </div>
                            <div className="p-6 border border-stone-200 text-center">
                                <span className="text-[10px] font-bold text-green-600 uppercase block mb-3">✓ Passes AA (12.6:1)</span>
                                <button className="bg-stone-900 text-white px-8 py-3 font-bold text-lg cursor-default w-full">
                                    Submit Order
                                </button>
                            </div>
                        </div>
                    </>
                ),
            },
            {
                heading: "Beyond Color",
                body: (
                    <>
                        <div className="bg-wong-vermilion text-white p-6 md:p-8 my-2">
                            <h5 className="font-bold text-2xl uppercase tracking-tight mb-4">Never rely on color alone.</h5>
                            <p className="text-sm leading-relaxed opacity-90">
                                Use icons, text labels, or patterns alongside color to convey information. This is
                                critical for the 300 million people with color blindness worldwide.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                            <div className="p-5 bg-red-50 border-l-4 border-red-500">
                                <span className="text-[10px] font-bold text-red-500 uppercase block mb-2">✗ Color only</span>
                                <div className="flex gap-3 items-center">
                                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                                    <span className="text-sm text-stone-600">Error</span>
                                    <div className="w-4 h-4 rounded-full bg-green-500 ml-4"></div>
                                    <span className="text-sm text-stone-600">Success</span>
                                </div>
                            </div>
                            <div className="p-5 bg-green-50 border-l-4 border-green-600">
                                <span className="text-[10px] font-bold text-green-600 uppercase block mb-2">✓ Color + icon + text</span>
                                <div className="flex gap-3 items-center">
                                    <X className="w-4 h-4 text-red-500" />
                                    <span className="text-sm text-stone-600 font-bold">Error</span>
                                    <CheckCircle2 className="w-4 h-4 text-green-500 ml-4" />
                                    <span className="text-sm text-stone-600 font-bold">Success</span>
                                </div>
                            </div>
                        </div>
                    </>
                ),
            },
        ],
    },
    {
        id: "keyboard",
        title: "Keyboard Navigation",
        icon: Keyboard,
        sections: [
            {
                heading: "The Tab Key Is the Mouse",
                body: (
                    <>
                        <p>
                            For many users, navigating with a mouse is <strong>impossible</strong>. They rely on
                            the <kbd className="bg-stone-100 border border-stone-300 text-stone-700 px-2 py-0.5 text-sm font-mono">Tab</kbd> key
                            to jump between interactive elements on a page.
                        </p>
                        <div className="border border-stone-200 overflow-hidden bg-stone-50 flex items-center justify-center my-2 py-8 px-4">
                            <div className="relative aspect-[16/9] w-3/4 max-w-lg">
                                <Image
                                    src="/images/keyboard_tab_key_focus_retry_1771853398093.png"
                                    alt="Keyboard tab key focus illustration"
                                    fill
                                    sizes="(max-width: 1024px) 75vw, 600px"
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </>
                ),
            },
            {
                heading: "Key Requirements",
                body: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-200 border border-stone-200 my-2">
                        <div className="bg-white p-6 space-y-3">
                            <span className="font-mono text-[10px] font-bold text-stone-400 uppercase tracking-widest">Requirement 01</span>
                            <h5 className="font-bold text-black text-lg">Logical Tab Order</h5>
                            <p className="text-sm text-stone-500 leading-relaxed">
                                The tab sequence must follow the visual flow of the page — usually left-to-right and top-to-bottom.
                            </p>
                        </div>
                        <div className="bg-white p-6 space-y-3">
                            <span className="font-mono text-[10px] font-bold text-stone-400 uppercase tracking-widest">Requirement 02</span>
                            <h5 className="font-bold text-black text-lg">Visible Focus</h5>
                            <p className="text-sm text-stone-500 leading-relaxed">
                                Users must always see where they are on the page via a clear focus ring or indicator.
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                heading: "HTML Syntax",
                body: (
                    <div className="bg-stone-900 text-white p-6 font-mono text-sm overflow-x-auto my-2">
                        <div className="flex items-center gap-2 mb-4">
                            <Code className="w-4 h-4 text-stone-500" />
                            <span className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">HTML</span>
                        </div>
                        <pre className="whitespace-pre-wrap leading-relaxed">
                            <span className="text-stone-500">{"<!-- Skip link for keyboard users -->"}</span>{"\n"}
                            <span className="text-wong-yellow">{"<a"}</span> href=<span className="text-wong-teal">"#main"</span> class=<span className="text-wong-teal">"skip-link"</span><span className="text-wong-yellow">{">"}</span>{"\n"}
                            {"  "}Skip to main content{"\n"}
                            <span className="text-wong-yellow">{"</a>"}</span>{"\n\n"}
                            <span className="text-stone-500">{"<!-- Focusable with visible outline -->"}</span>{"\n"}
                            <span className="text-wong-yellow">{"<button"}</span>{"\n"}
                            {"  "}class=<span className="text-wong-teal">"focus:outline-2 focus:outline-blue-500"</span>{"\n"}
                            <span className="text-wong-yellow">{">"}</span>{"\n"}
                            {"  "}Submit{"\n"}
                            <span className="text-wong-yellow">{"</button>"}</span>
                        </pre>
                    </div>
                ),
            },
        ],
    },
    {
        id: "conclusion",
        title: "Conclusion",
        icon: Target,
        sections: [
            {
                heading: "Inclusion by Design",
                body: (
                    <>
                        <p className="text-xl leading-relaxed">
                            Accessibility is not a checklist — it is a <strong>commitment</strong> to making the
                            digital world available to everyone. Every decision you make as a developer either
                            opens or closes a door.
                        </p>
                    </>
                ),
            },
            {
                heading: "The Three Principles",
                body: (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
                        {[
                            { title: "Universal", desc: "Build for every ability level, not just the majority.", color: "border-wong-vermilion" },
                            { title: "Standardized", desc: "Follow WCAG 2.2 guidelines as your foundation.", color: "border-wong-blue" },
                            { title: "Impactful", desc: "Your code opens doors for 2.2 billion+ people.", color: "border-wong-teal" },
                        ].map((item, i) => (
                            <div key={i} className={`border-t-4 ${item.color} pt-6 p-6 bg-white border border-stone-200`}>
                                <span className="font-mono text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-2">
                                    Principle {i + 1}
                                </span>
                                <h5 className="text-xl font-bold text-black mb-2">{item.title}</h5>
                                <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                ),
            },
            {
                heading: "What's Next?",
                body: (
                    <div className="bg-stone-900 text-white p-6 md:p-8 my-2">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div>
                                <h5 className="font-bold text-lg uppercase mb-2">Put Theory Into Practice</h5>
                                <p className="text-stone-400 text-sm leading-relaxed">
                                    Head to the Experience page to try the interactive simulations and feel
                                    what users with visual impairments face every day.
                                </p>
                            </div>
                            <Link
                                href="/experience"
                                className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-stone-100 transition-colors whitespace-nowrap shrink-0 group"
                            >
                                <span>Try Simulations</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                ),
            },
        ],
    },
]

/* ------------------------------------------------------------------ */
/*  PAGE COMPONENT                                                     */
/* ------------------------------------------------------------------ */

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

    const goTo = (index: number) => {
        setActiveLesson(index)
        setIsSidebarOpen(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <main className="bg-[#FDFCF8] min-h-screen text-black font-sans">
            <Navbar theme="light" showLogo={true} />

            <div className="pt-20">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8">

                    <div className="flex items-start gap-0 relative">

                        {/* ============================================= */}
                        {/*  SIDEBAR                                       */}
                        {/* ============================================= */}
                        <aside className={cn(
                            "w-72 shrink-0 sticky top-20 self-start border-r border-stone-200 bg-white min-h-[calc(100vh-5rem)] overflow-y-auto",
                            "hidden lg:block"
                        )}>
                            {/* Course title */}
                            <div className="p-6 border-b border-stone-200">
                                <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400 font-bold block mb-2">
                                    Course
                                </span>
                                <h2 className="text-xl font-bold uppercase tracking-tight leading-tight">
                                    Web Accessibility
                                </h2>
                                <p className="text-xs text-stone-500 mt-1">Building for Visual Impairment</p>
                            </div>

                            {/* Progress */}
                            <div className="px-6 py-4 border-b border-stone-200 bg-stone-50">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-mono text-[10px] text-stone-400 uppercase tracking-widest font-bold">Progress</span>
                                    <span className="font-mono text-[10px] text-wong-vermilion font-bold">{Math.round(progress)}%</span>
                                </div>
                                <div className="h-1 bg-stone-200 w-full overflow-hidden">
                                    <div
                                        className="h-full bg-wong-vermilion transition-all duration-500"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>

                            {/* Nav items */}
                            <nav className="py-2">
                                {curriculum.map((item, i) => {
                                    const NavIcon = item.icon
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => goTo(i)}
                                            className={cn(
                                                "w-full text-left px-6 py-3.5 flex items-center gap-3 transition-all border-l-4",
                                                activeLesson === i
                                                    ? "border-wong-vermilion bg-wong-vermilion/5 font-bold"
                                                    : "border-transparent hover:bg-stone-50 hover:border-stone-200"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-8 h-8 shrink-0 flex items-center justify-center rounded",
                                                activeLesson === i
                                                    ? "bg-wong-vermilion/10 text-wong-vermilion"
                                                    : "bg-stone-100 text-stone-400"
                                            )}>
                                                <NavIcon className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <span className={cn(
                                                    "block text-sm uppercase tracking-tight truncate",
                                                    activeLesson === i ? "text-black" : "text-stone-500"
                                                )}>
                                                    {item.title}
                                                </span>
                                            </div>
                                            {activeLesson === i && (
                                                <ChevronRight className="w-4 h-4 text-wong-vermilion shrink-0" />
                                            )}
                                        </button>
                                    )
                                })}
                            </nav>
                        </aside>

                        {/* ============================================= */}
                        {/*  MOBILE NAV BAR                                */}
                        {/* ============================================= */}
                        <div className="lg:hidden fixed top-14 left-0 right-0 z-30 bg-white border-b border-stone-200">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="w-full flex items-center justify-between px-6 py-3"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="font-mono text-[10px] text-wong-vermilion font-bold">
                                        {(activeLesson + 1).toString().padStart(2, "0")}
                                    </span>
                                    <span className="text-sm font-bold uppercase tracking-tight truncate">
                                        {currentLesson.title}
                                    </span>
                                </div>
                                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>

                            {/* Mobile dropdown */}
                            {isSidebarOpen && (
                                <div className="bg-white border-t border-stone-100 max-h-80 overflow-y-auto">
                                    {curriculum.map((item, i) => (
                                        <button
                                            key={item.id}
                                            onClick={() => goTo(i)}
                                            className={cn(
                                                "w-full text-left px-6 py-3 flex items-center gap-3 border-l-4",
                                                activeLesson === i
                                                    ? "border-wong-vermilion bg-wong-vermilion/5 font-bold"
                                                    : "border-transparent hover:bg-stone-50"
                                            )}
                                        >
                                            <span className={cn(
                                                "font-mono text-xs",
                                                activeLesson === i ? "text-wong-vermilion" : "text-stone-300"
                                            )}>
                                                {(i + 1).toString().padStart(2, "0")}
                                            </span>
                                            <span className={cn(
                                                "text-sm uppercase tracking-tight",
                                                activeLesson === i ? "text-black" : "text-stone-500"
                                            )}>
                                                {item.title}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* ============================================= */}
                        {/*  MAIN CONTENT                                  */}
                        {/* ============================================= */}
                        <div className="flex-1 min-w-0 lg:pl-0">
                            <article className="max-w-4xl mx-auto px-4 md:px-12 py-10 lg:py-16 pt-24 lg:pt-16">

                                {/* Lesson Header */}
                                <div className="mb-12 border-b-2 border-stone-200 pb-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="font-mono text-[10px] uppercase tracking-widest text-wong-vermilion font-bold">
                                            Module {(activeLesson + 1).toString().padStart(2, "0")} / {curriculum.length.toString().padStart(2, "0")}
                                        </span>
                                        <div className="h-px flex-1 bg-stone-100" />
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-bold text-black tracking-tight uppercase leading-[0.95]">
                                        {currentLesson.title}
                                    </h1>
                                </div>

                                {/* Sections */}
                                <div className="space-y-12">
                                    {currentLesson.sections.map((section, i) => (
                                        <section key={i} className="scroll-mt-24">
                                            <h2 className="text-2xl font-bold text-black mb-6 tracking-tight uppercase flex items-center gap-3">
                                                <div className="h-0.5 w-8 bg-wong-vermilion"></div>
                                                {section.heading}
                                            </h2>
                                            <div className="prose-custom space-y-4 text-stone-700 leading-relaxed [&_p]:text-base [&_p]:leading-relaxed [&_ul]:space-y-2 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:text-stone-600 [&_code]:bg-stone-100 [&_code]:border [&_code]:border-stone-200 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:font-mono [&_code]:text-wong-vermilion [&_strong]:text-black">
                                                {section.body}
                                            </div>
                                        </section>
                                    ))}
                                </div>

                                {/* Bottom Navigation */}
                                <div className="mt-20 pt-8 border-t-2 border-stone-200">
                                    <div className="flex flex-col md:flex-row justify-between items-stretch gap-4">
                                        {/* Previous */}
                                        <button
                                            onClick={() => goTo(Math.max(0, activeLesson - 1))}
                                            disabled={activeLesson === 0}
                                            className="flex-1 group text-left p-6 border border-stone-200 hover:border-stone-400 transition-all disabled:opacity-20 disabled:pointer-events-none bg-white"
                                        >
                                            <span className="font-mono text-[10px] uppercase text-stone-400 tracking-widest font-bold block mb-2">
                                                ← Previous
                                            </span>
                                            <span className="font-bold text-black uppercase tracking-tight text-lg group-hover:text-wong-vermilion transition-colors">
                                                {activeLesson > 0 ? curriculum[activeLesson - 1].title : "—"}
                                            </span>
                                        </button>

                                        {/* Next */}
                                        <button
                                            onClick={() => goTo(Math.min(curriculum.length - 1, activeLesson + 1))}
                                            disabled={activeLesson === curriculum.length - 1}
                                            className="flex-1 group text-right p-6 border border-stone-200 hover:border-stone-400 transition-all disabled:opacity-20 disabled:pointer-events-none bg-white"
                                        >
                                            <span className="font-mono text-[10px] uppercase text-stone-400 tracking-widest font-bold block mb-2">
                                                Next →
                                            </span>
                                            <span className="font-bold text-black uppercase tracking-tight text-lg group-hover:text-wong-vermilion transition-colors">
                                                {activeLesson < curriculum.length - 1 ? curriculum[activeLesson + 1].title : "—"}
                                            </span>
                                        </button>
                                    </div>

                                    {/* Progress dots */}
                                    <div className="flex items-center justify-center gap-1.5 mt-8">
                                        {curriculum.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => goTo(i)}
                                                className={cn(
                                                    "h-1.5 transition-all rounded-full",
                                                    activeLesson === i
                                                        ? "bg-wong-vermilion w-8"
                                                        : i < activeLesson
                                                            ? "bg-wong-vermilion/30 w-3"
                                                            : "bg-stone-200 w-3"
                                                )}
                                            />
                                        ))}
                                    </div>
                                </div>

                            </article>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
