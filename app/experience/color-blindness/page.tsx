"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Info, ScanEye, GripVertical, Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Navbar } from "@/components/navbar"

// --- SUB-COMPONENT: SLIDER ---
function ImageComparisonSlider({
  imageSrc,
  filterType,
  label,
}: {
  imageSrc: string
  filterType: string
  label: string
}) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPosition(Math.min(Math.max(percentage, 0), 100))
  }

  const handleInteractionStart = () => setIsDragging(true)
  const handleInteractionEnd = () => setIsDragging(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    handleMove(e.clientX, rect)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    handleMove(e.touches[0].clientX, rect)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    handleMove(e.clientX, rect)
  }

  const getFilterStyle = () => {
    switch (filterType) {
      case "protanopia": return "url('#protanopia')"
      case "deuteranopia": return "url('#deuteranopia')"
      case "tritanopia": return "url('#tritanopia')"
      case "monochromacy": return "grayscale(100%)"
      default: return "none"
    }
  }

  return (
    <div className="space-y-3 group/slider">
      <h3 className="text-base font-bold text-foreground flex items-center gap-2">
        <div className="w-1.5 h-4 bg-wong-orange rounded-full" />
        {label}
      </h3>

      <div
        className="relative w-full aspect-video rounded-xl overflow-hidden cursor-ew-resize select-none border border-border shadow-sm transition-shadow group-hover/slider:shadow-md hover:border-wong-dark-blue/30"
        onMouseMove={handleMouseMove}
        onMouseDown={handleInteractionStart}
        onMouseUp={handleInteractionEnd}
        onMouseLeave={handleInteractionEnd}
        onTouchStart={handleInteractionStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleInteractionEnd}
        onClick={handleClick}
      >
        {/* Original (Left) */}
        <div className="absolute inset-0">
          <img src={imageSrc} alt="Original" className="w-full h-full object-cover" draggable={false} />
          <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider pointer-events-none">
            Normal
          </div>
        </div>

        {/* Filtered (Right) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath: `inset(0 0 0 ${sliderPosition}%)`,
            filter: getFilterStyle(),
          }}
        >
          <img src={imageSrc} alt="Simulated" className="w-full h-full object-cover" draggable={false} />
          <div className="absolute top-3 right-3 bg-wong-dark-blue/90 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider pointer-events-none shadow-sm">
            {filterType}
          </div>
        </div>

        {/* Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_20px_rgba(0,0,0,0.5)] pointer-events-none z-10"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-wong-orange rounded-full shadow-lg flex items-center justify-center border-[3px] border-white text-white">
            <GripVertical className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  )
}

// --- MAIN PAGE ---

export default function ColorBlindnessExperience() {
  const [started, setStarted] = useState(false)
  const [filterType, setFilterType] = useState("deuteranopia")
  const [activeTab, setActiveTab] = useState<"abstract" | "real">("abstract")

  const filters = [
    { value: "normal", label: "Normal", desc: "Standard Vision" },
    { value: "deuteranopia", label: "Deuteranopia", desc: "Green-Blind (Common)" },
    { value: "protanopia", label: "Protanopia", desc: "Red-Blind" },
    { value: "tritanopia", label: "Tritanopia", desc: "Blue-Blind (Rare)" },
    { value: "monochromacy", label: "Monochromacy", desc: "Total Grayscale" },
  ]

  const getFilterClass = () => {
    switch (filterType) {
      case "protanopia": return "[filter:url('#protanopia')]"
      case "deuteranopia": return "[filter:url('#deuteranopia')]"
      case "tritanopia": return "[filter:url('#tritanopia')]"
      case "monochromacy": return "grayscale"
      default: return ""
    }
  }

  // --- INTRO SCREEN ---
  if (!started) {
    return (
      <main className="min-h-screen bg-[#FDFCF8] text-black relative flex flex-col font-sans selection:bg-wong-orange selection:text-black overflow-hidden">
        <Navbar theme="light" showLogo={true} />

        <div className="flex-1 flex flex-col justify-center py-10 px-6 md:px-24">
          <div className="max-w-4xl mx-auto w-full">

            {/* Back Link */}
            <div className="mb-8">
              <Link
                href="/#chapter-5"
                className="inline-flex items-center gap-2 group border-b-2 border-transparent hover:border-black transition-all pb-1 text-stone-600 hover:text-black"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="font-mono text-sm uppercase tracking-widest font-bold">Back to Curriculum</span>
              </Link>
            </div>

            {/* Header */}
            <div className="mb-16 border-b-2 border-black pb-8">
              <span className="font-mono text-sm uppercase tracking-widest text-stone-500 mb-4 block">
                Simulation 03 / Color Spectrum
              </span>
              <h1 className="font-serif text-6xl md:text-8xl font-bold text-black mb-6 tracking-tight">
                Color Deficiency.
              </h1>
              <p className="font-sans text-xl md:text-2xl text-stone-600 max-w-2xl leading-relaxed font-light">
                Colors convey meaning, but not everyone sees them the same way. Analyze standard UI components through a different lens.
              </p>
            </div>

            {/* Content Layout */}
            <div className="grid md:grid-cols-12 gap-12 mb-16">

              {/* Left Column: Context */}
              <div className="md:col-span-12 lg:col-span-5 space-y-8">
                <div>
                  <div className="w-16 pt-1 border-t-4 border-wong-orange mb-4">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">Stat</span>
                  </div>
                  <p className="text-3xl font-serif font-bold text-black leading-tight">
                    1 in 12 Men<br />
                    1 in 200 Women
                  </p>
                  <p className="text-stone-600 mt-2 font-mono text-sm">
                    Have some form of color vision deficiency.
                  </p>
                </div>

                <div className="bg-stone-100 p-6 border-l-4 border-black">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <ScanEye className="w-5 h-5" />
                    <span>Lab Tools</span>
                  </h4>
                  <ul className="space-y-2 text-sm text-stone-600 font-mono">
                    <li><span className="font-bold text-black">[FILTERS]</span> ... Simulate CVD</li>
                    <li><span className="font-bold text-black">[SLIDERS]</span> ... Compare Views</li>
                  </ul>
                </div>
              </div>

              {/* Right Column: Mission & CTA */}
              <div className="md:col-span-12 lg:col-span-7 flex flex-col justify-between">
                <div className="mb-8 lg:mb-0">
                  <div className="w-16 pt-1 border-t-4 border-wong-dark-blue mb-4">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">Mission</span>
                  </div>
                  <p className="text-lg text-stone-700 leading-relaxed mb-8">
                    Your goal is to <strong>identify accessible failures</strong> in standard UI components.
                    Use the filters to see how "Red for Error" and "Green for Success" can become indistinguishable.
                  </p>
                </div>

                <Button
                  size="lg"
                  onClick={() => setStarted(true)}
                  className="w-full md:w-auto bg-black hover:bg-stone-800 text-white rounded-none border-2 border-transparent hover:border-black px-12 py-8 text-xl font-bold uppercase tracking-wider transition-all flex items-center justify-between group"
                >
                  <span>Enter Laboratory</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

          </div>
        </div>
      </main>
    )
  }

  // --- LAB INTERFACE ---
  return (
    <main className="min-h-screen bg-background font-sans selection:bg-wong-orange selection:text-white">

      {/* Sticky Header */}
      <div className="sticky top-0 z-30">
        <Navbar theme="light" showLogo={true} />

        {/* Filter Controls Sub-header */}
        <div className="bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-border shadow-sm">
          <div className="container mx-auto px-6 h-14 flex items-center justify-between">
            <Link href="/experience" className="flex items-center gap-2 text-muted-foreground hover:text-wong-dark-blue transition-colors group">
              <div className="bg-muted p-1.5 rounded-md group-hover:bg-wong-dark-blue/10">
                <ArrowLeft className="w-4 h-4 group-hover:text-wong-dark-blue" />
              </div>
              <span className="text-sm font-bold uppercase tracking-wide hidden sm:inline">Back to Lab</span>
            </Link>

            {/* <div className="font-serif font-bold text-wong-dark-blue text-lg">CVD Simulator</div> */}

            <div className="w-16" />
          </div>

          {/* Filter Controls */}
          <div className="border-t border-border bg-background">
            <div className="container mx-auto px-6 py-4 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-3 min-w-max mx-auto justify-center">
                {filters.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setFilterType(f.value)}
                    className={cn(
                      "flex flex-col items-start px-4 py-2.5 rounded-lg border-2 transition-all min-w-[140px]",
                      filterType === f.value
                        ? "border-wong-dark-blue bg-wong-dark-blue/5"
                        : "border-transparent hover:bg-muted"
                    )}
                  >
                    <span className={cn(
                      "text-sm font-bold",
                      filterType === f.value ? "text-wong-dark-blue" : "text-muted-foreground"
                    )}>{f.label}</span>
                    <span className="text-[10px] text-muted-foreground/60 font-medium uppercase tracking-wider">{f.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10 max-w-5xl">

        {/* Mode Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-card p-1.5 rounded-2xl border border-border shadow-sm inline-flex gap-1">
            <button
              onClick={() => setActiveTab("abstract")}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                activeTab === "abstract"
                  ? "bg-wong-dark-blue text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              UI Components
            </button>
            <button
              onClick={() => setActiveTab("real")}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                activeTab === "real"
                  ? "bg-wong-dark-blue text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              Real World
            </button>
          </div>
        </div>

        <div className="space-y-12">

          {/* --- UI COMPONENTS MODE --- */}
          {activeTab === "abstract" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

              {/* Traffic Light */}
              <div className="bg-card rounded-3xl p-8 border border-border shadow-sm grid md:grid-cols-2 gap-10 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-wong-dark-blue">Signal Identification</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Colorblind users often rely on <strong>position</strong> or icons rather than color alone.
                    If you only use color to indicate status (Error/Success), they might miss critical warnings.
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-wong-orange bg-wong-orange/10 px-3 py-1.5 rounded-full">
                    <Info className="w-3.5 h-3.5" />
                    <span>Best Practice: Always use icons alongside color</span>
                  </div>
                </div>

                <div className="flex justify-center bg-muted/50 p-8 rounded-2xl border border-border/50">
                  <div className={cn("bg-slate-800 p-5 rounded-[2rem] shadow-2xl flex flex-col gap-4 border-4 border-slate-700 transition-all duration-500", getFilterClass())}>
                    {/* Red Light */}
                    <div className="w-20 h-20 rounded-full bg-red-500 border-4 border-black/20 shadow-[inset_0_4px_12px_rgba(0,0,0,0.4)] relative flex items-center justify-center">
                      {/* Only visible symbol for colorblind accessible design */}
                      <X className="w-10 h-10 text-red-900/40" strokeWidth={3} />
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-4 bg-white/20 rounded-full blur-sm" />
                    </div>
                    {/* Yellow Light */}
                    <div className="w-20 h-20 rounded-full bg-wong-yellow border-4 border-black/20 shadow-[inset_0_4px_12px_rgba(0,0,0,0.4)] opacity-30 relative flex items-center justify-center">
                      <div className="w-8 h-1 bg-yellow-900/40 rounded-full" />
                    </div>
                    {/* Green Light */}
                    <div className="w-20 h-20 rounded-full bg-wong-teal border-4 border-black/20 shadow-[inset_0_4px_12px_rgba(0,0,0,0.4)] opacity-30 relative flex items-center justify-center">
                      <Check className="w-10 h-10 text-green-900/40" strokeWidth={3} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Viz */}
              <div className="bg-card rounded-3xl p-8 border border-border shadow-sm grid md:grid-cols-2 gap-10 items-center">
                <div className="order-2 md:order-1 h-72 w-full bg-muted/50 rounded-2xl border border-border/50 p-8 flex items-end gap-4 md:gap-6">
                  {/* Bars */}
                  <div className={cn("w-full bg-wong-sky-blue rounded-t-lg transition-all duration-500 relative group", getFilterClass())} style={{ height: "60%" }}>
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-muted-foreground">A</span>
                  </div>
                  <div className={cn("w-full bg-wong-purple rounded-t-lg transition-all duration-500 relative group", getFilterClass())} style={{ height: "80%" }}>
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-muted-foreground">B</span>
                  </div>
                  <div className={cn("w-full bg-wong-teal rounded-t-lg transition-all duration-500 relative group", getFilterClass())} style={{ height: "40%" }}>
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-muted-foreground">C</span>
                  </div>
                  <div className={cn("w-full bg-wong-vermilion rounded-t-lg transition-all duration-500 relative group", getFilterClass())} style={{ height: "90%" }}>
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-muted-foreground">D</span>
                  </div>
                </div>
                <div className="order-1 md:order-2 space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-wong-dark-blue">Data Visualization</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Charts relying solely on a color legend become unreadable.
                    Notice how the bars might blend together in Protanopia mode.
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-wong-orange bg-wong-orange/10 px-3 py-1.5 rounded-full">
                    <Info className="w-3.5 h-3.5" />
                    <span>Best Practice: Use patterns or direct labels</span>
                  </div>
                </div>
              </div>

              {/* Palette */}
              <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
                <div className="mb-8">
                  <h3 className="text-2xl font-serif font-bold text-wong-dark-blue mb-2">Design System Contrast</h3>
                  <p className="text-muted-foreground">Common accessible color pairings can become indistinguishable.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { color: "bg-destructive", name: "Error", hex: "Vermillion" },
                    { color: "bg-wong-teal", name: "Success", hex: "Teal" },
                    { color: "bg-wong-blue", name: "Link", hex: "Blue" },
                    { color: "bg-wong-purple", name: "Visited", hex: "Purple" },
                    { color: "bg-wong-orange", name: "Warning", hex: "Orange" },
                    { color: "bg-wong-yellow", name: "Caution", hex: "Yellow" },
                  ].map((swatch, i) => (
                    <div key={i} className="group cursor-default">
                      <div className={cn("h-28 rounded-xl shadow-inner transition-all duration-500 mb-3", swatch.color, getFilterClass())} />
                      <div className="px-1">
                        <div className="font-bold text-foreground text-sm">{swatch.name}</div>
                        <div className="text-xs font-mono text-muted-foreground">{swatch.hex}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* --- REAL WORLD SCENES (IMAGES) --- */}
          {activeTab === "real" && (
            <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-card rounded-3xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
                <ImageComparisonSlider
                  label="Nature & Scenery"
                  imageSrc="/vibrant-nature-landscape-with-flowers-trees-sky.jpg"
                  filterType={filterType}
                />
              </div>
              <div className="bg-card rounded-3xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
                <ImageComparisonSlider
                  label="Fresh Produce (Red/Green)"
                  imageSrc="/colorful-fresh-fruits-and-vegetables-assortment.jpg"
                  filterType={filterType}
                />
              </div>
              <div className="bg-card rounded-3xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
                <ImageComparisonSlider
                  label="Dashboard UI"
                  imageSrc="/colorful-user-interface-dashboard-with-buttons-cha.jpg"
                  filterType={filterType}
                />
              </div>
              <div className="bg-card rounded-3xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
                <ImageComparisonSlider
                  label="Urban Night Lights"
                  imageSrc="/city-street-with-colorful-neon-signs-traffic-light.jpg"
                  filterType={filterType}
                />
              </div>
            </div>
          )}

        </div>
      </div>

      {/* SVG Filters Definition (Hidden) */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="protanopia">
            <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0 0.558, 0.442, 0, 0, 0 0, 0.242, 0.758, 0, 0 0, 0, 0, 1, 0" />
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0 0.7, 0.3, 0, 0, 0 0, 0.3, 0.7, 0, 0 0, 0, 0, 1, 0" />
          </filter>
          <filter id="tritanopia">
            <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0 0, 0.433, 0.567, 0, 0 0, 0.475, 0.525, 0, 0 0, 0, 0, 1, 0" />
          </filter>
        </defs>
      </svg>
    </main>
  )
}
