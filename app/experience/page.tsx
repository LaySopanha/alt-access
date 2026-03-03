"use client"

import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/hooks/use-language"
import {
  ArrowRight,
  Eye,
  EyeOff,
  Palette,
  Search,
  ShoppingCart,
  Bomb,
  Ticket,
  ShieldAlert,
  Globe,
  Clock,
  Zap,
  Users,
  BookOpen,
  MousePointerClick,
  Sparkles,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const simulations = [
  {
    id: "01",
    slug: "total-blindness",
    title: "Total Blindness",
    subtitle: "Audio Interface",
    description:
      "Experience the web without a screen. Navigate entirely using keyboard inputs and audio cues — exactly how millions of blind users interact with technology every day.",
    image: "/screen-reader-accessibility-blind-user.jpg",
    color: "wong-yellow",
    colorHex: "#F0E442",
    bgAccent: "bg-[#F0E442]/10",
    textAccent: "text-[#F0E442]",
    borderAccent: "border-[#F0E442]",
    hoverAccent: "group-hover:text-[#F0E442]",
    icon: EyeOff,
    missions: [
      {
        code: "M1",
        name: "The Dark Room",
        desc: "Tab through a dark room using only audio. Find the key to escape.",
        icon: Search,
      },
      {
        code: "M2",
        name: "The Checkout",
        desc: "Complete a purchase using a form with missing labels — a common real‑world barrier.",
        icon: ShoppingCart,
      },
    ],
    insight:
      "Screen readers rely on semantic HTML. Without proper labels, headings, and ARIA attributes, the entire interface becomes unusable.",
    wcagRef: "WCAG 1.3.1 · Info and Relationships",
    difficulty: "Challenging",
    time: "~5 min",
    tags: ["Screen Reader", "Keyboard-Only", "Semantic HTML"],
  },
  {
    id: "02",
    slug: "low-vision",
    title: "Low Vision",
    subtitle: "Field Loss Simulation",
    description:
      "See the web through severe myopia or tunnel vision. Discover how hard it is to find a single button when you can only see a tiny fraction of the screen at a time.",
    image: "/blurred-vision-accessibility-simulation.jpg",
    color: "wong-teal",
    colorHex: "#009E73",
    bgAccent: "bg-[#009E73]/10",
    textAccent: "text-[#009E73]",
    borderAccent: "border-[#009E73]",
    hoverAccent: "group-hover:text-[#009E73]",
    icon: Eye,
    missions: [
      {
        code: "M1",
        name: "The Folder Grid",
        desc: "Search a blurred grid of files. Move your mouse to focus on specific areas.",
        icon: Search,
      },
      {
        code: "M2",
        name: "Unsubscribe Trap",
        desc: "Find the hidden cancel button on a settings page with poor contrast and deceptive layouts.",
        icon: ShieldAlert,
      },
    ],
    insight:
      "Low‑contrast text and small click targets make interfaces nearly impossible to use for the 246 million people with low vision.",
    wcagRef: "WCAG 1.4.3 · Contrast (Minimum)",
    difficulty: "Moderate",
    time: "~4 min",
    tags: ["Low Contrast", "Visual Field Loss", "Resizable Text"],
  },
  {
    id: "03",
    slug: "color-blindness",
    title: "Color Blindness",
    subtitle: "Color Spectrum",
    description:
      "Experience Deuteranopia (red‑green blindness). Discover how much we rely on color alone to convey critical information — and why that's a problem for 300 million people worldwide.",
    image: "/color-blindness-spectrum-visual.jpg",
    color: "wong-vermilion",
    colorHex: "#D55E00",
    bgAccent: "bg-[#D55E00]/10",
    textAccent: "text-[#D55E00]",
    borderAccent: "border-[#D55E00]",
    hoverAccent: "group-hover:text-[#D55E00]",
    icon: Palette,
    missions: [
      {
        code: "M1",
        name: "The Wire",
        desc: "15 seconds to cut the green wire. A classic trope that becomes a nightmare without color vision.",
        icon: Bomb,
      },
      {
        code: "M2",
        name: "Final Tickets",
        desc: "Book an available seat when green and red look exactly the same.",
        icon: Ticket,
      },
    ],
    insight:
      "Color should never be the only visual means of conveying information. Always pair color with text labels, patterns, or icons.",
    wcagRef: "WCAG 1.4.1 · Use of Color",
    difficulty: "Moderate",
    time: "~3 min",
    tags: ["Deuteranopia", "Color Independence", "Pattern Indicators"],
  },
]

const statistics = [
  {
    number: "2.2B",
    label: "People globally have a vision impairment or blindness",
    source: "WHO, 2023",
    color: "#009E73",
  },
  {
    number: "1 in 12",
    label: "Men worldwide experience some form of color blindness",
    source: "NEI Research",
    color: "#D55E00",
  },
  {
    number: "96.3%",
    label: "Of the top 1M websites have detected WCAG failures",
    source: "WebAIM, 2024",
    color: "#E69F00",
  },
  {
    number: "43M",
    label: "People are estimated to be totally blind worldwide",
    source: "Lancet, 2021",
    color: "#0072B2",
  },
]

const steps = [
  {
    step: "01",
    title: "Choose a Simulation",
    description:
      "Pick from three disability categories — each designed around real barriers people face on the web every day.",
    icon: MousePointerClick,
    image: "/images/resource/one-hand-using-phone-picture.png",
  },
  {
    step: "02",
    title: "Experience the Barrier",
    description:
      "Complete interactive missions under simulated conditions. Feel the frustration when interfaces fail to be accessible.",
    icon: Zap,
    image: "/images/resource/two-hand-using-phone-picture.png",
  },
  {
    step: "03",
    title: "Learn the Solution",
    description:
      "Discover the WCAG guidelines and design patterns that eliminate these barriers — and see the fix in action.",
    icon: BookOpen,
    image: "/images/resource/coding-WACG-code-picture.png",
  },
]

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function ExperienceOverviewPage() {
  const { t } = useLanguage()
  return (
    <>
      <Navbar showLogo />
      <main className="bg-[#FDFCF8] min-h-screen pt-14 flex flex-col font-sans overflow-x-hidden">

        {/* ========================================================= */}
        {/*  HERO                                                      */}
        {/* ========================================================= */}

        <section className="relative px-8 md:px-24 py-28 md:py-40 bg-stone-900 text-white overflow-hidden">
          {/* Home page hero grid pattern background */}
          <div className="absolute inset-0 z-0">
            <svg width="100%" height="100%" className="w-full h-full" style={{ position: 'absolute', inset: 0 }}>
              <defs>
                <pattern id="grid-bg" patternUnits="userSpaceOnUse" width="40" height="40">
                  <rect x="0" y="0" width="40" height="40" fill="#181715" />
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ecebe6" strokeWidth="1" strokeOpacity="0.13" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-bg)" />
            </svg>
          </div>

          {/* Decorative SVG illustration */}
          <div className="absolute top-1/2 -right-[-3%] -translate-y-1/2 w-[50%] h-[90%] opacity-[0.9] pointer-events-none hidden lg:block">
            <Image
              src="/images/resource/what-is-accessability-picture.png"
              alt=""
              fill
              priority
              quality={75}
              sizes="50vw"
              className="object-contain object-right"
            />
          </div>

          <div className="max-w-5xl relative z-10">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#E69F00] mb-6 block">
              {t.experiencePage.heroLabel}
            </span>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-8">
              {t.experiencePage.heroTitle1}
              <br />
              {t.experiencePage.heroTitle2}
            </h1>

            <p className="text-lg md:text-xl text-stone-400 leading-relaxed max-w-2xl mb-12">
              {t.experiencePage.heroDescription}
            </p>

            {/* stat pills */}
            <div className="flex flex-wrap gap-4">
              {[
                { label: t.experiencePage.simulations, icon: Sparkles },
                { label: t.experiencePage.missions, icon: Zap },
                { label: t.experiencePage.realWorldBarriers, icon: Globe },
              ].map((pill) => (
                <div
                  key={pill.label}
                  className="inline-flex items-center gap-2.5 bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm px-5 py-2.5 rounded-full"
                >
                  <pill.icon className="w-4 h-4 text-[#E69F00]" />
                  <span className="text-sm font-bold uppercase tracking-widest text-white/80">
                    {pill.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/*  SIMULATION DEEP‑DIVE CARDS                                */}
        {/* ========================================================= */}
        <section className="px-8 md:px-24 py-24 md:py-32">
          <div className="max-w-7xl mx-auto">
            {/* section header */}
            <div className="mb-16 md:mb-20">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-stone-400 mb-4 block">
                {t.experiencePage.sectionLabel}
              </span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black leading-tight">
                {t.experiencePage.sectionTitle1}
                <br />
                <span className="text-stone-400">{t.experiencePage.sectionTitle2}</span>
              </h2>
            </div>

            {/* cards */}
            <div className="space-y-16 md:space-y-20">
              {simulations.map((sim, index) => {
                const Icon = sim.icon
                return (
                  <div
                    key={sim.id}
                    className="group bg-white border border-stone-200 hover:border-stone-300 transition-colors overflow-hidden"
                  >
                    {/* top: image + info row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      {/* image */}
                      <div className="relative aspect-[16/10] lg:aspect-auto bg-stone-100 overflow-hidden">
                        <Image
                          src={sim.image}
                          alt={sim.title}
                          fill
                          quality={75}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* number overlay */}
                        <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-sm text-white font-mono text-xs uppercase tracking-widest px-4 py-2">
                          SIM‑{sim.id} / {sim.subtitle}
                        </div>
                      </div>

                      {/* info */}
                      <div className="p-8 md:p-12 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-6">
                            <div
                              className={`w-12 h-12 rounded-full ${sim.bgAccent} flex items-center justify-center`}
                            >
                              <Icon
                                className={`w-6 h-6`}
                                style={{ color: sim.colorHex }}
                              />
                            </div>
                            <div>
                              <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
                                {sim.title}
                              </h3>
                            </div>
                          </div>

                          <p className="text-lg text-stone-600 leading-relaxed mb-8">
                            {sim.description}
                          </p>

                          {/* tags */}
                          <div className="flex flex-wrap gap-2 mb-8">
                            {sim.tags.map((tag) => (
                              <span
                                key={tag}
                                className="font-mono text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 bg-stone-100 text-stone-500 border border-stone-200"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* meta row */}
                          <div className="flex items-center gap-6 text-sm text-stone-500 font-mono uppercase tracking-widest mb-8">
                            <span className="flex items-center gap-1.5">
                              <Zap className="w-3.5 h-3.5" />
                              {sim.difficulty}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              {sim.time}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5" />
                              {sim.missions.length} Missions
                            </span>
                          </div>
                        </div>

                        {/* CTA */}
                        <Link
                          href={`/experience/${sim.slug}`}
                          className="inline-flex items-center justify-between w-full bg-black text-white px-8 py-5 font-bold uppercase tracking-widest text-sm hover:bg-stone-800 transition-colors"
                        >
                          <span>{t.experiencePage.startSimulation}</span>
                          <ArrowRight className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>

                    {/* bottom: missions + insight */}
                    <div className="border-t border-stone-200 grid grid-cols-1 lg:grid-cols-3">
                      {/* missions */}
                      {sim.missions.map((mission) => {
                        const MissionIcon = mission.icon
                        return (
                          <div
                            key={mission.code}
                            className="p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-stone-200 last:border-0"
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <div
                                className={`w-10 h-10 rounded-full ${sim.bgAccent} flex items-center justify-center`}
                              >
                                <MissionIcon
                                  className="w-5 h-5"
                                  style={{ color: sim.colorHex }}
                                />
                              </div>
                              <div>
                                <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400 block">
                                  {mission.code}
                                </span>
                                <span className="font-bold text-lg">
                                  {mission.name}
                                </span>
                              </div>
                            </div>
                            <p className="text-stone-500 leading-relaxed">
                              {mission.desc}
                            </p>
                          </div>
                        )
                      })}

                      {/* insight */}
                      <div className="p-8 md:p-10 bg-stone-50">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400 mb-3 block">
                          {t.experiencePage.keyInsight}
                        </span>
                        <p className="text-stone-700 leading-relaxed mb-4 font-medium">
                          {sim.insight}
                        </p>
                        <span
                          className="font-mono text-xs font-bold uppercase tracking-widest"
                          style={{ color: sim.colorHex }}
                        >
                          {sim.wcagRef}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ========================================================= */}


        {/* ========================================================= */}
        {/*  HOW IT WORKS                                              */}
        {/* ========================================================= */}
        <section className="px-8 md:px-24 py-24 md:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 md:mb-20 text-center">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-stone-400 mb-4 block">
                {t.experiencePage.howItWorksLabel}
              </span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black leading-tight">
                {t.experiencePage.howItWorksTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {steps.map((s, i) => {
                const StepIcon = s.icon
                return (
                  <div key={s.step} className="relative group bg-white border border-stone-200 overflow-hidden hover:border-stone-300 transition-colors">
                    {/* Image Header */}
                    <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        quality={75}
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* overlay step number */}
                      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest">
                        STEP {s.step}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-900 group-hover:bg-stone-900 group-hover:text-[#E69F00] transition-colors">
                          <StepIcon className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                          {s.title}
                        </h3>
                      </div>
                      <p className="text-stone-500 leading-relaxed md:text-lg">
                        {s.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/*  CTA BANNER                                                */}
        {/* ========================================================= */}
        <section className="px-8 md:px-24 pb-24 md:pb-32">
          <div className="max-w-7xl mx-auto">
            <div className="relative bg-black text-white p-12 md:p-20 overflow-hidden group">
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/resource/two-hand-using-phone-picture2.png"
                  alt="Accessible tech usage CTA"
                  fill
                  quality={60}
                  sizes="100vw"
                  className="object-cover opacity-[0.35] mix-blend-screen group-hover:scale-105 group-hover:opacity-[0.45] transition-all duration-[2000ms]"
                />
                {/* overlay gradient to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 h-full">
                <div className="flex-1 max-w-2xl">
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                    {t.experiencePage.ctaTitle}
                  </h2>
                  <p className="text-stone-300 text-lg md:text-xl leading-relaxed">
                    {t.experiencePage.ctaDesc}
                  </p>
                </div>

                <Link
                  href="/experience/total-blindness"
                  className="inline-flex items-center gap-3 bg-[#E69F00] text-black px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-[#d49200] transition-colors whitespace-nowrap shrink-0 group/btn"
                >
                  <span>{t.experiencePage.ctaButton}</span>
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
