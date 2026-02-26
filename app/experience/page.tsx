import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
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

export const metadata = {
  title: "Simulations | AltAccess",
  description:
    "Experience the web through different perspectives. Interactive simulations for Low Vision, Color Blindness, and Total Blindness.",
}

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
  },
  {
    step: "02",
    title: "Experience the Barrier",
    description:
      "Complete interactive missions under simulated conditions. Feel the frustration when interfaces fail to be accessible.",
    icon: Zap,
  },
  {
    step: "03",
    title: "Learn the Solution",
    description:
      "Discover the WCAG guidelines and design patterns that eliminate these barriers — and see the fix in action.",
    icon: BookOpen,
  },
]

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function ExperienceOverviewPage() {
  return (
    <>
      <Navbar showLogo />
      <main className="bg-[#FDFCF8] min-h-screen pt-14 flex flex-col font-sans">

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

          <div className="max-w-5xl relative z-10">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#E69F00] mb-6 block">
              Interactive Experiences
            </span>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-8">
              Step Into
              <br />
              Their Shoes.
            </h1>

            <p className="text-lg md:text-xl text-stone-400 leading-relaxed max-w-2xl mb-12">
              To build accessible technology, you first need to understand the
              barriers. Our interactive simulations let you experience the web
              through the lens of users with different visual abilities.
            </p>

            {/* stat pills */}
            <div className="flex flex-wrap gap-4">
              {[
                { label: "3 Simulations", icon: Sparkles },
                { label: "6 Missions", icon: Zap },
                { label: "Real‑World Barriers", icon: Globe },
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
                The Simulations
              </span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black leading-tight">
                Three perspectives.
                <br />
                <span className="text-stone-400">One mission: empathy.</span>
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
                          <span>Start Simulation</span>
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
                          Key Insight
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
                The Process
              </span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black leading-tight">
                How It Works
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {steps.map((s, i) => {
                const StepIcon = s.icon
                return (
                  <div key={s.step} className="relative text-center group">
                    {/* connector line (desktop) */}
                    {i < steps.length - 1 && (
                      <div className="hidden md:block absolute top-12 left-[60%] w-[calc(100%-20%)] h-px bg-stone-200" />
                    )}

                    <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-stone-900 text-white mb-8 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <StepIcon className="w-10 h-10" />
                      <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#E69F00] text-black font-mono text-xs font-bold flex items-center justify-center">
                        {s.step}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 tracking-tight">
                      {s.title}
                    </h3>
                    <p className="text-stone-500 leading-relaxed max-w-sm mx-auto">
                      {s.description}
                    </p>
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
            <div className="relative bg-black text-white p-12 md:p-20 overflow-hidden">
              {/* decorative circles */}
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border border-white/[0.06]" />
              <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full border border-white/[0.04]" />

              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div>
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                    Ready to begin?
                  </h2>
                  <p className="text-stone-400 text-lg max-w-lg leading-relaxed">
                    Start with any simulation. Each takes only a few minutes but
                    will permanently change how you think about web design.
                  </p>
                </div>

                <Link
                  href="/experience/total-blindness"
                  className="inline-flex items-center gap-3 bg-[#E69F00] text-black px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-[#d49200] transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Start First Simulation</span>
                  <ArrowRight className="w-5 h-5" />
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
